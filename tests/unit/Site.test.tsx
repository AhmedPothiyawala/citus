import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppContent } from '../../src/App';
import { Header } from '../../src/components/Header';
import { Footer } from '../../src/components/Footer';
import { ContactForm, CareerForm } from '../../src/components/Widgets';
import {
  LINKS,
  COMPANY_INFO,
  MAIN_NAV,
  LEADERSHIP_TEAM,
  PARTNERS_LIST,
  CLIENTS_LIST,
  CASE_STUDIES,
  CAREER_OPENINGS,
  OFFICES_LIST,
} from '../../src/data/site';

const ALL_ROUTES: [string, RegExp][] = [
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

describe('CITIUSCOMM - All 19 Routes Render Cleanly', () => {
  it.each(ALL_ROUTES)('route "%s" renders header, footer and main heading', async (path, h1Regex) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppContent />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { level: 1, name: h1Regex });
    expect(heading).toBeInTheDocument();

    // Verify presence of header elements
    expect(screen.getAllByAltText(/CITIUSCOMM Logo/i).length).toBeGreaterThanOrEqual(1);
    // Verify presence of footer text
    expect(screen.getByText(/developed by/i)).toBeInTheDocument();
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
    expect(screen.getByText(COMPANY_INFO.phone)).toBeInTheDocument();
  });

  it('contains all primary navigation links', () => {
    renderHeader();
    for (const item of MAIN_NAV) {
      const linkElements = screen.getAllByText(item.label);
      expect(linkElements.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('toggles mobile menu drawer on hamburger click', () => {
    renderHeader();
    const toggleBtn = screen.getByLabelText('Toggle navigation menu');
    expect(toggleBtn).toBeInTheDocument();

    // Open drawer
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    // Close drawer
    fireEvent.click(toggleBtn);
  });
});

describe('Footer Component', () => {
  it('renders all three branch office locations and copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Head Office/i)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai & Kolkata/i)).toBeInTheDocument();
    expect(screen.getByText(/2026 CITIUSCOMM/i)).toBeInTheDocument();
    expect(screen.getByText(/WebGyor Technologies/i)).toBeInTheDocument();
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

describe('Interactive Forms Validation & Submission', () => {
  it('submits ContactForm and displays success message', async () => {
    render(
      <MemoryRouter>
        <ContactForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('john@example.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/describe your network/i), {
      target: { value: 'Inquiring about 100G routing and DWDM' },
    });

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    const successMsg = await screen.findByText(/Message Sent Successfully!/i);
    expect(successMsg).toBeInTheDocument();
  });

  it('submits CareerForm and displays success state', async () => {
    render(
      <MemoryRouter>
        <CareerForm initialPosition="IP Engineers" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Jane Doe'), {
      target: { value: 'Applicant Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('jane@example.com'), {
      target: { value: 'applicant@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('+91 XXXXX XXXXX'), {
      target: { value: '+91 9876543210' },
    });

    const submitBtn = screen.getByRole('button', { name: /Apply Now/i });
    fireEvent.click(submitBtn);

    const successMsg = await screen.findByText(/Application Received!/i);
    expect(successMsg).toBeInTheDocument();
  });
});
