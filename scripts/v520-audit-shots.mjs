// v5.20 审计控制台重拍：audit.png（素版）+ audit-guide.png（标注版）×6 语言
// 对齐 2026-10-10 四大板块差异化列集重构后的界面：4 张 KPI 板块卡 + 自绘工单表 + 证据抽屉 + CSV 导出
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = 'http://127.0.0.1:8787';
const PUB = fileURLToPath(new URL('../public/images/mail/', import.meta.url));

const LANGS = [
  { dir: 'ui', key: 'zh', profileLang: 'zh' },
  { dir: 'zh-tw/ui', key: 'zh-tw', profileLang: 'zh-Hant' },
  { dir: 'en/ui', key: 'en', profileLang: 'en' },
  { dir: 'es/ui', key: 'es', profileLang: 'es' },
  { dir: 'fr/ui', key: 'fr', profileLang: 'fr' },
  { dir: 'nl/ui', key: 'nl', profileLang: 'nl' },
];

// 标注：①-④ 四张 KPI 板块卡（仅徽章，卡面自带标题）＋ ⑤ 证据抽屉入口 ＋ ⑥ CSV 导出
const CHIP = {
  drawer: {
    zh: '证据抽屉：双栏证据比对与全周期时间线',
    'zh-tw': '證據抽屜：雙欄證據比對與全週期時間線',
    en: 'Evidence drawer: side-by-side proof and full timeline',
    es: 'Cajón de evidencia: prueba comparada y cronología',
    fr: 'Tiroir de preuves : comparaison et chronologie',
    nl: 'Bewijslade: vergelijking en tijdlijn',
  },
  csv: {
    zh: '导出数据：当前板块 CSV 全列导出',
    'zh-tw': '匯出資料：當前板塊 CSV 全列匯出',
    en: 'Export: full-column CSV of this board',
    es: 'Exportar: CSV completo del panel',
    fr: 'Exporter : CSV complet du tableau',
    nl: 'Exporteren: volledige CSV van dit paneel',
  },
};

const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@example.com', password: '123456' }),
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
    localStorage.setItem('loginEmail', 'admin@example.com');
    localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
    localStorage.setItem('setting', JSON.stringify({ lang: '' }));
  }, [login.token]);

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3400);
  await page.evaluate(() => { location.hash = '#manage/admin/audit'; });
  await page.waitForTimeout(4400);

  // 素版 audit.png（默认滥用威胁板块）
  await page.screenshot({ path: path.join(outDir, 'audit.png') });
  n++;
  console.log(`ok ${L.dir}/audit.png`);

  // 标注版 audit-guide.png
  const marks = await page.evaluate((chip) => {
    document.querySelectorAll('.epo-doc-anno-box, .epo-doc-anno-badge, .epo-doc-anno-chip').forEach((b) => b.remove());
    let st = document.getElementById('epo-anno-style');
    if (!st) {
      st = document.createElement('style');
      st.id = 'epo-anno-style';
      st.textContent = [
        '.epo-doc-anno-box{position:absolute;z-index:9998;border:2.5px solid #6366f1;border-radius:10px;box-shadow:0 0 0 3px rgba(99,102,241,.18);pointer-events:none}',
        '.epo-doc-anno-badge{position:absolute;z-index:9999;width:24px;height:24px;border-radius:50%;background:#4f46e5;color:#fff;font:800 14px/24px sans-serif;text-align:center;box-shadow:0 1px 8px rgba(0,0,0,.4);pointer-events:none}',
        '.epo-doc-anno-chip{position:absolute;z-index:9999;background:#4f46e5;color:#fff;font:700 13px/1.35 sans-serif;padding:6px 10px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:none;max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      ].join('');
      document.head.appendChild(st);
    }
    const out = [];
    const vis = (r) => r.width > 4 && r.height > 4;
    const draw = (el, { chipText = null, below = false, chipLeft = null } = {}) => {
      const r = el.getBoundingClientRect();
      if (!vis(r)) return false;
      const i = out.length + 1;
      const box = document.createElement('div');
      box.className = 'epo-doc-anno-box';
      box.style.top = (r.top + window.scrollY - 4) + 'px';
      box.style.left = (r.left - 4) + 'px';
      box.style.width = (r.width + 8) + 'px';
      box.style.height = (r.height + 8) + 'px';
      document.body.appendChild(box);
      const badge = document.createElement('div');
      badge.className = 'epo-doc-anno-badge';
      badge.textContent = String(i);
      badge.style.top = (r.top + window.scrollY - 12) + 'px';
      badge.style.left = Math.max(0, r.left - 12) + 'px';
      document.body.appendChild(badge);
      if (chipText) {
        const chip = document.createElement('div');
        chip.className = 'epo-doc-anno-chip';
        chip.textContent = i + '. ' + chipText;
        if (below) {
          chip.style.top = (r.top + window.scrollY + r.height + 10) + 'px';
          chip.style.left = Math.max(4, Math.min(chipLeft ?? r.left, 1440 - 300)) + 'px';
        } else {
          chip.style.top = (r.top + window.scrollY - 14) + 'px';
          chip.style.left = (r.left + r.width + 10) + 'px';
          if (r.left + r.width + 310 > 1440) {
            chip.style.top = (r.top + window.scrollY + r.height + 8) + 'px';
            chip.style.left = Math.max(4, Math.min(r.left - 60, 1440 - 310)) + 'px';
          }
        }
        document.body.appendChild(chip);
      }
      out.push({ n: i });
      return true;
    };
    // ①-④ 四张板块卡（徽章加框，不叠文字 chip）
    for (const c of ['kpi-threat', 'kpi-appeal', 'kpi-audit', 'kpi-record']) {
      const el = document.querySelector(`.kpi-card.${c}`);
      if (el) draw(el);
    }
    // ⑤ 首行「详情」按钮（chip 右侧，出界自动下翻钳制）
    const detail = [...document.querySelectorAll('button')].find((b) => /詳情|详情|detalles?|détails?|details/i.test(b.textContent || '') && b.getBoundingClientRect().width > 0);
    if (detail) draw(detail, { chipText: chip.drawer });
    // ⑥ CSV 导出图标（工具栏第 4 枚图标；chip 下置）
    const icons = document.querySelectorAll('.header-actions svg.icon');
    const dl = icons.length > 3 ? icons[3] : (document.querySelector('.header-actions svg.icon[icon*="download"]') ?? null);
    if (dl) draw(dl, { chipText: chip.csv, below: true });
    return out;
  }, { drawer: CHIP.drawer[L.key], csv: CHIP.csv[L.key] });

  await page.screenshot({ path: path.join(outDir, 'audit-guide.png') });
  n++;
  console.log(`ok ${L.dir}/audit-guide.png (${marks.length} marks)`);
  await ctx.close();
}

await browser.close();
console.log(`DONE: ${n} screenshots`);
