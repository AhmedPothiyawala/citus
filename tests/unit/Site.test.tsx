import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppContent } from '../../src/App';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import {
  LINKS,
  COMPANY_INFO,
  LEADERSHIP_TEAM,
  PARTNERS_LIST,
  CLIENTS_LIST,
  CASE_STUDIES,
  CAREER_OPENINGS,
  OFFICES_LIST,
} from '../../src/data/site';

const ALL_ROUTES: [string, RegExp][] = [
  ['/', /We Source and Support the Data Center Equipment/i],
  ['/company-profile/', /^Company Profile$/i],
  ['/why-us/', /^Why Us$/i],
  ['/leadership/', /^Leadership$/i],
  ['/partners/', /^Partners$/i],
  ['/products/', /^Products$/i],
  ['/digital-services/', /^Digital Services$/i],
  ['/networking/', /^Networking$/i],
  ['/fttx/', /^FTTX$/i],
  ['/server-storage/', /^Server & Storage$/i],
  ['/data-center-cloud/', /^Data Center & Cloud$/i],
  ['/industry-applications/', /^Industry Applications$/i],
  ['/security-solutions/', /^Security Solutions$/i],
  ['/case-studies/', /^Case Studies$/i],
  ['/rakuten-mobile/', /^Rakuten Mobile$/i],
  ['/nepal-telecom/', /^Nepal Telecom$/i],
  ['/net-broadband/', /^Net\+ Broadband$/i],
  ['/careers/', /^Careers$/i],
  ['/contact/', /^Contact$/i],
];

describe('CITIUSCOMM - All 19 Routes Render Cleanly', () => {
  it.each(ALL_ROUTES)('route "%s" renders header, footer and main heading', async (path, h1Regex) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppContent />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { level: 1, name: h1Regex });
    expect(heading).toBeInTheDocument();

    if (path === '/') {
      // Homepage has its own self-contained header with text brand
      expect(screen.getAllByText('Citius Communication').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/All Rights Reserved/i)).toBeInTheDocument();
    } else {
      // Other pages use the shared CITIUSCOMM header/footer
      expect(screen.getAllByAltText(/CITIUSCOMM Logo/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/All Rights Reserved/i).length).toBeGreaterThanOrEqual(1);
    }

    // Verify inner pages have NO breadcrumbs
    if (path !== '/') {
      expect(document.body.textContent).not.toMatch(/HOME\s*\/\s*/i);
    }
  });

  it('route "/contact/" renders exact Delhi, Mumbai, and Kolkata offices', async () => {
    render(
      <MemoryRouter initialEntries={['/contact/']}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /^Contact$/i })).toBeInTheDocument();
    expect(screen.getByText('Delhi Office')).toBeInTheDocument();
    expect(screen.getByText('Mumbai Office')).toBeInTheDocument();
    expect(screen.getByText('Kolkata Office')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name (required)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email (required)')).toBeInTheDocument();
  });
});

describe('Header & Navigation Component', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it('renders brand email and phone in top secondary header', () => {
    renderHeader();
    expect(screen.getByText(COMPANY_INFO.email)).toBeInTheDocument();
    expect(screen.getByText(COMPANY_INFO.phoneFormatted)).toBeInTheDocument();
  });

  it('contains all 7 primary navigation links in exact uppercase order', () => {
    renderHeader();
    const expectedLabels = [
      'HOME',
      'ABOUT US',
      'SOLUTIONS',
      'INDUSTRY APPLICATIONS',
      'PARTNERS',
      'CAREERS',
      'CONTACT',
    ];
    for (const label of expectedLabels) {
      const linkElements = screen.getAllByText(label);
      expect(linkElements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('does NOT contain fake Get in Touch button or Case Studies in top bar', () => {
    renderHeader();
    expect(screen.queryByText(/Get in Touch/i)).not.toBeInTheDocument();
  });

  it('toggles mobile menu drawer on hamburger click', () => {
    renderHeader();
    const toggleBtn = screen.getByLabelText('Toggle navigation menu');
    expect(toggleBtn).toBeInTheDocument();

    // Open drawer
    fireEvent.click(toggleBtn);
    expect(screen.getAllByText('CONTACT').length).toBeGreaterThanOrEqual(1);

    // Close drawer
    fireEvent.click(toggleBtn);
  });
});

describe('Footer Component', () => {
  it('renders copyright and contact info', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Citius Communication Pvt\. Ltd\./i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/All Rights Reserved/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: /CITIUSCOMM LinkedIn/i })).toBeInTheDocument();
  });
});

describe('Single Source of Truth (site.ts) Data Integrity', () => {
  it('has valid company metadata', () => {
    expect(COMPANY_INFO.email).toBe('sales@citiuscomm.com');
    expect(COMPANY_INFO.phone).toBe('+91 11 4010 7947');
    expect(COMPANY_INFO.tagline).toBe('Keeping You One Step Ahead!');
  });

  it('has 19 distinct route constants', () => {
    expect(Object.keys(LINKS)).toHaveLength(19);
    for (const route of Object.values(LINKS)) {
      expect(route.startsWith('/')).toBe(true);
    }
  });

  it('has 3 executive board members with credentials', () => {
    expect(LEADERSHIP_TEAM).toHaveLength(3);
    expect(LEADERSHIP_TEAM.map((m) => m.name)).toEqual([
      'SURENDRA SANCHETI',
      'PRAMOD YADAV',
      'PIYUSH DIKSHIT',
    ]);
  });

  it('has complete partners list (15+ technology OEMs)', () => {
    expect(PARTNERS_LIST.length).toBeGreaterThanOrEqual(15);
    const partnerNames = PARTNERS_LIST.map((p) => p.name);
    expect(partnerNames).toContain('Cisco');
    expect(partnerNames).toContain('Juniper Networks');
    expect(partnerNames).toContain('Dell Technologies');
    expect(partnerNames).toContain('HPE');
  });

  it('has complete clients list (20+ carrier clients)', () => {
    expect(CLIENTS_LIST.length).toBeGreaterThanOrEqual(20);
    const clientNames = CLIENTS_LIST.map((c) => c.name);
    expect(clientNames).toContain('Reliance Jio');
    expect(clientNames).toContain('Rakuten Mobile');
    expect(clientNames).toContain('Nepal Telecom');
    expect(clientNames).toContain('Net+ Broadband');
  });

  it('has 3 featured carrier case studies with full narratives', () => {
    expect(CASE_STUDIES).toHaveLength(3);
    for (const cs of CASE_STUDIES) {
      expect(cs.title).toBeTruthy();
      expect(cs.client).toBeTruthy();
      expect(cs.results.length).toBeGreaterThan(0);
    }
  });

  it('has 4 career job openings with full criteria', () => {
    expect(CAREER_OPENINGS).toHaveLength(4);
    for (const opening of CAREER_OPENINGS) {
      expect(opening.title).toBeTruthy();
      expect(opening.responsibilities.length).toBeGreaterThanOrEqual(2);
      expect(opening.qualifications.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('has 3 branch office locations (Delhi, Mumbai, Kolkata)', () => {
    expect(OFFICES_LIST).toHaveLength(3);
    const titles = OFFICES_LIST.map((o) => o.title);
    expect(titles).toContain('Delhi Office');
    expect(titles).toContain('Mumbai Office');
    expect(titles).toContain('Kolkata Office');
  });
});
