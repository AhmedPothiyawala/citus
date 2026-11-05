import React from 'react';
import { LINKS, COMPANY_INFO } from '../data/site';
import { SmartLink } from '../components/SmartLink';

/* ── COLOR TOKENS (matching home page design system) ── */
const C = {
  navy: '#0B1B3D',
  teal: '#0E9F9F',
  headline: '#0B1B3D',
  body: '#4A5568',
  cardBg: '#F3F6FC',
  cardBorder: '#E3E9F5',
  ctaBg: '#F3F6FC',
};

const WHY = [
  { title: 'Multi-OEM Sourcing', desc: 'Equipment from several vendors, chosen for the project and not for one brand.' },
  { title: 'One Point of Accountability', desc: 'One team from supply planning through integration and commissioning.' },
  { title: 'Turnkey Program Management', desc: 'Power, cooling and civil scope coordinated through specialist partners and managed by Citiuscomm.' },
];

const BUILDS = [
  { title: 'Greenfield Projects', desc: 'Sizing, sourcing and integration support for new facilities, from the first design.' },
  { title: 'Brownfield Upgrades', desc: 'Equipment sourcing, integration and lifecycle refresh for facilities that are already running.' },
];

export const AboutUsPage: React.FC = () => (
  <div className="inner-page bg-white">
    {/* ═══════════════════════════════════════════════════
        A · HERO SECTION
    ═══════════════════════════════════════════════════ */}
    <section className="pt-12 md:pt-20 pb-10 md:pb-14 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: C.teal }}>
          ABOUT US
        </p>
        <h1 className="max-w-[760px] text-[32px] md:text-[44px] leading-[1.12] font-bold tracking-tight" style={{ color: C.headline }}>
          From First Rack to Every Refresh, We Support Your Data Center.
        </h1>
        <p className="mt-4 max-w-[720px] text-[16px] md:text-[17px] leading-[27px]" style={{ color: C.body }}>
          Citiuscomm helps data center owners, operators and enterprises source, integrate and support the
          technology inside their facilities, from new builds to upgrades of existing sites.
        </p>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════
        B · WHY CITIUSCOMM
    ═══════════════════════════════════════════════════ */}
    <section className="py-10 md:py-14 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: C.teal }}>
          WHY CITIUSCOMM
        </p>
        <h2 className="text-[26px] md:text-[32px] leading-[1.2] font-bold tracking-tight mb-6 md:mb-8" style={{ color: C.headline }}>
          One Team, Accountable From Supply to Commissioning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl p-5 md:p-6 card-hover-cool"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
            >
              <h3 className="text-[16px] md:text-[17px] font-bold mb-1.5" style={{ color: C.headline }}>{w.title}</h3>
              <p className="text-[14px] md:text-[15px] leading-[23px]" style={{ color: C.body }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════
        C · GREENFIELD AND BROWNFIELD
    ═══════════════════════════════════════════════════ */}
    <section className="py-10 md:py-14 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: C.teal }}>
          GREENFIELD AND BROWNFIELD
        </p>
        <h2 className="text-[26px] md:text-[32px] leading-[1.2] font-bold tracking-tight mb-6 md:mb-8" style={{ color: C.headline }}>
          New Builds and Upgrades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {BUILDS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-5 md:p-6 card-hover-cool"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
            >
              <h3 className="text-[16px] md:text-[17px] font-bold mb-1.5" style={{ color: C.headline }}>{b.title}</h3>
              <p className="text-[14px] md:text-[15px] leading-[23px]" style={{ color: C.body }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════
        D · OUR VISION & MISSION
    ═══════════════════════════════════════════════════ */}
    <section className="py-10 md:py-14 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: C.teal }}>
          OUR PURPOSE
        </p>
        <h2 className="text-[26px] md:text-[32px] leading-[1.2] font-bold tracking-tight mb-8 md:mb-10" style={{ color: C.headline }}>
          Our Vision &amp; Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Mission Card */}
          <div
            className="rounded-2xl p-6 md:p-8 text-center card-hover-cool"
            style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
          >
            <div className="w-14 h-14 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center mx-auto mb-5">
              {/* Target Icon */}
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: C.teal }}>
              OUR MISSION
            </p>
            <h3 className="text-[18px] md:text-[20px] font-bold leading-[1.3] mb-3" style={{ color: C.headline }}>
              Simplifying complexity through technology for lasting impact.
            </h3>
            <p className="text-[14px] md:text-[15px] leading-[24px]" style={{ color: C.body }}>
              Delivering secure, scalable, and reliable solutions through end-to-end execution. We take full accountability
              for the lifecycle of infrastructure, from initial design to long-term operations.
            </p>
          </div>

          {/* Vision Card */}
          <div
            className="rounded-2xl p-6 md:p-8 text-center card-hover-cool"
            style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
          >
            <div className="w-14 h-14 rounded-full bg-[#0B1B3D] text-white flex items-center justify-center mx-auto mb-5">
              {/* Lightbulb Icon */}
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: C.teal }}>
              OUR VISION
            </p>
            <h3 className="text-[18px] md:text-[20px] font-bold leading-[1.3] mb-3" style={{ color: C.headline }}>
              To shape a connected, secure and intelligent digital future.
            </h3>
            <p className="text-[14px] md:text-[15px] leading-[24px]" style={{ color: C.body }}>
              We enable organizations with future-ready digital infrastructure, ensuring that the networks of tomorrow are
              built on a foundation of absolute reliability and strategic foresight.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════
        E · PLANNING CTA
    ═══════════════════════════════════════════════════ */}
    <section className="py-10 md:py-14 bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="rounded-2xl px-6 py-10 md:py-12 text-center"
          style={{ backgroundColor: C.ctaBg, border: `1px solid ${C.cardBorder}` }}
        >
          <h2 className="text-[26px] md:text-[32px] font-bold" style={{ color: C.headline }}>
            Planning Your Next Facility?
          </h2>
          <p className="mt-3 text-[15px] md:text-[16px]" style={{ color: C.body }}>
            Tell us your capacity and timeline. We recommend the right option within one business day.
          </p>
          <SmartLink
            to={LINKS.contact}
            className="inline-flex items-center justify-center rounded-full bg-[#0B1B3D] hover:bg-[#1A2F5E] text-white font-semibold text-[14px] px-7 py-3 mt-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Talk to an expert
          </SmartLink>
        </div>
      </div>
    </section>

    {/* ═══════════════════════════════════════════════════
        F · SIMPLE FOOTER (matching reference)
    ═══════════════════════════════════════════════════ */}
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <span className="text-[13px] font-bold" style={{ color: C.headline }}>Citius Communication</span>
        <div className="text-[12px] flex flex-wrap items-center justify-center md:justify-end gap-3" style={{ color: '#718096' }}>
          <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">{COMPANY_INFO.email}</a>
          <span aria-hidden="true">&middot;</span>
          <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="hover:underline">{COMPANY_INFO.phone}</a>
          <span aria-hidden="true">&middot;</span>
          <SmartLink to={LINKS.contact} className="hover:underline">B25, Okhla Phase-II, New Delhi</SmartLink>
        </div>
      </div>
    </footer>
  </div>
);
