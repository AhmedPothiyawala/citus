import React, { useState } from 'react';
import { PageHero } from '../components/Widgets';

export const CareersPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'IP Engineers',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <PageHero title="Careers" />

      {/* Intro section */}
      <section className="pb-[40px] md:pl-[85px] lg:pl-[85px]">
        <div className="grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-10 lg:gap-[50px] items-center">
          <div className="space-y-6 text-black text-[18px] leading-[28px] px-5 md:px-0 pt-[40px] lg:pt-0">
            <p>
              Let us work together to solve the most challenging problems of the industry with the knowledge of our unique backgrounds and sharp skillsets.
            </p>
            <p>
              Bring in your enthusiasm, your ideas, and your sincerity and we offer the best infrastructure and technological support for you!
            </p>
            <p className="font-bold text-black">
              Let’s build a new dynamic world together!
            </p>
          </div>

          <div>
            <img
              src="/images/3.jpg"
              alt="Careers at CITIUSCOMM"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="pt-[40px] pb-[50px] site-container lg:!px-[115px]">
        <h2 className="section-title text-[#166fb0] mb-[22px]">
          Openings
        </h2>

        <div className="divide-y divide-[#ddd] border-b border-[#ddd]">
          {/* 1. IP Engineers */}
          <div className="py-[15px] md:py-[20px]">
            <button
              onClick={() => toggleAccordion(0)}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-black hover:text-[#166fb0] transition-colors"
            >
              <h3 className="text-[26px] md:text-[35px] leading-[45px] font-normal text-black font-sans">IP Engineers</h3>
              <span className="w-[30px] h-[30px] shrink-0 rounded-full border border-[#555] flex items-center justify-center text-[#555] font-light text-[22px] leading-none">
                {openIndex === 0 ? '−' : '+'}
              </span>
            </button>
            {openIndex === 0 && (
              <div className="pt-4 pb-6 space-y-4 text-black text-[18px] sm:text-[18px] leading-[28px]">
                <p>
                  IP network deployment including planning, engineering, implementation, L2/L3 operation and maintenance tasks. Support for global projects. VFHU IP network budget planning and control. Deliver the necessary resources for local and global projects, managing the cooperation with other internal teams, departments, and vendors. Covered domains: IP Core network (IP/MPLS, CPN, Data Center), Office IT IP network, Vodafone retail shops IP network, VoIP network.
                </p>
                <p className="font-semibold text-black">We are looking for:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>MSc, BSc, B.Tech degree in Telecommunication, Information Technology or Electrical engineering</li>
                  <li>2 years of experience in IP networks</li>
                  <li>Deep knowledge and understanding of IP networks and protocols, network security</li>
                  <li>Good communication skills</li>
                  <li>Intermediate spoken and written English</li>
                  <li>Excellent computer skills</li>
                  <li>Advantage: CCNA/CCNP Cisco certification or similar network-level exam</li>
                </ul>
              </div>
            )}
          </div>

          {/* 2. Linux Enterprise Support Analyst */}
          <div className="py-[15px] md:py-[20px]">
            <button
              onClick={() => toggleAccordion(1)}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-black hover:text-[#166fb0] transition-colors"
            >
              <h3 className="text-[26px] md:text-[35px] leading-[45px] font-normal text-black font-sans">Linux Enterprise Support Analyst</h3>
              <span className="w-[30px] h-[30px] shrink-0 rounded-full border border-[#555] flex items-center justify-center text-[#555] font-light text-[22px] leading-none">
                {openIndex === 1 ? '−' : '+'}
              </span>
            </button>
            {openIndex === 1 && (
              <div className="pt-4 pb-6 space-y-4 text-black text-[18px] sm:text-[18px] leading-[28px]">
                <p className="font-semibold text-black">Core Capabilities / Experience:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>uX/Linux/RedHat System Operation& configuration experience</li>
                  <li>IDM / Free IPA and LDAP Services Configuration & Baseline system installation experience</li>
                  <li>X-Domain Linux / AD integration experience desirable.</li>
                  <li>Operating in a multi-domain (AD and/or IDM)</li>
                  <li>Understand PKI, Certificates, and Operation (Dogtag, Certmonger) in addition to Kerberos in uX domain</li>
                  <li>Familiar with domain services including DNS/NTP services</li>
                  <li>Past experience working with mixed AD/uX environment</li>
                  <li>Command-line expertise with Bash, Ansible and common tools</li>
                </ul>
              </div>
            )}
          </div>

          {/* 3. Security CoE Infrastructure Section */}
          <div className="py-[15px] md:py-[20px]">
            <button
              onClick={() => toggleAccordion(2)}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-black hover:text-[#166fb0] transition-colors"
            >
              <h3 className="text-[26px] md:text-[35px] leading-[45px] font-normal text-black font-sans">Security CoE Infrastructure Section</h3>
              <span className="w-[30px] h-[30px] shrink-0 rounded-full border border-[#555] flex items-center justify-center text-[#555] font-light text-[22px] leading-none">
                {openIndex === 2 ? '−' : '+'}
              </span>
            </button>
            {openIndex === 2 && (
              <div className="pt-4 pb-6 space-y-4 text-black text-[18px] sm:text-[18px] leading-[28px]">
                <p className="font-semibold text-black">MandatoryExperience & Skills:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>Minimum 2 to 5 years of security products (eg. ASA, FTD, WAF, DDoSetc) installation, configuration, development, and testing</li>
                  <li>Strong understanding of cloud and virtualization security, mobile communication security, cryptography algorithms, security protocol, network security, mobile networks, TCP/IP networking, etc.</li>
                  <li>Securing network systems by establishing and enforcing policies.</li>
                  <li>Collaborating with internal teams, third-party support and service vendors to ensure that the network remains operational.</li>
                  <li>Key technologies such as SAE/LTE, TCP/IP, IMS, virtualization, cloud, etc.</li>
                  <li>Knowledge of Security algorithm (RSA, AES etc.) and security protocols (IPsec, TLS, etc.)</li>
                </ul>
                <p className="font-semibold text-black pt-2">Preferred Experience& Skills:</p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>Past experience working with mixed AD/uX environment</li>
                  <li>Command-line expertise with Bash, Ansible and common tools</li>
                  <li>Experience/Knowledge of CISCO, F5, Radware security product is a plus.</li>
                  <li>Has excellent oral and written communication skills in English.</li>
                  <li>Good presentation skills with and ability to interact effectively.</li>
                  <li>Demonstrating the ability to adapt in a dynamic work environment.</li>
                </ul>
              </div>
            )}
          </div>

          {/* 4. Others */}
          <div className="py-[15px] md:py-[20px]">
            <button
              onClick={() => toggleAccordion(3)}
              className="w-full flex items-center justify-between text-left py-2 font-medium text-black hover:text-[#166fb0] transition-colors"
            >
              <h3 className="text-[26px] md:text-[35px] leading-[45px] font-normal text-black font-sans">Others</h3>
              <span className="w-[30px] h-[30px] shrink-0 rounded-full border border-[#555] flex items-center justify-center text-[#555] font-light text-[22px] leading-none">
                {openIndex === 3 ? '−' : '+'}
              </span>
            </button>
            {openIndex === 3 && (
              <div className="pt-4 pb-6 space-y-4 text-black text-[18px] sm:text-[18px] leading-[28px]">
                <p>
                  If your skills do not directly align with the above positions but you bring passion, high integrity, and deep technical curiosity, submit your resume to sales@citiuscomm.com.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Apply Now Section */}
      <section className="pt-[40px] pb-[40px] max-w-[900px] mx-auto px-5">
        <div className="bg-white rounded-[3px] px-6 py-6 sm:px-[24px] shadow-[0_6px_28px_rgba(0,0,0,0.12)]">
          <h2 className="section-title text-[#166fb0] text-center mb-6">
            Apply Now
          </h2>

          {submitted ? (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded text-center">
              Thank you for your application! Our HR team will review your profile.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="career-name" className="block text-[18px] font-semibold text-black mb-1">
                    Your Name
                  </label>
                  <input
                    id="career-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f4] border-0 border-b border-[#ddd] rounded-none focus:bg-white focus:border-[#166fb0] outline-none text-black text-[18px]"
                  />
                </div>

                <div>
                  <label htmlFor="career-email" className="block text-[18px] font-semibold text-black mb-1">
                    Your Email
                  </label>
                  <input
                    id="career-email"
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f4] border-0 border-b border-[#ddd] rounded-none focus:bg-white focus:border-[#166fb0] outline-none text-black text-[18px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="career-phone" className="block text-[18px] font-semibold text-black mb-1">
                    Contact No.
                  </label>
                  <input
                    id="career-phone"
                    type="tel"
                    required
                    placeholder="Contact No."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f4] border-0 border-b border-[#ddd] rounded-none focus:bg-white focus:border-[#166fb0] outline-none text-black text-[18px]"
                  />
                </div>

                <div>
                  <label htmlFor="career-position" className="block text-[18px] font-semibold text-black mb-1">
                    Select Position
                  </label>
                  <select
                    id="career-position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f4f4f4] border-0 border-b border-[#ddd] rounded-none focus:bg-white focus:border-[#166fb0] outline-none text-black text-[18px]"
                  >
                    <option value="IP Engineers">IP Engineers</option>
                    <option value="Linux Enterprise Support Analyst">Linux Enterprise Support Analyst</option>
                    <option value="Security CoE Infrastructure Section">Security CoE Infrastructure Section</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="career-resume" className="block text-[18px] font-semibold text-black mb-1">
                  Upload Resume
                </label>
                <input
                  id="career-resume"
                  type="file"
                  className="w-full text-[18px] text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-black hover:file:bg-slate-300"
                />
              </div>

              <div>
                <label htmlFor="career-message" className="block text-[18px] font-semibold text-black mb-1">
                  Your Message
                </label>
                <textarea
                  id="career-message"
                  rows={4}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] border-0 border-b border-[#ddd] rounded-none focus:bg-white focus:border-[#166fb0] outline-none text-black text-[18px]"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-[18px] h-[48px] bg-[#166fb0] hover:bg-[#0f5487] text-white font-medium text-[18px] rounded-[3px] transition-colors"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
