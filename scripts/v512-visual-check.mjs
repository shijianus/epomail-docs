// v5.12 专案介绍精度治理轮本地视觉验证：project 全 6 语言 + modes/settings/features 抽样 + 暗色抽查 + 错误采集
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v512-docs');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790';
const shots = [
  { name: 'zh-project', url: '/mail/project/', lang: 'zh-CN' },
  { name: 'zh-tw-project', url: '/zh-tw/mail/project/', lang: 'zh-TW' },
  { name: 'en-project', url: '/en/mail/project/', lang: 'en' },
  { name: 'es-project', url: '/es/mail/project/', lang: 'es' },
  { name: 'fr-project', url: '/fr/mail/project/', lang: 'fr' },
  { name: 'nl-project', url: '/nl/mail/project/', lang: 'nl' },
  { name: 'zh-modes', url: '/mail/modes/', lang: 'zh-CN' },
  { name: 'en-modes', url: '/en/mail/modes/', lang: 'en' },
  { name: 'zh-settings', url: '/mail/settings/', lang: 'zh-CN' },
  { name: 'en-settings', url: '/en/mail/settings/', lang: 'en' },
  { name: 'zh-features', url: '/mail/features/', lang: 'zh-CN' },
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

// 暗色主题抽查：zh project（含新增里程碑表与锚点链）
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', locale: 'zh-CN' });
const dpage = await dctx.newPage();
dpage.on('response', r => { if (r.status() >= 400) errors.push(`[dark HTTP ${r.status()}] ${r.url()}`); });
await dpage.goto(BASE + '/mail/project/', { waitUntil: 'networkidle', timeout: 60000 });
await dpage.waitForTimeout(900);
await dpage.screenshot({ path: path.join(outDir, 'zh-project-dark.png'), fullPage: true });
console.log('shot ok: zh-project-dark');
await dctx.close();

await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.log'), errors.join('\n') || 'CLEAN');
console.log(`errors: ${errors.length ? errors.join(' | ') : 'CLEAN'}`);
