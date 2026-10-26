import React from 'react';
import { IconLinkedIn } from './Icons';
import { COMPANY_INFO } from '../data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#166fb0] text-white">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Citius Communication Pvt. Ltd. (No Logo) */}
        <div className="flex items-center">
          <span className="font-semibold text-[13px] tracking-tight">
            Citius Communication Pvt. Ltd.
          </span>
        </div>

        {/* Center: Copyright */}
        <p className="font-sans text-center text-[12px] leading-[20px] text-white/90">
          {COMPANY_INFO.copyright}
        </p>

        {/* Right: Email & Phone & All Rights Reserved */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-[12px] text-white/90">
          <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
            Email: {COMPANY_INFO.email}
          </a>
          <span>&middot;</span>
          <a href={`tel:${COMPANY_INFO.phoneFormatted}`} className="hover:underline">
            Phone: {COMPANY_INFO.phone}
          </a>
          <span>&middot;</span>
          <span>All Rights Reserved</span>
          <a
            href={COMPANY_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CITIUSCOMM LinkedIn"
            className="text-white hover:opacity-80 transition-opacity p-1 ml-1"
          >
            <IconLinkedIn className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Accessible metadata for branch locations */}
        <div className="sr-only">
          <span>Head Office: Delhi</span>
          <span>Offices: Mumbai & Kolkata</span>
        </div>
      </div>
    </footer>
  );
};
