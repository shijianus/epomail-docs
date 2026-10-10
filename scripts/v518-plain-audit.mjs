import { readFileSync } from 'node:fs';
const base = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const langs = ['zh-tw', 'es', 'fr', 'nl'];
const docs = {}; for (const L of langs) docs[L] = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'));
const plains = Object.entries(base).filter(([, v]) => v.plain).map(([k]) => k);
console.log('plain figures:', plains.length);
for (const k of plains) {
  const zhItems = base[k].items.length;
  const line = [`${k} n=${zhItems}`.padEnd(34)];
  for (const L of langs) {
    const o = docs[L][k];
    if (!o) { line.push(`${L}:MISS`); continue; }
    let minLen = 1e9, hOut = 0;
    (o.items || []).forEach((it, i) => { minLen = Math.min(minLen, (it.d || '').length); if (!it.h || it.h === it.d) hOut++; });
    line.push(`${L}: n=${(o.items || []).length} min=${minLen === 1e9 ? '-' : minLen}${(o.items || []).length !== zhItems ? ' XCT' : ''}`);
  }
  console.log(line.join(' | '));
}
// region heading parity: are headings distinct from descriptions?
let bad = 0;
for (const [k, v] of Object.entries(base)) {
  (v.items || []).forEach((it, i) => {
    const h = it.h.zh, d = it.d.zh;
    if (d.length < h.length * 1.3) { bad++; console.log(`THIN ${k}#${i + 1} h=${h.length} d=${d.length}`); }
  });
}
console.log('regions where d is not meaningfully longer than h:', bad);
