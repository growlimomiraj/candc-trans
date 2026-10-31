import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { BookingForm } from './components/BookingForm.tsx';
import { FeaturedCars, CarItem } from './components/FeaturedCars.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { PopularBrands } from './components/PopularBrands.tsx';
import { SpecialOffer } from './components/SpecialOffer.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Footer } from './components/Footer.tsx';
import { BookingModal } from './components/BookingModal.tsx';
import { VideoModal } from './components/VideoModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleBookCar = (car?: CarItem) => {
    if (car) {
      setSelectedCar(car);
    } else {
      setSelectedCar(null);
    }
    setIsBookingOpen(true);
  };

  const handleSearchSubmit = (params: { location: string; pickUpDate: string; dropOffDate: string }) => {
    showToast(`Searching available fleet in ${params.location}...`);
  };

  const handleBrandClick = (brandName: string) => {
    showToast(`Filtered by brand: ${brandName}`);
    const carsSection = document.getElementById('cars');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1E293B] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#092D5C] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF7100]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1 — HEADER */}
      <Header
        onBookClick={() => handleBookCar()}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION 2 — HERO SECTION */}
        <Hero />

        {/* SECTION 3 — CAR BOOKING SEARCH BAR */}
        <BookingForm onSearch={handleSearchSubmit} />

        {/* SECTION 4 — FEATURED CARS */}
        <FeaturedCars
          onRentClick={(car) => handleBookCar(car)}
          onViewAllClick={() => showToast('Showing all 24 available luxury vehicles')}
        />

        {/* SECTION 5 — WHY CHOOSE US */}
        <WhyChooseUs onPlayClick={() => setIsVideoOpen(true)} />

        {/* SECTION 6 — POPULAR BRANDS */}
        <PopularBrands
          onBrandClick={handleBrandClick}
          onViewAllBrandsClick={() => showToast('Showing all verified manufacturer partners')}
        />

        {/* SECTION 7 — SPECIAL OFFER BANNER */}
        <SpecialOffer onBookNowClick={() => handleBookCar()} />

        {/* SECTION 8 — CUSTOMER TESTIMONIALS */}
        <Testimonials
          onViewAllReviewsClick={() => showToast('Showing all 340+ customer reviews')}
        />

        {/* SECTION 9 — FINAL CTA AND CONTACT INFORMATION */}
        <Footer onBookNowClick={() => handleBookCar()} />
      </main>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedCar={selectedCar}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCar={(carName) => {
          showToast(`Selected ${carName}`);
          handleBookCar();
        }}
      />
    </div>
  );
};

export default App;
