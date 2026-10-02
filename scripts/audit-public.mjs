import { chromium } from '/home/shijian/projects/epocanvas-mail/node_modules/playwright/index.mjs';
import fs from 'fs';
import path from 'path';

async function audit() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    zh: {},
    en: {},
    consoleErrors: [],
    networkErrors: []
  };

  const screenshotsDir = '/home/shijian/projects/epomail-docs/screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // --- 1. Audit Chinese Page ---
  console.log('Navigating to Chinese page...');
  const pageZh = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  pageZh.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(`[ZH console error] ${msg.text()}`);
    }
  });

  pageZh.on('response', resp => {
    if (resp.status() >= 400) {
      results.networkErrors.push(`[ZH HTTP ${resp.status()}] ${resp.url()}`);
    }
  });

  const zhResp = await pageZh.goto('https://epomail-docs.pages.dev/epomail/mail/data-security/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  results.zh.status = zhResp.status();
  results.zh.url = pageZh.url();

  // Ensure Light mode
  await pageZh.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await pageZh.waitForTimeout(500);

  // Take Light Screenshot
  const zhLightPath = path.join(screenshotsDir, 'audit-public-light.png');
  await pageZh.screenshot({ path: zhLightPath, fullPage: true });
  console.log('Saved', zhLightPath);

  // Switch to Dark mode
  await pageZh.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await pageZh.waitForTimeout(500);

  // Take Dark Screenshot
  const zhDarkPath = path.join(screenshotsDir, 'audit-public-dark.png');
  await pageZh.screenshot({ path: zhDarkPath, fullPage: true });
  console.log('Saved', zhDarkPath);

  // Mobile Viewport
  const pageZhMobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  await pageZhMobile.goto('https://epomail-docs.pages.dev/epomail/mail/data-security/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  const zhMobilePath = path.join(screenshotsDir, 'audit-public-mobile.png');
  await pageZhMobile.screenshot({ path: zhMobilePath, fullPage: false }); // standard viewport
  const zhMobileFullPath = path.join(screenshotsDir, 'audit-public-mobile-full.png');
  await pageZhMobile.screenshot({ path: zhMobileFullPath, fullPage: true });
  console.log('Saved mobile screenshots');
  await pageZhMobile.close();

  // Audit DOM & Content on ZH page
  const zhDomAnalysis = await pageZh.evaluate(() => {
    // Images
    const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      width: img.width,
      height: img.height,
      displayed: img.offsetWidth > 0 && img.offsetHeight > 0
    }));

    // Check specific SVGs
    const expectedSvgs = [
      'security-trust-shield.svg',
      'dual-nature-scale.svg',
      'data-sovereignty-export.svg'
    ];
    const vectorIllustrations = imgs.filter(i => expectedSvgs.some(e => i.src.includes(e)));

    // Card check
    const googleCardElements = Array.from(document.querySelectorAll('.google-card, [class*="google-card"]')).map(el => el.className);
    
    // Privacy checkup banner
    const privacyCheckupBanner = document.querySelector('.privacy-checkup-banner, [class*="privacy-checkup"], [class*="checkup"]');
    const privacyCheckupText = privacyCheckupBanner ? privacyCheckupBanner.innerText : null;

    // Star dividers
    const starDividers = Array.from(document.querySelectorAll('.star-divider, [class*="star-divider"]')).length;
    const starCharactersCount = (document.body.innerText.match(/✦/g) || []).length;

    // Tamper proof widget check
    const tamperProofWidget = document.querySelector('#tamper-proof-widget, .tamper-proof, [class*="tamper-proof"]');

    // Text content analysis
    const bodyText = document.body.innerText;

    // Check section introductions
    // Find headings (h2) and their immediate following paragraphs
    const h2s = Array.from(document.querySelectorAll('h2'));
    const sectionIntros = h2s.map(h2 => {
      let next = h2.nextElementSibling;
      while (next && next.tagName !== 'P' && next.tagName !== 'DIV') {
        next = next.nextElementSibling;
      }
      return {
        title: h2.innerText.trim(),
        introText: next ? next.innerText.trim() : '',
        introLength: next ? next.innerText.trim().length : 0
      };
    });

    // Custom alerts / callouts / cautions
    const cautions = Array.from(document.querySelectorAll('.custom-block.caution, .custom-block.warning, .custom-block.info, .custom-block.tip, .admonition')).map(el => ({
      type: el.className,
      text: el.innerText
    }));

    return {
      imgs,
      vectorIllustrations,
      googleCardElements,
      privacyCheckupExists: !!privacyCheckupBanner,
      privacyCheckupText,
      starDividers,
      starCharactersCount,
      tamperProofExists: !!tamperProofWidget,
      bodyTextLength: bodyText.length,
      sectionIntros,
      cautions,
      headings: h2s.map(h => h.innerText.trim())
    };
  });
  results.zh.analysis = zhDomAnalysis;

  // --- 2. Audit English Page ---
  console.log('Navigating to English page...');
  const pageEn = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  pageEn.on('console', msg => {
    if (msg.type() === 'error') {
      results.consoleErrors.push(`[EN console error] ${msg.text()}`);
    }
  });

  pageEn.on('response', resp => {
    if (resp.status() >= 400) {
      results.networkErrors.push(`[EN HTTP ${resp.status()}] ${resp.url()}`);
    }
  });

  const enResp = await pageEn.goto('https://epomail-docs.pages.dev/en/mail/data-security/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  results.en.status = enResp.status();
  results.en.url = pageEn.url();

  // English Light
  await pageEn.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await pageEn.waitForTimeout(500);
  const enLightPath = path.join(screenshotsDir, 'audit-public-en-light.png');
  await pageEn.screenshot({ path: enLightPath, fullPage: true });

  // English Dark
  await pageEn.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await pageEn.waitForTimeout(500);
  const enDarkPath = path.join(screenshotsDir, 'audit-public-en-dark.png');
  await pageEn.screenshot({ path: enDarkPath, fullPage: true });

  // English DOM analysis
  const enDomAnalysis = await pageEn.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      width: img.width,
      height: img.height,
      displayed: img.offsetWidth > 0 && img.offsetHeight > 0
    }));

    const expectedSvgs = [
      'security-trust-shield.svg',
      'dual-nature-scale.svg',
      'data-sovereignty-export.svg'
    ];
    const vectorIllustrations = imgs.filter(i => expectedSvgs.some(e => i.src.includes(e)));
    const googleCardElements = Array.from(document.querySelectorAll('.google-card, [class*="google-card"]')).map(el => el.className);
    const privacyCheckupBanner = document.querySelector('.privacy-checkup-banner, [class*="privacy-checkup"], [class*="checkup"]');
    const starDividers = Array.from(document.querySelectorAll('.star-divider, [class*="star-divider"]')).length;
    const starCharactersCount = (document.body.innerText.match(/✦/g) || []).length;
    const tamperProofWidget = document.querySelector('#tamper-proof-widget, .tamper-proof, [class*="tamper-proof"]');
    const bodyText = document.body.innerText;

    const h2s = Array.from(document.querySelectorAll('h2'));
    const sectionIntros = h2s.map(h2 => {
      let next = h2.nextElementSibling;
      while (next && next.tagName !== 'P' && next.tagName !== 'DIV') {
        next = next.nextElementSibling;
      }
      return {
        title: h2.innerText.trim(),
        introText: next ? next.innerText.trim() : '',
        introWords: next ? next.innerText.trim().split(/\s+/).length : 0
      };
    });

    return {
      imgs,
      vectorIllustrations,
      googleCardElements,
      privacyCheckupExists: !!privacyCheckupBanner,
      privacyCheckupText: privacyCheckupBanner ? privacyCheckupBanner.innerText : null,
      starDividers,
      starCharactersCount,
      tamperProofExists: !!tamperProofWidget,
      bodyTextLength: bodyText.length,
      sectionIntros,
      headings: h2s.map(h => h.innerText.trim())
    };
  });
  results.en.analysis = enDomAnalysis;

  await browser.close();

  fs.writeFileSync(
    path.join(screenshotsDir, 'audit-results.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );
  console.log('Audit completed and audit-results.json saved.');
}

audit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
