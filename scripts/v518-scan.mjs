import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const LANGS = [['zh', 'src/content/docs/mail'], ['zh-tw', 'src/content/docs/zh-tw/mail'], ['en', 'src/content/docs/en/mail'], ['es', 'src/content/docs/es/mail'], ['fr', 'src/content/docs/fr/mail'], ['nl', 'src/content/docs/nl/mail']];
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));

for (const [L, dir] of LANGS) {
  if (!existsSync(dir)) { console.log(`### ${L} MISSING ${dir}`); continue; }
  const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  console.log(`\n===== ${L} (${files.length} pages) =====`);
  for (const f of files) {
    const text = readFileSync(join(dir, f), 'utf8');
    const imgs = [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];
    if (!imgs.length) continue;
    const marks = [];
    for (const m of imgs) {
      const src = m[1];
      const key = src.split('/').pop();
      const after = text.slice(m.index + m[0].length, m.index + m[0].length + 400);
      const lines = after.split('\n').map((s) => s.trim());
      let cap = [];
      for (const ln of lines.slice(1)) {
        if (/^\*[^*].*\*$/.test(ln)) { cap.push(ln); if (cap.length >= 2) break; } else if (ln === '') continue; else break;
      }
      marks.push(`${figs[key] ? 'SPEC' : '----'} ${key}${cap.length ? ' | ' + cap.join(' || ') : ' | <NO CAPTION>'}`);
    }
    if (marks.some((m) => m.startsWith('SPEC'))) { console.log(`-- ${f}`); marks.forEach((m) => console.log('   ' + m)); }
  }
}
