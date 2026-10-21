import React from 'react';
import { PageHero, SectionTitle, CaseStudyCard, CTASection } from '../components/Widgets';
import { CASE_STUDIES } from '../data/site';

export const CaseStudiesPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Case Studies"
        subtitle="Real-world engineering triumphs delivering high-availability carrier infrastructure across India and international markets."
        breadcrumbs={[{ label: 'Case Studies' }]}
      />

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <SectionTitle
            badge="Proven Track Record"
            title="Carrier &amp; Enterprise Deployments"
            subtitle="Discover how CITIUSCOMM engineers and executes mission-critical solutions under demanding SLAs."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Metrics Highlight */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#166fb0] mb-2">
                10-15M+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Subscribers Targeted
              </div>
              <p className="text-xs text-slate-400 mt-2">Rakuten Mobile Japan vRAN Rollout</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#166fb0] mb-2">
                100%
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                RFP Win Rate
              </div>
              <p className="text-xs text-slate-400 mt-2">Nepal Telecom Mid-Hill &amp; Leased Line</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#166fb0] mb-2">
                Pan-Punjab
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                FTTH Gigabit Coverage
              </div>
              <p className="text-xs text-slate-400 mt-2">Net+ Broadband Nokia OLT/ONU</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#166fb0] mb-2">
                99.999%
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Network Reliability
              </div>
              <p className="text-xs text-slate-400 mt-2">Carrier-Grade High-Availability SLAs</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
