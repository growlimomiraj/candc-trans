import React from 'react';
import { ShieldCheck, UserCheck, Plane, DollarSign, Award, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#A88B61]" />,
      title: '100% In-House Career Chauffeurs',
      desc: 'Never outsourced to gig apps or contractor networks. Every driver is a background-checked, commercially licensed executive chauffeur in professional suit attire.',
    },
    {
      icon: <DollarSign className="w-6 h-6 text-[#A88B61]" />,
      title: 'Guaranteed Flat Rates — Zero Surge Pricing',
      desc: 'Transparent, locked pricing confirmed upfront. No algorithm price spikes, no surprise peak charges, and no baggage surcharges.',
    },
    {
      icon: <Plane className="w-6 h-6 text-[#A88B61]" />,
      title: 'FlightRadar24 Tracking & 60 Min Free Standby',
      desc: 'Real-time FAA flight monitoring with 60 minutes complimentary wait time on arrivals. Terminal meet-and-greet at Level 1 baggage claim or Level 3 garage.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#A88B61]" />,
      title: 'Direct Ship-Front Cruise Valet (Pier 66 & 91)',
      desc: 'We stage directly by the ship gangway porter station, sparing you and your luggage the long walk to distant public rideshare lots.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#A88B61]" />,
      title: '10-Minute Early Curbside Arrival',
      desc: 'Vehicles are staged on-site at least 10 minutes prior to pickup, guaranteeing seamless and relaxed departures for flights and meetings.',
    },
    {
      icon: <Award className="w-6 h-6 text-[#A88B61]" />,
      title: 'Corporate Standing Accounts & NDA Compliance',
      desc: 'Confidential executive mobility across the Eastside tech corridor (Bellevue, Redmond, Seattle) with consolidated monthly master invoicing.',
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#FAF8F4] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase block mb-3">
            The Executive Distinction
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-4">
            Why Discerning Travelers Choose Us
          </h2>
          <div className="w-16 h-[2px] bg-[#C6AD83] mx-auto mb-4" />
          <p className="font-manrope text-[#77736D] text-base leading-relaxed">
            In an era of unpredictable rideshare algorithms, C&amp;C Transportation and Seattle Express Shuttle
            deliver steadfast reliability, certified professional chauffeurs, and quiet luxury.
          </p>
        </div>

        {/* 6 Clean Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-sm border border-[#C6AD83]/20 shadow-xs hover:border-[#C6AD83]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-start"
            >
              <div className="w-12 h-12 rounded-sm bg-[#FAF8F4] border border-[#EAE4D9] flex items-center justify-center mb-6 shrink-0">
                {pillar.icon}
              </div>

              <h3 className="font-cormorant font-bold text-2xl text-[#35434A] mb-3 leading-snug">
                {pillar.title}
              </h3>

              <p className="font-manrope text-sm text-[#77736D] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
