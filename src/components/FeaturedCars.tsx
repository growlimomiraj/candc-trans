import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface CarItem {
  id: string;
  name: string;
  category: string;
  seats: string;
  price: number;
  rateUnit: string;
  tag?: string;
  image: string;
}

interface FeaturedCarsProps {
  onRentClick?: (car: CarItem) => void;
  onViewAllClick?: () => void;
}

export const FeaturedCars: React.FC<FeaturedCarsProps> = ({ onRentClick, onViewAllClick }) => {
  const cars: CarItem[] = [
    {
      id: 'kia-ev9',
      name: '2026 Kia EV9 (Electric)',
      category: 'All-Electric Flagship • Jet Black',
      seats: '6 Seats',
      price: 95,
      rateUnit: '/trip',
      tag: 'AeroRide Fixed Rate',
      image: '/assets/ai/ai_car_kia_ev9.png',
    },
    {
      id: 'cadillac-escalade',
      name: 'Cadillac Escalade ESV',
      category: 'Executive Luxury SUV • Jet Black',
      seats: '7 Seats',
      price: 180,
      rateUnit: '/hr',
      tag: 'C&C Executive',
      image: '/assets/ai/ai_car_black_escalade.png',
    },
    {
      id: 'bmw-i7',
      name: 'BMW 7-Series / i7',
      category: 'Chauffeur Executive • Jet Black',
      seats: '5 Seats',
      price: 150,
      rateUnit: '/hr',
      tag: 'C&C Executive',
      image: '/assets/ai/ai_car_black_bmw.png',
    },
    {
      id: 'rangerover-lucid',
      name: 'Range Rover Sport / Lucid',
      category: 'Ultra-Luxury VIP • Jet Black',
      seats: '5 Seats',
      price: 160,
      rateUnit: '/hr',
      tag: 'C&C Executive',
      image: '/assets/ai/ai_car_rangerover_sport.png',
    },
  ];

  return (
    <section id="cars" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092D5C] tracking-tight">
              Explore Our All-Black Executive & AeroRide Fleet
            </h2>
            
            {/* Orange decorative underline */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="w-9 h-[3.5px] bg-[#FF7100] rounded-full inline-block" />
              <span className="w-3.5 h-[3.5px] bg-[#FF7100] rounded-full inline-block" />
            </div>
          </div>

          <button
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1 text-[14px] font-bold text-[#092D5C] hover:text-[#FF7100] transition-colors self-start sm:self-auto cursor-pointer group"
          >
            <span>View All Fleet</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(9,45,92,0.06)] hover:shadow-[0_12px_30px_-6px_rgba(9,45,92,0.12)] transition-all duration-300 p-3.5 flex flex-col group"
            >
              {/* Vehicle Photograph Container */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-900 mb-3.5 relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Service Tier Pill Badge */}
                {car.tag && (
                  <div className="absolute top-2.5 left-2.5 bg-[#092D5C]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider">
                    {car.tag}
                  </div>
                )}
              </div>

              {/* Vehicle Information */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-[16px] font-extrabold text-[#092D5C] tracking-tight group-hover:text-[#FF7100] transition-colors">
                  {car.name}
                </h3>
                
                <p className="text-[12.5px] text-[#64748B] font-medium mt-0.5">
                  {car.category}, {car.seats}
                </p>

                {/* Price and Book Button Row */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-[18px] font-black text-[#092D5C]">
                      ${car.price}
                    </span>
                    <span className="text-[12.5px] font-medium text-[#64748B] ml-0.5">
                      {car.rateUnit}
                    </span>
                  </div>

                  <button
                    onClick={() => onRentClick?.(car)}
                    className="border border-[#FF7100] text-[#FF7100] hover:bg-[#FF7100] hover:text-white px-3.5 py-1 rounded-full text-[12.5px] font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:shadow"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
