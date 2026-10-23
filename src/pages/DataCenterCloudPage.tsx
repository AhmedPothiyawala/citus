import React from 'react';
import { PageHero } from '../components/Widgets';

export const DataCenterCloudPage: React.FC = () => {
  const points = [
    'Data Centers design and Architect',
    'Resource planning and requirement',
    'Manage services and NOC operations for DCs',
    'Cloud migration activities in a Multi-cloud environment',
    'Automation',
    'Cybersecurity.',
  ];

  return (
    <div className="bg-white">
      <PageHero title="Data Center & Cloud" />

      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/Data-Centers-1.jpg"
              alt="Data Center & Cloud"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <p className="text-black text-[18px] sm:text-lg leading-[28px] font-normal">
              Citiuscomm is working to set up Data Centers in India in collaboration with technology partners. We are in business to help our customers with these services.
            </p>

            <ol className="list-decimal list-inside space-y-2 text-black text-[18px]">
              {points.map((pt, index) => (
                <li key={index}>{pt}</li>
              ))}
            </ol>

            <p className="text-black text-[18px] leading-[28px]">
              We unlock the cloud operating model for every business and enable their digital transformation strategies to succeed. Migrations pose tough challenges that can be met with a careful strategy and the right resources at hand. Our services allows you to easily migrate physical, virtual and cloud workloads to and from any environment with minimal risk and near-zero downtime ofdata in one scalable platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
