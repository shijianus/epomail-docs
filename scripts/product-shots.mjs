// Product screenshots for docs: local demo instance, multi-language & theme.
// Language: server-side profile (PUT /api/my/updateProfile) + the four localStorage
// keys the app reads (same recipe as tests/test-strict-i18n-e2e.mjs). Entry is always
// '/' — the SPA hash-routes to /mail/u/0/#inbox on its own.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = 'http://127.0.0.1:8787';
const OUT = fileURLToPath(new URL('../screenshots/product/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const res = await fetch(BASE + '/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');

async function setLang(lang) {
  const r = await fetch(BASE + '/api/my/updateProfile', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${login.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang }),
  });
  if (!r.ok) throw new Error('updateProfile ' + r.status);
}

const browser = await chromium.launch();
let n = 0;
async function shot(name, { lang = 'zh', theme = 'light', width = 1440, height = 900, fullPage = false, after = null } = {}) {
  await setLang(lang);
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: theme === 'dark' ? 'dark' : 'light' });
  const page = await ctx.newPage();
  await page.addInitScript(([token, dark]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loginEmail', 'admin@epomail.bond');
    localStorage.setItem('ui', JSON.stringify({ dark, themeMode: dark ? 'dark' : 'light', locale: '', defaultTranslateLang: 'en' }));
    localStorage.setItem('setting', JSON.stringify({ lang: '' }));
  }, [login.token, theme === 'dark']);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3200);
  if (after) { try { await after(page); } catch (e) { console.log('  after-step skipped:', String(e).slice(0, 80)); } }
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}${name}.png`, fullPage });
  n++;
  console.log('ok', name);
  await ctx.close();
}

// —— 登录页 ——
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE + '/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2200);
  await page.screenshot({ path: `${OUT}login-zh-light.png` });
  console.log('ok login-zh-light');
  await ctx.close();
}

// —— 收件箱：zh 亮/暗 ——
await shot('inbox-zh-light', {});
await shot('inbox-zh-dark', { theme: 'dark' });

// —— 详情：验证码（code 徽标）与官方公告（Shadow DOM）——
await shot('detail-verification-zh-light', {
  after: async (page) => { await page.click('text=您的验证码', { timeout: 9000 }); await page.waitForTimeout(1800); },
});
await shot('detail-announcement-zh-dark', {
  theme: 'dark',
  after: async (page) => {
    await page.click('text=全域公告', { timeout: 9000 });
    await page.waitForTimeout(1800);
  },
});

// —— 搜索 ——
await shot('search-syntax-zh-light', {
  after: async (page) => {
    const box = page.locator('input[placeholder*="搜索"], input[placeholder*="搜尋"], input[placeholder*="Search"]').first();
    await box.click({ timeout: 9000 });
    await box.fill('from:github is:unread');
    await page.waitForTimeout(1500);
  },
});

// —— 写信 ——
await shot('compose-zh-light', {
  after: async (page) => { await page.click('text=写邮件', { timeout: 9000 }); await page.waitForTimeout(1700); },
});

// —— 多语言收件箱 ——
await shot('inbox-en-light', { lang: 'en' });
await shot('inbox-en-dark', { lang: 'en', theme: 'dark' });
await shot('inbox-zh-tw-light', { lang: 'zh-Hant' });
await shot('inbox-fr-light', { lang: 'fr' });
await shot('inbox-es-light', { lang: 'es' });
await shot('inbox-nl-light', { lang: 'nl' });

// —— en 撰写页（多样性）——
await shot('compose-en-light', {
  lang: 'en',
  after: async (page) => { await page.click('text=Compose', { timeout: 9000 }); await page.waitForTimeout(1700); },
});

// —— 移动端 ——
await shot('inbox-zh-mobile', { width: 375, height: 760 });
await shot('inbox-en-mobile', { lang: 'en', width: 375, height: 760 });

await browser.close();
console.log(`done: ${n + 1} screenshots -> ${OUT}`);
