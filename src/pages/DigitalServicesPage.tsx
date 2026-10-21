import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconShield, IconCpu, IconCloud, IconNetwork, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const DigitalServicesPage: React.FC = () => {
  const services = [
    {
      id: 'cybersecurity',
      title: 'CYBERSECURITY',
      subtitle: 'Proactive Defense & Compliance',
      desc: 'The methods and capabilities used to prevent and protect information systems and data from damage, unauthorized use, modification, or exploitation. Citiuscomm highlights cybersecurity counter-measures such as risk management, security upgrades, and compliance programs.',
      image: '/images/CYBERSECURITY.jpg',
      icon: IconShield,
      points: [
        'Enterprise vulnerability assessment and penetration testing (VAPT)',
        'Endpoint detection and response (EDR) with 24x7 SOC monitoring',
        'Regulatory compliance auditing (ISO 27001, CERT-In, GDPR, HIPAA)',
        'Zero-trust network architecture and privileged access management (PAM)',
      ],
    },
    {
      id: 'it-optimization',
      title: 'IT OPTIMIZATION',
      subtitle: 'Agility, Speed & Operational Efficiency',
      desc: 'The ability of information and data systems to quickly respond to market dynamics; meet the strategic needs of the business; improve productivity, agility, efficiency, and effectiveness of an IT organization while driving down total cost of ownership.',
      image: '/images/IT-OPTIMIZATION.jpg',
      icon: IconCpu,
      points: [
        'Legacy application containerization and microservices refactoring',
        'Infrastructure consolidation and automated virtualization tuning',
        'DevOps continuous integration and continuous deployment (CI/CD) pipelines',
        'Real-time application performance monitoring (APM) and observability',
      ],
    },
    {
      id: 'data-intelligence',
      title: 'DATA INTELLIGENCE',
      subtitle: 'Actionable Insights & Predictive Analytics',
      desc: 'The analysis of various forms of data in leadership and management to make better business decisions and build predictive models. Transform raw network logs into strategic executive dashboards and subscriber retention engines.',
      image: '/images/DATA-INTELLIGENCE.jpg',
      icon: IconNetwork,
      points: [
        'Centralized data lakehouse engineering and ETL data pipelines',
        'Predictive network churn analytics and customer sentiment scoring',
        'Executive real-time business intelligence dashboards (PowerBI, Tableau)',
        'Big data stream processing for multi-gigabit carrier telemetries',
      ],
    },
    {
      id: 'intelligent-automation',
      title: 'INTELLIGENT AUTOMATION',
      subtitle: 'AI & Robotic Process Automation (RPA)',
      desc: 'The combination of Artificial Intelligence (AI) and Robotic Process Automation (RPA) technologies which together empower rapid end-to-end business process automation, eliminating human error and accelerating service activation.',
      image: '/images/INTELLIGENT-AUTOMATION-1.jpg',
      icon: IconCloud,
      points: [
        'Automated subscriber KYC verification and broadband account provisioning',
        'Zero-touch network configuration and self-healing fault recovery',
        'AI-driven service desk ticketing and conversational chatbots',
        'Automated billing reconciliations and inventory audit robots',
      ],
    },
  ];

  const additionalDomains = [
    {
      title: 'DATA SCIENCE & AI',
      desc: 'Deep learning models, anomaly detection, predictive maintenance for cell towers and data centers.',
    },
    {
      title: 'INTERNET OF THINGS (IoT)',
      desc: 'Smart city sensors, industrial telemetry, smart metering, and automated surveillance pipelines.',
    },
    {
      title: 'CLOUD MODERNIZATION',
      desc: 'Multi-cloud orchestration, sovereign Indian cloud hosting, and cost optimization governance.',
    },
    {
      title: 'SDWAN, MERAKI & TIBCO',
      desc: 'Cisco Meraki cloud branch networking, Tibco syslog ingestion, and enterprise event streaming.',
    },
  ];

  return (
    <div>
      <PageHero
        title="Digital Services"
        subtitle="Empowering digital enterprises with advanced cybersecurity, IT optimization, data intelligence, and AI-driven automation."
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Digital Services' }]}
      />

      {/* Main 4 Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <SectionTitle
            badge="Digital Transformation"
            title="Accelerating Digital Agility &amp; Intelligence"
            subtitle="Explore how our digital capabilities modernize legacy systems into intelligent, automated, and secure platforms."
          />

          <div className="space-y-16">
            {services.map((svc, idx) => {
              const IconComp = svc.icon;
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={svc.id}
                  className="bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-xs card-hover-lift"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-sky-100 text-[#166fb0]">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                            {svc.subtitle}
                          </span>
                          <h3 className="text-2xl font-bold text-slate-900">{svc.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {svc.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {svc.points.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <IconCheck className="w-4 h-4 text-[#166fb0] shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <SmartLink
                          to={LINKS.contact}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-xs transition-all"
                        >
                          <span>Inquire for {svc.title}</span>
                          <IconArrowRight className="w-4 h-4" />
                        </SmartLink>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="w-full h-64 sm:h-80 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-bold">
                          {svc.title} Solutions
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Emerging Digital Disciplines */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Advanced Disciplines"
            title="Emerging Technology Capabilities"
            subtitle="Driving the frontier of AI, IoT telemetry, sovereign cloud, and event processing."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalDomains.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs card-hover-lift flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#166fb0]">
                  <span>Explore Capabilities</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
