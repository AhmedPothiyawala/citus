import React from 'react';
import { PageHero, CTASection } from '../components/Widgets';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import { IconCheck, IconChevronLeft, IconMapPin } from '../components/Icons';

export const NetBroadbandPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Net+ Broadband"
        subtitle="Carrier-Grade Nokia OLT &amp; ONU High-Density Fiber Rollout Across Urban Punjab."
        backgroundImage="/images/net-broadband.jpg"
        breadcrumbs={[
          { label: 'Case Studies', href: LINKS.caseStudies },
          { label: 'Net+ Broadband' },
        ]}
      />

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6 text-sm text-slate-600">
            <div className="flex items-center gap-1.5 font-semibold text-[#166fb0]">
              <IconMapPin className="w-4 h-4" />
              <span>Punjab, India</span>
            </div>
            <span>•</span>
            <span className="font-medium">Client: Net+ Broadband (Fastway)</span>
            <span>•</span>
            <span className="px-3 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold">
              Nokia GPON / FTTH Deployment
            </span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="/images/net-broadband-600x403.jpg"
              alt="Net+ Broadband Fiber Deployment"
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* Executive Overview */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Background
            </h2>

            <p className="text-base sm:text-lg">
              Net+ Broadband is 100% subsidiary of Fastway Transmission Pvt Ltd and is an emerging independent ISPs in Punjab.
            </p>

            <p className="text-base sm:text-lg">
              It offers high-speed Internet through cable modem platform to residential, SME and corporate customers in all major cities and township of Urban Punjab. As subscriber data demand surged exponentially, Net+ embarked on a comprehensive fiber-to-the-home (FTTH) expansion to deliver gigabit broadband speeds across the state.
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight pt-4">
              Nokia OLT/ONU Solution Implementation
            </h2>

            <p className="text-base sm:text-lg">
              Citius has implemented Nokia’s ONU/OLT solution for Net+ in Punjab, India.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'High-density Nokia Optical Line Terminal (OLT) chassis deployed across central switching offices in Punjab',
                'Seamless integration with Net+ AAA subscriber provisioning and billing management systems',
                'Turnkey distribution of high-performance Nokia Optical Network Units (ONUs) for residential and commercial premises',
                'Comprehensive lab pre-testing, optical budget verification, and on-ground field SLA maintenance',
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
              Impact on North India Broadband
            </h2>

            <p>
              The Nokia GPON solution architected and rolled out by CITIUSCOMM enabled Net+ Broadband to cement its position as the premier high-speed fiber broadband provider in Punjab, delivering ultra-reliable gigabit speeds, lower latency for streaming and gaming, and seamless scalability for future 10G PON upgrades.
            </p>
          </div>

          {/* Navigation to Prev */}
          <div className="border-t border-slate-200 pt-8 mt-12 flex justify-start">
            <SmartLink
              to={LINKS.nepalTelecom}
              className="group inline-flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#166fb0] hover:bg-sky-50/50 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-[#166fb0] group-hover:text-white flex items-center justify-center transition-colors">
                <IconChevronLeft className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-[#166fb0]">
                  Previous Post
                </div>
                <div className="text-base font-bold text-slate-900">Nepal Telecom</div>
              </div>
            </SmartLink>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
