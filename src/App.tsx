import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { Fleet } from './components/Fleet.tsx';
import { BrandStructure } from './components/BrandStructure.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { About } from './components/About.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { LightboxModal, GalleryItem } from './components/LightboxModal.tsx';
import { Phone, MessageSquare } from 'lucide-react';

const FLEET_GALLERY: GalleryItem[] = [
  {
    id: 1,
    src: '/assets/ai/ai_car_kia_ev9.png',
    hdSrc: '/assets/ai/ai_car_kia_ev9.png',
    title: '2026 Kia EV9 (Jet Black) — Confirmed All-Electric Flagship',
  },
  {
    id: 2,
    src: '/fleet/seattle-pier66-escalade.jpg',
    hdSrc: '/fleet/seattle-pier66-escalade.jpg',
    title: 'Seattle Pier 66 Cruise Terminal — Cadillac Escalade ESV',
  },
  {
    id: 3,
    src: '/fleet/seatac-sprinter-delta.png',
    hdSrc: '/fleet/seatac-sprinter-delta.png',
    title: 'Sea-Tac Airport Executive Transfer — Mercedes-Benz Sprinter',
  },
  {
    id: 4,
    src: '/fleet/sprinter-limo-interior.jpg',
    hdSrc: '/fleet/sprinter-limo-interior.jpg',
    title: 'Executive Sprinter Cabin — Diamond-Quilted Leather & Captain Chairs',
  },
  {
    id: 5,
    src: '/fleet/cadillac-escalade-black.jpg',
    hdSrc: '/fleet/cadillac-escalade-black.jpg',
    title: 'Executive Black Car SUV — Cadillac Escalade ESV',
  },
  {
    id: 6,
    src: '/fleet/chevrolet-suburban-seattle.jpg',
    hdSrc: '/fleet/chevrolet-suburban-seattle.jpg',
    title: 'Seattle Downtown & Airport Chauffeur — Chevrolet Suburban',
  },
];

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollToQuoteCard = () => {
    const el = document.getElementById('quote-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#F60102]', 'ring-offset-4', 'transition-all');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#F60102]', 'ring-offset-4');
      }, 2500);
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    window.dispatchEvent(
      new CustomEvent('prefill-quote', {
        detail: {
          service: serviceName,
          trip: serviceName.includes('$30') ? 'Cruise Port Shuttle ($30/person)' : 'One Way Transfer',
          pickup: 'Sea-Tac Airport / Hotel',
          dropoff: serviceName.includes('Cruise') ? 'Seattle Cruise Terminal (Pier 66 / 91)' : 'Downtown Seattle Hotel',
          hours: '2',
          pax: '2',
        },
      })
    );
    scrollToQuoteCard();
  };

  const handleSelectVehicle = (vehicleName: string) => {
    window.dispatchEvent(
      new CustomEvent('prefill-quote', {
        detail: {
          service: `Private Charter — ${vehicleName}`,
          trip: 'Hourly Dedicated Charter',
          pickup: 'Seattle Area Address',
          dropoff: 'Puget Sound Regional Itinerary',
          hours: '3',
          pax: '4',
        },
      })
    );
    scrollToQuoteCard();
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#343434] flex flex-col font-manrope selection:bg-[#F60102] selection:text-white">
      <a
        href="#quote-card"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#F60102] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
      >
        Skip to Instant Quote
      </a>

      {/* 1. NAVIGATION — Official Seattle Express Shuttle Logo & Brand */}
      <Header onBookClick={scrollToQuoteCard} />

      {/* MAIN BODY SECTIONS */}
      <main id="content" className="flex-1">
        {/* 2. HERO SECTION — EXACT HERO LAYOUT WITH KEN BURNS SLIDESHOW & WORKING INSTANT QUOTE CARD */}
        <Hero onQuoteSubmit={() => {}} />

        {/* 3. SERVICES SECTION — Cruise Shuttles ($30), Airport Shuttles, Private Trips, Charters */}
        <Services onSelectService={handleSelectService} />

        {/* 4. BRAND STRUCTURE & OPTIONS */}
        <BrandStructure onSelectOption={handleSelectService} />

        {/* 5. FLEET (Confirmed 2026 Kia EV9 Flagship, Escalades & Sprinters) */}
        <Fleet onSelectVehicle={handleSelectVehicle} />

        {/* 6. WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 7. ABOUT US — Official Seattle Express Shuttle Credentials */}
        <About />

        {/* 8. TESTIMONIALS — 5.0 Google Reviews */}
        <Testimonials />

        {/* 9. FINAL CALL TO ACTION */}
        <FinalCTA onBookClick={scrollToQuoteCard} />
      </main>

      {/* 10. FOOTER — Official Logo, Address, Phone, Email & Cruise Pier Details */}
      <Footer />

      {/* =====================================================================
          FLOATING CONTACT ACTION BUTTONS (Direct Call, SMS & WhatsApp)
      ===================================================================== */}
      <aside aria-label="Quick Contact Actions" className="fixed right-4 bottom-5 z-40 flex flex-col gap-2.5">
        {/* WhatsApp Quick Button */}
        <a
          href="https://wa.me/12065046000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Seattle Express Shuttle"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-108 transition-all cursor-pointer"
          title="WhatsApp: +1 (206) 504-6000"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>

        {/* SMS Quick Button */}
        <a
          href="sms:+12065046000"
          aria-label="Text Seattle Dispatch"
          className="w-12 h-12 rounded-full bg-white text-[#35434A] border border-[#C6AD83] flex items-center justify-center shadow-lg hover:bg-[#FAF8F4] hover:scale-108 transition-all cursor-pointer"
          title="SMS Text Dispatch: (206) 504-6000"
        >
          <MessageSquare className="w-5 h-5 text-[#A88B61]" />
        </a>

        {/* Phone Call Quick Button */}
        <a
          href="tel:+12065046000"
          aria-label="Call 24/7 Seattle Dispatch Hotline"
          className="w-12 h-12 rounded-full bg-[#F60102] text-white border border-white/40 flex items-center justify-center shadow-lg hover:bg-[#d40102] hover:scale-108 transition-all cursor-pointer"
          title="Call Hotline: (206) 504-6000"
        >
          <Phone className="w-5 h-5 text-white fill-current" />
        </a>
      </aside>

      {/* LIGHTBOX MODAL */}
      <LightboxModal
        items={FLEET_GALLERY}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % FLEET_GALLERY.length);
          }
        }}
        onPrev={() => {
          if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + FLEET_GALLERY.length) % FLEET_GALLERY.length);
          }
        }}
      />
    </div>
  );
}
