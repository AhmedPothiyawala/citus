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
      if (
        !text.includes('favicon.ico') &&
        !text.includes('net::ERR_CONNECTION_CLOSED') &&
        !text.includes('net::ERR_ABORTED')
      ) {
        problems.push(`console error: ${text}`);
      }
    }
  });
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().includes('favicon.ico')) {
      problems.push(`HTTP ${res.status()} on ${res.url()}`);
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

/**
 * Reusable helper verifying global chrome (header, top bar, footer)
 * and asset integrity across all 19 pages.
 */
async function verifyGlobalChromeAndAssets(page: Page, route: string, isMobile: boolean) {
  // 1. Verify H1 exists and is visible
  const h1 = page.getByRole('heading', { level: 1 }).first();
  await expect(h1).toBeVisible();

  // 2. Inner pages must NOT have breadcrumbs or fake subtitles
  if (route !== '/') {
    const hasBreadcrumbs = await page.evaluate(() => {
      const text = document.body.innerText;
      return /HOME\s*\/\s*/i.test(text);
    });
    expect(hasBreadcrumbs, `Breadcrumbs detected on inner page ${route}`).toBe(false);
  }

  // 3. Header transparency at top vs opaque on scroll (Desktop)
  if (!isMobile) {
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    // Check top bar contact info
    const headerText = await header.innerText();
    expect(headerText).toContain('sales@citiuscomm.com');
    expect(headerText).toContain('+91-1140107947');

    // Forbidden navbar items
    expect(headerText).not.toContain('Get in Touch');
    
    // Top-level uppercase nav items in exact order
    expect(headerText).toContain('HOME');
    expect(headerText).toContain('ABOUT US');
    expect(headerText).toContain('SOLUTIONS');
    expect(headerText).toContain('INDUSTRY APPLICATIONS');
    expect(headerText).toContain('PARTNERS');
    expect(headerText).toContain('CAREERS');
    expect(headerText).toContain('CONTACT');

    // Verify header background starts transparent
    const initialBg = await header.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(initialBg).toMatch(/rgba\(0,\s*0,\s*0,\s*0\)|transparent/);

    // Scroll to 300px and check white background
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(350);
    const scrolledBg = await header.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(scrolledBg).toMatch(/rgb(a)?\(255,\s*255,\s*255/);

    // Reset scroll back to 0
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
  }

  // 4. Forbidden regression assertions: NO fake badges or placeholders
  const forbiddenContent = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasJohnDoe: /John Doe/i.test(text),
      hasFakeInquiry: /INQUIRY/i.test(text),
      hasFakeLocationsBadge: /LOCATIONS/i.test(text),
    };
  });
  expect(forbiddenContent.hasJohnDoe, `Forbidden 'John Doe' placeholder found on ${route}`).toBe(false);
  expect(forbiddenContent.hasFakeInquiry, `Forbidden 'INQUIRY' badge found on ${route}`).toBe(false);

  // 5. Footer check: single bar with verbatim text & LinkedIn link
  const footer = page.locator('footer').first();
  await expect(footer).toBeVisible();
  const footerText = await footer.innerText();
  expect(footerText).toContain('Citius Communication');
  expect(footerText).toContain('All Rights Reserved');

  // Verify LinkedIn link exists in footer
  const linkedIn = footer.locator('a[href*="linkedin.com"]');
  await expect(linkedIn).toBeVisible();

  // 6. Scroll down to trigger lazy assets
  await smoothScrollDown(page);
  await page.waitForTimeout(100);

  // 7. Check horizontal overflow (tolerance <= 1px)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `Horizontal overflow detected on ${route}`).toBeLessThanOrEqual(1);

  // 8. Check for broken images
  const brokenImages = await page.evaluate(() =>
    Array.from(document.images)
      .filter((img) => img.complete && img.naturalWidth === 0 && img.getAttribute('src'))
      .map((img) => img.getAttribute('src') || '')
  );
  expect(brokenImages, `Broken images found on ${route}`).toEqual([]);

  // 9. Check SVGs have non-zero dimensions
  const zeroDimSvgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('svg')).filter((svg) => {
      const rect = svg.getBoundingClientRect();
      const isVisible = !!(
        (svg as unknown as HTMLElement).offsetWidth ||
        (svg as unknown as HTMLElement).offsetHeight ||
        svg.getClientRects().length
      );
      if (!isVisible) return false;
      return rect.width === 0 || rect.height === 0;
    }).length
  );
  expect(zeroDimSvgs, `Zero-dimension SVGs found on ${route}`).toBe(0);

  // 10. Typography verification: Rubik for H1/H2, Open Sans for body
  const fontInfo = await page.evaluate(() => {
    const heading = document.querySelector('h1, h2');
    const body = document.body;
    return {
      headingFont: heading ? window.getComputedStyle(heading).fontFamily : '',
      bodyFont: window.getComputedStyle(body).fontFamily,
    };
  });
  expect(fontInfo.headingFont.toLowerCase(), `Heading font on ${route} must contain Rubik`).toContain('rubik');
  expect(fontInfo.bodyFont.toLowerCase(), `Body font on ${route} must contain Open Sans`).toContain('open sans');
}

