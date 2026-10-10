import { readFileSync, writeFileSync } from 'node:fs';

const pairs = readFileSync(new URL('./v518-enrich-spec2.txt', import.meta.url), 'utf8')
  .split(/\r?\n/)
  .reduce((acc, line) => {
    if (line.trim() === '@@@') acc.push([]);
    else if (line.trim() && acc.length) acc[acc.length - 1].push(line);
    return acc;
  }, [[]])
  .map((chunk) => chunk.join('\n'))
  .reduce((acc, cur, i) => {
    if (i % 2 === 0) acc.push([cur]);
    else acc[acc.length - 1].push(cur);
    return acc;
  }, []);

let text = readFileSync(new URL('./v517-figures-spec.mjs', import.meta.url), 'utf8');
let applied = 0;
const missing = [];
for (const [oldS, newS] of pairs) {
  if (!text.includes(oldS)) { missing.push(oldS.slice(0, 60)); continue; }
  text = text.replace(oldS, newS);
  applied++;
}
writeFileSync(new URL('./v517-figures-spec.mjs', import.meta.url), text);
console.log(`pairs=${pairs.length} applied=${applied} missing=${missing.length}`);
missing.forEach((m) => console.log('  MISSING:', m));
