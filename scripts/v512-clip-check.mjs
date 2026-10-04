// v5.12 关键区域元素级截图：里程碑表、链路代码块尾段、角色表、配置卡表、features §9、暗色里程碑表
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'screenshots', 'v512-docs');
const BASE = 'http://127.0.0.1:8790';

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });

async function shoot(name, url, locale, actions) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, locale });
  const page = await ctx.newPage();
  await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(600);
  await actions(page);
  await ctx.close();
  console.log('clip ok: ' + name);
}

// 里程碑表（project 页第一张表）+ 两个代码块
for (const [lang, url, locale, row14Text] of [
  ['zh', '/mail/project/', 'zh-CN', '14. 审计治理与介绍扩充'],
  ['en', '/en/mail/project/', 'en', '14. Audit governance'],
  ['es', '/es/mail/project/', 'es', '14. Gobernanza'],
  ['fr', '/fr/mail/project/', 'fr', '14. Gouvernance'],
  ['nl', '/nl/mail/project/', 'nl', '14. Auditgovernance'],
  ['zh-tw', '/zh-tw/mail/project/', 'zh-TW', '14. 稽核治理'],
]) {
  await shoot(`clip-${lang}-project-table`, url, locale, async (page) => {
    const table = page.locator('table').first();
    await table.screenshot({ path: path.join(outDir, `clip-${lang}-project-table.png`) });
    const row = page.locator('tr', { hasText: row14Text }).first();
    await row.scrollIntoViewIfNeeded();
    await row.screenshot({ path: path.join(outDir, `clip-${lang}-project-row14.png`) });
    const pres = page.locator('pre');
    const n = await pres.count();
    for (let i = 0; i < n; i++) {
      const box = await pres.nth(i).boundingBox();
      if (!box) continue;
      try {
        // 只截每个代码块最后 ~360px（新增行在末尾）
        const clipH = Math.min(360, box.height);
        const y = Math.max(0, box.y + box.height - clipH);
        await page.screenshot({
          path: path.join(outDir, `clip-${lang}-project-pre${i}-tail.png`),
          clip: { x: Math.max(0, box.x), y, width: box.width, height: Math.min(clipH, box.height) },
        });
      } catch (e) { console.log(`pre${i} clip skip: ${e.message.split('\n')[0]}`); }
    }
  });
}

// modes 角色表 + 信任设备条目（zh/en）
for (const [lang, url, locale] of [['zh', '/mail/modes/', 'zh-CN'], ['en', '/en/mail/modes/', 'en']]) {
  await shoot(`clip-${lang}-modes`, url, locale, async (page) => {
    const rolesTable = page.locator('table').nth(1);
    await rolesTable.scrollIntoViewIfNeeded();
    await rolesTable.screenshot({ path: path.join(outDir, `clip-${lang}-modes-roles.png`) });
    const li = page.locator('li', { hasText: lang === 'zh' ? '信任设备' : 'Trusted devices' }).first();
    await li.scrollIntoViewIfNeeded();
    await li.screenshot({ path: path.join(outDir, `clip-${lang}-modes-trust.png`) });
  });
}

// settings 配置卡表（zh/en）
for (const [lang, url, locale] of [['zh', '/mail/settings/', 'zh-CN'], ['en', '/en/mail/settings/', 'en']]) {
  await shoot(`clip-${lang}-settings`, url, locale, async (page) => {
    const tables = page.locator('table');
    const n = await tables.count();
    let target = null;
    for (let i = 0; i < n; i++) {
      const t = tables.nth(i);
      const txt = await t.innerText();
      if (txt.includes('网站设置') || txt.includes('Website settings')) { target = t; break; }
    }
    if (target) {
      await target.scrollIntoViewIfNeeded();
      await target.screenshot({ path: path.join(outDir, `clip-${lang}-settings-cards.png`) });
    }
  });
}

// features §9 开放平台区（确认无 Linux DO）
await shoot('clip-zh-features-s9', '/mail/features/', 'zh-CN', async (page) => {
  const h2 = page.locator('h2', { hasText: '开放平台与数据自主' }).first();
  await h2.scrollIntoViewIfNeeded();
  const box = await h2.boundingBox();
  await page.screenshot({
    path: path.join(outDir, 'clip-zh-features-s9.png'),
    clip: { x: 0, y: box.y - 10, width: 1440, height: 560 },
  });
});

// 暗色 project 里程碑表
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'dark', locale: 'zh-CN' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/mail/project/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(600);
  const table = page.locator('table').first();
  await table.scrollIntoViewIfNeeded();
  await table.screenshot({ path: path.join(outDir, 'clip-zh-dark-project-table.png') });
  console.log('clip ok: dark table');
  await ctx.close();
}

await browser.close();
console.log('ALL CLIPS DONE');
