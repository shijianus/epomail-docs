import assert from 'node:assert/strict';
import { createHash, webcrypto } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import { negotiate, overviewPathFor } from '../functions/_lib.js';
import { onRequest as rootEntry } from '../functions/index.js';
import { onRequest as mountedEntry } from '../functions/epomail/index.js';
import { onRequest as legacyMailEntry } from '../functions/mail/[[path]].js';
import { createManifest, normalizeMarkdown, readGitMetadata } from './generate-tamper-proof.mjs';
import rehypeReadableTables, { TABLE_HINTS, PRIVACY_TOPICS, rehypeCompactPrivacyFigure } from './rehype-readable-tables.mjs';
import {
  I18N, compareMarkdownFile, fetchManifest, getCanonicalDocSlug, getDocMeta,
  getLangStrings, hashMarkdownFile, headState,
} from '../public/scripts/tamper-proof-client.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const astroRequire = createRequire(require.resolve('astro/package.json'));
const starlightRequire = createRequire(require.resolve('@astrojs/starlight'));
const compiler = await import(pathToFileURL(astroRequire.resolve('@astrojs/compiler')).href);
const { createMarkdownProcessor } = await import(pathToFileURL(astroRequire.resolve('@astrojs/markdown-remark')).href);
const { fromHtml } = await import(pathToFileURL(starlightRequire.resolve('hast-util-from-html')).href);
const { toString } = await import(pathToFileURL(starlightRequire.resolve('hast-util-to-string')).href);
const postcss = astroRequire('postcss');
const sha = (text) => createHash('sha256').update(text, 'utf8').digest('hex');
const walk = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.children || []).flatMap((child) => walk(child, predicate)),
];
const element = (tag) => (node) => node.type === 'element' && node.tagName === tag;
const file = (text) => new Blob([text]);
const DOC_LOCALES = ['', 'zh-tw', 'en', 'fr', 'es', 'nl', 'de'];
const readDoc = (locale, slug) => fs.readFileSync(path.join(root, 'src/content/docs', locale, 'mail', `${slug}.md`), 'utf8').replace(/\r\n/g, '\n');

