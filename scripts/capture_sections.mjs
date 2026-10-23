import { chromium } from 'playwright';
import path from 'path';

async function captureSections() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const artifactDir = '/Users/ahmedpothiyawala/.gemini/antigravity-ide/brain/63988614-6391-4a06-8bac-d1bad7618adb';

  const scrollPositions = [
    { name: 'section_about', y: 700 },
    { name: 'section_solutions', y: 1550 },
    { name: 'section_verticals', y: 2350 },
    { name: 'section_clients', y: 3150 },
    { name: 'section_case_studies', y: 3850 },
    { name: 'section_footer', y: 4600 }
  ];

  console.log('Capturing live sections...');
  const pageLive = await context.newPage();
  try {
    await pageLive.goto('https://citiuscomm.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pageLive.waitForTimeout(4000);
    for (const pos of scrollPositions) {
      await pageLive.evaluate((y) => window.scrollTo(0, y), pos.y);
      await pageLive.waitForTimeout(500);
      await pageLive.screenshot({ path: path.join(artifactDir, `live_${pos.name}.png`) });
    }
  } catch (e) {
    console.error('Live capture error:', e);
  }

  console.log('Capturing local sections...');
  const pageLocal = await context.newPage();
  try {
    await pageLocal.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    await pageLocal.waitForTimeout(2000);
    for (const pos of scrollPositions) {
      await pageLocal.evaluate((y) => window.scrollTo(0, y), pos.y);
      await pageLocal.waitForTimeout(500);
      await pageLocal.screenshot({ path: path.join(artifactDir, `local_${pos.name}.png`) });
    }
  } catch (e) {
    console.error('Local capture error:', e);
  }

  await browser.close();
  console.log('All sections captured!');
}

captureSections();
