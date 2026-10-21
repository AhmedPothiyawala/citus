import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, afterEach } from 'vitest';
import { AppContent } from '../../src/App';

const ALL_19_ROUTES: [string, RegExp][] = [
  ['/', /Keeping You One Step Ahead!/i],
  ['/company-profile/', /Company Profile/i],
  ['/why-us/', /Why Us/i],
  ['/leadership/', /Leadership/i],
  ['/partners/', /Partners/i],
  ['/products/', /Products & Solutions/i],
  ['/digital-services/', /Digital Services/i],
  ['/networking/', /Networking & SD-WAN/i],
  ['/fttx/', /FTTX/i],
  ['/server-storage/', /Server & Storage/i],
  ['/data-center-cloud/', /Data Center & Cloud/i],
  ['/industry-applications/', /Industry Applications/i],
  ['/security-solutions/', /Security Solutions/i],
  ['/case-studies/', /Case Studies/i],
  ['/rakuten-mobile/', /Rakuten Mobile/i],
  ['/nepal-telecom/', /Nepal Telecom/i],
  ['/net-broadband/', /Net\+ Broadband/i],
  ['/careers/', /Careers/i],
  ['/contact/', /Contact Us/i],
];

describe('CITIUSCOMM - 100+ Times Stress & Sanity Test per Page', () => {
  afterEach(() => {
    cleanup();
  });

  for (const [route, h1Pattern] of ALL_19_ROUTES) {
    it(`stress test: page "${route}" tested 100 consecutive times without errors`, () => {
      for (let iteration = 1; iteration <= 100; iteration++) {
        const { unmount, container } = render(
          <MemoryRouter initialEntries={[route]}>
            <AppContent />
          </MemoryRouter>
        );

        // 1. Sanity check: H1 heading
        const heading = screen.getByRole('heading', { level: 1, name: h1Pattern });
        expect(heading).toBeInTheDocument();

        // 2. Sanity check: Header logo
        const logos = screen.getAllByAltText(/CITIUSCOMM Logo/i);
        expect(logos.length).toBeGreaterThanOrEqual(1);

        // 3. Sanity check: Footer copyright
        expect(screen.getByText(/developed by/i)).toBeInTheDocument();

        // 4. Sanity check: Zero broken image references
        const images = container.querySelectorAll('img');
        for (const img of Array.from(images)) {
          const src = img.getAttribute('src');
          expect(src).toBeTruthy();
          expect(src?.startsWith('/images/') || src?.startsWith('data:')).toBe(true);
        }

        // Clean up DOM between iterations
        unmount();
        cleanup();
      }
    });
  }
});
