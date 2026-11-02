// v5.20 探测新审计控制台 DOM：拿 KPI 卡、筛选行、表头列集与按钮选择器
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8787';

const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.cyou', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.addInitScript(([token]) => {
  localStorage.setItem('token', token);
  localStorage.setItem('loginEmail', 'admin@epomail.cyou');
  localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
  localStorage.setItem('setting', JSON.stringify({ lang: '' }));
}, [login.token]);

await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3400);
await page.evaluate(() => { location.hash = '#manage/admin/audit'; });
await page.waitForTimeout(4200);

const probe = await page.evaluate(() => {
  const out = {};
  const q = (sel) => [...document.querySelectorAll(sel)].map((el) => (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60));
  out.kpiCards = [...document.querySelectorAll('.kpi-card')].map((el) => ({
    cls: el.className.replace(/kpi-card\s*/g, '').trim(),
    title: el.querySelector('.kpi-title')?.textContent?.trim(),
    sub: el.querySelector('.kpi-sub')?.textContent?.trim(),
    value: el.querySelector('.kpi-value')?.textContent?.trim(),
    rect: (({ top, left, width, height }) => ({ top: Math.round(top), left: Math.round(left), width: Math.round(width), height: Math.round(height) }))(el.getBoundingClientRect()),
  }));
  out.filters = q('.toolbar select, .filter-bar select, .el-select').slice(0, 12);
  out.tableHeads = [...document.querySelectorAll('.el-table__header-wrapper th')].map((th) => th.textContent.trim()).filter(Boolean);
  out.rows = document.querySelectorAll('.el-table__body-wrapper tbody tr').length;
  out.buttons = q('.audit-page button, main button').filter((t) => t && t.length < 20).slice(0, 25);
  out.tabs = q('.el-tabs__item, .tab-item, [class*=tab]').slice(0, 15);
  out.bodyClasses = document.body.className;
  // 找页面上文本含关键短语的元素，辅助识别分区
  const findText = (t) => { const el = [...document.querySelectorAll('div,span,button,h2,h3,p')].find((e) => e.childElementCount === 0 && (e.textContent || '').includes(t)); if (!el) return null; const r = el.getBoundingClientRect(); return { text: el.textContent.trim().slice(0, 40), sel: el.className, rect: { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width) } }; };
  out.texts = ['导出', '封禁', '解封', '批量', '筛选', '全部状态', '风险等级', '违规分类', '熔断', '拍案'].map(findText);
  return out;
});
console.log(JSON.stringify(probe, null, 1));
await page.screenshot({ path: 'scripts/v520-audit-probe.png' });
await browser.close();