// These tests write only throwaway fixtures; they never build or modify public/dist.
test('fallback root HTML matches the Simplified Chinese default and lists all seven entry languages', () => {
  const tree = fromHtml(fs.readFileSync(path.join(root, 'public/index.html'), 'utf8'));
  const html = walk(tree, element('html'))[0];
  assert.equal(html.properties.lang, 'zh-CN');
  const config = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  assert.equal(config.match(/root:\s*\{\s*label:\s*'简体中文',\s*lang:\s*'([^']+)'/)[1], html.properties.lang);
  assert.equal(toString(walk(tree, element('title'))[0]), 'EpoCanvas Mail · 隐私权与条款');
  const refresh = walk(tree, (node) => node.tagName === 'meta' && node.properties.httpEquiv?.includes('refresh'))[0];
  assert.equal(refresh.properties.content, `0; url=${overviewPathFor('')}`);
  const canonical = walk(tree, (node) => node.tagName === 'link' && node.properties.rel?.includes('canonical'))[0];
  assert.equal(canonical.properties.href, overviewPathFor(''));
  const languages = ['zh-CN', 'zh-TW', 'en', 'fr', 'es', 'nl', 'de'];
  const labels = ['简体中文', '繁體中文', 'English', 'Français', 'Español', 'Nederlands', 'Deutsch'];
  const menus = walk(tree, element('p')).filter((node) => walk(node, element('a')).length === 7);
  assert.equal(menus.length, 1, 'one complete manual language list');
  const links = walk(menus[0], element('a'));
  assert.deepEqual(links.map(toString), labels);
  for (const [index, locale] of DOC_LOCALES.entries()) {
    assert.equal(links[index].properties.href, overviewPathFor(locale));
    assert.equal(links[index].properties.lang, languages[index]);
    assert.equal(links[index].properties.hrefLang, languages[index]);
    assert.ok(readDoc(locale, 'overview').startsWith('---'), locale || 'zh');
  }
  assert.ok(walk(tree, element('a')).some((node) => toString(node) === '繁體中文（臺灣）' && node.properties.href === overviewPathFor('zh-tw')));
});

test('Accept-Language aliases match exact primary languages and respect Chinese script preferences', () => {
  const aliases = [
    ['', ['zh', 'zh-CN', 'zh-SG', 'zh-Hans', 'zh-Hans-CN', 'zh-Hans-TW', 'ZH_hans_HK']],
    ['zh-tw', ['zh-TW', 'zh-HK', 'zh-MO', 'zh-Hant', 'zh-Hant-TW', 'zh-Hant-CN', 'ZH_hant_HK', 'zh_TW']],
    ['en', ['en', 'en-US', 'en-GB', 'EN_us']],
    ['fr', ['fr', 'fr-FR', 'fr-CA']],
    ['es', ['es', 'es-ES', 'es-MX']],
    ['nl', ['nl', 'nl-NL', 'nl-BE']],
    ['de', ['de', 'de-DE', 'de-AT', 'de-CH', 'DE_de']],
  ];
  for (const [locale, tags] of aliases) {
    const expected = `/epomail/${locale ? `${locale}/` : ''}mail/overview/`;
    assert.equal(overviewPathFor(locale), expected);
    for (const tag of tags) {
      assert.equal(negotiate(tag), locale, tag);
      assert.equal(overviewPathFor(negotiate(tag)), expected, tag);
    }
  }
  for (const tag of ['english', 'french', 'deutsch', 'espanol', 'nld', 'zho', 'zhong', 'en--US', 'en/US']) {
    assert.equal(negotiate(`${tag},fr;q=0.5`), 'fr', `do not match a prefix: ${tag}`);
  }
});

test('Accept-Language q weights, exclusions, ties and malformed values use deterministic fallbacks', () => {
  const cases = [
    [null, ''], [undefined, ''], ['', ''], [' , ; ', ''], ['ja-JP,ko;q=0.9', ''], ['*', ''],
    ['fr;q=0.4,de-CH;q=0.9,en;q=0.7', 'de'],
    ['zh-HK;q=0.4,zh-CN;q=0.9', ''],
    ['zh-CN;q=0.2,zh-Hant;q=0.8', 'zh-tw'],
    ['nl;q=0,en;q=0.2', 'en'],
    ['de;q=0.000,fr;q=0.001', 'fr'],
    ['de;q=0,fr;q=0', ''],
    ['es;q=0.8,fr;q=0.8', 'es'],
    ['en;q=0.1,nl', 'nl'],
    [' fr-CA ; Q = 0.700 , de ;q=0.900 ', 'de'],
    ['*;q=1,de;q=0.5', 'de'],
    ['de;q=0,*;q=0.9', ''],
    ['ja;q=1,fr;q=0.4', 'fr'],
    ['de;q=1.000,fr;q=0.999', 'de'],
  ];
  for (const [header, locale] of cases) assert.equal(negotiate(header), locale, String(header));
  for (const q of ['-1', '2', '1.001', '0.1234', '0.5.1', '.5', 'NaN', 'Infinity', 'invalid', '', '0.9;q=0.8']) {
    const header = `de;q=${q},fr;q=0.5`;
    assert.equal(negotiate(header), 'fr', `ignore invalid q: ${header}`);
  }
});

test('both root handlers redirect seven languages without caching or cookies', async () => {
  for (const [entry, urls] of [[rootEntry, ['/']], [mountedEntry, ['/epomail', '/epomail/']]]) {
    for (const url of urls) {
      for (const method of ['GET', 'HEAD']) {
        for (const language of [null, 'zh-CN', 'zh-TW', 'en', 'fr', 'es', 'nl', 'de']) {
          const request = new Request(`https://docs.example.test${url}`, {
            method,
            headers: language ? { 'Accept-Language': language } : {},
          });
          const response = await entry({ request });
          const locale = language === 'zh-TW' ? 'zh-tw' : !language || language === 'zh-CN' ? '' : language;
          assert.equal(response.status, 302);
          assert.equal(response.headers.get('Location'), `https://docs.example.test/epomail/${locale ? `${locale}/` : ''}mail/overview/`);
          assert.equal(response.headers.get('Vary'), 'Accept-Language');
          assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
          assert.equal(response.headers.get('Set-Cookie'), null);
          assert.equal(await response.text(), '');
        }
      }
    }
  }
});

test('legacy mail redirects preserve document suffixes and isolate negotiated cache variants', async () => {
  for (const [url, rest, suffix] of [
    ['/mail/project/', 'project', 'project/'],
    ['/mail/project', 'project', 'project'],
    ['/mail/project/', ['project'], 'project/'],
    ['/mail/guide/part/', ['guide', 'part'], 'guide/part/'],
  ]) {
    for (const [language, prefix] of [['de-CH,fr;q=0.8', 'de/'], ['zh-Hant', 'zh-tw/'], ['zh-CN', '']]) {
      const request = new Request(`https://docs.example.test${url}`, { headers: { 'Accept-Language': language } });
      const response = await legacyMailEntry({ request, params: { path: rest } });
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('Location'), `https://docs.example.test/epomail/${prefix}mail/${suffix}`);
      assert.equal(response.headers.get('Vary'), 'Accept-Language');
      assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
      assert.equal(response.headers.get('Set-Cookie'), null);
    }
  }
});

