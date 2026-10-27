import React, { useState, useEffect, useRef } from 'react';
import { SmartLink } from '../components/SmartLink';
import { LINKS, COMPANY_INFO, PARTNERS_LIST, CLIENTS_LIST } from '../data/site';

/* ── COLOR TOKENS ── */
const C = {
  navy: '#0B1B3D',
  teal: '#0E9F9F',
  tealLight: '#E8F7F7',
  headline: '#0B1B3D',
  body: '#4A5568',
  bodyLight: '#718096',
  cardBg: '#FFFFFF',
  border: '#E2E8F0',
  borderSubtle: '#EDF2F7',
  bandBg: '#F8FAFC',
};

/* ── DATA CENTER CAPACITY TIERS (MATCHED TO REFERENCE DESIGN) ── */
interface CapacityTier {
  index: number;
  x: number;
  y: number;
  boxX: number;
  boxY: number;
  boxW: number;
  boxH: number;
  pillX: number;
  pillW: number;
  pillText: string;
  color: string;
  annotationY: number;
  annotationLines: string[];
  boxLines: string[];
}

const CAPACITY_TIERS: CapacityTier[] = [
  {
    index: 0,
    x: 180,
    y: 340,
    boxX: 105,
    boxY: 375,
    boxW: 150,
    boxH: 48,
    pillX: 147,
    pillW: 66,
    pillText: '< 1 MW',
    color: '#06B6D4',
    annotationY: 300,
    annotationLines: ['One hospital, one bank', 'branch DC, mid IT co.'],
    boxLines: ['"Edge" / server', 'room scale'],
  },
  {
    index: 1,
    x: 390,
    y: 286,
    boxX: 315,
    boxY: 320,
    boxW: 150,
    boxH: 48,
    pillX: 357,
    pillW: 66,
    pillText: '1-5 MW',
    color: '#2563EB',
    annotationY: 246,
    annotationLines: ['Hospital network, mid-size', 'bank, state govt dept.'],
    boxLines: ['Small dedicated', 'data center'],
  },
  {
    index: 2,
    x: 600,
    y: 233,
    boxX: 525,
    boxY: 266,
    boxW: 150,
    boxH: 48,
    pillX: 566,
    pillW: 68,
    pillText: '5-20 MW',
    color: '#4F46E5',
    annotationY: 194,
    annotationLines: ['Large bank core+DR,', 'large hospital chain, state govt cloud'],
    boxLines: ['Mid-size colocation', '/ enterprise DC'],
  },
  {
    index: 3,
    x: 810,
    y: 178,
    boxX: 735,
    boxY: 212,
    boxW: 150,
    boxH: 48,
    pillX: 771,
    pillW: 78,
    pillText: '20-50 MW',
    color: '#9333EA',
    annotationY: 140,
    annotationLines: ['National bank,', 'large govt agency'],
    boxLines: ['Large colocation /', 'hyperscale-adjacent'],
  },
  {
    index: 4,
    x: 1020,
    y: 125,
    boxX: 945,
    boxY: 153,
    boxW: 150,
    boxH: 48,
    pillX: 979,
    pillW: 82,
    pillText: '50-80 MW+',
    color: '#EC4899',
    annotationY: 85,
    annotationLines: ['National govt data center,', 'hyperscaler region, top-5 bank'],
    boxLines: ['Hyperscale', 'campus scale'],
  },
];

/* ── DYNAMIC ROTATING DC CATEGORIES FOR TYPEWRITER ANIMATION ── */
const DC_ROTATING_PHRASES = [
  'Greenfield and Brownfield Projects and Upgrades.',
  'AI Clusters & High-Density GPU Pods.',
  'Hyperscale Campus Scale Deployments.',
  'Retail and Enterprise DC Modernization.',
  'Edge Data Centers & Server Room Expansions.',
];

