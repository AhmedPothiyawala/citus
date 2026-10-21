import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import {
  WHY_US_STRENGTHS,
  WHY_US_DIFFERENTIATORS,
} from '../data/site';
import {
  IconCheck,
  IconShield,
  IconBuilding,
  IconNetwork,
  IconServer,
  IconAward,
  IconBriefcase,
} from '../components/Icons';

export const WhyUsPage: React.FC = () => {
  const diffIcons = [
    IconBuilding,
    IconNetwork,
    IconServer,
    IconAward,
    IconShield,
    IconBriefcase,
  ];

  return (
    <div>
      <PageHero
        title="Why Us"
        subtitle="Our in-depth understanding of telecommunications, ICT, broadband, cable, and broadcast gives us a holistic view to provide customized solutions."
        breadcrumbs={[{ label: 'About Us' }, { label: 'Why Us' }]}
      />

      {/* 1. Our Strengths Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionTitle
                badge="Core Foundations"
                title="Our Strength"
                align="left"
              />

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                Our in-depth understanding of the telecommunications, ICT, broadband, cable, and broadcast industry gives us a holistic view, enabling us to provide customized solutions to our customers.
              </p>

              <div className="space-y-4 pt-2">
                {WHY_US_STRENGTHS.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-sky-50/60 border border-sky-100">
                    <div className="p-1 rounded-full bg-[#166fb0] text-white shrink-0 mt-0.5">
                      <IconCheck className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/Enterprise.jpg"
                  alt="CITIUSCOMM Enterprise Solutions"
                  className="w-full h-80 sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-[#166fb0] text-xs font-semibold uppercase tracking-wider">
                    Proven Execution
                  </span>
                  <div className="text-xl font-bold mt-2">Decades of Telecom &amp; ICT Leadership</div>
                  <div className="text-xs text-sky-200 mt-1">
                    Delivering carrier-grade infrastructure with transparent SLAs across India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What Sets Us Apart Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Competitive Edge"
            title="What Sets Us Apart"
            subtitle="Strategic differentiators that empower our customers to scale faster with reduced risk and lower total cost of ownership."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US_DIFFERENTIATORS.map((diff, index) => {
              const IconComp = diffIcons[index % diffIcons.length];
              return (
                <div
                  key={diff.title}
                  className="bg-white rounded-xl p-8 shadow-sm border border-slate-200/80 card-hover-lift flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{diff.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {diff.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. National Warehousing & Logistics Highlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-[#0b1f33] to-[#166fb0] rounded-2xl p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold uppercase tracking-wider">
                  Supply Chain Excellence
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Pan-India Warehousing &amp; Rapid Field Replacement
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  With forward staging depots located across northern, western, and eastern regions, CITIUSCOMM maintains a ready buffer of mission-critical optical transceivers, OLT line cards, routing modules, and server spares to guarantee strict SLA compliance.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center w-full max-w-xs">
                  <div className="text-3xl font-extrabold text-white">24x7</div>
                  <div className="text-xs uppercase tracking-wider text-sky-200 mt-1">
                    Emergency Spares &amp; Field Support
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
