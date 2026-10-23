import React from 'react';
import { PageHero } from '../components/Widgets';

export const IndustryApplicationsPage: React.FC = () => {
  const telecomList = [
    'Router and Switches',
    'Core/Backbone DWDM Solution',
    'Network Security',
    'Servers/Storage',
    'Cloud Computing',
    'AI/ML Solutions',
    'Wireless Solutions',
    'OSS/BSS',
    'NOC Infrastructure',
    'Network Automation',
    'Managed Services',
  ];

  const cableList = [
    'FTTX',
    'Wireless Solutions',
    'IP MPLS Routing and Switching',
    'OSS/BSS',
    'CPE Devices – DVB, IPTV, STB/Dongle',
    'Android TV/AOSP',
    'Digital Headend & Broadcast solutions',
    'IPTV/OTT, DRM Solutions',
    'Optical Networking and Transport Solutions',
  ];

  const enterpriseList = [
    'Private 5G Solutions',
    'Router and Switches',
    'Core/ Backbone DWDM Solution',
    'Security',
    'Network Security',
    'Servers/Storage',
    'Cloud Computing',
    'AI/ML',
    'WIFI Solutions',
    'OSS/BSS',
    'Remote Connectivity Solutions',
    'NOC/SoC Infrastructure',
    'OPEX Based Solutions',
    'IoT Solutions',
    'Network Automation',
    'Managed Services',
  ];

  return (
    <div className="bg-white">
      <PageHero title="Industry Applications" />

      <section className="page-section site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Card 1: TELECOM (Blue card) */}
          <div className="bg-[#166fb0] text-white rounded overflow-hidden shadow-md flex flex-col h-full">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/Telecom.jpg"
                alt="Telecom Vertical"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex-1">
              <h4 className="text-[25px] leading-[30px] font-bold font-heading mb-6 uppercase">
                TELECOM
              </h4>
              <ul className="space-y-2.5 text-[18px] sm:text-[18px]">
                {telecomList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white/80 leading-none mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: CABLE AND BROADBAND (Light card) */}
          <div className="bg-[#f4f5f7] text-black rounded overflow-hidden shadow-md flex flex-col h-full">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/optical-fiber.jpg"
                alt="Cable and Broadband"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex-1">
              <h4 className="text-[25px] leading-[30px] font-bold font-heading mb-6 uppercase text-black">
                CABLE AND BROADBAND
              </h4>
              <ul className="space-y-2.5 text-[18px] sm:text-[18px] text-black">
                {cableList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-black leading-none mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: ENTERPRISE, DATA CENTER, GOVERNMENT (Blue card) */}
          <div className="bg-[#166fb0] text-white rounded overflow-hidden shadow-md flex flex-col h-full">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/Enterprise.jpg"
                alt="Enterprise, Data Center, Government"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex-1">
              <h4 className="text-[25px] leading-[30px] font-bold font-heading mb-6 uppercase">
                ENTERPRISE, DATA CENTER, GOVERNMENT
              </h4>
              <ul className="space-y-2.5 text-[18px] sm:text-[18px]">
                {enterpriseList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white/80 leading-none mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
