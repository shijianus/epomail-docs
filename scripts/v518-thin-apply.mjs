// 应用 fr/nl 深化补丁到 v517-figures-{fr,nl}.json，并复核四语深度。
import { readFileSync, writeFileSync } from 'node:fs';

const patch = JSON.parse(readFileSync(new URL('./v518-thin-patch.json', import.meta.url), 'utf8'));
const langs = {};
for (const L of ['fr', 'nl']) {
  langs[L] = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'));
}

let applied = 0;
const missing = [];
for (const [id, byLang] of Object.entries(patch)) {
  const [file, idxRaw] = id.split('#');
  const idx = Number(idxRaw) - 1;
  for (const [L, text] of Object.entries(byLang)) {
    const it = langs[L][file]?.items?.[idx];
    if (!it) { missing.push(`${id} ${L}`); continue; }
    it.d = text;
    applied++;
  }
}
for (const L of Object.keys(langs)) {
  writeFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), JSON.stringify(langs[L], null, 2) + '\n');
}
console.log(`patchEntries=${Object.keys(patch).length} applied=${applied} missing=${missing.length}`);
missing.forEach((m) => console.log('MISSING:', m));
