// v5.20 探测二：各 KPI 板块列集 + 证据抽屉内容
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8787';
const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@example.com', password: '123456' }),
});
const login = (await res.json()).data;
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript(([token]) => {
  localStorage.setItem('token', token);
  localStorage.setItem('loginEmail', 'admin@example.com');
  localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
  localStorage.setItem('setting', JSON.stringify({ lang: '' }));
}, [login.token]);
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3400);
await page.evaluate(() => { location.hash = '#manage/admin/audit'; });
await page.waitForTimeout(4200);

const dump = () => page.evaluate(() => ({
  cols: [...document.querySelectorAll('.audit-table th, .table-head th, [class*=head] th')].map((t) => t.textContent.trim()).filter(Boolean),
  headers: [...document.querySelectorAll('th')].map((t) => t.textContent.trim()).filter(Boolean).slice(0, 20),
}));

console.log('=== ALL(默认) ===', JSON.stringify(await dump()));
const cards = ['kpi-threat', 'kpi-appeal', 'kpi-audit', 'kpi-record'];
for (const c of cards) {
  try {
    await page.locator(`.kpi-card.${c}`).click({ timeout: 3000 });
    await page.waitForTimeout(2500);
    console.log(`=== ${c} ===`, JSON.stringify(await dump()));
  } catch (e) { console.log(`${c} click fail`, e.message.slice(0, 60)); }
}
// 证据抽屉
try {
  await page.locator('.audit-table button:has-text("詳情"), button:has-text("詳情"), button:has-text("详情")').first().click({ timeout: 4000 });
  await page.waitForTimeout(2500);
  const drawer = await page.evaluate(() => {
    const d = document.querySelector('.el-drawer, .drawer, [class*=drawer]');
    return { title: d?.querySelector('[class*=title], h3, h2')?.textContent?.trim()?.slice(0, 60), text: d?.textContent?.replace(/\s+/g, ' ')?.slice(0, 800) };
  });
  console.log('=== DRAWER ===', JSON.stringify(drawer));
  await page.screenshot({ path: 'scripts/v520-audit-drawer.png' });
} catch (e) { console.log('drawer fail', e.message.slice(0, 80)); }
await page.screenshot({ path: 'scripts/v520-audit-boards.png' });
await browser.close();
console.log('DONE');
