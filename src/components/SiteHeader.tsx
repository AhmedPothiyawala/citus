import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAV, LINKS } from '../data/site';
import { SmartLink } from './SmartLink';

/** Header for every page — same look, animations, and behavior across desktop and mobile. */
export const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [hold, setHold] = useState(false);

  const closeMenu = () => {
    setHold(true);
    setOpen(false);
    setSub(null);
    if (typeof document !== 'undefined') {
      (document.activeElement as HTMLElement)?.blur();
      document.body.style.overflow = '';
    }
  };

  // Close menu on route changes
  useEffect(() => {
    closeMenu();
    setHold(false);
  }, [pathname]);

  // Close menu on Escape key press and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const norm = (p: string) => p.replace(/\/+$/, '') || '/';
  const isActive = (href: string, children?: { href: string }[]) => {
    const cur = norm(pathname);
    const target = norm(href);
    if (target === '/') return cur === '/';
    return cur === target || cur.startsWith(target + '/') || !!children?.some((c) => {
      const cTarget = norm(c.href);
      return cur === cTarget || cur.startsWith(cTarget + '/');
    });
  };

  return (
    <header className="w-full bg-white text-[#0B1B3D] border-b border-slate-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 h-[56px] md:h-[60px] flex items-center justify-between">
        <SmartLink to="/" onClick={closeMenu} className="flex items-center hover:opacity-95 transition-opacity" aria-label="CITIUSCOMM home">
          <img src="/images/citiuscomm-logo.svg" alt="CITIUSCOMM Logo" className="h-6 sm:h-7 w-auto block" />
        </SmartLink>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-5 xl:gap-7" aria-label="Main">
          {SITE_NAV.map((item) => {
            const active = isActive(item.href, item.children);
            if (item.children?.length) {
              return (
                <div key={item.label} className="relative group py-2">
                  <SmartLink
                    to={item.href}
                    onClick={closeMenu}
                    className={`relative inline-flex items-center gap-1.5 text-[14px] whitespace-nowrap transition-colors ${active ? 'font-semibold text-[#0B1B3D]' : 'font-medium text-slate-600 group-hover:text-[#0B1B3D]'}`}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {active && <span className="absolute -bottom-2 left-0 right-5 h-[3px] rounded-full bg-[#00C4CC]" />}
                  </SmartLink>
                  <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 ${hold ? 'hidden' : ''} opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-50`}>
                    <div className="w-[300px] rounded-2xl bg-white border border-slate-200 shadow-[0_16px_40px_rgba(11,27,61,0.12)] p-2 overflow-hidden">
                      <div className="h-[2px] -mx-2 -mt-2 mb-2 bg-gradient-to-r from-[#00C4CC] via-[#3B82F6] to-[#6366F1]" />
                      {item.children.map((c) => (
                        <SmartLink
                          key={c.label}
                          to={c.href}
                          onClick={closeMenu}
                          className="block rounded-xl px-3.5 py-2.5 hover:bg-slate-50 focus:bg-slate-50 outline-none transition-colors group/sub"
                        >
                          <span className="flex items-center justify-between text-[14px] font-semibold text-[#0B1B3D]">
                            {c.label}
                            <span className="text-[#00C4CC] opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all">&rarr;</span>
                          </span>
                          {c.desc && <span className="block text-[12px] leading-[18px] text-slate-500 mt-0.5">{c.desc}</span>}
                        </SmartLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <SmartLink
                key={item.label}
                to={item.href}
                onClick={closeMenu}
                className={`relative text-[14px] py-2 whitespace-nowrap transition-colors ${active ? 'font-semibold text-[#0B1B3D]' : 'font-medium text-slate-600 hover:text-[#0B1B3D]'}`}
              >
                {item.label}
                {active && <span className="absolute -bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#00C4CC]" />}
              </SmartLink>
            );
          })}
          <SmartLink
            to={LINKS.contact}
            onClick={closeMenu}
            className="inline-flex items-center justify-center bg-[#0B1B3D] text-white rounded-full px-5 py-2 whitespace-nowrap font-bold text-[13px] hover:bg-[#1A2F5E] transition-colors"
          >
            Contact Us
          </SmartLink>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          className="xl:hidden p-2 text-[#0B1B3D] hover:text-[#2563EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C4CC]/50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {open && (
        <>
          <div
            className="xl:hidden fixed inset-0 top-[56px] md:top-[60px] bg-black/30 z-40 transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="xl:hidden fixed top-[56px] md:top-[60px] left-0 right-0 max-h-[calc(100vh-56px)] md:max-h-[calc(100vh-60px)] bg-white border-t border-slate-200 shadow-xl px-6 py-4 overflow-y-auto z-50">
            {SITE_NAV.map((item) => {
              if (item.children?.length) {
                const isOpen = sub === item.label;
                return (
                  <div key={item.label} className="border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSub(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between text-[15px] font-medium text-[#0B1B3D] py-3"
                    >
                      {item.label}
                      <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00C4CC]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-2' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        {item.children.map((c) => (
                          <SmartLink
                            key={c.label}
                            to={c.href}
                            onClick={closeMenu}
                            className="block pl-4 py-2 text-[14px] text-slate-600 hover:text-[#2563EB] border-l-2 border-slate-200 hover:border-[#00C4CC] transition-colors"
                          >
                            {c.label}
                          </SmartLink>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <SmartLink
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className={`block text-[15px] py-3 border-b border-slate-100 transition-colors ${isActive(item.href) ? 'font-semibold text-[#2563EB]' : 'font-medium text-[#0B1B3D] hover:text-[#2563EB]'}`}
                >
                  {item.label}
                </SmartLink>
              );
            })}
            <div className="pt-4 pb-2">
              <SmartLink
                to={LINKS.contact}
                onClick={closeMenu}
                className="inline-flex w-full items-center justify-center bg-[#0B1B3D] text-white rounded-full py-2.5 font-bold text-[14px] hover:bg-[#1A2F5E] transition-colors"
              >
                Contact Us
              </SmartLink>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
