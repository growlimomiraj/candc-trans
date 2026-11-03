import React from 'react';
import { ArrowRight, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onBookClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookClick }) => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#35434A] text-white">
      {/* Background Scenic Road / Executive Chauffeur Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/ai/ai_cta_road.png"
          alt="Executive Chauffeur Journey Pacific Northwest"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
          onError={(e) => {
            if (e.currentTarget.src !== window.location.origin + '/fleet/cadillac-escalade-waterfront.jpg') {
              e.currentTarget.src = '/fleet/cadillac-escalade-waterfront.jpg';
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#273238]/95 via-[#35434A]/85 to-[#273238]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C6AD83]/40 text-[#C6AD83] text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C6AD83]" />
          <span>Experience The Difference</span>
        </div>

        {/* Main Title */}
        <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
          Ready for an Elevated Journey?
        </h2>

        <div className="w-20 h-[2px] bg-[#C6AD83] mx-auto mb-6" />

        {/* Subtitle */}
        <p className="font-manrope text-base sm:text-lg text-[#EAE4D9]/85 max-w-2xl mx-auto leading-relaxed mb-10">
          From immediate Sea-Tac airport pickups to full-day corporate executive charters,
          our 24/7 Seattle dispatch team is standing by to confirm your reservation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#booking"
            onClick={onBookClick}
            className="w-full sm:w-auto btn-champagne py-4 px-9 rounded-sm text-center text-sm font-semibold tracking-wider inline-flex items-center justify-center gap-2 shadow-lg"
          >
            <span>RESERVE YOUR JOURNEY</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>

          <a
            href="tel:+12065046000"
            className="w-full sm:w-auto bg-[#F60102] hover:bg-[#d40102] text-white py-4 px-9 rounded-sm text-sm font-manrope font-bold tracking-wider shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>CALL HOTLINE: (206) 504-6000</span>
          </a>
        </div>

        {/* Trust Guarantees */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-manrope text-[#EAE4D9]/75 pt-6 border-t border-white/10">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C6AD83]" />
            Guaranteed On-Time Pickup
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C6AD83]" />
            Licensed &amp; Fully Insured
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C6AD83]" />
            Confirmed Black 2026 EV9 Flagship
          </span>
        </div>
      </div>
    </section>
  );
};

