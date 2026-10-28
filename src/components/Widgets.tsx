import React, { useState } from 'react';
import { SmartLink } from './SmartLink';
import { LINKS, CaseStudyItem } from '../data/site';
import { IconArrowRight, IconCheck, IconPhone } from './Icons';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle }) => {
  // New site style: light gradient intro band with eyebrow + large navy heading (matches About / Services / Components)
  return (
    <div className="inner-hero pt-12 md:pt-16 pb-8 md:pb-10 border-b border-[#EDF1F7]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F] mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00C4CC] animate-live-dot shrink-0" />
          <span>Citiuscomm</span>
        </p>
        <h1 className="text-[32px] md:text-[44px] leading-[1.12] font-bold text-[#0B1B3D] tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">{subtitle}</p>}
      </div>
    </div>
  );
};

export const SectionTitle: React.FC<{
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}> = ({ badge, title, subtitle, align = 'center', dark = false }) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}`}>
      {badge && (
        <span
          className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
            dark
              ? 'bg-sky-900/60 text-sky-300 border border-sky-700/50'
              : 'bg-sky-50 text-[#166fb0] border border-sky-100'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const CaseStudyCard: React.FC<{ caseStudy: CaseStudyItem }> = ({ caseStudy }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden card-hover-lift flex flex-col h-full">
      <div className="relative h-52 sm:h-56 bg-slate-100 overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-[#166fb0] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {caseStudy.client}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-2">
          {caseStudy.category}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#166fb0]">
          {caseStudy.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed flex-grow line-clamp-3 mb-5">
          {caseStudy.summary}
        </p>

        <div className="pt-2 border-t border-slate-100">
          <SmartLink
            to={caseStudy.slug}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#166fb0] hover:text-[#0f5487] transition-colors"
          >
            <span>Read Case Study</span>
            <IconArrowRight className="w-4 h-4" />
          </SmartLink>
        </div>
      </div>
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 rounded-xl border border-sky-100 shadow-sm text-center">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Thank you for contacting CITIUSCOMM. Our engineering and pre-sales team will review your inquiry and respond promptly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          }}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#166fb0] hover:bg-[#0f5487] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Subject
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Solution Inquiry / Project Requirements"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Your Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={5}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe your network or infrastructure requirements..."
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0] focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold text-white bg-[#166fb0] hover:bg-[#0f5487] shadow-sm hover:shadow transition-all disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export const CareerForm: React.FC<{ initialPosition?: string }> = ({ initialPosition = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: initialPosition || 'IP Engineers',
    experience: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center">
        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <IconCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you for applying to CITIUSCOMM. Our HR team will evaluate your profile and contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Contact Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0]"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Select Position <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0]"
          >
            <option value="IP Engineers">IP Engineers</option>
            <option value="Linux Enterprise Support Analyst">Linux Enterprise Support Analyst</option>
            <option value="Security CoE Infrastructure Section">Security CoE Infrastructure Section</option>
            <option value="Others">Others / General</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          Tell Us About Your Experience
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Brief summary of your skills, current company, notice period, etc."
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166fb0]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-8 py-3 rounded-full text-sm font-semibold text-white bg-[#166fb0] hover:bg-[#0f5487] shadow transition-all disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Apply Now'}
      </button>
    </form>
  );
};

export const CTASection: React.FC<{
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}> = ({
  title = 'Ready to Engineer Your Next-Gen Network?',
  subtitle = 'Partner with CITIUSCOMM for carrier-grade solutions, turnkey system integration, and 24x7 pan-India engineering support.',
  buttonText = 'Contact Our Engineering Team',
  buttonHref = LINKS.contact,
}) => {
  return (
    <div className="relative bg-gradient-to-r from-[#0b1f33] via-[#0f5487] to-[#166fb0] py-16 px-4 sm:px-8 text-white text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <SmartLink
            to={buttonHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-[#166fb0] hover:bg-sky-50 shadow-lg hover:shadow-xl transition-all"
          >
            <span>{buttonText}</span>
            <IconArrowRight className="w-4 h-4" />
          </SmartLink>
          <a
            href="tel:+911140107947"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            <IconPhone className="w-4 h-4 text-sky-200" />
            <span>+91 11 4010 7947</span>
          </a>
        </div>
      </div>
    </div>
  );
};
