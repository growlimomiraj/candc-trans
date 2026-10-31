import React from 'react';
import { Car, Award, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-6 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F4F9FD]/60 via-white to-white">
      {/* Soft background blue glow on top right */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#EAF5FC] to-transparent rounded-full -mr-32 -mt-32 pointer-events-none blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-2 lg:pt-6">
            
            {/* Small outlined orange badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full border border-[#FF7100]/50 bg-[#FFF7ED] text-[#FF7100] text-xs font-semibold tracking-wide shadow-2xs">
              <Car className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>C&C Executive & AeroRide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12]">
              <span className="block text-[#092D5C]">Your Next Ride</span>
              <span className="block text-[#FF7100] mt-1">Is Waiting</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-[#64748B] text-base sm:text-[16px] leading-relaxed max-w-lg">
              Experience premier executive travel with C&C Transportation Service. From high-value corporate travel to AeroRide fixed-price airport transfers, travel in all-black luxury with peace of mind.
            </p>

            {/* Three Service Benefits with Orange Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 sm:pt-6 border-t border-gray-100">
              
              {/* Benefit 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF4EA] border border-[#FFE2CC] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                  <Award className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#092D5C] leading-tight">C&C Executive</h4>
                  <p className="text-[11.5px] text-[#64748B] leading-tight mt-0.5">High-Value Luxury</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF4EA] border border-[#FFE2CC] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#092D5C] leading-tight">AeroRide</h4>
                  <p className="text-[11.5px] text-[#64748B] leading-tight mt-0.5">Fixed Cheap Rates</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF4EA] border border-[#FFE2CC] flex items-center justify-center flex-shrink-0 text-[#FF7100]">
                  <Zap className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#092D5C] leading-tight">Black EV9 2026</h4>
                  <p className="text-[11.5px] text-[#64748B] leading-tight mt-0.5">All-Electric Quiet</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Jet Black Luxury SUV in curved flowing container */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Organic flowing curved image container matching reference */}
              <div className="relative overflow-hidden rounded-[42px] md:rounded-[56px] shadow-2xl bg-gradient-to-tr from-[#092D5C]/10 to-transparent">
                <div className="relative rounded-[40px] md:rounded-[54px] overflow-hidden aspect-[1.22/1]">
                  <img
                    src="/assets/ai/ai_hero_black_suv.png"
                    alt="C&C Transportation Executive Jet Black Luxury Fleet"
                    className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Handwritten Script Headline overlay */}
                  <div className="absolute top-4 right-8 md:top-6 md:right-12 pointer-events-none select-none">
                    <span className="font-script text-2xl md:text-3xl text-[#092D5C] font-bold tracking-wide -rotate-6 block drop-shadow-sm">
                      Ride. Rule.
                    </span>
                    <span className="font-script text-xl md:text-2xl text-[#092D5C] font-bold tracking-wide -rotate-3 block ml-4 drop-shadow-sm">
                      Enjoy the Journey!
                    </span>
                  </div>
                </div>
              </div>

              {/* Soft decorative shadow */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FF7100]/10 rounded-full blur-2xl pointer-events-none -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
