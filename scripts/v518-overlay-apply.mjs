import { readFileSync, writeFileSync } from 'node:fs';

const patch = JSON.parse(readFileSync(new URL('./v518-overlay-patch.json', import.meta.url), 'utf8'));
const langs = ['zh-tw', 'es', 'fr', 'nl'];
const docs = {};
for (const L of langs) docs[L] = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'));

let applied = 0;
const missing = [];
for (const [id, byLang] of Object.entries(patch)) {
  const [file, idxRaw] = id.split('#');
  const idx = Number(idxRaw) - 1;
  for (const [L, d] of Object.entries(byLang)) {
    const doc = docs[L];
    if (!doc || !doc[file] || !doc[file].items || !doc[file].items[idx]) { missing.push(`${id} ${L}`); continue; }
    doc[file].items[idx].d = d;
    applied++;
  }
}

for (const L of langs) {
  writeFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), JSON.stringify(docs[L], null, 2) + '\n');
  let short = 0;
  for (const v of Object.values(docs[L])) for (const it of v.items || []) if ((it.d || '').length < 80) short++;
  console.log(`${L.padEnd(6)} regions=${Object.values(docs[L]).reduce((a, v) => a + (v.items || []).length, 0)} stillShort=${short}`);
}
console.log(`patchEntries=${Object.keys(patch).length} applied=${applied} missing=${missing.length}`);
missing.forEach((m) => console.log('  MISSING:', m));
