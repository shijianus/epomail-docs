// v5.18 注入器：把 v5.17/v5.18 的「分区含义图解」注入六语言文档。
// 每张有注解的配图：删除旧的「标注：1. …」复读行，插入隐藏式下拉图解
//   <details><summary>{前缀}{标题}</summary> 导语 + 编号/列点分区含义 </details>
// zh/en 取 v517-figure-notes.json（title/summary/items 含 zh+en）；
// zh-tw/es/fr/nl 取 v517-figures-<L>.json + v518-titles-i18n.json。
// 幂等：summary 已存在则跳过插入；重复运行安全。
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

const PREFIX = { zh: '图解：', 'zh-tw': '圖解：', en: 'Walkthrough: ', es: 'Guía visual: ', fr: 'Guide visuel : ', nl: 'Visuele handleiding: ' };
const SEP = { zh: '：', 'zh-tw': '：', en: ': ', es: ': ', fr: ' : ', nl: ': ' };
const ANN_RE = /^\*(?:标注|標註|Annotations?|Anotaciones|Aantekeningen)[：:]/;
const IMG_RE = /^!\[.*\]\(\/images\/mail\/(?:[a-z-]+\/)?ui\/([a-z0-9-]+\.png)\)\s*$/;

// 组装各语言的注解集：{file: {title, summary, items:[{h,d}], plain}}
function notesFor(L) {
  const out = {};
  for (const [file, fig] of Object.entries(NOTES)) {
    if (L === 'zh' || L === 'en') {
      out[file] = {
        title: fig.title[L],
        summary: fig.summary[L],
        items: fig.items.map((it) => ({ h: it.h[L], d: it.d[L] })),
        plain: !!fig.plain,
      };
    } else {
      const src = JSON.parse(readFileSync(new URL(`./v517-figures-${L}.json`, import.meta.url), 'utf8'))[file];
      const title = TITLES[file]?.[L];
      if (!src || !title) throw new Error(`notes missing: ${L} ${file}`);
      out[file] = { title, summary: src.summary, items: src.items, plain: !!NOTES[file].plain };
    }
  }
  return out;
}

function buildDetails(fig, L) {
  const sep = SEP[L];
  // summary 标题里首个冒号改破折号，避免「图解：X：Y」双冒连缀
  const dash = { zh: '——', 'zh-tw': '——', en: ' — ', es: ' — ', fr: ' — ', nl: ' — ' }[L];
  const title = /—/.test(fig.title) ? fig.title : fig.title.replace(/^(.*?)[：:](.*)$/, `$1${dash}$2`);
  const out = [];
  out.push('<details>');
  out.push(`<summary>${PREFIX[L]}${title}</summary>`);
  out.push('');
  out.push(fig.summary);
  out.push('');
  fig.items.forEach((it, i) => {
    out.push(fig.plain ? `- **${it.h}**${sep}${it.d}` : `${i + 1}. **${it.h}**${sep}${it.d}`);
  });
  out.push('');
  out.push('</details>');
  return out;
}

let totals = { files: 0, inserted: 0, annRemoved: 0, skippedExisting: 0 };
const problems = [];

for (const { dir, key: L } of LANGS) {
  const notes = notesFor(L);
  const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  for (const f of files) {
    const path = `${dir}/${f}`;
    const raw = readFileSync(path, 'utf8');
    const eol = raw.includes('\r\n') ? '\r\n' : '\n';
    const lines = raw.split(/\r?\n/);
    const out = [];
    let inserted = 0, annRemoved = 0, changed = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = IMG_RE.exec(line);
      if (!m) { out.push(line); continue; }
      const base = m[1];
      const fig = notes[base];
      out.push(line);
      if (!fig) continue;

      // 收集图后的空行与斜体图注块
      let k = i + 1;
      while (k < lines.length && lines[k].trim() === '') { k++; }
      const captions = [];
      while (k < lines.length && lines[k].startsWith('*') && lines[k].endsWith('*')) {
        captions.push(lines[k]); k++;
      }
      if (captions.length && k < lines.length && lines[k].trim() === '') k++;

      const kept = captions.filter((c) => !ANN_RE.test(c));
      annRemoved += captions.length - kept.length;

      const summaryLine = `<summary>${PREFIX[L]}${fig.title}</summary>`;
      // 幂等：若图注块后紧跟同标题 details，跳过插入
      let existing = false;
      for (let q = k; q < Math.min(k + 3, lines.length); q++) if (lines[q] === summaryLine) existing = true;

      if (kept.length) {
        out.push('');
        out.push(...kept);
      }
      out.push('');
      if (!existing) {
        out.push(...buildDetails(fig, L));
        inserted++;
      }
      out.push('');
      i = k - 1;
      changed = true;
    }

    if (!changed) continue;
    let text = out.join(eol);
    text = text.replace(/(\r?\n){3,}/g, '$1$1'); // 规整多余空行（含 CRLF）
    writeFileSync(path, text);
    totals.files++; totals.inserted += inserted; totals.annRemoved += annRemoved;
    if (inserted || annRemoved) console.log(`${L}/${f}: +details=${inserted} -ann=${annRemoved}`);
  }
}

console.log(`files=${totals.files} detailsInserted=${totals.inserted} annLinesRemoved=${totals.annRemoved} skippedExisting=${totals.skippedExisting}`);

// 复核：六语言树中不允许再有任何「标注」行
const { execSync } = await import('node:child_process');
for (const { dir } of LANGS) {
  try {
    const r = execSync(`grep -rnE "^\\*(标注|標註|Annotations?|Anotaciones|Aantekeningen)[：:]" "${dir}" || true`, { encoding: 'utf8' });
    if (r.trim()) { problems.push(`remaining annotation lines in ${dir}:\n${r}`); }
  } catch (e) { /* grep no match exits 1 */ }
}
if (problems.length) { console.log('PROBLEMS:'); problems.forEach((p) => console.log(p)); process.exit(1); }
console.log('no remaining annotation lines — OK');
