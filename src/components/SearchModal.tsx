import React, { useState } from 'react';
import { X, Search, Car, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCar?: (carName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCar,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const fleet = [
    { name: 'Range Rover Sport', type: 'SUV', price: '$240/day' },
    { name: 'BMW X5', type: 'SUV', price: '$160/day' },
    { name: 'Mercedes C-Class', type: 'Sedan', price: '$150/day' },
    { name: 'Toyota Camry', type: 'Sedan', price: '$100/day' },
  ];

  const filtered = fleet.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 relative">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FF7100]" />
          <input
            autoFocus
            type="text"
            placeholder="Search by car model (e.g. BMW, Camry, Range Rover) or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-[15px] font-medium text-[#092D5C] outline-none placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  onSelectCar?.(item.name);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EAF5FC] flex items-center justify-center text-[#092D5C]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#092D5C] group-hover:text-[#FF7100] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#64748B]">{item.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#092D5C]">{item.price}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF7100] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-[#64748B]">
              No cars matching "{query}". Try "SUV" or "Sedan".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
