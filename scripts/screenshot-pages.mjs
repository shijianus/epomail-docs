// Capture light/dark screenshots of key built pages with Playwright.
// Usage: node scripts/screenshot-pages.mjs [baseURL]   (default http://localhost:4321)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || 'http://localhost:4321';
const OUT = fileURLToPath(new URL('../screenshots/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['root-overview', '/mail/overview/'],
  ['root-privacy', '/mail/privacy-policy/'],
  ['root-tos', '/mail/terms-of-service/'],
  ['tw-privacy', '/zh-tw/mail/privacy-policy/'],
  ['tw-aup', '/zh-tw/mail/acceptable-use/'],
  ['tw-datasec', '/zh-tw/mail/data-security/'],
  ['tw-subproc', '/zh-tw/mail/sub-processors/'],
  ['en-privacy', '/en/mail/privacy-policy/'],
  ['fr-privacy', '/fr/mail/privacy-policy/'],
  ['nl-privacy', '/nl/mail/privacy-policy/'],
];

const browser = await chromium.launch();
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: scheme });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${OUT}${scheme}-${name}.png`, fullPage: true });
    console.log(`${scheme}-${name}.png`);
  }
  await ctx.close();
}
await browser.close();
