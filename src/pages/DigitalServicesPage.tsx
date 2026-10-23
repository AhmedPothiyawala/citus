import React from 'react';
import { PageHero } from '../components/Widgets';

export const DigitalServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
      <PageHero title="Digital Services" backgroundImage="/images/page-title-bar.jpg" />

      {/* 1. CYBERSECURITY */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/CYBERSECURITY.jpg"
              alt="Cybersecurity"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
              CYBERSECURITY
            </h2>
            <p className="text-black text-[18px] font-medium leading-[28px]">
              The methods and capabilities used to prevent and protect information systems and data from damage, unauthorized use, modification, or exploitation.
            </p>
            <p className="text-black text-[18px] leading-[28px]">
              Citiuscomm highlights cybersecurity counter-measures such as risk management, security upgrades, and compliance programs as we drive digitalization for our clients. Our services can support both upstream and downstream operations, including strategy consulting, security implementation, and technical consulting. Through our long-term endeavors in research and development, we have accumulated technical expertise that will help you protect your enterprise against cybersecurity risks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. IT OPTIMIZATION */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-[50px] items-center">
            <div className="space-y-4">
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
                IT OPTIMIZATION
              </h2>
              <p className="text-black text-[18px] font-medium leading-[28px]">
                The ability of information and data systems to quickly respond to market dynamics; meet the strategic needs of the business; and balance costs and risks.
              </p>
              <p className="text-black text-[18px] leading-[28px]">
                Today, as new companies emerge that disrupt conventional ideas in all kinds of industries, companies must constantly consider streamlining their IT, converging ecosystems with partners, business processes, end-user reputations, commercial value, etc. Through various means such as optimizing and automating IT processes and resources, moving to cloud-based systems, and improving profitability and productivity, Citiuscomm will help you focus on digitization to stimulate enterprise reform.
              </p>
            </div>

            <div>
              <img
                src="/images/IT-OPTIMIZATION.jpg"
                alt="IT Optimization"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DATA INTELLIGENCE */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/DATA-INTELLIGENCE.jpg"
              alt="Data Intelligence"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
              DATA INTELLIGENCE
            </h2>
            <p className="text-black text-[18px] leading-[28px]">
              Citiuscomm’s Data & Intelligence brings you the maximum benefit from a deep understanding of the business and technology trends in your company’s field. Citiuscomm leverages all the technologies to provide industry-specific solutions and decision-making systems based on AI and analysis.
            </p>
            <p className="text-black text-[18px] leading-[28px]">
              The purpose of Data & Intelligence is to turn huge dormant big data into meaningful and even intelligent data. The techniques and technologies used to create measurable business value from data, information, and knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTELLIGENT AUTOMATION */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-[50px] items-center">
            <div className="space-y-4">
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
                INTELLIGENT AUTOMATION
              </h2>
              <h4 className="text-[20px] font-bold text-black font-heading">
                DATA SCIENCE & AI
              </h4>
              <p className="text-black text-[18px] leading-[28px]">
                Citiuscomm leverages AI and Intelligent Automation to accelerate business automation. We are aiming for automation in all IT processes, from data centers to end-users and from the cloud to applications. Citiuscomm will leverage all the leading advanced technologies available to apply the benefits of Intelligent Automation to all of your business processes.
              </p>
              <p className="text-black text-[18px] leading-[28px]">
                The execution of automated business processes using artificial intelligence (AI), machine learning, and data science to make “intelligent” decisions & drive better outcomes.
              </p>
            </div>

            <div>
              <img
                src="/images/INTELLIGENT-AUTOMATION-1.jpg"
                alt="Intelligent Automation"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERNET OF THINGS */}
      <section className="page-section site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr] gap-10 lg:gap-[50px] items-center">
          <div>
            <img
              src="/images/IoT-solutions.jpg"
              alt="Internet of Things"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
              INTERNET OF THINGS
            </h2>
            <p className="text-black text-[18px] leading-[28px]">
              Internet of Things (IoT) is the first step toward digitalization. Citiuscomm is able to provide optimal IoT solutions by combining solutions and services with its business knowledge and other DFAs. The growth of this field and the opportunities it will create are enormous. The opportunity to grow and develop your business stems from how you will tackle the IoT industry and combine it with other areas of digital focus to create unique solutions.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CLOUD */}
      <section className="page-section bg-[#f4f5f7]">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[62fr_38fr] gap-10 lg:gap-[50px] items-center">
            <div className="space-y-4">
              <h2 className="text-[30px] leading-[1.2] font-bold text-black font-heading">
                CLOUD
              </h2>
              <h4 className="text-[20px] font-bold text-black font-heading">
                SDWAN, Meraki, Tibco syslog solutions
              </h4>
              <p className="text-black text-[18px] leading-[28px]">
                Citiuscomm leverages AI and Intelligent Automation to accelerate business automation. We are aiming for automation in all IT processes, from data centers to end-users and from the cloud to applications. Citiuscomm will leverage all the leading advanced technologies available to apply the benefits of Intelligent Automation to all of your business processes.
              </p>
              <p className="text-black text-[18px] leading-[28px]">
                The execution of automated business processes using artificial intelligence (AI), machine learning, and data science to make “intelligent” decisions & drive better outcomes.
              </p>
            </div>

            <div>
              <img
                src="/images/cloud.jpg"
                alt="Cloud Solutions"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
