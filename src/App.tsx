import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  hdSrc: string;
  fallbackSrc: string;
  width: number;
  height: number;
  title: string;
}

const ORIGIN_2025_02 = 'https://bottlebuschicago.com/wp-content/uploads/2025/02';
const ORIGIN_2025_04 = 'https://bottlebuschicago.com/wp-content/uploads/2025/04';

const cdnUrl = (rawUrl: string, width: number, quality = 82) =>
  `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=${width}&q=${quality}&output=webp`;

const HERO_RAW_IMAGES = [
  `${ORIGIN_2025_02}/rsw-1024h-770cg-true.png`,
  `${ORIGIN_2025_02}/rsw-2304h-1732cg-truem.png`,
  `${ORIGIN_2025_02}/rsw-1200cg-truem.png`,
  `${ORIGIN_2025_02}/rsw-1200h-1200cg-true.webp`
];

const HERO_SLIDESHOW_IMAGES = HERO_RAW_IMAGES.map((raw) => ({
  src: cdnUrl(raw, 1600, 86),
  fallbackSrc: raw
}));

const RAW_GALLERY_DEFS: Array<{ id: number; file: string; width: number; height: number; title: string }> = [
  { id: 1, file: 'rsw-2480h-3307cg-truem.png', width: 720, height: 960, title: 'Seattle Express Shuttle Fleet 1' },
  { id: 2, file: 'IMG_2687.webp', width: 960, height: 720, title: 'Seattle Express Shuttle Fleet 2' },
  { id: 3, file: 'IMG_7070.webp', width: 960, height: 960, title: 'Seattle Express Shuttle Fleet 3' },
  { id: 4, file: 'rsw-1024h-770cg-true.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 4' },
  { id: 5, file: 'rsw-1024h-512cg-true.png', width: 960, height: 480, title: 'Seattle Express Shuttle Fleet 5' },
  { id: 6, file: 'rsw-1024h-512cg-truem.png', width: 960, height: 480, title: 'Seattle Express Shuttle Fleet 6' },
  { id: 7, file: 'rsw-1200h-1200cg-truem.png', width: 960, height: 960, title: 'Seattle Express Shuttle Fleet 7' },
  { id: 8, file: 'rsw-1200h-1600cg-true.png', width: 720, height: 960, title: 'Seattle Express Shuttle Fleet 8' },
  { id: 9, file: 'rsw-1200cg-truem.png', width: 960, height: 638, title: 'Seattle Express Shuttle Fleet 9' },
  { id: 10, file: 'rsw-1200h-902cg-true-2.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 10' },
  { id: 11, file: 'rsw-1200h-902cg-true-3.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 11' },
  { id: 12, file: 'rsw-2048h-1540cg-true.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 12' },
  { id: 13, file: 'rsw-1440cg-true.png', width: 960, height: 960, title: 'Seattle Express Shuttle Fleet 13' },
  { id: 14, file: 'rsw-1200h-902cg-true.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 14' },
  { id: 15, file: 'rsw-2304h-1732cg-truem-2.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 15' },
  { id: 16, file: 'rsw-2304h-1732cg-truem.png', width: 960, height: 722, title: 'Seattle Express Shuttle Fleet 16' },
  { id: 17, file: 'rsw-2480h-1240cg-true.png', width: 960, height: 480, title: 'Seattle Express Shuttle Fleet 17' },
  { id: 18, file: 'rsw-834h-834cg-true.png', width: 834, height: 834, title: 'Seattle Express Shuttle Fleet 18' },
  { id: 19, file: 'rsw-776h-776cg-true-2.png', width: 776, height: 775, title: 'Seattle Express Shuttle Fleet 19' },
  { id: 20, file: 'rsw-768h-577cg-true.png', width: 768, height: 577, title: 'Seattle Express Shuttle Fleet 20' },
  { id: 21, file: 'rsw-776h-776cg-true.png', width: 776, height: 776, title: 'Seattle Express Shuttle Fleet 21' },
  { id: 22, file: 'rsw-1200h-1200cg-true.webp', width: 960, height: 960, title: 'Seattle Express Shuttle Fleet 22' }
];

const GALLERY_ITEMS: GalleryItem[] = RAW_GALLERY_DEFS.map((item) => {
  const raw = `${ORIGIN_2025_02}/${item.file}`;
  return {
    id: item.id,
    src: cdnUrl(raw, 800, 80),
    hdSrc: cdnUrl(raw, 1600, 85),
    fallbackSrc: raw,
    width: item.width,
    height: item.height,
    title: item.title
  };
});

