import React, { useState } from 'react';
import { X, CheckCircle, Car } from 'lucide-react';
import { CarItem } from './FeaturedCars.tsx';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar?: CarItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('AeroRide (Fixed Airport / City Transfer)');
  const [location, setLocation] = useState('Airport Transfer (Fixed Rate)');
  const [pickUpDate, setPickUpDate] = useState('2026-11-01');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const defaultCar: CarItem = {
    id: 'kia-ev9',
    name: '2026 Kia EV9 (All-Electric)',
    category: 'AeroRide & Executive Flagship',
    seats: '6 Seats',
    price: 95,
    rateUnit: '/trip',
    image: '/assets/ai/ai_car_kia_ev9.png',
  };

  const currentCar = selectedCar || defaultCar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#092D5C]">
              Reservation Request Received!
            </h3>
            <p className="text-[#64748B] text-sm max-w-xs">
              Thank you, {name || 'Valued Client'}. C&C Transportation 24/7 dispatch will confirm your {currentCar.name} booking shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#FFF4EA] flex items-center justify-center text-[#FF7100]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#092D5C]">
                  Reserve {currentCar.name}
                </h3>
                <p className="text-xs text-[#64748B] font-medium">
                  {currentCar.category} • ${currentCar.price}{currentCar.rateUnit} • Jet Black Fleet
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#092D5C] mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Robert Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#FF7100] focus:ring-1 focus:ring-[#FF7100] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#092D5C] mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#FF7100] focus:ring-1 focus:ring-[#FF7100] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#092D5C] mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="client@executive.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#FF7100] focus:ring-1 focus:ring-[#FF7100] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092D5C] mb-1">
                  Service Tier
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#FF7100] focus:ring-1 focus:ring-[#FF7100] outline-none cursor-pointer"
                >
                  <option value="AeroRide (Fixed Airport / City Transfer)">AeroRide (Fixed Cheap Airport / City Transfer)</option>
                  <option value="C&C Executive (High-Value Hourly Chauffeur)">C&C Executive (High-Value Hourly Chauffeur)</option>
                  <option value="Executive Business Meeting / Event">Executive Business Meeting / Event</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#092D5C] mb-1">
                  Pick-up Date & Time
                </label>
                <input
                  required
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#FF7100] outline-none"
                />
              </div>
            </div>

            {/* Total Estimate & Submit */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#64748B]">Starting Rate</span>
                <div className="text-xl font-black text-[#092D5C]">
                  ${currentCar.price} <span className="text-xs font-normal text-gray-500">{currentCar.rateUnit}</span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#FF7100] hover:bg-[#E66500] text-white font-bold text-sm px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Confirm Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
