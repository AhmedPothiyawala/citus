import { chromium } from 'playwright';
import path from 'path';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const artifactDir = '/Users/ahmedpothiyawala/.gemini/antigravity-ide/brain/63988614-6391-4a06-8bac-d1bad7618adb';

  console.log('Taking screenshot of live site...');
  const pageLive = await context.newPage();
  try {
    await pageLive.goto('https://citiuscomm.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    // wait a bit for rendering
    await pageLive.waitForTimeout(5000);
    await pageLive.screenshot({ path: path.join(artifactDir, 'live_home_top.png') });
    await pageLive.screenshot({ path: path.join(artifactDir, 'live_home_full.png'), fullPage: true });
    console.log('Saved live site screenshots!');
  } catch (e) {
    console.error('Failed to capture live site:', e);
  }

  console.log('Taking screenshot of local site...');
  const pageLocal = await context.newPage();
  try {
    await pageLocal.goto('http://localhost:3001/', { waitUntil: 'load', timeout: 15000 });
    await pageLocal.waitForTimeout(2000);
    await pageLocal.screenshot({ path: path.join(artifactDir, 'local_home_top.png') });
    await pageLocal.screenshot({ path: path.join(artifactDir, 'local_home_full.png'), fullPage: true });
    console.log('Saved local site screenshots!');
  } catch (e) {
    console.error('Failed to capture local site:', e);
  }

  await browser.close();
}

capture();
