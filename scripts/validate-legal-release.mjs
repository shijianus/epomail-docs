import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(root, 'src/content/docs');
const locales = ['', 'zh-tw', 'en', 'fr', 'es', 'nl'];
const policies = ['overview', 'privacy-policy', 'terms-of-service', 'acceptable-use', 'data-security', 'sub-processors', 'key-terms', 'open-source', 'service-scope', 'tamper-proof'];
const figures = ['tos-contract', 'privacy-pillars', 'security-trust-shield', 'self-host-responsibilities', 'subprocessor-map', 'legal-architecture', 'aup-ladder', 'key-terms-glossary', 'data-sovereignty-export', 'dual-nature-scale', 'anti-tamper-architecture', 'project-architecture'];
const normalize = (text) => text.replace(/\r\n/g, '\n');
const digest = (text) => crypto.createHash('sha256').update(normalize(text), 'utf8').digest('hex');

for (const name of policies) {
  let expected;
  for (const locale of locales) {
    const file = path.join(docsRoot, locale, 'mail', `${name}.md`);
    const text = fs.readFileSync(file, 'utf8');
    assert.match(text, /<!-- legal-review-draft -->/, `Draft status missing: ${file}`);
    assert.match(text.slice(0, 1200), /5\.21/, `Release version missing: ${file}`);
    const headings = [...text.matchAll(/^(#{2,3})\s+(.*)$/gm)].map((match) => [match[1].length, match[2].match(/^\d+(?:\.\d+)?/)?.[0] || '']);
    const tables = text.split(/\n\s*\n/).map((block) => block.split('\n').filter((line) => line.startsWith('|'))).filter((rows) => rows.length > 1).map((rows) => rows.map((row) => row.split('|').length - 2));
    const profile = { headings, tables, notes: [...text.matchAll(/^:::/gm)].length };
    if (!expected) expected = profile;
    else assert.deepEqual(profile, expected, `Legal structure mismatch: ${file}`);
    const images = [...text.matchAll(/!\[[^\]]*\]\((\/images\/[^)]+)\)/g)].map((match) => match[1]);
    for (const image of images) assert.ok(fs.existsSync(path.join(root, 'public', image)), `Missing legal figure: ${image}`);
  }
}

for (const locale of locales) {
  for (const name of figures) {
    const file = path.join(root, 'public/images/mail', locale, `${name}.svg`);
    const text = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(text, /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/i, `Unescaped XML: ${file}`);
    assert.doesNotMatch(text, /binds you to these terms|sole and exclusive|100% intact|零遙測|唯一且排他|30 days to respond|100,000/i, `Obsolete claim in figure: ${file}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/tamper-proof.json'), 'utf8'));
const entries = Object.values(manifest.documents);
assert.equal(entries.length, 216, 'Unexpected release scope');
for (const entry of entries) {
  const file = path.resolve(root, entry.path);
  assert.ok(file.startsWith(docsRoot + path.sep), 'Manifest path escapes documentation');
  assert.equal(entry.sha256, digest(fs.readFileSync(file, 'utf8')), `Stale manifest: ${entry.path}`);
  if (process.argv.includes('--committed-source')) {
    const source = execFileSync('git', ['show', `${manifest.gitCommit}:${entry.path}`], { cwd: root, encoding: 'utf8' });
    assert.equal(entry.sha256, digest(source), `Manifest commit differs: ${entry.path}`);
  }
}
console.log(`Legal release checks passed: ${policies.length * locales.length} policy pages, ${figures.length * locales.length} figures, ${entries.length} hashes${process.argv.includes('--committed-source') ? ', committed sources verified' : ''}`);
