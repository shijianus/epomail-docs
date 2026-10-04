// v5.11 专案介绍扩充轮本地视觉验证：modes/settings 两新页 ×6 语言全页截图 + 暗色抽查 + 错误采集
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v511-docs');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790';
const shots = [
  { name: 'zh-modes', url: '/mail/modes/', lang: 'zh-CN' },
  { name: 'zh-settings', url: '/mail/settings/', lang: 'zh-CN' },
  { name: 'zh-tw-modes', url: '/zh-tw/mail/modes/', lang: 'zh-TW' },
  { name: 'en-modes', url: '/en/mail/modes/', lang: 'en' },
  { name: 'en-settings', url: '/en/mail/settings/', lang: 'en' },
  { name: 'fr-settings', url: '/fr/mail/settings/', lang: 'fr' },
  { name: 'es-modes', url: '/es/mail/modes/', lang: 'es' },
  { name: 'nl-settings', url: '/nl/mail/settings/', lang: 'nl' },
];

const errors = [];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

for (const s of shots) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: s.lang });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${s.name} console] ${m.text()}`); });
  page.on('requestfailed', r => errors.push(`[${s.name} reqfail] ${r.url()}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`[${s.name} HTTP ${r.status()}] ${r.url()}`); });
  await page.goto(BASE + s.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(outDir, `${s.name}.png`), fullPage: true });
  console.log(`shot ok: ${s.name}`);
  await ctx.close();
}

// 暗色主题抽查：zh modes
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', locale: 'zh-CN' });
const dpage = await dctx.newPage();
dpage.on('response', r => { if (r.status() >= 400) errors.push(`[dark HTTP ${r.status()}] ${r.url()}`); });
await dpage.goto(BASE + '/mail/modes/', { waitUntil: 'networkidle', timeout: 60000 });
await dpage.waitForTimeout(900);
await dpage.screenshot({ path: path.join(outDir, 'zh-modes-dark.png'), fullPage: true });
console.log('shot ok: zh-modes-dark');
await dctx.close();

await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.log'), errors.join('\n') || 'CLEAN');
console.log(`errors: ${errors.length ? errors.join(' | ') : 'CLEAN'}`);
