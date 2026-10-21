import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_INFO, MAIN_NAV, LINKS } from '../data/site';
import { SmartLink } from './SmartLink';
import {
  IconPhone,
  IconMail,
  IconLinkedIn,
  IconChevronDown,
  IconMenu,
  IconX,
} from './Icons';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [location.pathname]);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-shadow duration-300">
      {/* Top Secondary Header Bar */}
      <div className="bg-[#166fb0] text-white text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="inline-flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <IconMail className="w-3.5 h-3.5 text-sky-200" />
              <span>{COMPANY_INFO.email}</span>
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href={`tel:${COMPANY_INFO.phoneFormatted}`}
              className="inline-flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <IconPhone className="w-3.5 h-3.5 text-sky-200" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={COMPANY_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CITIUSCOMM LinkedIn"
              className="p-1 rounded hover:bg-white/10 text-white hover:text-sky-200 transition-colors"
            >
              <IconLinkedIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`bg-white transition-all duration-300 ${
          scrolled ? 'shadow-md py-2.5' : 'py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <SmartLink to={LINKS.home} className="inline-block py-1">
            <img
              src={COMPANY_INFO.logoRetina}
              alt="CITIUSCOMM Logo"
              className="h-10 sm:h-12 w-auto object-contain"
              loading="eager"
            />
          </SmartLink>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {MAIN_NAV.map((item) => {
              const active = isActive(item.href);
              const hasChildren = Boolean(item.children && item.children.length > 0);

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative group py-2">
                    <SmartLink
                      to={item.href}
                      className={`inline-flex items-center gap-1 px-3 py-2 text-[15px] font-medium tracking-wide rounded-md transition-colors ${
                        active
                          ? 'text-[#166fb0] font-semibold'
                          : 'text-slate-700 hover:text-[#166fb0]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <IconChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#166fb0] transition-transform duration-200 group-hover:rotate-180" />
                    </SmartLink>

                    {/* Dropdown Menu */}
                    <div className="nav-dropdown absolute left-0 top-full w-64 pt-2 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2 divide-y divide-slate-50">
                        {item.children?.map((sub) => (
                          <SmartLink
                            key={sub.label}
                            to={sub.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              location.pathname === sub.href
                                ? 'bg-sky-50 text-[#166fb0] font-medium'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#166fb0]'
                            }`}
                          >
                            <div className="font-medium">{sub.label}</div>
                            {sub.desc && (
                              <div className="text-xs text-slate-400 font-normal mt-0.5 line-clamp-1">
                                {sub.desc}
                              </div>
                            )}
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
                  className={`px-3 py-2 text-[15px] font-medium tracking-wide rounded-md transition-colors ${
                    active
                      ? 'text-[#166fb0] font-semibold'
                      : 'text-slate-700 hover:text-[#166fb0]'
                  }`}
                >
                  {item.label}
                </SmartLink>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center">
            <SmartLink
              to={LINKS.contact}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#166fb0] hover:bg-[#0f5487] shadow-sm hover:shadow transition-all duration-200"
            >
              Get in Touch
            </SmartLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-[#166fb0] hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {MAIN_NAV.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isOpen = openSubmenu === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label} className="border-b border-slate-100 pb-1">
                    <div className="flex items-center justify-between">
                      <SmartLink
                        to={item.href}
                        className="py-2.5 text-base font-medium text-slate-800"
                      >
                        {item.label}
                      </SmartLink>
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.label)}
                        className="p-2 text-slate-500 hover:text-[#166fb0]"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <IconChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mb-2">
                        {item.children?.map((sub) => (
                          <SmartLink
                            key={sub.label}
                            to={sub.href}
                            className={`block py-2 px-2 text-sm rounded ${
                              location.pathname === sub.href
                                ? 'text-[#166fb0] font-semibold bg-white'
                                : 'text-slate-600 hover:text-[#166fb0]'
                            }`}
                          >
                            {sub.label}
                          </SmartLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <SmartLink
                  key={item.label}
                  to={item.href}
                  className={`block py-2.5 text-base font-medium border-b border-slate-100 ${
                    isActive(item.href)
                      ? 'text-[#166fb0] font-semibold'
                      : 'text-slate-800 hover:text-[#166fb0]'
                  }`}
                >
                  {item.label}
                </SmartLink>
              );
            })}

            <div className="pt-4 pb-2">
              <SmartLink
                to={LINKS.contact}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white bg-[#166fb0] hover:bg-[#0f5487] shadow text-center"
              >
                Contact Us
              </SmartLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
