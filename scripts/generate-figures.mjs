#!/usr/bin/env node
// Generate localized SVG figures for all 6 site languages.
// Root paths (public/images/mail/*.svg) carry Simplified Chinese (zh, the root locale);
// each other language gets public/images/mail/<lang>/<name>.svg.
// Run: node scripts/generate-figures.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { builders1 } from './figures-builders-1.mjs';
import { builders2 } from './figures-builders-2.mjs';
import { STR1 } from './figures-strings-1.mjs';
import { STR2 } from './figures-strings-2.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'images', 'mail');

const builders = { ...builders1, ...builders2 };
const strings = { ...STR1, ...STR2 };
const LANGS = ['zh', 'zh-tw', 'en', 'fr', 'es', 'nl'];

let count = 0;
for (const [name, build] of Object.entries(builders)) {
  const dict = strings[name];
  if (!dict) { console.error(`No strings for figure: ${name}`); process.exit(1); }
  for (const lang of LANGS) {
    const t = dict[lang];
    if (!t) { console.error(`No ${lang} strings for figure: ${name}`); process.exit(1); }
    const missing = Object.keys(dict.en).filter((k) => !(k in t));
    if (missing.length) { console.error(`${name}/${lang} missing keys: ${missing.join(', ')}`); process.exit(1); }
    const svg = build(t);
    const dir = lang === 'zh' ? OUT : path.join(OUT, lang);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg + '\n', 'utf8');
    count++;
  }
}
console.log(`✓ generated ${count} localized figures (${Object.keys(builders).length} figures × ${LANGS.length} languages)`);
