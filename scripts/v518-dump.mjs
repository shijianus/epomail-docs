import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const dir = 'src/content/docs/mail';
const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
for (const f of files) {
  const text = readFileSync(join(dir, f), 'utf8');
  const nfig = [...text.matchAll(/^!\[.*\]\(\S+?\)\s*$/gm)].filter((m) => figs[basename(m[0].match(/\((\S+?)\)/)[1])]).length;
  if (nfig < 2) continue;
  console.log(`\n########## ${f} (${nfig} spec figures) ##########`);
  const lines = text.split(/\r?\n/);
  lines.forEach((ln, i) => {
    const t = ln.trim();
    const isImg = /^!\[.*\]\(\S+?\)\s*$/.test(t) && figs[basename(t.match(/\((\S+?)\)/)[1])];
    if (/^#{2,3}\s/.test(t)) console.log(`  ${String(i + 1).padStart(4)} ## ${t.replace(/^#+\s*/, '')}`);
    else if (isImg) console.log(`  ${String(i + 1).padStart(4)} IMG ${basename(t.match(/\((\S+?)\)/)[1])}`);
    else if (/^\*[^*].*\*$/.test(t)) console.log(`  ${String(i + 1).padStart(4)} cap ${t.slice(0, 90)}`);
    else if (/^<\/?details|^<summary/.test(t)) console.log(`  ${String(i + 1).padStart(4)} FOLD ${t.slice(0, 80)}`);
  });
}
