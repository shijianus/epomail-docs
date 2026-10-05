// v5.13 双线扩充轮本地视觉验证：6 新页 ×语言抽样 + 侧栏新组 + 暗色 + 元素裁片 + 错误采集
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v513-docs');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790';
const shots = [
  { name: 'zh-interface', url: '/mail/interface/', lang: 'zh-CN' },
  { name: 'en-interface', url: '/en/mail/interface/', lang: 'en' },
  { name: 'zh-search', url: '/mail/search/', lang: 'zh-CN' },
  { name: 'en-search', url: '/en/mail/search/', lang: 'en' },
  { name: 'zh-deployment', url: '/mail/deployment/', lang: 'zh-CN' },
  { name: 'zh-development', url: '/mail/development/', lang: 'zh-CN' },
  { name: 'zh-service-scope', url: '/mail/service-scope/', lang: 'zh-CN' },
  { name: 'zh-open-source', url: '/mail/open-source/', lang: 'zh-CN' },
  { name: 'zh-tw-open-source', url: '/zh-tw/mail/open-source/', lang: 'zh-TW' },
  { name: 'es-interface', url: '/es/mail/interface/', lang: 'es' },
  { name: 'fr-search', url: '/fr/mail/search/', lang: 'fr' },
  { name: 'nl-deployment', url: '/nl/mail/deployment/', lang: 'nl' },
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

// 暗色抽查：zh interface（含路由表）
{
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', locale: 'zh-CN' });
  const dpage = await dctx.newPage();
  dpage.on('response', r => { if (r.status() >= 400) errors.push(`[dark HTTP ${r.status()}] ${r.url()}`); });
  await dpage.goto(BASE + '/mail/interface/', { waitUntil: 'networkidle', timeout: 60000 });
  await dpage.waitForTimeout(900);
  await dpage.screenshot({ path: path.join(outDir, 'zh-interface-dark.png'), fullPage: true });
  console.log('shot ok: zh-interface-dark');
  await dctx.close();
}

// 元素裁片：interface 主界面路由表、管理区表、search 算子表 + note 块、侧栏新组
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale: 'zh-CN' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/mail/interface/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(600);
  const tables = page.locator('table');
  await tables.nth(0).scrollIntoViewIfNeeded();
  await tables.nth(0).screenshot({ path: path.join(outDir, 'clip-zh-interface-views.png') });
  const manageTbl = page.locator('table', { hasText: '权限键' }).first();
  await manageTbl.scrollIntoViewIfNeeded();
  await manageTbl.screenshot({ path: path.join(outDir, 'clip-zh-interface-manage.png') });
  const aside = page.locator('aside').first();
  await aside.screenshot({ path: path.join(outDir, 'clip-zh-sidebar.png') });
  await ctx.close();
  console.log('clip ok: interface tables + sidebar');
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale: 'zh-CN' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/mail/search/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(600);
  const tables = page.locator('table');
  await tables.nth(1).scrollIntoViewIfNeeded();
  await tables.nth(1).screenshot({ path: path.join(outDir, 'clip-zh-search-operators.png') });
  const note = page.locator('.starlight-aside, [class*="aside"]').filter({ hasText: '尚未实装' }).first();
  if (await note.count()) {
    await note.scrollIntoViewIfNeeded();
    await note.screenshot({ path: path.join(outDir, 'clip-zh-search-note.png') });
    console.log('clip ok: search note');
  } else {
    console.log('note block locator miss (check visually)');
  }
  await ctx.close();
  console.log('clip ok: search operators');
}

await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.log'), errors.join('\n') || 'CLEAN');
console.log(`errors: ${errors.length ? errors.join(' | ') : 'CLEAN'}`);
