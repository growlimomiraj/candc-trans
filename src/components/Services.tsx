import React, { useState } from 'react';
import { Plane, Briefcase, UserCheck, Anchor, Building2, Users, ArrowRight, Check, Heart, Wine, Sparkles, Clock, MapPin } from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'airport-cruise' | 'corporate-vip' | 'events-wine' | 'group-longdistance'>('all');

  const servicesList = [
    {
      id: 'airport-transfers',
      category: 'airport-cruise',
      title: 'Sea-Tac Airport Transportation (SEA)',
      subtitle: 'Real-Time FlightRadar24 Tracking & Flat Rates',
      description:
        'Dependable, non-stop private transfers to and from Seattle-Tacoma International Airport (SEA). Real-time FAA flight tracking ensures your chauffeur is ready the minute you touch down, with up to 60 minutes of complimentary standby time.',
      image: '/fleet/mercedes-sprinter-seatac.jpg',
      icon: <Plane className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'Real-time FlightRadar24 tracking with zero delay penalties',
        'Inside-terminal meet-and-greet (Level 1 Baggage Claim or Level 3 Garage)',
        'Available in First Class Sedans, 2026 Kia EV9, Luxury SUVs & Sprinters',
      ],
      bookingPreset: 'Airport Transfer (Sea-Tac SEA)',
      pickupPreset: 'Seattle-Tacoma International Airport (SEA)',
      dropoffPreset: 'Seattle / Bellevue / Greater Puget Sound',
      badge: 'FlightRadar Monitored',
    },
    {
      id: 'cruise-shuttle',
      category: 'airport-cruise',
      title: 'Seattle Cruise Port Transfers',
      subtitle: 'Pier 66 Bell St & Pier 91 Smith Cove',
      description:
        'Direct ship-front gangway valet staging at Seattle cruise berths (Pier 66 and Pier 91), avoiding chaotic distant rideshare lots. Enjoy our signature $30 per person Sea-Tac hotel shuttle or private luxury SUV/van transfer.',
      image: '/fleet/seattle-cruise-pier-transfer.jpg',
      icon: <Anchor className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        '$30 per person flat rate from any Sea-Tac area hotel or private charter',
        'Direct ship-front gangway valet access at Pier 66 & Pier 91',
        'Full luggage handling assistance for heavy cruise bags and trunks',
      ],
      bookingPreset: 'Cruise Shuttle to Pier 66 / Pier 91 ($30/person)',
      pickupPreset: 'Hotel near Sea-Tac Airport',
      dropoffPreset: 'Pier 66 / Pier 91 Cruise Terminal',
      badge: '$30 Flat Rate or Private',
    },
    {
      id: 'corporate-executive',
      category: 'corporate-vip',
      title: 'Corporate & Executive Transportation',
      subtitle: 'Eastside Tech Corridor, C-Suite & Roadshows',
      description:
        'Professional executive black car transportation tailored for C-suite executives, board meetings, investor roadshows, and corporate conventions across downtown Seattle, Bellevue, Redmond, and Tacoma.',
      image: '/fleet/corporate-executive-chauffeur.jpg',
      icon: <Briefcase className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'All-black executive fleet with acoustic privacy glass and Wi-Fi',
        'Corporate standing accounts with consolidated monthly master billing',
        'Confidential, NDA-compliant career executive chauffeurs',
      ],
      bookingPreset: 'Corporate Executive Chauffeur',
      pickupPreset: 'Downtown Seattle / Bellevue Tech Corridor',
      dropoffPreset: 'Corporate Campus / Executive Destination',
      badge: 'C-Suite Executive',
    },
    {
      id: 'hourly-chauffeur',
      category: 'corporate-vip',
      title: 'Hourly & As-Directed Chauffeur Service',
      subtitle: 'Complete Flexibility for Meetings & Excursions',
      description:
        'Private as-directed chauffeur transportation charged strictly by the hour. Travel between multiple client meetings, shopping destinations, dining reservations, or sightseeing tours with your dedicated driver on standby.',
      image: '/fleet/cadillac-escalade-black.jpg',
      icon: <Clock className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'Flexible as-directed itinerary with unlimited stops throughout Seattle',
        'Dedicated professional chauffeur on standby at your destination',
        'Available in First Class Luxury Sedans, SUVs, and Executive Sprinters',
      ],
      bookingPreset: 'Hourly Dedicated Chauffeur',
      pickupPreset: 'Seattle / Bellevue Area Address',
      dropoffPreset: 'As Directed by Passenger',
      badge: 'As-Directed Hourly',
    },
    {
      id: 'weddings-events',
      category: 'events-wine',
      title: 'Weddings & Special Events',
      subtitle: 'Bridal Getaways, Galas & Red Carpet Arrivals',
      description:
        'Sophisticated private transportation tailored for weddings, anniversaries, charity galas, and milestone celebrations. Impeccable scheduling, red carpet service, and seamless bridal party coordination.',
      image: '/fleet/wedding-luxury-chauffeur.jpg',
      icon: <Heart className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'Impeccable all-black executive SUVs and bridal Sprinters',
        'Red-carpet service and timeline coordination with wedding planners',
        'Flexible hourly standby throughout the ceremony and reception',
      ],
      bookingPreset: 'Wedding & Special Event Chauffeur',
      pickupPreset: 'Seattle Residence / Bridal Suite',
      dropoffPreset: 'Wedding Venue / Reception Hall',
      badge: 'Luxury Event Specialist',
    },
    {
      id: 'wine-tours',
      category: 'events-wine',
      title: 'Woodinville Wine Country Tours',
      subtitle: 'Custom Chauffeured Winery Itineraries & Tastings',
      description:
        'Enjoy private, bespoke winery excursions across Woodinville wine country without the worry of driving. Custom tasting routes, door-to-door concierge service, and chilled onboard refreshments.',
      image: '/fleet/woodinville-wine-tour.jpg',
      icon: <Wine className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'Customized door-to-door Puget Sound winery tours',
        'High-roof luxury Mercedes Sprinters or VIP executive SUVs',
        'Dedicated chauffeur on standby for cases and boutique purchases',
      ],
      bookingPreset: 'Woodinville Wine Country Tour',
      pickupPreset: 'Seattle / Bellevue Hotel or Residence',
      dropoffPreset: 'Woodinville Wine District',
      badge: 'Private Wine Tour',
    },
    {
      id: 'group-charters',
      category: 'group-longdistance',
      title: 'Family & Group Transportation',
      subtitle: 'Mercedes Sprinters & Minibuses (Up to 14 Pax)',
      description:
        'Executive group mobility for family reunions, corporate delegations, sports outings, conventions, and large travel parties. Features 6-foot-4 standing interior headroom, center walking aisle, and massive cargo volume.',
      image: '/fleet/seattle-mercedes-sprinter.jpg',
      icon: <Users className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        '6-foot-4 interior standing headroom with walk-in center aisle',
        'Dedicated luggage partition accommodating 14+ large bags & gear',
        'Individual USB charging ports and passenger climate control',
      ],
      bookingPreset: 'Group Van / Minibus Charter (Up to 14)',
      pickupPreset: 'Seattle Convention Center / Area Hotel',
      dropoffPreset: 'Puget Sound Regional Destination',
      badge: 'Up to 14 Passengers',
    },
    {
      id: 'long-distance',
      category: 'group-longdistance',
      title: 'Private Point-to-Point & Long-Distance',
      subtitle: 'Portland, Vancouver BC, Anacortes & Regional',
      description:
        'Non-stop private executive transportation across Washington State and the Pacific Northwest, including Seattle to Portland, Vancouver BC, Anacortes ferry terminals, or Spokane. Flat transparent rates with zero surge pricing.',
      image: '/fleet/chevrolet-suburban-seattle.jpg',
      icon: <MapPin className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        'Private vehicles exclusively reserved for your travel party',
        'Fixed upfront flat pricing with zero algorithm surge spikes',
        'Comfortable long-range touring with leather seating & Wi-Fi',
      ],
      bookingPreset: 'Private Point-to-Point / Long Distance',
      pickupPreset: 'Seattle / Puget Sound Address',
      dropoffPreset: 'Portland / Vancouver BC / Anacortes / Regional',
      badge: 'By Distance / Long-Range',
    },
    {
      id: 'crew-transfers',
      category: 'group-longdistance',
      title: 'Airline & Military Crew Layover Shuttles',
      subtitle: '24/7 Airline Flight Operations & Hotel Transfers',
      description:
        'Dedicated, prioritized ground shuttle service for commercial airline pilots, flight attendants, and military operations personnel between Sea-Tac terminals and partner layover hotels.',
      image: '/fleet/seatac-sprinter-delta.png',
      icon: <Building2 className="w-5 h-5 text-[#A88B61]" />,
      highlights: [
        '24/7 rapid dispatch hotline directly for airline dispatchers',
        'Airline crew vouchers and direct corporate contract billing',
        'Extra-large cargo bays for flight kits, bags, and uniforms',
      ],
      bookingPreset: 'Airport Crew Layover Shuttle',
      pickupPreset: 'Sea-Tac International Airport Terminal',
      dropoffPreset: 'Airline Partner Layover Hotel',
      badge: 'Airline Priority 24/7',
    },
  ];

  const filteredServices = activeCategory === 'all'
    ? servicesList
    : servicesList.filter((s) => s.category === activeCategory);

  const handleBook = (preset: string, pickupPreset?: string, dropoffPreset?: string) => {
    onSelectService?.(preset);
    window.dispatchEvent(
      new CustomEvent('prefill-quote', {
        detail: {
          service: preset,
          trip: preset.includes('Cruise')
            ? 'Cruise Port Shuttle'
            : preset.includes('Airport')
            ? 'Airport Transfer'
            : preset.includes('Hourly')
            ? 'Hourly Dedicated Charter'
            : 'Point-to-Point Transfer',
          pickup: pickupPreset || '',
          dropoff: dropoffPreset || '',
          hours: preset.includes('Hourly') ? '4' : '3',
          pax: preset.includes('Group') ? '8' : '2',
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
    <section id="services" className="py-20 sm:py-28 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase block mb-3">
              Comprehensive Transportation Services
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight">
              Executive &amp; Shuttle Transportation
            </h2>
            <div className="w-16 h-[2px] bg-[#C6AD83] mt-4 mb-4" />
            <p className="font-manrope text-[#77736D] text-base leading-relaxed">
              From our famous <strong>$30/person cruise shuttles to Pier 66 &amp; Pier 91</strong> to Sea-Tac airport transfers,
              corporate executive chauffeur charters, weddings, Woodinville wine tours, and long-distance transfers — all operated with zero surge pricing.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#quote-card"
              onClick={() => {
                const el = document.getElementById('quote-card');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="btn-outline-slate px-6 py-3 rounded-sm text-xs tracking-wider inline-flex items-center gap-2 cursor-pointer"
            >
              <span>INSTANT ONLINE QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A88B61]" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills (Strictly in one clean line, scrollable on mobile) */}
        <div className="w-full overflow-x-auto no-scrollbar mb-10 pb-1">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 w-fit min-w-max mx-auto px-1">
            {[
              { id: 'all', label: 'All Services (9)' },
              { id: 'airport-cruise', label: 'Airport & Cruise Port' },
              { id: 'corporate-vip', label: 'Corporate, VIP & Hourly' },
              { id: 'events-wine', label: 'Weddings & Wine Tours' },
              { id: 'group-longdistance', label: 'Group Vans & Long Distance' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-sm text-xs font-manrope font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#35434A] text-white shadow-sm'
                    : 'bg-white text-[#55524D] border border-[#EAE4D9] hover:border-[#35434A] hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (Editorial Light Luxury Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="luxury-card rounded-sm bg-white overflow-hidden flex flex-col justify-between border border-[#EAE4D9] hover:border-[#C6AD83]/70 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Visual Photography Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      if (e.currentTarget.src !== window.location.origin + '/fleet/cadillac-escalade-waterfront.jpg') {
                        e.currentTarget.src = '/fleet/cadillac-escalade-waterfront.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Service Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-xs bg-[#35434A]/90 backdrop-blur-xs text-white text-[10px] font-manrope font-bold uppercase tracking-wider shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="p-1.5 rounded-xs bg-[#FAF8F4] border border-[#EAE4D9] text-[#A88B61]">
                      {service.icon}
                    </span>
                    <span className="text-[11px] font-manrope font-semibold text-[#A88B61] tracking-wider uppercase">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="font-cormorant font-bold text-xl text-[#35434A] mb-3 leading-tight">
                    {service.title}
                  </h3>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 pt-3 border-t border-[#EAE4D9]/80 mb-6">
                    {service.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] font-manrope text-[#55524D]">
                        <Check className="w-3.5 h-3.5 text-[#A88B61] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action: One-Click Instant Quote */}
              <div className="px-5 sm:px-6 pb-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleBook(service.bookingPreset, service.pickupPreset, service.dropoffPreset)}
                  className="w-full py-2.5 px-3.5 rounded-sm border border-[#35434A]/20 hover:border-[#35434A] text-[#35434A] hover:bg-[#35434A] hover:text-white text-[11px] font-manrope font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between cursor-pointer group/btn shadow-2xs hover:shadow"
                >
                  <span>Quote This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dispatch Guarantee Banner */}
        <div className="mt-12 p-5 rounded-sm bg-white border border-[#C6AD83]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-manrope">
          <div className="flex items-center gap-3 text-[#55524D]">
            <Sparkles className="w-5 h-5 text-[#A88B61] shrink-0" />
            <span>
              <strong>All-Inclusive Transparent Flat Rates:</strong> Zero surge pricing, real-time FlightRadar24 tracking, and 100% in-house Seattle dispatch.
            </span>
          </div>
          <a
            href="tel:+12065046000"
            className="shrink-0 text-[#F60102] hover:text-[#d40102] font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
          >
            Questions? Call Hotline: (206) 504-6000 &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
