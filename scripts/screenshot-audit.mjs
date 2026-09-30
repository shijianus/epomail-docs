// 批量视觉验证截图（本地部署 /epomail 挂载形态）。
// 用法: node scripts/screenshot-audit.mjs http://127.0.0.1:8791
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = (process.argv[2] || 'http://127.0.0.1:8791').replace(/\/+$/, '') + '/epomail';
const OUT = fileURLToPath(new URL('../screenshots/audit/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const FULL = [
	['dk-project', '/mail/project/'],
	['dk-privacy', '/mail/privacy-policy/'],
	['dk-tos', '/mail/terms-of-service/'],
	['dk-aup', '/mail/acceptable-use/'],
	['dk-datasec', '/mail/data-security/'],
	['dk-subproc', '/mail/sub-processors/'],
	['dk-keyterms', '/mail/key-terms/'],
];
const ANCHORS = [
	['dk-privacy-retention', '/mail/privacy-policy/#8-资料保存期限与销毁'],
	['dk-datasec-matrix', '/mail/data-security/#2-数据处理矩阵'],
	['dk-subproc-auth', '/mail/sub-processors/#2-经当事人授权之处理者'],
	['dk-aup-ladder', '/mail/acceptable-use/#6-执行措施'],
	['dk-tos-liability', '/mail/terms-of-service/#10-免责声明与责任限制'],
	['dk-keyterms-tech', '/mail/key-terms/#2-技术名词'],
];
const LOCALES = [
	['tw-overview', '/zh-tw/mail/overview/'],
	['en-overview', '/en/mail/overview/'],
	['fr-overview', '/fr/mail/overview/'],
	['es-overview', '/es/mail/overview/'],
	['nl-overview', '/nl/mail/overview/'],
];

const browser = await chromium.launch();
// 1) 暗色全页
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' });
	const page = await ctx.newPage();
	for (const [name, path] of FULL) {
		await page.goto(BASE + path, { waitUntil: 'load' });
		await page.waitForTimeout(300);
		await page.screenshot({ path: `${OUT}${name}.png`, fullPage: true });
		console.log(name);
	}
	for (const [name, path] of ANCHORS) {
		await page.goto(BASE + path, { waitUntil: 'load' });
		await page.waitForTimeout(300);
		await page.screenshot({ path: `${OUT}${name}.png` });
		console.log(name);
	}
	for (const [name, path] of LOCALES) {
		await page.goto(BASE + path, { waitUntil: 'load' });
		await page.waitForTimeout(300);
		await page.screenshot({ path: `${OUT}dk-${name}.png` });
		console.log(`dk-${name}`);
	}
	// 404 页
	await page.goto(BASE + '/epomail/404.html', { waitUntil: 'load' });
	await page.waitForTimeout(300);
	await page.screenshot({ path: `${OUT}dk-404.png` });
	console.log('dk-404');
	await ctx.close();
}
// 2) 亮色抽查
{
	const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'light' });
	const page = await ctx.newPage();
	for (const [name, path] of [
		['lt-overview', '/mail/overview/'],
		['lt-project', '/mail/project/'],
		['lt-privacy', '/mail/privacy-policy/'],
	]) {
		await page.goto(BASE + path, { waitUntil: 'load' });
		await page.waitForTimeout(300);
		await page.screenshot({ path: `${OUT}${name}.png` });
		console.log(name);
	}
	await ctx.close();
}
// 3) 移动端 375
{
	const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, colorScheme: 'dark' });
	const page = await ctx.newPage();
	await page.goto(BASE + '/mail/privacy-policy/', { waitUntil: 'load' });
	await page.waitForTimeout(300);
	await page.screenshot({ path: `${OUT}mb-privacy-full.png`, fullPage: true });
	console.log('mb-privacy-full');
	await page.goto(BASE + '/mail/overview/', { waitUntil: 'load' });
	await page.waitForTimeout(300);
	await page.screenshot({ path: `${OUT}mb-overview.png` });
	console.log('mb-overview');
	await ctx.close();
}
await browser.close();
console.log('DONE');
