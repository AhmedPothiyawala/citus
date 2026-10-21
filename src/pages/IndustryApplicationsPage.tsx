import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconNetwork, IconCpu, IconBuilding, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const IndustryApplicationsPage: React.FC = () => {
  const telecomOfferings = [
    'Router and Switches',
    'Core/Backbone DWDM Solution',
    'Network Security',
    'Servers/Storage',
    'Cloud Computing',
    'AI/ML Solutions',
    'Wireless Solutions (4G/5G vRAN)',
    'OSS/BSS Integration',
    'NOC Infrastructure',
    'Network Automation',
    'Managed Services',
  ];

  const cableBroadbandOfferings = [
    'FTTX & GPON/XGS-PON',
    'Wireless Solutions & WiFi 6',
    'IP MPLS Routing and Switching',
    'OSS/BSS Subscriber Billing',
    'CPE Devices – DVB, IPTV, STB/Dongle',
    'Android TV / AOSP Platforms',
    'Digital Headend & Broadcast Solutions',
    'IPTV/OTT, DRM Security Solutions',
    'Optical Networking and Transport Solutions',
  ];

  const enterpriseGovOfferings = [
    'Private 5G Solutions for Industry 4.0',
    'Router and Switches',
    'Core/Backbone DWDM Solution',
    'Security & Network Security',
    'Servers/Storage Compute Fabrics',
    'Cloud Computing & Hybrid DC',
    'AI/ML Workload Platforms',
    'WIFI Solutions (High-Density Campus)',
    'OSS/BSS & Inventory Management',
    'Remote Connectivity Solutions',
    'NOC/SOC Infrastructure',
    'OPEX Based Solutions',
    'IoT Solutions & Smart Surveillance',
    'Network Automation & Orchestration',
    'Managed Services with Pan-India SLAs',
  ];

  return (
    <div>
      <PageHero
        title="Industry Applications"
        subtitle="Domain-specific technology architectures delivering transformative reliability for telecom, cable, enterprise, and government networks."
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Industry Applications' }]}
      />

      {/* Main Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <SectionTitle
            badge="Target Sectors"
            title="Tailored Solutions Across High-Impact Verticals"
            subtitle="Engineered to meet the exact regulatory, throughput, and operational demands of critical network operators."
          />

          {/* 1. TELECOM Vertical */}
          <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs card-hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#166fb0] text-xs font-bold uppercase tracking-wider">
                  <IconNetwork className="w-4 h-4" />
                  <span>Vertical 01</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">TELECOM</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Supporting national and multinational mobile operators with virtualized RAN, carrier core IP/MPLS routing, ultra-dense DWDM optical backbones, and round-the-clock managed NOC operations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {telecomOfferings.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <SmartLink
                    to={LINKS.contact}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-all"
                  >
                    <span>Consult With Telecom Architects</span>
                    <IconArrowRight className="w-4 h-4" />
                  </SmartLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/images/Telecom.png"
                    alt="Telecom Vertical Architecture"
                    className="w-full h-72 sm:h-80 object-contain p-6 bg-white"
                  />
                  <div className="bg-[#0b1f33] p-4 text-center text-white text-xs font-semibold">
                    Turnkey vRAN • Core Routing • 24x7 Carrier NOC
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CABLE AND BROADBAND Vertical */}
          <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs card-hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/images/CABLE-AND-BROADBAND.jpg"
                    alt="Cable and Broadband Solutions"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="bg-[#0b1f33] p-4 text-center text-white text-xs font-semibold">
                    FTTX • Digital Headends • Android TV / IPTV / OTT
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#166fb0] text-xs font-bold uppercase tracking-wider">
                  <IconCpu className="w-4 h-4" />
                  <span>Vertical 02</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">CABLE AND BROADBAND</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Empowering MSOs and independent ISPs across India with turnkey FTTX rollouts, IP MPLS switching, digital broadcast headends, IPTV/OTT video platforms, and high-performance Android TV smart dongles.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {cableBroadbandOfferings.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <SmartLink
                    to={LINKS.contact}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-all"
                  >
                    <span>Connect for Broadband Architecture</span>
                    <IconArrowRight className="w-4 h-4" />
                  </SmartLink>
                </div>
              </div>
            </div>
          </div>

          {/* 3. ENTERPRISE, DATA CENTER, GOVERNMENT */}
          <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs card-hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#166fb0] text-xs font-bold uppercase tracking-wider">
                  <IconBuilding className="w-4 h-4" />
                  <span>Vertical 03</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  ENTERPRISE, DATA CENTER, GOVERNMENT
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Deploying mission-critical private 5G networks, campus WiFi fabrics, sovereign cloud facilities, IoT sensor telemetry, and zero-trust perimeter cybersecurity for enterprises and public sector undertakings.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {enterpriseGovOfferings.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <SmartLink
                    to={LINKS.contact}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-all"
                  >
                    <span>Request Enterprise Proposal</span>
                    <IconArrowRight className="w-4 h-4" />
                  </SmartLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/images/Enterprise.jpg"
                    alt="Enterprise and Government Networks"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="bg-[#0b1f33] p-4 text-center text-white text-xs font-semibold">
                    Private 5G • DWDM Core • Smart City &amp; PSU Infrastructure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