const MASONRY_COLUMNS: GalleryItem[][] = [
  [GALLERY_ITEMS[0], GALLERY_ITEMS[4], GALLERY_ITEMS[8], GALLERY_ITEMS[12], GALLERY_ITEMS[16], GALLERY_ITEMS[20]],
  [GALLERY_ITEMS[1], GALLERY_ITEMS[5], GALLERY_ITEMS[9], GALLERY_ITEMS[13], GALLERY_ITEMS[17], GALLERY_ITEMS[21]],
  [GALLERY_ITEMS[2], GALLERY_ITEMS[6], GALLERY_ITEMS[10], GALLERY_ITEMS[14], GALLERY_ITEMS[18]],
  [GALLERY_ITEMS[3], GALLERY_ITEMS[7], GALLERY_ITEMS[11], GALLERY_ITEMS[15], GALLERY_ITEMS[19]]
];

interface SubmittedQuoteData {
  referenceCode: string;
  name: string;
  phone: string;
  email: string;
  passengers: string;
  date: string;
  serviceType: string;
  dayOfWeek: string;
  bookingHours: string;
  pickupTime: string;
  tripType: string;
  pickupLocation: string;
  dropoffLocation: string;
  canText: string;
  estimatedRate: number;
  depositAmount: number;
}

/**
 * Seattle Express Shuttle Official Logo
 */
const SeattleExpressLogo: React.FC<{ size?: 'header' | 'footer' }> = ({ size = 'header' }) => {
  const isFooter = size === 'footer';
  return (
    <div className="inline-flex items-center justify-center select-none py-1">
      <img
        src="/logo.png"
        alt="Seattle Express Shuttle"
        width={500}
        height={167}
        fetchPriority={isFooter ? 'auto' : 'high'}
        decoding="async"
        className={`w-auto object-contain rounded-[6px] shadow-sm transition-transform duration-200 hover:scale-[1.02] ${
          isFooter ? 'h-[52px] md:h-[68px]' : 'h-[46px] md:h-[58px]'
        }`}
        onError={(e) => {
          if (e.currentTarget.src !== 'https://seattleexpressshuttle.com/wp-content/uploads/2026/10/seattle-express-shuttle-logo-2026.webp') {
            e.currentTarget.src = 'https://seattleexpressshuttle.com/wp-content/uploads/2026/10/seattle-express-shuttle-logo-2026.webp';
          }
        }}
      />
    </div>
  );
};

