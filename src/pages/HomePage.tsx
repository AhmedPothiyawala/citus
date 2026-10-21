import React from 'react';
import { SmartLink } from '../components/SmartLink';
import {
  LINKS,
  COMPANY_INFO,
  CLIENTS_LIST,
  CASE_STUDIES,
} from '../data/site';
import { SectionTitle, CaseStudyCard, CTASection } from '../components/Widgets';
import {
  IconArrowRight,
  IconNetwork,
  IconShield,
  IconServer,
  IconCloud,
  IconCpu,
} from '../components/Icons';

export const HomePage: React.FC = () => {
  const solutions = [
    {
      title: 'Networking',
      href: LINKS.networking,
      desc: 'Partnered with OEMs like Cisco, Juniper, HPE, ZTE, and Huawei for enterprise and carrier routers, network switches, and SD-WAN.',
      icon: IconNetwork,
      image: '/images/Router-and-Switches-1-1.jpg',
    },
    {
      title: 'FTTX',
      href: LINKS.fttx,
      desc: 'Turnkey fiber-to-the-x solutions covering GPON, point-to-point, OLT/ONT deployments with rapid on-ground local support pan-India.',
      icon: IconCpu,
      image: '/images/FTTX.jpg',
    },
    {
      title: 'Server & Storage',
      href: LINKS.serverStorage,
      desc: 'Mission-critical enterprise compute & storage infrastructure with Dell, HPE, ZTE, and Huawei spanning rack, blade, and high-density servers.',
      icon: IconServer,
      image: '/images/Servers-and-Storage-1.jpg',
    },
    {
      title: 'Security Solutions',
      href: LINKS.securitySolutions,
      desc: 'Comprehensive multi-layered cyber defense featuring DDoS mitigation, Deep Packet Inspection (DPI), and next-generation firewalls.',
      icon: IconShield,
      image: '/images/Security-2.png',
    },
    {
      title: 'Data Center & Cloud',
      href: LINKS.dataCenterCloud,
      desc: 'Next-generation data center buildouts in India, cloud migrations, workload modernization, and hybrid cloud operating models.',
      icon: IconCloud,
      image: '/images/Data-Centers-1.jpg',
    },
  ];

  const verticals = [
    {
      name: 'Cable & Broadband',
      icon: '/images/Network-and-Broadband.png',
      desc: 'FTTX, IP MPLS, digital headend, STB/Android TV, and IPTV/OTT architectures for top MSOs and ISPs.',
    },
    {
      name: 'Telecom',
      icon: '/images/Telecom.png',
      desc: '4G/5G vRAN, DWDM core, optical transport, mobile backhaul, and automated OSS/BSS platforms.',
    },
    {
      name: 'Enterprises',
      icon: '/images/Enterprises.png',
      desc: 'Private 5G, SD-WAN, campus WiFi, zero-trust cybersecurity, and high-performance compute.',
    },
    {
      name: 'Data Center & Cloud',
      icon: '/images/Data-and-Cloud.png',
      desc: 'Turnkey facility engineering, hyperconverged server infrastructure, and low-latency cloud interconnects.',
    },
    {
      name: 'Government and PSUs',
      icon: '/images/Government.png',
      desc: 'Mission-critical nationwide networks, state data centers, secure communications, and smart city infrastructure.',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-[#0b1f33] text-white overflow-hidden py-20 lg:py-28">
        {/* Background artwork */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/Video-Background.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f33]/95 via-[#0f5487]/85 to-[#166fb0]/75" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-semibold tracking-wider text-sky-200 uppercase">
              <span>Engineering First Company</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Keeping You One Step Ahead!
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
              {COMPANY_INFO.subTagline}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              We are Technology Aggregators, with an eye to NextGen Cutting Edge Virtual Machine Technology and carrier-grade system integration.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <SmartLink
                to={LINKS.companyProfile}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow-lg hover:shadow-xl transition-all"
              >
                <span>Know More</span>
                <IconArrowRight className="w-4 h-4" />
              </SmartLink>

              <SmartLink
                to={LINKS.contact}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all"
              >
                <span>Contact Us</span>
              </SmartLink>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-md w-full">
              <img
                src="/images/home-img.png"
                alt="CITIUSCOMM Network Architecture"
                className="w-full h-auto drop-shadow-2xl animate-pulse-slow"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="/images/home-about-01.jpg"
                  alt="CITIUSCOMM Engineers"
                  className="rounded-xl shadow-lg object-cover w-full h-64 sm:h-80"
                  loading="lazy"
                />
                <img
                  src="/images/home-about-02.jpg"
                  alt="CITIUSCOMM Network Operations"
                  className="rounded-xl shadow-lg object-cover w-full h-64 sm:h-80 mt-8"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 left-6 bg-[#166fb0] text-white p-5 rounded-xl shadow-xl max-w-xs">
                <div className="text-2xl font-bold tracking-tight">Pan-India</div>
                <div className="text-xs text-sky-100 uppercase tracking-wider mt-0.5">
                  Turnkey System Integration
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <SectionTitle
                badge="Who We Are"
                title="Fastest Growing Technology Aggregator"
                align="left"
              />

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <strong>CITIUSCOMM</strong>, a multi-national company, is the fastest growing Technology Aggregator and offers carrier-grade solutions for Telecom Operators, Enterprises, Cable &amp; Broadband providers, and Governments.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                CITIUSCOMM is providing E2E bespoke turnkey solutions which include Product, Service Delivery, NOC Operations, and Project Management. We are known for delivering cost-effective and high-quality solutions to our customers, efficiently and consistently.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We design and engineer comprehensive architectures with an eye on next-generation virtualized platforms, helping operators navigate complex migrations with zero downtime.
              </p>

              <div className="pt-2">
                <SmartLink
                  to={LINKS.whyUs}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
                >
                  <span>KNOW MORE</span>
                  <IconArrowRight className="w-4 h-4" />
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. High-Impact Big Statement Banner */}
      <section className="bg-gradient-to-r from-[#0b1f33] via-[#0f5487] to-[#166fb0] py-16 px-4 sm:px-8 text-white text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold tracking-wider uppercase mb-4">
            End-To-End System Integration
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed tracking-tight text-white">
            “Our vast partner tie-ups bundled with our years of experience and knowledge puts us in a unique position to handle end-to-end deployments and system integrations for our customers.”
          </h2>
        </div>
      </section>

      {/* 4. Solutions Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Solutions"
            title="Comprehensive Technology Offerings"
            subtitle="Engineered for high-throughput, low-latency, and zero-compromise security across modern digital networks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden card-hover-lift flex flex-col"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                      <div className="p-2 rounded-lg bg-[#166fb0] text-white">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                      {item.desc}
                    </p>
                    <div className="pt-2 border-t border-slate-100">
                      <SmartLink
                        to={item.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#166fb0] hover:text-[#0f5487] transition-colors"
                      >
                        <span>Learn More</span>
                        <IconArrowRight className="w-4 h-4" />
                      </SmartLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Focus Verticals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Market Focus"
            title="Focus Verticals"
            subtitle="Empowering diverse sectors with domain-specific engineering and carrier-grade infrastructure."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {verticals.map((vert) => (
              <div
                key={vert.name}
                className="bg-slate-50 hover:bg-sky-50/50 rounded-xl p-6 text-center border border-slate-200/70 transition-all card-hover-lift flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 mb-5 border border-slate-100">
                  <img
                    src={vert.icon}
                    alt={vert.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h5 className="text-base font-bold text-slate-900 mb-2">{vert.name}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{vert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Clients Showcase Section */}
      <section
        className="relative py-20 bg-slate-900 text-white overflow-hidden"
        style={{
          backgroundImage: `url('/images/clients-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0b1f33]/90 backdrop-blur-xs" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Trusted By Leaders"
            title="Our Clients"
            subtitle="Delivering mission-critical networks for premier telecom operators, MSOs, and service providers."
            dark
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-center">
            {CLIENTS_LIST.map((client) => (
              <div
                key={client.name}
                className="bg-white/95 hover:bg-white rounded-lg p-3 sm:p-4 flex items-center justify-center h-20 shadow-sm transition-transform hover:scale-105"
                title={client.name}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Case Studies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionTitle
            badge="Proven Impact"
            title="Featured Case Studies"
            subtitle="Explore how CITIUSCOMM has solved complex network challenges across national and global deployments."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <SmartLink
              to={LINKS.caseStudies}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#166fb0] hover:bg-[#0f5487] text-white shadow transition-all"
            >
              <span>View All Case Studies</span>
              <IconArrowRight className="w-4 h-4" />
            </SmartLink>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <CTASection />
    </div>
  );
};
