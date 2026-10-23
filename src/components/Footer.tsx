import React from 'react';
import { IconLinkedIn } from './Icons';
import { COMPANY_INFO } from '../data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#166fb0] text-white">
      <div className="w-full px-5 sm:px-7 py-[18px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-sans text-center sm:text-left text-[12px] leading-[22px] text-white">
          © 2026 CITIUSCOMM. | developed by WebGyor Technologies
        </p>

        <a
          href={COMPANY_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CITIUSCOMM LinkedIn"
          className="text-white hover:opacity-80 transition-opacity p-1 sm:mr-[46px]"
        >
          <IconLinkedIn className="w-4 h-4" />
        </a>

        {/* Accessible metadata for branch locations */}
        <div className="sr-only">
          <span>Head Office: Delhi</span>
          <span>Offices: Mumbai & Kolkata</span>
        </div>
      </div>
    </footer>
  );
};