test('explicit locale paths stay outside language negotiation (Pages routing static contract)', () => {
  // Check actual Pages file routing rather than invoking a root-only handler on a document URL.
  const functionFiles = fs.readdirSync(path.join(root, 'functions'), { recursive: true })
    .map((name) => name.replace(/\\/g, '/')).filter((name) => /\.(?:[cm]?js|ts)$/.test(name)).sort();
  assert.deepEqual(functionFiles, ['_lib.js', 'epomail/index.js', 'index.js', 'mail/[[path]].js']);
  const staticRedirects = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8')
    .split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
  assert.deepEqual(staticRedirects, [], 'no wildcard redirect overrides explicit locale paths');
  for (const locale of DOC_LOCALES) {
    assert.ok(readDoc(locale, 'overview').startsWith('---'));
    assert.ok(readDoc(locale, 'project').startsWith('---'));
  }
});

test('project history translates 37 Chinese subjects per non-Chinese locale without changing evidence', () => {
  const history = (text) => [...text.matchAll(/^```text\n([\s\S]*?)\n```/gm)].map((match) => match[1]);
  const parse = (blocks) => blocks.flatMap((block) => block.split('\n').map((line) => {
    const match = line.match(/^([a-f0-9]{40})  (\d{4}-\d{2}-\d{2})  (.+)$/);
    assert.ok(match, `valid commit record: ${line}`);
    return { hash: match[1], date: match[2], subject: match[3] };
  }));
  const baseline = readDoc('zh-tw', 'project');
  const original = history(baseline);
  assert.deepEqual(original.map((block) => block.split('\n').length), [32, 25]);
  assert.equal(sha(original.join('\n')), '8a224654f6206a81d0294dab3ec072decfd846be4148f14d7258e4973f9ce0e3', 'Chinese historical records remain verbatim');
  assert.deepEqual(history(readDoc('', 'project')), original);
  const records = parse(original);
  const han = /\p{Script=Han}/u;
  assert.equal(records.filter(({ subject }) => han.test(subject)).length, 37);
  const externalLinks = (text) => [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1]);
  const inlineConstants = (text) => [...text.replace(/^```[\s\S]*?^```/gm, '').matchAll(/`([^`\n]+)`/g)].map((match) => match[1]).sort();
  const preserved = {
    '4cf8014': ['v5.8', 'a1c1e89', 'Accept-Language'],
    '8a60539': ['v5.9', 'beb956a'],
    '26f6c3b': ['seed-demo.py', 'wrangler-demo.toml'],
    '21af692': ['ENABLE_OAUTH_INTEGRATION'],
    '596e7c1': ['v5.11', 'ff4e93f+c597fca', '5.11'],
    '5fb18df': ['aup-ladder.svg'],
    '5197f50': ['robots.txt'],
    '90c06ed': ['v5.3', 'docs.epocanvas.com/epomail'],
    '7ee3a66': ['P0/P1/P2', 'SSRF', 'XSS'],
    'deceaaa': ['Gmail', 'to-me', 'API'],
    'a1c1e89': ['v5.8', 'Accept-Language'],
  };
  for (const locale of DOC_LOCALES.slice(2)) {
    const markdown = readDoc(locale, 'project');
    const translatedBlocks = history(markdown);
    assert.deepEqual(translatedBlocks.map((block) => block.split('\n').length), [32, 25], locale);
    const translated = parse(translatedBlocks);
    assert.deepEqual(translated.map(({ hash, date }) => [hash, date]), records.map(({ hash, date }) => [hash, date]), locale);
    let changes = 0;
    for (const [index, entry] of translated.entries()) {
      const source = records[index];
      if (han.test(source.subject)) {
        assert.doesNotMatch(entry.subject, han, `${locale}: untranslated summary ${entry.hash}`);
        assert.ok(entry.subject.startsWith(`${source.subject.split(':')[0]}: `), `${locale}: commit scope ${entry.hash}`);
        changes++;
      } else {
        assert.equal(entry.subject, source.subject, `${locale}: preserve original English subject ${entry.hash}`);
      }
      for (const token of preserved[entry.hash.slice(0, 7)] || []) {
        assert.ok(entry.subject.includes(token), `${locale}: retain ${token} in ${entry.hash}`);
      }
    }
    assert.equal(changes, 37, locale);
    assert.deepEqual(externalLinks(markdown), externalLinks(baseline), `${locale}: keep repository and history links`);
    assert.deepEqual(inlineConstants(markdown), inlineConstants(baseline), `${locale}: preserve inline technical constants`);
    assert.equal(markdown.match(/```bash\n([\s\S]*?)\n```/)[1], baseline.match(/```bash\n([\s\S]*?)\n```/)[1], `${locale}: unchanged commands`);
  }
});

test('Chinese product labels, language names and search aliases remain explained literals, not translation leaks', () => {
  const literalWord = { '': /字面值（literal）/, 'zh-tw': /字面值（literal）/, en: /literal product label/, fr: /étiquette littérale/, es: /etiqueta literal/, nl: /letterlijk productlabel/, de: /Produktlabel \(Literal\)/ };
  const aliases = ['$发件人', '$用户', '$收件人', '$主题'];
  for (const locale of DOC_LOCALES) {
    const project = readDoc(locale, 'project');
    assert.match(project, literalWord[locale], locale || 'zh');
    assert.ok(project.includes('`/images/mail/en/ui/`'), `${locale}: documented screenshot exception`);
    for (const literal of ['重要', '简体中文', '繁體中文', ...aliases, '$sender', '$user', '$to', '$subject']) {
      assert.ok(project.includes(`\`${literal}\``), `${locale}: literal ${literal}`);
    }
  }
  for (const locale of DOC_LOCALES.slice(2)) {
    for (const slug of ['features', 'notify', 'sub-processors']) {
      assert.ok(readDoc(locale, slug).includes('`重要`'), `${locale}/${slug}: retain exact product label`);
    }
    assert.ok(readDoc(locale, 'privacy-policy').includes('重要/important'), `${locale}: keep literal privacy disclosure`);
    for (const alias of aliases) assert.ok(readDoc(locale, 'search').includes(`\`${alias}\``), `${locale}: search alias ${alias}`);
    for (const name of ['简体中文', '繁體中文']) assert.ok(readDoc(locale, 'modes').includes(name), `${locale}: native language name ${name}`);
  }
});

