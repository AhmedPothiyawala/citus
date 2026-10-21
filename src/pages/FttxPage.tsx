import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconCpu, IconServer, IconShield, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const FttxPage: React.FC = () => {
  const advantages = [
    {
      title: 'Simple and Quick Product Installations',
      desc: 'CitiusComm’s products are designed for easy installation. The system is designed to reduce the total cost of installation and ownership through plug-and-play architecture, automated provisioning, and modular field components.',
      icon: IconCpu,
    },
    {
      title: 'Flexible Range of Products',
      desc: 'The CitiusComm product portfolio covers a diverse range of scenarios — from GPON, XGS-PON, Point-to-Point, to optical fiber distribution panels, splitters, outdoor fiber enclosures, and indoor multi-gigabit ONUs.',
      icon: IconServer,
    },
    {
      title: 'On-ground Local Support',
      desc: 'CitiusComm products and solutions are supported by strong on-ground intelligence and support pan India. Our nationwide logistics and technical network allows us to deliver rapid staging, local spares buffering, and round-the-clock field engineering.',
      icon: IconShield,
    },
  ];

  const specs = [
    'Carrier-grade GPON & 10G XGS-PON Optical Line Terminals (OLT)',
    'High-split ratio architecture supporting up to 1:128 subscribers per PON port',
    'Indoor & Outdoor Optical Network Units (ONU/ONT) with dual-band WiFi 6',
    'Pre-connectorized fiber terminals for accelerated drop-cable rollouts',
    'Centralized Element Management System (EMS) with TR-069 support',
    'Redundant power supply units, uplink modules, and hot-swappable fan trays',
  ];

  return (
    <div>
      <PageHero
        title="FTTX (Fiber to the X)"
        subtitle="Turnkey optical broadband access solutions empowering carriers and ISPs with high-density, low-latency gigabit connectivity."
        backgroundImage="/images/FTTX.jpg"
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'FTTX' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Optical Access"
                title="Building Ultra-Reliable High-Speed Fiber Networks"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                In today’s interconnected world, connectivity is even more vital. Our products and solutions contribute to the development of this network by helping build ultra-reliable, high-capacity fiber broadband access.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether deploying greenfield FTTH for thousands of residential communities or upgrading existing cable MSO networks with high-density fiber overlays, CITIUSCOMM provides the entire passive and active optical ecosystem from OLTs to ONTs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {specs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <SmartLink
                  to={LINKS.contact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>Inquire for FTTX Solutions</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/FTTX.jpg"
                  alt="FTTX Fiber Deployment"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xl font-bold">End-to-End FTTX Architecture</div>
                  <div className="text-xs text-sky-200 mt-1">OLT • Splitters • Enclosures • ONTs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Advantages Cards */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="The CITIUSCOMM Advantage"
            title="Why Operators Choose Our FTTX Solutions"
            subtitle="Engineered for speed of rollout, low operational expenditure, and long-term network reliability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv) => {
              const IconComp = adv.icon;
              return (
                <div
                  key={adv.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/80 card-hover-lift flex flex-col"
                >
                  <div className="w-14 h-14 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center mb-6">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
