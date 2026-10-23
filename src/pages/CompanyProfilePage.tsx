import React from 'react';
import { PageHero } from '../components/Widgets';

export const CompanyProfilePage: React.FC = () => {
  return (
    <div>
      <PageHero title="Company Profile" />

      {/* Main Content - Two column text + image */}
      <section className="page-section sm:py-28 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src="/images/company-profile.jpg"
                alt="CITIUSCOMM Corporate Architecture"
                className="w-full max-w-[425px] h-auto"
                loading="lazy"
              />
            </div>

            {/* Right Text */}
            <div className="space-y-6 text-black text-[18px] leading-[28px] font-sans">
              <p>
                <strong>&ldquo;CITIUSCOMM&rdquo; a Multi-National Company</strong>, is the fastest growing Technology Aggregator and <strong>offers carrier-grade solutions</strong> for the dynamically developing <strong>Communications and Networking Industry</strong>.
              </p>

              <p>
                CITIUSCOMM is providing E2E bespoke turnkey solutions which include <strong>Product, Service Delivery, NOC Operations, and Project Management</strong>.
              </p>

              <p>
                CITIUSCOMM is known for delivering cost-effective and high-quality solutions to their customers, efficiently and consistently. Our vast partner tie-ups bundled with our years of experience and knowledge puts us in a unique position to handle end-to-end deployments and system integrations for our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative bg-black text-white pt-[60px] pb-[110px] overflow-hidden [clip-path:ellipse(85%_100%_at_50%_0%)]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/images/Video-Background.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        <div className="relative site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Vision */}
            <div className="space-y-6 text-center">
              <h2 className="text-[35px] leading-[45px] font-normal font-heading text-white">
                Vision
              </h2>
              <ul className="space-y-4 text-[18px] text-white font-sans leading-[28px]">
                <li>
                  
                  <span>We realize the dreams of our clients through long-term relationships.</span>
                </li>
                <li>
                  
                  <span>We enhance our creativity by balancing Innovation and Reliability</span>
                </li>
                <li>
                  
                  <span>We want to be the most preferred and admired brand in Technology Aggregation</span>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="space-y-6 text-center">
              <h2 className="text-[35px] leading-[45px] font-normal font-heading text-white">
                Mission
              </h2>
              <p className="text-[18px] text-white font-sans leading-[28px]">
                Increase our Coverage and Competency to be the main Solution Provider that meets all Technological Requirements and contributes to a more harmonious society.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
