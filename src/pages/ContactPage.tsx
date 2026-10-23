import React, { useState } from 'react';
import { PageHero } from '../components/Widgets';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <PageHero title="Contact" />

      <section className="pt-[40px] pb-[60px] md:pb-[90px] site-container">
        <h2 className="text-[20px] md:text-[22px] font-bold text-black font-heading tracking-[0.3px] mb-[40px]">
          CITIUS COMMUNICATIONS PVT. LTD.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
                <div className="w-[56px] h-[56px] rounded-full bg-[#e8f1f9] text-[#166fb0] flex items-center justify-center mb-[30px]"><svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg></div>
                <h3 className="text-[18px] font-bold text-black font-sans">
                  Delhi Office
                </h3>
                <div className="text-black text-[18px] leading-[28px]">
                  <p>B25, Ground Floor,</p>
                  <p>Okhla Industrial Area,</p>
                  <p>Phase-II,New Delhi – 110020.</p>
                  <p><span className="font-semibold text-black">Phone:</span> +91 11 4010 7947</p>
                  <p><span className="font-semibold text-black">Email:</span> <a href="mailto:sales@citiuscomm.com" className="text-[#166fb0] hover:underline">sales@citiuscomm.com</a></p>
                </div>
              </div>
          <div>
                <div className="w-[56px] h-[56px] rounded-full bg-[#e8f1f9] text-[#166fb0] flex items-center justify-center mb-[30px]"><svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg></div>
                <h3 className="text-[18px] font-bold text-black font-sans">
                  Mumbai Office
                </h3>
                <div className="text-black text-[18px] leading-[28px]">
                  <p>503, Filix Tower, LBS Marg,</p>
                  <p>Opp. Asian Paints, Bhandup (West),</p>
                  <p>Mumbai – 400078.</p>
                  <p><span className="font-semibold text-black">Phone:</span> 022 62362154</p>
                  <p><span className="font-semibold text-black">Email:</span> <a href="mailto:sales@citiuscomm.com" className="text-[#166fb0] hover:underline">sales@citiuscomm.com</a></p>
                </div>
              </div>
          <div>
                <div className="w-[56px] h-[56px] rounded-full bg-[#e8f1f9] text-[#166fb0] flex items-center justify-center mb-[30px]"><svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg></div>
                <h3 className="text-[18px] font-bold text-black font-sans">
                  Kolkata Office
                </h3>
                <div className="text-black text-[18px] leading-[28px]">
                  <p>2, Canal Street,</p>
                  <p>1st floor, Flat#1B,</p>
                  <p>near Entally Police Station,</p>
                  <p>Kolkata -700014.</p>
                  <p><span className="font-semibold text-black">Email:</span> <a href="mailto:sales@citiuscomm.com" className="text-[#166fb0] hover:underline">sales@citiuscomm.com</a></p>
                </div>
              </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[48px] items-start mt-[90px] md:mt-[190px]">
          <div>
            <h2 className="text-[30px] md:text-[34px] font-normal text-black font-heading text-center mb-[34px]">
              Connect With Us
            </h2>
            {submitted ? (
              <div className="p-6 bg-green-50 border border-green-200 text-green-800 rounded">
                Thank you for contacting CITIUSCOMM. Your message has been sent.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-[26px]">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (required)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-[10px] py-[10px] bg-[#f4f4f4] border-0 border-b border-[#ddd] focus:border-[#166fb0] outline-none text-black text-[13px]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email (required)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-[10px] py-[10px] bg-[#f4f4f4] border-0 border-b border-[#ddd] focus:border-[#166fb0] outline-none text-black text-[13px]"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-[10px] py-[10px] bg-[#f4f4f4] border-0 border-b border-[#ddd] focus:border-[#166fb0] outline-none text-black text-[13px]"
                  />
                </div>

                <div>
                  <textarea
                    rows={6}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-[10px] py-[10px] bg-[#f4f4f4] border-0 border-b border-[#ddd] focus:border-[#166fb0] outline-none text-black text-[13px]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-[18px] h-[42px] bg-[#166fb0] hover:bg-[#0f5487] text-white font-medium text-[15px] rounded-[3px] transition-colors"
                  >
                    SEND
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:pt-[84px]">
            <img
              src="/images/contact.png"
              alt="CITIUSCOMM Pan-India Network Map"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
