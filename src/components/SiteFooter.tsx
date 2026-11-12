import React from 'react';
import { COMPANY_INFO, LINKS } from '../data/site';
import { SmartLink } from './SmartLink';

/** Single footer for every page (home included). */
export const SiteFooter: React.FC = () => (
  <footer className="bg-white border-t border-[#E2E8F0]">
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-left">
      <span className="text-[13px] font-bold text-[#0B1B3D]">Citius Communication Pvt. Ltd.</span>
      <div className="text-[12px] flex flex-wrap items-center justify-center lg:justify-end gap-x-3 gap-y-1 text-[#718096]">
        <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">Email: {COMPANY_INFO.email}</a>
        <span aria-hidden="true">&middot;</span>
        <span>
          Phone:{' '}
          {COMPANY_INFO.phones.map((ph, i) => (
            <React.Fragment key={ph.tel}>
              {i > 0 && ' / '}
              <a href={`tel:${ph.tel}`} className="hover:underline">{ph.display}</a>
            </React.Fragment>
          ))}
        </span>
        <span aria-hidden="true">&middot;</span>
        <SmartLink to={LINKS.contact} className="hover:underline">Head Office: {COMPANY_INFO.headOfficeShort}</SmartLink>
        <span aria-hidden="true">&middot;</span>
        <SmartLink to={LINKS.contact} className="hover:underline">Offices</SmartLink>
        <span aria-hidden="true">&middot;</span>
        <a href={COMPANY_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
        <span aria-hidden="true">&middot;</span>
        <span>{COMPANY_INFO.copyright}</span>
      </div>
    </div>
  </footer>
);