test('German documents scope English UI and labelled shared-screenshot exceptions without exempting diagrams', () => {
  const project = readDoc('de', 'project');
  assert.match(project, /sechs, jedoch kein Deutsch/);
  assert.match(project, /Screenshots der englischen Oberfläche/);
  assert.match(project, /dokumentierten Ausnahmen für Screenshots/);
  assert.match(project, /Bildunterschrift oder im Alternativtext/);
  assert.ok(project.includes('`/images/mail/ui/`'));
  // These historical cross-language examples predate the localised walkthroughs.
  // Keep a file-scoped allowlist, not a blanket exemption for every shared asset.
  const shared = {
    'features.md': { 'ui-detail-verification.png': /vereinfachtem Chinesisch/i, 'ui-inbox-en.png': /englischen Oberfläche/, 'ui-inbox-mobile.png': /vereinfachtem Chinesisch/i },
    'interface.md': { 'ui-compose.png': /vereinfachtem Chinesisch/i, 'ui-settings-general.png': /vereinfachtem Chinesisch/i, 'ui-audit-report.png': /vereinfachtem Chinesisch/i, 'ui-login-oauth.png': /vereinfachtem Chinesisch/i },
    'modes.md': { 'ui-account-menu.png': /vereinfachtem Chinesisch/i },
  };
  const seenShared = [];
  let screenshots = 0;
  let diagrams = 0;
  for (const name of fs.readdirSync(path.join(root, 'src/content/docs/de/mail')).filter((name) => name.endsWith('.md'))) {
    const markdown = readDoc('de', name.slice(0, -3));
    for (const [, alt, image] of markdown.matchAll(/!\[([^\]]*)\]\((\/images\/mail\/[^)]+)\)/g)) {
      assert.ok(alt.trim(), `${name}: descriptive alt`);
      assert.ok(fs.existsSync(path.join(root, 'public', image.slice(1))), `${name}: ${image}`);
      if (image.startsWith('/images/mail/ui/')) {
        const filename = image.slice('/images/mail/ui/'.length);
        const language = shared[name]?.[filename];
        assert.ok(language, `${name}: unreviewed shared screenshot ${image}`);
        assert.match(alt, language, `${name}: disclose original UI language`);
        assert.ok(readDoc('en', name.slice(0, -3)).includes(`](${image})`), `${name}: genuinely shared across languages`);
        seenShared.push(`${name}/${filename}`);
      } else if (image.includes('/ui/')) {
        assert.ok(image.startsWith('/images/mail/en/ui/'), `${name}: German walkthroughs use English UI`);
        screenshots++;
      } else {
        assert.ok(image.startsWith('/images/mail/de/'), `${name}: diagram must stay German`);
        diagrams++;
      }
    }
  }
  assert.deepEqual(seenShared.sort(), Object.entries(shared).flatMap(([name, images]) => Object.keys(images).map((image) => `${name}/${image}`)).sort());
  assert.ok(screenshots > 0 && diagrams > 0, 'check actual screenshots and diagrams, not an empty set');
});

