import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { PARTNERS_LIST } from '../data/site';
import { IconCheck, IconNetwork, IconCpu, IconShield, IconCloud } from '../components/Icons';

export const PartnersPage: React.FC = () => {
  const domains = [
    {
      title: 'vRAN & 4G/5G Wireless',
      desc: 'Disaggregated Open RAN, virtualized baseband processing, high-precision antenna accessories, and small-cell infrastructure.',
      icon: IconCpu,
    },
    {
      title: 'Cloud & NFV Ecosystems',
      desc: 'Network functions virtualization (NFV), Kubernetes orchestrations, telco cloud infrastructure, and private 5G core.',
      icon: IconCloud,
    },
    {
      title: 'Carrier IP & SD-WAN',
      desc: 'High-density IP/MPLS core and edge routing, software-defined WAN, optical DWDM transmission, and metro Ethernet fabrics.',
      icon: IconNetwork,
    },
    {
      title: 'DPI & Advanced Security',
      desc: 'Carrier-grade deep packet inspection, real-time subscriber traffic shaping, DDoS mitigation, and compliance logging.',
      icon: IconShield,
    },
  ];

  return (
    <div>
      <PageHero
        title="Partners"
        subtitle="Strategic executive relationships with global technology leaders to execute transformative carrier and enterprise projects."
        backgroundImage="/images/partnership.jpg"
        breadcrumbs={[{ label: 'Partners' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <SectionTitle
            badge="Strategic Alliances"
            title="Global Technology Partnerships"
            subtitle="Curated domain leaders in vRAN, Cloud, NFV, 5G, and SD-WAN enabling seamless telco execution."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-sky-50/70 rounded-2xl p-8 border border-sky-100 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#166fb0] text-white text-xs font-semibold uppercase tracking-wider">
                  NextGen Innovation
                </span>
                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  Citius would like to work in areas of Next Gen Innovative Technology Services with various solutions like vRAN (4G / 5G), Cloud, NFV, 5G, SD-WAN etc. and help Telcos execute seamlessly in view of its recent successful experience in various service providers in India and other countries.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#166fb0]">
                <IconCheck className="w-4 h-4" />
                <span>Seamless Carrier Execution</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider">
                  Executive Access
                </span>
                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  Citiuscomm have Strategic relationship with the executive level of Technology Partners to be able to execute strategic Technology Project with differentiation. We have only added the best products in their respective domain to our portfolio in order to provide the best seed solutions and services to our customers.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-800">
                <IconCheck className="w-4 h-4" />
                <span>Direct OEM C-Suite Engagement</span>
              </div>
            </div>

            <div className="bg-sky-50/70 rounded-2xl p-8 border border-sky-100 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#166fb0] text-white text-xs font-semibold uppercase tracking-wider">
                  Long-Term Value
                </span>
                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  Accordingly, Citiuscomm has put together strategic partnership with multiple technology partners who are leaders in their segment and are keen to work with us for various projects in global Market for long term.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#166fb0]">
                <IconCheck className="w-4 h-4" />
                <span>End-to-End SLA Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Gallery */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="OEM Portfolio"
            title="Our Technology Partners"
            subtitle="World leaders in enterprise compute, routing, optical connectivity, security, and digital intelligence."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {PARTNERS_LIST.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs card-hover-lift flex flex-col items-center justify-center text-center group"
              >
                <div className="h-16 w-full flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 max-w-[130px] object-contain transition-transform group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{partner.name}</h4>
                {partner.category && (
                  <span className="text-xs text-slate-500 font-medium">
                    {partner.category}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborative Solution Domains */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Ecosystem Integration"
            title="Joint Solution Domains"
            subtitle="Delivering cross-platform interoperability through unified architecture engineering."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((dom) => {
              const IconComp = dom.icon;
              return (
                <div
                  key={dom.title}
                  className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50/50 card-hover-lift flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-white shadow-xs text-[#166fb0] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{dom.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                    {dom.desc}
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
