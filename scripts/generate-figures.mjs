#!/usr/bin/env node
// Generate SVG figures for all 6 site languages.
// Legal figures share English micro-labels, with localized descriptions and page captions.
// Root paths (public/images/mail/*.svg) carry Simplified Chinese (zh, the root locale);
// each other language gets public/images/mail/<lang>/<name>.svg.
// Run: node scripts/generate-figures.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { builders1 } from './figures-builders-1.mjs';
import { builders2 } from './figures-builders-2.mjs';
import { STR1, FIGURE_LANGS } from './figures-strings-1.mjs';
import { STR2 } from './figures-strings-2.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'images', 'mail');

const builders = { ...builders1, ...builders2 };
const strings = { ...STR1, ...STR2 };

// Dictionaries contain raw text, never markup or pre-escaped entities.
// Escape once before interpolation into SVG text and double-quoted attributes.
const XML_ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
function escapeXml(value) {
  return value.replace(/[&<>"]/g, (character) => XML_ENTITIES[character]);
}

// Render and validate every dictionary before writing any output.
const outputs = [];
for (const [name, build] of Object.entries(builders)) {
  const dict = strings[name];
  if (!dict?.en) throw new Error(`No English reference strings for figure: ${name}`);
  const keys = Object.keys(dict.en);
  for (const lang of FIGURE_LANGS) {
    const t = dict[lang];
    if (!t) throw new Error(`No ${lang} strings for figure: ${name}`);
    const missing = keys.filter((key) => !(key in t));
    const extra = Object.keys(t).filter((key) => !keys.includes(key));
    if (missing.length || extra.length) {
      throw new Error(`${name}/${lang}: missing keys [${missing.join(', ')}], extra keys [${extra.join(', ')}]`);
    }
    const invalid = keys.filter((key) => typeof t[key] !== 'string' || !t[key].trim());
    if (invalid.length) throw new Error(`${name}/${lang}: invalid strings [${invalid.join(', ')}]`);
    const escaped = Object.fromEntries(Object.entries(t).map(([key, value]) => [key, escapeXml(value)]));
    const svg = build(escaped) + '\n';
    const dir = lang === 'zh' ? OUT : path.join(OUT, lang);
    outputs.push({ file: path.join(dir, `${name}.svg`), svg });
  }
}

let updated = 0;
for (const { file, svg } of outputs) {
  // Git may check out SVGs with CRLF on Windows; leave unchanged content untouched.
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') === svg) continue;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, svg, 'utf8');
  updated++;
}
console.log(`Generated ${outputs.length} figures (${Object.keys(builders).length} figures × ${FIGURE_LANGS.length} languages); updated ${updated} files.`);
