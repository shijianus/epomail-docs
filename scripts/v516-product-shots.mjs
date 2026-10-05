// v5.16 本地化产品截图：6 语言 × 16 界面，浏览器实拍；部分界面注入编号标注（卡片标题）
// 产出：zh → public/images/mail/ui/*.png；其余语言 → public/images/mail/<lang>/ui/*.png
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = 'http://127.0.0.1:8787';
const PUB = fileURLToPath(new URL('../public/images/mail/', import.meta.url));

const LANGS = [
  { dir: 'ui', profileLang: 'zh' },
  { dir: 'zh-tw/ui', profileLang: 'zh-Hant' },
  { dir: 'en/ui', profileLang: 'en' },
  { dir: 'es/ui', profileLang: 'es' },
  { dir: 'fr/ui', profileLang: 'fr' },
  { dir: 'nl/ui', profileLang: 'nl' },
];

// 每个界面：hash 路由、截图名、可选标注（CSS 选择器数组，逐个注入 ①②③…）
const SHOTS = [
  { name: 'views', hash: '#inbox' },
  { name: 'detail', hash: '#inbox', open: 'mail' },
  { name: 'compose', hash: '#inbox', compose: true },
  { name: 'labels', hash: '#settings/labels', badges: ['.title', '.card-title'] },
  { name: 'profile', hash: '#settings/profile', badges: ['.card-title', '.title'] },
  { name: 'general', hash: '#settings/general', badges: ['.card-title', '.title'] },
  { name: 'data', hash: '#settings/data', badges: ['.card-title', '.title'] },
  { name: 'analysis', hash: '#manage/admin/analysis' },
  { name: 'users', hash: '#manage/admin/users' },
  { name: 'review', hash: '#manage/admin/mail' },
  { name: 'roles', hash: '#manage/admin/roles' },
  { name: 'regkeys', hash: '#manage/admin/reg-keys' },
  { name: 'system', hash: '#manage/admin/system', badges: ['.card-title'], cap: 11 },
  { name: 'category', hash: '#manage/admin/rules', badges: ['.card-title', '.title'] },
  { name: 'audit', hash: '#manage/admin/audit' },
];

const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');

async function setLang(lang) {
  const r = await fetch(BASE + '/api/my/updateProfile', {
    method: 'PUT', headers: { Authorization: `Bearer ${login.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang }),
  });
  if (!r.ok) throw new Error('updateProfile ' + r.status);
}

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let n = 0;

for (const L of LANGS) {
  const outDir = path.join(PUB, L.dir);
  mkdirSync(outDir, { recursive: true });
  await setLang(L.profileLang);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.addInitScript(([token]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loginEmail', 'admin@epomail.bond');
    localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
    localStorage.setItem('setting', JSON.stringify({ lang: '' }));
  }, [login.token]);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3400);

  for (const s of SHOTS) {
    await page.evaluate((h) => { location.hash = h; }, s.hash);
    await page.waitForTimeout(2300);
    if (s.compose) {
      const btn = page.locator('aside button').first();
      try { await btn.click({ timeout: 4000 }); await page.waitForTimeout(1600); } catch (e) { console.log('  compose click skip'); }
      // 自绘写信弹层不响应 Esc：整页刷新复位到收件箱
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3500);
    }
    if (s.open === 'mail') {
      const row = page.locator('.email-item, [class*=email] li, tbody tr').first();
      try { await row.click({ timeout: 4000 }); await page.waitForTimeout(2000); } catch (e) { console.log('  detail open skip'); }
    }
    if (s.badges) {
      await page.evaluate((specs) => {
        document.querySelectorAll('.epo-doc-badge').forEach(b => b.remove());
        const style = document.createElement('style');
        style.textContent = '.epo-doc-badge{position:absolute;z-index:9999;width:22px;height:22px;border-radius:50%;background:#4f46e5;color:#fff;font:700 13px/22px sans-serif;text-align:center;box-shadow:0 1px 6px rgba(0,0,0,.35);pointer-events:none}';
        document.head.appendChild(style);
        let i = 0;
        for (const sel of specs) {
          for (const el of document.querySelectorAll(sel)) {
            i++;
            const r = el.getBoundingClientRect();
            const b = document.createElement('div');
            b.className = 'epo-doc-badge';
            b.textContent = String(i);
            b.style.top = (r.top + window.scrollY - 11) + 'px';
            b.style.left = Math.max(0, r.left - 26) + 'px';
            document.body.appendChild(b);
            if (i >= 24) break;
          }
          if (i >= 24) break;
        }
      }, s.badges);
    }
    await page.screenshot({ path: path.join(outDir, `${s.name}.png`), fullPage: false });
    n++;
    // 清理徽标
    if (s.badges) await page.evaluate(() => { document.querySelectorAll('.epo-doc-badge').forEach(b => b.remove()); });
    console.log(`ok ${L.dir}/${s.name}.png`);
  }
  await ctx.close();
}

await browser.close();
console.log(`DONE: ${n} screenshots`);
