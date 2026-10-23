import React, { useEffect, useState } from 'react';
import { SmartLink } from '../components/SmartLink';
import { LINKS } from '../data/site';
import {
  IconNetwork,
  IconCpu,
  IconServer,
  IconShield,
  IconCloud,
} from '../components/Icons';

export const HomePage: React.FC = () => {
  const solutions = [
    {
      title: 'Networking',
      href: LINKS.networking,
      image: '/images/Router-and-Switches-1-1.jpg',
      icon: IconNetwork,
    },
    {
      title: 'FTTX',
      href: LINKS.fttx,
      image: '/images/optical-fiber.jpg',
      icon: IconCpu,
    },
    {
      title: 'Server & Storage',
      href: LINKS.serverStorage,
      image: '/images/Servers-and-Storage-1.jpg',
      icon: IconServer,
    },
    {
      title: 'Security Solutions',
      href: LINKS.securitySolutions,
      image: '/images/Firewall-security-solution.jpg',
      icon: IconShield,
    },
    {
      title: 'Data Center & Cloud',
      href: LINKS.dataCenterCloud,
      image: '/images/cloud.jpg',
      icon: IconCloud,
    },
  ];

  const verticals = [
    {
      name: 'Cable & Broadband',
      icon: '/images/Network-and-Broadband.png',
    },
    {
      name: 'Telecom',
      icon: '/images/Telecom.png',
    },
    {
      name: 'Enterprises',
      icon: '/images/Enterprises.png',
    },
    {
      name: 'Data Center and Cloud',
      icon: '/images/Data-and-Cloud.png',
    },
    {
      name: 'Government and PSUs',
      icon: '/images/Government.png',
    },
  ];

  const allClients = [
    { name: 'Hathway', logo: '/images/Hathway-Logo.jpg' },
    { name: 'Den', logo: '/images/DEN-Logo.jpg' },
    { name: 'Fastway', logo: '/images/Fastway-Logo.jpg' },
    { name: 'Net+', logo: '/images/Net-Logo-1.jpg' },
    { name: 'Kerala Vision', logo: '/images/Kerala-Vision-Logo.jpg' },
    { name: 'TCCL', logo: '/images/TCCL-Logo.jpg' },
    { name: 'VK Digital', logo: '/images/VK-Digital-Logo.jpg' },
    { name: 'You Broadband', logo: '/images/You-Logo.jpg' },
    { name: 'Siti Digital', logo: '/images/Siti-Digital.jpg' },
    { name: 'UCN', logo: '/images/UCN-Logo.jpg' },
    { name: 'Metrocast', logo: '/images/Metrocast-Logo.jpg' },
    { name: 'Megh Bela', logo: '/images/Megh-Bela-Logo.jpg' },
    { name: 'World Link', logo: '/images/World-Link-Logo-1.jpg' },
    { name: 'Subisu', logo: '/images/Subisu-Logo.jpg' },
    { name: 'Vianet', logo: '/images/Via-Net-Logo.jpg' },
    { name: 'Discovery', logo: '/images/Discovery-Logo.jpg' },
    { name: 'SET', logo: '/images/sony.png' },
    { name: 'Jio', logo: '/images/Jio-Logo.jpg' },
    { name: 'Vodafone', logo: '/images/Vi-Logo.jpg' },
    { name: 'Airtel', logo: '/images/airtel.jpg' },
    { name: 'Rakuten Mobile', logo: '/images/Rakuten-Logo.jpg' },
    { name: 'Nepal Telecom', logo: '/images/Nepal-Telecom-Logo-1.jpg' },
    { name: 'GTPL', logo: '/images/GTPL-Logo.jpg' },
  ];

  const caseStudies = [
    {
      title: 'Rakuten Mobile',
      href: LINKS.rakutenMobile,
      image: '/images/rakuten.jpg',
      desc: 'Rakuten, Inc. is a Japanese electronic commerce and online retailing…',
    },
    {
      title: 'Nepal Telecom',
      href: LINKS.nepalTelecom,
      image: '/images/nepal-telecom.jpg',
      desc: 'Nepal Telecom is a state-owned Telecommunication Service Provider in Nepal…',
    },
    {
      title: 'Net+ Broadband',
      href: LINKS.netBroadband,
      image: '/images/net-broadband.jpg',
      desc: 'Net+ Broadband is 100% subsidiary of Fastway Transmission Pvt Ltd…',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  // Live slider shows 2 logos per slide on phones, 3 on tablets, 6 on desktop
  const sizeFor = (w: number) => (w < 690 ? 2 : w < 1000 ? 3 : 6);
  const [pageSize, setPageSize] = useState(() =>
    typeof window === 'undefined' ? 6 : sizeFor(window.innerWidth)
  );
  useEffect(() => {
    const update = () => {
      const next = sizeFor(window.innerWidth);
      setPageSize((prev) => {
        if (prev !== next) setActiveSlide(0);
        return next;
      });
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  const totalPages = Math.ceil(allClients.length / pageSize);
  const clientPages = Array.from({ length: totalPages }, (_, i) =>
    allClients.slice(i * pageSize, (i + 1) * pageSize)
  );
  // Live slider advances one page every ~4s
  useEffect(() => {
    const t = window.setInterval(() => setActiveSlide((v) => (v + 1) % totalPages), 4000);
    return () => window.clearInterval(t);
  }, [totalPages]);

  return (
    <div className="bg-white">
      {/* 1. Hero — full-width dark network visual, left-aligned copy */}
      <section className="relative h-[480px] md:h-[753px] flex items-center bg-[#061526] text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/video.mp4"
          poster="/images/Video-Background.png"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative site-container pt-[40px] md:pt-[24px]">
          <div className="max-w-[900px] text-left">
            <h1 className="section-title text-white">
              Keeping You One Step Ahead!
            </h1>

            <div className="hero-fade">
            <p className="text-[18px] leading-[28px] text-white mt-4 md:mt-5">
              We are Technology Aggregators, with an eye to NextGen Cutting Edge Virtual Machine Technology.
            </p>

            <div className="mt-6 md:mt-7">
              <SmartLink
                to={LINKS.companyProfile}
                className="bg-[#166fb0] hover:bg-[#0f5487] rounded-[3px] px-5 h-[48px] text-white font-medium uppercase text-[13px] tracking-[0.5px] inline-flex items-center gap-3 transition-colors"
              >
                <span className="w-5 h-[1.5px] bg-white inline-block" />
                <span>KNOW MORE</span>
              </SmartLink>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are — light blue wash, stacked photos */}
      <section className="relative bg-gradient-to-b from-[#ecf2fd] to-white py-[60px] md:pt-[88px] md:pb-[70px]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[40px] items-center">
            {/* Left: overlapping photos (faded back image, cable photo in front) */}
            <div className="relative w-full max-w-[500px] aspect-[500/582] mx-auto lg:mx-0">
              <div className="absolute top-0 left-0 w-[83.4%] aspect-square overflow-hidden opacity-45">
                <img
                  src="/images/home-about-02.jpg"
                  alt="Who We Are Background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-[16.6%] w-[83.4%] aspect-square overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <img
                  src="/images/home-about-01.jpg"
                  alt="CITIUSCOMM Network Operations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: narrative */}
            <div className="max-w-[640px]" data-reveal="up" data-delay="100">
              <h2 className="section-title text-[#166fb0]">Who We Are</h2>

              <p className="mt-6 text-[18px] leading-[28px] text-black">
                <strong>&ldquo;CITIUSCOMM&rdquo; a Multi-National Company,</strong> is the fastest growing Technology Aggregator and <strong>offers carrier-grade solutions</strong> for the dynamically developing <strong>Communications and Networking Industry.</strong>
              </p>

              <h3 className="mt-8">
                <SmartLink
                  to={LINKS.companyProfile}
                  className="inline-flex items-center gap-3 text-[20px] font-sans font-bold text-[#166fb0] hover:text-[#0b1f33] uppercase transition-colors"
                >
                  <span className="w-6 h-[1.5px] bg-[#166fb0] inline-block" />
                  <span>KNOW MORE</span>
                </SmartLink>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 2B. Full-width architectural banner */}
      <section
        className="relative min-h-[420px] md:h-[566px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/images/home-img.png')` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative site-container py-16">
          <h2 className="max-w-[860px] mx-auto md:mx-0 text-center md:text-left text-[18px] md:text-[28.8px] leading-[1.25] font-heading font-bold capitalize text-white">
            Our Vast Partner Tie-Ups Bundled With Our Years Of Experience And Knowledge Puts Us In A Unique Position To Handle End-To-End Deployments And System Integrations For Our Customers.
          </h2>
        </div>
      </section>

      {/* 3. Solutions — 3 cards then 2 wide cards */}
      <section className="pt-[60px] md:pt-[90px] pb-[50px] bg-white">
        <div className="site-container">
          <h2 className="section-title text-[#166fb0] text-center mb-[40px] md:mb-[56px]">
            Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-[1px] md:-mx-[10px]">
            {solutions.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <SmartLink
                  key={item.title}
                  to={item.href}
                  data-reveal="up"
                  data-delay={idx === 1 || idx === 2 || idx === 4 ? 100 : 0}
                  className={`group relative h-[350px] overflow-hidden block ${
                    idx < 3 ? 'md:col-span-2' : 'md:col-span-3'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors" />

                  <div className="absolute bottom-[46px] left-[56px] right-6 text-white">
                    <div className="mb-3 text-white">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-[20px] leading-[30px] font-sans font-bold">
                      {item.title}
                    </h3>
                    <div className="mt-1 text-[13px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More
                    </div>
                  </div>
                </SmartLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Focus Verticals */}
      <section className="pt-[40px] md:pt-[60px] pb-[60px] md:pb-[80px] bg-white">
        <div className="text-center">
          <h2 className="section-title text-[#166fb0] mb-[40px] md:mb-[18px] px-5">
            Focus Verticals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-0 items-start">
            {verticals.map((vert, vIdx) => (
              <div key={vert.name} className="flex flex-col items-center">
                <div className="w-[230px] h-[230px] sm:w-[147px] sm:h-[147px] flex items-center justify-center mb-[60px]" data-reveal="fade">
                  <img src={vert.icon} alt={vert.name} className="w-full h-full object-contain" />
                </div>
                <h5 data-reveal="up" data-delay={vIdx * 500} className="max-w-[147px] text-[20px] leading-[25px] font-sans font-medium text-black text-center">
                  {vert.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Clients — dark network background, 6 logos per slide */}
      <section
        className="relative pt-[70px] pb-[50px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/images/clients-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#061219]/78" />

        <div className="relative site-container text-center">
          <h2 className="section-title text-white mb-[34px]">Our Clients</h2>

          <div className="overflow-hidden max-w-[1290px] mx-auto">
            <div
              className="flex transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {clientPages.map((page, pIdx) => (
                <div
                  key={pIdx}
                  className="w-full shrink-0 grid gap-x-[22px]"
                  style={{ gridTemplateColumns: `repeat(${pageSize}, minmax(0, 1fr))` }}
                >
                  {Math.abs(pIdx - activeSlide) <= 1 && page.map((client) => (
                    <div key={client.name} className="flex flex-col items-center">
                      <div className="w-full max-w-[193px] aspect-square bg-white flex items-center justify-center p-2">
                        <img src={client.logo} alt={client.name} className="w-full h-full object-contain" loading="lazy" />
                      </div>
                      <span className="text-[18px] leading-[28px] text-white mt-3">{client.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-[18px] mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`w-[7px] h-[7px] rounded-full transition-colors ${
                  activeSlide === idx ? 'bg-[#166fb0]' : 'bg-white hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Case Studies — plain image + meta, no card chrome */}
      <section className="pt-[60px] md:pt-[90px] pb-[60px] md:pb-[100px] bg-white">
        <div className="site-container">
          <h2 className="section-title text-[#166fb0] text-center mb-[34px]">Case Studies</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[38px]">
            {caseStudies.map((study) => (
              <article key={study.title} className="group" data-reveal="up">
                <SmartLink to={study.href} className="block aspect-[600/403] overflow-hidden bg-slate-100">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </SmartLink>
                <div className="pt-4">
                  <SmartLink to={LINKS.caseStudies} className="text-[#888] text-[18px] leading-[24px]">
                    Case Studies
                  </SmartLink>
                  <h3 className="text-[20px] leading-[30px] font-sans font-bold text-black mt-1">
                    <SmartLink to={study.href} className="hover:text-[#166fb0] transition-colors">{study.title}</SmartLink>
                  </h3>
                  <p className="text-[18px] leading-[28px] text-black mt-2">{study.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
