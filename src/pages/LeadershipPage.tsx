import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { LEADERSHIP_TEAM } from '../data/site';
import { IconAward, IconBriefcase, IconCheck } from '../components/Icons';

export const LeadershipPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Leadership"
        subtitle="Meet the seasoned telecommunications and technology pioneers guiding CITIUSCOMM."
        breadcrumbs={[{ label: 'About Us' }, { label: 'Leadership' }]}
      />

      {/* Leadership Team Profiles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Executive Board"
            title="Visionary Leadership"
            subtitle="Decades of cumulative experience leading multinational telecom infrastructure rollouts, tier-1 software deployments, and enterprise operations."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP_TEAM.map((leader) => (
              <div
                key={leader.name}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 card-hover-lift flex flex-col"
              >
                <div className="relative h-64 bg-slate-200 overflow-hidden">
                  <img
                    src={leader.image || '/images/3.jpg'}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-3 py-1 rounded-full bg-[#166fb0] text-xs font-semibold uppercase tracking-wider">
                      {leader.experience}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#166fb0] mb-4">
                    {leader.role}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {leader.bio}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <IconAward className="w-4 h-4 text-[#166fb0]" />
                    <span>Executive Telecom &amp; ICT Leadership</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#166fb0] flex items-center justify-center mx-auto">
            <IconBriefcase className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Our Engineering-First Leadership Philosophy
          </h3>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            At CITIUSCOMM, leadership is grounded in deep technical knowledge and active field participation. Our executives maintain direct relationships with OEM leadership teams worldwide, enabling us to deliver unique architectural insights, expedited product roadmaps, and unmatched SLA assurances for our clients.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <IconCheck className="w-4 h-4 text-[#166fb0]" />
                <span>Executive OEM Access</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Direct ties with Cisco, Juniper, HPE &amp; Dell</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <IconCheck className="w-4 h-4 text-[#166fb0]" />
                <span>Customer Obsession</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Direct accountability on every deployment</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <IconCheck className="w-4 h-4 text-[#166fb0]" />
                <span>Make in India</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Driving domestic supply &amp; innovation</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
