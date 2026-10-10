import { readFileSync, writeFileSync } from 'node:fs';
const blocks = JSON.parse(readFileSync(new URL('./.cap-blocks.json', import.meta.url), 'utf8'));
const figs = JSON.parse(readFileSync(new URL('./v517-figure-notes.json', import.meta.url), 'utf8'));
const LAB = /^(\*)([^：:*]{1,14})[：:]/;
const ANN = /(标注|標註|Annotations?|Anotaciones|Aantekeningen)/;

const groups = new Map();
for (const v of Object.values(blocks)) {
  const g = `${v.lang}|${v.page === undefined ? '?' : v.page}`;
  if (!groups.has(g)) groups.set(g, []);
  groups.get(g).push(v);
}
let noCap = [], annOnly = [], thin = [];
for (const v of Object.values(blocks)) {
  const caps = v.caps.map((c) => c.text);
  if (!caps.length) { noCap.push(`${v.lang}/${v.page}:${v.imgLine} ${v.src.split('/').pop()}`); continue; }
  const main = caps.filter((c) => !ANN.test(c));
  if (!main.length) { annOnly.push(`${v.lang}/${v.page}:${v.imgLine} ${v.src.split('/').pop()} :: ${caps.join(' | ')}`); continue; }
  const body = main[0].replace(/^\*/, '').replace(/\*$/, '').replace(LAB, '');
  if (body.replace(/[。.\s]/g, '').length < 20) thin.push(`${v.lang}/${v.page}:${v.imgLine} ${v.src.split('/').pop()} :: ${main[0]}`);
}
writeFileSync(new URL('./.no-cap.txt', import.meta.url), [...noCap, ...annOnly, ...thin].join('\n') + '\n');
console.log(`noCaption=${noCap.length} annotationOnly=${annOnly.length} thinCaption=${thin.length}`);
console.log('--- NO CAPTION ---'); noCap.slice(0, 60).forEach((s) => console.log(s));
