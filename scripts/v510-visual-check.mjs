// v5.10 打磨轮本地视觉验证：对关键页面全页截图 + 控制台/网络错误采集
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v510');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790';
const shots = [
  { name: 'zh-tamper-proof', url: '/mail/tamper-proof/', lang: 'zh-CN' },
  { name: 'zh-tw-architecture', url: '/zh-tw/mail/architecture/', lang: 'zh-TW' },
  { name: 'en-features', url: '/en/mail/features/', lang: 'en' },
  { name: 'nl-architecture', url: '/nl/mail/architecture/', lang: 'nl' },
  { name: 'zh-features-pagination', url: '/mail/features/', lang: 'zh-CN' },
];

const errors = [];

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: s.lang,
  });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(`[${s.name} console] ${m.text()}`); });
  page.on('requestfailed', r => errors.push(`[${s.name} reqfail] ${r.url()}`));
  page.on('response', r => { if (r.status() >= 400) errors.push(`[${s.name} HTTP ${r.status()}] ${r.url()}`); });
  await page.goto(BASE + s.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, `${s.name}.png`), fullPage: true });
  console.log(`shot ok: ${s.name}`);
  await ctx.close();
}

// 暗色主题抽查：zh tamper-proof
const dctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark',
  locale: 'zh-CN',
});
const dpage = await dctx.newPage();
dpage.on('response', r => { if (r.status() >= 400) errors.push(`[dark HTTP ${r.status()}] ${r.url()}`); });
await dpage.goto(BASE + '/mail/tamper-proof/', { waitUntil: 'networkidle', timeout: 60000 });
await dpage.waitForTimeout(800);
await dpage.screenshot({ path: path.join(outDir, 'zh-tamper-proof-dark.png'), fullPage: true });
console.log('shot ok: zh-tamper-proof-dark');
await dctx.close();

// Accept-Language 协商抽查：无路径访问 /，zh-TW 地区应落 zh-tw 总览
const nctx = await browser.newContext({ locale: 'zh-TW', viewport: { width: 1440, height: 900 } });
const npage = await nctx.newPage();
await npage.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 });
const landed = npage.url();
console.log(`accept-language landing: ${landed}`);
await npage.screenshot({ path: path.join(outDir, 'root-negotiation-zh-tw.png'), fullPage: true });
await nctx.close();

await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.log'), errors.join('\n') || 'CLEAN');
console.log(`errors: ${errors.length ? errors.join(' | ') : 'CLEAN'}`);
