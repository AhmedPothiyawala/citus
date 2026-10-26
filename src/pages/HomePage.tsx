import React from 'react';
import { SmartLink } from '../components/SmartLink';
import { LINKS, COMPANY_INFO, PARTNERS_LIST } from '../data/site';

/* ════════════════════════════════════════════════════
   DESIGN TOKENS — matched 1:1 to home.png specification
   ════════════════════════════════════════════════════ */
const C = {
  navy:       '#0B1B3D',
  headline:   '#0D1527',
  body:       '#4A5568',
  bodyLight:  '#5A6578',
  teal:       '#0E9F9F',
  cardBg:     '#F3F6FA',
  border:     '#E2E8F0',
  white:      '#FFFFFF',
  // Capacity band colors
  cyan:       '#22D3EE',
  blue:       '#3B82F6',
  indigo:     '#6366F1',
  purple:     '#A855F7',
  pink:       '#EC4899',
} as const;

export const HomePage: React.FC = () => {
  /* ── DATA ── */

  const businessModels = [
    {
      title: 'Cloud and Managed Services',
      desc: 'For operators who consume compute and storage platforms as a service, not just space and power.',
      subLabel: 'HOW CITIUS COMM SUPPORTS',
      points: [
        'Servers, storage, HCI and private cloud stacks',
        'GPU-node clusters and high-speed network fabric',
        'Fully documented turnkey assemblies ready for deployment',
      ],
    },
    {
      title: 'Retail Colocation',
      desc: 'Customers who lead data center cages or small suites and require the facility to accommodate connectivity.',
      subLabel: 'HOW CITIUS COMM SUPPORTS',
      points: [
        'Rack, cabling and cross-connect rollouts across halls',
        'Cross-connect and move-in support infrastructure',
        'Structured meet-me-room and shared room environments',
      ],
    },
    {
      title: 'Enterprise and Captive',
      desc: 'Enterprises modernizing their facility footprint across campus, branch and enterprise data centers.',
      subLabel: 'HOW CITIUS COMM SUPPORTS',
      points: [
        'Complete solution: network and security, core and leaf',
        'High-speed storage for mission-critical operations',
        'Managed SOD and POD solution across customer footprint',
      ],
    },
    {
      title: 'Wholesale and Build-to-suit',
      desc: 'Real estate-driven data center operators providing single-tenant or multi-tenant whitespace at multi-megawatt scale.',
      subLabel: 'HOW CITIUS COMM SUPPORTS',
      points: [
        'Baseline electrical and mechanical meet-me-room design',
        'White-space network, security and DCIM layers',
        'Large-scale bulk sourcing for accelerated deployments',
      ],
    },
  ];

  const hardwareSupply = [
    'Network switching, routing and out-of-band cabling',
    'Compute and storage equipment, clusters, HCI',
    'Security, firewalls, IAM, access point systems',
    'Racks and containment, PDUs, patch bays and trunks',
    'DCIM and analytical monitoring',
  ];

  const servicesList = [
    'Design & sourcing support',
    'Multi-OEM sourcing and model selection',
    'Integration and pre-assembly',
    'Turnkey program management',
    'Managed NOC, SOC and on-site hands',
    'Lifecycle support & refresh',
  ];

  const technologyPartners = PARTNERS_LIST.map((p) => p.name);

  const steps = [
    {
      num: '01',
      title: 'Tell us your need',
      desc: 'Capacity, timeline, footprint and site location.',
    },
    {
      num: '02',
      title: 'We shortlist',
      desc: 'Partner hardware options with BOM, cost and lead times.',
    },
    {
      num: '03',
      title: 'We deliver and operate',
      desc: 'Deploy, manage and integrated services.',
    },
  ];

  const independentAdvice = [
    {
      title: 'Independent',
      desc: 'We recommend what fits you, not what we stock.',
    },
    {
      title: 'One point of contact',
      desc: 'Design, sourcing and operations under one contract.',
    },
    {
      title: 'Vetted partner network',
      desc: 'Certified and specialist network deployed worldwide.',
    },
  ];

  const trustBadges = PARTNERS_LIST.slice(0, 8);

  return (
    <div className="homepage-root bg-white w-full overflow-x-hidden" data-no-reveal>

      {/* ═══════════════════════════════════════════════════
          A · NAVIGATION BAR
      ═══════════════════════════════════════════════════ */}
      <header className="w-full bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
          {/* Brand: Citius Communication (No Logo image on HomePage header) */}
          <SmartLink to="/" className="text-xl md:text-[22px] font-bold tracking-tight hover:opacity-90 transition-opacity" style={{ color: C.headline }}>
            Citius Communication
          </SmartLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <SmartLink
              to="/"
              className="relative text-[14px] font-medium py-2 transition-colors"
              style={{ color: C.navy }}
            >
              Home
              <span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                style={{ backgroundColor: '#00C4CC' }}
              />
            </SmartLink>
            <SmartLink
              to={LINKS.companyProfile}
              className="text-[14px] font-medium transition-colors hover:text-slate-900 py-2"
              style={{ color: C.bodyLight }}
            >
              About Us
            </SmartLink>
            <SmartLink
              to={LINKS.products}
              className="text-[14px] font-medium transition-colors hover:text-slate-900 py-2"
              style={{ color: C.bodyLight }}
            >
              Services
            </SmartLink>
            <SmartLink
              to={LINKS.whyUs}
              className="text-[14px] font-medium transition-colors hover:text-slate-900 py-2"
              style={{ color: C.bodyLight }}
            >
              How We Work
            </SmartLink>

            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-full px-6 py-2.5 font-medium text-[13px] hover:bg-slate-800 transition shadow-sm"
            >
              Contact Us
            </SmartLink>
          </nav>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════
          B · HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white pt-10 md:pt-14 pb-8 md:pb-12">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-[760px]">
            {/* Eyebrow */}
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4"
              style={{ color: C.teal }}
            >
              DATA CENTER HARDWARE, INTEGRATION AND MANAGED SERVICES
            </p>

            {/* H1 Headline */}
            <h1
              className="font-extrabold text-[32px] md:text-[44px] lg:text-[48px] leading-[1.12] mb-5 tracking-tight"
              style={{ color: C.headline }}
            >
              We Source and Support the Data Center Equipment for Greenfield and Brownfield Projects and Upgrades.
            </h1>

            {/* Body Paragraph */}
            <p
              className="text-[15px] md:text-[17px] leading-[26px] max-w-[580px] mb-8"
              style={{ color: C.body }}
            >
              Hardware supply, integration and managed services for data centers of every size, from edge rooms to hyperscale campuses.
            </p>

            {/* Button Group */}
            <div className="flex flex-wrap items-center gap-3.5">
              <SmartLink
                to={LINKS.contact}
                className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-800 transition shadow-sm"
              >
                Explore Services
              </SmartLink>
              <SmartLink
                to={LINKS.contact}
                className="inline-flex items-center justify-center border border-slate-300 text-slate-800 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-slate-50 transition"
              >
                Talk to an expert
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          C · UPWARD CAPACITY & GROWTH VECTOR INFOGRAPHIC
      ═══════════════════════════════════════════════════ */}
      <section className="pb-12 md:pb-20 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-[760px]" style={{ aspectRatio: '900 / 510' }}>
              <svg viewBox="0 0 900 510" className="w-full h-auto block" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="25%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#6366F1" />
                    <stop offset="75%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="curveFill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.06" />
                    <stop offset="25%" stopColor="#3B82F6" stopOpacity="0.06" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.06" />
                    <stop offset="75%" stopColor="#A855F7" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.10" />
                  </linearGradient>
                </defs>

                {/* Fill under curve */}
                <path
                  d="M 158 340 C 236 313, 260 300, 315 286 C 394 260, 420 248, 473 233 C 552 206, 580 192, 630 178 C 709 152, 740 138, 788 125 L 788 430 L 158 430 Z"
                  fill="url(#curveFill)"
                />

                {/* Y axis */}
                <line x1="75" y1="45" x2="75" y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points="75,38 71,48 79,48" fill="#64748B" />
                <text x="32" y="238" transform="rotate(-90, 32, 238)" fill="#5A6578" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="1.5" textAnchor="middle">
                  Offering
                </text>

                {/* X axis */}
                <line x1="75" y1="430" x2="860" y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points="867,430 857,426 857,434" fill="#64748B" />

                {/* Colored dashed vertical drop lines */}
                <line x1="158" y1="340" x2="158" y2="430" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="315" y1="286" x2="315" y2="430" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="473" y1="233" x2="473" y2="430" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="630" y1="178" x2="630" y2="430" stroke="#A855F7" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="788" y1="125" x2="788" y2="430" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* The trajectory curve */}
                <path
                  d="M 158 340 C 236 313, 260 300, 315 286 C 394 260, 420 248, 473 233 C 552 206, 580 192, 630 178 C 709 152, 740 138, 788 125"
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Annotations above the curve */}
                <text x="158" y="304" fill="#5A6578" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                  <tspan x="158" dy="0">One hospital, one bank</tspan>
                  <tspan x="158" dy="13">branch DC, mid IT co.</tspan>
                </text>
                <text x="315" y="250" fill="#5A6578" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                  <tspan x="315" dy="0">Hospital network, mid-size</tspan>
                  <tspan x="315" dy="13">bank, state govt dept.</tspan>
                </text>
                <text x="473" y="190" fill="#5A6578" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                  <tspan x="473" dy="0">Large bank core+DR,</tspan>
                  <tspan x="473" dy="13">large hospital chain, state govt cloud</tspan>
                </text>
                <text x="630" y="142" fill="#5A6578" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                  <tspan x="630" dy="0">National bank,</tspan>
                  <tspan x="630" dy="13">large govt agency</tspan>
                </text>
                <text x="788" y="85" fill="#5A6578" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                  <tspan x="788" dy="0">National govt data center,</tspan>
                  <tspan x="788" dy="13">hyperscaler region, top-5 bank</tspan>
                </text>

                {/* Navy Boxes with Colored Top Accent Bars */}
                {/* Node 1 */}
                <g>
                  <rect x="91" y="368" width="135" height="48" rx="6" fill="#0B1B3D" />
                  <rect x="91" y="368" width="135" height="4" rx="2" fill="#22D3EE" />
                  <text x="158" y="388" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                    <tspan x="158" dy="0">&quot;Edge&quot; / server</tspan>
                    <tspan x="158" dy="14">room scale</tspan>
                  </text>
                </g>

                {/* Node 2 */}
                <g>
                  <rect x="248" y="314" width="135" height="48" rx="6" fill="#0B1B3D" />
                  <rect x="248" y="314" width="135" height="4" rx="2" fill="#3B82F6" />
                  <text x="315" y="334" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                    <tspan x="315" dy="0">Small dedicated</tspan>
                    <tspan x="315" dy="14">data center</tspan>
                  </text>
                </g>

                {/* Node 3 */}
                <g>
                  <rect x="405" y="260" width="136" height="48" rx="6" fill="#0B1B3D" />
                  <rect x="405" y="260" width="136" height="4" rx="2" fill="#6366F1" />
                  <text x="473" y="280" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                    <tspan x="473" dy="0">Mid-size colocation</tspan>
                    <tspan x="473" dy="14">/ enterprise DC</tspan>
                  </text>
                </g>

                {/* Node 4 */}
                <g>
                  <rect x="563" y="207" width="135" height="48" rx="6" fill="#0B1B3D" />
                  <rect x="563" y="207" width="135" height="4" rx="2" fill="#A855F7" />
                  <text x="630" y="227" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                    <tspan x="630" dy="0">Large colocation /</tspan>
                    <tspan x="630" dy="14">hyperscale-adjacent</tspan>
                  </text>
                </g>

                {/* Node 5 */}
                <g>
                  <rect x="720" y="153" width="136" height="48" rx="6" fill="#0B1B3D" />
                  <rect x="720" y="153" width="136" height="4" rx="2" fill="#EC4899" />
                  <text x="788" y="173" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                    <tspan x="788" dy="0">Hyperscale</tspan>
                    <tspan x="788" dy="14">campus scale</tspan>
                  </text>
                </g>

                {/* Circle Points on Curve */}
                <g>
                  <circle cx="158" cy="340" r="10" fill="#22D3EE" opacity="0.2" />
                  <circle cx="158" cy="340" r="5.5" fill="white" stroke="#22D3EE" strokeWidth="2.5" />
                  <circle cx="158" cy="340" r="2" fill="#22D3EE" />
                </g>
                <g>
                  <circle cx="315" cy="286" r="10" fill="#3B82F6" opacity="0.2" />
                  <circle cx="315" cy="286" r="5.5" fill="white" stroke="#3B82F6" strokeWidth="2.5" />
                  <circle cx="315" cy="286" r="2" fill="#3B82F6" />
                </g>
                <g>
                  <circle cx="473" cy="233" r="10" fill="#6366F1" opacity="0.2" />
                  <circle cx="473" cy="233" r="5.5" fill="white" stroke="#6366F1" strokeWidth="2.5" />
                  <circle cx="473" cy="233" r="2" fill="#6366F1" />
                </g>
                <g>
                  <circle cx="630" cy="178" r="10" fill="#A855F7" opacity="0.2" />
                  <circle cx="630" cy="178" r="5.5" fill="white" stroke="#A855F7" strokeWidth="2.5" />
                  <circle cx="630" cy="178" r="2" fill="#A855F7" />
                </g>
                <g>
                  <circle cx="788" cy="125" r="10" fill="#EC4899" opacity="0.2" />
                  <circle cx="788" cy="125" r="5.5" fill="white" stroke="#EC4899" strokeWidth="2.5" />
                  <circle cx="788" cy="125" r="2" fill="#EC4899" />
                </g>

                {/* Capacity Band Pills on X Axis */}
                <rect x="117" y="445" width="82" height="24" rx="12" fill="#22D3EE" />
                <text x="158" y="461" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">&lt; 1 MW</text>

                <rect x="274" y="445" width="82" height="24" rx="12" fill="#3B82F6" />
                <text x="315" y="461" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">1-5 MW</text>

                <rect x="432" y="445" width="82" height="24" rx="12" fill="#6366F1" />
                <text x="473" y="461" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">5-20 MW</text>

                <rect x="589" y="445" width="82" height="24" rx="12" fill="#A855F7" />
                <text x="630" y="461" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">20-50 MW</text>

                <rect x="747" y="445" width="82" height="24" rx="12" fill="#EC4899" />
                <text x="788" y="461" fill="white" fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">50-80 MW+</text>

                {/* X axis Title */}
                <text x="473" y="490" fill="#5A6578" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif" textAnchor="middle">
                  Size (capacity)
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          D · SUPPORT FOR EVERY BUSINESS MODEL
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Eyebrow */}
          <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
            BUSINESS MODELS
          </p>
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-bold leading-[1.2] mb-8 md:mb-10" style={{ color: C.headline }}>
            Support for every business model
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {businessModels.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <h3 className="text-[18px] md:text-[19px] font-bold mb-2.5" style={{ color: C.headline }}>
                  {model.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[22px] mb-6" style={{ color: C.body }}>
                  {model.desc}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3.5" style={{ color: C.teal }}>
                  {model.subLabel}
                </p>
                <ul className="space-y-2">
                  {model.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[21px]" style={{ color: C.body }}>
                      <span className="mt-[8px] w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: C.teal }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          E · PARTNERSHIP CALLOUT BANNER
      ═══════════════════════════════════════════════════ */}
      <section className="py-4 md:py-6 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
          >
            <div>
              <h2 className="text-[18px] md:text-[20px] font-bold mb-1.5" style={{ color: C.headline }}>
                Five ways to partner with Citiuscomm
              </h2>
              <p className="text-[13px] md:text-[14px] leading-[21px] max-w-[620px]" style={{ color: C.body }}>
                From complete integration, hardware procurement, managed services, consultive or add-on capability.
              </p>
            </div>
            <SmartLink
              to={LINKS.contact}
              className="shrink-0 inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
              style={{ backgroundColor: C.navy }}
            >
              See partner options
            </SmartLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          F · END-TO-END CAPABILITIES
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
            END-TO-END CAPABILITIES
          </p>
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-bold leading-[1.2] mb-8 md:mb-10" style={{ color: C.headline }}>
            Hardware supply, integration and services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Hardware Supply Column */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <h3 className="text-[17px] md:text-[18px] font-bold mb-4" style={{ color: C.headline }}>
                Hardware Supply and Integration
              </h3>
              <ul className="space-y-2.5">
                {hardwareSupply.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[21px]" style={{ color: C.body }}>
                    <span className="mt-[8px] w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: C.teal }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <h3 className="text-[17px] md:text-[18px] font-bold mb-4" style={{ color: C.headline }}>
                Services
              </h3>
              <ul className="space-y-2.5">
                {servicesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[21px]" style={{ color: C.body }}>
                    <span className="mt-[8px] w-[4px] h-[4px] rounded-full shrink-0" style={{ backgroundColor: C.teal }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-[12px] md:text-[13px] leading-[21px] max-w-[800px]" style={{ color: C.bodyLight }}>
            Power, cooling and civil scope is coordinated through specialist partners and program-managed by Citiuscomm.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          G · TECHNOLOGY PARTNERS RIBBON
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider mb-5 text-center" style={{ color: C.teal }}>
            TECHNOLOGY PARTNERS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-[960px] mx-auto">
            {technologyPartners.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-4 py-2 rounded-full text-[12px] md:text-[13px] font-medium cursor-default transition-colors"
                style={{ backgroundColor: C.cardBg, color: C.body, border: `1px solid ${C.border}` }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[12px] text-center" style={{ color: C.bodyLight }}>
            (and numerous OEM-approved partners globally)
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          H · FROM REQUIREMENT TO RUNNING
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
            HOW IT WORKS
          </p>
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-bold leading-[1.2] mb-8 md:mb-10" style={{ color: C.headline }}>
            From requirement to running
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <p
                  className="text-2xl md:text-[28px] font-extrabold mb-3"
                  style={{ color: C.teal }}
                >
                  {step.num}
                </p>
                <h3 className="text-[17px] md:text-[18px] font-bold mb-2" style={{ color: C.headline }}>
                  {step.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[21px]" style={{ color: C.body }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          I · INDEPENDENT ADVICE, ONE ACCOUNTABLE TEAM
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.teal }}>
            WHY CITIUS
          </p>
          <h2 className="text-[28px] md:text-[34px] lg:text-[38px] font-bold leading-[1.2] mb-8 md:mb-10" style={{ color: C.headline }}>
            Independent advice, one accountable team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {independentAdvice.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <h3 className="text-[17px] md:text-[18px] font-bold mb-2" style={{ color: C.headline }}>
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[21px] italic" style={{ color: C.body }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Badges underneath */}
          <div className="mt-12 text-center">
            <p className="text-[13px] font-medium mb-4" style={{ color: C.bodyLight }}>
              Partners and credentials
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {trustBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[12px] font-medium transition-colors"
                  style={{ backgroundColor: C.cardBg, color: C.body, border: `1px solid ${C.border}` }}
                >
                  <img
                    src={badge.logo}
                    alt={badge.name}
                    className="h-4 w-auto object-contain max-w-[65px] opacity-85"
                  />
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          J · BOTTOM CALL-TO-ACTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-8 md:py-14 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <div
            className="rounded-2xl p-12 text-center"
            style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
          >
            <h2 className="text-[24px] md:text-[32px] font-bold leading-[1.2] mb-3 max-w-[540px] mx-auto" style={{ color: C.headline }}>
              Planning your next facility?
            </h2>
            <p className="text-[13px] md:text-[15px] leading-[22px] mb-7 max-w-[500px] mx-auto" style={{ color: C.body }}>
              Tell us your capacity and timeline. We will recommend the right system architecture in under a day.
            </p>
            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-lg px-8 py-3.5 mx-auto font-semibold hover:bg-slate-800 transition shadow-sm text-[14px]"
            >
              Talk to an expert
            </SmartLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          K · MINIMAL FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="py-6 bg-white" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          {/* Left: Citius Communication Pvt. Ltd. (No Logo) */}
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-[13px] font-bold" style={{ color: C.headline }}>
              Citius Communication Pvt. Ltd.
            </span>
          </div>

          {/* Right: Email, Phone, & Copyright */}
          <div className="text-[12px] flex flex-wrap items-center justify-center md:justify-end gap-3" style={{ color: C.bodyLight }}>
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
              Email: {COMPANY_INFO.email}
            </a>
            <span>&middot;</span>
            <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="hover:underline">
              Phone: {COMPANY_INFO.phone}
            </a>
            <span>&middot;</span>
            <span>{COMPANY_INFO.copyright}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
