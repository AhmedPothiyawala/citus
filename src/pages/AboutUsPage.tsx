import React from 'react';
import { LINKS } from '../data/site';
import { Bullets, Card, Container, Eyebrow, OutlineButton, PageSection, PlanningCta, SectionTitle } from '../components/ui';

const HARDWARE = [
  'Network: switching, routing, optical, cabling',
  'Compute and storage: servers, storage, HCI',
  'Security: firewalls, SIEM, access, encryption',
  'Racks and passive: racks, PDUs, patching, test tools',
  'DCIM and analytics dashboards',
];
const SERVICES = [
  'Design and sizing support',
  'Multi-OEM sourcing and supply planning',
  'Integration and commissioning',
  'Turnkey program management',
  'Managed NOC, SOC and remote hands',
  'Lifecycle support and refresh',
];
const WHY = [
  { title: 'Multi-OEM Sourcing', desc: 'Equipment from several vendors, chosen for the project and not for one brand.' },
  { title: 'One Point of Accountability', desc: 'One team from supply planning through integration and commissioning.' },
  { title: 'Turnkey Program Management', desc: 'Power, cooling and civil scope coordinated through specialist partners and managed by Citiuscomm.' },
];
const BUILDS = [
  { title: 'Greenfield Projects', desc: 'Sizing, sourcing and integration support for new facilities, from the first design.' },
  { title: 'Brownfield Upgrades', desc: 'Equipment sourcing, integration and lifecycle refresh for facilities that are already running.' },
];

const icon = (d: string) => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);
const MODELS = [
  {
    title: 'Cloud and Managed Services',
    icon: icon('M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'),
    desc: 'The operator sells compute, storage and managed platforms as a service, not just space and power.',
    points: ['Servers, storage, HCI and private cloud stacks', 'GPU-ready compute and high-speed network fabric', 'Analytics and managed operations to run the platform'],
  },
  {
    title: 'Retail Colocation',
    icon: icon('M4 6h16v5H4zM4 13h16v5H4zM8 8.5h.01M8 15.5h.01'),
    desc: 'Customers rent individual racks, cages or small suites and share the facility with many other tenants.',
    points: ['Rack, cabling and fiber standards across halls', 'Cross-connect and meet-me-room infrastructure', 'Tenant segmentation, monitoring and remote hands'],
  },
  {
    title: 'Enterprise and Captive',
    icon: icon('M5 21V5a2 2 0 012-2h7a2 2 0 012 2v16M16 9h3a1 1 0 011 1v11M9 7h3M9 11h3M9 15h3M3 21h18'),
    desc: 'An organization runs its own facility for its own workloads, with no outside tenants and tight control.',
    points: ['Compute, storage, network and security, one partner', 'Right-sized design for smaller or regulated sites', 'Managed NOC and SOC where in-house teams are lean'],
  },
  {
    title: 'Wholesale and Build-to-Suit',
    icon: icon('M3 21V10l9-6 9 6v11M7 21v-7h10v7M7 17h10'),
    desc: 'A customer leases a hall or MW block, often bringing its own IT, in a shell completed to an agreed level.',
    points: ['Powered shell: campus backbone and meet-me design', 'Warm shell: network, security and DCIM layers', 'Fitted hall: full white space fit-out to spec'],
  },
];
const TECH_PARTNERS = [
  'Check Point', 'Block Armour', 'Red Hat', 'Cisco', 'Palo Alto Networks', 'Platform9',
  'Genie Networks', 'Juniper Networks', 'Arista', 'Hitachi Vantara', 'Hewlett Packard Enterprise', 'Fortinet',
];

export const AboutUsPage: React.FC = () => (
  <div className="inner-page bg-white">
    {/* Intro */}
    <section className="inner-hero pt-12 md:pt-16 pb-6">
      <Container>
        <Eyebrow>About Us</Eyebrow>
        <h1 className="max-w-[760px] text-[32px] md:text-[44px] leading-[1.12] font-bold text-[#0B1B3D] tracking-tight">
          From First Rack to Every Refresh, We Support Your Data Center.
        </h1>
        <p className="mt-4 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">
          Citiuscomm helps data center owners, operators and enterprises source, integrate and support the
          technology inside their facilities, from new builds to upgrades of existing sites.
        </p>
      </Container>
    </section>

    <PageSection>
      <SectionTitle eyebrow="What We Do" title="Equipment and Services" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <Card className="reveal-card">
          <h3 className="text-[17px] md:text-[18px] font-bold text-[#0B1B3D] mb-3">Hardware Supply and Integration</h3>
          <Bullets items={HARDWARE} />
        </Card>
        <Card className="reveal-card">
          <h3 className="text-[17px] md:text-[18px] font-bold text-[#0B1B3D] mb-3">Services</h3>
          <Bullets items={SERVICES} />
        </Card>
      </div>
      <OutlineButton to={LINKS.services} className="mt-6">See all services</OutlineButton>
    </PageSection>

    <PageSection>
      <SectionTitle eyebrow="Why Citiuscomm" title="One Team, Accountable From Supply to Commissioning" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {WHY.map((w) => (
          <Card key={w.title}>
            <h3 className="text-[16px] md:text-[17px] font-bold text-[#0B1B3D] mb-1.5">{w.title}</h3>
            <p className="text-[14px] md:text-[15px] leading-[23px] text-[#4A5568]">{w.desc}</p>
          </Card>
        ))}
      </div>
    </PageSection>

    <PageSection>
      <SectionTitle eyebrow="Greenfield and Brownfield" title="New Builds and Upgrades" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {BUILDS.map((b) => (
          <Card key={b.title}>
            <h3 className="text-[16px] md:text-[17px] font-bold text-[#0B1B3D] mb-1.5">{b.title}</h3>
            <p className="text-[14px] md:text-[15px] leading-[23px] text-[#4A5568]">{b.desc}</p>
          </Card>
        ))}
      </div>
    </PageSection>

    <PageSection>
      <SectionTitle eyebrow="Who We Work With" title="Support for Every Business Model" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {MODELS.map((m) => (
          <Card key={m.title}>
            <div className="flex items-center gap-3.5 mb-3">
              <span className="w-11 h-11 shrink-0 rounded-full bg-[#14306B] text-white flex items-center justify-center shadow-md">{m.icon}</span>
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#0B1B3D]">{m.title}</h3>
            </div>
            <p className="text-[14px] md:text-[15px] leading-[23px] italic text-[#4A5568] mb-3">{m.desc}</p>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F] mb-2">How Citiuscomm supports</p>
            <Bullets items={m.points} />
          </Card>
        ))}
      </div>
    </PageSection>

    <PageSection>
      <SectionTitle eyebrow="Technology Partners" title="Built on Leading Technology" />
      <ul className="flex flex-wrap gap-2.5" aria-label="Technology partners">
        {TECH_PARTNERS.map((p) => (
          <li key={p} className="rounded-full bg-[#F3F6FC] border border-[#E3E9F5] px-4 py-2 text-[13.5px] font-semibold text-[#0B1B3D] hover:border-[#0E8A8F] hover:text-[#0E8A8F] transition-colors">
            {p}
          </li>
        ))}
      </ul>
    </PageSection>

    <PlanningCta />
  </div>
);
