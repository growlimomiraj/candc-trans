import React from 'react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-700">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Mockup / Embed */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <img
            src="/assets/hd_why_choose_us_full.png"
            alt="AnticorCar Experience"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
            <div className="w-16 h-16 rounded-full bg-[#FF7100] text-white flex items-center justify-center shadow-2xl mb-4 animate-pulse">
              <Play className="w-7 h-7 fill-current ml-1" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Why Choose AnticorCar?
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              Discover why thousands of clients trust AnticorCar.com across Dubai, Sharjah, and the UAE for premium chauffeur, exotic rentals, and executive fleet services.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