export default function App() {
  // Hero background Ken Burns slideshow index (tracks active and previous slide for seamless zoom during crossfade)
  const [slideState, setSlideState] = useState<{ current: number; prev: number | null }>({
    current: 0,
    prev: null
  });

  // Animated Google review counter (0 -> 378 over 2000ms)
  const [reviewCount, setReviewCount] = useState<number>(0);

  // Instant Online Quote Form State
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passengers, setPassengers] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [dayOfWeek, setDayOfWeek] = useState<string>('Monday');
  const [bookingHours, setBookingHours] = useState<string>('');
  const [pickupHour, setPickupHour] = useState<string>('');
  const [pickupMinute, setPickupMinute] = useState<string>('');
  const [pickupAmPm, setPickupAmPm] = useState<string>('PM');
  const [tripType, setTripType] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');
  const [canText, setCanText] = useState<string>('Yes');

  const [formError, setFormError] = useState<string>('');
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuoteData | null>(null);

  // Lightbox Slideshow State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Hero slideshow interval (2000ms slide duration + 1500ms crossfade = 3500ms cycle)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideState((s) => ({
        prev: s.current,
        current: (s.current + 1) % HERO_SLIDESHOW_IMAGES.length
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Counter animation from 0 to 378
  useEffect(() => {
    const duration = 2000;
    const target = 378;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setReviewCount(Math.floor(progress * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Lightbox keyboard navigation
  const handlePrevImage = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const handleNextImage = useCallback(() => {
    setIsZoomed(false);
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, handlePrevImage, handleNextImage]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !passengers.trim() ||
      !date.trim() ||
      !serviceType.trim() ||
      !bookingHours.trim() ||
      !pickupHour.trim() ||
      !tripType.trim() ||
      !pickupLocation.trim() ||
      !dropoffLocation.trim()
    ) {
      setFormError('Please fill in all required fields to generate your instant online quote.');
      return;
    }

    const paxNum = Math.max(1, parseInt(passengers, 10) || 12);
    const hrsNum = Math.max(2, parseInt(bookingHours, 10) || 4);
    const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayOfWeek);
    const baseHourly =
      paxNum > 24
        ? isWeekend
          ? 310
          : 255
        : paxNum > 14
        ? isWeekend
          ? 255
          : 210
        : paxNum > 6
        ? isWeekend
          ? 190
          : 160
        : isWeekend
        ? 130
        : 110;
    const estimatedRate = baseHourly * hrsNum;
    const depositAmount = Math.round(estimatedRate * 0.25);

    const formattedMin = (pickupMinute.trim() || '00').padStart(2, '0');
    const quoteRecord: SubmittedQuoteData = {
      referenceCode: `SES-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      passengers: passengers.trim(),
      date: date.trim(),
      serviceType: serviceType.trim(),
      dayOfWeek,
      bookingHours: bookingHours.trim(),
      pickupTime: `${pickupHour.trim()}:${formattedMin} ${pickupAmPm}`,
      tripType: tripType.trim(),
      pickupLocation: pickupLocation.trim(),
      dropoffLocation: dropoffLocation.trim(),
      canText,
      estimatedRate,
      depositAmount
    };

    setSubmittedQuote(quoteRecord);
  };

  return (
    <div id="top" className="min-h-screen bg-[#101010] text-white flex flex-col selection:bg-[#F60102] selection:text-white">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[#F60102] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      {/* =====================================================================
          HEADER — Seattle Express Shuttle
      ===================================================================== */}
      <header className="w-full bg-white border-b border-gray-200 shadow-xs sticky top-0 z-40">
        <div className="max-w-[1140px] mx-auto px-[20px] py-[12px] flex flex-col md:flex-row items-center justify-between gap-[15px] md:gap-0">
          {/* Left: Seattle Express Shuttle Logo */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-start items-center">
            <a href="#top" aria-label="Seattle Express Shuttle Home" className="inline-block">
              <SeattleExpressLogo size="header" />
            </a>
          </div>

          {/* Right: Call & Email Buttons */}
          <div className="w-full md:w-[60%] flex flex-col sm:flex-row justify-center md:justify-end items-center gap-[10px]">
            <a
              href="tel:+12065046000"
              className="w-full sm:w-auto text-center bg-[#F60102] hover:bg-[#d40102] text-white font-montserrat text-[14px] md:text-[16px] font-bold leading-none px-[20px] py-[12px] rounded-[4px] shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <svg aria-hidden="true" className="w-[16px] h-[16px] fill-current shrink-0" viewBox="0 0 512 512">
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
              <span>+1 (206) 504-6000</span>
            </a>
            <a
              href="mailto:info@seattleexpressshuttle.com"
              className="w-full sm:w-auto text-center bg-[#101010] hover:bg-[#252525] text-white font-montserrat text-[14px] md:text-[16px] font-bold leading-none px-[20px] py-[12px] rounded-[4px] shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <svg aria-hidden="true" className="w-[16px] h-[16px] fill-current shrink-0" viewBox="0 0 512 512">
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
              </svg>
              <span>info@seattleexpressshuttle.com</span>
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN CONTENT
      ===================================================================== */}
      <main id="content" className="flex-1">
        {/* -------------------------------------------------------------------
            SECTION 1: HERO SLIDESHOW + LEFT BRANDING + RIGHT WHITE QUOTE CARD
        ------------------------------------------------------------------- */}
        <section className="relative min-h-[700px] flex items-center justify-center py-[40px] md:py-[20px] px-[20px] overflow-hidden">
          {/* Hardware-Accelerated Continuous Ken Burns Background Slideshow */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {HERO_SLIDESHOW_IMAGES.map((slide, idx) => {
              const isActive = idx === slideState.current;
              const isPrev = idx === slideState.prev;
              const stateClass = isActive
                ? 'bbc-hero-slide--active'
                : isPrev
                ? 'bbc-hero-slide--prev'
                : '';
              return (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt=""
                  decoding="async"
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  onError={(e) => {
                    if (e.currentTarget.src !== slide.fallbackSrc) {
                      e.currentTarget.src = slide.fallbackSrc;
                    }
                  }}
                  className={`bbc-hero-slide ${stateClass}`}
                />
              );
            })}
            <div className="absolute inset-0 z-[3] bg-black/32" />
          </div>

          {/* Inner Boxed Container (max-w-1140px) */}
          <div className="relative z-10 w-full max-w-[1140px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[30px] lg:gap-[20px]">
            {/* Left Column */}
            <div className="w-full lg:w-[48%] flex flex-col items-start justify-center space-y-[16px] md:space-y-[20px]">
              {/* Google Reviews Badge */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Seattle+Express+Shuttle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-[85%] bg-[#FFFFFF36] border border-[#FFFFFF54] rounded-[3px] px-[8px] py-[5px] flex flex-wrap items-center justify-center gap-[8px] md:gap-[10px] hover:bg-[#FFFFFF48] transition-colors"
              >
                <span className="font-montserrat text-[12px] md:text-[20px] font-normal text-white leading-[22px]">
                  5.0 stars
                </span>

                {/* 5 Gold Stars */}
                <div className="flex items-center gap-[2px]" aria-label="Rated 5 out of 5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      aria-hidden="true"
                      className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] fill-[#F0AD4E]"
                      viewBox="0 0 1000 1000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z" />
                    </svg>
                  ))}
                </div>

                {/* Animated 378 Counter */}
                <span className="font-montserrat text-[14px] md:text-[20px] font-medium text-white">
                  {reviewCount}
                </span>

                <span className="font-montserrat text-[12px] md:text-[20px] font-normal text-white leading-[22px]">
                  Reviews On
                </span>

                {/* Google Icon SVG */}
                <div className="inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <rect x="0.746094" y="0.309082" width="32" height="32" rx="4" fill="#F8F8F8" />
                    <path
                      d="M27.3061 16.5591C27.3061 15.7791 27.2361 15.0291 27.1061 14.3091H16.7461V18.5691H22.6661C22.4061 19.9391 21.6261 21.0991 20.4561 21.8791V24.6491H24.0261C26.1061 22.7291 27.3061 19.9091 27.3061 16.5591Z"
                      fill="#6D96FF"
                    />
                    <path
                      d="M16.7458 27.3092C19.7158 27.3092 22.2058 26.3292 24.0258 24.6492L20.4558 21.8792C19.4758 22.5392 18.2258 22.9392 16.7458 22.9392C13.8858 22.9392 11.4558 21.0092 10.5858 18.4092H6.92578V21.2492C8.73578 24.8392 12.4458 27.3092 16.7458 27.3092Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.5861 18.3989C10.3661 17.7389 10.2361 17.0389 10.2361 16.3089C10.2361 15.5789 10.3661 14.8789 10.5861 14.2189V11.3789H6.92606C6.17606 12.8589 5.74606 14.5289 5.74606 16.3089C5.74606 18.0889 6.17606 19.7589 6.92606 21.2389L9.77606 19.0189L10.5861 18.3989Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M16.7458 9.67914C18.3658 9.67914 19.8158 10.2391 20.9558 11.3291L24.1058 8.17914C22.2058 6.39914 19.7158 5.30914 16.7458 5.30914C12.4458 5.30914 8.73578 7.77914 6.92578 11.3691L10.5858 14.2091C11.4558 11.6091 13.8858 9.67914 16.7458 9.67914Z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
              </a>

              {/* 40th Anniversary NLA Badge Image */}
              <div>
                <img
                  src={`${ORIGIN_2025_04}/40th-Anniversary-NLA-TransparentBlack-1-scaled-1-300x102.webp`}
                  alt="National Limousine Association"
                  decoding="async"
                  className="w-[150px] md:w-[200px] h-auto object-contain"
                />
              </div>

              {/* LUXURY TRANSPORTATION Heading */}
              <h1 className="font-playfair text-[32px] md:text-[54px] font-extrabold text-white leading-[1.15] tracking-normal">
                LUXURY TRANSPORTATION
              </h1>

              {/* Vehicle Category Check List */}
              <ul className="space-y-[3px]">
                {['Cruise Shuttles', 'Limo Sprinters', 'Executive', 'Shuttle', 'SUVs'].map((item) => (
                  <li key={item} className="flex items-center gap-[10px]">
                    <span className="inline-flex items-center justify-center shrink-0">
                      <svg
                        aria-hidden="true"
                        className="w-[16px] h-[16px] md:w-[20px] md:h-[20px] fill-[#00C000]"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
                      </svg>
                    </span>
                    <span className="font-poppins text-[16px] md:text-[20px] font-normal text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* No Hidden Fee */}
              <h2 className="font-montserrat text-[16px] md:text-[22px] font-semibold uppercase text-white">
                No Hidden Fee
              </h2>
            </div>

            {/* Right Column: Instant Online Quote Box (White Card) */}
            <div className="w-full lg:w-[50%] bg-white text-[#111111] border border-gray-200 shadow-2xl rounded-[12px] p-[20px] md:p-[40px]">
              <h2 className="font-playfair text-[19px] md:text-[26px] font-bold uppercase text-center text-[#111111] mb-[20px]">
                Instant Online Quote
              </h2>

              {submittedQuote ? (
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-[8px] p-[20px] space-y-[14px] font-poppins text-[#111111]">
                  <div className="flex items-center gap-2 text-[#009900] font-semibold text-[16px]">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Instant Quote Generated ({submittedQuote.referenceCode})</span>
                  </div>

                  <p className="text-[13px] text-gray-700 leading-relaxed">
                    Thank you, <strong className="text-[#111111]">{submittedQuote.name}</strong>! Here is your Seattle Express Shuttle instant quote estimate for your{' '}
                    <strong className="text-[#111111]">{submittedQuote.serviceType}</strong> ({submittedQuote.tripType}) on{' '}
                    <strong className="text-[#111111]">{submittedQuote.date}</strong> ({submittedQuote.dayOfWeek}) at{' '}
                    <strong className="text-[#111111]">{submittedQuote.pickupTime}</strong>:
                  </p>

                  <div className="bg-white border border-gray-200 rounded-[6px] p-[14px] space-y-[8px] text-[13px]">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers &amp; Hours:</span>
                      <span className="font-semibold text-[#111111]">
                        {submittedQuote.passengers} Guests · {submittedQuote.bookingHours} Hours
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route:</span>
                      <span className="text-[#111111] text-right">
                        {submittedQuote.pickupLocation} → {submittedQuote.dropoffLocation}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 text-[15px]">
                      <span className="font-semibold text-[#111111]">Estimated All-In Charter Quote:</span>
                      <span className="font-bold text-[#009900]">${submittedQuote.estimatedRate}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-gray-600">Deposit to Confirm Reservation:</span>
                      <span className="font-semibold text-[#F60102]">${submittedQuote.depositAmount}</span>
                    </div>
                  </div>

                  <p className="text-[12px] text-gray-600">
                    We have logged your quote details for <strong className="text-[#111111]">{submittedQuote.phone}</strong> and{' '}
                    <strong className="text-[#111111]">{submittedQuote.email}</strong>. For immediate confirmation, please text or call at <a href="tel:+12065046000" className="text-[#F60102] font-semibold underline">+1 (206) 504-6000</a>
                    .
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`sms:+12065046000?body=${encodeURIComponent(`Hi Seattle Express Shuttle, my quote ref is ${submittedQuote.referenceCode} for ${submittedQuote.passengers} passengers on ${submittedQuote.date} (${submittedQuote.bookingHours} hrs).`
                      )}`}
                      className="flex-1 text-center bg-[#F60102] hover:bg-[#d40102] text-white font-orbitron text-[13px] font-medium py-[10px] px-[16px] rounded-[4px] transition-colors"
                    >
                      Text: +1 (206) 504-6000
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedQuote(null)}
                      className="bg-gray-200 hover:bg-gray-300 text-[#111111] font-poppins text-[13px] font-medium py-[10px] px-[16px] rounded-[4px] transition-colors cursor-pointer"
                    >
                      New Quote
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-[16px]" noValidate>
                  {/* Row 1: Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="input_1_5" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Name
                      </label>
                      <input
                        id="input_1_5"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="input_1_3" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Phone
                      </label>
                      <input
                        id="input_1_3"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & No Of Passengers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="input_1_7" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Email
                      </label>
                      <input
                        id="input_1_7"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="input_1_8" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        No Of Passengers
                      </label>
                      <input
                        id="input_1_8"
                        type="number"
                        min={1}
                        required
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                  </div>

                  {/* Row 3: Date & Type of Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="input_1_9" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Date
                      </label>
                      <input
                        id="input_1_9"
                        type="text"
                        placeholder="mm/dd/yyyy"
                        onFocus={(e) => (e.currentTarget.type = 'date')}
                        onBlur={(e) => {
                          if (!e.currentTarget.value) e.currentTarget.type = 'text';
                        }}
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="input_1_10" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Type of Service
                      </label>
                      <input
                        id="input_1_10"
                        type="text"
                        required
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                  </div>

                  {/* Row 4: Day of Week & Booking Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="input_1_11" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Day of Week
                      </label>
                      <select
                        id="input_1_11"
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        className="bbc-input"
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="input_1_12" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Booking Hours
                      </label>
                      <input
                        id="input_1_12"
                        type="number"
                        min={1}
                        required
                        value={bookingHours}
                        onChange={(e) => setBookingHours(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                  </div>

                  {/* Row 5: Pick Up Time */}
                  <fieldset>
                    <legend className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                      Pick Up Time
                    </legend>
                    <div className="grid grid-cols-3 gap-[10px]">
                      <input
                        id="input_1_14_1"
                        type="number"
                        min={1}
                        max={12}
                        placeholder="HH"
                        aria-label="Hours"
                        required
                        value={pickupHour}
                        onChange={(e) => setPickupHour(e.target.value)}
                        className="bbc-input"
                      />
                      <input
                        id="input_1_14_2"
                        type="number"
                        min={0}
                        max={59}
                        placeholder="MM"
                        aria-label="Minutes"
                        value={pickupMinute}
                        onChange={(e) => setPickupMinute(e.target.value)}
                        className="bbc-input"
                      />
                      <select
                        id="input_1_14_3"
                        aria-label="AM/PM"
                        value={pickupAmPm}
                        onChange={(e) => setPickupAmPm(e.target.value)}
                        className="bbc-input"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </fieldset>

                  {/* Row 6: Type of Trip */}
                  <div>
                    <label htmlFor="input_1_13" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                      Type of Trip
                    </label>
                    <input
                      id="input_1_13"
                      type="text"
                      required
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      className="bbc-input"
                    />
                  </div>

                  {/* Row 7: Pick Up Location & Drop Off Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label htmlFor="input_1_15" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Pick Up Location
                      </label>
                      <input
                        id="input_1_15"
                        type="text"
                        required
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="input_1_16" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
                        Drop Off Location
                      </label>
                      <input
                        id="input_1_16"
                        type="text"
                        required
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="bbc-input"
                      />
                    </div>
                  </div>

                  {/* Row 8: Can We Text You? */}
                  <fieldset>
                    <legend className="block font-poppins text-[14px] font-medium text-[#111111] mb-[8px]">
                      Can We Text You?
                    </legend>
                    <div className="flex flex-row items-center gap-[24px]">
                      <label className="inline-flex items-center gap-[8px] font-poppins text-[14px] text-[#111111] cursor-pointer">
                        <input
                          type="radio"
                          name="can_we_text"
                          value="Yes"
                          checked={canText === 'Yes'}
                          onChange={() => setCanText('Yes')}
                          className="bbc-radio"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-[8px] font-poppins text-[14px] text-[#111111] cursor-pointer">
                        <input
                          type="radio"
                          name="can_we_text"
                          value="No"
                          checked={canText === 'No'}
                          onChange={() => setCanText('No')}
                          className="bbc-radio"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </fieldset>

                  {formError && (
                    <div className="text-[13px] font-poppins text-[#F60102] bg-[#F60102]/10 border border-[#F60102]/40 rounded px-3 py-2">
                      {formError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-[4px]">
                    <button
                      type="submit"
                      id="gform_submit_button_1"
                      className="w-full bg-[#F60102] hover:bg-[#d40102] text-white font-orbitron text-[15px] font-medium py-[12px] px-[24px] rounded-[4px] transition-colors cursor-pointer"
                    >
                      Get Instant Quote
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 2: THREE FEATURE CARDS
            Clean Vehicles | Professional Drivers | Customer Service
        ------------------------------------------------------------------- */}
        <section className="w-full bg-[#101010] py-[40px] md:py-[80px] px-[20px]">
          <div className="max-w-[1140px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[20px] items-stretch">
            <div className="bg-white border border-gray-200 shadow-lg rounded-[12px] p-[30px] flex flex-col items-center justify-center text-center gap-[10px]">
              <h2 className="font-playfair text-[18px] md:text-[26px] font-bold capitalize text-[#111111]">
                Clean Vehicles
              </h2>
              <p className="font-montserrat text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] text-gray-700">
                Travel with peace of mind knowing that every vehicle is disinfected and sanitized before every trip.
              </p>
            </div>

            <div className="bg-white border border-gray-200 shadow-lg rounded-[12px] p-[30px] flex flex-col items-center justify-center text-center gap-[10px]">
              <h2 className="font-playfair text-[18px] md:text-[26px] font-bold capitalize text-[#111111]">
                Professional Drivers
              </h2>
              <p className="font-montserrat text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] text-gray-700">
                We only work with the best. Experienced, clean cut and reliable chauffeurs at your service.
              </p>
            </div>

            <div className="bg-white border border-gray-200 shadow-lg rounded-[12px] p-[30px] flex flex-col items-center justify-center text-center gap-[10px]">
              <h2 className="font-playfair text-[18px] md:text-[26px] font-bold capitalize text-[#111111]">
                Customer Service
              </h2>
              <p className="font-montserrat text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] text-gray-700">
                Providing a hassle free, quality driven experience is our number one priority
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 3: STICKY / FIXED PARALLAX BANNER (elementor-element-2c58a7a)
        ------------------------------------------------------------------- */}
        <section
          className="relative w-full min-h-[200px] md:min-h-[300px] py-[40px] px-[20px] flex flex-col items-center justify-center bg-fixed bg-top bg-no-repeat bg-cover overflow-hidden"
          style={{
            backgroundImage: `url("${cdnUrl(`${ORIGIN_2025_02}/IMG_2687.jpeg`, 1600, 84)}"), url("${ORIGIN_2025_02}/IMG_2687.jpeg")`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />

          <div className="relative z-10 max-w-[1140px] mx-auto flex flex-col items-center justify-center text-center gap-[4px] md:gap-[20px]">
            <h2 className="font-playfair text-[22px] md:text-[52px] font-bold uppercase leading-[32px] md:leading-[1.15] text-white">
              Seattle&apos;s Premier Express Shuttle Service
            </h2>
            <h3 className="font-montserrat text-[14px] md:text-[17px] font-medium leading-[22px] text-white">
              Cruise Shuttle from Sea-Tac Hotels to Pier 66 & Pier 91 · Airport Transfers · Charters
            </h3>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            SECTION 4: MASONRY FLEET GALLERY (Fast-decoding compressed assets)
        ------------------------------------------------------------------- */}
        <section className="w-full bg-[#101010] py-[40px] md:py-[80px] px-[20px]">
          <div className="max-w-[1140px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[5px] md:gap-[10px] items-start">
              {MASONRY_COLUMNS.map((columnItems, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[5px] md:gap-[10px]">
                  {columnItems.map((item) => {
                    const globalIdx = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setIsZoomed(false);
                          setLightboxIndex(globalIdx);
                        }}
                        className="group relative w-full overflow-hidden block cursor-pointer focus:outline-2 focus:outline-[#F60102]"
                        aria-label={`Open ${item.title} in lightbox`}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          width={item.width}
                          height={item.height}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            if (e.currentTarget.src !== item.fallbackSrc) {
                              e.currentTarget.src = item.fallbackSrc;
                            }
                          }}
                          className="w-full h-auto block transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300" />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER — Seattle Express Shuttle
      ===================================================================== */}
      <footer>
        {/* Top Footer Container (#282A27) */}
        <div className="w-full bg-[#282A27] py-[40px] md:py-[60px] px-[20px]">
          <div className="max-w-[1140px] mx-auto flex flex-col items-center justify-center gap-[20px] md:gap-[36px]">
            {/* Footer Seattle Express Shuttle Logo */}
            <a href="#top" aria-label="Seattle Express Shuttle">
              <SeattleExpressLogo size="footer" />
            </a>

            {/* Headings */}
            <div className="flex flex-col items-center justify-center text-center gap-[13px]">
              <h2 className="font-montserrat text-[15px] md:text-[17px] font-medium text-white">
                For immediate response please text or call <a href="tel:+12065046000" className="underline hover:text-[#F60102]">+1 (206) 504-6000</a>
              </h2>
              <h2 className="font-montserrat text-[15px] md:text-[17px] font-medium text-white">
                <b className="font-bold">Please Note:</b> Deposit Confirms Reservation
              </h2>
            </div>

            {/* Inline Contact List */}
            <ul className="flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[12px] text-center">
              <li>
                <a
                  href="tel:+12065046000"
                  className="inline-flex items-center gap-[8px] font-poppins text-[14px] md:text-[16px] text-white hover:text-[#F60102] transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    className="w-[16px] h-[16px] fill-[#F60102] shrink-0"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                  </svg>
                  <span>+1 (206) 504-6000</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@seattleexpressshuttle.com"
                  className="inline-flex items-center gap-[8px] font-poppins text-[14px] md:text-[16px] text-white hover:text-[#F60102] transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    className="w-[16px] h-[16px] fill-[#F60102] shrink-0"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                  </svg>
                  <span>info@seattleexpressshuttle.com</span>
                </a>
              </li>

              <li className="inline-flex items-center gap-[8px] font-poppins text-[14px] md:text-[16px] text-white/90">
                <svg
                  aria-hidden="true"
                  className="w-[16px] h-[16px] fill-[#F60102] shrink-0"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                </svg>
                <span>3507 S 188th St, SeaTac, WA 98188</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-[12px]">
              <a
                href="https://seattleexpressshuttle.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seattle Express Shuttle Official Website"
                className="w-[40px] h-[40px] rounded-full bg-[#1e73be] hover:opacity-90 flex items-center justify-center text-white transition-opacity"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 512 512">
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64h185.4c2.2 20.4 3.3 41.8 3.3 64zm28.8-64h76.7C434.6 138 376.6 91.2 304.8 74.4c29.1 31 51.6 72.3 76 117.6zm-17.7 64c0-21.7-1.1-42.9-3.2-64H150.1c-2.1 21.1-3.2 42.3-3.2 64s1.1 42.9 3.2 64h209.8c2.1-21.1 3.2-42.3 3.2-64zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z" />
                </svg>
              </a>

              <a
                href="tel:+12065046000"
                aria-label="Call Seattle Express Shuttle"
                className="w-[40px] h-[40px] rounded-full bg-[#F60102] hover:opacity-90 flex items-center justify-center text-white transition-opacity"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 512 512">
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                </svg>
              </a>

              <a
                href="https://wa.me/12065046000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Seattle Express Shuttle"
                className="w-[40px] h-[40px] rounded-full bg-[#25D366] hover:opacity-90 flex items-center justify-center text-white transition-opacity"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Container */}
        <div className="w-full bg-[#101010] py-[20px] px-[20px]">
          <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[10px] text-center md:text-left">
            <h2 className="font-montserrat text-[12px] md:text-[14px] font-normal text-white">
              Copyright © 2026 Seattle Express Shuttle – All Rights Reserved.
            </h2>
            <h2 className="font-montserrat text-[12px] md:text-[14px] font-normal text-white/70">
              Sea-Tac Airport Shuttles · Pier 66 &amp; Pier 91 Cruise Transfers · Charters
            </h2>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FIXED FLOATING ACTION BUTTONS
      ===================================================================== */}
      <a
        href="tel:+12065046000"
        aria-label="Call Seattle Express Shuttle at +1 (206) 504-6000"
        className="fixed left-[12px] md:left-[20px] bottom-[20px] md:bottom-[30px] z-40 w-[50px] h-[50px] rounded-full bg-[#F60102] hover:bg-white text-white hover:text-[#F60102] flex items-center justify-center shadow-lg transition-transform duration-150 hover:scale-110"
      >
        <svg className="w-[25px] h-[25px] fill-current" viewBox="0 0 512 512">
          <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
        </svg>
      </a>

      <a
        href="https://wa.me/12065046000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Seattle Express Shuttle"
        className="fixed right-[12px] md:right-[20px] bottom-[20px] md:bottom-[30px] z-40 w-[50px] h-[50px] rounded-full bg-[#F60102] hover:bg-white text-white hover:text-[#F60102] flex items-center justify-center shadow-lg transition-transform duration-150 hover:scale-110"
      >
        <svg className="w-[25px] h-[25px] fill-current" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      {/* =====================================================================
          LIGHTBOX SLIDESHOW MODAL
      ===================================================================== */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 text-white/80 text-sm font-montserrat">
            <div>
              {lightboxIndex + 1} / {GALLERY_ITEMS.length}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="p-2 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle zoom"
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Image & Prev/Next Arrows */}
          <div className="relative flex-1 flex items-center justify-center px-12 overflow-hidden">
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-3 md:left-6 z-10 p-3 rounded-full bg-black/50 hover:bg-[#F60102] text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={GALLERY_ITEMS[lightboxIndex].hdSrc}
              alt={GALLERY_ITEMS[lightboxIndex].title}
              onError={(e) => {
                const fallback = GALLERY_ITEMS[lightboxIndex].fallbackSrc;
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
              className={`max-h-[80vh] max-w-[88vw] object-contain transition-transform duration-200 ${
                isZoomed ? 'scale-125' : 'scale-100'
              }`}
            />

            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 md:right-6 z-10 p-3 rounded-full bg-black/50 hover:bg-[#F60102] text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center py-3 text-xs text-white/60 font-montserrat">
            Seattle Express Shuttle — Luxury &amp; Charter Fleet
          </div>
        </div>
      )}
    </div>
  );
}
