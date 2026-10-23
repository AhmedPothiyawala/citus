import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const ARTIFACTS_DIR = path.join(ROOT, 'artifacts');
const LIVE_SCREENSHOTS_DIR = path.join(ARTIFACTS_DIR, 'live-screenshots');
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const LIVE_SPEC_PATH = path.join(ARTIFACTS_DIR, 'live-spec.json');

fs.mkdirSync(LIVE_SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(IMAGES_DIR, { recursive: true });

const PAGES_TO_HARVEST = [
  { slug: 'home', url: 'https://citiuscomm.com/' },
  { slug: 'company-profile', url: 'https://citiuscomm.com/company-profile/' },
  { slug: 'why-us', url: 'https://citiuscomm.com/why-us/' },
  { slug: 'leadership', url: 'https://citiuscomm.com/leadership/' },
  { slug: 'partners', url: 'https://citiuscomm.com/partners/' },
  { slug: 'products', url: 'https://citiuscomm.com/products/' },
  { slug: 'digital-services', url: 'https://citiuscomm.com/digital-services/' },
  { slug: 'networking', url: 'https://citiuscomm.com/networking/' },
  { slug: 'fttx', url: 'https://citiuscomm.com/fttx/' },
  { slug: 'server-storage', url: 'https://citiuscomm.com/server-storage/' },
  { slug: 'data-center-cloud', url: 'https://citiuscomm.com/data-center-cloud/' },
  { slug: 'industry-applications', url: 'https://citiuscomm.com/industry-applications/' },
  { slug: 'security-solutions', url: 'https://citiuscomm.com/security-solutions/' },
  { slug: 'case-studies', url: 'https://citiuscomm.com/category/case-studies/' },
  { slug: 'rakuten-mobile', url: 'https://citiuscomm.com/rakuten-mobile/' },
  { slug: 'nepal-telecom', url: 'https://citiuscomm.com/nepal-telecom/' },
  { slug: 'net-broadband', url: 'https://citiuscomm.com/net-broadband/' },
  { slug: 'careers', url: 'https://citiuscomm.com/careers/' },
  { slug: 'contact', url: 'https://citiuscomm.com/contact/' },
];

function downloadFile(fileUrl, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return resolve(true);
    }
    const client = fileUrl.startsWith('https') ? https : http;
    const req = client.get(fileUrl, { timeout: 15000 }, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve(true));
        });
      } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, destPath).then(resolve);
      } else {
        resolve(false);
      }
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function gotoWithRetry(page, url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      return true;
    } catch (e) {
      console.warn(`    Attempt ${i + 1} failed for ${url}: ${e.message}`);
      if (i === maxRetries - 1) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

async function harvest() {
  console.log('===========================================================');
  console.log('PHASE 1: LIVE SITE HARVESTER (citiuscomm.com)');
  console.log('===========================================================');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let liveSpec = {
    harvestTimestamp: new Date().toISOString(),
    pages: {},
    globalTypography: {},
  };

  if (fs.existsSync(LIVE_SPEC_PATH)) {
    try {
      liveSpec = JSON.parse(fs.readFileSync(LIVE_SPEC_PATH, 'utf-8'));
    } catch {
      // ignore
    }
  }

  for (const item of PAGES_TO_HARVEST) {
    // If already harvested with sections and typography, skip
    if (liveSpec.pages[item.slug]?.sections?.length > 0 && liveSpec.pages[item.slug]?.typography?.h1) {
      console.log(`Skipping already harvested: [${item.slug}]`);
      continue;
    }

    console.log(`\nHarvesting [${item.slug}] -> ${item.url}`);
    const pageData = {
      slug: item.slug,
      url: item.url,
      desktop: {},
      mobile: {},
      sections: [],
      typography: {},
      images: [],
    };

    // 1. Desktop Pass (1440x900)
    const dContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    });
    const dPage = await dContext.newPage();

    try {
      await gotoWithRetry(dPage, item.url);
      await dPage.waitForTimeout(1500);

      // Scroll smoothly to trigger all lazy assets
      await dPage.evaluate(`(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 350) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      })()`);
      await dPage.waitForTimeout(1000);

      // Capture desktop screenshot
      const dShotPath = path.join(LIVE_SCREENSHOTS_DIR, `${item.slug}-desktop.png`);
      await dPage.screenshot({ path: dShotPath, fullPage: true });
      pageData.desktop.screenshot = path.relative(ROOT, dShotPath);

      // Extract DOM, text, images, and computed typography
      const extracted = await dPage.evaluate(`(() => {
        const getStyle = (el) => {
          if (!el) return null;
          const s = window.getComputedStyle(el);
          return {
            fontFamily: s.fontFamily,
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            lineHeight: s.lineHeight,
            letterSpacing: s.letterSpacing,
            textTransform: s.textTransform,
            color: s.color,
            backgroundColor: s.backgroundColor,
            backgroundImage: s.backgroundImage,
            padding: s.padding,
            borderRadius: s.borderRadius,
            boxShadow: s.boxShadow,
          };
        };

        const typography = {
          h1: getStyle(document.querySelector('h1')),
          h2: getStyle(document.querySelector('h2')),
          h3: getStyle(document.querySelector('h3')),
          h4: getStyle(document.querySelector('h4')),
          p: getStyle(document.querySelector('p')),
          body: getStyle(document.body),
          header: getStyle(document.querySelector('header') || document.querySelector('#header-outer')),
          topBar: getStyle(document.querySelector('#header-secondary-outer')),
          footer: getStyle(document.querySelector('#footer-outer')),
        };

        // Collect all images & CSS background images
        const imageUrls = [];
        document.querySelectorAll('img').forEach((img) => {
          const src = img.currentSrc || img.getAttribute('src');
          if (src && !src.startsWith('data:')) imageUrls.push(src);
          const srcset = img.getAttribute('srcset');
          if (srcset) {
            srcset.split(',').forEach((part) => {
              const u = part.trim().split(' ')[0];
              if (u && !u.startsWith('data:')) imageUrls.push(u);
            });
          }
        });

        // Search background images
        document.querySelectorAll('*').forEach((el) => {
          const bg = window.getComputedStyle(el).backgroundImage;
          if (bg && bg.startsWith('url(')) {
            const match = bg.match(/url\\(["']?([^"']+)["']?\\)/);
            if (match && match[1] && !match[1].startsWith('data:')) {
              imageUrls.push(match[1]);
            }
          }
        });

        // Collect structured text
        const extractTexts = (sel) =>
          Array.from(document.querySelectorAll(sel))
            .map((el) => (el.textContent || '').trim())
            .filter((t) => t.length > 0);

        const sections = Array.from(document.querySelectorAll('section, .wpb_row, .row')).map((sec, idx) => ({
          index: idx,
          className: sec.className,
          headings: Array.from(sec.querySelectorAll('h1, h2, h3, h4')).map((h) => ({
            tag: h.tagName.toLowerCase(),
            text: (h.textContent || '').trim(),
          })),
          paragraphs: Array.from(sec.querySelectorAll('p')).map((p) => (p.textContent || '').trim()).filter((t) => t.length > 0),
          listItems: Array.from(sec.querySelectorAll('li')).map((li) => (li.textContent || '').trim()).filter((t) => t.length > 0),
        })).filter((s) => s.headings.length > 0 || s.paragraphs.length > 0);

        return {
          title: document.title,
          typography,
          imageUrls: Array.from(new Set(imageUrls)),
          h1: extractTexts('h1'),
          h2: extractTexts('h2'),
          h3: extractTexts('h3'),
          h4: extractTexts('h4'),
          p: extractTexts('p'),
          li: extractTexts('li'),
          sections,
        };
      })()`);

      pageData.title = extracted.title;
      pageData.typography = extracted.typography;
      pageData.sections = extracted.sections;
      pageData.h1 = extracted.h1;
      pageData.h2 = extracted.h2;
      pageData.h3 = extracted.h3;
      pageData.p = extracted.p;
      pageData.li = extracted.li;
      pageData.imageUrls = extracted.imageUrls;

      // Download any discovered images into public/images
      console.log(`  Discovered ${extracted.imageUrls.length} images on ${item.slug}`);
      for (const imgUrl of extracted.imageUrls) {
        try {
          const urlObj = new URL(imgUrl, item.url);
          const filename = path.basename(urlObj.pathname);
          if (filename && filename.match(/\\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
            const dest = path.join(IMAGES_DIR, filename);
            if (!fs.existsSync(dest) || fs.statSync(dest).size === 0) {
              const ok = await downloadFile(urlObj.toString(), dest);
              if (ok) console.log(`    Downloaded: ${filename}`);
            }
          }
        } catch {
          // ignore invalid URLs
        }
      }
    } catch (err) {
      console.error(`  Error harvesting desktop [${item.slug}]:`, err.message);
    }
    await dContext.close();

    // 2. Mobile Pass (390x844)
    const mContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    });
    const mPage = await mContext.newPage();
    try {
      await gotoWithRetry(mPage, item.url);
      await mPage.waitForTimeout(1000);
      await mPage.evaluate(`(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 350) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      })()`);
      await mPage.waitForTimeout(500);

      const mShotPath = path.join(LIVE_SCREENSHOTS_DIR, `${item.slug}-mobile.png`);
      await mPage.screenshot({ path: mShotPath, fullPage: true });
      pageData.mobile.screenshot = path.relative(ROOT, mShotPath);
    } catch (err) {
      console.error(`  Error harvesting mobile [${item.slug}]:`, err.message);
    }
    await mContext.close();

    liveSpec.pages[item.slug] = pageData;
    fs.writeFileSync(LIVE_SPEC_PATH, JSON.stringify(liveSpec, null, 2));
  }

  await browser.close();

  // Extract common global typography
  if (liveSpec.pages.home && liveSpec.pages.home.typography) {
    liveSpec.globalTypography = liveSpec.pages.home.typography;
  }

  fs.writeFileSync(LIVE_SPEC_PATH, JSON.stringify(liveSpec, null, 2));
  console.log('\n===========================================================');
  console.log(`[SUCCESS] Phase 1 completed! live-spec.json generated at:`);
  console.log(`  ${LIVE_SPEC_PATH}`);
  console.log(`Total images in public/images/: ${fs.readdirSync(IMAGES_DIR).length}`);
  console.log('===========================================================');
}

harvest().catch((err) => {
  console.error('Fatal harvest error:', err);
  process.exit(1);
});
