import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface SpecialOfferProps {
  onBookNowClick?: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onBookNowClick }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container with Light Blue Background & Rounded Corners */}
        <div className="relative rounded-3xl md:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#EAF5FC] via-[#EEF6FD] to-[#F5FAFE] border border-[#D5E9F8] shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content Column (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 z-10 flex flex-col items-start justify-center">
              
              {/* Small Orange Label */}
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#FF7100] tracking-wide mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span>Special Offer</span>
              </div>

              {/* Large Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#092D5C] tracking-tight leading-[1.12] mb-3">
                <span className="block">Drive More</span>
                <span className="block">Pay Less</span>
              </h2>

              {/* Supporting Text */}
              <p className="text-[#64748B] text-sm sm:text-base font-medium max-w-sm mb-6 leading-relaxed">
                Get up to 20% OFF on select rentals for a limited time only.
              </p>

              {/* Orange Button */}
              <button
                onClick={onBookNowClick}
                className="bg-[#FF7100] hover:bg-[#E66500] text-white font-bold text-sm sm:text-[15px] px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer group"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Right Column: Slanted Image with BMW Sports Car & Discount Badge (7 cols) */}
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
              <div className="slant-left-edge w-full h-full relative">
                <img
                  src="/assets/ai/ai_special_offer_blue_bmw.png"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/assets/hd_clean_special_offer.png') {
                      target.src = '/assets/hd_clean_special_offer.png';
                    }
                  }}
                  alt="Blue luxury sports sedan with Up to 20% OFF discount badge"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Circular Orange Discount Badge matching reference */}
                <div className="absolute top-4 right-6 sm:top-6 sm:right-10 z-20">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full bg-[#FF7100] shadow-[0_6px_20px_rgba(255,113,0,0.45)] border-2 border-white flex flex-col items-center justify-center text-white text-center select-none transform hover:scale-105 transition-transform duration-200">
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider leading-none">
                      UP TO
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black leading-none my-0.5 tracking-tight">
                      20%
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider leading-none">
                      OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
