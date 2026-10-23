import React from 'react';
import { PageHero } from '../components/Widgets';

export const WhyUsPage: React.FC = () => {
  const strengths = [
    'Excellent Relationship with all Technology Partners',
    'Strong Supply Chain Management',
    'Executed large projects with Telecom, Cable, and Government Customers',
    'Transparent and Committed Team',
    'Strong Pre-Sales Team with Location Wise Coverage',
  ];

  const differentiators = [
    { title: 'Great Access to Customers', icon: '/images/Great-Access-1.png' },
    { title: 'Multiple Vendor Tie –Ups', icon: '/images/Multiple-Vendor.png' },
    { title: 'System Integration Capabilities', icon: '/images/System-Integration.png' },
    { title: 'Preferred Partner', icon: '/images/Preferred-Partner.png' },
    { title: 'Make in India - India Solutions', icon: '/images/Make-in-India.png' },
    { title: 'Warehousing Across India', icon: '/images/warehouse.png' },
  ];

  return (
    <div className="bg-white">
      <PageHero title="Why Us" />

      {/* Section 1: Our Strength */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/Our-strength-image.jpg"
              alt="Our Strength"
              className="w-full max-w-[557px] mx-auto h-auto object-cover"
            />
          </div>

          <div>
            <h2 className="text-[30px] md:text-[40px] leading-[1.5] font-medium text-black font-sans mb-4">
              Our Strength
            </h2>

            <ul className="space-y-4">
              {strengths.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-black text-[18px] leading-[28px]">
                  <span className="text-[#166fb0] font-bold text-lg select-none leading-none mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="pt-[20px] pb-[10px] bg-white text-center max-w-[860px] mx-auto px-5">
        <p className="text-[18px] text-black leading-[28px]">
          Our in-depth understanding of the telecommunications, ICT, broadband, cable, and broadcast industry gives us a holistic view, enabling us to provide customized solutions to our customers.
        </p>
      </section>

      {/* Section 2: What Sets Us Apart */}
      <section className="page-section bg-white">
        <div className="site-container">
          <h2 className="section-title text-black text-center mb-[50px]">
            What Sets Us Apart
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {differentiators.map((diff, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="w-[150px] h-[130px] mb-4 flex items-center justify-center">
                  <img
                    src={diff.icon}
                    alt={diff.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-[20px] font-medium text-black font-sans">
                  {diff.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
