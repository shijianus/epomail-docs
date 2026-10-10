import { readFileSync } from 'node:fs';
const rows = JSON.parse(readFileSync(new URL('./.instances.json', import.meta.url), 'utf8'));
const LANGS = ['zh', 'zh-tw', 'en', 'es', 'fr', 'nl'];
const ANN = /(标注|標註|Annotation|Anotacion|Aantekening)/;
// strip leading "Figure: " / "图：" style label
const LABEL = /^\*([^：:*]{1,16}[：:])\s*/;
const byFig = new Map();
for (const r of rows) { if (!byFig.has(r.key)) byFig.set(r.key, new Map()); byFig.get(r.key).set(r.lang, r); }

const weak = [];
for (const [key, per] of byFig) {
  const cells = [];
  for (const L of LANGS) {
    const r = per.get(L);
    const caps = r ? r.caps : [];
    const main = caps.find((c) => !ANN.test(c)) || '';
    let body = main.replace(/^\*/, '').replace(/\*$/, '').replace(LABEL, '').trim().replace(/[。.\s]+$/, '');
    const n = body.replace(/[^\p{L}\p{N}]/gu, '').length;
    cells.push({ L, body, n });
    if (n < 30) weak.push(`${key.padEnd(26)} ${L.padEnd(6)} n=${String(n).padStart(3)} ${body}`);
  }
}
console.log(`weak cells (<30 body chars): ${weak.length}\n`);
weak.forEach((w) => console.log(w));
