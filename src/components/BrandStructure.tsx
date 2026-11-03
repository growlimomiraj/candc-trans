import React from 'react';
import { Award, Zap, Check, ArrowRight, Anchor } from 'lucide-react';

interface BrandStructureProps {
  onSelectOption?: (brandName: string) => void;
}

export const BrandStructure: React.FC<BrandStructureProps> = ({ onSelectOption }) => {
  const handleChoose = (brand: string) => {
    onSelectOption?.(brand);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="brand" className="py-20 sm:py-28 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase block mb-3">
            Seattle Express Shuttle Services &amp; Fleet Options
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-4">
            Reliable Cruise Shuttles &amp; Executive Chauffeur Travel
          </h2>
          <div className="w-16 h-[2px] bg-[#C6AD83] mx-auto mb-4" />
          <p className="font-manrope text-[#77736D] text-base leading-relaxed">
            Whether you need our signature $30 per person cruise shuttle from your Sea-Tac hotel to Pier 66 or Pier 91,
            or a private luxury SUV or Sprinter charter, Seattle Express Shuttle delivers on-time, guaranteed service.
          </p>
        </div>

        {/* Dual Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: Cruise Shuttles & Airport Transfers */}
          <div className="luxury-card rounded-sm bg-white p-8 sm:p-10 flex flex-col justify-between border-t-4 border-t-[#C6AD83] relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#FAF8F4] text-[#A88B61] border border-[#C6AD83]/40 text-[11px] font-manrope font-bold uppercase tracking-wider">
                  <Anchor className="w-3.5 h-3.5 text-[#C6AD83]" />
                  <span>Seattle Cruise &amp; Airport Specialist</span>
                </div>
                <span className="font-cormorant text-2xl font-bold text-[#35434A]">
                  $30 / Person
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-3xl text-[#35434A] mb-2">
                Seattle Express Cruise &amp; Airport Shuttle
              </h3>

              <p className="font-manrope text-xs font-semibold text-[#A88B61] uppercase tracking-wider mb-4">
                Pier 66 &amp; Pier 91 Cruise Berths · Sea-Tac Area Hotels
              </p>

              <p className="font-manrope text-sm text-[#77736D] leading-relaxed mb-6">
                Our signature service connecting guests staying at Sea-Tac area hotels directly with the Seattle cruise terminals at Pier 66 (Bell St) and Pier 91 (Smith Cove). Luggage handling included.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#EAE4D9] mb-8">
                {[
                  '$30 per person flat rate from any hotel near Sea-Tac Airport',
                  'Direct drop-off at cruise baggage porter stations (Pier 66 & Pier 91)',
                  'Spacious luxury Mercedes-Benz Sprinter passenger vans',
                  'Luggage assistance included for heavy cruise luggage and gear',
                  'Scheduled morning departures aligned with ship embarkation',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-manrope text-[#35434A]">
                    <Check className="w-4 h-4 text-[#A88B61] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleChoose('Cruise Shuttle to Pier 66 / Pier 91 ($30/person)')}
                className="w-full btn-champagne py-3.5 px-6 rounded-sm text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all text-white"
              >
                <span>BOOK CRUISE SHUTTLE ($30/PERSON)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card 2: Executive Chauffeur & Private Personal Trips */}
          <div className="luxury-card rounded-sm bg-white p-8 sm:p-10 flex flex-col justify-between border-t-4 border-t-[#35434A] relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#35434A] text-white text-[11px] font-manrope font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#C6AD83]" />
                  <span>Private Chauffeur &amp; Charters</span>
                </div>
                <span className="font-cormorant text-2xl font-bold text-[#C6AD83]">
                  Priced by Distance
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-3xl text-[#35434A] mb-2">
                Private Sedan, SUV &amp; Sprinter Charter
              </h3>

              <p className="font-manrope text-xs font-semibold text-[#A88B61] uppercase tracking-wider mb-4">
                Dedicated Executive Chauffeur · Personalized Puget Sound Trips
              </p>

              <p className="font-manrope text-sm text-[#77736D] leading-relaxed mb-6">
                Private personal trips for families, VIPs, airline flight crews, and corporate teams. Featuring our confirmed all-electric 2026 Kia EV9, Cadillac Escalade ESV, and private Mercedes Sprinters.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#EAE4D9] mb-8">
                {[
                  'Executive corporate accounts & tech corridor roadshows',
                  'Weddings, galas & luxury VIP red-carpet event arrivals',
                  'Private custom Woodinville wine country chauffeured tours',
                  'Hourly as-directed charters & long-distance transfers',
                  '100% in-house professional chauffeurs — zero gig workers',
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-manrope text-[#35434A]">
                    <Check className="w-4 h-4 text-[#A88B61] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleChoose('Private Chauffeur / Executive Sedan/SUV')}
                className="w-full btn-slate py-3.5 px-6 rounded-sm text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all text-white"
              >
                <span>BOOK PRIVATE SEDAN / SUV / CHARTER</span>
                <ArrowRight className="w-4 h-4 text-[#C6AD83]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
