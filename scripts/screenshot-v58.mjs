// v5.8 polish round: capture changed pages, light/dark, desktop + mobile.
// Usage: node scripts/screenshot-v58.mjs [baseURL]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || 'http://localhost:4321';
const OUT = fileURLToPath(new URL('../screenshots/v58/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['zh-privacy', '/epomail/mail/privacy-policy/'],
  ['zh-datasec', '/epomail/mail/data-security/'],
  ['zh-subproc', '/epomail/mail/sub-processors/'],
  ['zh-aup', '/epomail/mail/acceptable-use/'],
  ['zh-tos', '/epomail/mail/terms-of-service/'],
  ['zh-project', '/epomail/mail/project/'],
  ['en-privacy', '/epomail/en/mail/privacy-policy/'],
  ['tw-datasec', '/epomail/zh-tw/mail/data-security/'],
  ['fr-privacy', '/epomail/fr/mail/privacy-policy/'],
  ['nl-privacy', '/epomail/nl/mail/privacy-policy/'],
];

const browser = await chromium.launch();
const shots = [];
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}${name}-${scheme}-full.png`, fullPage: true });
    shots.push(`${name}-${scheme}-full.png`);
  }
  await ctx.close();
}
// mobile spot-check (light only)
const mctx = await browser.newContext({ viewport: { width: 375, height: 720 }, colorScheme: 'light' });
const mpage = await mctx.newPage();
for (const [name, path] of [['zh-privacy', '/epomail/mail/privacy-policy/'], ['zh-datasec', '/epomail/mail/data-security/']]) {
  await mpage.goto(BASE + path, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(250);
  await mpage.screenshot({ path: `${OUT}${name}-mobile-full.png`, fullPage: true });
  shots.push(`${name}-mobile-full.png`);
}
await mctx.close();
await browser.close();
console.log('captured:', shots.join(', '));
