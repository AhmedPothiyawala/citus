import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_INFO, CONTACT_DETAILS, OFFICES_LIST } from '../data/site';
import { Container, Eyebrow, SectionTitle } from '../components/ui';

const ENQUIRY_TYPES = ['General enquiry', 'Book a consultation', 'Request a quote', 'Partnership', 'Support', 'Careers'];
const SERVICE_OPTIONS = [
  'Data centre equipment & integration', 'Network Solutions', 'Cybersecurity & Surveillance', 'Cloud Infrastructure',
  'Application Development Management', 'DevOps', 'AI', 'Cloud-Native Applications', 'Other',
];

const FAQS = [
  { q: 'How quickly will you respond to my enquiry?', a: 'Our team reviews every enquiry and aims to reply within one business day with next steps or clarifying questions.' },
  { q: 'Do you work on both new builds and existing facilities?', a: 'Yes. We support greenfield projects from the first design and brownfield upgrades, including lifecycle refresh of equipment already in service.' },
  { q: 'Which vendors do you work with?', a: 'We source from multiple OEMs and recommend equipment that fits your project rather than a single brand. See our Partners page for the current list.' },
  { q: 'What should I include in my enquiry?', a: 'Capacity (racks or MW), timeline, site location and the scope you need — equipment supply, integration, managed services or a mix. Partial details are fine; we will follow up.' },
  { q: 'Can you manage power, cooling and civil work?', a: 'Power, cooling and civil scope is coordinated through specialist partners and program-managed by Citiuscomm, so you keep one point of contact.' },
];

const PROCESS = [
  { title: 'Share your requirement', desc: 'Send the form, call or email with your capacity, timeline and scope.' },
  { title: 'Discovery call', desc: 'A specialist reviews your needs and clarifies site, workload and budget.' },
  { title: 'Proposal', desc: 'You receive recommended options with bill of materials, cost and lead times.' },
  { title: 'Delivery and support', desc: 'We supply, integrate, commission and support the solution end to end.' },
];

type Form = { name: string; email: string; phone: string; company: string; enquiry: string; service: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Form, string>>;
const EMPTY: Form = { name: '', email: '', phone: '', company: '', enquiry: ENQUIRY_TYPES[0], service: '', message: '', consent: false };

const validate = (f: Form): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && !/^[+]?[\d\s()-]{7,20}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (f.message.trim().length < 10) e.message = 'Please tell us a little more (at least 10 characters).';
  if (!f.consent) e.consent = 'Please agree so we can contact you about this enquiry.';
  return e;
};

const inputCls = (bad?: string) =>
  `w-full rounded-xl bg-white border px-4 py-2.5 text-[15px] text-[#0B1B3D] placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-[#00C4CC]/40 ${bad ? 'border-rose-400' : 'border-[#D9E1EF] focus:border-[#00C4CC]'}`;

const Field: React.FC<{ label: string; id: string; error?: string; required?: boolean; children: React.ReactNode }> = ({ label, id, error, required, children }) => (
  <div>
    <label htmlFor={id} className="block text-[13px] font-semibold text-[#14306B] mb-1.5">
      {label} {required && <span className="text-rose-500" aria-hidden="true">*</span>}
    </label>
    {children}
    {error && <p id={`${id}-err`} className="mt-1 text-[12.5px] text-rose-600" role="alert">{error}</p>}
  </div>
);

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
);

