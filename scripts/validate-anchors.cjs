const fs = require('fs');
const path = require('path');
const dist = path.resolve(__dirname, '..', 'dist');
const pages = new Map();
const origin = 'https://docs.invalid';
const decodeAttribute = (value) => value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      pages.set(file, {
        html,
        ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeAttribute(match[1]))),
      });
    }
  }
})(dist);

let bad = 0, checked = 0, imagesChecked = 0;
function fail(file, value, reason) {
  console.log(reason, path.relative(dist, file).split(path.sep).join('/'), value);
  bad++;
}
function localTarget(value, file) {
  const pagePath = '/' + path.relative(dist, file).split(path.sep).join('/');
  const url = new URL(decodeAttribute(value), origin + pagePath);
  if (url.origin !== origin) return null;
  let target = path.resolve(dist, '.' + decodeURIComponent(url.pathname));
  if (target !== dist && !target.startsWith(dist + path.sep)) throw new Error('Path outside output');
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  return { target, fragment: decodeURIComponent(url.hash.slice(1)) };
}

for (const [file, page] of pages) {
  const links = new Set([...page.html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((match) => match[1]));
  for (const href of links) {
    let resolved;
    try { resolved = localTarget(href, file); }
    catch { fail(file, href, 'INVALID LINK'); continue; }
    if (!resolved) continue;
    checked++;
    if (!fs.existsSync(resolved.target)) fail(file, href, 'MISSING LINK TARGET');
    else if (resolved.fragment && pages.has(resolved.target) && !pages.get(resolved.target).ids.has(resolved.fragment)) {
      fail(file, href, 'BROKEN ANCHOR');
    }
  }
  const images = new Set([...page.html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map((match) => match[1]));
  for (const src of images) {
    let resolved;
    try { resolved = localTarget(src, file); }
    catch { fail(file, src, 'INVALID IMAGE'); continue; }
    if (!resolved) continue;
    imagesChecked++;
    if (!fs.existsSync(resolved.target)) fail(file, src, 'MISSING IMAGE');
  }
}
console.log(`pages=${pages.size} links-checked=${checked} images-checked=${imagesChecked} broken=${bad}`);
process.exit(bad ? 1 : 0);
