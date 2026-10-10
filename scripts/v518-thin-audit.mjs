// 深度比对：找出四语翻译明显薄于 zh/en 原文的图解条目（供人工重译）。
import { readFileSync } from 'node:fs';

const notes = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const langs = {};
for (const L of ['zh-tw', 'es', 'fr', 'nl']) {
  langs[L] = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'));
}

const rows = [];
for (const [f, fig] of Object.entries(notes)) {
  fig.items.forEach((it, i) => {
    const zh = it.d.zh.length, en = it.d.en.length;
    const cur = {};
    for (const L of ['zh-tw', 'es', 'fr', 'nl']) {
      const d = langs[L][f]?.items?.[i]?.d || '';
      cur[L] = d.length;
    }
    const flag =
      cur['zh-tw'] < zh * 0.72 ||
      cur.es < en * 0.62 ||
      cur.fr < en * 0.62 ||
      cur.nl < en * 0.62;
    const minL = Math.min(...Object.values(cur));
    if (flag || (en >= 200 && minL < 120)) rows.push({ id: `${f}#${i + 1}`, zh, en, ...cur, flag: flag ? '!' : '~' });
  });
}
rows.sort((a, b) => a.zh + a.en - (b.zh + b.en));
for (const r of rows) {
  console.log(`${r.flag} ${r.id.padEnd(28)} zh=${String(r.zh).padStart(3)} en=${String(r.en).padStart(3)} tw=${String(r['zh-tw']).padStart(3)} es=${String(r.es).padStart(3)} fr=${String(r.fr).padStart(3)} nl=${String(r.nl).padStart(3)}`);
}
console.log(`total flagged/soft: ${rows.length}`);
