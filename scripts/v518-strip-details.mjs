// 剥离 v5.18 注入器插入的 details 块（按 28 图标题头识别，六语言）；
// 不触碰站点既有的 v5.16 图解 details（标题头不在本表内）。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const NOTES = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const TITLES = JSON.parse(readFileSync(new URL('./v518-titles-i18n.json', import.meta.url), 'utf8'));

const LANGS = [
  { dir: 'src/content/docs/mail', key: 'zh' },
  { dir: 'src/content/docs/zh-tw/mail', key: 'zh-tw' },
  { dir: 'src/content/docs/en/mail', key: 'en' },
  { dir: 'src/content/docs/es/mail', key: 'es' },
  { dir: 'src/content/docs/fr/mail', key: 'fr' },
  { dir: 'src/content/docs/nl/mail', key: 'nl' },
];

function titleHeads(L) {
  const heads = new Set();
  for (const [file, fig] of Object.entries(NOTES)) {
    const t = L === 'zh' || L === 'en' ? fig.title[L] : TITLES[file]?.[L];
    if (!t) throw new Error(`title missing: ${L} ${file}`);
    heads.add(t.split(/[：:]/)[0].trim());
  }
  return heads;
}

let removed = 0;
for (const { dir, key } of LANGS) {
  const heads = titleHeads(key);
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const path = `${dir}/${f}`;
    const raw = readFileSync(path, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const lines = raw.split(/\r?\n/);
    const out = [];
    let i = 0, hit = 0;
    while (i < lines.length) {
      const line = lines[i];
      const m = /^<summary>(.*)<\/summary>\s*$/.exec(line);
      if (m && [...heads].some((h) => m[1].includes(h))) {
        // 回溯 <details> 起始行
        let s = out.length - 1;
        while (s >= 0 && out[s].trim() !== '<details>') s--;
        if (s < 0) { out.push(line); i++; continue; }
        out.length = s;
        // 前跳 </details>
        let j = i;
        while (j < lines.length && lines[j].trim() !== '</details>') j++;
        i = j + 1;
        // 吃掉块后一个空行
        if (i < lines.length && lines[i].trim() === '') i++;
        // 块前遗留空行弹出后补一个，保证图注/图片与后续文本间恰好一个空行
        while (out.length && out[out.length - 1].trim() === '') out.pop();
        if (out.length) out.push('');
        hit++;
        continue;
      }
      out.push(line); i++;
    }
    if (hit) {
      // 块删除后可能需要补一个空行衔接前后文本
      const fixed = [];
      for (let q = 0; q < out.length; q++) {
        fixed.push(out[q]);
      }
      let text = fixed.join(eol).replace(/(\r?\n){3,}/g, '$1$1');
      writeFileSync(path, text);
      removed += hit;
      console.log(`${key}/${f}: -${hit}`);
    }
  }
}
console.log(`removed=${removed}`);
