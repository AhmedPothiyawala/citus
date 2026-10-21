import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconCloud, IconServer, IconShield, IconNetwork, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const DataCenterCloudPage: React.FC = () => {
  const capabilities = [
    {
      title: 'Data Center Facility Engineering',
      desc: 'Collaborating with premier infrastructure partners to set up tier-3/tier-4 data centers across India, covering structured cabling, intelligent power distribution, cooling, and environmental monitoring.',
      icon: IconServer,
    },
    {
      title: 'Cloud Workload Migration',
      desc: 'Architecting zero-downtime workload migrations from on-prem legacy servers to public, private, or hybrid cloud environments with continuous security enforcement.',
      icon: IconCloud,
    },
    {
      title: 'Hybrid Cloud Orchestration',
      desc: 'Unifying multi-cloud governance, automated provisioning, Kubernetes container orchestration, and Infrastructure-as-Code (IaC) to streamline DevOps lifecycles.',
      icon: IconNetwork,
    },
    {
      title: 'Disaster Recovery & Business Continuity',
      desc: 'Automated cross-region replication, continuous data protection, failover testing, and strict Recovery Time Objective (RTO) / Recovery Point Objective (RPO) guarantees.',
      icon: IconShield,
    },
  ];

  const highlights = [
    'Setting up hyperscale and edge data centers across strategic hubs in India',
    'Partnerships with tier-1 technology and facility infrastructure leaders',
    'Architectural blueprints for high-efficiency PUE power and precision cooling',
    'Enterprise cloud migration frameworks ensuring regulatory and data residency compliance',
    '24x7 NOC & SOC monitoring covering physical and virtual layers',
    'End-to-end consulting from site feasibility studies to operational commissioning',
  ];

  return (
    <div>
      <PageHero
        title="Data Center &amp; Cloud"
        subtitle="Turnkey data center engineering in India and agile cloud modernization unlocking next-generation operational speed."
        backgroundImage="/images/Data-Centers-1.jpg"
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Data Center & Cloud' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Facility &amp; Cloud"
                title="Building Next-Gen Data Centers &amp; Unlocking the Cloud Model"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                CITIUSCOMM is working to set up Data Centers in India in collaboration with technology partners. We are in business to help our customers with these solutions and build cutting edge facilities.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We unlock the cloud operating model for every business and enable their digital transformation strategies to succeed. Migrations pose tough challenges, which is where Citiuscomm brings architectural expertise, seamless workload migration, security enforcement, and hybrid orchestration.
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

              <div className="pt-4">
                <SmartLink
                  to={LINKS.contact}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>Consult With Our DC Specialists</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/Data-Centers-1.jpg"
                  alt="Modern Data Center Infrastructure"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xl font-bold">Data Center Setup in India</div>
                  <div className="text-xs text-sky-200 mt-1">
                    Facility Engineering • Cloud Migration • Hybrid Orchestration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capability Cards */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Solutions Spectrum"
            title="Complete Data Center &amp; Cloud Capabilities"
            subtitle="Bridging physical facility engineering with modern cloud operating models."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => {
              const IconComp = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-slate-200/80 card-hover-lift flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#166fb0] flex items-center justify-center mb-5">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                    {cap.desc}
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
