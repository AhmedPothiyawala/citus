import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconNetwork, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const NetworkingPage: React.FC = () => {
  const switchFeatures = [
    'Carrier-grade access, aggregation & core IP/MPLS switches',
    'Ultra-low latency 10G / 25G / 100G / 400G line-rate forwarding',
    'Full hardware redundancy with hot-swappable power supplies & fans',
    'Comprehensive Layer 2 / Layer 3 protocol stacks (BGP, OSPF, IS-IS, VXLAN)',
    'Zero-Touch Provisioning (ZTP) and telemetry monitoring',
  ];

  const sdwanBenefits = [
    'Centralized cloud-native orchestration and policy enforcement',
    'Intelligent application-aware dynamic traffic path steering',
    'Zero-trust encrypted IPsec tunnels over broadband, MPLS & 4G/5G',
    'Up to 50% reduction in WAN bandwidth and transport expenses',
    'Unified branch security with integrated next-gen firewall inspection',
  ];

  return (
    <div>
      <PageHero
        title="Networking &amp; SD-WAN"
        subtitle="High-performance switches, carrier routers, and software-defined WAN architectures connecting enterprises and service providers."
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Networking' }]}
      />

      {/* 1. Routers & Switches Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Core Infrastructure"
                title="ROUTER AND SWITCHES"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                CITIUSCOMM is partnered with world-leading OEMs like <strong>Cisco, Juniper, HPE, ZTE, and Huawei</strong> for Network Switches and Routers, delivering best-fit solutions tailored to customer scale and throughput demands.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                From campus access closets to multi-terabit carrier core backbones and data center spine-leaf fabrics, we supply, stage, configure, and maintain end-to-end switching and routing hardware backed by comprehensive warranty and SLA support.
              </p>

              <div className="space-y-3 pt-2">
                {switchFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0">
                      <IconCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <SmartLink
                  to={LINKS.contact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>Request Product Catalog</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
                <SmartLink
                  to={LINKS.partners}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <span>View OEM Partners</span>
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/Router-and-Switches-1-1.jpg"
                  alt="Network Switches and Routers"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-lg font-bold">OEM Certified Integration</div>
                  <div className="text-xs text-sky-200 mt-1">Cisco • Juniper • HPE • ZTE • Huawei</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SD-WAN Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                <div className="w-14 h-14 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center">
                  <IconNetwork className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Next-Gen Software-Defined WAN</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Transform legacy MPLS networks into agile, cloud-ready architectures that intelligently route traffic across any transport link with zero touch and real-time SLA metrics.
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-500 flex justify-between">
                  <span>Cloud Managed</span>
                  <span>•</span>
                  <span>Encrypted Fabric</span>
                  <span>•</span>
                  <span>Automated Failover</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <SectionTitle
                badge="Agile Connectivity"
                title="SD WAN"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                SD-WAN simplifies network management and optimizes connection to data-centers with high level of security.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                By decoupling network software from underlying physical hardware, SD-WAN provides dynamic path selection, traffic prioritization for latency-sensitive voice and video streams, and centralized control over distributed branch offices and remote workers.
              </p>

              <div className="space-y-3 pt-2">
                {sdwanBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0">
                      <IconCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
