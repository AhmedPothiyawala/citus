import React from 'react';
import { SmartLink } from '../components/SmartLink';

export const NepalTelecomPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[550px] pt-[60px] md:pt-[110px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/nepal-telecom.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#1b2a3a]/45" />

        <div className="relative site-container text-center w-full">
          <span className="inline-block px-[10px] py-[2px] border border-white text-white text-[15px] font-medium mb-4 rounded-[3px]">
            Case Studies
          </span>
          <h1 className="page-hero-title text-white mb-4">
            Nepal Telecom
          </h1>
          <div className="text-[18px] text-white">
            August 12, 2018
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pt-[60px] md:pt-[80px] pb-[50px] max-w-[1080px] mx-auto px-5 md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6 text-black text-[18px] leading-[28px]">
            <p>
              Nepal Telecom is a state-owned Telecommunication Service Provider in Nepal and providing various mobile and Fixed-line services to the people of Nepal.
            </p>
            <p>
              We have participated in Mid hill Router RFP of Nepal telecom and successfully won this bid by offering world-class Cisco Routers solution to NT. This project is under the execution phase currently.
            </p>
          </div>
          <div>
            <img
              src="/images/nepal-telecom.jpg"
              alt="Nepal Telecom"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="text-black text-[18px] leading-[28px]">
          <p>
            Also got an opportunity to participate another project of Leased line RFP for Nepal Telecom. We have won this bid as well with providing CITIUS’s own software solution of AAA along with other network elements.
          </p>
        </div>
      </section>

      {/* Bottom Previous / Next Post links */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden border-r border-white/10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/rakuten.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
            <span className="text-[15px] text-white mb-2">
              Previous Post
            </span>
            <SmartLink
              to="/rakuten-mobile/"
              className="text-[26px] md:text-[34px] font-normal font-sans hover:opacity-80 transition-opacity after:absolute after:inset-0"
            >
              Rakuten Mobile
            </SmartLink>
          </div>
        </div>

        <div className="site-container pb-[60px] md:pb-[80px]"><div className="relative h-[250px] md:h-[300px] overflow-hidden img-zoom" data-reveal>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/net-broadband.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
            <span className="text-[15px] text-white mb-2">
              Next Post
            </span>
            <SmartLink
              to="/net-broadband/"
              className="text-[26px] md:text-[34px] font-normal font-sans hover:opacity-80 transition-opacity after:absolute after:inset-0"
            >
              Net+ Broadband
            </SmartLink>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
