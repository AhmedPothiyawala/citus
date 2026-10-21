import React from 'react';
import { COMPANY_INFO, LINKS, OFFICES_LIST } from '../data/site';
import { SmartLink } from './SmartLink';
import { IconMail, IconPhone, IconMapPin, IconLinkedIn } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1f33] text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <SmartLink to={LINKS.home} className="inline-block">
              <img
                src={COMPANY_INFO.logoWhiteRetina}
                alt="CITIUSCOMM Logo"
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </SmartLink>
            <p className="text-sm leading-relaxed text-slate-400">
              CITIUSCOMM is the fastest growing Technology Aggregator and system integration services provider, delivering carrier-grade turnkey network solutions for telecom operators, enterprises, cable &amp; broadband, and governments.
            </p>
            <div className="pt-2">
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CITIUSCOMM on LinkedIn"
                className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#166fb0] transition-colors">
                  <IconLinkedIn className="w-4 h-4 text-white" />
                </div>
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <SmartLink to={LINKS.home} className="hover:text-sky-400 transition-colors">
                  Home
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.companyProfile} className="hover:text-sky-400 transition-colors">
                  Company Profile
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.whyUs} className="hover:text-sky-400 transition-colors">
                  Why Us
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.leadership} className="hover:text-sky-400 transition-colors">
                  Leadership
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.partners} className="hover:text-sky-400 transition-colors">
                  Partners
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.caseStudies} className="hover:text-sky-400 transition-colors">
                  Case Studies
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.careers} className="hover:text-sky-400 transition-colors">
                  Careers
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.contact} className="hover:text-sky-400 transition-colors">
                  Contact Us
                </SmartLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <SmartLink to={LINKS.products} className="hover:text-sky-400 transition-colors">
                  Solutions Overview
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.networking} className="hover:text-sky-400 transition-colors">
                  Networking &amp; SD-WAN
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.fttx} className="hover:text-sky-400 transition-colors">
                  FTTX &amp; Optical Networks
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.serverStorage} className="hover:text-sky-400 transition-colors">
                  Server &amp; Storage
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.dataCenterCloud} className="hover:text-sky-400 transition-colors">
                  Data Center &amp; Cloud
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.securitySolutions} className="hover:text-sky-400 transition-colors">
                  Security Solutions
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.industryApplications} className="hover:text-sky-400 transition-colors">
                  Industry Applications
                </SmartLink>
              </li>
              <li>
                <SmartLink to={LINKS.digitalServices} className="hover:text-sky-400 transition-colors">
                  Digital Services &amp; AI
                </SmartLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div>
            <h3 className="text-white text-base font-semibold uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Head Office
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <IconMapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {OFFICES_LIST[0].address.join(' ')}
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <IconPhone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phoneFormatted}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <IconMail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Branch Offices:</span> Mumbai &amp; Kolkata
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 bg-[#071524] py-5 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-center sm:text-left">
            &copy; 2026 CITIUSCOMM. | developed by{' '}
            <a
              href="http://www.webgyortech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              WebGyor Technologies
            </a>
          </p>

          <div className="flex items-center gap-4">
            <SmartLink to={LINKS.contact} className="hover:text-slate-200 transition-colors">
              Support
            </SmartLink>
            <span>•</span>
            <SmartLink to={LINKS.careers} className="hover:text-slate-200 transition-colors">
              Join Our Team
            </SmartLink>
            <span>•</span>
            <a
              href={COMPANY_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors inline-flex items-center gap-1"
            >
              <IconLinkedIn className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