test('seven-language integrity UI has symmetric keys and exact routes', () => {
  const keys = Object.keys(I18N.en).sort();
  assert.equal(Object.keys(I18N).length, 7);
  for (const [lang, strings] of Object.entries(I18N)) {
    assert.deepEqual(Object.keys(strings).sort(), keys, lang);
    assert.ok(Object.values(strings).every((value) => typeof value === 'string' && value.length > 0));
    assert.equal(getLangStrings(lang), strings);
  }
  assert.equal(getLangStrings('zh-Hant-TW'), I18N['zh-TW']);
  assert.equal(getLangStrings('de-DE'), I18N.de);
  for (const locale of ['', 'zh-tw/', 'en/', 'fr/', 'es/', 'nl/', 'de/']) {
    for (const base of ['', '/epomail']) {
      assert.equal(getCanonicalDocSlug(`${base}/${locale}mail/tamper-proof/`), `${locale}mail/tamper-proof`);
    }
  }
  for (const url of ['/epomailish/mail/tamper-proof', '/epomail/de/mail/tamper-proof/extra', '/missing/mail/tamper-proof', '/epomail/404/']) {
    assert.equal(getCanonicalDocSlug(url), null, url);
  }
});

test('real file hashing matches generator normalization including CRLF, BOM and non-ASCII', async () => {
  for (const text of ['# Local fixture\n', '# Local fixture\r\n', '\ufeff繁體中文\r\nGröße\n', 'a\rb\r\n']) {
    assert.equal(await hashMarkdownFile(file(text), webcrypto.subtle), sha(normalizeMarkdown(text)));
  }
  assert.equal(await compareMarkdownFile(file('same\r\n'), sha('same\n'), webcrypto.subtle), true);
  assert.equal(await compareMarkdownFile(file('different'), sha('same'), webcrypto.subtle), false);
  await assert.rejects(compareMarkdownFile(file('same'), 'invalid', webcrypto.subtle));
  await assert.rejects(hashMarkdownFile(file('same'), null));
  await assert.rejects(hashMarkdownFile(new Blob([new Uint8Array([0xff])]), webcrypto.subtle));
  await assert.rejects(hashMarkdownFile({ arrayBuffer: async () => { throw new Error('read failed'); } }, webcrypto.subtle));
});

test('network and malformed manifest failures cannot become successful comparisons', async () => {
  await assert.rejects(fetchManifest('/manifest', async () => { throw new Error('offline'); }));
  await assert.rejects(fetchManifest('/manifest', async () => ({ ok: false, status: 404 })), /404/);
  await assert.rejects(fetchManifest('/manifest', async () => ({ ok: true, json: async () => { throw new Error('bad JSON'); } })));
  const slug = 'de/mail/tamper-proof';
  const meta = { path: `src/content/docs/${slug}.md`, sha256: sha('fixture') };
  const manifest = { algorithm: 'SHA-256', normalization: 'utf8-lf', documents: { [slug]: meta } };
  assert.equal(getDocMeta(manifest, slug), meta);
  assert.equal(getDocMeta({ ...manifest, algorithm: 'MD5' }, slug), null);
  assert.equal(getDocMeta({ ...manifest, normalization: 'raw' }, slug), null);
  assert.equal(getDocMeta(manifest, 'mail/absent'), null);
  assert.equal(getDocMeta({ ...manifest, documents: { [slug]: { ...meta, path: '../../other.md' } } }, slug), null);
  assert.equal(headState({ gitCommit: 'older-head' }), 'headUnknown');
  assert.equal(headState({ contentSource: 'working-tree', documentsWorkingTreeDirty: true }), 'headDirty');
  assert.equal(headState({ contentSource: 'working-tree', documentsWorkingTreeDirty: false }), 'headClean');
});

