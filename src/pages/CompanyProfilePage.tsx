import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import { IconCheck, IconArrowRight, IconShield, IconNetwork, IconServer, IconCpu } from '../components/Icons';

export const CompanyProfilePage: React.FC = () => {
  const pillars = [
    {
      title: 'Product Aggregation',
      desc: 'Tier-1 partnerships with leading global OEMs like Cisco, Juniper, Dell, HPE, and Nokia, delivering best-in-class hardware and software at optimal techno-commercial terms.',
      icon: IconCpu,
    },
    {
      title: 'Service Delivery & Staging',
      desc: 'Nationwide pre-staging, firmware standardization, rigorous lab bench testing, and turnkey field implementation with pan-India engineering teams.',
      icon: IconNetwork,
    },
    {
      title: '24x7 NOC Operations',
      desc: 'Round-the-clock proactive monitoring, tier-1 to tier-3 incident management, automated fault isolation, and strict SLA fulfillment for mission-critical carrier networks.',
      icon: IconServer,
    },
    {
      title: 'Turnkey Project Management',
      desc: 'End-to-end execution from RFP consulting and network design to deployment, commissioning, documentation, and lifecycle maintenance.',
      icon: IconShield,
    },
  ];

  return (
    <div>
      <PageHero
        title="Company Profile"
        subtitle="The fastest growing Technology Aggregator and system integration services provider."
        breadcrumbs={[{ label: 'About Us' }, { label: 'Company Profile' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Corporate Overview"
                title="Delivering Carrier-Grade Solutions With Unmatched Consistency"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                “CITIUSCOMM” a Multi-National Company, is the fastest growing Technology Aggregator and offers carrier-grade solutions for Telecom Operators, Enterprises, Cable &amp; Broadband providers, and Governments.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                CITIUSCOMM is providing E2E bespoke turnkey solutions which include Product, Service Delivery, NOC Operations, and Project Management. We are known for delivering cost-effective and high-quality solutions to our customers, efficiently and consistently.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                With deep domain expertise spanning IP/MPLS core networks, GPON/FTTH rollouts, high-density server/storage fabrics, and cloud modernization, we bridge the gap between cutting-edge OEM innovation and on-the-ground operational execution.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <SmartLink
                  to={LINKS.whyUs}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>Why Choose CITIUSCOMM</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>

                <SmartLink
                  to={LINKS.leadership}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <span>Meet Our Leadership</span>
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/images/home-about-01.jpg"
                  alt="CITIUSCOMM Engineering"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xl font-bold">Engineering First Mindset</div>
                  <div className="text-xs text-sky-200 mt-1">
                    Turnkey execution for India’s largest telecom and broadband operators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Guiding Principles"
            title="Vision &amp; Mission"
            subtitle="The strategic north star driving every engineering deployment and customer partnership."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200/80 card-hover-lift flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center mb-6">
                <IconCpu className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Vision</h3>
              <p className="text-base text-slate-600 leading-relaxed flex-grow">
                To be the most preferred, innovative, and trusted technology aggregator and system integration partner globally, empowering operators and enterprises with future-ready, resilient, and agile digital communication networks.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-[#166fb0] font-semibold">
                <IconCheck className="w-4 h-4" />
                <span>Next-Gen Virtual Machine &amp; Cloud Innovations</span>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200/80 card-hover-lift flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center mb-6">
                <IconNetwork className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Mission</h3>
              <p className="text-base text-slate-600 leading-relaxed flex-grow">
                To engineer resilient, high-performance communications architectures through strategic partner alliances, relentless technical excellence, customer-first service delivery, and sustainable domestic technology initiatives under Make-in-India.
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-[#166fb0] font-semibold">
                <IconCheck className="w-4 h-4" />
                <span>24x7 Pan-India Engineering &amp; Operations Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Turnkey Solutions Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="End-to-End Capabilities"
            title="Our Turnkey Delivery Model"
            subtitle="Providing bespoke turnkey solutions from architecture inception to long-term operations."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-xl border border-slate-200/80 bg-slate-50 hover:bg-sky-50/50 transition-all card-hover-lift flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-white shadow-xs text-[#166fb0] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                    {item.desc}
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
