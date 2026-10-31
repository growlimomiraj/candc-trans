import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { AnticorLogo } from './Logo.tsx';

interface HeaderProps {
  onBookClick?: () => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick, onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Cars', href: '#cars' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Identity */}
          <div className="flex-shrink-0">
            <a href="#home">
              <AnticorLogo />
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {navLinks.map((item) => {
              const isActive = activeNav === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveNav(item.name)}
                  className={`relative text-[14.5px] font-medium transition-colors py-1 ${
                    isActive
                      ? 'text-[#FF7100] font-semibold'
                      : 'text-[#092D5C] hover:text-[#FF7100]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF7100] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Search Icon */}
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="p-2 text-[#092D5C] hover:text-[#FF7100] transition-colors rounded-full hover:bg-gray-50 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Book a Car Button */}
            <button
              onClick={onBookClick}
              className="bg-[#FF7100] hover:bg-[#E66500] text-white font-medium text-[14px] px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Book a Car
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="p-1.5 text-[#092D5C]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#092D5C] hover:text-[#FF7100] hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.name);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-base font-medium ${
                  activeNav === item.name
                    ? 'text-[#FF7100] bg-orange-50 font-semibold'
                    : 'text-[#092D5C] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick?.();
              }}
              className="w-full bg-[#FF7100] hover:bg-[#E66500] text-white font-semibold py-3 rounded-full shadow cursor-pointer text-center"
            >
              Book a Car
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
