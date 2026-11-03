import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X } from 'lucide-react';

interface HeaderProps {
  onBookClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Cruise Shuttles ($30)', href: '#services' },
    { name: 'Fleet & EV9', href: '#fleet' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* =====================================================================
          MAIN EXECUTIVE NAVBAR (Crisp, Balanced & Professional)
      ===================================================================== */}
      <nav
        className={`w-full bg-white transition-all duration-200 border-b ${
          scrolled ? 'shadow-md border-gray-200 py-2.5' : 'shadow-xs border-gray-150 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Official Seattle Express Shuttle Logo */}
            <div className="flex-shrink-0">
              <a href="#top" aria-label="Seattle Express Shuttle" className="inline-block group">
                <img
                  src="/logo.png"
                  alt="Seattle Express Shuttle"
                  width={240}
                  height={65}
                  className="h-11 sm:h-12 md:h-13 w-auto object-contain rounded-[4px] shadow-2xs transition-transform duration-200 group-hover:scale-[1.015]"
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + '/seattle-express-shuttle-logo.webp') {
                      e.currentTarget.src = '/seattle-express-shuttle-logo.webp';
                    }
                  }}
                />
              </a>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-manrope text-[14.5px] font-semibold text-[#35434A] hover:text-[#A88B61] transition-colors py-1 relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6AD83] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right: Instant Quote & RED CALL HOTLINE CTA */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Secondary Instant Quote Link */}
              <button
                type="button"
                onClick={onBookClick}
                className="font-manrope text-[13.5px] font-semibold text-[#35434A] hover:text-[#A88B61] px-3.5 py-2 rounded-sm border border-transparent hover:border-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Instant Quote
              </button>

              {/* Red Call Hotline Button */}
              <a
                href="tel:+12065046000"
                className="bg-[#F60102] hover:bg-[#d40102] text-white font-manrope font-bold text-[14px] uppercase tracking-wider px-5 py-2.5 rounded-[4px] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap"
                title="Call Hotline: +1 (206) 504-6000"
              >
                <Phone className="w-4 h-4 fill-current animate-pulse" />
                <span>Call Hotline: (206) 504-6000</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Red Call Hotline CTA */}
              <a
                href="tel:+12065046000"
                className="bg-[#F60102] hover:bg-[#d40102] text-white text-[12px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap shadow-xs"
                title="Call Hotline: (206) 504-6000"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>Call Hotline</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-sm text-[#35434A] hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-3.5">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-manrope text-[15px] font-semibold text-[#35434A] hover:text-[#A88B61] transition-colors py-1.5 border-b border-gray-100"
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-3 flex flex-col gap-3">
                {/* Red Call Hotline Button in Drawer */}
                <a
                  href="tel:+12065046000"
                  className="bg-[#F60102] hover:bg-[#d40102] text-white py-3 px-4 rounded-[4px] flex items-center justify-center gap-2 font-manrope font-bold text-sm uppercase tracking-wider shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call Hotline: (206) 504-6000</span>
                </a>

                <a
                  href="sms:+12065046000"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] bg-gray-100 text-[#35434A] font-manrope font-semibold text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#A88B61]" />
                  <span>SMS Dispatch: (206) 504-6000</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick?.();
                  }}
                  className="btn-outline-slate py-2.5 px-4 rounded-[4px] text-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Calculate Instant Online Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
