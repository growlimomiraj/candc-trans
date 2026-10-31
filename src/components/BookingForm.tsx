import React, { useState } from 'react';
import { MapPin, Calendar, Search, ChevronRight } from 'lucide-react';

interface BookingFormProps {
  onSearch?: (searchParams: { location: string; pickUpDate: string; dropOffDate: string }) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('Dubai, Sharjah');
  const [pickUpDate, setPickUpDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');

  const locations = [
    'Dubai, Sharjah',
    'Dubai International Airport (DXB)',
    'Downtown Dubai & Burj Khalifa',
    'Dubai Marina & JBR',
    'Sharjah City Center',
    'Abu Dhabi International Airport'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({ location, pickUpDate, dropOffDate });
    const carsSection = document.getElementById('cars');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-30 max-w-6xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(9,45,92,0.14)] border border-gray-100 p-3 sm:p-3.5 lg:p-4"
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 lg:gap-4">
          
          {/* Field 1: Pick-up Location */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50/70 transition-colors">
            <div className="w-9 h-9 rounded-full bg-[#EAF5FC] flex items-center justify-center flex-shrink-0 text-[#092D5C]">
              <MapPin className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Pick-up Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-[#092D5C] font-bold text-[14px] focus:outline-none cursor-pointer truncate"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Separator Chevron */}
          <div className="hidden md:flex items-center text-gray-300">
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Field 2: Pick-up Date */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50/70 transition-colors relative">
            <div className="w-9 h-9 rounded-full bg-[#EAF5FC] flex items-center justify-center flex-shrink-0 text-[#092D5C]">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Pick-up Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full bg-transparent text-[#092D5C] font-semibold text-[14px] focus:outline-none cursor-pointer"
                />
                {!pickUpDate && (
                  <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#092D5C]/75 font-semibold text-[14px] bg-white pr-4">
                    Select Date
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Separator Chevron */}
          <div className="hidden md:flex items-center text-gray-300">
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Field 3: Drop-off Date */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50/70 transition-colors relative">
            <div className="w-9 h-9 rounded-full bg-[#EAF5FC] flex items-center justify-center flex-shrink-0 text-[#092D5C]">
              <Calendar className="w-4 h-4 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Drop-off Date
              </label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  className="w-full bg-transparent text-[#092D5C] font-semibold text-[14px] focus:outline-none cursor-pointer"
                />
                {!dropOffDate && (
                  <span className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-[#092D5C]/75 font-semibold text-[14px] bg-white pr-4">
                    Select Date
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Separator Chevron */}
          <div className="hidden md:flex items-center text-gray-300">
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Search Button */}
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#FF7100] hover:bg-[#E66500] text-white font-bold text-[14px] px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search Cars</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
