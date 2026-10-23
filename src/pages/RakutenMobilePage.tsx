import React from 'react';
import { SmartLink } from '../components/SmartLink';

export const RakutenMobilePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[550px] pt-[60px] md:pt-[110px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/rakuten.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#1b2a3a]/45" />

        <div className="relative site-container text-center w-full">
          <span className="inline-block px-[10px] py-[2px] border border-white text-white text-[15px] font-medium mb-4 rounded-[3px]">
            Case Studies
          </span>
          <h1 className="page-hero-title text-white mb-4">
            Rakuten Mobile
          </h1>
          <div className="text-[18px] text-white">
            August 12, 2019
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pt-[60px] md:pt-[80px] pb-[50px] max-w-[1080px] mx-auto px-5 md:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <p className="text-black text-[18px] leading-[28px]">
            Rakuten, Inc. is a Japanese electronic commerce and online retailing company based in Tokyo and was founded in 1997 by Japanese businessman Hiroshi Mikitani, Now Rakuten has planned to launch fully virtualized telecom network across Japan. This will be first kind of network launched across global by any telecom provider.
          </p>
          <div>
            <img
              src="/images/rakuten.jpg"
              alt="Rakuten Mobile"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="space-y-6 text-black text-[18px] leading-[28px]">
          <p>
            Planned to have target to get app 10 -15 Mn subscriber within time span of 3 years.
          </p>
          <p>
            Citius is successful in providing various solutions to Rakuten i.e RAN site solution(4G/5G Antenna and its accesories, DAS solutions , Security core solutions (DDOS, Network Analytics, DPI etc.) and working continuously to get many more.
          </p>
        </div>
      </section>

      {/* Bottom Next Post link banner */}
      <div className="site-container pb-[60px] md:pb-[80px]"><div className="relative h-[250px] md:h-[300px] overflow-hidden img-zoom" data-reveal>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/nepal-telecom.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-[15px] text-white mb-2">
            Next Post
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
