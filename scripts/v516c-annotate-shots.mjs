// v516c 标注版截图第二批：写信/搜索/邮件模式/登录/两步验证/OAuth 应用/通知转发 ×6 语言
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = 'http://127.0.0.1:8787';
const PUB = fileURLToPath(new URL('../public/images/mail/', import.meta.url));
const LANGS = [
  { dir: 'ui', profileLang: 'zh' }, { dir: 'zh-tw/ui', profileLang: 'zh-Hant' },
  { dir: 'en/ui', profileLang: 'en' }, { dir: 'es/ui', profileLang: 'es' },
  { dir: 'fr/ui', profileLang: 'fr' }, { dir: 'nl/ui', profileLang: 'nl' },
];
const SPECS = [
  { name: 'compose-guide', hash: '#inbox', compose: true, marks: [{ sel: '.tox-toolbar', n: 1 }, { sel: 'aside button', n: 1 }] },
  { name: 'search-guide', hash: '#inbox', search: 'from:github', marks: [{ sel: 'input[type=text], input:not([type])', n: 1 }, { sel: 'table th, tbody tr', n: 2, offset: 0 }] },
  { name: 'mode-guide', hash: '#manage/admin/system', marks: [{ sel: '.website-card', n: 1 }, { sel: '.website-card .card-title', n: 1 }], wait: 3400 },
  { name: 'login-guide', hash: '/login/', login: true, marks: [{ sel: 'input', n: 2 }] },
  { name: 'twofa-guide', hash: '#settings/security', marks: [{ sel: '.method-item', n: 3 }, { sel: '.settings-title', n: 1 }], wait: 3400 },
  { name: 'apps-guide', hash: '#manage/admin/oauth-apps', marks: [{ sel: '.endpoint-chip', n: 4, offset: 0 }, { sel: '.app-card', n: 1 }], wait: 3400 },
  { name: 'notify-guide', hash: '#settings/data', marks: [{ sel: '.export-card', n: 3 }, { sel: '.forwarding-container .title', n: 1 }], wait: 3400 },
];

const res = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }) });
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');
async function setLang(lang) {
  const r = await fetch(BASE + '/api/my/updateProfile', { method: 'PUT', headers: { Authorization: `Bearer ${login.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ lang }) });
  if (!r.ok) throw new Error('updateProfile ' + r.status);
}
const harvested = {};
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let n = 0;
for (const L of LANGS) {
  const outDir = path.join(PUB, L.dir);
  mkdirSync(outDir, { recursive: true });
  harvested[L.profileLang] = {};
  await setLang(L.profileLang);
  for (const s of SPECS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    if (!s.login) await page.addInitScript(([token]) => {
      localStorage.setItem('token', token);
      localStorage.setItem('loginEmail', 'admin@epomail.bond');
      localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
      localStorage.setItem('setting', JSON.stringify({ lang: '' }));
    }, [login.token]);
    const target = s.hash.startsWith('/login/') ? BASE + s.hash : BASE + '/';
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(s.login ? 2600 : 3400);
    if (!s.login) {
      await page.evaluate((h) => { location.hash = h; }, s.hash);
      await page.waitForTimeout(s.wait || 2800);
    }
    if (s.search) {
      const inp = page.locator('input').first();
      try { await inp.fill(s.search); await page.waitForTimeout(1800); } catch (e) { console.log('  fill skip'); }
    }
    if (s.compose) {
      const btn = page.locator('aside button').first();
      try { await btn.click({ timeout: 4000 }); await page.waitForTimeout(1600); } catch (e) { console.log('  compose skip'); }
    }
    const texts = await page.evaluate((marks) => {
      document.querySelectorAll('.epo-doc-anno-box, .epo-doc-anno-badge, .epo-doc-anno-chip').forEach(b => b.remove());
      let st = document.getElementById('epo-anno-style');
      if (!st) {
        st = document.createElement('style'); st.id = 'epo-anno-style';
        st.textContent = ['.epo-doc-anno-box{position:absolute;z-index:9998;border:2.5px solid #6366f1;border-radius:10px;box-shadow:0 0 0 3px rgba(99,102,241,.18);pointer-events:none}',
          '.epo-doc-anno-badge{position:absolute;z-index:9999;width:24px;height:24px;border-radius:50%;background:#4f46e5;color:#fff;font:800 14px/24px sans-serif;text-align:center;box-shadow:0 1px 8px rgba(0,0,0,.4);pointer-events:none}',
          '.epo-doc-anno-chip{position:absolute;z-index:9999;background:#4f46e5;color:#fff;font:700 13px/1 sans-serif;padding:6px 10px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:none;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'].join('');
        document.head.appendChild(st);
      }
      const out = []; let i = 0;
      for (const m of marks) {
        const els = [...document.querySelectorAll(m.sel)];
        const list = m.offset ? els.slice(m.offset, m.offset + m.n) : els.slice(0, m.n);
        for (const el of list) {
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) continue;
          i++;
          const box = document.createElement('div'); box.className = 'epo-doc-anno-box';
          box.style.top = (r.top + window.scrollY - 4) + 'px'; box.style.left = (r.left - 4) + 'px';
          box.style.width = (r.width + 8) + 'px'; box.style.height = (r.height + 8) + 'px';
          document.body.appendChild(box);
          const badge = document.createElement('div'); badge.className = 'epo-doc-anno-badge';
          badge.textContent = String(i);
          badge.style.top = (r.top + window.scrollY - 12) + 'px'; badge.style.left = Math.max(0, r.left - 12) + 'px';
          document.body.appendChild(badge);
          const label = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 16) || (el.getAttribute('placeholder') || '').slice(0, 16);
          const chip = document.createElement('div'); chip.className = 'epo-doc-anno-chip';
          chip.textContent = i + '. ' + label;
          chip.style.top = (r.top + window.scrollY - 14) + 'px'; chip.style.left = (r.left + r.width + 10) + 'px';
          if (r.left + r.width + 240 > 1440) { chip.style.left = Math.max(0, r.left - 10) + 'px'; chip.style.top = (r.top + window.scrollY + r.height + 8) + 'px'; }
          document.body.appendChild(chip);
          out.push({ n: i, label });
        }
      }
      return out;
    }, s.marks);
    harvested[L.profileLang][s.name] = texts;
    await page.screenshot({ path: path.join(outDir, `${s.name}.png`) });
    n++;
    console.log(`ok ${L.dir}/${s.name}.png (${texts.length})`);
    await ctx.close();
  }
}
writeFileSync(fileURLToPath(new URL('./annotate-texts-c.json', import.meta.url)), JSON.stringify(harvested, null, 1));
await browser.close();
console.log(`DONE: ${n}`);
