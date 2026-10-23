import React from 'react';
import { PageHero } from '../components/Widgets';

export const PartnersPage: React.FC = () => {
  const partners = [
    { name: 'Cisco', logo: '/images/cisco.jpg' },
    { name: 'Juniper', logo: '/images/juniper.jpg' },
    { name: 'Dell', logo: '/images/dell.jpg' },
    { name: 'Atrinet', logo: '/images/atrinet-1.jpg' },
    { name: 'TIBCO', logo: '/images/tibco-1.jpg' },
    { name: 'Prolabs', logo: '/images/prolabs.jpg' },
    { name: 'HP', logo: '/images/hp.jpg' },
    { name: 'Oracle', logo: '/images/oracle-1.jpg' },
    { name: 'Extreme', logo: '/images/extreme.jpg' },
    { name: 'Allot', logo: '/images/allot.jpg' },
    { name: 'Efficient', logo: '/images/efficient.jpg' },
    { name: 'DIY CAM', logo: '/images/diy-cam.jpg' },
    { name: 'Casa Systems', logo: '/images/casa-systems.jpg' },
    { name: 'New IT V', logo: '/images/new-it-v.jpg' },
    { name: 'Avanseus', logo: '/images/avanseus.jpg' },
    { name: 'Adopt', logo: '/images/Adopt-Logo.jpg' },
  ];

  return (
    <div className="bg-white">
      <PageHero title="Partners" />

      {/* Intro section */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[50px] items-center">
          <div className="space-y-6 text-black text-[18px] leading-[28px]">
            <p>
              Citius would like to work in areas of Next Gen Innovative Technology Services with various solutions like vRAN (4G ➔ 5G), Cloud, NFV, 5G, SD-WAN etc. and help Telcos execute seamlessly in view of its recent successful experience in various service providers in India and other countries.
            </p>
            <p>
              Citiuscomm have Strategic relationship with the executive level of Technology Partners to be able to execute strategic Technology Project with differentiation. We have only added the best products in their respective domain to our portfolio in order to provide the best seed solutions and services to our customers.
            </p>
            <p>
              Accordingly, Citiuscomm has put together strategic partnership with multiple technology partners who are leaders in their segment and are keen to work with us for various projects in global Market for long term.
            </p>
          </div>

          <div>
            <img
              src="/images/partnership.jpg"
              alt="Strategic Technology Partnerships"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* 16 OEM Partner Logo Grid */}
      <section className="page-section bg-white border-t border-slate-100">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-14 sm:gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 h-24 hover:opacity-100 transition-opacity"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[110px] sm:max-h-16 max-w-[80%] sm:max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
