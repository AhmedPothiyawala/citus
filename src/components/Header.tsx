import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COMPANY_INFO, MAIN_NAV, LINKS } from '../data/site';
import { SmartLink } from './SmartLink';
import { IconLinkedIn, IconChevronDown, IconMenu, IconX } from './Icons';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md text-[#0b1f33]' : 'bg-transparent text-white'
      }`}
    >
      {/* Top Bar (Secondary Header) — hidden on phones like the live site */}
      <div
        className={`hidden lg:block transition-colors duration-300 ${
          scrolled ? 'border-b border-gray-200' : ''
        }`}
      >
        <div className="site-container pt-[6px] pb-0 flex justify-end items-center text-[13px] font-medium leading-6">
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className={`transition-colors ${
              scrolled ? 'text-gray-700 hover:text-[#166fb0]' : 'text-white hover:text-white/80'
            }`}
          >
            {COMPANY_INFO.email}
          </a>
          <span className={`mx-[18px] ${scrolled ? 'text-gray-400' : 'text-white'}`}>|</span>
          <a
            href={`tel:${COMPANY_INFO.phoneFormatted}`}
            className={`transition-colors ${
              scrolled ? 'text-gray-700 hover:text-[#166fb0]' : 'text-white hover:text-white/80'
            }`}
          >
            {COMPANY_INFO.phoneFormatted}
            <span className="sr-only">{COMPANY_INFO.phone}</span>
          </a>
          <span className={`mx-[18px] ${scrolled ? 'text-gray-400' : 'text-white'}`}>|</span>
          <a
            href={COMPANY_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CITIUSCOMM LinkedIn"
            className={`transition-colors inline-flex items-center ${
              scrolled ? 'text-gray-700 hover:text-[#166fb0]' : 'text-white hover:text-white/80'
            }`}
          >
            <IconLinkedIn className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="site-container py-[14px] flex items-center justify-between">
        {/* Logo */}
        <SmartLink to={LINKS.home} className="inline-block py-1">
          <img
            src={scrolled ? COMPANY_INFO.logoRetina : '/images/citiuscomm-white-logo.png'}
            alt="CITIUSCOMM Logo"
            className="h-[26px] sm:h-[30px] w-auto object-contain transition-opacity duration-200"
            loading="eager"
          />
        </SmartLink>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-[30px] text-[13px] font-sans font-medium tracking-[0.3px]">
          {MAIN_NAV.map((item) => {
            const active = isActive(item.href);
            const hasChildren = Boolean(item.children && item.children.length > 0);

            if (hasChildren) {
              return (
                <div key={item.label} className="relative group py-2">
                  <div
                    className={`inline-flex items-center gap-1.5 py-1 uppercase cursor-pointer transition-colors ${
                      scrolled
                        ? active
                          ? 'text-[#166fb0] border-b-[2px] border-[#166fb0]'
                          : 'text-[#0b1f33] hover:text-[#166fb0]'
                        : active
                        ? 'text-white border-b-[2px] border-white'
                        : 'text-white hover:text-white/80'
                    }`}
                  >
                    <span>{item.label}</span>
                    <IconChevronDown
                      className={`w-3 h-3 transition-transform duration-200 group-hover:rotate-180 ${
                        scrolled ? 'text-gray-500 group-hover:text-[#166fb0]' : 'text-white/70 group-hover:text-white'
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  <div className="nav-dropdown absolute left-0 top-full pt-2 hidden group-hover:block z-50 min-w-[230px]">
                    <div className="bg-white border border-gray-100 shadow-xl py-2 rounded-sm text-[#0b1f33]">
                      {item.children?.map((sub) => (
                        <SmartLink
                          key={sub.label}
                          to={sub.href}
                          className={`block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#166fb0] hover:text-white transition-colors ${
                            location.pathname === sub.href ? 'bg-[#166fb0] text-white font-semibold' : ''
                          }`}
                        >
                          {sub.label}
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
                className={`py-1 uppercase transition-colors ${
                  scrolled
                    ? active
                      ? 'text-[#166fb0] border-b-[2px] border-[#166fb0]'
                      : 'text-[#0b1f33] hover:text-[#166fb0]'
                    : active
                    ? 'text-white border-b-[2px] border-white'
                    : 'text-white hover:text-white/80'
                }`}
              >
                {item.label}
              </SmartLink>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className={`lg:hidden p-2 focus:outline-none transition-colors ${
            scrolled ? 'text-[#0b1f33] hover:text-[#166fb0]' : 'text-white hover:text-sky-300'
          }`}
        >
          {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1f33] border-t border-white/10 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="px-6 py-6 space-y-2 text-sm font-heading tracking-wider text-white">
            {MAIN_NAV.map((item) => {
              const hasChildren = Boolean(item.children && item.children.length > 0);
              const isOpen = openSubmenu === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="py-2 text-white font-medium uppercase">{item.label}</span>
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.label)}
                        className="p-2 text-white/70 hover:text-white"
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
                      <div className="pl-4 py-2 space-y-1 bg-white/5 rounded mt-1">
                        {item.children?.map((sub) => (
                          <SmartLink
                            key={sub.label}
                            to={sub.href}
                            className={`block py-2 px-3 text-xs rounded text-white/80 hover:text-white hover:bg-[#166fb0] ${
                              location.pathname === sub.href ? 'text-white bg-[#166fb0]' : ''
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
                  className={`block py-2 uppercase border-b border-white/10 ${
                    isActive(item.href) ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                </SmartLink>
              );
            })}
            <div className="pt-2">
              <SmartLink
                to={LINKS.contact}
                className="block py-2 uppercase text-white/80 hover:text-white"
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
