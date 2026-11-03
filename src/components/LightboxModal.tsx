import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export interface GalleryItem {
  id: number;
  src: string;
  hdSrc: string;
  title: string;
  subtitle?: string;
}

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onNext, onPrev]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#273238]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn"
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-white/80 text-xs font-manrope pb-2 border-b border-white/10">
        <div>
          <span className="text-[#C6AD83] font-semibold">
            {currentIndex + 1} of {items.length}
          </span>
          <span className="mx-2">•</span>
          <span>{currentItem.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 hover:text-[#C6AD83] text-white/80 transition-colors cursor-pointer"
            aria-label="Toggle Zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:text-[#C6AD83] text-white/80 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C6AD83] text-white transition-colors flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={currentItem.hdSrc || currentItem.src}
          alt={currentItem.title}
          className={`max-h-[75vh] max-w-[88vw] object-contain rounded-sm transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full bg-black/40 hover:bg-[#C6AD83] text-white transition-colors flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="text-center py-2 text-xs text-white/60 font-manrope">
        C&amp;C Transportation &amp; Seattle Express Shuttle Executive Fleet
      </div>
    </div>
  );
};

