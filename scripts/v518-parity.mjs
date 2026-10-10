import { readFileSync } from 'node:fs';
const base = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const langs = ['zh-tw', 'es', 'fr', 'nl'];
const docs = {};
for (const L of langs) docs[L] = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'));

let zhShort = 0, zhRegions = 0;
const rows = [];
for (const [f, v] of Object.entries(base)) {
  (v.items || []).forEach((it, i) => {
    zhRegions++;
    const zh = it.d.zh.length;
    if (zh < 80) zhShort++;
    const cells = langs.map((L) => {
      const o = docs[L][f];
      const d = o && o.items && o.items[i] ? o.items[i].d : null;
      return d === null ? 'MISS' : `${String(d.length).padStart(3)}${d.length < zh * 0.75 ? '!' : ' '}`;
    });
    rows.push([`${f}#${i + 1}`.padEnd(34), String(zh).padStart(3), ...cells]);
  });
}
console.log('region'.padEnd(34), 'zh', ...langs.map((l) => l.padStart(4)));
rows.forEach((r) => console.log(r.join(' ')));
console.log(`\nzhRegions=${zhRegions} zhShort(<80)=${zhShort}`);
for (const L of langs) {
  let stale = 0;
  for (const [f, v] of Object.entries(base)) (v.items || []).forEach((it, i) => {
    const o = docs[L][f]; const d = o && o.items && o.items[i] ? o.items[i].d : '';
    if (d.length < it.d.zh.length * 0.75) stale++;
  });
  console.log(`${L}: regions<75% of zh = ${stale}`);
}