test('Git metadata distinguishes clean, dirty, untracked and unavailable sources', () => {
  const commit = 'a'.repeat(40);
  for (const status of ['', ' M src/content/docs/mail/test.md\n', 'A  src/content/docs/mail/test.md\n', '?? src/content/docs/de/mail/test.md\n', '!! src/content/docs/mail/test.md\n']) {
    const calls = [];
    const metadata = readGitMetadata(root, (args) => {
      calls.push(args);
      return args[0] === 'rev-parse' ? commit : args[0] === 'log' ? '2026-10-11T08:47:17+08:00' : status;
    });
    assert.equal(metadata.gitCommit, commit);
    assert.equal(metadata.documentsWorkingTreeDirty, status !== '');
    assert.deepEqual(calls.at(-1).slice(-2), ['--', 'src/content/docs']);
    assert.ok(calls.at(-1).includes('--untracked-files=all'));
  }
  const unavailable = readGitMetadata(root, () => { throw new Error('no Git'); });
  assert.deepEqual(unavailable, { gitCommit: null, gitShortCommit: null, committedAt: null, documentsWorkingTreeDirty: null });
});

test('manifest hashes working files without fabricating authority or writing output on import', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'epomail-integrity-test-'));
  try {
    const dir = path.join(fixture, 'src/content/docs/mail');
    fs.mkdirSync(dir, { recursive: true });
    const text = '---\r\ntitle: Local test\r\n---\r\nLocal fixture\r\n';
    fs.writeFileSync(path.join(dir, 'sample.md'), text);
    const git = { gitCommit: null, gitShortCommit: null, committedAt: null, documentsWorkingTreeDirty: null };
    const manifest = createManifest({ rootDir: fixture, git, now: new Date('2026-11-02T00:00:00Z') });
    assert.equal(manifest.documents['mail/sample'].sha256, sha(normalizeMarkdown(text)));
    assert.equal(manifest.normalization, 'utf8-lf');
    assert.equal(manifest.contentSource, 'working-tree');
    assert.equal(manifest.committedAt, null);
    assert.equal(manifest.totalDocuments, 1);
    assert.ok(!('authority' in manifest) && !('verifiedChannel' in manifest));
    assert.ok(!fs.existsSync(path.join(fixture, 'public')));
    assert.ok(!fs.existsSync(path.join(fixture, 'dist')));
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

test('all seven privacy risk tables preserve five rows and use named keyboard scroll regions', async () => {
  const plain = await createMarkdownProcessor({ syntaxHighlight: false });
  const enhanced = await createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeReadableTables] });
  for (const locale of Object.keys(TABLE_HINTS)) {
    const source = path.join(root, 'src/content/docs', locale === 'root' ? '' : locale, 'mail/privacy-policy.md');
    const markdown = fs.readFileSync(source, 'utf8');
    const table = markdown.match(/^\|[^\n]+(?:\n\|[^\n]+)+/m)?.[0];
    assert.ok(table, locale);
    const options = { fileURL: pathToFileURL(source) };
    const before = fromHtml((await plain.render(table, options)).code, { fragment: true });
    const after = fromHtml((await enhanced.render(table, options)).code, { fragment: true });
    const renderedTable = walk(after, element('table'))[0];
    const originalTable = walk(before, element('table'))[0];
    assert.equal(toString(renderedTable), toString(originalTable), `${locale}: preserve table content`);
    assert.equal(walk(renderedTable, element('tbody'))[0].children.filter(element('tr')).length, 5, locale);
    assert.equal(renderedTable.properties.dataColumns, '2');
    assert.ok(walk(renderedTable, element('th')).every((cell) => cell.properties.scope === 'col'));
    const region = walk(after, (node) => node.properties?.role === 'region')[0];
    assert.equal(region.properties.tabIndex, 0);
    assert.ok(region.properties.ariaLabel.length > 0);
    assert.ok(walk(after, element('p')).some((node) => toString(node) === TABLE_HINTS[locale]), locale);
    assert.deepEqual(region.properties.ariaDescribedBy, ['doc-table-scroll-hint-1']);
  }
});

