// v5.11 专案介绍扩充轮临时截图脚本：运行模式 + 设置指南两新页所需的真实界面截图。
// 配方与 product-shots.mjs 一致：本地演示实例（127.0.0.1:8787），服务端 profile 语言驱动 + localStorage 登录态注入。
// 用后即弃，不入库。
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = 'http://127.0.0.1:8787';
const OUT = fileURLToPath(new URL('../screenshots/v511/', import.meta.url));
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
async function shot(name, { lang = 'zh', theme = 'light', width = 1440, height = 900, hash = '#inbox', after = null, authed = true } = {}) {
  await setLang(lang);
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: theme === 'dark' ? 'dark' : 'light' });
  const page = await ctx.newPage();
  if (authed) {
    await page.addInitScript(([token]) => {
      localStorage.setItem('token', token);
      localStorage.setItem('loginEmail', 'admin@epomail.bond');
      localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
      localStorage.setItem('setting', JSON.stringify({ lang: '' }));
    }, [login.token]);
  }
  await page.goto(BASE + (authed ? `/mail/u/0/${hash}` : '/login/'), { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3400);
  if (after) { try { await after(page); } catch (e) { console.log('  after-step skipped:', String(e).slice(0, 90)); } }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}${name}.png` });
  n++;
  console.log('ok', name);
  await ctx.close();
}

// —— 运行模式页 ——
// 1. 登录页（密码登录阶段）
await shot('login', { authed: false });
// 2. 系统设置·网站设置卡（邮件模式选择器展开，三档模式可见）
await shot('sys-setting-mode', {
  hash: '#manage/admin/system',
  after: async (page) => {
    const sel = page.locator('.mail-mode-select').first();
    await sel.click({ timeout: 9000 });
    await page.waitForTimeout(1200);
  },
});
// 3. 权限页（六角色身份分组）
await shot('roles', { hash: '#manage/admin/roles' });
// 4. 安全设置·两步验证中心（TOTP/备份码/Passkey）
await shot('security-2fa', { hash: '#settings/security' });
// 5. 收件箱头像菜单（多账户切换 + 添加账号）
await shot('account-menu', {
  hash: '#inbox',
  after: async (page) => {
    await page.locator('.avatar-wrap').first().click({ timeout: 9000 });
    await page.waitForTimeout(1200);
  },
});

// —— 设置指南页 ——
// 6. 个人资料
await shot('settings-profile', { hash: '#settings/profile' });
// 7. 通用（主题/语言/翻译目标语言）
await shot('settings-general', { hash: '#settings/general' });
// 8. 数据（导出/通知与转发/存储）
await shot('settings-data', { hash: '#settings/data' });
// 9. 操作报告（四类预警）
await shot('audit-report', { hash: '#manage/admin/audit' });
// 10. 用户列表（管理控制台代表页）
await shot('users', { hash: '#manage/admin/users' });

await browser.close();
console.log(`done: ${n} screenshots -> ${OUT}`);
