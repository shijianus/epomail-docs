// v5.14 深化轮本地视觉验证：3 新页 ×语言抽样 + 侧栏六组 + 暗色 + 元素裁片 + 错误采集
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v514-docs');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790';
const shots = [
  { name: 'zh-api', url: '/mail/api/', lang: 'zh-CN' },
  { name: 'en-api', url: '/en/mail/api/', lang: 'en' },
  { name: 'zh-security', url: '/mail/security/', lang: 'zh-CN' },
  { name: 'en-security', url: '/en/mail/security/', lang: 'en' },
  { name: 'zh-notify', url: '/mail/notify/', lang: 'zh-CN' },
  { name: 'es-notify', url: '/es/mail/notify/', lang: 'es' },
  { name: 'fr-api', url: '/fr/mail/api/', lang: 'fr' },
  { name: 'nl-security', url: '/nl/mail/security/', lang: 'nl' },
  { name: 'zh-tw-api', url: '/zh-tw/mail/api/', lang: 'zh-TW' },
];

const errors = [];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });

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

// 暗色：zh api（含端点表与 curl 块）
{
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', locale: 'zh-CN' });
  const dpage = await dctx.newPage();
  dpage.on('response', r => { if (r.status() >= 400) errors.push(`[dark HTTP ${r.status()}] ${r.url()}`); });
  await dpage.goto(BASE + '/mail/api/', { waitUntil: 'networkidle', timeout: 60000 });
  await dpage.waitForTimeout(900);
  await dpage.screenshot({ path: path.join(outDir, 'zh-api-dark.png'), fullPage: true });
  console.log('shot ok: zh-api-dark');
  await dctx.close();
}

// 元素裁片：zh api 端点表+注册字段表、zh security 导览表、侧栏六组
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale: 'zh-CN' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/mail/api/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(600);
  const t0 = page.locator('table').first();
  await t0.scrollIntoViewIfNeeded();
  await t0.screenshot({ path: path.join(outDir, 'clip-zh-api-endpoints.png') });
  const t1 = page.locator('table').nth(1);
  await t1.screenshot({ path: path.join(outDir, 'clip-zh-api-fields.png') });
  const aside = page.locator('aside').first();
  await aside.screenshot({ path: path.join(outDir, 'clip-zh-sidebar-groups.png') });
  await ctx.close();
  console.log('clip ok: api tables + sidebar');
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.log'), errors.join('\n') || 'CLEAN');
console.log(`errors: ${errors.length ? errors.join(' | ') : 'CLEAN'}`);
