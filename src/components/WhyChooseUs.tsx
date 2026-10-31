import React from 'react';
import { Car, ShieldCheck, MapPin, Headphones } from 'lucide-react';

interface WhyChooseUsProps {
  onPlayClick?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onPlayClick }) => {
  const benefits = [
    {
      icon: <Car className="w-5 h-5 stroke-[2] text-[#FF7100]" />,
      title: 'Premium Fleet',
      desc: 'Luxury to Economy',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 stroke-[2] text-[#FF7100]" />,
      title: 'Fully Insured',
      desc: 'Travel with Confidence',
    },
    {
      icon: <MapPin className="w-5 h-5 stroke-[2] text-[#FF7100]" />,
      title: 'Flexible Locations',
      desc: 'Dubai and Beyond',
    },
    {
      icon: <Headphones className="w-5 h-5 stroke-[2] text-[#FF7100]" />,
      title: '24/7 Support',
      desc: 'Anytime, Anywhere',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Slanted Cinematic Driving Photo */}
          <div className="lg:col-span-6 relative">
            <div
              onClick={onPlayClick}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            >
              {/* Slanted Container */}
              <div className="slant-right-edge relative aspect-[1.12/1] w-full overflow-hidden bg-slate-900">
                <img
                  src="/assets/hd_clean_why_choose_us.png"
                  alt="Why Choose AnticorCar? Driver on tropical coastal road"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Text & 4 Benefits in 2-column Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Small Orange Tag */}
            <span className="text-xs sm:text-[13px] font-bold text-[#FF7100] tracking-wider uppercase">
              - Why Choose Us
            </span>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#092D5C] tracking-tight leading-[1.15]">
              <span className="block">More Than Just</span>
              <span className="block">a Car Rental</span>
            </h2>

            {/* Description */}
            <p className="text-[#64748B] text-base leading-relaxed">
              At AnticorCar.com, we make your journey smoother, safer, and more enjoyable. Whether you're here for business or leisure, we've got the perfect ride for you.
            </p>

            {/* 4 Benefits in 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-[#FFF4EA] border border-[#FFE2CC] flex items-center justify-center flex-shrink-0 shadow-xs">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#092D5C] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[12.5px] text-[#64748B] font-medium leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
