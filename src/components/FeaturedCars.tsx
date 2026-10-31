import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface CarItem {
  id: string;
  name: string;
  category: string;
  seats: string;
  price: number;
  image: string;
  fallbackImage: string;
}

interface FeaturedCarsProps {
  onRentClick?: (car: CarItem) => void;
  onViewAllClick?: () => void;
}

export const FeaturedCars: React.FC<FeaturedCarsProps> = ({ onRentClick, onViewAllClick }) => {
  const cars: CarItem[] = [
    {
      id: 'camry',
      name: 'Toyota Camry',
      category: 'Sedan',
      seats: '5 Seats',
      price: 100,
      image: '/assets/ai/ai_car_camry.png',
      fallbackImage: '/assets/hd_clean_car_camry.png',
    },
    {
      id: 'bmw-x5',
      name: 'BMW X5',
      category: 'SUV',
      seats: '5 Seats',
      price: 160,
      image: '/assets/ai/ai_car_bmw_x5.png',
      fallbackImage: '/assets/hd_clean_car_bmw_x5.png',
    },
    {
      id: 'mercedes-c',
      name: 'Mercedes C-Class',
      category: 'Sedan',
      seats: '5 Seats',
      price: 150,
      image: '/assets/ai/ai_car_mercedes_c.png',
      fallbackImage: '/assets/hd_clean_car_mercedes.png',
    },
    {
      id: 'rangerover-sport',
      name: 'Range Rover Sport',
      category: 'SUV',
      seats: '5 Seats',
      price: 240,
      image: '/assets/ai/ai_car_rangerover_sport.png',
      fallbackImage: '/assets/hd_clean_car_rangerover.png',
    },
  ];

  return (
    <section id="cars" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092D5C] tracking-tight">
              Explore Our Featured Cars
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
            <span>View All Cars</span>
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
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 mb-3.5 relative">
                <img
                  src={car.image}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + car.fallbackImage) {
                      target.src = car.fallbackImage;
                    }
                  }}
                  alt={car.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Vehicle Information */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-[16px] font-extrabold text-[#092D5C] tracking-tight group-hover:text-[#FF7100] transition-colors">
                  {car.name}
                </h3>
                
                <p className="text-[12.5px] text-[#64748B] font-medium mt-0.5">
                  {car.category}, {car.seats}
                </p>

                {/* Price and Rent Button Row */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-baseline">
                    <span className="text-[18px] font-black text-[#092D5C]">
                      ${car.price}
                    </span>
                    <span className="text-[12.5px] font-medium text-[#64748B] ml-0.5">
                      /day
                    </span>
                  </div>

                  <button
                    onClick={() => onRentClick?.(car)}
                    className="border border-[#FF7100] text-[#FF7100] hover:bg-[#FF7100] hover:text-white px-3.5 py-1 rounded-full text-[12.5px] font-semibold transition-all duration-200 cursor-pointer shadow-2xs hover:shadow"
                  >
                    Rent
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
