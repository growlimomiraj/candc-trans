import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { AnticorLogo } from './Logo.tsx';

interface FooterProps {
  onBookNowClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookNowClick }) => {
  return (
    <footer id="contact" className="pt-8 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Closing Section Container matching 100% Visual Blueprint */}
        <div className="relative rounded-3xl md:rounded-[36px] overflow-hidden border border-gray-100 shadow-[0_12px_40px_-10px_rgba(9,45,92,0.12)] bg-[#F8FBFE]">
          
          {/* Desktop Direct Graphic Rendering for 100% Pixel Fidelity */}
          <div className="hidden lg:block relative w-full aspect-[1632/420]">
            <img
              src="/assets/hd_cta_banner_exact.png"
              alt="Ready for Your Next Adventure? AnticorCar.com"
              className="w-full h-full object-cover select-none"
            />

            {/* Clickable Overlay for Book Now Button */}
            <button
              onClick={onBookNowClick}
              aria-label="Book Now"
              className="absolute left-[5.4%] bottom-[20%] w-[15.5%] h-[24%] rounded-full cursor-pointer hover:bg-white/10 active:scale-98 transition-all"
            />

            {/* Clickable Overlay for Phone */}
            <a
              href="tel:+971555123456"
              aria-label="Call +971 555 123456"
              className="absolute right-[5%] top-[14%] w-[33%] h-[23%] rounded-xl cursor-pointer hover:bg-orange-50/20 transition-all"
            />

            {/* Clickable Overlay for Email */}
            <a
              href="mailto:info@anticorcar.com"
              aria-label="Email info@anticorcar.com"
              className="absolute right-[5%] top-[41%] w-[33%] h-[23%] rounded-xl cursor-pointer hover:bg-orange-50/20 transition-all"
            />
          </div>

          {/* Mobile & Tablet Responsive Layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 items-stretch">
              
              {/* Left Side: Road Image with Dark Navy Overlay */}
              <div className="relative min-h-[260px] flex flex-col justify-center p-8 overflow-hidden bg-slate-900">
                <img
                  src="/assets/hd_clean_cta_road.png"
                  alt="Scenic mountain road"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 max-w-sm">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    Ready for Your Next Adventure?
                  </h2>
                  <p className="text-slate-200 text-xs font-normal mb-6 leading-relaxed">
                    Book your dream car today and hit the road with confidence.
                  </p>
                  <button
                    onClick={onBookNowClick}
                    className="bg-[#FF7100] hover:bg-[#E66500] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-lg transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Side: Contact Information */}
              <div className="bg-[#F8FBFE] p-6 sm:p-8 space-y-4">
                
                {/* Phone */}
                <a href="tel:+971555123456" className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                    <Phone className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block text-[15px] font-extrabold text-[#092D5C] group-hover:text-[#FF7100] transition-colors">
                      +971 555 123456
                    </span>
                    <span className="text-xs text-[#64748B]">Call Us</span>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:info@anticorcar.com" className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                    <Mail className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block text-[15px] font-extrabold text-[#092D5C] group-hover:text-[#FF7100] transition-colors">
                      info@anticorcar.com
                    </span>
                    <span className="text-xs text-[#64748B]">Email Us</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                    <MapPin className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <span className="block text-[15px] font-extrabold text-[#092D5C]">
                      Dubai, Sharjah
                    </span>
                    <span className="text-xs text-[#64748B]">Our Locations</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-3">
          <div className="flex items-center gap-2">
            <AnticorLogo className="h-6" subtitleClass="hidden" />
          </div>
          <div>
            © {new Date().getFullYear()} AnticorCar.com. All rights reserved. Renting. Your Way. Premium.
          </div>
        </div>

      </div>
    </footer>
  );
};
