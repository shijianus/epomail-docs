import playwright from '/home/shijian/projects/epocanvas-mail/node_modules/playwright/index.js';
const { chromium } = playwright;
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots', 'tamper-proof');

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

// 简易静态文件服务器
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';

  let filePath = path.join(DIST_DIR, reqPath);
  if (!fs.existsSync(filePath)) {
    // 尝试没有 .html 的路径
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 8877;

async function run() {
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log(`[Test Server] Running at http://127.0.0.1:${PORT}`);

  const browser = await chromium.launch({
    executablePath: '/snap/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[Browser Console Error]', msg.text());
  });

  try {
    console.log('\n--- 1. 测试 /epomail/mail/tamper-proof/ 页面 ---');
    await page.goto(`http://127.0.0.1:${PORT}/epomail/mail/tamper-proof/`, { waitUntil: 'networkidle' });

    // 检查顶部显式 Badge
    await page.waitForSelector('#tamper-proof-top-badge', { timeout: 5000 });
    const topBadgeText = await page.textContent('#tamper-proof-top-badge');
    console.log('✓ 顶部防伪徽章 (Top Badge) 已显式渲染:', topBadgeText.trim().replace(/\s+/g, ' '));

    // 检查主显式面板
    await page.waitForSelector('#tamper-proof-widget', { timeout: 5000 });
    console.log('✓ 主防伪验真面板 (Main Widget) 已显式渲染');

    const shaVal = await page.textContent('#doc-sha256-val');
    console.log(`✓ 页面 SHA-256 存证指纹: ${shaVal} (长度: ${shaVal.length})`);
    if (shaVal.length !== 64) throw new Error(`SHA-256 长度异常: ${shaVal}`);

    // 点击实时验真按钮
    console.log('-> 点击「🔍 实时验证本文完整性」按钮...');
    await page.click('#tamper-verify-btn');
    await page.waitForSelector('.tamper-success', { timeout: 5000 });
    const statusText = await page.textContent('#tamper-verify-status');
    console.log('✓ 客户端 Web Crypto 验真结果:', statusText.trim());

    // 截图保存
    const widgetHandle = await page.$('#tamper-proof-widget');
    await widgetHandle.screenshot({ path: path.join(SCREENSHOTS_DIR, 'widget-epomail-tamper-proof.png') });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'fullpage-epomail-tamper-proof.png') });
    console.log('✓ 截图已落盘:', path.join(SCREENSHOTS_DIR, 'widget-epomail-tamper-proof.png'));

    console.log('\n--- 2. 测试 /mail/tamper-proof/ (无 /epomail 前缀根路径) ---');
    await page.goto(`http://127.0.0.1:${PORT}/mail/tamper-proof/`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#tamper-proof-top-badge', { timeout: 5000 });
    await page.waitForSelector('#tamper-proof-widget', { timeout: 5000 });
    await page.click('#tamper-verify-btn');
    await page.waitForSelector('.tamper-success', { timeout: 5000 });
    console.log('✓ 无前缀直接访问同样 100% 成功显式渲染与验真');

    console.log('\n--- 3. 测试繁体中文基準頁 /epomail/zh-tw/mail/tamper-proof/ ---');
    await page.goto(`http://127.0.0.1:${PORT}/epomail/zh-tw/mail/tamper-proof/`, { waitUntil: 'networkidle' });
    await page.waitForSelector('#tamper-proof-top-badge', { timeout: 5000 });
    await page.waitForSelector('#tamper-proof-widget', { timeout: 5000 });
    const twStatus = await page.textContent('#tamper-proof-top-badge');
    console.log('✓ 繁體中文徽章文案:', twStatus.trim().replace(/\s+/g, ' '));
    await page.click('#tamper-verify-btn');
    await page.waitForSelector('.tamper-success', { timeout: 5000 });
    const twVerified = await page.textContent('#tamper-verify-status');
    console.log('✓ 繁體中文驗真成功文案:', twVerified.trim());

    console.log('\n🎉 全部自动化端到端测试与真实浏览器验证 100% 通过！');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('❌ 测试执行失败:', err);
  process.exit(1);
});
