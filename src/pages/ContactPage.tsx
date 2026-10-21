import { PageHero, ContactForm } from '../components/Widgets';
import { OFFICES_LIST, COMPANY_INFO } from '../data/site';
import { IconMapPin, IconPhone, IconMail, IconLinkedIn } from '../components/Icons';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our engineering, sales, and executive teams across our offices in India."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Main Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Office Locations */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
                  Locations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {COMPANY_INFO.legalName}
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Headquartered in New Delhi with strategic presence in Mumbai and Kolkata.
                </p>
              </div>

              <div className="space-y-6">
                {OFFICES_LIST.map((office) => (
                  <div
                    key={office.title}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs card-hover-lift space-y-3"
                  >
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <IconMapPin className="w-5 h-5 text-[#166fb0]" />
                      <span>{office.title}</span>
                    </h3>

                    <div className="text-sm text-slate-600 leading-relaxed pl-7">
                      {office.address.map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                    </div>

                    <div className="pl-7 space-y-1 pt-1 text-sm">
                      {office.phone && (
                        <div className="flex items-center gap-2 text-slate-700">
                          <IconPhone className="w-4 h-4 text-[#166fb0]" />
                          <a
                            href={`tel:${office.phone.replace(/[\s-]/g, '')}`}
                            className="hover:text-[#166fb0] transition-colors"
                          >
                            Phone: {office.phone}
                          </a>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-slate-700">
                        <IconMail className="w-4 h-4 text-[#166fb0]" />
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-[#166fb0] transition-colors"
                        >
                          Email: {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social / Direct Connect Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0b1f33] to-[#166fb0] text-white shadow-md space-y-3">
                <h4 className="text-base font-bold">Connect on Professional Networks</h4>
                <p className="text-xs text-sky-100 leading-relaxed">
                  Follow CITIUSCOMM on LinkedIn for recent carrier deployment updates, technology announcements, and corporate insights.
                </p>
                <div className="pt-2">
                  <a
                    href={COMPANY_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-[#166fb0] hover:bg-sky-50 shadow transition-colors"
                  >
                    <IconLinkedIn className="w-4 h-4" />
                    <span>Follow CITIUSCOMM on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-1 block">
                  Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Connect With Us
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Have a network requirement, RFP, or system integration query? Fill in the form below and an engineer will connect with you.
                </p>
              </div>

              <ContactForm />

              {/* Image banner */}
              <div className="pt-4">
                <img
                  src="/images/contact.png"
                  alt="Contact CITIUSCOMM"
                  className="w-full h-auto rounded-xl border border-slate-200 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
