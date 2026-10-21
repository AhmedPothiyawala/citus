import { expect, test, type Page } from '@playwright/test';

const ROUTES = [
  '/',
  '/company-profile/',
  '/why-us/',
  '/leadership/',
  '/partners/',
  '/products/',
  '/digital-services/',
  '/networking/',
  '/fttx/',
  '/server-storage/',
  '/data-center-cloud/',
  '/industry-applications/',
  '/security-solutions/',
  '/case-studies/',
  '/rakuten-mobile/',
  '/nepal-telecom/',
  '/net-broadband/',
  '/careers/',
  '/contact/',
];

const KNOWN_ROUTES = new Set(ROUTES.map((r) => r.replace(/\/$/, '') || '/'));

function watchPage(page: Page) {
  const problems: string[] = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') {
      const text = m.text();
      // Ignore favicon 404 or benign analytics if any
      if (!text.includes('favicon.ico')) {
        problems.push(`console error: ${text}`);
      }
    }
  });
  return problems;
}

async function smoothScrollDown(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 20));
    }
    window.scrollTo(0, 0);
  });
}

// 1. Desktop & Mobile viewports tests across ALL 19 routes
for (const vp of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test.describe(`${vp.name} (${vp.width}x${vp.height}) - All 19 Pages`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`${route} loads cleanly without errors or overflow`, async ({ page }) => {
        const problems = watchPage(page);
        await page.goto(route, { waitUntil: 'domcontentloaded' });

        // Verify H1 heading exists
        await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

        // Scroll to trigger lazy loading and bottom layout
        await smoothScrollDown(page);
        await page.waitForTimeout(100);

        // Check horizontal overflow (allow at most 1px rounding tolerance on high DPI)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        expect(overflow, `Horizontal overflow detected on ${route}`).toBeLessThanOrEqual(1);

        // Check for broken images
        const brokenImages = await page.evaluate(() =>
          Array.from(document.images)
            .filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
            .map((img) => img.getAttribute('src') || '')
        );
        expect(brokenImages, `Broken images found on ${route}`).toEqual([]);

        // SVG Audit: assert visible SVGs have valid non-zero bounding box dimensions
        const svgsWithoutBounds = await page.evaluate(() =>
          Array.from(document.querySelectorAll('svg')).filter((svg) => {
            const isVisible = !!(
              (svg as any).offsetWidth ||
              (svg as any).offsetHeight ||
              svg.getClientRects().length
            );
            if (!isVisible) return false;
            const rect = svg.getBoundingClientRect();
            return rect.width === 0 || rect.height === 0;
          }).length
        );
        expect(svgsWithoutBounds, `Zero-dimension SVGs found on ${route}`).toBe(0);

        // Text Node Integrity: assert zero 'undefined', 'null', or '[object Object]' text
        const badTextNodes = await page.evaluate(() => {
          const text = document.body.innerText || '';
          return (
            text.includes('[object Object]') ||
            text.includes('undefined') ||
            text.includes('NaN')
          );
        });
        expect(badTextNodes, `Corrupted text node detected on ${route}`).toBe(false);

        // Verify no console or unhandled page errors
        expect(problems).toEqual([]);
      });
    }
  });
}

// 2. Navigation & Dropdowns
test.describe('Header Navigation & Interactive Features', () => {
  test('desktop dropdown menu navigates to Company Profile', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // Hover on About Us and click Company Profile
    const aboutUsLink = page.getByRole('link', { name: 'About Us' }).first();
    await aboutUsLink.hover();
    const profileLink = page.getByRole('link', { name: 'Company Profile' }).first();
    await profileLink.click();

    await expect(page).toHaveURL(/\/company-profile/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Company Profile/i);
  });

  test('mobile hamburger menu toggles and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggleBtn = page.getByLabel('Toggle navigation menu');
    await toggleBtn.click();

    // Target the mobile drawer link specifically
    const partnersLink = page.locator('.lg\\:hidden').getByRole('link', { name: 'Partners' });
    await expect(partnersLink).toBeVisible();
    await partnersLink.click();

    await expect(page).toHaveURL(/\/partners/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Partners/i);
  });

  test('contact form submits successfully with interactive feedback', async ({ page }) => {
    await page.goto('/contact/');

    await page.getByPlaceholder('John Doe').fill('Enterprise Client');
    await page.getByPlaceholder('john@example.com').fill('client@enterprise.com');
    await page.getByPlaceholder('+91 XXXXX XXXXX').fill('+91 9988776655');
    await page.getByPlaceholder(/describe your network/i).fill('Need 100G edge router sizing.');

    await page.getByRole('button', { name: /Send Message/i }).click();
    await expect(page.getByText(/Message Sent Successfully!/i)).toBeVisible();
  });

  test('case studies chain navigation (Rakuten -> Nepal Telecom -> Net+)', async ({ page }) => {
    await page.goto('/case-studies/');
    await page.getByRole('link', { name: /Read Case Study/i }).first().click();

    await expect(page).toHaveURL(/\/rakuten-mobile/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Rakuten Mobile/i);

    // Click next post to Nepal Telecom
    await page.getByRole('link', { name: /Next Post/i }).click();
    await expect(page).toHaveURL(/\/nepal-telecom/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Nepal Telecom/i);

    // Click next post to Net+ Broadband
    await page.getByRole('link', { name: /Next Post/i }).click();
    await expect(page).toHaveURL(/\/net-broadband/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Net\+ Broadband/i);
  });

  test('every internal anchor link resolves to a known page', async ({ page }) => {
    const discoveredLinks = new Set<string>();

    for (const route of ['/', '/products/', '/partners/', '/contact/']) {
      await page.goto(route);
      const hrefs = await page.$$eval('a[href]', (els) =>
        els.map((a) => (a as HTMLAnchorElement).getAttribute('href') || '')
      );
      for (const h of hrefs) {
        if (h.startsWith('/') && !h.startsWith('/images/')) {
          const clean = h.split('#')[0].replace(/\/$/, '') || '/';
          discoveredLinks.add(clean);
        }
      }
    }

    const invalid = Array.from(discoveredLinks).filter((l) => !KNOWN_ROUTES.has(l));
    expect(invalid, 'Found invalid internal links').toEqual([]);
  });
});
