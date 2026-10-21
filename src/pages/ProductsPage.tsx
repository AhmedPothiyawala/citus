import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import {
  IconShield,
  IconNetwork,
  IconCpu,
  IconServer,
  IconCloud,
  IconArrowRight,
  IconCheck,
} from '../components/Icons';

export const ProductsPage: React.FC = () => {
  const productCategories = [
    {
      id: 'e2e-security',
      title: 'E2E SECURITY',
      subtitle: 'Positive Firewall & Zero-Trust Defense',
      desc: 'As the technology required to run your business evolves, so does the volume and complexity of threats against it. Our robust security portfolio shields your cloud workloads, core infrastructure, and edge perimeter with proactive DDoS mitigation, Deep Packet Inspection (DPI), and AI-driven intrusion prevention.',
      highlights: [
        'Positive Firewall security solution',
        'Multi-Gigabit Anti-DDoS attack mitigation',
        'Granular Deep Packet Inspection (DPI) & traffic shaping',
        'Next-Gen Web Application Firewall (WAF) protection',
      ],
      icon: IconShield,
      link: LINKS.securitySolutions,
    },
    {
      id: 'networking',
      title: 'NETWORKING',
      subtitle: 'Carrier Routers, OLT, ONT, ONU & High-Density Switches',
      desc: 'Innovative technologies drive business performance today, and it’s the network that powers this digital age. Our carrier-grade switches and routers connect data centers, metro access rings, and regional backbones with wire-speed IP MPLS routing and automated SD-WAN overlay fabrics.',
      highlights: [
        'High-density 100G / 400G spine-leaf data center switches',
        'IP/MPLS carrier edge & aggregation routers',
        'Software-Defined WAN (SD-WAN) orchestration',
        'Optical DWDM transmission & metro interconnects',
      ],
      icon: IconNetwork,
      link: LINKS.networking,
    },
    {
      id: 'wireless-4g-5g',
      title: 'WIFI & 4G / 5G CORE',
      subtitle: 'Next-Generation Wireless & Private Cellular',
      desc: 'There’s a wide range of 4G/5G Core Products which provide service management and control of 4G/5G services. We deliver carrier-grade indoor and outdoor WiFi 6/6E access points alongside disaggregated private 5G RAN and standalone 5G core elements.',
      highlights: [
        'High-density Enterprise & Outdoor WiFi Access Points',
        '4G / 5G vRAN disaggregated radio infrastructure',
        'Private 5G for campus, mining, and industrial automation',
        'Cloud-native 5G user plane function (UPF) acceleration',
      ],
      icon: IconCpu,
      link: LINKS.industryApplications,
    },
    {
      id: 'fttx',
      title: 'FTTX (OLT & ONT)',
      subtitle: 'Optical Line Terminals & Optical Network Terminals',
      desc: 'Broadband delivery requires flexible, modular, and high-density GPON/XGS-PON optical distribution. We supply carrier-tested OLT chassis, modular PON cards, and cost-effective ONUs/ONTs backed by on-ground staging and rapid field support pan-India.',
      highlights: [
        'High-density Optical Line Terminals (OLT) with redundant power',
        'Multi-port Optical Network Terminals (ONT) with dual-band WiFi',
        'XGS-PON 10G symmetrical optical access platforms',
        'Comprehensive passive optical network (PON) accessories',
      ],
      icon: IconServer,
      link: LINKS.fttx,
    },
  ];

  return (
    <div>
      <PageHero
        title="Products &amp; Solutions"
        subtitle="End-to-end security, networking, wireless, and optical solutions engineered for high performance."
        breadcrumbs={[{ label: 'Solutions' }, { label: 'Products' }]}
      />

      {/* Main Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Product Portfolio"
            title="Engineered for Scalability &amp; Resilience"
            subtitle="Explore our comprehensive range of carrier-grade networking hardware, optical distribution systems, and security suites."
          />

          <div className="space-y-12">
            {productCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={cat.id}
                  className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs card-hover-lift"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-sky-100 text-[#166fb0]">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                            {cat.subtitle}
                          </span>
                          <h3 className="text-2xl font-bold text-slate-900">{cat.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {cat.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {cat.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                            <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <SmartLink
                          to={cat.link}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-all"
                        >
                          <span>Explore Detailed Specifications</span>
                          <IconArrowRight className="w-4 h-4" />
                        </SmartLink>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 flex justify-center ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm w-full max-w-sm text-center">
                        <div className="w-20 h-20 rounded-2xl bg-sky-50 text-[#166fb0] flex items-center justify-center mx-auto mb-4">
                          <IconComp className="w-10 h-10" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{cat.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">Multi-Vendor OEM Tested &amp; Certified</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-around text-xs font-semibold text-slate-600">
                          <div>Carrier-Grade</div>
                          <div>•</div>
                          <div>Turnkey SLA</div>
                          <div>•</div>
                          <div>Made in India</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Deep Dive Navigation Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Solutions Hub"
            title="Specialized Solutions Suites"
            subtitle="Browse detailed architectural solutions tailored for telecom, cable, enterprise, and cloud environments."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SmartLink
              to={LINKS.networking}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs card-hover-lift block group"
            >
              <IconNetwork className="w-8 h-8 text-[#166fb0] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#166fb0]">
                Networking &amp; SD-WAN
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Routers, switches, and software-defined network management.
              </p>
            </SmartLink>

            <SmartLink
              to={LINKS.fttx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs card-hover-lift block group"
            >
              <IconCpu className="w-8 h-8 text-[#166fb0] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#166fb0]">
                FTTX &amp; Optical Fiber
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                GPON, point-to-point, OLT and ONT deployments nationwide.
              </p>
            </SmartLink>

            <SmartLink
              to={LINKS.serverStorage}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs card-hover-lift block group"
            >
              <IconServer className="w-8 h-8 text-[#166fb0] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#166fb0]">
                Server &amp; Storage
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Mission-critical enterprise compute fabrics with Dell &amp; HPE.
              </p>
            </SmartLink>

            <SmartLink
              to={LINKS.dataCenterCloud}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs card-hover-lift block group"
            >
              <IconCloud className="w-8 h-8 text-[#166fb0] mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#166fb0]">
                Data Center &amp; Cloud
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Facility engineering, workload migrations, and hybrid operating models.
              </p>
            </SmartLink>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
