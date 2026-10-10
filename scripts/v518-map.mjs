import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import spec from './v517-figure-notes.json' with { type: 'json' };

const langs = [['mail', 'src/content/docs/mail'], ['zh-tw', 'src/content/docs/zh-tw/mail'], ['en', 'src/content/docs/en/mail'], ['es', 'src/content/docs/es/mail'], ['fr', 'src/content/docs/fr/mail'], ['nl', 'src/content/docs/nl/mail']];
const map = {};
for (const [L, dir] of langs) {
  for (const f of readdirSync(dir).sort()) {
    if (!f.endsWith('.md')) continue;
    const t = readFileSync(path.join(dir, f), 'utf8');
    const re = /\(([^)]*ui\/[a-z0-9-]+\.png)\)/g;
    let m;
    while ((m = re.exec(t))) {
      const k = m[1].split('/').pop();
      (map[k] = map[k] || {});
      (map[k][L] = map[k][L] || []).push(f.replace('.md', ''));
    }
  }
}
for (const k of Object.keys(map).sort()) {
  const p = map[k];
  const langsSeen = langs.map(([L]) => L).filter((L) => p[L]);
  const pages = new Set(langsSeen.map((L) => p[L].join('+')));
  const flag = spec[k] ? 'SPEC' : '----';
  const sym = pages.size === 1 ? 'ok ' : '!! ';
  console.log(`${flag} ${sym}${k.padEnd(26)} ${[...pages].map((x) => `${x}(${langsSeen.length})`).join('  ')}`);
}
