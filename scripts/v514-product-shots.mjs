// v5.14 补充产品截图：OAuth 应用管理页 + 通知与转发区（本地演示实例，非公开）
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = 'http://127.0.0.1:8787';
const OUT = fileURLToPath(new URL('../public/images/mail/ui/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const res = await fetch(BASE + '/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');
console.log('login ok');

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript(([token]) => {
  localStorage.setItem('token', token);
  localStorage.setItem('loginEmail', 'admin@epomail.bond');
  localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
  localStorage.setItem('setting', JSON.stringify({ lang: '' }));
}, [login.token]);

await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3500);

// 1) OAuth 应用管理页
for (const h of ['#manage/admin/apps', '#/manage/admin/apps']) {
  await page.evaluate((hash) => { location.hash = hash; }, h);
  await page.waitForTimeout(2500);
  const text = await page.evaluate(() => document.body.innerText);
  if (text.includes('授权回调') || text.includes('应用管理') || text.includes('oauth')) {
    console.log('apps page reached with', h);
    break;
  }
}
await page.screenshot({ path: `${OUT}ui-oauth-apps.png` });
console.log('shot ok: ui-oauth-apps');

// 2) 通知与转发区（设置 → 资料）
await page.evaluate(() => { location.hash = '#settings/data'; });
await page.waitForTimeout(2500);
const sec = page.locator('div,section').filter({ hasText: 'Telegram 推送' }).last();
const box = await sec.boundingBox().catch(() => null);
if (box) {
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 90)), box.y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}ui-notify-forward.png`, clip: { x: 0, y: Math.max(0, box.y - 90), width: 1440, height: 760 }, fullPage: true });
  console.log('shot ok: ui-notify-forward (clip)');
} else {
  await page.screenshot({ path: `${OUT}ui-notify-forward.png` });
  console.log('shot ok: ui-notify-forward (viewport fallback)');
}

await browser.close();
console.log('DONE');
