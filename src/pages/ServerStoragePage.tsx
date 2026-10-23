import React from 'react';
import { PageHero } from '../components/Widgets';

export const ServerStoragePage: React.FC = () => {
  const serverTypes = [
    'Rack Server',
    'Tower Server',
    'Modular Server',
    'Specialty Server',
    'Rugged Servers',
  ];

  return (
    <div className="bg-white">
      <PageHero title="Server & Storage" />

      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/Servers-and-Storage-1.jpg"
              alt="Server and Storage Infrastructure"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className="text-black text-[18px] sm:text-lg leading-[28px] font-normal">
              Servers and Storage Infrastructure are key components of an enterprise’s technology environment. They run mission-critical business applications with many of them.
            </p>

            <p className="text-black text-[18px] leading-[28px]">
              We are partnered with Dell, HPE, ZTE, and Huawei and provide cost-effective techno-commercial solutions to the customer.
            </p>

            <div>
              <h2 className="text-[20px] font-bold text-black font-heading mb-4">
                We provide the following types of servers:
              </h2>

              <ul className="list-disc list-inside space-y-2 text-black text-[18px]">
                {serverTypes.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
