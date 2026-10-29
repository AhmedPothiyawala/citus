import React, { useState, useEffect, useRef } from 'react';
import { SmartLink } from '../components/SmartLink';
import { LINKS, PARTNERS_LIST, CLIENTS_LIST } from '../data/site';

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

/* ── SOLUTIONS & FOCUS VERTICALS (from the existing site content) ── */
const HOME_SOLUTIONS = [
  { title: 'Networking', href: LINKS.networking, image: '/images/Router-and-Switches-1-1.jpg', desc: 'Switches, routers & SD-WAN solutions' },
  { title: 'FTTX', href: LINKS.fttx, image: '/images/optical-fiber.jpg', desc: 'Fiber-to-the-x, GPON & OLT/ONT deployments' },
  { title: 'Server & Storage', href: LINKS.serverStorage, image: '/images/Servers-and-Storage-1.jpg', desc: 'Enterprise compute & storage infrastructure' },
  { title: 'Security Solutions', href: LINKS.securitySolutions, image: '/images/Firewall-security-solution.jpg', desc: 'DDoS mitigation, DPI & firewall protection' },
  { title: 'Data Center & Cloud', href: LINKS.dataCenterCloud, image: '/images/data-center-cloud.jpg', desc: 'Data center setup, cloud migration & hybrid cloud' },
];

const HOME_VERTICALS = [
  { name: 'Cable & Broadband', icon: '/images/Network-and-Broadband.png' },
  { name: 'Telecom', icon: '/images/Telecom.png' },
  { name: 'Enterprises', icon: '/images/Enterprises.png' },
  { name: 'Data Center and Cloud', icon: '/images/Data-and-Cloud.png' },
  { name: 'Government and PSUs', icon: '/images/Government.png' },
];

/* ── DYNAMIC ROTATING DC CATEGORIES FOR TYPEWRITER ANIMATION ── */
const DC_ROTATING_PHRASES = [
  'Greenfield and Brownfield Projects and Upgrades.',
  'AI Clusters & High-Density GPU Pods.',
  'Hyperscale Campus Scale Deployments.',
  'Retail and Enterprise DC Modernization.',
  'Edge Data Centers & Server Room Expansions.',
];



/* ── Logo marquee: continuous, seamless, pauses on hover / touch ── */
const uniqueByName = <T extends { name: string }>(list: (T | undefined)[]) => {
  const seen = new Set<string>();
  return list.filter((x): x is T => !!x && !seen.has(x.name) && !!seen.add(x.name));
};

