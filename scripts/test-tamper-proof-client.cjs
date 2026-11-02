'use strict';

// Zero dependencies, browser or network: run the shipped client in a fresh VM.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const clientPath = path.join(root, 'public/scripts/tamper-proof-client.js');
const client = fs.readFileSync(clientPath, 'utf8');
const HASH = 'ab'.repeat(32);
const COMMIT = 'c'.repeat(40);
const SLUG = 'en/mail/tamper-proof';
const ATTACK = '<img src=x onerror=alert(1)>';

class FakeElement {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.id = '';
    this.className = '';
    this.children = [];
    this.listeners = new Map();
    this.attributes = new Map();
    this.disabled = false;
    this._text = '';
  }
  set textContent(value) {
    this._text = String(value);
    this.children = [];
  }
  get textContent() {
    return this._text + this.children.map(child => child.textContent).join('');
  }
  // Any HTML insertion fails the test, even when it happens inside a caught path.
  set innerHTML(_) {
    htmlWrites.push('innerHTML');
    throw new Error('HTML insertion is forbidden');
  }
  set outerHTML(_) {
    htmlWrites.push('outerHTML');
    throw new Error('HTML insertion is forbidden');
  }
  insertAdjacentHTML() {
    htmlWrites.push('insertAdjacentHTML');
    throw new Error('HTML insertion is forbidden');
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  insertBefore(child, reference) {
    const index = this.children.indexOf(reference);
    assert.notEqual(index, -1, 'insertion target must exist');
    this.children.splice(index, 0, child);
    return child;
  }
  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }
  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }
  async dispatch(type) {
    await Promise.all((this.listeners.get(type) || []).map(listener => listener()));
  }
  async click() {
    if (!this.disabled) await this.dispatch('click');
  }
  querySelector(selector) {
    return all(this).slice(1).find(node => matches(node, selector)) || null;
  }
}

const htmlWrites = [];
function all(node) {
  return [node, ...node.children.flatMap(all)];
}
function matches(node, selector) {
  if (selector.startsWith('#')) return node.id === selector.slice(1);
  if (selector.startsWith('.')) return node.className.split(/\s+/).includes(selector.slice(1));
  return node.tagName === selector.toUpperCase();
}
function manifest(sha256 = HASH, gitCommit = COMMIT, slug = SLUG) {
  return { algorithm: 'SHA-256', gitCommit, documents: { [slug]: { sha256 } } };
}
function json(value, status = 200) {
  return { status, value };
}
function malformed(edit) {
  const value = manifest();
  edit(value);
  return json(value);
}
function harness(steps, { pathname = `/epomail/${SLUG}/`, lang = 'en', readyState = 'loading', clipboardFails = false } = {}) {
  const document = new FakeElement('document');
  document.readyState = readyState;
  document.documentElement = { lang };
  document.getElementById = id => all(document).find(node => node.id === id) || null;
  document.createElement = tag => new FakeElement(tag);
  const container = document.appendChild(new FakeElement('main'));
  container.className = 'sl-markdown-content';
  const body = container.appendChild(new FakeElement('p'));
  body.textContent = 'Page body is not hashed by this client.';
  const heading = container.appendChild(new FakeElement('h2'));
  heading.textContent = 'Section 1';
  const calls = [];
  const copies = [];
  const context = vm.createContext({
    document,
    window: { location: { pathname } },
    navigator: { clipboard: { async writeText(value) {
      if (clipboardFails) throw new Error('Clipboard denied');
      copies.push(value);
    } } },
    fetch: async (url, options) => {
      const step = steps[calls.length];
      calls.push({ url, options });
      assert.ok(step, 'unexpected fetch');
      if (step.error) throw step.error;
      return {
        ok: step.status >= 200 && step.status < 300,
        status: step.status,
        async json() {
          if (step.invalidJson) throw new SyntaxError('Invalid JSON');
          return step.value;
        }
      };
    }
  });
  function verifyRequests() {
    assert.equal(calls.length, steps.length, 'expected number of manifest requests');
    for (const { url, options } of calls) {
      assert.match(url, /^(?:\/epomail)?\/tamper-proof\.json(?:\?t=\d+)?$/);
      assert.equal(options.cache, 'no-store');
      assert.equal(options.mode, 'same-origin');
      assert.equal(options.redirect, 'error');
      assert.equal(options.body, undefined, 'do not send page content');
    }
    assert.equal(htmlWrites.length, 0, 'no innerHTML or other HTML insertion');
  }
  return {
    document, container, body, calls, copies,
    get widget() { return document.getElementById('tamper-proof-widget'); },
    get status() { return document.getElementById('tamper-verify-status'); },
    get button() { return document.getElementById('tamper-verify-btn'); },
    get copyButton() { return document.getElementById('tamper-copy-btn'); },
    async start() {
      vm.runInContext(client, context, { filename: clientPath });
      if (readyState === 'loading') await document.dispatch('DOMContentLoaded');
      else await new Promise(resolve => setImmediate(resolve));
    },
    async check() { await this.button.click(); },
    verifyRequests
  };
}
function expectState(h, state, textPattern) {
  const classes = h.status.className.split(/\s+/);
  assert.equal(classes.includes('tamper-success'), state === 'success');
  assert.equal(classes.includes('tamper-fail'), state === 'fail');
  if (textPattern) assert.match(h.status.textContent, textPattern);
  assert.equal(h.button.disabled, false, 'button must be enabled after the request');
}

