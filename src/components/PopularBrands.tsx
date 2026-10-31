import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ToyotaLogo,
  BmwLogo,
  MercedesLogo,
  LandRoverLogo,
  HondaLogo,
  AudiLogo,
  HyundaiLogo,
} from './BrandLogos.tsx';

interface PopularBrandsProps {
  onBrandClick?: (brandName: string) => void;
  onViewAllBrandsClick?: () => void;
}

export const PopularBrands: React.FC<PopularBrandsProps> = ({
  onBrandClick,
  onViewAllBrandsClick,
}) => {
  const brands = [
    { name: 'Toyota', logo: <ToyotaLogo className="w-10 h-7" /> },
    { name: 'BMW', logo: <BmwLogo className="w-8 h-8" /> },
    { name: 'Mercedes-Benz', logo: <MercedesLogo className="w-8 h-8" /> },
    { name: 'Land Rover', logo: <LandRoverLogo className="w-12 h-6" /> },
    { name: 'Honda', logo: <HondaLogo className="w-8 h-7" /> },
    { name: 'Audi', logo: <AudiLogo className="w-11 h-6" /> },
    { name: 'Hyundai', logo: <HyundaiLogo className="w-10 h-7" /> },
  ];

  return (
    <section id="services" className="py-14 sm:py-18 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092D5C] tracking-tight">
              Popular Brands
            </h2>
            <p className="text-[13.5px] text-[#64748B] font-medium mt-1">
              Choose from the world's most trusted brands.
            </p>
          </div>

          <button
            onClick={onViewAllBrandsClick}
            className="inline-flex items-center gap-1 text-[14px] font-bold text-[#092D5C] hover:text-[#FF7100] transition-colors self-start sm:self-auto cursor-pointer group"
          >
            <span>View All Brands</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 7 Brand Logos in Equally Spaced White Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {brands.map((b) => (
            <button
              key={b.name}
              onClick={() => onBrandClick?.(b.name)}
              className="bg-white rounded-xl border border-gray-100 p-4 py-5 flex flex-col items-center justify-center gap-2.5 shadow-[0_2px_12px_-2px_rgba(9,45,92,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(9,45,92,0.1)] hover:border-gray-200 transition-all duration-200 cursor-pointer group"
            >
              <div className="h-9 flex items-center justify-center text-[#092D5C] group-hover:scale-110 transition-transform duration-200">
                {b.logo}
              </div>
              <span className="text-[12.5px] font-bold text-[#092D5C] group-hover:text-[#FF7100] transition-colors">
                {b.name}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