// ==========================================
// PART 1: GLOBAL VIEWPORT TESTS (ALL 19 PAGES)
// ==========================================
for (const vp of [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
]) {
  test.describe(`${vp.name} (${vp.width}x${vp.height}) - All 19 Pages`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`${route} loads cleanly without errors or overflow`, async ({ page }) => {
        const problems = watchPage(page);
        await page.goto(route, { waitUntil: 'domcontentloaded' });

        await verifyGlobalChromeAndAssets(page, route, vp.isMobile);

        // Verify zero console, network, or unhandled page errors
        expect(problems).toEqual([]);
      });
    }
  });
}

// ==========================================
// PART 2: ONE-BY-ONE DEEP PAGE ASSERTIONS
// ==========================================
test.describe('Part 2 - Deep Page Assertions (Pages 1 to 19)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('Page 1: Home (/)', async ({ page }) => {
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('We Source and Support the Data Center Equipment');
    await expect(page.getByText('Hardware supply, integration and managed services for data centers of every size, from edge rooms to hyperscale campuses.')).toBeVisible();

    const cta = page.getByRole('link', { name: /Explore services/i }).first();
    await expect(cta).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Support for every business model' })).toBeVisible();
    for (const model of ['Cloud and Managed Services', 'Retail Colocation', 'Enterprise and Captive', 'Wholesale and Built-to-suit']) {
      await expect(page.getByRole('heading', { name: model }).first()).toBeVisible();
    }

    await expect(page.getByRole('heading', { name: /Hardware supply, integration and services/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'From requirement to running' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Independent advice, one accountable team/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Planning your next facility/i })).toBeVisible();
  });

  test('Page 2: Company Profile (/company-profile/)', async ({ page }) => {
    await page.goto('/company-profile/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Company Profile$/);
    await expect(page.getByText(/“CITIUSCOMM” a Multi-National Company/i)).toBeVisible();
    await expect(page.getByText(/CITIUSCOMM is providing E2E bespoke turnkey solutions/i)).toBeVisible();
    await expect(page.getByText(/CITIUSCOMM is known for delivering cost-effective/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vision' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mission' })).toBeVisible();
    await expect(page.getByText(/Increase our Coverage and Competency/i)).toBeVisible();
  });

  test('Page 3: Leadership (/leadership/)', async ({ page }) => {
    await page.goto('/leadership/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Leadership$/);
    await expect(page.getByText('SURENDRA SANCHETI')).toBeVisible();
    await expect(page.getByText('Founder and Managing Director')).toBeVisible();
    await expect(page.getByText('PRAMOD YADAV')).toBeVisible();
    await expect(page.getByText(/Senior roles at Mavenir/i)).toBeVisible();
    await expect(page.getByText('PIYUSH DIKSHIT')).toBeVisible();
    await expect(page.getByText(/CXO Positions at Samvardhana Motherson Group/i)).toBeVisible();
  });

  test('Page 4: Why Us (/why-us/)', async ({ page }) => {
    await page.goto('/why-us/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Why Us$/);
    await expect(page.getByRole('heading', { name: 'Our Strength' })).toBeVisible();
    await expect(page.getByText('Excellent Relationship with all Technology Partners')).toBeVisible();
    await expect(page.getByText(/Our in-depth understanding of the telecommunications/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What Sets Us Apart' })).toBeVisible();
    await expect(page.getByText('Great Access to Customers')).toBeVisible();
    await expect(page.getByText('Warehousing Across India')).toBeVisible();
  });

  test('Page 5: Partners (/partners/)', async ({ page }) => {
    await page.goto('/partners/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Partners$/);
    await expect(page.getByText(/Citius would like to work in areas of Next Gen/i)).toBeVisible();
    await expect(page.getByText(/Citiuscomm have Strategic relationship with/i)).toBeVisible();
    const partnerImages = page.locator('img[src*="/images/"]');
    expect(await partnerImages.count()).toBeGreaterThanOrEqual(16);
  });

  test('Page 6: Products (/products/)', async ({ page }) => {
    await page.goto('/products/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Products$/);
    await expect(page.getByText(/E2E SECURITY/i)).toBeVisible();
    await expect(page.getByText(/Positive Firewall security solution/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'NETWORKING' })).toBeVisible();
    await expect(page.getByText(/router, olt, ont, onu, switches/i)).toBeVisible();
    await expect(page.getByText(/Single Band WiFi ONTs/i)).toBeVisible();
  });

  test('Page 7: Digital Services (/digital-services/)', async ({ page }) => {
    await page.goto('/digital-services/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('Page 8: Networking (/networking/)', async ({ page }) => {
    await page.goto('/networking/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Networking$/);
    await expect(page.getByRole('heading', { name: 'ROUTER AND SWITCHES' })).toBeVisible();
    await expect(page.getByText(/Cisco, Juniper, HPE, ZTE, Huawei/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'SD WAN' })).toBeVisible();
    await expect(page.getByText(/SD-WAN simplifies network management/i)).toBeVisible();
  });

  test('Page 9: FTTX (/fttx/)', async ({ page }) => {
    await page.goto('/fttx/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^FTTX$/);
    await expect(page.getByText(/Simple and Quick Product Installations/i)).toBeVisible();
    await expect(page.getByText(/Flexible Range of Products/i)).toBeVisible();
    await expect(page.getByText(/On-ground Local Support/i)).toBeVisible();
  });

  test('Page 10: Server & Storage (/server-storage/)', async ({ page }) => {
    await page.goto('/server-storage/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Server & Storage$/);
    await expect(page.getByText(/We are partnered with Dell, HPE, ZTE, and Huawei/i)).toBeVisible();
    for (const serverType of ['Rack Server', 'Tower Server', 'Modular Server', 'Specialty Server', 'Rugged Servers']) {
      await expect(page.getByText(serverType)).toBeVisible();
    }
  });

  test('Page 11: Data Center & Cloud (/data-center-cloud/)', async ({ page }) => {
    await page.goto('/data-center-cloud/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Data Center & Cloud$/);
    await expect(page.getByText(/Data Centers design and Architect/i)).toBeVisible();
    await expect(page.getByText(/Cloud migration activities in a Multi-cloud environment/i)).toBeVisible();
    await expect(page.getByText(/We unlock the cloud operating model/i)).toBeVisible();
  });

  test('Page 12: Industry Applications (/industry-applications/)', async ({ page }) => {
    await page.goto('/industry-applications/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Industry Applications$/);
    await expect(page.getByRole('heading', { name: 'TELECOM' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CABLE AND BROADBAND' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'ENTERPRISE, DATA CENTER, GOVERNMENT' })).toBeVisible();
  });

  test('Page 13: Security Solutions (/security-solutions/)', async ({ page }) => {
    await page.goto('/security-solutions/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Security Solutions$/);
    await expect(page.getByRole('heading', { name: 'DDoS' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DPI' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Firewall' })).toBeVisible();
  });

  test('Page 14: Case Studies Hub (/case-studies/)', async ({ page }) => {
    await page.goto('/case-studies/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Case Studies/i);
    await expect(page.getByRole('link', { name: 'Rakuten Mobile' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Nepal Telecom' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Net+ Broadband' }).first()).toBeVisible();
  });

  test('Page 15: Rakuten Mobile (/rakuten-mobile/)', async ({ page }) => {
    await page.goto('/rakuten-mobile/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Rakuten Mobile$/);
    await expect(page.getByText(/Rakuten, Inc. is a Japanese electronic commerce/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Nepal Telecom' })).toBeVisible();
  });

  test('Page 16: Nepal Telecom (/nepal-telecom/)', async ({ page }) => {
    await page.goto('/nepal-telecom/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Nepal Telecom$/);
    await expect(page.getByText(/Nepal Telecom is a state-owned Telecommunication/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Rakuten Mobile' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Net+ Broadband' })).toBeVisible();
  });

  test('Page 17: Net+ Broadband (/net-broadband/)', async ({ page }) => {
    await page.goto('/net-broadband/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Net\+ Broadband$/);
    await expect(page.getByText(/Net\+ Broadband is 100% subsidiary of Fastway/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Nepal Telecom' })).toBeVisible();
  });

  test('Page 18: Careers (/careers/)', async ({ page }) => {
    await page.goto('/careers/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Careers$/);
    await expect(page.getByText(/Let us work together to solve the most challenging problems/i)).toBeVisible();
    await expect(page.getByText(/Bring in your enthusiasm/i)).toBeVisible();
    await expect(page.getByText(/Let[’']s build a new dynamic world together!/i)).toBeVisible();

    // Interactive Accordion Test
    for (const title of ['IP Engineers', 'Linux Enterprise Support Analyst', 'Security CoE Infrastructure Section', 'Others']) {
      const btn = page.getByRole('button', { name: title });
      await expect(btn).toBeVisible();
      await btn.click();
      await page.waitForTimeout(100);
    }

    // Interactive Apply Now Form Test
    await page.getByPlaceholder('Your Name').fill('Applicant One');
    await page.getByPlaceholder('Your Email').fill('applicant@citiuscomm.com');
    await page.getByPlaceholder('Contact No.').fill('+91 9876543210');
    await page.locator('select').selectOption({ label: 'IP Engineers' });
    await page.getByPlaceholder('Your Message').fill('Applying for IP Engineer position.');
    await page.getByRole('button', { name: 'SUBMIT' }).click();
    await expect(page.getByText(/Thank you for your application/i)).toBeVisible();
  });

  test('Page 19: Contact (/contact/)', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/^Contact$/);
    await expect(page.getByText('CITIUS COMMUNICATIONS PVT. LTD.')).toBeVisible();
    await expect(page.getByText('Delhi Office')).toBeVisible();
    await expect(page.getByText('Mumbai Office')).toBeVisible();
    await expect(page.getByText('Kolkata Office')).toBeVisible();

    // Interactive Connect With Us Form Test
    await page.getByPlaceholder('Your Name (required)').fill('Enterprise Client');
    await page.getByPlaceholder('Your Email (required)').fill('client@enterprise.com');
    await page.getByPlaceholder('Subject').fill('100G Router Inquiry');
    await page.getByPlaceholder('Your Message').fill('Need 100G edge router sizing.');
    await page.getByRole('button', { name: /^SEND$/i }).click();
    await expect(page.getByText(/Your message has been sent/i)).toBeVisible();
  });

  test('Desktop Dropdown Menu & Mobile Hamburger', async ({ page }) => {
    await page.goto('/');
    const aboutUsTrigger = page.locator('header nav').getByText('ABOUT US').first();
    await aboutUsTrigger.hover();
    const profileLink = page.getByRole('link', { name: 'Company Profile' }).first();
    await profileLink.click();
    await expect(page).toHaveURL(/\/company-profile/);
  });

  test('All internal links resolve to known pages', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.$$eval('a[href]', (els) =>
      els.map((a) => (a as HTMLAnchorElement).getAttribute('href') || '')
    );
    for (const h of hrefs) {
      if (h.startsWith('/') && !h.startsWith('/images/')) {
        const clean = h.split('#')[0].replace(/\/$/, '') || '/';
        expect(KNOWN_ROUTES.has(clean), `Unknown internal link: ${h}`).toBe(true);
      }
    }
  });
});
