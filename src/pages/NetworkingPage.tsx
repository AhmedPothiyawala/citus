import React from 'react';
import { PageHero } from '../components/Widgets';

export const NetworkingPage: React.FC = () => {
  const productRange = [
    'Branch Routers',
    'Cloud Edge',
    'Industrial Routers and Gateways',
    'Mobile Internet Routers',
    'Network Functions Virtualization',
    'Service Provider Core Routers',
    'Service Provider Edge Routers',
    'Service Provider Infrastructure Software',
  ];

  return (
    <div className="bg-white">
      <PageHero title="Networking" />

      {/* Section 1: ROUTER AND SWITCHES */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/Router-and-Switches-1-1.jpg"
              alt="Router and Switches"
              className="w-full max-w-[545px] mx-auto h-auto object-cover"
            />
          </div>

          <div>
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading mb-6 tracking-wide uppercase">
              ROUTER AND SWITCHES
            </h2>

            <p className="text-black text-[18px] leading-[28px] mb-4">
              Citius Communications is partnered with OEMs like Cisco, Juniper, HPE, ZTE, Huawei etc. for Network Switches and Routers.
            </p>
            <p className="text-black text-[18px] leading-[28px] mb-6">
              We are dealing with all ranges of routers and switches i.e. CPE, Access, Distribution, and Core network. 1G, 10G, 100G devices with different port configurations. And Target Verticals are ISP, SP and Data Centers.
            </p>

            <h3 className="text-[20px] font-bold text-black font-heading mb-4">
              All Product Range:
            </h3>

            <ul className="list-disc list-inside space-y-2 text-black text-[18px]">
              {productRange.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: SD WAN */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-[50px] items-center">
            <div>
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading mb-6 tracking-wide uppercase">
                SD WAN
              </h2>

              <p className="text-black text-[18px] leading-[28px] mb-4">
                SD-WAN simplifies network management and optimizes connection to data-centers with high level of security. SDWAN provides the bandwidth management and intelligence needed to support modern applications throughout an organization such as branch offices, remote offices and data centers.
              </p>
              <p className="text-black text-[18px] leading-[28px] mb-4">
                Our implementation of SDWAN solution is targeted primarily toward small to midsize enterprises that are looking to incorporate SDWAN into their networking infrastructure. This solution will help enterprises achieve maximum connectivity options, minimal downtime through agnostic connectivity, and highly streamlined network architecture.
              </p>
              <p className="text-black text-[18px] leading-[28px]">
                The solution is intended for businesses whose offices are spread across multiple geographic locations and need to install a network so that all locations can work, communicate and share information easily, securely, and effectively.
              </p>
            </div>

            <div>
              <img
                src="/images/sd-wan.png"
                alt="SD WAN Solution"
                className="w-full max-w-[500px] mx-auto h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
