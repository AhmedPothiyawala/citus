import React from 'react';
import { PageHero } from '../components/Widgets';

export const LeadershipPage: React.FC = () => {
  const leaders = [
    {
      name: 'SURENDRA SANCHETI',
      experience: '20 Years Experience',
      role: 'Founder and Managing Director',
      image: '/images/Surendra-Sancheti.png',
    },
    {
      name: 'PRAMOD YADAV',
      experience: '19 Years Experience',
      role: 'Senior roles at Mavenir, Mitel, Reliance Jio IIML / Harvard Business Publishing',
      image: '/images/pramod_yadav.png',
    },
    {
      name: 'PIYUSH DIKSHIT',
      experience: '25 Years Experience',
      role: 'CXO Positions at Samvardhana Motherson Group, Amtek Auto, Corning Inc., IIM C',
      image: '/images/Piyush-Dikshit.png',
    },
  ];

  return (
    <div>
      <PageHero title="Leadership" />

      <section className="page-section sm:py-32 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">
            {leaders.map((leader) => (
              <div key={leader.name} className="flex flex-col items-center">
                <div className="w-[250px] h-[250px] rounded-full overflow-hidden bg-slate-100 mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-[25px] leading-[35px] font-bold font-heading text-black uppercase">
                  {leader.name}
                </h3>

                <p className="mt-2 text-[18px] sm:text-[18px] font-medium text-black font-sans">
                  {leader.experience}
                </p>

                <p className="mt-2 text-[18px] sm:text-[18px] text-[#166fb0] font-sans leading-[28px] max-w-xs">
                  {leader.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