export const ContactPage: React.FC = () => {
  const uid = useId();
  const { search } = useLocation();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mail' | 'error'>('idle');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const formRef = useRef<HTMLDivElement>(null);

  // prefill from links like /contact/?service=Network%20Solutions or ?type=consultation
  useEffect(() => {
    const p = new URLSearchParams(search);
    const service = p.get('service');
    const type = p.get('type');
    setForm((f) => ({
      ...f,
      service: service && SERVICE_OPTIONS.includes(service) ? service : f.service,
      enquiry: type === 'consultation' ? 'Book a consultation' : f.enquiry,
    }));
  }, [search]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const bookConsultation = () => {
    if (CONTACT_DETAILS.bookingUrl) {
      window.open(CONTACT_DETAILS.bookingUrl, '_blank', 'noopener');
      return;
    }
    set('enquiry', 'Book a consultation');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const body = [
      `Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone || '-'}`, `Company: ${form.company || '-'}`,
      `Enquiry type: ${form.enquiry}`, `Service: ${form.service || '-'}`, '', form.message,
    ].join('\n');

    if (CONTACT_DETAILS.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(CONTACT_DETAILS.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, _subject: `Website enquiry: ${form.enquiry}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setForm(EMPTY);
      } catch {
        setStatus('error');
      }
      return;
    }
    // No form service configured yet: hand the enquiry to the visitor's email app.
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Website enquiry: ${form.enquiry}`)}&body=${encodeURIComponent(body)}`;
    setStatus('mail');
  };

  const mapsUrl = (address: string[]) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(' '))}`;

  return (
    <div className="inner-page bg-white">
      <section className="inner-hero pt-12 md:pt-16 pb-6">
        <Container>
          <Eyebrow>Contact Us</Eyebrow>
          <h1 className="max-w-[760px] text-[32px] md:text-[44px] leading-[1.12] font-bold text-[#0B1B3D] tracking-tight">Let&rsquo;s Plan Your Next Facility</h1>
          <p className="mt-4 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">
            Tell us about your requirement and the right specialist will get back to you within one business day.
          </p>

          {/* Quick contact */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="group flex items-center gap-3 rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-4 card-hover-cool">
              <span className="w-10 h-10 rounded-full bg-[#14306B] text-white flex items-center justify-center"><Icon d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.5 1.2L7.2 9.3a11 11 0 007.5 7.5l1.1-1.65a1 1 0 011.2-.5l3.3 1.1a1 1 0 01.7.95V19a2 2 0 01-2 2h-1C9.7 21 3 14.3 3 6V5z" /></span>
              <span><span className="block text-[12px] text-[#64748B]">Call us</span><span className="block text-[15px] font-semibold text-[#0B1B3D]">{COMPANY_INFO.phone}</span></span>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="group flex items-center gap-3 rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-4 card-hover-cool">
              <span className="w-10 h-10 rounded-full bg-[#14306B] text-white flex items-center justify-center"><Icon d="M3 7l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></span>
              <span><span className="block text-[12px] text-[#64748B]">Email us</span><span className="block text-[15px] font-semibold text-[#0B1B3D]">{COMPANY_INFO.email}</span></span>
            </a>
            {CONTACT_DETAILS.whatsapp ? (
              <a href={`https://wa.me/${CONTACT_DETAILS.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-4 card-hover-cool">
                <span className="w-10 h-10 rounded-full bg-[#14306B] text-white flex items-center justify-center"><Icon d="M8 10h8M8 14h5M21 12a9 9 0 01-13.5 7.8L3 21l1.2-4.5A9 9 0 1121 12z" /></span>
                <span><span className="block text-[12px] text-[#64748B]">WhatsApp</span><span className="block text-[15px] font-semibold text-[#0B1B3D]">Chat with us</span></span>
              </a>
            ) : (
              <a href={COMPANY_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-4 card-hover-cool">
                <span className="w-10 h-10 rounded-full bg-[#14306B] text-white flex items-center justify-center text-[14px] font-bold">in</span>
                <span><span className="block text-[12px] text-[#64748B]">Follow us</span><span className="block text-[15px] font-semibold text-[#0B1B3D]">LinkedIn</span></span>
              </a>
            )}
            <button type="button" onClick={bookConsultation} className="text-left flex items-center gap-3 rounded-2xl bg-[#14306B] text-white p-4 card-hover-cool">
              <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center"><Icon d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" /></span>
              <span><span className="block text-[12px] text-slate-300">Free consultation</span><span className="block text-[15px] font-semibold">Book a call</span></span>
            </button>
          </div>
        </Container>
      </section>

      {/* Form + offices */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-start">
            <div ref={formRef} className="scroll-mt-24 rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-5 md:p-7">
              <h2 className="text-[22px] md:text-[26px] font-bold text-[#0B1B3D]">Send us your enquiry</h2>
              <p className="mt-1 mb-5 text-[14px] text-[#64748B]">Fields marked <span className="text-rose-500">*</span> are required.</p>

              {status === 'sent' ? (
                <div className="rounded-xl bg-white border border-emerald-200 p-6 text-center" role="status">
                  <p className="text-[18px] font-bold text-[#0B1B3D]">Thank you — your enquiry has been sent.</p>
                  <p className="mt-1 text-[14px] text-[#4A5568]">We will get back to you within one business day.</p>
                  <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-[14px] font-semibold text-[#14306B] hover:underline">Send another enquiry</button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" id={`${uid}-name`} error={errors.name} required>
                    <input id={`${uid}-name`} autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={inputCls(errors.name)} />
                  </Field>
                  <Field label="Work email" id={`${uid}-email`} error={errors.email} required>
                    <input id={`${uid}-email`} type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} className={inputCls(errors.email)} />
                  </Field>
                  <Field label="Phone" id={`${uid}-phone`} error={errors.phone}>
                    <input id={`${uid}-phone`} type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} className={inputCls(errors.phone)} />
                  </Field>
                  <Field label="Company" id={`${uid}-company`}>
                    <input id={`${uid}-company`} autoComplete="organization" value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls()} />
                  </Field>
                  <Field label="Enquiry type" id={`${uid}-enquiry`}>
                    <select id={`${uid}-enquiry`} value={form.enquiry} onChange={(e) => set('enquiry', e.target.value)} className={inputCls()}>
                      {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Service of interest" id={`${uid}-service`}>
                    <select id={`${uid}-service`} value={form.service} onChange={(e) => set('service', e.target.value)} className={inputCls()}>
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Your requirement" id={`${uid}-message`} error={errors.message} required>
                      <textarea id={`${uid}-message`} rows={5} value={form.message} onChange={(e) => set('message', e.target.value)}
                        placeholder="Capacity (racks or MW), timeline, site location and scope" aria-invalid={!!errors.message} className={inputCls(errors.message)} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-2.5 text-[13.5px] text-[#4A5568]">
                      <input id={`${uid}-consent`} type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 w-4 h-4 accent-[#14306B]" />
                      <span>I agree that Citiuscomm may contact me about this enquiry.</span>
                    </label>
                    {errors.consent && <p className="mt-1 text-[12.5px] text-rose-600" role="alert">{errors.consent}</p>}
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                    <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center rounded-full bg-[#14306B] hover:bg-[#0B1B3D] text-white font-semibold text-[15px] px-7 py-3 shadow-md disabled:opacity-60">
                      {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    </button>
                    {status === 'mail' && <p className="text-[13.5px] text-[#4A5568]" role="status">Your email app should open with the enquiry filled in — just press send.</p>}
                    {status === 'error' && <p className="text-[13.5px] text-rose-600" role="alert">Something went wrong. Please email {COMPANY_INFO.email} directly.</p>}
                  </div>
                </form>
              )}
            </div>

            {/* Offices + map */}
            <div className="space-y-4">
              <h2 className="text-[22px] md:text-[26px] font-bold text-[#0B1B3D]">Our offices</h2>
              {OFFICES_LIST.map((o) => (
                <div key={o.title} className="rounded-2xl bg-white border border-[#E3E9F5] p-4 md:p-5 card-hover-cool">
                  <p className="text-[16px] font-bold text-[#0B1B3D]">{o.city}</p>
                  <address className="not-italic mt-1 text-[14px] leading-[22px] text-[#4A5568]">{o.address.join(' ')}</address>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13.5px]">
                    {o.phone && <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="text-[#14306B] font-semibold hover:underline">{o.phone}</a>}
                    <a href={mapsUrl(o.address)} target="_blank" rel="noopener noreferrer" className="text-[#0E8A8F] font-semibold hover:underline">View on map &rarr;</a>
                  </div>
                </div>
              ))}
              {CONTACT_DETAILS.businessHours && (
                <div className="rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-4 text-[14px] text-[#4A5568]">
                  <span className="font-semibold text-[#0B1B3D]">Business hours: </span>{CONTACT_DETAILS.businessHours}
                </div>
              )}
              <img src="/images/contact.png" alt="Map showing Citiuscomm offices in Delhi, Mumbai and Kolkata" className="w-full rounded-2xl border border-[#E3E9F5]" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>

      {/* Enquiry process */}
      <section className="py-10 md:py-14">
        <Container>
          <SectionTitle eyebrow="What Happens Next" title="Our Enquiry Process" />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-5 card-hover-cool">
                <span className="text-[28px] font-extrabold bg-gradient-to-br from-[#00C4CC] to-[#2563EB] bg-clip-text text-transparent">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-1 text-[16px] font-bold text-[#0B1B3D]">{p.title}</p>
                <p className="mt-1 text-[14px] leading-[22px] text-[#4A5568]">{p.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 border-t border-[#EDF1F7]">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
          <ul className="space-y-3 max-w-[900px]">
            {FAQS.map((f, i) => {
              const open = faqOpen === i;
              return (
                <li key={f.q} className={`rounded-2xl border ${open ? 'bg-[#F3F6FC] border-[#C9D6EE]' : 'bg-white border-[#E3E9F5]'}`}>
                  <h3>
                    <button type="button" aria-expanded={open} aria-controls={`${uid}-faq-${i}`} onClick={() => setFaqOpen(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 text-[15.5px] md:text-[16px] font-semibold text-[#0B1B3D]">
                      {f.q}
                      <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[20px] leading-none ${open ? 'bg-[#14306B] text-white' : 'border border-[#14306B]/40 text-[#14306B]'}`} aria-hidden="true">{open ? '−' : '+'}</span>
                    </button>
                  </h3>
                  <div id={`${uid}-faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-5 pb-4 text-[14.5px] leading-[24px] text-[#4A5568]">{f.a}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </div>
  );
};
