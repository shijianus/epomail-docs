// v5.18 判图：六语言抽样页面——标注图 + 隐藏式下拉图解（折叠/展开双态）+ 新 introduction 页
// 产出 screenshots/v518/*.png；输出 details 计数与首个 summary 文本供核对。
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v518');
fs.mkdirSync(outDir, { recursive: true });

const BASE = 'http://127.0.0.1:8790/epomail';
const shots = [
  { name: 'zh-mailbox', url: '/mail/mailbox/', lang: 'zh-CN' },
  { name: 'zh-modes', url: '/mail/modes/', lang: 'zh-CN' },
  { name: 'zh-interface', url: '/mail/interface/', lang: 'zh-CN' },
  { name: 'zh-features', url: '/mail/features/', lang: 'zh-CN' },
  { name: 'zh-settings', url: '/mail/settings/', lang: 'zh-CN' },
  { name: 'zh-system', url: '/mail/system/', lang: 'zh-CN' },
  { name: 'zh-introduction', url: '/mail/introduction/', lang: 'zh-CN' },
  { name: 'en-modes', url: '/en/mail/modes/', lang: 'en' },
  { name: 'en-notify', url: '/en/mail/notify/', lang: 'en' },
  { name: 'fr-settings', url: '/fr/mail/settings/', lang: 'fr' },
  { name: 'fr-modes', url: '/fr/mail/modes/', lang: 'fr' },
  { name: 'es-notify', url: '/es/mail/notify/', lang: 'es' },
  { name: 'es-audit', url: '/es/mail/audit/', lang: 'es' },
  { name: 'nl-mailbox', url: '/nl/mail/mailbox/', lang: 'nl' },
  { name: 'nl-interface', url: '/nl/mail/interface/', lang: 'nl' },
  { name: 'zh-tw-interface', url: '/zh-tw/mail/interface/', lang: 'zh-TW' },
  { name: 'zh-tw-features', url: '/zh-tw/mail/features/', lang: 'zh-TW' },
];

const errors = [];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });

for (const s of shots) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: s.lang });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${s.name} console] ${m.text()}`); });
  page.on('requestfailed', (r) => errors.push(`[${s.name} reqfail] ${r.url()}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`[${s.name} HTTP ${r.status()}] ${r.url()}`); });
  try {
    await page.goto(BASE + s.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(800);

    const details = page.locator('main details:not([class])');
    const n = await details.count();
    const firstSummary = n ? (await details.first().locator('summary').innerText()).replace(/\s+/g, ' ').slice(0, 80) : '(none)';

    // A：首个标注图 + 折叠态 details 同屏
    const img = page.locator('main img[src*="/images/mail/"]').first();
    await img.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -140));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, `${s.name}-collapsed.png`) });

    // B：展开首个 details（元素级完整截图）
    if (n) {
      await details.first().locator('summary').click();
      await page.waitForTimeout(600);
      const open = await details.first().evaluate((el) => el.open);
      await page.locator('main details:not([class])').first().screenshot({ path: path.join(outDir, `${s.name}-expanded.png`) });
      console.log(`${s.name}: details=${n} open=${open} summary="${firstSummary}"`);
    } else {
      console.log(`${s.name}: details=0 (introduction 页无图解属预期)`);
    }
  } catch (e) {
    errors.push(`[${s.name}] ${e.message.split('\n')[0]}`);
    console.log(`${s.name}: ERROR ${e.message.split('\n')[0]}`);
  }
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(outDir, 'errors.txt'), errors.join('\n'));
console.log(`errors=${errors.length}`);
errors.slice(0, 12).forEach((e) => console.log(' ', e));
