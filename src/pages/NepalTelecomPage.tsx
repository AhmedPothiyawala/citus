import React from 'react';
import { PageHero, CTASection } from '../components/Widgets';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import { IconCheck, IconArrowRight, IconChevronLeft, IconMapPin } from '../components/Icons';

export const NepalTelecomPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Nepal Telecom"
        subtitle="Mid-Hill Carrier Router Backbone &amp; Turnkey Leased Line Infrastructure Across Nepal."
        backgroundImage="/images/nepal-telecom.jpg"
        breadcrumbs={[
          { label: 'Case Studies', href: LINKS.caseStudies },
          { label: 'Nepal Telecom' },
        ]}
      />

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6 text-sm text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-[#166fb0]">
              <IconMapPin className="w-4 h-4" />
              <span>Kathmandu &amp; Pan-Nepal</span>
            </div>
            <span>•</span>
            <span className="font-medium">Client: Nepal Telecom (NT)</span>
            <span>•</span>
            <span className="px-3 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
              Carrier Core IP/MPLS &amp; Leased Line
            </span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="/images/nepal-telecom-600x403.jpg"
              alt="Nepal Telecom Router Infrastructure"
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* Executive Overview */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Background
            </h2>

            <p className="text-base sm:text-lg">
              Nepal Telecom is a state-owned Telecommunication Service Provider in Nepal and providing various mobile and Fixed-line services to the people of Nepal. As the primary communications backbone of the nation, Nepal Telecom operates critical transmission infrastructure connecting remote mountainous regions with urban centers.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-4">
              Mid-Hill Highway Router RFP Win
            </h2>

            <p className="text-base sm:text-lg">
              We have participated in Mid hill Router RFP of Nepal telecom and successfully won this bid by offering world-class Cisco Routers solution to NT. This project is executed successfully with very high customer satisfaction.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Deployment of high-resilience Cisco Carrier Core and aggregation routers across the rugged Mid-Hill highway optical belt',
                'Engineered to operate reliably under extreme Himalayan temperature fluctuations and rugged power conditions',
                'Advanced IP/MPLS traffic engineering providing sub-50ms automated fast-reroute protection',
                'Hands-on staging, testing, and knowledge transfer to Nepal Telecom network engineering teams',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0 mt-1">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-6">
              National Leased Line Turnkey RFP Win
            </h2>

            <p className="text-base sm:text-lg">
              Also got an opportunity to participate another project of Leased line RFP for Nepal Telecom. We have won this bid as well with providing CITIUS’s own solution for Leased line requirements.
            </p>

            <p>
              CITIUSCOMM’s proprietary leased-line customer premises equipment (CPE) and optical aggregation interfaces empowered Nepal Telecom to deliver high-bandwidth, dedicated, and secure connectivity to government ministries, banks, corporate institutions, and defense establishments nationwide.
            </p>
          </div>

          {/* Navigation to Prev & Next */}
          <div className="border-t border-slate-200 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <SmartLink
              to={LINKS.rakutenMobile}
              className="group inline-flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#166fb0] hover:bg-sky-50/50 transition-all text-left w-full sm:w-auto"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#166fb0] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <IconChevronLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#166fb0]">
                  Previous Post
                </div>
                <div className="text-base font-bold text-slate-900">Rakuten Mobile</div>
              </div>
            </SmartLink>

            <SmartLink
              to={LINKS.netBroadband}
              className="group inline-flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#166fb0] hover:bg-sky-50/50 transition-all text-right w-full sm:w-auto justify-end"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#166fb0]">
                  Next Post
                </div>
                <div className="text-base font-bold text-slate-900">Net+ Broadband</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#166fb0] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <IconArrowRight className="w-5 h-5" />
              </div>
            </SmartLink>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
