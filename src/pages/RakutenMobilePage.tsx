import React from 'react';
import { PageHero, CTASection } from '../components/Widgets';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import { IconCheck, IconArrowRight, IconMapPin } from '../components/Icons';

export const RakutenMobilePage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Rakuten Mobile"
        subtitle="4G/5G RAN Site Solutions &amp; Data Center Infrastructure for Japan’s Landmark Fully Virtualized Mobile Network."
        backgroundImage="/images/rakuten.jpg"
        breadcrumbs={[
          { label: 'Case Studies', href: LINKS.caseStudies },
          { label: 'Rakuten Mobile' },
        ]}
      />

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6 text-sm text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-[#166fb0]">
              <IconMapPin className="w-4 h-4" />
              <span>Tokyo, Japan</span>
            </div>
            <span>•</span>
            <span className="font-medium">Client: Rakuten, Inc.</span>
            <span>•</span>
            <span className="px-3 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
              4G / 5G vRAN Architecture
            </span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="/images/rakuten-600x403.jpg"
              alt="Rakuten Mobile vRAN Network"
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* Executive Overview */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Background &amp; Ambitious 5G Vision
            </h2>

            <p className="text-base sm:text-lg">
              Rakuten, Inc. is a Japanese electronic commerce and online retailing company based in Tokyo and was founded in 1997 by Hiroshi Mikitani. Moving aggressively into telecommunications as Japan’s fourth major mobile network operator, Rakuten set out to build the world’s first end-to-end fully virtualized, cloud-native mobile network.
            </p>

            <div className="p-6 rounded-xl bg-sky-50 border border-sky-100 my-6">
              <div className="text-sm font-bold text-[#166fb0] uppercase tracking-wider mb-1">
                Project Scale &amp; Target
              </div>
              <p className="text-base font-semibold text-slate-900">
                Planned to have target to get approximately 10 – 15 Million subscribers within a time span of 3 years.
              </p>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-4">
              CITIUSCOMM Turnkey Solution
            </h2>

            <p className="text-base sm:text-lg">
              Citius is successful in providing various solutions to Rakuten i.e RAN site solution (4G/5G Antenna and its accessories, Data Center infrastructure solution).
            </p>

            <p>
              To meet Rakuten’s aggressive deployment timeline and rigid latency requirements across dense urban metropolitan areas in Japan, CITIUSCOMM delivered:
            </p>

            <div className="space-y-3 pt-2">
              {[
                'High-performance 4G & 5G antenna site accessories engineered for extreme weather resilience',
                'Precision optical cabling, jumpers, and low-loss RF interconnects for disaggregated remote radio heads (RRH)',
                'High-density Data Center server and storage racks powering edge virtualized distributed units (vDU) and centralized units (vCU)',
                'Dedicated staging, rigorous RF quality assurance, and automated pre-configuration ensuring rapid site activation',
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
              Results &amp; Impact
            </h2>

            <p>
              Through CITIUSCOMM’s rapid supply chain orchestration and zero-defect engineering support, Rakuten successfully accelerated its nationwide RAN rollout, delivering low-latency, high-throughput 4G and 5G connectivity to millions of subscribers across Japan.
            </p>
          </div>

          {/* Navigation to Next Post */}
          <div className="border-t border-slate-200 pt-8 mt-12 flex justify-end">
            <SmartLink
              to={LINKS.nepalTelecom}
              className="group inline-flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#166fb0] hover:bg-sky-50/50 transition-all text-right"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#166fb0]">
                  Next Post
                </div>
                <div className="text-base font-bold text-slate-900">Nepal Telecom</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#166fb0] group-hover:text-white flex items-center justify-center transition-colors">
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
