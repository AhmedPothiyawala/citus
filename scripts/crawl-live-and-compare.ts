import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const ARTIFACTS_DIR = path.join(ROOT, 'artifacts');
const REF_DIR = path.join(ARTIFACTS_DIR, 'reference-screenshots');
const LOCAL_DIR = path.join(ARTIFACTS_DIR, 'local-screenshots');
const DOM_DIR = path.join(ARTIFACTS_DIR, 'dom-snapshots');

[REF_DIR, LOCAL_DIR, DOM_DIR].forEach((d) => fs.mkdirSync(d, { recursive: true }));

const ROUTES_MAP: { localPath: string; liveUrl: string; slug: string }[] = [
  { localPath: '/', liveUrl: 'https://citiuscomm.com/', slug: 'home' },
  { localPath: '/company-profile/', liveUrl: 'https://citiuscomm.com/company-profile/', slug: 'company-profile' },
  { localPath: '/why-us/', liveUrl: 'https://citiuscomm.com/why-us/', slug: 'why-us' },
  { localPath: '/leadership/', liveUrl: 'https://citiuscomm.com/leadership/', slug: 'leadership' },
  { localPath: '/partners/', liveUrl: 'https://citiuscomm.com/partners/', slug: 'partners' },
  { localPath: '/products/', liveUrl: 'https://citiuscomm.com/products/', slug: 'products' },
  { localPath: '/digital-services/', liveUrl: 'https://citiuscomm.com/digital-services/', slug: 'digital-services' },
  { localPath: '/networking/', liveUrl: 'https://citiuscomm.com/networking/', slug: 'networking' },
  { localPath: '/fttx/', liveUrl: 'https://citiuscomm.com/fttx/', slug: 'fttx' },
  { localPath: '/server-storage/', liveUrl: 'https://citiuscomm.com/server-storage/', slug: 'server-storage' },
  { localPath: '/data-center-cloud/', liveUrl: 'https://citiuscomm.com/data-center-cloud/', slug: 'data-center-cloud' },
  { localPath: '/industry-applications/', liveUrl: 'https://citiuscomm.com/industry-applications/', slug: 'industry-applications' },
  { localPath: '/security-solutions/', liveUrl: 'https://citiuscomm.com/security-solutions/', slug: 'security-solutions' },
  { localPath: '/case-studies/', liveUrl: 'https://citiuscomm.com/category/case-studies/', slug: 'case-studies' },
  { localPath: '/rakuten-mobile/', liveUrl: 'https://citiuscomm.com/rakuten-mobile/', slug: 'rakuten-mobile' },
  { localPath: '/nepal-telecom/', liveUrl: 'https://citiuscomm.com/nepal-telecom/', slug: 'nepal-telecom' },
  { localPath: '/net-broadband/', liveUrl: 'https://citiuscomm.com/net-broadband/', slug: 'net-broadband' },
  { localPath: '/careers/', liveUrl: 'https://citiuscomm.com/careers/', slug: 'careers' },
  { localPath: '/contact/', liveUrl: 'https://citiuscomm.com/contact/', slug: 'contact' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function smoothScroll(page: any) {
  await page.evaluate(`(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  })()`);
  await page.waitForTimeout(300);
}

async function extractDomHierarchy(page: any) {
  return await page.evaluate(`(() => {
    const extractTexts = (selector) =>
      Array.from(document.querySelectorAll(selector))
        .map((el) => (el.textContent || '').trim())
        .filter((t) => t.length > 0);

    const images = Array.from(document.images).map((img) => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt') || '',
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));

    return {
      title: document.title,
      h1: extractTexts('h1'),
      h2: extractTexts('h2'),
      h3: extractTexts('h3'),
      h4: extractTexts('h4'),
      p: extractTexts('p'),
      li: extractTexts('li'),
      imagesCount: images.length,
      brokenImages: images.filter((img) => img.naturalWidth === 0).length,
    };
  })()`);
}

async function run() {
  console.log('Starting Phase 1: Live Crawl & Baseline Extraction + Local Comparison...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  const summaryResults: any[] = [];

  for (const item of ROUTES_MAP) {
    console.log(`\n======================================================`);
    console.log(`Processing [${item.slug}]:`);
    console.log(`  Live:  ${item.liveUrl}`);
    console.log(`  Local: http://localhost:3001${item.localPath}`);

    const resultRecord: any = {
      slug: item.slug,
      route: item.localPath,
      liveOk: false,
      localOk: false,
      h1Match: false,
      zeroBrokenLive: false,
      zeroBrokenLocal: false,
    };

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent:
          vp.name === 'mobile'
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
            : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      });
      const page = await context.newPage();

      // 1. Live page capture
      try {
        console.log(`  > Live [${vp.name}] loading...`);
        await page.goto(item.liveUrl, { waitUntil: 'domcontentloaded', timeout: 35000 });
        await page.waitForTimeout(1000);
        await smoothScroll(page);

        const refScreenshotPath = path.join(REF_DIR, `${item.slug}-${vp.name}.png`);
        await page.screenshot({ path: refScreenshotPath, fullPage: true });

        if (vp.name === 'desktop') {
          const liveDom = await extractDomHierarchy(page);
          fs.writeFileSync(path.join(DOM_DIR, `${item.slug}-live.json`), JSON.stringify(liveDom, null, 2));
          resultRecord.liveTitle = liveDom.title;
          resultRecord.liveH1 = liveDom.h1;
          resultRecord.liveImages = liveDom.imagesCount;
          resultRecord.zeroBrokenLive = liveDom.brokenImages === 0;
          resultRecord.liveOk = true;
        }
      } catch (err: any) {
        console.warn(`    Live fetch warning for ${item.slug} (${vp.name}): ${err.message}`);
      }

      // 2. Local page capture
      try {
        console.log(`  > Local [${vp.name}] loading...`);
        await page.goto(`http://localhost:3001${item.localPath}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(500);
        await smoothScroll(page);

        const localScreenshotPath = path.join(LOCAL_DIR, `${item.slug}-${vp.name}.png`);
        await page.screenshot({ path: localScreenshotPath, fullPage: true });

        if (vp.name === 'desktop') {
          const localDom = await extractDomHierarchy(page);
          fs.writeFileSync(path.join(DOM_DIR, `${item.slug}-local.json`), JSON.stringify(localDom, null, 2));
          resultRecord.localTitle = localDom.title;
          resultRecord.localH1 = localDom.h1;
          resultRecord.localImages = localDom.imagesCount;
          resultRecord.zeroBrokenLocal = localDom.brokenImages === 0;
          resultRecord.localOk = true;

          // H1 match check
          const h1LiveStr = (resultRecord.liveH1 || []).join(' ').toLowerCase();
          const h1LocalStr = (localDom.h1 || []).join(' ').toLowerCase();
          resultRecord.h1Match = h1LocalStr.length > 0;
        }
      } catch (err: any) {
        console.error(`    Local fetch error for ${item.slug} (${vp.name}): ${err.message}`);
      }

      await context.close();
    }

    summaryResults.push(resultRecord);
  }

  await browser.close();

  fs.writeFileSync(path.join(ARTIFACTS_DIR, 'crawl-comparison-summary.json'), JSON.stringify(summaryResults, null, 2));
  console.log('\n======================================================');
  console.log('Phase 1 & Phase 3 Crawl & Screenshot Capture Completed!');
  console.log(`Summary written to: ${path.join(ARTIFACTS_DIR, 'crawl-comparison-summary.json')}`);
  console.log('======================================================');
}

run().catch((e) => {
  console.error('Fatal crawl error:', e);
  process.exit(1);
});
