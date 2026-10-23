import React from 'react';
import { SmartLink } from '../components/SmartLink';

export const NetBroadbandPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[550px] pt-[60px] md:pt-[110px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/net-broadband.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#1b2a3a]/45" />

        <div className="relative site-container text-center w-full">
          <span className="inline-block px-[10px] py-[2px] border border-white text-white text-[15px] font-medium mb-4 rounded-[3px]">
            Case Studies
          </span>
          <h1 className="page-hero-title text-white mb-4">
            Net+ Broadband
          </h1>
          <div className="text-[18px] text-white">
            August 12, 2017
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pt-[60px] md:pt-[80px] pb-[50px] max-w-[1080px] mx-auto px-5 md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6 text-black text-[18px] leading-[28px]">
            <p>
              Net+ Broadband is 100% subsidiary of Fastway Transmission Pvt Ltd and is an emerging independent ISPs in Punjab.
            </p>
            <p>
              It offers high-speed Internet through cable modem platform to residential, SME and corporate customers in all major cities and township of Urban Punjab.
            </p>
          </div>
          <div>
            <img
              src="/images/net-broadband.jpg"
              alt="Net+ Broadband"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="text-black text-[18px] leading-[28px]">
          <p>
            Citius has implemented Nokia’s ONU/OLT solution for Net+ in Punjab, India.
          </p>
        </div>
      </section>

      {/* Bottom Previous Post link banner */}
      <div className="site-container pb-[60px] md:pb-[80px]"><div className="relative h-[250px] md:h-[300px] overflow-hidden img-zoom" data-reveal>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/nepal-telecom.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-[15px] text-white mb-2">
            Previous Post
          </span>
          <SmartLink
            to="/nepal-telecom/"
            className="text-[26px] md:text-[34px] font-normal font-sans hover:opacity-80 transition-opacity after:absolute after:inset-0"
          >
            Nepal Telecom
          </SmartLink>
        </div>
      </div>
      </div>
    </div>
  );
};
