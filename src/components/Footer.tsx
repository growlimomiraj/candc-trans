import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUp, ExternalLink, Anchor, Plane } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#273238] text-[#EAE4D9] font-manrope text-sm border-t border-[#C6AD83]/30">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Logo Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#top" className="inline-block">
              <img
                src="/logo.png"
                alt="Seattle Express Shuttle"
                width={260}
                height={70}
                className="h-12 sm:h-14 w-auto object-contain bg-white/95 p-1.5 rounded-sm shadow-sm"
                onError={(e) => {
                  if (e.currentTarget.src !== window.location.origin + '/seattle-express-shuttle-logo.webp') {
                    e.currentTarget.src = '/seattle-express-shuttle-logo.webp';
                  }
                }}
              />
            </a>

            <div className="space-y-1">
              <h3 className="font-cormorant font-bold text-2xl text-white tracking-wide">
                Seattle Express Shuttle
              </h3>
              <p className="text-xs font-manrope font-semibold text-[#C6AD83] tracking-widest uppercase">
                Sea-Tac Airport &amp; Pier 66 / Pier 91 Cruise Transfers
              </p>
            </div>

            <p className="text-[#C5BEB3] text-sm leading-relaxed max-w-sm">
              With over 20+ years of dependable transportation experience across the Pacific Northwest.
              Specializing in $30/person cruise shuttles from Sea-Tac hotels to Pier 66 &amp; Pier 91,
              Sea-Tac airport transfers, and private executive chauffeur charters.
            </p>

            {/* Cruise Terminals Badge */}
            <div className="pt-1 flex flex-col gap-1 text-xs text-[#C6AD83]">
              <span className="flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5" />
                <span>Pier 66: 2225 Alaskan Way, Seattle, WA 98121</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5" />
                <span>Pier 91: 2001 W Garfield St, Seattle, WA 98119</span>
              </span>
            </div>
          </div>

          {/* Services Column (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cormorant font-bold text-xl text-white tracking-wide border-b border-white/10 pb-2">
              Chauffeured Services
            </h4>
            <ul className="space-y-2 text-xs text-[#C5BEB3]">
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#C6AD83]" />
                  <span>Sea-Tac Airport Transportation</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-[#C6AD83]" />
                  <span>Cruise Transfers (Pier 66 &amp; 91)</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Corporate &amp; Executive Travel</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Weddings &amp; Special Events</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Woodinville Wine Country Tours</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Group &amp; Minibus (Up to 14 Pax)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Private Personal Trips &amp; Charters</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C6AD83] transition-colors">Airline Crew Layover Shuttles</a>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-cormorant font-bold text-xl text-white tracking-wide border-b border-white/10 pb-2">
              Dispatch &amp; Contact
            </h4>
            
            <div className="space-y-3.5 text-xs text-[#C5BEB3]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C6AD83] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">Headquarters:</strong>
                  <span>3507 S 188th St, SeaTac, WA 98188</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C6AD83] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">24/7 Phone &amp; SMS:</strong>
                  <a href="tel:+12065046000" className="text-white hover:text-[#C6AD83] font-bold text-sm transition-colors block">
                    +1 (206) 504-6000
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C6AD83] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">Direct Email:</strong>
                  <a href="mailto:info@seattleexpressshuttle.com" className="hover:text-[#C6AD83] transition-colors">
                    info@seattleexpressshuttle.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C6AD83] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs">Operating Hours:</strong>
                  <span>24 Hours a Day · 7 Days a Week</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="sms:+12065046000"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-[#C6AD83]/30 text-xs font-semibold text-white tracking-wider uppercase transition-colors"
              >
                <span>SMS Dispatch</span>
                <ExternalLink className="w-3 h-3 text-[#C6AD83]" />
              </a>

              <a
                href="https://wa.me/12065046000"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-[#C6AD83]/30 text-xs font-semibold text-white tracking-wider uppercase transition-colors"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-[#C6AD83]" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Back to Top Bar */}
      <div className="bg-[#1F272B] border-t border-white/5 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A39E94]">
          <div>
            <span>Copyright © 2026 Seattle Express Shuttle – All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span>Sea-Tac Airport Shuttles · Pier 66 &amp; Pier 91 Cruise Transfers · Charters</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C6AD83] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