const LogoMarquee: React.FC<{ items: { name: string; logo: string }[]; reverse?: boolean }> = ({ items, reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const singleSetWidthRef = useRef<number>(0);

  const posRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);

  // Dragging state
  const isPointerDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollLeftRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const lastPointerTimeRef = useRef<number>(0);
  const velocityXRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const scheduleResume = (delay = 1200) => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
      isPausedRef.current = false;
    }, delay);
  };

  const wrapCheck = () => {
    const el = containerRef.current;
    const W = singleSetWidthRef.current;
    if (!el || W <= 0) return;

    if (el.scrollLeft >= W * 2.2) {
      el.scrollLeft -= W;
    } else if (el.scrollLeft <= W * 0.4) {
      el.scrollLeft += W;
    }
  };

  // Measure single copy width
  useEffect(() => {
    const measure = () => {
      if (firstSetRef.current && containerRef.current) {
        const w = firstSetRef.current.offsetWidth;
        if (w > 0) {
          singleSetWidthRef.current = w;
          if (containerRef.current.scrollLeft === 0) {
            containerRef.current.scrollLeft = reverse ? w * 1.5 : w;
          }
        }
      }
    };

    measure();
    const timer = window.setTimeout(measure, 350);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [items, reverse]);

  // Continuous auto-scroll animation
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const speed = 40; // px/sec

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const el = containerRef.current;
      const W = singleSetWidthRef.current;

      if (!isPausedRef.current && !isInteractingRef.current && el && W > 0) {
        // Keep the exact (fractional) position ourselves. Phones (iOS Safari / Chrome) store
        // scrollLeft as whole pixels, so adding ~0.7px per frame was rounded away to 0 and the
        // forward-moving strip (Technology Partners) never moved. The reverse strip worked only
        // because rounding went the other way.
        if (posRef.current === null || Math.abs(posRef.current - el.scrollLeft) > 2) {
          posRef.current = el.scrollLeft; // user scrolled/swiped: continue from there
        }
        posRef.current += (reverse ? -1 : 1) * speed * dt;
        if (posRef.current >= W * 2.2) posRef.current -= W;
        else if (posRef.current <= W * 0.4) posRef.current += W;
        el.scrollLeft = Math.round(posRef.current);
      } else {
        posRef.current = null;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [reverse]);

  // Wheel listener: enables cursor wheel horizontal scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only a sideways gesture (trackpad swipe or Shift + wheel) moves the logos.
      // A normal up/down wheel is left alone so the page keeps scrolling both ways.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        isInteractingRef.current = true;
        scheduleResume(1400);
        wrapCheck();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Desktop Pointer drag events for mouse cursor drag-to-scroll
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle mouse on desktop — let touch devices use native smooth touch scroll!
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;

    isPointerDownRef.current = true;
    isInteractingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityXRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !isPointerDownRef.current || !containerRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - startXRef.current;

    if (Math.abs(deltaX) > 4) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
    }

    const now = performance.now();
    const dt = now - lastPointerTimeRef.current;
    if (dt > 8) {
      velocityXRef.current = (currentX - lastPointerXRef.current) / dt;
      lastPointerXRef.current = currentX;
      lastPointerTimeRef.current = now;
    }

    const W = singleSetWidthRef.current;
    let nextSl = startScrollLeftRef.current - deltaX;
    if (W > 0) {
      if (nextSl >= W * 2.2) {
        nextSl -= W;
        startScrollLeftRef.current -= W;
      } else if (nextSl <= W * 0.4) {
        nextSl += W;
        startScrollLeftRef.current += W;
      }
    }
    containerRef.current.scrollLeft = nextSl;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (_) {}

    setIsDragging(false);

    // Apply inertia glide
    const v = velocityXRef.current;
    if (Math.abs(v) > 0.15 && containerRef.current) {
      let currentV = v * 14;
      const decay = () => {
        if (!containerRef.current || Math.abs(currentV) < 0.2 || isPointerDownRef.current) {
          scheduleResume(1200);
          return;
        }
        containerRef.current.scrollLeft -= currentV;
        wrapCheck();
        currentV *= 0.92;
        requestAnimationFrame(decay);
      };
      requestAnimationFrame(decay);
    } else {
      scheduleResume(1200);
    }
  };

  // Mobile Touch handlers: pause auto-scroll during finger touch and resume when lifted
  const handleTouchStart = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    scheduleResume(1500);
  };

  const handleScrollBy = (offset: number) => {
    const el = containerRef.current;
    if (!el) return;
    isInteractingRef.current = true;
    el.scrollBy({ left: offset, behavior: 'smooth' });
    scheduleResume(2000);
  };

  return (
    <div className="relative group/marquee w-full home-reveal stagger-1">
      {/* Left scroll chevron */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => handleScrollBy(-320)}
        className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#0B1B3D] hover:text-white hover:bg-[#0B1B3D] hover:border-[#0B1B3D] items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg className="w-5 h-5 -translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right scroll chevron */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => handleScrollBy(320)}
        className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 text-[#0B1B3D] hover:text-white hover:bg-[#0B1B3D] hover:border-[#0B1B3D] items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
      >
        <svg className="w-5 h-5 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrollable Marquee Container */}
      <div
        ref={containerRef}
        onScroll={wrapCheck}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClickCapture={(e) => {
          if (hasMovedRef.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onMouseEnter={() => {
          // Only pause on mouse hover if the device actually supports hover (not mobile touch)
          if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
            isPausedRef.current = true;
          }
        }}
        onMouseLeave={() => {
          if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
            if (!isPointerDownRef.current) {
              scheduleResume(600);
            }
          }
        }}
        className={`relative z-[2] w-full overflow-x-auto select-none pt-4 pb-3 touch-pan-x touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
          maskImage:
            'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
        }}
      >
        <div className="flex w-max">
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? firstSetRef : undefined}
              className="flex shrink-0"
              aria-hidden={copy > 0 ? true : undefined}
            >
              {items.map((item) => (
                <div
                  key={`${copy}-${item.name}`}
                  className="w-[150px] sm:w-[180px] lg:w-[200px] shrink-0 mx-2 md:mx-2.5 flex flex-col items-center group"
                >
                  <div className="logo-tile w-full bg-white rounded-2xl p-2 flex items-center justify-center aspect-square border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-[0_10px_24px_rgba(11,27,61,0.12)] hover:-translate-y-2 overflow-hidden">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={copy === 0 ? item.name : ''}
                        className="w-full h-full object-contain scale-[1.18] group-hover:scale-[1.26] transition-transform duration-300 select-none pointer-events-none mix-blend-multiply"
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      // No official logo file yet: show the company name cleanly instead of a stock photo
                      <span className="px-3 text-center text-[17px] md:text-[19px] font-bold leading-tight text-[#0B1B3D]">
                        {item.name}
                      </span>
                    )}
                  </div>
                  <span className="text-[#0B1B3D] text-[13px] md:text-[14px] font-semibold text-center mt-2.5 group-hover:text-[#2563EB] transition-colors line-clamp-1 tracking-wide">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  // Hero graph: stretch horizontally to fill the box without growing taller
  const graphBoxRef = useRef<HTMLDivElement>(null);
  const [gk, setGk] = useState(1);
  useEffect(() => {
    const el = graphBoxRef.current;
    if (!el || typeof window === 'undefined') return;
    const BASE = 1172 / 476;
    const update = () => {
      const W = el.clientWidth;
      if (!W) return;
      const capH = Math.max(680, (window.innerHeight - 250) * 2.44) / BASE;
      const H = Math.min(W / BASE, capH);
      const k = Math.max(1, Math.min(2.2, W / H / BASE));
      setGk((prev) => (Math.abs(prev - k) > 0.005 ? k : prev));
    };
    update();
    const ro = 'ResizeObserver' in window ? new ResizeObserver(update) : null;
    ro?.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);
  const gx = (x: number) => 75 + (x - 75) * gk;
  const viewBoxW = Math.round(gx(1097) + 75);
  const stretchPath = (d: string) =>
    d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (_m, x, y) => `${gx(parseFloat(x)).toFixed(1)} ${y}`);
  const [_mobileSubmenu] = useState<string | null>(null);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  // Graph sequential animation: loops continuously while in viewport
  const graphSvgRef = useRef<HTMLDivElement>(null);
  const [graphAnimated, setGraphAnimated] = useState(false);
  useEffect(() => {
    const el = graphSvgRef.current;
    if (!el || typeof window === 'undefined') return;

    let loopActive = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearTimers = () => timers.splice(0).forEach(t => clearTimeout(t));

    const startLoop = () => {
      if (loopActive) return;
      loopActive = true;

      const cycle = () => {
        if (!loopActive) return;
        // Phase 1: animate in
        // Last element (card-4) appears at ~3.09s + 0.4s fade = 3.49s.
        // Hold fully-visible for another 1.5s → total on-phase = 5 000ms
        setGraphAnimated(true);
        const t1 = setTimeout(() => {
          if (!loopActive) return;
          // Phase 2: instant reset then short pause before next cycle
          setGraphAnimated(false);
          const t2 = setTimeout(() => { if (loopActive) cycle(); }, 500);
          timers.push(t2);
        }, 6500);
        timers.push(t1);
      };

      cycle();
    };

    const stopLoop = () => {
      loopActive = false;
      clearTimers();
      setGraphAnimated(false);
    };

    if (!('IntersectionObserver' in window)) {
      startLoop();
      return stopLoop;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.10 }
    );
    obs.observe(el);
    return () => { stopLoop(); obs.disconnect(); };
  }, []);


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
          // Replays every time: fades up when it comes into view (scrolling down or back up),
          // resets once it has fully left the screen.
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12) {
            entry.target.classList.add('revealed');
          } else if (!entry.isIntersecting) {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold: [0, 0.12],
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
          B · FIRST PAGE HERO: 2-LINE HEADLINE + FULL CAPACITY GRAPH
      ═══════════════════════════════════════════════════ */}
      <section className="hero-aurora relative min-h-0 flex flex-col justify-start pt-5 sm:pt-6 md:pt-7 pb-3 sm:pb-4 md:pb-5 overflow-hidden">
        {/* Animated network background across the whole hero */}
        <div className="hero-aurora-blobs absolute inset-0 pointer-events-none" aria-hidden="true" />
        {/* Background: clean spotlight + a 3D perspective "data floor" grid that glides toward the viewer */}
        <div className="hero-floor absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="hero-spot" />
          <div className="hero-floor-plane"><div className="hero-floor-grid" /></div>
          <div className="hero-horizon" />
        </div>
        {/* Eyebrow & 2-Line Headline at Top */}
        <div className="relative z-[1] w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 shrink-0">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
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
        <div className="relative z-[1] w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 min-h-0 flex flex-col items-center justify-start mt-1 md:mt-1">
          <div className="w-full flex items-center justify-center overflow-visible select-none">
            <div ref={graphBoxRef} className="hero-graph-box relative w-full max-w-none flex items-center justify-center shrink-0 mx-auto">
              {/* Sequential animation wrapper — observes viewport entry */}
              <div ref={graphSvgRef} className={`w-full graph-simple${graphAnimated ? ' graph-animated' : ''}`}>
              {/* Desktop Inside-Graph Hardware Line & Action Buttons */}
              <div
                className="graph-overlay hidden md:flex flex-col items-start absolute z-20 pointer-events-auto"
                style={{ top: '6%', left: `${((75 + 18) / viewBoxW) * 100}%`, width: '40%', maxWidth: '520px' }}
              >
                <p className="graph-overlay-text text-slate-600 font-medium">
                  Hardware supply, integration and managed services for data centers of every size, from edge rooms to hyperscale campuses.
                </p>
                <div className="graph-overlay-actions flex items-center">
                  <SmartLink
                    to={LINKS.contact}
                    className="graph-overlay-btn inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Explore Services
                  </SmartLink>
                  <SmartLink
                    to={LINKS.contact}
                    className="graph-overlay-btn inline-flex items-center justify-center border border-slate-300 text-slate-800 bg-white rounded-lg font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-sm hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Talk to an expert
                  </SmartLink>
                </div>
              </div>

              <svg
                viewBox={`0 24 ${viewBoxW} 476`}
                className="w-full h-auto block select-none overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="curveGrad" x1={gx(180)} y1="0" x2={gx(1020)} y2="0" gradientUnits="userSpaceOnUse">
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
                  d={stretchPath("M 180 340 C 285 313, 315 300, 390 286 C 495 260, 525 248, 600 233 C 705 206, 735 192, 810 178 C 915 152, 945 138, 1020 125 L 1020 430 L 180 430 Z")}
                  fill="url(#curveFill)"
                  className="graph-fill-draw"
                />

                {/* Y axis */}
                <line x1="75" y1="45" x2="75" y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points="75,38 71,48 79,48" fill="#64748B" />
                <text x="32" y="238" transform="rotate(-90, 32, 238)" fill="#5A6578" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="1.5" textAnchor="middle">
                  Offering
                </text>

                {/* X axis */}
                <line x1="75" y1="430" x2={gx(1090)} y2="430" stroke="#94A3B8" strokeWidth="1.5" />
                <polygon points={`${gx(1097)},430 ${gx(1087)},426 ${gx(1087)},434`} fill="#64748B" />

                {/* Vertical drop dashed grid lines from each point to X axis */}
                {CAPACITY_TIERS.map((tier) => (
                  <line
                    key={`grid-${tier.index}`}
                    x1={gx(tier.x)}
                    y1={tier.y}
                    x2={gx(tier.x)}
                    y2="430"
                    stroke={tier.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className={`graph-dropline graph-dropline-${tier.index}`}
                  />
                ))}
                {/* Dynamic Illuminated Glowing Base Curve — segment-by-segment draw */}
                {/* Seg 0: P0 → P1 */}
                <path
                  d={stretchPath("M 180 340 C 285 313, 315 300, 390 286")}
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-curve-pulse graph-seg graph-seg-0"
                />
                {/* Seg 1: P1 → P2 */}
                <path
                  d={stretchPath("M 390 286 C 495 260, 525 248, 600 233")}
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-curve-pulse graph-seg graph-seg-1"
                />
                {/* Seg 2: P2 → P3 */}
                <path
                  d={stretchPath("M 600 233 C 705 206, 735 192, 810 178")}
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-curve-pulse graph-seg graph-seg-2"
                />
                {/* Seg 3: P3 → P4 */}
                <path
                  d={stretchPath("M 810 178 C 915 152, 945 138, 1020 125")}
                  stroke="url(#curveGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-curve-pulse graph-seg graph-seg-3"
                />

                {/* Curve Optical Data Flow: continuous gliding white-cyan packet stream */}
                <path
                  d={stretchPath("M 180 340 C 285 313, 315 300, 390 286 C 495 260, 525 248, 600 233 C 705 206, 735 192, 810 178 C 915 152, 945 138, 1020 125")}
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="curve-flow graph-flow"
                  style={{
                    filter: 'drop-shadow(0 0 3px #22D3EE) drop-shadow(0 0 7px rgba(34, 211, 238, 0.85))',
                    pointerEvents: 'none',
                  }}
                />

                {/* Direction arrows just before each tier point */}
                {CAPACITY_TIERS.slice(1).map((tier, i) => {
                  // tangent of the curve as it arrives at this point (from its last control point)
                  const ctrl = [[315, 300], [525, 248], [735, 192], [945, 138]][i];
                  const ang = (Math.atan2(tier.y - ctrl[1], gx(tier.x) - gx(ctrl[0])) * 180) / Math.PI;
                  const back = 22;
                  const rad = (ang * Math.PI) / 180;
                  const ax = gx(tier.x) - Math.cos(rad) * back;
                  const ay = tier.y - Math.sin(rad) * back;
                  return (
                    <g key={`arrow-${tier.index}`} transform={`translate(${ax} ${ay}) rotate(${ang})`} style={{ pointerEvents: 'none' }} className="graph-flow">
                      <g className="curve-arrow" style={{ animationDelay: `${i * 0.25}s` }}>
                        <path d="M -7 -6 L 3 0 L -7 6" fill="none" stroke={tier.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M -14 -6 L -4 0 L -14 6" fill="none" stroke={tier.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                      </g>
                    </g>
                  );
                })}

                {/* Annotations above the curve */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <text
                      key={`annotation-${tier.index}`}
                      x={gx(tier.x)}
                      y={tier.annotationY}
                      fill={isHovered ? '#0B1B3D' : '#5A6578'}
                      fontWeight={isHovered ? '600' : '400'}
                      fontSize="10"
                      fontFamily="Inter, sans-serif"
                      textAnchor="middle"
                      className={`graph-annotation graph-annotation-${tier.index}`}
                      style={{ transition: 'fill 0.2s ease, font-weight 0.2s ease', pointerEvents: 'none' }}
                    >
                      {tier.annotationLines.map((line, li) => (
                        <tspan key={li} x={gx(tier.x)} dy={li === 0 ? 0 : 13}>
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
                      className={`cursor-pointer graph-card graph-card-${tier.index}`}
                      onMouseEnter={() => setHoveredTier(tier.index)}
                      onMouseLeave={() => setHoveredTier(null)}
                      onClick={() => setHoveredTier(hoveredTier === tier.index ? null : tier.index)}
                      style={{
                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                        filter: isHovered
                          ? `drop-shadow(0 10px 18px rgba(11, 27, 61, 0.28)) drop-shadow(0 0 10px ${tier.color}77)`
                          : 'drop-shadow(0 2px 4px rgba(11, 27, 61, 0.08))',
                      }}
                    >
                      <rect x={gx(tier.x) - tier.boxW / 2} y={tier.boxY} width={tier.boxW} height={tier.boxH} rx="6" fill="#0B1B3D" />
                      <rect
                        x={gx(tier.x) - tier.boxW / 2}
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
                      <text x={gx(tier.x)} y={tier.boxY + 20} fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
                        {tier.boxLines.map((line, li) => (
                          <tspan key={li} x={gx(tier.x)} dy={li === 0 ? 0 : 14}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {/* Circle Points on Curve + Expanding Concentric Radar Rings */}
                {/* Circle Points on Curve + Expanding Concentric Radar Rings */}
                {CAPACITY_TIERS.map((tier) => {
                  const isHovered = hoveredTier === tier.index;
                  return (
                    <g
                      key={`point-${tier.index}`}
                      className={`cursor-pointer graph-point graph-point-${tier.index}`}
                      onMouseEnter={() => setHoveredTier(tier.index)}
                      onMouseLeave={() => setHoveredTier(null)}
                      onClick={() => setHoveredTier(hoveredTier === tier.index ? null : tier.index)}
                    >
                      {/* Concentric animated radar rings */}
                      <circle
                        cx={gx(tier.x)}
                        cy={tier.y}
                        r="5.5"
                        stroke={tier.color}
                        fill="none"
                        className="signal-ring"
                      />
                      <circle
                        cx={gx(tier.x)}
                        cy={tier.y}
                        r="5.5"
                        stroke={tier.color}
                        fill="none"
                        className="signal-ring-2"
                      />

                      {/* Static / hover halo */}
                      <circle
                        cx={gx(tier.x)}
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
                        cx={gx(tier.x)}
                        cy={tier.y}
                        r={isHovered ? 7 : 5.5}
                        fill="white"
                        stroke={tier.color}
                        strokeWidth={isHovered ? 3 : 2.5}
                        style={{ transition: 'all 0.25s ease' }}
                      />
                      {/* Center dot */}
                      <circle
                        cx={gx(tier.x)}
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
                      className={`cursor-pointer graph-pill graph-pill-${tier.index}`}
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
                        x={gx(tier.x) - tier.pillW / 2}
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
                        x={gx(tier.x)}
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

                {/* X axis Title: Centered exactly at the middle of the X-axis line */}
                <text x={Math.round(viewBoxW / 2)} y="490" fill="#5A6578" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif" textAnchor="middle">
                  Size (capacity)
                </text>
              </svg>
              </div>{/* end graph-animated wrapper */}
            </div>
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
          C.2 · WHO WE ARE (from the company profile)
      ═══════════════════════════════════════════════════ */}
      <section className="section-bg section-bg-calm pt-10 md:pt-16 pb-10 md:pb-14">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Stacked photos with depth */}
            <div className="home-reveal relative w-full max-w-[520px] aspect-[520/500] mx-auto lg:mx-0">
              <div className="absolute top-0 left-0 w-[72%] aspect-square rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <img src="/images/home-about-02.jpg" alt="CITIUSCOMM technology team" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="tilt-3d absolute bottom-0 right-0 w-[64%] aspect-square rounded-3xl overflow-hidden shadow-[0_30px_70px_-20px_rgba(11,27,61,0.45)] ring-4 ring-white" data-tilt-max="10">
                <img src="/images/home-about-01.jpg" alt="Carrier-grade network infrastructure" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute left-[6%] bottom-[8%] float-badge rounded-2xl bg-[#0B1B3D] text-white px-4 py-3 shadow-2xl border border-white/10">
                <p className="text-[11px] uppercase tracking-wider text-[#00C4CC] font-bold">Technology Aggregator</p>
                <p className="text-[14px] font-semibold leading-tight mt-0.5">Carrier-grade solutions</p>
              </div>
            </div>

            {/* Story */}
            <div className="home-reveal stagger-2">
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
                WHO WE ARE
              </p>
              <h2 className="text-[26px] md:text-[32px] lg:text-[40px] font-bold leading-[1.15] mb-5" style={{ color: C.headline }}>
                Keeping You{' '}
                <span className="bg-gradient-to-r from-[#008B94] via-[#0E7490] to-[#2563EB] bg-clip-text text-transparent">One Step Ahead</span>
              </h2>
              <p className="text-[15px] md:text-[16px] leading-[27px] mb-4" style={{ color: C.body }}>
                <strong className="text-[#0B1B3D]">&ldquo;CITIUSCOMM&rdquo; a Multi-National Company</strong>, is the fastest growing Technology Aggregator and <strong className="text-[#0B1B3D]">offers carrier-grade solutions</strong> for the dynamically developing <strong className="text-[#0B1B3D]">Communications and Networking Industry</strong>.
              </p>
              <p className="text-[15px] md:text-[16px] leading-[27px] mb-6" style={{ color: C.body }}>
                CITIUSCOMM is providing E2E bespoke turnkey solutions which include:
              </p>
              <div className="grid grid-cols-2 gap-3 mb-7">
                {['Product', 'Service Delivery', 'NOC Operations', 'Project Management'].map((pillar, i) => (
                  <div
                    key={pillar}
                    className={`home-reveal stagger-${i + 1} glow-border flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm`}
                    style={{ border: `1px solid ${C.border}` }}
                  >
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-[#00C4CC] to-[#2563EB] text-white flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[14px] font-semibold" style={{ color: C.headline }}>{pillar}</span>
                  </div>
                ))}
              </div>
              <SmartLink
                to={LINKS.companyProfile}
                className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: C.navy }}
              >
                Know more about us
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </SmartLink>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          C.3 · SOLUTIONS (links to every solution page)
      ═══════════════════════════════════════════════════ */}
      <section className="section-bg section-bg-calm pt-10 md:pt-14 pb-8 md:pb-12">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6 md:mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
                OUR SOLUTIONS
              </p>
              <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2]" style={{ color: C.headline }}>
                Solutions
              </h2>
            </div>
            <SmartLink to={LINKS.products} className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0E7490] hover:text-[#2563EB]">
              View all products
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </SmartLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
            {HOME_SOLUTIONS.map((sol, idx) => (
              <SmartLink
                key={sol.title}
                to={sol.href}
                className={`solution-card tilt-3d group relative block overflow-hidden rounded-2xl h-[240px] md:h-[300px] home-reveal stagger-${(idx % 3) + 1} ${
                  idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
                }`}
                data-tilt-max="6"
              >
                <img
                  src={sol.image}
                  alt={sol.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f24]/95 via-[#0B1B3D]/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C4CC]/0 to-[#2563EB]/0 group-hover:from-[#00C4CC]/20 group-hover:to-[#6366F1]/25 transition-colors duration-500" />
                <div className="absolute left-5 right-5 bottom-5 md:left-6 md:bottom-6 text-white">
                  <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7FF3F7] mb-2.5 border border-white/15">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[20px] md:text-[22px] font-bold leading-tight">{sol.title}</h3>
                  <p className="text-[13px] leading-[19px] text-slate-200/90 mt-1.5 max-w-[360px] max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">
                    {sol.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00C4CC]">
                    Read more
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          D · SUPPORT FOR EVERY BUSINESS MODEL
      ═══════════════════════════════════════════════════ */}
      <section className="section-bg section-bg-calm pt-8 md:pt-12 pb-5 md:pb-8">
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
                className={`card-hover-cool tilt-3d glow-border group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${(idx % 4) + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                {/* Glowing subtle gradient top border on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 z-[2] bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#6366F1] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <h3 className="text-[17px] md:text-[18px] font-bold mb-2 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                  {model.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-[21px] mb-4" style={{ color: C.body }}>
                  {model.desc}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-2.5" style={{ color: C.teal }}>
                  {model.subLabel}
                </p>
                <ul className="tick-list space-y-1.5">
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
      <section className="section-bg section-bg-calm pt-4 md:pt-6 pb-1">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div
            className="home-reveal-scale card-hover-cool glow-border rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#F3F6FA] via-[#EDF5FB] to-[#F3F6FA]"
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
      <section className="section-bg section-bg-calm pt-5 md:pt-7 pb-8 md:pb-12">
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
              className="card-hover-cool tilt-3d glow-border group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-1" data-tilt-max="5"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 z-[2] bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <h3 className="text-[17px] md:text-[18px] font-bold mb-3 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                Hardware Supply and Integration
              </h3>
              <ul className="tick-list space-y-2">
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
              className="card-hover-cool tilt-3d glow-border group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-2" data-tilt-max="5"
              style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-1 z-[2] bg-gradient-to-r from-[#3B82F6] to-[#6366F1] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <h3 className="text-[17px] md:text-[18px] font-bold mb-3 transition-colors group-hover:text-blue-900" style={{ color: C.headline }}>
                Services
              </h3>
              <ul className="tick-list space-y-2">
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
          F.2 · FOCUS VERTICALS
      ═══════════════════════════════════════════════════ */}
      <section className="section-bg section-bg-calm pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal text-center mb-7 md:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              INDUSTRIES WE SERVE
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2]" style={{ color: C.headline }}>
              Focus Verticals
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {HOME_VERTICALS.map((v, idx) => (
              <SmartLink
                key={v.name}
                to={LINKS.industryApplications}
                className={`vertical-card tilt-3d glow-border group relative flex flex-col items-center text-center rounded-2xl bg-white/90 backdrop-blur px-4 pt-7 pb-6 home-reveal stagger-${(idx % 4) + 1} ${
                  idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                }`}
                style={{ border: `1px solid ${C.border}` }}
              >
                <span className="vertical-icon relative w-[92px] h-[92px] md:w-[104px] md:h-[104px] rounded-full flex items-center justify-center mb-4">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E6FAFB] to-[#EEF2FF] group-hover:from-[#CFF7F9] group-hover:to-[#E0E7FF] transition-colors" />
                  <span className="absolute -inset-1 rounded-full border border-dashed border-[#00C4CC]/40 vertical-ring" />
                  <img src={v.icon} alt="" className="relative w-[56px] h-[56px] md:w-[62px] md:h-[62px] object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </span>
                <h3 className="text-[15px] md:text-[16px] font-bold leading-snug" style={{ color: C.headline }}>{v.name}</h3>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          G · TECHNOLOGY PARTNERS (Same UI as Our Clients: 1 Line, Auto-Scroll, Big Icons)
      ═══════════════════════════════════════════════════ */}
      <section
        id="partners"
        className="spotlight pt-8 pb-6 md:pt-10 md:pb-8 bg-white text-[#0B1B3D] relative overflow-hidden border-b border-slate-100"
      >

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Section Heading */}
          <div className="home-reveal text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5 text-[#0E8F96]">
              MULTI-OEM SOURCING ECOSYSTEM
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-[#0B1B3D] tracking-tight">
              Technology Partners
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00C4CC] to-[#3B82F6] mx-auto mt-2.5 rounded-full" />
          </div>

          {/* Continuous marquee: every logo glides by in one line; pauses on hover */}
          <LogoMarquee items={uniqueByName(partnerSlides.flat())} reverse={false} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          G.1 · OUR CLIENTS (Full Logo & Brand Names Showcase)
      ═══════════════════════════════════════════════════ */}
      <section
        id="clients"
        className="spotlight pt-6 pb-8 md:pt-8 md:pb-10 bg-white text-[#0B1B3D] relative overflow-hidden"
      >

        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Section Heading */}
          <div className="home-reveal text-center mb-6 md:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5 text-[#0E8F96]">
              TRUSTED ACROSS BROADCAST, TELECOM & DATA CENTER NETWORKS
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[38px] font-extrabold text-[#0B1B3D] tracking-tight">
              Our Clients
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#00C4CC] to-[#3B82F6] mx-auto mt-2.5 rounded-full" />
          </div>

          {/* Continuous marquee: every logo glides by in one line; pauses on hover */}
          <LogoMarquee items={uniqueByName(clientSlides.flat())} reverse={false} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          H · FROM REQUIREMENT TO RUNNING
      ═══════════════════════════════════════════════════ */}
      <section className="section-bg section-bg-calm pt-8 md:pt-12 pb-4 md:pb-6">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="home-reveal">
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: C.teal }}>
              HOW IT WORKS
            </p>
            <h2 className="text-[26px] md:text-[32px] lg:text-[36px] font-bold leading-[1.2] mb-4 md:mb-5" style={{ color: C.headline }}>
              From requirement to running
            </h2>
          </div>

          <div className="steps-track home-reveal grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`card-hover-cool tilt-3d glow-border group relative z-[1] rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${idx + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 z-[2] bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#6366F1] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <p
                  className={`step-num step-num-${idx + 1} text-2xl md:text-[34px] font-extrabold mb-2.5`}
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
      <section className="section-bg section-bg-calm pt-4 md:pt-6 pb-8 md:pb-12">
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
                className={`card-hover-cool tilt-3d glow-border group relative rounded-2xl p-5 md:p-6 overflow-hidden home-reveal stagger-${idx + 1}`}
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.border}` }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 z-[2] bg-gradient-to-r from-[#22D3EE] to-[#6366F1] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
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
      <section className="section-bg section-bg-calm pt-6 pb-8 md:pt-8 md:pb-12">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div
            className="spotlight home-reveal-scale rounded-2xl py-8 px-6 md:py-10 md:px-12 text-center bg-[#F3F6FC] text-[#0B1B3D] border border-slate-200 relative overflow-hidden border border-slate-700/60"
          >
            <h2 className="text-[22px] md:text-[30px] font-extrabold leading-[1.2] mb-2 max-w-[560px] mx-auto text-[#0B1B3D] relative z-10">
              Planning your next facility?
            </h2>
            <p className="text-[13px] md:text-[15px] leading-[22px] mb-5 max-w-[520px] mx-auto text-slate-600 relative z-10 font-normal">
              Tell us your capacity and timeline. We will recommend the right system architecture in under a day.
            </p>
            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-full px-7 py-3 mx-auto font-bold text-[14px] hover:bg-[#1A2F5E] shadow-[0_0_20px_rgba(0,196,204,0.4)] hover:shadow-[0_0_30px_rgba(0,196,204,0.7)] hover:-translate-y-0.5 transition-all duration-200 relative z-10"
            >
              Talk to an expert
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  );
};
