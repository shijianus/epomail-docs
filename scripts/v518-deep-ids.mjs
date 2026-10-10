// 提取 v5.18 深化过的图解条目 id（file#idx）：以当前 figure-notes 的 zh 文本与 enrich-spec 的 new 文本精确匹配。
import { readFileSync, writeFileSync } from 'node:fs';

const notes = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const unesc = (s) => s.replace(/\\'/g, "'");

function extractNews(path) {
  const t = readFileSync(new URL(path, import.meta.url), 'utf8');
  const chunks = t.split(/@@@/).map((s) => s.trim()).filter(Boolean);
  const out = [];
  for (let i = 0; i < chunks.length; i += 2) {
    const newChunk = chunks[i + 1];
    if (!newChunk) continue;
    const m = [...newChunk.matchAll(/zh: '((?:[^'\\]|\\.)*)'/g)].map((x) => unesc(x[1]));
    out.push(...m);
  }
  return out;
}

const news = extractNews('./v518-enrich-spec2.txt');
const deepIds = new Set();
for (const [f, fig] of Object.entries(notes)) {
  fig.items.forEach((it, i) => {
    if (news.includes(it.d.zh)) deepIds.add(`${f}#${i + 1}`);
  });
}
console.log('deepened:', deepIds.size);
console.log([...deepIds].sort().join(' '));
writeFileSync(new URL('./.deep-ids.txt', import.meta.url), [...deepIds].sort().join('\n') + '\n');
