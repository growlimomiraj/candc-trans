import React, { useState } from 'react';
import { Users, Briefcase, Zap, ShieldCheck, Check, Sparkles, ArrowRight, Info, Anchor, DollarSign } from 'lucide-react';

interface FleetProps {
  onSelectVehicle?: (vehicleName: string) => void;
  onOpenGallery?: (imageSrc: string) => void;
}

export const Fleet: React.FC<FleetProps> = ({ onSelectVehicle }) => {
  const fleetVehicles = [
    {
      id: 'cadillac-escalade',
      buttonLabel: 'First Class SUV (Escalade ESV)',
      name: 'First Class SUV · Cadillac Escalade ESV',
      badge: 'Confirmed Executive Fleet',
      tagBadge: 'Up to 6–7 Passengers',
      subtitle: 'Extended Wheelbase · Executive Leather & Rear Climate Sanctuary',
      description:
        'The undisputed benchmark in American executive black car ground travel. Featuring hand-stitched leather captain chairs, tri-zone automatic climate control, acoustic privacy glass, and massive luggage space for cruise baggage, golf gear, and executive travel bags.',
      passengers: '6–7 Passengers',
      luggage: '6 Large Suitcases',
      drivetrain: 'Magnetic Ride AWD',
      category: 'First Class SUV / MPV',
      rateHint: 'From $159 Flat Rate · From $180/hr',
      image: '/fleet/cadillac-escalade-black.jpg',
      fallbackImage: '/fleet/seattle-pier66-escalade.jpg',
      highlights: [
        'Confirmed active commercial executive fleet in Puget Sound',
        'Hand-stitched leather upholstery with ambient executive lighting',
        'Extended rear cargo capacity accommodating 6 large suitcases',
        'Ideal for executive business travel, families & cruise pier transfers',
      ],
    },
    {
      id: 'kia-ev9-2026',
      buttonLabel: '2026 Kia EV9 (All-Electric)',
      name: '2026 Kia EV9 (Jet Black Flagship)',
      badge: 'Confirmed Active Vehicle',
      tagBadge: '100% All-Electric Flagship',
      subtitle: 'Jet Black Exterior · Executive All-Electric Chauffeur Sanctuary',
      description:
        'Our confirmed all-electric flagship combines zero-emissions modern elegance with whisper-quiet ride quality. Equipped with second-row VIP reclining captain chairs, dual panoramic sunroofs, and generous luggage capacity, the EV9 sets the standard for contemporary Pacific Northwest executive mobility.',
      passengers: '6 Luxury Seats (Captain Chairs)',
      luggage: '4 Large Bags + Carry-ons',
      drivetrain: 'Dual-Motor AWD (Whisper Quiet)',
      category: 'Eco-Executive Electric Flagship',
      rateHint: 'Fixed Airport Rate or Hourly Charter',
      image: '/assets/ai/ai_car_kia_ev9.png',
      fallbackImage: '/assets/ai/ai_car_kia_ev9.jpg',
      highlights: [
        'Confirmed active commercial inventory in Seattle',
        'VIP second-row executive captain chairs with dual climate zones',
        'Zero-emissions sustainable travel with zero fuel surcharges',
        'Acoustic laminated privacy glass and whisper-quiet cabin',
      ],
    },
    {
      id: 'mercedes-sprinter',
      buttonLabel: 'Executive Sprinter (Up to 14)',
      name: 'Executive Minibus · Mercedes-Benz Sprinter',
      badge: 'Confirmed Group Fleet',
      tagBadge: 'Up to 14 Passengers',
      subtitle: 'High-Roof Luxury Passenger Shuttle · Cruise Pier & Group Specialist',
      description:
        'Designed for seamless group transfers between Sea-Tac hotels and Seattle cruise berths at Pier 66 and Pier 91, conventions, and corporate delegations. Offers 6-foot-4 standing interior headroom, center walking aisle, dedicated rear luggage partition, and comfortable contoured high-back seating.',
      passengers: 'Up to 14 Passengers',
      luggage: '14+ Checked Bags',
      drivetrain: 'High-Roof Turbo Diesel',
      category: 'Executive Minibus / Passenger Van',
      rateHint: 'From $299 Flat Rate · $215/hr · From $30/pax Cruise Shuttle',
      image: '/fleet/seattle-mercedes-sprinter.jpg',
      fallbackImage: '/fleet/seatac-sprinter-delta.png',
      highlights: [
        'Confirmed active group transport fleet in SeaTac & Seattle',
        '6-foot-4 standing interior headroom with walk-in center aisle',
        'Dedicated cruise pier transfer luggage partition for 14+ large bags',
        'Individual reading lights and USB passenger device charging ports',
      ],
    },
    {
      id: 'executive-sedan',
      buttonLabel: 'Business Class Sedan',
      name: 'Business Class Sedan · Executive Black Car',
      badge: 'Confirmed Chauffeur Sedan',
      tagBadge: '3 Passengers',
      subtitle: 'Executive Sedan · Quiet Comfort for Solo Travelers & Couples',
      description:
        'First-class executive sedan transportation tailored for solo business travelers, corporate executives, and couples. Delivers smooth highway performance, quiet cabin acoustics, rear climate controls, and professional curbside service.',
      passengers: 'Up to 3 Passengers',
      luggage: '2–3 Large Bags',
      drivetrain: 'Smooth Chauffeur AWD',
      category: 'Business Class Sedan',
      rateHint: 'From $129 – $140 Flat Rate · From $120/hr',
      image: '/assets/ai/ai_car_black_bmw.png',
      fallbackImage: '/fleet/cadillac-escalade-black.jpg',
      highlights: [
        'Confirmed active commercial executive sedan in Seattle',
        'Quiet executive cabin with tinted rear acoustic privacy glass',
        'Complimentary chilled bottled water and mobile charging cables',
        'Perfect for airport transfers, client meetings & downtown dining',
      ],
    },
  ];

  // State: Currently selected vehicle in the spotlight card
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('cadillac-escalade');

  const currentVehicle = fleetVehicles.find((v) => v.id === selectedVehicleId) || fleetVehicles[0];

  const handleBookVehicle = (name: string) => {
    onSelectVehicle?.(name);
    window.dispatchEvent(
      new CustomEvent('prefill-quote', {
        detail: {
          service: `Private Charter — ${name}`,
          trip: 'Hourly Dedicated Charter',
          pickup: 'Seattle / SeaTac Area Address',
          dropoff: 'Puget Sound Regional Itinerary',
          hours: '3',
          pax: currentVehicle.passengers.includes('14') ? '10' : currentVehicle.passengers.includes('6') ? '4' : '2',
        },
      })
    );
    const bookingEl = document.getElementById('quote-card');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      bookingEl.classList.add('ring-4', 'ring-[#F60102]', 'ring-offset-4', 'transition-all');
      setTimeout(() => {
        bookingEl.classList.remove('ring-4', 'ring-[#F60102]', 'ring-offset-4');
      }, 2500);
    }
  };

  return (
    <section id="fleet" className="py-20 sm:py-28 bg-[#EAE4D9]/40 border-t border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C6AD83]/40 text-[#35434A] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A88B61]" />
            <span>Verified Commercial Fleet</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-4">
            Curated Executive Fleet
          </h2>

          <div className="w-16 h-[2px] bg-[#C6AD83] mx-auto mb-4" />

          <p className="font-manrope text-[#77736D] text-base leading-relaxed">
            Every vehicle in our collection is rigorously maintained, meticulously sanitized before every trip,
            and driven exclusively by career executive chauffeurs.
          </p>
        </div>

        {/* ===================================================================
            INTERACTIVE VEHICLE SWITCHER BUTTONS (FULL WIDTH & NEVER CLIPPED)
        =================================================================== */}
        <div className="w-full max-w-6xl mx-auto mb-10">
          <div className="w-full overflow-x-auto no-scrollbar py-2 px-1">
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-fit min-w-max mx-auto px-2">
              {fleetVehicles.map((v) => {
                const isSelected = v.id === selectedVehicleId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`whitespace-nowrap shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-[13px] font-manrope font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-2xs ${
                      isSelected
                        ? 'bg-[#35434A] text-white ring-2 ring-[#C6AD83] shadow-md transform -translate-y-0.5'
                        : 'bg-white text-[#55524D] border border-[#EAE4D9] hover:border-[#35434A] hover:bg-gray-50'
                    }`}
                  >
                    {v.buttonLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================================
            DYNAMIC SPOTLIGHT CARD (Smoothly updates when ANY button is clicked)
        =================================================================== */}
        <div className="mb-12 bg-white rounded-lg border border-[#C6AD83]/50 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12 relative transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Automotive Photo with Dynamic Animation */}
            <div className="lg:col-span-7 relative group">
              <div className="aspect-[16/10] rounded-sm overflow-hidden bg-gray-50 border border-[#EAE4D9] relative shadow-md">
                <img
                  key={currentVehicle.id}
                  src={currentVehicle.image}
                  alt={currentVehicle.name}
                  className="w-full h-full object-cover object-center transform scale-100 hover:scale-103 transition-transform duration-700 ease-out animate-fadeIn"
                  onError={(e) => {
                    if (e.currentTarget.src !== window.location.origin + currentVehicle.fallbackImage) {
                      e.currentTarget.src = currentVehicle.fallbackImage;
                    }
                  }}
                />
                
                {/* Dynamic Status Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-sm bg-[#35434A] text-white text-[11px] font-manrope font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6AD83]" />
                    {currentVehicle.badge}
                  </span>
                  <span className="px-3 py-1 rounded-sm bg-[#C6AD83] text-[#35434A] text-[11px] font-manrope font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    {currentVehicle.id === 'kia-ev9-2026' ? (
                      <Zap className="w-3.5 h-3.5" />
                    ) : (
                      <Anchor className="w-3.5 h-3.5" />
                    )}
                    {currentVehicle.tagBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Vehicle Specifications & Editorial Content */}
            <div className="lg:col-span-5 flex flex-col justify-center animate-fadeIn" key={`info-${currentVehicle.id}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase">
                  Verified Fleet Category
                </span>
                <span className="text-xs font-manrope font-bold text-[#35434A] bg-[#FAF8F4] px-2.5 py-0.5 rounded-xs border border-[#EAE4D9]">
                  {currentVehicle.rateHint}
                </span>
              </div>

              <h3 className="font-cormorant font-bold text-3xl sm:text-4xl text-[#35434A] mb-2 leading-tight">
                {currentVehicle.name}
              </h3>

              <p className="font-manrope text-xs sm:text-[13px] font-semibold text-[#A88B61] mb-4">
                {currentVehicle.subtitle}
              </p>

              <p className="font-manrope text-sm text-[#77736D] leading-relaxed mb-6">
                {currentVehicle.description}
              </p>

              {/* Dynamic Specs - In ONE single line across columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 bg-[#FAF8F4] rounded-sm border border-[#EAE4D9] mb-6 text-xs font-manrope">
                <div className="flex items-center gap-1.5 text-[#35434A]">
                  <Users className="w-4 h-4 text-[#A88B61] shrink-0" />
                  <span className="truncate"><strong>{currentVehicle.passengers}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#35434A]">
                  <Briefcase className="w-4 h-4 text-[#A88B61] shrink-0" />
                  <span className="truncate"><strong>{currentVehicle.luggage}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#35434A]">
                  <Zap className="w-4 h-4 text-[#A88B61] shrink-0" />
                  <span className="truncate"><strong>{currentVehicle.drivetrain}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#35434A]">
                  <ShieldCheck className="w-4 h-4 text-[#A88B61] shrink-0" />
                  <span className="truncate"><strong>{currentVehicle.category}</strong></span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-6 text-xs font-manrope text-[#55524D]">
                {currentVehicle.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#A88B61] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleBookVehicle(currentVehicle.name)}
                  className="w-full btn-slate py-3.5 px-6 rounded-sm text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <span>RESERVE {currentVehicle.name.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 text-[#C6AD83]" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ===================================================================
            FOUR INTERACTIVE VEHICLE SELECTION CARDS
            (Clicking any card also switches the spotlight car above!)
        =================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {fleetVehicles.map((v) => {
            const isCurrent = v.id === selectedVehicleId;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`rounded-sm overflow-hidden flex flex-col justify-between bg-white cursor-pointer transition-all duration-300 ${
                  isCurrent
                    ? 'ring-2 ring-[#C6AD83] shadow-lg transform -translate-y-1'
                    : 'border border-[#EAE4D9] hover:border-[#35434A]/40 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        if (e.currentTarget.src !== window.location.origin + v.fallbackImage) {
                          e.currentTarget.src = v.fallbackImage;
                        }
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-manrope font-bold uppercase tracking-wider ${
                        isCurrent ? 'bg-[#C6AD83] text-[#35434A]' : 'bg-[#35434A]/90 text-white'
                      }`}>
                        {v.tagBadge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="text-[11px] font-manrope font-bold text-[#A88B61] mb-1">
                      {v.rateHint}
                    </div>
                    <h4 className="font-cormorant font-bold text-xl text-[#35434A] mb-1">
                      {v.name}
                    </h4>
                    <p className="font-manrope text-[11px] text-[#77736D] font-semibold mb-3">
                      {v.passengers} · {v.luggage}
                    </p>

                    <p className="text-xs font-manrope text-[#77736D] line-clamp-2 mb-2">
                      {v.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVehicleId(v.id);
                    }}
                    className={`w-full py-2 px-3 rounded-xs text-[11px] font-manrope font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#35434A] text-white shadow-xs'
                        : 'border border-gray-200 text-[#35434A] hover:bg-gray-100'
                    }`}
                  >
                    {isCurrent ? 'Active Spotlight' : 'Select Category'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strict Inventory Disclosure Policy */}
        <div className="max-w-4xl mx-auto p-5 rounded-sm bg-white border border-[#C6AD83]/30 shadow-xs flex items-start gap-4 text-xs font-manrope text-[#77736D]">
          <Info className="w-5 h-5 text-[#A88B61] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#35434A] font-semibold block mb-0.5">
              Verified Commercial Fleet Guarantee
            </strong>
            <span>
              Seattle Express Shuttle only operates verified, commercially licensed, and fully insured vehicles in active Puget Sound service.
              All vehicles include professional executive chauffeurs, complimentary bottled water, and zero hidden baggage surcharges.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
