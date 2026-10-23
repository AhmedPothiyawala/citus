import React from 'react';
import { SmartLink } from '../components/SmartLink';

export const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      title: 'Rakuten Mobile',
      href: '/rakuten-mobile/',
      date: 'August 12, 2019',
      image: '/images/rakuten.jpg',
      excerpt: 'Rakuten, Inc. is a Japanese electronic commerce and online retailing…',
    },
    {
      title: 'Nepal Telecom',
      href: '/nepal-telecom/',
      date: 'August 12, 2018',
      image: '/images/nepal-telecom.jpg',
      excerpt: 'Nepal Telecom is a state-owned Telecommunication Service Provider in Nepal…',
    },
    {
      title: 'Net+ Broadband',
      href: '/net-broadband/',
      date: 'August 12, 2017',
      image: '/images/net-broadband.jpg',
      excerpt: 'Net+ Broadband is 100% subsidiary of Fastway Transmission Pvt Ltd…',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="relative h-[220px] md:h-[400px] pt-[56px] md:pt-[52px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/optical-fiber.jpg')` }}
        />
        <div className="absolute inset-0 bg-[#062033]/65" />

        <div className="relative site-container text-left w-full">
          <span className="text-white text-[15px] font-semibold block mb-1">
            Category
          </span>
          <h1 className="page-hero-title text-white">
            Case Studies
          </h1>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-[34px] items-start">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-white overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.10)] flex flex-col"
              >
                <SmartLink to={study.href} className="block aspect-[600/403] overflow-hidden bg-slate-100 img-zoom">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </SmartLink>

                <div className="px-[30px] pt-5 pb-[34px] flex flex-col flex-1">
                  <span className="text-[#166fb0] text-[15px] font-medium mb-3">
                    Case Studies
                  </span>
                  <h2 className="text-[30px] leading-[1.2] font-normal text-black font-sans mb-3 hover:text-[#166fb0] transition-colors">
                    <SmartLink to={study.href}>{study.title}</SmartLink>
                  </h2>
                  <p className="text-black text-[18px] leading-[28px] mb-5 flex-1">
                    {study.excerpt}
                  </p>
                  <div className="text-[12px] text-black">
                    {study.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-[44px]">
            {/* Search */}
            <div>
              <h3 className="text-[18px] font-semibold text-black mb-3">
                Search
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder=""
                  className="flex-1 min-w-0 px-3 h-[46px] bg-[#f4f4f4] border-0 border-b border-[#ddd] text-[15px] outline-none focus:border-[#166fb0]"
                />
                <button
                  type="button"
                  className="px-5 h-[46px] bg-[#166fb0] text-white text-[15px] font-medium rounded-[3px] hover:bg-[#0f5487] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-[42px] leading-[1.1] font-bold text-black font-heading mb-5">
                Recent Posts
              </h3>
              <ul className="space-y-3 text-[18px] font-semibold text-black">
                {caseStudies.map((study) => (
                  <li key={study.title}>
                    <SmartLink to={study.href} className="hover:text-[#166fb0] transition-colors">
                      {study.title}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Comments */}
            <div>
              <h3 className="text-[42px] leading-[1.1] font-bold text-black font-heading mb-4">
                Recent Comments
              </h3>
              <p className="text-[18px] text-black">
                No comments to show.
              </p>
            </div>
            {/* Trending Posts */}
            <div>
              <h3 className="text-[18px] font-semibold text-black mb-4">Trending Posts</h3>
              <div className="space-y-3">
                {caseStudies.map((study, idx) =>
                  idx === 0 ? (
                    <SmartLink key={study.title} to={study.href} className="relative block h-[186px] overflow-hidden img-zoom">
                      <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/35" />
                      <div className="absolute left-6 bottom-5 text-white text-[18px] leading-[26px] font-medium">
                        <div>{study.title}</div>
                        <div className="opacity-90">{study.date}</div>
                      </div>
                    </SmartLink>
                  ) : (
                    <SmartLink key={study.title} to={study.href} className="block border border-[#e6e6e6] px-6 py-4 hover:border-[#166fb0] transition-colors">
                      <div className="text-[18px] font-semibold text-black">{study.title}</div>
                      <div className="text-[18px] text-black">{study.date}</div>
                    </SmartLink>
                  )
                )}
              </div>
            </div>

            {/* Thumbnail list */}
            <div>
              <h3 className="text-[18px] font-semibold text-black mb-4">More Case Studies</h3>
              <div className="space-y-4">
                {caseStudies.map((study) => (
                  <SmartLink key={study.title} to={study.href} className="flex items-center gap-5 group">
                    <img src={study.image} alt={study.title} className="w-[66px] h-[66px] object-cover" />
                    <div>
                      <div className="text-[18px] font-semibold text-black group-hover:text-[#166fb0] transition-colors">{study.title}</div>
                      <div className="text-[18px] text-black">{study.date}</div>
                    </div>
                  </SmartLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
