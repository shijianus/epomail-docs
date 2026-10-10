import { readFileSync, writeFileSync } from 'node:fs';
const blocks = JSON.parse(readFileSync(new URL('./.cap-blocks.json', import.meta.url), 'utf8'));
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const rows = Object.entries(blocks).map(([id, v]) => {
  const key = v.src.split('/').pop();
  const f = figs[key];
  return { id, lang: v.lang, page: v.page, imgLine: v.imgLine, key, plain: !!f.plain, n: f.items.length, caps: v.caps.map((c) => c.text) };
});
rows.sort((a, b) => a.key.localeCompare(b.key) || a.lang.localeCompare(b.lang) || a.page.localeCompare(b.page));
writeFileSync(new URL('./.instances.json', import.meta.url), JSON.stringify(rows, null, 1));
console.log('instances', rows.length);
const byFigLang = new Map();
for (const r of rows) { const g = `${r.key}`; if (!byFigLang.has(g)) byFigLang.set(g, new Set()); byFigLang.get(g).add(r.lang); }
console.log([...byFigLang].map(([k, s]) => `${k}:${s.size}`).join(' '));
console.log('total figure-instances per lang:', ['zh','zh-tw','en','es','fr','nl'].map((L)=>`${L}=${rows.filter(r=>r.lang===L).length}`).join(' '));
