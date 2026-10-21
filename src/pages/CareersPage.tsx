import React, { useState } from 'react';
import { PageHero, SectionTitle, CareerForm, CTASection } from '../components/Widgets';
import { CAREER_OPENINGS } from '../data/site';
import { IconCheck, IconChevronDown, IconBriefcase, IconMapPin, IconAward } from '../components/Icons';

export const CareersPage: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<string>('IP Engineers');
  const [expandedId, setExpandedId] = useState<string | null>('ip-engineers');

  const toggleExpand = (id: string, title: string) => {
    setExpandedId(expandedId === id ? null : id);
    setSelectedPosition(title);
  };

  return (
    <div>
      <PageHero
        title="Careers"
        subtitle="Let’s build a new dynamic world together! Bring your enthusiasm, your ideas, and your sincerity."
        breadcrumbs={[{ label: 'Careers' }]}
      />

      {/* Culture & Invitation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <SectionTitle
            badge="Join Our Mission"
            title="Work With Industry Pioneers"
            subtitle="Let us work together to solve the most challenging problems of the industry with the knowledge of our unique backgrounds and sharp skillsets."
          />

          <div className="p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-sky-100 shadow-xs text-slate-700 leading-relaxed text-base sm:text-lg">
            “Bring in your enthusiasm, your ideas, and your sincerity and we offer the best infrastructure and technological support for you! Let’s build a new dynamic world together!”
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Job Openings Accordion */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <IconBriefcase className="w-6 h-6 text-[#166fb0]" />
                <span>Current Openings</span>
              </h2>

              <div className="space-y-4">
                {CAREER_OPENINGS.map((opening) => {
                  const isExpanded = expandedId === opening.id;
                  return (
                    <div
                      key={opening.id}
                      className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleExpand(opening.id, opening.title)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#166fb0] uppercase tracking-wider mb-1">
                            <span>{opening.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-slate-500 font-normal">
                              <IconMapPin className="w-3.5 h-3.5" />
                              {opening.location}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{opening.title}</h3>
                        </div>

                        <div className="p-2 rounded-full bg-slate-100 text-slate-600 shrink-0">
                          <IconChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#166fb0]' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 text-sm text-slate-600">
                          <p className="leading-relaxed">{opening.overview}</p>

                          {opening.responsibilities.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                                Responsibilities &amp; Scope:
                              </h4>
                              <ul className="space-y-1.5 pl-2">
                                {opening.responsibilities.map((r, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0 mt-0.5" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {opening.qualifications.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                                What We Are Looking For:
                              </h4>
                              <ul className="space-y-1.5 pl-2">
                                {opening.qualifications.map((q, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <IconCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {opening.preferred && opening.preferred.length > 0 && (
                            <div>
                              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2">
                                Preferred Advantage:
                              </h4>
                              <ul className="space-y-1.5 pl-2">
                                {opening.preferred.map((p, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <IconAward className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedPosition(opening.title);
                                const formEl = document.getElementById('apply-form');
                                formEl?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-colors"
                            >
                              Apply for {opening.title}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Apply Form */}
            <div id="apply-form" className="lg:col-span-5 space-y-6">
              <div className="sticky top-28">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                  Apply Now
                </h2>
                <p className="text-sm text-slate-600 mb-6">
                  Submit your details and our talent acquisition team will get in touch with you.
                </p>
                <CareerForm initialPosition={selectedPosition} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