export const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [activeClientSlide, setActiveClientSlide] = useState(0);
  const isClientAutoScrollPausedRef = useRef(false);

  const [activePartnerSlide, setActivePartnerSlide] = useState(0);
  const isPartnerAutoScrollPausedRef = useRef(false);

  // Typewriter text animation state for hero headline
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typedText, setTypedText] = useState(DC_ROTATING_PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  // Dynamic Typewriter loop
  useEffect(() => {
    const currentPhrase = DC_ROTATING_PHRASES[typewriterIndex];
    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText((prev) => prev.slice(0, -1));
        }, 22);
      } else {
        setIsDeleting(false);
        setTypewriterIndex((prev) => (prev + 1) % DC_ROTATING_PHRASES.length);
        timer = setTimeout(() => {}, 220);
      }
    } else {
      if (typedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        }, 36);
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, isPaused, typewriterIndex]);

  // Robust Auto-Scrolling for Technology Partners: every 3.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPartnerAutoScrollPausedRef.current) {
        setActivePartnerSlide((prev) => (prev + 1) % 4);
      }
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Robust Auto-Scrolling for Our Clients: every 3.0 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isClientAutoScrollPausedRef.current) {
        setActiveClientSlide((prev) => (prev + 1) % 4);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Reveal Observer for all widgets and UI elements
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.home-reveal, .home-reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    const elements = document.querySelectorAll('.home-reveal, .home-reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const partnerSlides = [
    // Slide 0: Top OEM Networking & Compute Giants
    PARTNERS_LIST.slice(0, 6),
    // Slide 1: Enterprise Servers, Storage & Cloud
    PARTNERS_LIST.slice(6, 12),
    // Slide 2: Optical, Automation & Integration Partners
    PARTNERS_LIST.slice(12, 18),
    // Slide 3: DDI, Security & IoT Specialists + Tier 1 Leaders
    [
      PARTNERS_LIST[18], // EfficientIP
      PARTNERS_LIST[19], // DIY CAM
      PARTNERS_LIST[0],  // Cisco
      PARTNERS_LIST[4],  // Dell Technologies
      PARTNERS_LIST[7],  // HPE
      PARTNERS_LIST[5],  // Juniper Networks
    ],
  ];

  const clientSlides = [
    // Slide 0: Top Telecom & Carrier Giants
    [
      CLIENTS_LIST[0], // Reliance Jio
      CLIENTS_LIST[21], // Airtel
      CLIENTS_LIST[1], // Vodafone Idea (Vi)
      CLIENTS_LIST[2], // Rakuten Mobile
      CLIENTS_LIST[3], // Nepal Telecom
      CLIENTS_LIST[4], // GTPL Hathway
    ],
    // Slide 1: Major MSOs & Broadband Providers
    [
      CLIENTS_LIST[5], // Hathway
      CLIENTS_LIST[6], // DEN Networks
      CLIENTS_LIST[7], // Fastway
      CLIENTS_LIST[8], // Net+ Broadband
      CLIENTS_LIST[9], // Kerala Vision
      CLIENTS_LIST[10], // TCCL
    ],
    // Slide 2: Regional Powerhouses (Exact match to user screenshot)
    [
      CLIENTS_LIST[11], // VK Digital
      CLIENTS_LIST[12], // You Broadband
      CLIENTS_LIST[13], // Siti Digital
      CLIENTS_LIST[14], // UCN
      CLIENTS_LIST[15], // Metrocast
      CLIENTS_LIST[16], // Meghbela Broadband
    ],
    // Slide 3: South Asia & Media Leaders
    [
      CLIENTS_LIST[17], // WorldLink Nepal
      CLIENTS_LIST[18], // Subisu
      CLIENTS_LIST[19], // Vianet
      CLIENTS_LIST[20], // Discovery
      CLIENTS_LIST[22], // Sony / SET
      CLIENTS_LIST[0], // Reliance Jio
    ],
  ];

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

  return (
    <div className="homepage-root bg-white w-full overflow-x-clip" data-no-reveal>

      {/* ═══════════════════════════════════════════════════
          A · NAVIGATION BAR (Distinct Dark Navy Brand Theme - Sticky Header)
      ═══════════════════════════════════════════════════ */}
      <header className="w-full bg-[#0B1B3D] text-white shadow-md border-b border-slate-800/80 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-[56px] md:h-[60px] flex items-center justify-between">
          {/* Brand: Full CITIUSCOMM Brand Logo + Name */}
          <SmartLink
            to="/"
            className="flex items-center gap-3 group transition-opacity hover:opacity-95"
          >
            <img
              src="/images/citiuscomm-white-retina-logo.png"
              alt="CITIUSCOMM"
              className="h-6 sm:h-7 w-auto object-contain block"
            />
            <span className="hidden sm:inline-block text-[13px] tracking-wide text-slate-300 font-semibold border-l border-slate-700/80 pl-3">
              Citius Communication
            </span>
            <span className="w-2 h-2 rounded-full bg-[#00C4CC] shadow-[0_0_8px_#00C4CC]" />
          </SmartLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            <SmartLink
              to="/"
              className="relative text-[14px] font-semibold py-2 text-white transition-colors"
            >
              Home
              <span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#00C4CC] shadow-[0_0_6px_#00C4CC]"
              />
            </SmartLink>
            <SmartLink
              to={LINKS.companyProfile}
              className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors py-2"
            >
              About Us
            </SmartLink>
            <SmartLink
              to={LINKS.products}
              className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors py-2"
            >
              Services
            </SmartLink>
            <SmartLink
              to={LINKS.whyUs}
              className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors py-2"
            >
              How We Work
            </SmartLink>

            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center bg-[#00C4CC] text-[#0B1B3D] rounded-full px-5 py-2 font-bold text-[13px] hover:bg-cyan-300 transition-all duration-200 shadow-[0_0_15px_rgba(0,196,204,0.35)] hover:shadow-[0_0_20px_rgba(0,196,204,0.6)]"
            >
              Contact Us
            </SmartLink>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00C4CC]/50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B1B3D] border-t border-slate-800 shadow-2xl px-6 py-5 space-y-3">
            <SmartLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-semibold text-[#00C4CC] py-2 border-b border-slate-800/80"
            >
              Home
            </SmartLink>
            <SmartLink
              to={LINKS.companyProfile}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-slate-200 hover:text-white py-2 border-b border-slate-800/80"
            >
              About Us
            </SmartLink>
            <SmartLink
              to={LINKS.products}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-slate-200 hover:text-white py-2 border-b border-slate-800/80"
            >
              Services
            </SmartLink>
            <SmartLink
              to={LINKS.whyUs}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[15px] font-medium text-slate-200 hover:text-white py-2 border-b border-slate-800/80"
            >
              How We Work
            </SmartLink>
            <div className="pt-2">
              <SmartLink
                to={LINKS.contact}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center bg-[#00C4CC] text-[#0B1B3D] rounded-full py-2.5 font-bold text-[14px] hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,196,204,0.35)]"
              >
                Contact Us
              </SmartLink>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════
          B · FIRST PAGE HERO: 2-LINE HEADLINE + FULL CAPACITY GRAPH
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white min-h-0 lg:h-[calc(100vh-60px)] flex flex-col justify-between pt-5 sm:pt-6 md:pt-7 pb-3 sm:pb-4 md:pb-5 overflow-hidden">
        {/* Eyebrow & 2-Line Headline at Top */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00C4CC] animate-live-dot shrink-0" />
            <p
              className="hero-eyebrow text-[11px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider leading-snug"
              style={{ color: C.teal }}
            >
              DATA CENTER HARDWARE, INTEGRATION AND MANAGED SERVICES
            </p>
          </div>

          <h1
            className="hero-fluid-headline font-extrabold mb-0"
            style={{ color: C.headline }}
          >
            <span className="hero-headline-line-1 block lg:whitespace-nowrap">
              We Source and Support the Data Center Equipment
            </span>
            <span className="hero-headline-line-2 block mt-0.5 min-h-[1.25em]">
              for{' '}
              <span className="bg-gradient-to-r from-[#008B94] via-[#0E7490] to-[#2563EB] bg-clip-text text-transparent font-extrabold">
                {typedText}
              </span>
              <span className="inline-block w-[2.5px] sm:w-[3px] h-[0.82em] bg-[#00C4CC] ml-1 align-baseline rounded-full shadow-[0_0_8px_#00C4CC] animate-cursor-blink" />
            </span>
          </h1>
        </div>

        {/* Full Capacity Graph Centered on Desktop, Left-Aligned Scroll on Mobile */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex-1 min-h-0 flex flex-col items-center justify-center">
          <div className="w-full h-full flex items-center justify-start md:justify-center overflow-x-auto select-none scrollbar-thin">
            <div className="relative w-full max-w-[1160px] flex items-center justify-center shrink-0">
              {/* Desktop Inside-Graph Hardware Line & Action Buttons */}
              <div
                className="hidden md:flex flex-col items-start gap-2.5 absolute z-20 pointer-events-auto"
                style={{ top: '6%', left: '8.5%', width: '40%', maxWidth: '460px' }}
              >
                <p className="text-[13.5px] lg:text-[14.5px] leading-[21px] lg:leading-[23px] text-slate-600 font-medium">
                  Hardware supply, integration and managed services for data centers of every size, from edge rooms to hyperscale campuses.
                </p>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <SmartLink
                    to={LINKS.contact}
                    className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-lg px-4 lg:px-5 py-2 font-semibold text-[13px] hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Explore Services
                  </SmartLink>
                  <SmartLink
                    to={LINKS.contact}
                    className="inline-flex items-center justify-center border border-slate-300 text-slate-800 bg-white rounded-lg px-4 lg:px-5 py-2 font-semibold text-[13px] hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Talk to an expert
                  </SmartLink>
                </div>
              </div>

              <svg
                viewBox="0 24 1160 476"
                className="w-full h-auto max-h-full block select-none min-w-[700px] md:min-w-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
                  d="M 180 340 C 285 313, 315 300, 390 286 C 495 260, 525 248, 600 233 C 705 206, 735 192, 810 178 C 915 152, 945 138, 1020 125 L 1020 430 L 180 430 Z"
                  fill="url(#curveFill)"
                />

                {/* Y axis */}
                <line x1="75" y1="45" x2="75" y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points="75,38 71,48 79,48" fill="#64748B" />
                <text x="32" y="238" transform="rotate(-90, 32, 238)" fill="#5A6578" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="1.5" textAnchor="middle">
                  Offering
                </text>

                {/* X axis */}
                <line x1="75" y1="430" x2="1090" y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points="1097,430 1087,426 1087,434" fill="#64748B" />

                {/* Vertical drop dashed grid lines from each point to X axis */}
                {CAPACITY_TIERS.map((tier) => (
                  <line
                    key={`grid-${tier.index}`}
                    x1={tier.x}
                    y1={tier.y}
                    x2={tier.x}
                    y2="430"
                    stroke={tier.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.75"
                  />
                ))}

                {/* Dynamic Illuminated Glowing Base Curve */}
                <path
                  d="M 180 340 C 285 313, 315 300, 390 286 C 495 260, 525 248, 600 233 C 705 206, 735 192, 810 178 C 915 152, 945 138, 1020 125"
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-curve-pulse"
                />

                {/* Curve Optical Data Flow: continuous gliding white-cyan packet stream */}
                <path
                  d="M 180 340 C 285 313, 315 300, 390 286 C 495 260, 525 248, 600 233 C 705 206, 735 192, 810 178 C 915 152, 945 138, 1020 125"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="curve-flow"
                  style={{
                    filter: 'drop-shadow(0 0 3px #22D3EE) drop-shadow(0 0 7px rgba(34, 211, 238, 0.85))',
                    pointerEvents: 'none',
                  }}
                />

                {/* Annotations above the curve */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <text
                      key={`annotation-${tier.index}`}
                      x={tier.x}
                      y={tier.annotationY}
                      fill={isHovered ? '#0B1B3D' : '#5A6578'}
                      fontWeight={isHovered ? '600' : '400'}
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                      textAnchor="middle"
                      style={{ transition: 'fill 0.2s ease, font-weight 0.2s ease', pointerEvents: 'none' }}
                    >
                      {tier.annotationLines.map((line, li) => (
                        <tspan key={li} x={tier.x} dy={li === 0 ? 0 : 13}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  );
                })}

                {/* Navy Node Cards with Colored Top Accent Bars & Interactive Elevation */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <g
                      key={`card-${tier.index}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredTier(tier.index)}
                      onMouseLeave={() => setHoveredTier(null)}
                      style={{
                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                        filter: isHovered
                          ? `drop-shadow(0 10px 18px rgba(11, 27, 61, 0.28)) drop-shadow(0 0 10px ${tier.color}77)`
                          : 'drop-shadow(0 2px 4px rgba(11, 27, 61, 0.08))',
                        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                    >
                      <rect x={tier.boxX} y={tier.boxY} width={tier.boxW} height={tier.boxH} rx="6" fill="#0B1B3D" />
                      <rect
                        x={tier.boxX}
                        y={tier.boxY}
                        width={tier.boxW}
                        height={isHovered ? 5 : 4}
                        rx="2"
                        fill={tier.color}
                        style={{
                          transition: 'height 0.2s ease',
                          filter: isHovered ? `drop-shadow(0 0 4px ${tier.color})` : 'none',
                        }}
                      />
                      <text x={tier.x} y={tier.boxY + 20} fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                        {tier.boxLines.map((line, li) => (
                          <tspan key={li} x={tier.x} dy={li === 0 ? 0 : 14}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Circle Points on Curve + Expanding Concentric Radar Rings */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <g
                      key={`point-${tier.index}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredTier(tier.index)}
                      onMouseLeave={() => setHoveredTier(null)}
                    >
                      {/* Concentric animated radar rings */}
                      <circle
                        cx={tier.x}
                        cy={tier.y}
                        r="5.5"
                        stroke={tier.color}
                        fill="none"
                        className="signal-ring"
                      />
                      <circle
                        cx={tier.x}
                        cy={tier.y}
                        r="5.5"
                        stroke={tier.color}
                        fill="none"
                        className="signal-ring-2"
                      />

                      {/* Static / hover halo */}
                      <circle
                        cx={tier.x}
                        cy={tier.y}
                        r={isHovered ? 14 : 10}
                        fill={tier.color}
                        opacity={isHovered ? 0.35 : 0.2}
                        style={{
                          transition: 'r 0.25s ease, opacity 0.25s ease',
                          filter: isHovered ? `drop-shadow(0 0 6px ${tier.color})` : 'none',
                        }}
                      />
                      {/* Outer ring */}
                      <circle
                        cx={tier.x}
                        cy={tier.y}
                        r={isHovered ? 7 : 5.5}
                        fill="white"
                        stroke={tier.color}
                        strokeWidth={isHovered ? 3 : 2.5}
                        style={{ transition: 'all 0.25s ease' }}
                      />
                      {/* Center dot */}
                      <circle
                        cx={tier.x}
                        cy={tier.y}
                        r={isHovered ? 3 : 2}
                        fill={tier.color}
                        style={{ transition: 'r 0.25s ease' }}
                      />
                    </g>
                  );
                })}

                {/* Capacity Band Pills on X Axis with Interactive Hover Emphasis */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <g
                      key={`pill-${tier.index}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredTier(tier.index)}
                      onMouseLeave={() => setHoveredTier(null)}
                      style={{
                        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                        filter: isHovered
                          ? `drop-shadow(0 6px 12px ${tier.color}99) drop-shadow(0 0 6px ${tier.color})`
                          : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12))',
                        transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      }}
                    >
                      <rect
                        x={tier.pillX}
                        y="445"
                        width={tier.pillW}
                        height="24"
                        rx="12"
                        fill={tier.color}
                        stroke={isHovered ? '#FFFFFF' : 'transparent'}
                        strokeWidth={isHovered ? 1.5 : 0}
                        style={{ transition: 'stroke-width 0.2s ease' }}
                      />
                      <text
                        x={tier.x}
                        y="461"
                        fill="white"
                        fontSize="10.5"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {tier.pillText}
                      </text>
                    </g>
                  );
                })}

                {/* X axis Title */}
                <text x="600" y="490" fill="#5A6578" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif" textAnchor="middle">
                  Size (capacity)
                </text>
              </svg>
            </div>
          </div>
          {/* Mobile swipe indicator */}
          <div className="md:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-400 py-1 font-medium select-none">
            <span>&#8592; Swipe to explore all capacity tiers &#8594;</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          C.1 · HARDWARE SUPPLY & ACTION BUTTONS (Mobile View — Below Graph)
      ═══════════════════════════════════════════════════ */}
      <section className="md:hidden py-4 bg-slate-50/80 border-y border-slate-100">
        <div className="w-full px-4 sm:px-6 flex flex-col items-start gap-3.5">
          <p className="text-[14.5px] leading-[22px] text-slate-700 font-normal">
            Hardware supply, integration and managed services for data centers of every size, from edge rooms to hyperscale campuses.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 w-full">
            <SmartLink
              to={LINKS.contact}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-lg px-4 py-2.5 font-semibold text-[13.5px] shadow-md hover:bg-slate-800 transition-colors text-center"
            >
              Explore Services
            </SmartLink>
            <SmartLink
              to={LINKS.contact}
              className="flex-1 min-w-[140px] inline-flex items-center justify-center border border-slate-300 text-slate-800 bg-white rounded-lg px-4 py-2.5 font-semibold text-[13.5px] shadow-sm hover:bg-slate-50 transition-colors text-center"
            >
              Talk to an expert
            </SmartLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          D · SUPPORT FOR EVERY BUSINESS MODEL
      ═══════════════════════════════════════════════════ */}
      <section className="pt-6 md:pt-8 pb-3 md:pb-4 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Eyebrow & Title with Entrance Animation */}
          <div className="home-reveal">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              BUSINESS MODELS
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] mb-4 md:mb-5" style={{ color: C.headline }}>
              Support for every business model
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
            {businessModels.map((model, idx) => (
              <div
                key={model.title}
                className={`card-hover-cool group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${(idx % 4) + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                {/* Glowing subtle gradient top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-[17px] md:text-[18px] font-bold mb-2 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                  {model.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[21px] mb-4" style={{ color: C.body }}>
                  {model.desc}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: C.teal }}>
                  {model.subLabel}
                </p>
                <ul className="space-y-1.5">
                  {model.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[20px]" style={{ color: C.body }}>
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0 bg-[#0E9F9F] group-hover:bg-[#22D3EE] group-hover:scale-125 transition-all duration-300" />
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
      <section className="py-2.5 md:py-3 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div
            className="home-reveal-scale card-hover-cool rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#F3F6FA] via-[#EDF5FB] to-[#F3F6FA]"
            style={{ border: `1px solid ${C.border}` }}
          >
            <div>
              <h2 className="text-[17px] md:text-[19px] font-bold mb-1" style={{ color: C.headline }}>
                Five ways to partner with Citiuscomm
              </h2>
              <p className="text-[13px] md:text-[14px] leading-[20px] max-w-[620px]" style={{ color: C.body }}>
                From complete integration, hardware procurement, managed services, consultive or add-on capability.
              </p>
            </div>
            <SmartLink
              to={LINKS.contact}
              className="shrink-0 inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
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
      <section className="pt-3 md:pt-4 pb-6 md:pb-8 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              END-TO-END CAPABILITIES
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] mb-4 md:mb-5" style={{ color: C.headline }}>
              Hardware supply, integration and services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Hardware Supply Column */}
            <div
              className="card-hover-cool group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-1"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-[17px] md:text-[18px] font-bold mb-3 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                Hardware Supply and Integration
              </h3>
              <ul className="space-y-2">
                {hardwareSupply.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[20px]" style={{ color: C.body }}>
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0 bg-[#0E9F9F] group-hover:bg-[#22D3EE] group-hover:scale-125 transition-all duration-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div
              className="card-hover-cool group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-2"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-[17px] md:text-[18px] font-bold mb-3 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                Services
              </h3>
              <ul className="space-y-2">
                {servicesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-[20px]" style={{ color: C.body }}>
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full shrink-0 bg-[#0E9F9F] group-hover:bg-[#22D3EE] group-hover:scale-125 transition-all duration-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="home-reveal stagger-3 mt-4 text-[12px] md:text-[13px] leading-[20px] max-w-[800px]" style={{ color: C.bodyLight }}>
            Power, cooling and civil scope is coordinated through specialist partners and program-managed by Citiuscomm.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          G · TECHNOLOGY PARTNERS (Same UI as Our Clients: 1 Line, Auto-Scroll, Big Icons)
      ═══════════════════════════════════════════════════ */}
      <section
        id="partners"
        className="pt-8 pb-6 md:pt-10 md:pb-8 bg-[#0B1B3D] text-white relative overflow-hidden border-b border-slate-800/60"
      >
        {/* Dynamic Animated Tech Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13274c] via-[#0B1B3D] to-[#060e20] opacity-95" />

        {/* Floating Ambient Cyan & Blue Glowing Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C4CC]/20 rounded-full blur-3xl pointer-events-none animate-tech-orb-1" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl pointer-events-none animate-tech-orb-2" />

        {/* Continuous Drifting Tech Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none animate-grid-drift"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20px 20px, white 2%, transparent 0%), radial-gradient(circle at 70px 70px, #00C4CC 2%, transparent 0%)',
            backgroundSize: '90px 90px',
          }}
        />

        {/* Traveling Laser Pulse Line */}
        <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#00C4CC] to-transparent opacity-60 animate-laser-sweep pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Section Heading */}
          <div className="home-reveal text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5 text-[#00C4CC]">
              MULTI-OEM SOURCING ECOSYSTEM
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight">
              Technology Partners
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00C4CC] to-[#3B82F6] mx-auto mt-2.5 rounded-full" />
          </div>

          {/* Technology Partners Horizontal Auto-Scrolling Track (In One Line) */}
          <div
            className="home-reveal stagger-1 w-full overflow-hidden mb-5 py-1"
            onMouseEnter={() => {
              isPartnerAutoScrollPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPartnerAutoScrollPausedRef.current = false;
            }}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activePartnerSlide * 100}%)` }}
            >
              {partnerSlides.map((slide, sIdx) => (
                <div
                  key={sIdx}
                  className="w-full shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4 px-1"
                >
                  {slide.map((partner) => (
                    <div key={partner.name} className="flex flex-col items-center group">
                      <div className="w-full bg-white rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex items-center justify-center aspect-square shadow-xl transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,196,204,0.35)] hover:-translate-y-2 border border-white/20 overflow-hidden relative group-hover:border-[#00C4CC]/50">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full max-h-[145px] max-w-[92%] object-contain scale-110 sm:scale-120 group-hover:scale-130 transition-transform duration-300 drop-shadow-sm select-none"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-slate-200 text-[13px] md:text-[14px] font-semibold text-center mt-2.5 group-hover:text-cyan-400 transition-colors line-clamp-1 tracking-wide">
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls Matching Our Clients */}
          <div className="home-reveal stagger-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setActivePartnerSlide((prev) => (prev - 1 + partnerSlides.length) % partnerSlides.length)}
              className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 hover:text-white hover:border-[#00C4CC] hover:bg-[#00C4CC]/20 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Previous Partners Slide"
            >
              &#8592;
            </button>
            <div className="flex items-center gap-2">
              {partnerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePartnerSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activePartnerSlide === idx
                      ? 'w-7 h-2 bg-[#00C4CC] shadow-[0_0_12px_#00C4CC]'
                      : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Partners Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActivePartnerSlide((prev) => (prev + 1) % partnerSlides.length)}
              className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 hover:text-white hover:border-[#00C4CC] hover:bg-[#00C4CC]/20 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Next Partners Slide"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          G.1 · OUR CLIENTS (Full Logo & Brand Names Showcase)
      ═══════════════════════════════════════════════════ */}
      <section
        id="clients"
        className="pt-6 pb-8 md:pt-8 md:pb-10 bg-[#0B1B3D] text-white relative overflow-hidden"
      >
        {/* Dynamic Animated Tech Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#13274c] via-[#0B1B3D] to-[#060e20] opacity-95" />

        {/* Floating Ambient Indigo & Cyan Glowing Orbs */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#6366F1]/20 rounded-full blur-3xl pointer-events-none animate-tech-orb-2" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00C4CC]/20 rounded-full blur-3xl pointer-events-none animate-tech-orb-1" />

        {/* Continuous Drifting Tech Matrix Grid (Reverse Angle) */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none animate-grid-drift-reverse"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70px 20px, white 2%, transparent 0%), radial-gradient(circle at 20px 70px, #3B82F6 2%, transparent 0%)',
            backgroundSize: '90px 90px',
          }}
        />

        {/* Traveling Laser Pulse Line */}
        <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-60 animate-laser-sweep pointer-events-none" />

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Section Heading */}
          <div className="home-reveal text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5 text-[#00C4CC]">
              TRUSTED ACROSS BROADCAST, TELECOM & DATA CENTER NETWORKS
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight">
              Our Clients
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00C4CC] to-[#3B82F6] mx-auto mt-2.5 rounded-full" />
          </div>

          {/* Client Logo Horizontal Auto-Scrolling Track */}
          <div
            className="home-reveal stagger-1 w-full overflow-hidden mb-5 py-1"
            onMouseEnter={() => {
              isClientAutoScrollPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isClientAutoScrollPausedRef.current = false;
            }}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeClientSlide * 100}%)` }}
            >
              {clientSlides.map((slide, sIdx) => (
                <div
                  key={sIdx}
                  className="w-full shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4 px-1"
                >
                  {slide.map((client) => (
                    <div key={client.name} className="flex flex-col items-center group">
                      <div className="w-full bg-white rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex items-center justify-center aspect-square shadow-xl transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,196,204,0.35)] hover:-translate-y-2 border border-white/20 overflow-hidden relative group-hover:border-[#00C4CC]/50">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="w-full h-full max-h-[145px] max-w-[92%] object-contain scale-110 sm:scale-120 group-hover:scale-130 transition-transform duration-300 drop-shadow-sm select-none"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-slate-200 text-[13px] md:text-[14px] font-semibold text-center mt-2.5 group-hover:text-cyan-400 transition-colors line-clamp-1 tracking-wide">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls Matching User Screenshot */}
          <div className="home-reveal stagger-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveClientSlide((prev) => (prev - 1 + clientSlides.length) % clientSlides.length)}
              className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 hover:text-white hover:border-[#00C4CC] hover:bg-[#00C4CC]/20 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Previous Slide"
            >
              &#8592;
            </button>
            <div className="flex items-center gap-2">
              {clientSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveClientSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeClientSlide === idx
                      ? 'w-7 h-2 bg-[#00C4CC] shadow-[0_0_12px_#00C4CC]'
                      : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveClientSlide((prev) => (prev + 1) % clientSlides.length)}
              className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300 hover:text-white hover:border-[#00C4CC] hover:bg-[#00C4CC]/20 flex items-center justify-center transition-all text-xs font-bold"
              aria-label="Next Slide"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          H · FROM REQUIREMENT TO RUNNING
      ═══════════════════════════════════════════════════ */}
      <section className="pt-6 md:pt-8 pb-3 md:pb-4 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              HOW IT WORKS
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] mb-4 md:mb-5" style={{ color: C.headline }}>
              From requirement to running
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`card-hover-cool group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${idx + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p
                  className="step-num-glow text-2xl md:text-[28px] font-extrabold mb-2.5 group-hover:scale-110 group-hover:text-cyan-500 transition-all duration-300 inline-block"
                  style={{ color: C.teal }}
                >
                  {step.num}
                </p>
                <h3 className="text-[17px] md:text-[18px] font-bold mb-1.5 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                  {step.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[20px]" style={{ color: C.body }}>
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
      <section className="pt-3 md:pt-4 pb-6 md:pb-8 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              WHY CITIUS
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] mb-4 md:mb-5" style={{ color: C.headline }}>
              Independent advice, one accountable team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {independentAdvice.map((item, idx) => (
              <div
                key={item.title}
                className={`card-hover-cool group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${idx + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22D3EE] to-[#6366F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-[17px] md:text-[18px] font-bold mb-1.5 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                  {item.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[20px] italic" style={{ color: C.body }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          J · BOTTOM CALL-TO-ACTION (Cool Navy Glow UI)
      ═══════════════════════════════════════════════════ */}
      <section className="pt-2 pb-6 md:pt-3 md:pb-8 bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div
            className="home-reveal-scale rounded-2xl py-8 px-6 md:py-10 md:px-12 text-center bg-gradient-to-br from-[#0B1B3D] via-[#0E224F] to-[#0B1B3D] text-white shadow-2xl relative overflow-hidden border border-slate-700/60"
          >
            {/* Animated Rotating Pulsing Aurora Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-gradient-to-r from-[#00C4CC]/25 via-[#3B82F6]/20 to-[#6366F1]/25 rounded-full blur-3xl pointer-events-none animate-cta-aurora" />

            {/* Moving Tech Matrix Grid */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none animate-grid-drift"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20px 20px, white 2%, transparent 0%), radial-gradient(circle at 70px 70px, #00C4CC 2%, transparent 0%)',
                backgroundSize: '80px 80px',
              }}
            />

            {/* Ambient Shimmer Glider */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-card-shimmer" />
            <h2 className="text-[22px] md:text-[30px] font-extrabold leading-[1.2] mb-2 max-w-[560px] mx-auto text-white relative z-10">
              Planning your next facility?
            </h2>
            <p className="text-[13px] md:text-[15px] leading-[22px] mb-5 max-w-[520px] mx-auto text-slate-300 relative z-10 font-normal">
              Tell us your capacity and timeline. We will recommend the right system architecture in under a day.
            </p>
            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center bg-[#00C4CC] text-[#0B1B3D] rounded-full px-7 py-3 mx-auto font-bold text-[14px] hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,196,204,0.4)] hover:shadow-[0_0_30px_rgba(0,196,204,0.7)] hover:-translate-y-0.5 transition-all duration-200 relative z-10"
            >
              Talk to an expert
            </SmartLink>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          K · MINIMAL FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="py-4 bg-white" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
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