test('mobile privacy illustration preserves localized alt and five readable topics', async () => {
  const processor = await createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeCompactPrivacyFigure] });
  assert.deepEqual(Object.keys(PRIVACY_TOPICS).sort(), Object.keys(TABLE_HINTS).sort());
  for (const [locale, topics] of Object.entries(PRIVACY_TOPICS)) {
    const source = path.join(root, 'src/content/docs', locale === 'root' ? '' : locale, 'mail/privacy-policy.md');
    const markdown = fs.readFileSync(source, 'utf8');
    const image = markdown.match(/^!\[[^\n]+privacy-pillars\.svg\)$/m)?.[0];
    assert.ok(image, locale);
    const tree = fromHtml((await processor.render(image, { fileURL: pathToFileURL(source) })).code, { fragment: true });
    const picture = walk(tree, element('picture'))[0];
    assert.ok(picture, locale);
    const img = walk(picture, element('img'))[0];
    assert.equal(img.properties.alt, image.slice(2, image.indexOf('](')));
    const responsive = walk(picture, element('source'))[0];
    assert.equal(responsive.properties.media, '(max-width: 40rem)');
    const svg = decodeURIComponent(responsive.properties.srcSet.split(',').slice(1).join(','));
    for (const topic of topics) assert.ok(svg.includes(`>${topic}</text>`), `${locale}: ${topic}`);
    assert.match(svg, /<title>/);
    assert.match(svg, /prefers-color-scheme:dark/);
    assert.doesNotMatch(svg, /<script|<image|foreignObject/);
  }
});

test('custom CSS parses and retains scrolling, focus, dark-mode and reduced-motion safeguards', () => {
  const source = fs.readFileSync(path.join(root, 'src/styles/custom.css'), 'utf8');
  const css = postcss.parse(source);
  const rules = [];
  css.walkRules((rule) => rules.push(rule));
  const declarations = (selector) => rules.filter((rule) => rule.selector === selector).flatMap((rule) => rule.nodes || []);
  assert.ok(declarations('.sl-markdown-content .table-scroll').some((decl) => decl.prop === 'overflow-x' && decl.value === 'auto'));
  assert.ok(declarations('.sl-markdown-content table').every((decl) => !(decl.prop === 'overflow' && decl.value === 'hidden')));
  assert.ok(rules.some((rule) => rule.selector.includes(':focus-visible')));
  assert.ok(rules.some((rule) => rule.selector.includes("[data-theme='dark'] .tamper-fail")));
  assert.match(source, /@media \(prefers-reduced-motion: reduce\)/);
});

test('overridden Astro components compile without a site build', async () => {
  for (const name of ['OverriddenHead', 'OverriddenPagination', 'OverriddenLastUpdated']) {
    const filename = path.join(root, 'src/components', `${name}.astro`);
    const result = await compiler.transform(fs.readFileSync(filename, 'utf8'), { filename });
    assert.deepEqual(result.diagnostics.filter((item) => item.severity === 1), [], name);
  }
});

test('404 route guard and native Head delegation remain isolated (static contract)', () => {
  const source = fs.readFileSync(path.join(root, 'src/components/OverriddenHead.astro'), 'utf8');
  assert.match(source, /import DefaultHead from '@astrojs\/starlight\/components\/Head\.astro'/);
  const guard = source.match(/const isNotFound = ([^;]+);/)[1];
  const isNotFound = new Function('entry', `return ${guard}`);
  for (const slug of ['404', 'de/404', 'en/404']) assert.equal(isNotFound({ slug }), true);
  for (const slug of ['mail/privacy-policy', 'de/mail/overview', 'mail/error-404', 'mail/404-guide']) {
    assert.equal(isNotFound({ slug }), false);
  }
  const branches = source.split('isNotFound ? (')[1].split(') : (');
  assert.equal(branches.length, 2);
  assert.match(branches[0], /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(branches[0], /canonical|hreflang|og:url|DefaultHead/);
  assert.match(branches[1], /<DefaultHead \/>/);
  assert.doesNotMatch(branches[1], /noindex|<meta|<link/);
});
