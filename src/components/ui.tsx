import React from 'react';
import { SmartLink } from './SmartLink';
import { LINKS } from '../data/site';

/* Shared building blocks for inner pages (same tokens as the home page). */
export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>
);

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0E8A8F] mb-2 ${className}`}>{children}</p>
);

export const SectionTitle: React.FC<{ eyebrow?: string; title: string; intro?: React.ReactNode; id?: string; as?: 'h1' | 'h2' }> = ({ eyebrow, title, intro, id, as = 'h2' }) => {
  const H = as;
  return (
    <div className="mb-6 md:mb-7" id={id}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H className={`${as === 'h1' ? 'text-[32px] md:text-[44px] leading-[1.12]' : 'text-[26px] md:text-[32px] leading-[1.2]'} font-bold text-[#0B1B3D] tracking-tight`}>
        {title}
      </H>
      {intro && <div className="mt-3 max-w-[720px] text-[16px] md:text-[17px] leading-[27px] text-[#4A5568]">{intro}</div>}
    </div>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] p-5 md:p-6 card-hover-cool ${className}`}>{children}</div>
);

export const Bullets: React.FC<{ items: string[]; className?: string }> = ({ items, className = '' }) => (
  <ul className={`space-y-1.5 ${className}`}>
    {items.map((it) => (
      <li key={it} className="flex items-start gap-2.5 text-[14px] md:text-[15px] leading-[23px] text-[#4A5568]">
        <span className="mt-[9px] w-[5px] h-[5px] rounded-full shrink-0 bg-[#64748B]" aria-hidden="true" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const PageSection: React.FC<{ children: React.ReactNode; className?: string; id?: string; divider?: boolean }> = ({ children, className = '', id, divider }) => (
  <section id={id} className={`py-10 md:py-14 scroll-mt-20 ${divider ? 'border-t border-[#EDF1F7]' : ''} ${className}`}>
    <Container>{children}</Container>
  </section>
);

export const PrimaryButton: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className = '' }) => (
  <SmartLink to={to} className={`inline-flex items-center justify-center rounded-full bg-[#14306B] hover:bg-[#0B1B3D] text-white font-semibold text-[14px] px-6 py-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ${className}`}>
    {children}
  </SmartLink>
);

export const OutlineButton: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className = '' }) => (
  <SmartLink to={to} className={`inline-flex items-center justify-center rounded-full border border-[#14306B]/60 text-[#14306B] hover:bg-[#14306B] hover:text-white font-semibold text-[14px] px-5 py-2 transition-colors ${className}`}>
    {children}
  </SmartLink>
);

/** "Planning Your Next Facility?" call-to-action used at the bottom of inner pages. */
export const PlanningCta: React.FC = () => (
  <PageSection>
    <div className="rounded-2xl bg-[#F3F6FC] border border-[#E3E9F5] px-6 py-10 md:py-12 text-center">
      <h2 className="text-[26px] md:text-[32px] font-bold text-[#0B1B3D]">Planning Your Next Facility?</h2>
      <p className="mt-3 text-[15px] md:text-[16px] text-[#4A5568]">
        Tell us your capacity and timeline. We recommend the right option within one business day.
      </p>
      <PrimaryButton to={LINKS.contact} className="mt-6">Talk to an Expert</PrimaryButton>
    </div>
  </PageSection>
);