const locales = [
  ['zh-CN', 'mail/tamper-proof', '发布清单一致性检查', '检查清单一致性', '无法验证'],
  ['zh-TW', 'zh-tw/mail/tamper-proof', '發布清單一致性檢查', '檢查清單一致性', '無法驗證'],
  ['en', SLUG, 'Release manifest consistency check', 'Check manifest consistency', 'Unable to verify'],
  ['fr', 'fr/mail/tamper-proof', 'Contrôle de cohérence du manifeste de publication', 'Contrôler la cohérence du manifeste', 'Vérification impossible'],
  ['es', 'es/mail/tamper-proof', 'Comprobación de coherencia del manifiesto de publicación', 'Comprobar la coherencia del manifiesto', 'No se puede verificar'],
  ['nl', 'nl/mail/tamper-proof', 'Consistentiecontrole van het publicatiemanifest', 'Manifestconsistentie controleren', 'Verificatie niet mogelijk']
];

for (const [lang, slug, title, buttonText, failureText] of locales) {
  test(`${lang}: consistent records succeed; labels and document structure agree`, async () => {
    const h = harness([json(manifest(HASH, COMMIT, slug)), json(manifest(HASH, COMMIT, slug))], {
      pathname: `/epomail/${slug}/`, lang
    });
    await h.start();
    expectState(h, 'ready');
    assert.equal(h.widget.querySelector('.tamper-title').textContent, title);
    assert.equal(h.widget.querySelector('.tamper-pill').textContent, 'HASH RECORD');
    assert.equal(h.button.textContent, buttonText);
    assert.equal(h.status.getAttribute('role'), 'status');
    assert.equal(h.status.getAttribute('aria-live'), 'polite');
    assert.equal(h.container.children.indexOf(h.widget), h.container.children.indexOf(h.container.querySelector('h2')) - 1);
    await h.check();
    expectState(h, 'success');
    assert.ok(h.status.textContent.includes('gitCommit'));
    assert.ok(h.status.textContent.includes('SHA-256'));
    assert.equal(h.widget.textContent.includes('SECURED'), false);
    h.verifyRequests();

    const page = fs.readFileSync(path.join(root, 'src/content/docs', `${slug}.md`), 'utf8');
    assert.ok(page.includes(title), 'page and panel use the same name');
    assert.ok(page.includes(buttonText), 'page instructions use the actual button label');
    assert.ok(page.includes(failureText), 'page documents the actual failure label');
    assert.match(page, /5\.21/);
    assert.deepEqual([...page.matchAll(/^## (\d)\./gm)].map(match => match[1]), ['1', '2', '3', '4', '5', '6']);
    const tableRows = page.split('\n').filter(line => line.startsWith('|'));
    assert.equal(tableRows.length, 12, 'two tables, each with a heading, separator and four data rows');
    assert.ok(tableRows.every(row => row.split('|').length === 5), 'all tables have three columns');
    const prefix = slug.slice(0, -'mail/tamper-proof'.length);
    assert.ok(page.includes(`(/${prefix}mail/data-security/)`));
    assert.ok(page.includes(`(/${prefix}mail/privacy-policy/)`));
    assert.ok(page.includes(`/images/mail/${prefix}anti-tamper-architecture.svg`));
  });
  test(`${lang}: HTTP errors use a localized failure, never success`, async () => {
    const h = harness([json(manifest(HASH, COMMIT, slug)), json(manifest(HASH, COMMIT, slug), 500)], {
      pathname: `/${slug}`, lang
    });
    await h.start();
    await h.check();
    expectState(h, 'fail');
    assert.ok(h.status.textContent.startsWith(failureText));
    h.verifyRequests();
  });
}

for (const [label, fresh] of [
  ['hash changed', manifest('de'.repeat(32))],
  // Same abbreviated prefix catches accidental comparisons of gitShortCommit.
  ['full commit changed with the same short prefix', manifest(HASH, `${COMMIT.slice(0, 7)}${'d'.repeat(33)}`)]
]) {
  test(`${label}: verification fails`, async () => {
    const h = harness([json(manifest()), json(fresh)]);
    await h.start();
    await h.check();
    expectState(h, 'fail', /^Verification failed:/);
    assert.equal(h.document.getElementById('doc-sha256-val').textContent, HASH);
    assert.equal(h.document.getElementById('doc-git-commit-val').textContent, COMMIT);
    h.verifyRequests();
  });
}

const badResponses = [
  ['HTTP 500 with otherwise valid JSON', () => json(manifest(), 500)],
  ['invalidJson', () => ({ status: 200, invalidJson: true })],
  ['missing entry', () => malformed(m => { delete m.documents[SLUG]; })],
  ['invalidHash containing HTML', () => malformed(m => { m.documents[SLUG].sha256 = ATTACK; })],
  ['network error', () => ({ error: new Error(ATTACK) })],
  ['null JSON', () => json(null)],
  ['array JSON', () => json([])],
  ['string JSON', () => json('not a manifest')],
  ['missing documents', () => malformed(m => { delete m.documents; })],
  ['null documents', () => malformed(m => { m.documents = null; })],
  ['array documents', () => malformed(m => { m.documents = []; })],
  ['string entry', () => malformed(m => { m.documents[SLUG] = HASH; })],
  ['null entry', () => malformed(m => { m.documents[SLUG] = null; })],
  ['array entry', () => malformed(m => { m.documents[SLUG] = []; })],
  ['inherited entry', () => malformed(m => { m.documents = Object.create(m.documents); })],
  ['inherited hash', () => malformed(m => { m.documents[SLUG] = Object.create({ sha256: HASH }); })],
  ['missing hash', () => malformed(m => { delete m.documents[SLUG].sha256; })],
  ['63-character hash', () => malformed(m => { m.documents[SLUG].sha256 = HASH.slice(1); })],
  ['65-character hash', () => malformed(m => { m.documents[SLUG].sha256 = `${HASH}a`; })],
  ['non-hex hash', () => malformed(m => { m.documents[SLUG].sha256 = 'g'.repeat(64); })],
  ['hash with trailing newline', () => malformed(m => { m.documents[SLUG].sha256 = `${HASH}\n`; })],
  ['number hash', () => malformed(m => { m.documents[SLUG].sha256 = 123; })],
  ['missing commit', () => malformed(m => { delete m.gitCommit; })],
  ['unknown commit', () => malformed(m => { m.gitCommit = 'unknown'; })],
  ['abbreviated commit', () => malformed(m => { m.gitCommit = COMMIT.slice(0, 7); })],
  ['non-hex commit', () => malformed(m => { m.gitCommit = 'g'.repeat(40); })],
  ['commit containing HTML', () => malformed(m => { m.gitCommit = ATTACK; })],
  ['commit with trailing newline', () => malformed(m => { m.gitCommit = `${COMMIT}\n`; })],
  ['wrong algorithm', () => malformed(m => { m.algorithm = 'MD5'; })],
  ['missing algorithm', () => malformed(m => { delete m.algorithm; })]
];

for (const [label, response] of badResponses) {
  for (const initial of [true, false]) {
    test(`${initial ? 'initial load' : 'refresh'}: ${label} is unable to verify`, async () => {
      const h = harness(initial ? [response()] : [json(manifest()), response()]);
      await h.start();
      assert.ok(h.widget, 'panel must be visible even when the initial load fails');
      if (!initial) await h.check();
      expectState(h, 'fail', /^Unable to verify:/);
      assert.equal(h.widget.textContent.includes(ATTACK), false, 'untrusted data and errors must not be displayed as markup');
      if (initial) {
        assert.equal(h.copyButton.disabled, true);
        assert.equal(h.document.getElementById('doc-sha256-val').textContent, 'No valid record');
        assert.equal(h.document.getElementById('doc-git-commit-val').textContent, 'No valid record');
      }
      h.verifyRequests();
    });
  }
}

test('a retry after initial failure establishes a baseline, not success', async () => {
  const h = harness([{ error: new Error('offline') }, json(manifest()), json(manifest())]);
  await h.start();
  expectState(h, 'fail');
  assert.equal(h.button.textContent, 'Reload manifest');
  await h.check();
  expectState(h, 'ready', /not yet checked/);
  await h.check();
  expectState(h, 'success');
  h.verifyRequests();
});

test('a later HTTP error replaces an earlier success with unable to verify', async () => {
  const h = harness([json(manifest()), json(manifest()), json(manifest(), 500)]);
  await h.start();
  await h.check();
  expectState(h, 'success');
  await h.check();
  expectState(h, 'fail', /^Unable to verify:/);
  h.verifyRequests();
});

test('same-site records still match after page body changes: no document integrity claim', async () => {
  const h = harness([json(manifest()), json(manifest())]);
  await h.start();
  h.body.textContent = 'Changed page body with no matching document digest calculation.';
  await h.check();
  expectState(h, 'success');
  assert.match(h.status.textContent, /Page content, publisher identity, signatures and legal compliance were not verified/);
  h.verifyRequests();
});

test('untrusted optional metadata is ignored, without HTML insertion or remote links', async () => {
  const value = manifest();
  Object.assign(value, {
    gitShortCommit: ATTACK, committedAt: ATTACK, authority: ATTACK,
    officialOrigin: 'https://attacker.invalid', repository: 'javascript:alert(1)'
  });
  Object.assign(value.documents[SLUG], { title: ATTACK, path: ATTACK, slug: ATTACK });
  const h = harness([json(value), json(value)]);
  await h.start();
  await h.check();
  expectState(h, 'success');
  assert.equal(h.widget.textContent.includes(ATTACK), false);
  assert.equal(h.widget.querySelector('img'), null);
  assert.equal(h.widget.querySelector('a'), null);
  h.verifyRequests();
});

test('uppercase hex SHA-256 and full 64-character Git object identifiers are valid', async () => {
  const value = manifest(HASH.toUpperCase(), 'DE'.repeat(32));
  const h = harness([json(value), json(value)]);
  await h.start();
  await h.check();
  expectState(h, 'success');
  h.verifyRequests();
});

test('duplicate Astro events create only one panel and one initial read', async () => {
  const h = harness([json(manifest())]);
  const starting = h.start();
  await h.document.dispatch('astro:page-load');
  await starting;
  await h.document.dispatch('astro:page-load');
  assert.equal(all(h.document).filter(node => node.id === 'tamper-proof-widget').length, 1);
  h.verifyRequests();
});

test('an Astro replacement gets a new baseline, not a cached previous-page manifest', async () => {
  const h = harness([json(manifest()), json(manifest('de'.repeat(32)))]);
  await h.start();
  h.container.children = h.container.children.filter(child => child !== h.widget);
  await h.document.dispatch('astro:page-load');
  expectState(h, 'ready');
  assert.equal(h.document.getElementById('doc-sha256-val').textContent, 'de'.repeat(32));
  h.verifyRequests();
});

test('already-loaded document initializes without DOMContentLoaded', async () => {
  const h = harness([json(manifest())], { readyState: 'complete' });
  await h.start();
  expectState(h, 'ready');
  h.verifyRequests();
});

for (const pathname of ['/epomail/en/mail/privacy-policy/', '/mail/tamper-proof-extra/', '/other/mail/tamper-proof/', '/epomail/en/mail/tamper-proof/extra/']) {
  test(`no panel or request on unrelated route ${pathname}`, async () => {
    const h = harness([], { pathname });
    await h.start();
    assert.equal(h.widget, null);
    h.verifyRequests();
  });
}

test('copy uses the validated hash; clipboard errors do not change check status', async () => {
  const h = harness([json(manifest())]);
  await h.start();
  await h.copyButton.click();
  assert.deepEqual(h.copies, [HASH]);
  expectState(h, 'ready');
  h.verifyRequests();

  const denied = harness([json(manifest())], { clipboardFails: true });
  await denied.start();
  await denied.copyButton.click();
  assert.equal(denied.copyButton.textContent, 'Copy failed');
  expectState(denied, 'ready');
  denied.verifyRequests();
});
