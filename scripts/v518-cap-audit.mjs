import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LANGS = [['zh', 'src/content/docs/mail'], ['zh-tw', 'src/content/docs/zh-tw/mail'], ['en', 'src/content/docs/en/mail'], ['es', 'src/content/docs/es/mail'], ['fr', 'src/content/docs/fr/mail'], ['nl', 'src/content/docs/nl/mail']];
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));

const seen = new Map(); // key -> Map(lang -> {cap:[], len})
for (const [L, dir] of LANGS) {
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')).sort() : [];
  for (const f of files) {
    const text = readFileSync(join(dir, f), 'utf8');
    for (const m of text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      const key = m[1].split('/').pop();
      if (!figs[key]) continue;
      const after = text.slice(m.index + m[0].length, m.index + m[0].length + 500);
      const lines = after.split('\n').map((s) => s.trim());
      const cap = [];
      for (const ln of lines.slice(1)) {
        if (/^\*[^*].*\*$/.test(ln)) cap.push(ln); else if (ln === '') continue; else break;
      }
      if (!seen.has(key)) seen.set(key, new Map());
      if (!seen.get(key).has(L)) seen.get(key).set(L, { cap, page: f });
    }
  }
}

let shortCells = 0, okCells = 0, noCap = 0;
for (const [key, byLang] of seen) {
  const row = [];
  for (const [L] of LANGS) {
    const e = byLang.get(L);
    if (!e) { row.push('MISS'); continue; }
    const first = (e.cap[0] || '').replace(/^\*|\*$/g, '').trim();
    const body = first.replace(/^[^：:]{1,12}[：:]\s*/, '').replace(/[。.]$/, '');
    if (!e.cap.length) { row.push('NOCAP'); noCap++; }
    else if (body.length < 24) { row.push(`T${String(body.length).padStart(2)}`); shortCells++; }
    else { row.push(`o${String(body.length).padStart(2)}`); okCells++; }
  }
  console.log(key.padEnd(30), row.map((r) => r.padEnd(6)).join(''), (byLang.get('zh').page));
}
console.log(`\nshortCells=${shortCells} okCells=${okCells} noCap=${noCap} figures=${seen.size}`);
