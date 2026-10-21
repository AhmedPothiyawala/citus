import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconServer, IconCpu, IconShield, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const ServerStoragePage: React.FC = () => {
  const serverTypes = [
    {
      title: 'Rack Servers',
      desc: 'High-density 1U, 2U, and 4U multi-socket servers optimized for data centers, virtualization clusters, high-frequency transactions, and containerized cloud workloads.',
      icon: IconServer,
    },
    {
      title: 'Tower Servers',
      desc: 'Quiet, standalone, and flexible compute platforms ideal for remote branch offices, regional sites, retail hubs, and growing enterprise environments.',
      icon: IconCpu,
    },
    {
      title: 'Blade Servers',
      desc: 'Ultra-dense modular chassis delivering shared power, cooling, and network fabric management, slashing operational complexity in large-scale enterprise deployments.',
      icon: IconServer,
    },
    {
      title: 'All-Flash SAN & NAS Storage',
      desc: 'Scalable block and file storage arrays featuring sub-millisecond NVMe latency, deduplication, automated replication, and enterprise ransomware protection.',
      icon: IconShield,
    },
  ];

  const highlights = [
    'Tier-1 OEM partnerships with Dell Technologies, HPE, ZTE, and Huawei',
    'Certified for VMware vSphere, Microsoft Hyper-V, RedHat OpenShift & Nutanix',
    'Customized techno-commercial sizing tailored to client SLA and budget targets',
    'Turnkey staging, firmware verification, burn-in testing, and OS installation',
    'Pan-India on-site warranty management, SLA dispatch, and spare parts buffering',
    'Zero-data-loss backup, disaster recovery (DR), and snapshot automation',
  ];

  return (
    <div>
      <PageHero
        title="Server &amp; Storage"
        subtitle="Mission-critical compute fabrics, enterprise storage arrays, and hyperconverged infrastructure engineered for uptime."
        backgroundImage="/images/Servers-and-Storage-1.jpg"
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Server & Storage' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Compute &amp; Data Fabric"
                title="Enterprise Compute &amp; Scalable Storage"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                Servers and Storage Infrastructure are key components of an enterprise’s technology environment. They run mission-critical business applications, databases, AI/ML pipelines, and cloud virtualization layers.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                CITIUSCOMM is partnered with <strong>Dell, HPE, ZTE, and Huawei</strong>, providing cost-effective techno-commercial solutions to customers across telecom, banking, manufacturing, and public sector domains.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <SmartLink
                  to={LINKS.contact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>Request Storage Sizing</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
                <SmartLink
                  to={LINKS.partners}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <span>View Technology Partners</span>
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/Servers-and-Storage-1.jpg"
                  alt="Enterprise Servers and Storage Infrastructure"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xl font-bold">Dell • HPE • ZTE • Huawei</div>
                  <div className="text-xs text-sky-200 mt-1">Rack • Tower • Blade • NVMe Storage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Server & Storage Categories */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Hardware Architecture"
            title="Comprehensive Compute &amp; Storage Portfolio"
            subtitle="Engineered for workload acceleration, power efficiency, and seamless horizontal scaling."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serverTypes.map((type) => {
              const IconComp = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-slate-200/80 card-hover-lift flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#166fb0] flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                    {type.desc}
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
