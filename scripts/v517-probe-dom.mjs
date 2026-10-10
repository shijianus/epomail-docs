// v5.17 DOM 探测：为重拍标注图锁定选择器（不产出图片）
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:8787';

const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');

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
await page.waitForTimeout(3200);

async function dump(hash, name) {
  if (hash) { await page.evaluate((h) => { location.hash = h; }, hash); await page.waitForTimeout(2600); }
  const info = await page.evaluate(() => {
    const vis = (r) => r.width > 4 && r.height > 4;
    const q = (sel) => {
      const els = [...document.querySelectorAll(sel)].filter((el) => vis(el.getBoundingClientRect()));
      return els.slice(0, 8).map((el) => {
        const r = el.getBoundingClientRect();
        return `<${el.tagName.toLowerCase()} class="${(el.className + '').slice(0, 60)}"> [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.width)}x${Math.round(r.height)}] ${(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}`;
      });
    };
    return {
      url: location.hash,
      asideBtn: q('aside button'),
      navItems: q('aside .nav-item, aside li'),
      ths: q('table th'),
      cardTitles: q('.card-title, .title'),
      inputs: q('main input, .settings-panel input, input[type=text], input:not([type])'),
      selects: q('select'),
      buttons: q('main button, .settings-panel button'),
      toxToolbar: q('.tox-toolbar'),
      methodItems: q('.method-item'),
      endpointChips: q('.endpoint-chip'),
      appCards: q('.app-card'),
      exportCards: q('.export-card'),
      forwarding: q('.forwarding-container .title, .forwarding-title'),
      websiteCard: q('.website-card'),
      modeSelect: q('.website-card select, select.mode-select'),
      rows: q('tbody tr'),
    };
  });
  console.log(`\n===== ${name} ${info.url}`);
  for (const [k, v] of Object.entries(info)) { if (k === 'url' || !v?.length) continue; console.log(` ${k}:`); v.forEach((x) => console.log('   ' + x)); }
}

// 1) 收件箱 + 搜索词命中测试
await dump('#inbox', 'inbox');
for (const term of ['from:epocanvas', 'from:github', '验证码', 'welcome', 'epocanvas']) {
  const inp = page.locator('header input, .topbar input, input').first();
  try {
    await inp.fill(term);
    await page.waitForTimeout(1500);
    const n = await page.evaluate(() => document.querySelectorAll('tbody tr').length);
    console.log(`search "${term}" rows=${n}`);
  } catch (e) { console.log(`search "${term}" FAIL ${e.message.slice(0, 60)}`); }
}
await inp_fill_clear(page);

// 2) 其余页面
for (const [hash, name] of [
  ['#settings/labels', 'labels'], ['#settings/profile', 'profile'], ['#settings/general', 'general'],
  ['#settings/data', 'data'], ['#settings/security', 'security'],
  ['#manage/admin/system', 'system'], ['#manage/admin/roles', 'roles'], ['#manage/admin/users', 'users'],
  ['#manage/admin/mail', 'review'], ['#manage/admin/reg-keys', 'regkeys'],
  ['#manage/admin/analysis', 'analysis'], ['#manage/admin/rules', 'category'],
  ['#manage/admin/audit', 'audit'], ['#manage/admin/oauth-apps', 'apps'],
]) await dump(hash, name);

// 3) 写信弹层
const btn = page.locator('aside button').first();
await page.evaluate(() => { location.hash = '#inbox'; });
await page.waitForTimeout(2200);
try { await btn.click({ timeout: 4000 }); await page.waitForTimeout(1800); } catch (e) { console.log('compose click fail'); }
await dump(null, 'compose-modal');

// 4) 登录页
const page2 = await ctx.newPage();
await page2.goto(BASE + '/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page2.waitForTimeout(2600);
const linfo = await page2.evaluate(() => {
  const q = (sel) => [...document.querySelectorAll(sel)].slice(0, 10).map((el) => {
    const r = el.getBoundingClientRect();
    return `<${el.tagName.toLowerCase()} type="${el.type || ''}" class="${(el.className + '').slice(0, 50)}"> [${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.width)}x${Math.round(r.height)}] ${(el.placeholder || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30)}`;
  });
  return { inputs: q('input'), buttons: q('button'), third: q('.third-party, .oauth-buttons, [class*=social]') };
});
console.log('\n===== login'); for (const [k, v] of Object.entries(linfo)) { console.log(` ${k}:`); v.forEach((x) => console.log('   ' + x)); }

await browser.close();
console.log('PROBE DONE');

async function inp_fill_clear(page) {
  const inp = page.locator('input').first();
  try { await inp.fill(''); await page.waitForTimeout(800); } catch (e) {}
}
