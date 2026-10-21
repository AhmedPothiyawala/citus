import React from 'react';
import { PageHero, SectionTitle, CTASection } from '../components/Widgets';
import { IconCheck, IconShield, IconNetwork, IconCpu, IconArrowRight } from '../components/Icons';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';

export const SecuritySolutionsPage: React.FC = () => {
  const pillars = [
    {
      title: 'DDoS Mitigation',
      tagline: 'Multi-Vector Volumetric & Application-Layer Protection',
      desc: 'DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised. Our scrubbing solutions mitigate multi-hundred-gigabit attacks in sub-seconds without introducing latency.',
      icon: IconShield,
      features: [
        'Real-time automated traffic scrubbing & BGP blackholing avoidance',
        'Protection against SYN floods, UDP amplification, and HTTP flood attacks',
        'Cloud-assisted edge scrubbing centers for massive volumetric attacks',
        'Granular threat analytics and real-time attack forensics',
      ],
    },
    {
      title: 'Deep Packet Inspection (DPI)',
      tagline: 'Actionable Network Intelligence & Traffic Shaping',
      desc: 'DPI Deep Packet Inspection (and filtering) enables advanced network management and user service. Provides actionable network intelligence to make informed architectural, monetization, and compliance decisions while optimizing subscriber Quality of Experience (QoE).',
      icon: IconCpu,
      features: [
        'Layer 7 protocol identification and real-time application classification',
        'Granular bandwidth shaping, fair usage enforcement, and quota management',
        'Regulatory URL filtering, lawful interception, and security auditing',
        'Subscriber behavioral profiling and network capacity planning insights',
      ],
    },
    {
      title: 'Next-Gen Firewalls',
      tagline: 'Positive Firewall & Zero-Trust Perimeter Defense',
      desc: 'Firewalls provide protection against outside cyber attackers by shielding your computer or network from malicious or unnecessary network traffic. Positive Firewall security solutions establish strict zero-trust boundaries across physical, virtual, and cloud perimeters.',
      icon: IconNetwork,
      features: [
        'Positive security enforcement models blocking unknown exploit vectors',
        'Integrated Intrusion Prevention System (IPS) and SSL/TLS decryption inspection',
        'Micro-segmentation protecting east-west server traffic inside data centers',
        'Automated threat intelligence feeds and sandbox malware detonation',
      ],
    },
  ];

  return (
    <div>
      <PageHero
        title="Security Solutions"
        subtitle="Multi-layered cyber protection featuring advanced DDoS mitigation, Deep Packet Inspection, and positive firewall architecture."
        backgroundImage="/images/Security-2.png"
        breadcrumbs={[{ label: 'Solutions', href: LINKS.products }, { label: 'Security Solutions' }]}
      />

      {/* Main Narrative */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Proactive Defense"
                title="Protecting Mission-Critical Carrier &amp; Enterprise Infrastructure"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                As networks scale to support multi-gigabit subscriber bandwidth and cloud-native applications, cybersecurity threats evolve in sophistication, frequency, and severity.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                CITIUSCOMM provides multi-layered security architectures that defend carrier cores, enterprise perimeters, and cloud workloads against DDoS attacks, zero-day vulnerabilities, and unauthorized data infiltration without compromising wire-speed packet throughput.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Sub-second automated DDoS attack detection and diversion',
                  'Deep Packet Inspection with granular subscriber QoE visibility',
                  'Next-Gen Firewalls with positive zero-trust rule frameworks',
                  'Carrier-grade appliances certified for high-throughput backbones',
                ].map((item, idx) => (
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
                  <span>Request Security Architecture Audit</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="/images/Security-2.png"
                  alt="Cybersecurity and DDoS Protection"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f33]/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xl font-bold">DDoS • DPI • Firewalls</div>
                  <div className="text-xs text-sky-200 mt-1">Multi-Layered Wire-Speed Protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Security Pillars */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Three Pillars of Defense"
            title="Comprehensive Security Ecosystem"
            subtitle="Explore how DDoS mitigation, DPI traffic intelligence, and next-generation firewalls work in synergy."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pil) => {
              const IconComp = pil.icon;
              return (
                <div
                  key={pil.title}
                  className="bg-white rounded-2xl p-8 sm:p-10 shadow-xs border border-slate-200/80 card-hover-lift flex flex-col"
                >
                  <div className="w-14 h-14 rounded-xl bg-sky-50 text-[#166fb0] flex items-center justify-center mb-6">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1">
                    {pil.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{pil.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                    {pil.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {pil.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <IconCheck className="w-3.5 h-3.5 text-[#166fb0] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
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
