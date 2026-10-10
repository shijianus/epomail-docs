import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync(new URL('./.instances.json', import.meta.url), 'utf8'));
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const ANN = /(标注|標註|Annotation|Anotacion|Aantekening)/;
const LANGS = ['zh', 'zh-tw', 'en', 'es', 'fr', 'nl'];
const byFig = new Map();
for (const r of rows) { if (!byFig.has(r.key)) byFig.set(r.key, []); byFig.get(r.key).push(r); }

// which figures still have no substantive caption in at least one language
const need = [];
for (const [key, list] of byFig) {
  const per = {};
  for (const L of LANGS) {
    const r = list.find((x) => x.lang === L);
    const main = (r?.caps || []).filter((c) => !ANN.test(c));
    per[L] = main[0] || '';
  }
  const titleOnly = Object.values(per).filter((c) => c.replace(/[^\p{L}\p{N}]/gu, '').length < 22).length;
  if (titleOnly) need.push({ key, titleOnly, per });
}
console.log(`figures with a title-only caption somewhere: ${need.length}\n`);
for (const n of need) {
  console.log(`### ${n.key}  (title-only langs: ${n.titleOnly})`);
  for (const L of LANGS) console.log(`  ${L.padEnd(6)} ${n.per[L]}`);
  console.log(`  pages: ${[...new Set(byFig.get(n.key).map((r) => r.lang + ':' + r.page))].join(' ')}`);
  console.log();
}
