import React from 'react';
import { PageHero } from '../components/Widgets';

export const SecuritySolutionsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero title="Security Solutions" />

      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/solutions/security-solutions.jpg"
              alt="Security Solutions"
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-black font-heading mb-2">
                DDoS
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised. Mitigate DDoS attacks and assure Quality of Experience (QoE) inline, in seconds, before any damage to your network.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black font-heading mb-2">
                DPI
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                Deep Packet Inspection (and filtering) enables advanced network management, user service. Provides Actionable network intelligence to make informed business decisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black font-heading mb-2">
                Firewall
              </h2>
              <p className="text-black text-[18px] leading-[28px]">
                Firewalls provide protection against outside cyber attackers by shielding your computer or network from malicious or unnecessary network traffic. Firewalls can also prevent malicious software from accessing a computer or network via the internet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
