import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const LANGS = [['zh', 'src/content/docs/mail'], ['zh-tw', 'src/content/docs/zh-tw/mail'], ['en', 'src/content/docs/en/mail'], ['es', 'src/content/docs/es/mail'], ['fr', 'src/content/docs/fr/mail'], ['nl', 'src/content/docs/nl/mail']];
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const IMG = /^!\[.*\]\((\S+?)\)\s*$/;

const out = {};
for (const [L, dir] of LANGS) {
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')).sort() : [];
  for (const f of files) {
    const lines = readFileSync(join(dir, f), 'utf8').split(/\r?\n/);
    lines.forEach((ln, i) => {
      const m = IMG.exec(ln.trim());
      if (!m) return;
      const key = basename(m[1]);
      if (!figs[key]) return;
      // caption = consecutive italic-only lines after the image, skipping blanks
      const caps = [];
      let j = i + 1;
      let blanks = 0;
      while (j < lines.length) {
        const t = lines[j].trim();
        if (t === '') { blanks++; if (blanks > 1) break; j++; continue; }
        if (/^\*[^*].*\*$/.test(t) && !/^\*\*/.test(t)) { caps.push({ line: j + 1, text: t }); blanks = 0; j++; continue; }
        break;
      }
      const id = `${L}|${f}|${i + 1}|${key}`;
      out[id] = { lang: L, page: f, imgLine: i + 1, src: m[1], caps, endLine: j + 1, lineCount: lines.length };
    });
  }
}
writeFileSync(new URL('./.cap-blocks.json', import.meta.url), JSON.stringify(out, null, 1));
const n = Object.values(out).length;
console.log(`instances=${n}`);
const thin = Object.values(out).filter((v) => !v.caps.length || v.caps.every((c) => c.text.length < 80));
console.log(`thin-ish=${thin.length}`);
