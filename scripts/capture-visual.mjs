import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/shijian/projects/epocanvas-mail/node_modules/playwright');

const DIST_DIR = path.resolve('dist');
const PORT = 54321;

// Simple static file server
const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.json': 'application/json',
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  const browser = await chromium.launch({ headless: true });

  const targets = [
    { url: `http://localhost:${PORT}/epomail/mail/data-security/`, name: 'data-security-zh-dark.png', theme: 'dark' },
    { url: `http://localhost:${PORT}/epomail/mail/data-security/`, name: 'data-security-zh-light.png', theme: 'light' },
    { url: `http://localhost:${PORT}/epomail/en/mail/data-security/`, name: 'data-security-en-dark.png', theme: 'dark' }
  ];

  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: target.theme
    });
    const page = await context.newPage();
    await page.goto(target.url, { waitUntil: 'networkidle' });
    // set theme
    await page.evaluate((th) => {
      document.documentElement.dataset.theme = th;
    }, target.theme);
    await page.waitForTimeout(500);

    const outPath = path.resolve('screenshots', target.name);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Captured: ${outPath}`);
    await context.close();
  }

  await browser.close();
  server.close();
  console.log('Done!');
});
