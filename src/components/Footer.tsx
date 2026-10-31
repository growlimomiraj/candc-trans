import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { AnticorLogo } from './Logo.tsx';

interface FooterProps {
  onBookNowClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookNowClick }) => {
  return (
    <footer id="contact" className="pt-8 pb-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Closing Section with Rounded Corners */}
        <div className="relative rounded-3xl md:rounded-[36px] overflow-hidden border border-gray-100 shadow-[0_12px_40px_-10px_rgba(9,45,92,0.12)] bg-[#F8FBFE]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Side: Cinematic Road with Dark Navy Overlay (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[360px] flex flex-col justify-center p-8 sm:p-12 lg:p-14 overflow-hidden">
              
              {/* Background Road Image with AI quality */}
              <img
                src="/assets/ai/ai_cta_road.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== window.location.origin + '/assets/hd_clean_cta_road.png') {
                    target.src = '/assets/hd_clean_cta_road.png';
                  }
                }}
                alt="Winding mountain road surrounded by greenery"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Dark Navy Overlay matching reference (#092D5C at 80% opacity) */}
              <div className="absolute inset-0 bg-[#092D5C]/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#092D5C] via-[#092D5C]/85 to-transparent" />

              {/* Content on Left */}
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-tight mb-3">
                  Ready for Your Next Adventure?
                </h2>
                
                <p className="text-slate-200 text-sm sm:text-[15px] font-normal mb-7 leading-relaxed">
                  Book your dream car today and hit the road with confidence.
                </p>

                <button
                  onClick={onBookNowClick}
                  className="bg-[#FF7100] hover:bg-[#E66500] text-white font-bold text-sm sm:text-[15px] px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer group"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Side: White Background with 3 Contact Rows (5 cols) */}
            <div className="lg:col-span-5 bg-[#F8FBFE] p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
              
              {/* Row 1: Phone */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100] group-hover:bg-[#FF7100] group-hover:text-white transition-colors duration-200 shadow-2xs">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <a
                    href="tel:+971555123456"
                    className="block text-[16px] font-extrabold text-[#092D5C] hover:text-[#FF7100] transition-colors"
                  >
                    +971 555 123456
                  </a>
                  <span className="text-[12.5px] font-medium text-[#64748B]">
                    Call Us
                  </span>
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100] group-hover:bg-[#FF7100] group-hover:text-white transition-colors duration-200 shadow-2xs">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <a
                    href="mailto:info@anticorcar.com"
                    className="block text-[16px] font-extrabold text-[#092D5C] hover:text-[#FF7100] transition-colors"
                  >
                    info@anticorcar.com
                  </a>
                  <span className="text-[12.5px] font-medium text-[#64748B]">
                    Email Us
                  </span>
                </div>
              </div>

              {/* Row 3: Location */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#FFE6D3] flex items-center justify-center flex-shrink-0 text-[#FF7100] group-hover:bg-[#FF7100] group-hover:text-white transition-colors duration-200 shadow-2xs">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="block text-[16px] font-extrabold text-[#092D5C]">
                    Dubai, Sharjah
                  </span>
                  <span className="text-[12.5px] font-medium text-[#64748B]">
                    Our Locations
                  </span>
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
