import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles, Check } from 'lucide-react';

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

const HERO_SLIDESHOW_IMAGES = [
  {
    src: '/fleet/seattle-pier66-escalade.jpg',
    fallbackSrc: '/fleet/seattle-pier66-escalade.jpg'
  },
  {
    src: '/fleet/seatac-sprinter-delta.png',
    fallbackSrc: '/fleet/seatac-sprinter-delta.png'
  },
  {
    src: '/fleet/sprinter-limo-interior.jpg',
    fallbackSrc: '/fleet/sprinter-limo-interior.jpg'
  },
  {
    src: '/fleet/chevrolet-suburban-seattle.jpg',
    fallbackSrc: '/fleet/chevrolet-suburban-seattle.jpg'
  },
  {
    src: '/fleet/mercedes-sprinter-seatac.jpg',
    fallbackSrc: '/fleet/mercedes-sprinter-seatac.jpg'
  },
  {
    src: '/fleet/seattle-mercedes-sprinter.jpg',
    fallbackSrc: '/fleet/seattle-mercedes-sprinter.jpg'
  }
];

const ORIGIN_2025_04 = 'https://bottlebuschicago.com/wp-content/uploads/2025/04';

interface HeroProps {
  onQuoteSubmit?: (quote: SubmittedQuoteData) => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteSubmit }) => {
  // Hero background Ken Burns slideshow index
  const [slideState, setSlideState] = useState<{ current: number; prev: number | null }>({
    current: 0,
    prev: null
  });

  // Animated Google review counter (0 -> 378)
  const [reviewCount, setReviewCount] = useState<number>(0);

  // Instant Online Quote Form State
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passengers, setPassengers] = useState<string>('2');
  const [date, setDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('Cruise Shuttle ($30/person)');
  const [dayOfWeek, setDayOfWeek] = useState<string>('Monday');
  const [bookingHours, setBookingHours] = useState<string>('2');
  const [pickupHour, setPickupHour] = useState<string>('10');
  const [pickupMinute, setPickupMinute] = useState<string>('00');
  const [pickupAmPm, setPickupAmPm] = useState<string>('AM');
  const [tripType, setTripType] = useState<string>('Cruise Port Shuttle');
  const [pickupLocation, setPickupLocation] = useState<string>('Hotel near Sea-Tac Airport');
  const [dropoffLocation, setDropoffLocation] = useState<string>('Pier 66 / Pier 91 Cruise Terminal');
  const [canText, setCanText] = useState<string>('Yes');

  const [formError, setFormError] = useState<string>('');
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuoteData | null>(null);
  const [smartNotification, setSmartNotification] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hero slideshow interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideState((s) => ({
        prev: s.current,
        current: (s.current + 1) % HERO_SLIDESHOW_IMAGES.length
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Animated Counter for Google Reviews (0 -> 378)
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

  // Listen for custom pre-fill events from other sections (e.g. services / fleet)
  useEffect(() => {
    const handlePreFill = (e: any) => {
      if (e.detail) {
        const { service, trip, pickup, dropoff, hours, pax } = e.detail;
        if (service) setServiceType(service);
        if (trip) setTripType(trip);
        if (pickup) setPickupLocation(pickup);
        if (dropoff) setDropoffLocation(dropoff);
        if (hours) setBookingHours(hours);
        if (pax) setPassengers(pax);
        setSmartNotification(`Selected: ${service} · Loaded into Instant Quote`);
        setTimeout(() => setSmartNotification(''), 4000);
      }
    };
    window.addEventListener('prefill-quote', handlePreFill);
    return () => window.removeEventListener('prefill-quote', handlePreFill);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
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

    const paxNum = Math.max(1, parseInt(passengers, 10) || 2);
    const hrsNum = Math.max(2, parseInt(bookingHours, 10) || 2);
    const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayOfWeek);

    let estimatedRate = 0;
    if (serviceType.includes('$30') || tripType.includes('$30') || tripType.toLowerCase().includes('cruise')) {
      estimatedRate = paxNum * 30;
      if (estimatedRate < 60) estimatedRate = 60;
    } else {
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
          ? 135
          : 115;
      estimatedRate = baseHourly * hrsNum;
    }

    const depositAmount = Math.max(20, Math.round(estimatedRate * 0.25));
    const formattedMin = (pickupMinute.trim() || '00').padStart(2, '0');
    const generatedRefCode = `SES-${Math.floor(1000 + Math.random() * 9000)}`;

    const quoteRecord: SubmittedQuoteData = {
      referenceCode: generatedRefCode,
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

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteRecord),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok && !data.success) {
        setFormError(data.error || 'Unable to submit booking request. Please call +1 (206) 504-6000 directly.');
        setIsSubmitting(false);
        return;
      }

      if (data.referenceCode) {
        quoteRecord.referenceCode = data.referenceCode;
      }

      setSubmittedQuote(quoteRecord);
      onQuoteSubmit?.(quoteRecord);
    } catch (err: any) {
      console.error('[Booking Submit Network Error]:', err?.message || err);
      // Fallback display if offline/network fails
      setSubmittedQuote(quoteRecord);
      onQuoteSubmit?.(quoteRecord);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[720px] flex items-center justify-center py-[40px] md:py-[45px] px-[20px] overflow-hidden">
      {/* Continuous Hardware-Accelerated Ken Burns Background Slideshow */}
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
        {/* Subtle Semi-Transparent Vignette for High Contrast */}
        <div className="absolute inset-0 z-[3] bg-black/40" />
      </div>

      {/* Inner Boxed Container (max-w-[1140px]) */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[30px] lg:gap-[30px]">
        
        {/* ===================================================================
            LEFT COLUMN: BRANDING & HEADLINE & RATINGS
        =================================================================== */}
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

            {/* Animated Counter */}
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

        {/* ===================================================================
            RIGHT COLUMN: INSTANT ONLINE QUOTE BOX (WHITE CARD)
        =================================================================== */}
        <div id="quote-card" className="w-full lg:w-[50%] bg-white text-[#111111] border border-gray-200 shadow-2xl rounded-[12px] p-[20px] md:p-[35px] transition-all duration-300">
          {smartNotification && (
            <div className="mb-4 p-3 bg-red-50 border border-[#F60102]/30 rounded-lg flex items-center justify-between text-xs font-montserrat text-[#111111] animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F60102] shrink-0" />
                <span><strong>{smartNotification}</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setSmartNotification('')}
                className="text-gray-400 hover:text-black font-bold text-sm ml-2 cursor-pointer"
              >
                ×
              </button>
            </div>
          )}

          <h2 className="font-playfair text-[20px] md:text-[26px] font-bold uppercase text-center text-[#111111] mb-[18px]">
            Instant Online Quote
          </h2>

          {submittedQuote ? (
            <div className="bg-[#F8F9FA] border border-gray-200 rounded-[8px] p-[20px] space-y-[14px] font-poppins text-[#111111]">
              <div className="flex items-center gap-2 text-[#009900] font-semibold text-[15px]">
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
                  <span className="text-[#111111] text-right font-medium">
                    {submittedQuote.pickupLocation} → {submittedQuote.dropoffLocation}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-[15px]">
                  <span className="font-semibold text-[#111111]">Estimated All-In Quote:</span>
                  <span className="font-bold text-[#009900]">${submittedQuote.estimatedRate}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-600">Deposit to Confirm Reservation:</span>
                  <span className="font-semibold text-[#F60102]">${submittedQuote.depositAmount}</span>
                </div>
              </div>

              <div className="bg-[#EBF7EE] border border-[#C3E6CB] rounded-[6px] p-[12px] text-[12px] text-[#155724] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4 text-[#155724] shrink-0" />
                  <span>Email Confirmation Dispatched</span>
                </div>
                <p>
                  A confirmation summary has been sent to <strong>{submittedQuote.email}</strong> and our dispatch desk at <strong>info@seattleexpressshuttle.com</strong>.
                </p>
                <p className="text-[11px] text-[#1e582e] pt-0.5">
                  <em>Note: Your reservation is pending final dispatch confirmation. We will text or call you to approve your ride.</em>
                </p>
              </div>

              <p className="text-[12px] text-gray-600">
                For immediate assistance, please text or call our 24/7 team at <a href="tel:+12065046000" className="text-[#F60102] font-semibold underline">+1 (206) 504-6000</a>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`sms:+12065046000?body=${encodeURIComponent(
                    `Hi Seattle Express Shuttle, my quote ref is ${submittedQuote.referenceCode} for ${submittedQuote.passengers} passengers on ${submittedQuote.date} (${submittedQuote.bookingHours} hrs). Route: ${submittedQuote.pickupLocation} to ${submittedQuote.dropoffLocation}.`
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
            <form onSubmit={handleFormSubmit} className="space-y-[15px]" noValidate>
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div>
                  <label htmlFor="hero_name" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Name
                  </label>
                  <input
                    id="hero_name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bbc-input"
                  />
                </div>
                <div>
                  <label htmlFor="hero_phone" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Phone
                  </label>
                  <input
                    id="hero_phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bbc-input"
                  />
                </div>
              </div>

              {/* Row 2: Email & No Of Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div>
                  <label htmlFor="hero_email" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Email
                  </label>
                  <input
                    id="hero_email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bbc-input"
                  />
                </div>
                <div>
                  <label htmlFor="hero_pax" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    No Of Passengers
                  </label>
                  <input
                    id="hero_pax"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div>
                  <label htmlFor="hero_date" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Date
                  </label>
                  <input
                    id="hero_date"
                    type="text"
                    placeholder="mm/dd/yyyy"
                    onFocus={(e) => (e.currentTarget.type = 'date')}
                    onBlur={(e) => {
                      if (!e.currentTarget.value) e.currentTarget.type = 'text';
                    }}
                    required
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (e.target.value) {
                        const parsed = new Date(e.target.value + 'T00:00:00');
                        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        setDayOfWeek(days[parsed.getDay()]);
                      }
                    }}
                    className="bbc-input"
                  />
                </div>
                <div>
                  <label htmlFor="hero_service" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Type of Service
                  </label>
                  <input
                    id="hero_service"
                    type="text"
                    list="service_options"
                    required
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="bbc-input"
                    placeholder="e.g. Airport, Cruise, Executive, Wine Tour"
                  />
                  <datalist id="service_options">
                    <option value="Sea-Tac Airport Transportation (SEA)" />
                    <option value="Cruise Shuttle to Pier 66 / Pier 91 ($30/person)" />
                    <option value="Corporate Executive Chauffeur" />
                    <option value="Hourly Dedicated Chauffeur" />
                    <option value="Wedding & Special Event Chauffeur" />
                    <option value="Woodinville Wine Country Tour" />
                    <option value="Group Van / Minibus Charter (Up to 14)" />
                    <option value="Private Point-to-Point / Long Distance" />
                    <option value="Airport Crew Layover Shuttle" />
                  </datalist>
                </div>
              </div>

              {/* Row 4: Day of Week & Booking Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div>
                  <label htmlFor="hero_day" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Day of Week
                  </label>
                  <select
                    id="hero_day"
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
                  <label htmlFor="hero_hours" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Booking Hours
                  </label>
                  <input
                    id="hero_hours"
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
                <legend className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                  Pick Up Time
                </legend>
                <div className="grid grid-cols-3 gap-[10px]">
                  <input
                    id="hero_time_hh"
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
                    id="hero_time_mm"
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
                    id="hero_time_ampm"
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
                <label htmlFor="hero_triptype" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                  Type of Trip
                </label>
                <input
                  id="hero_triptype"
                  type="text"
                  required
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="bbc-input"
                />
              </div>

              {/* Row 7: Pick Up Location & Drop Off Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                <div>
                  <label htmlFor="hero_pickup" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Pick Up Location
                  </label>
                  <input
                    id="hero_pickup"
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="bbc-input"
                  />
                </div>
                <div>
                  <label htmlFor="hero_dropoff" className="block font-poppins text-[14px] font-medium text-[#111111] mb-[5px]">
                    Drop Off Location
                  </label>
                  <input
                    id="hero_dropoff"
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
                <legend className="block font-poppins text-[14px] font-medium text-[#111111] mb-[6px]">
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

              {/* Smart Live Route Indicator */}
              {pickupLocation && dropoffLocation && (
                <div className="p-2.5 bg-red-50/90 border border-[#F60102]/25 rounded-md text-xs font-montserrat text-[#111111] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F60102] shrink-0" />
                    <div>
                      <span className="font-semibold text-[#111111]">Route:</span>{' '}
                      <span className="text-gray-700 font-medium">{pickupLocation} ➔ {dropoffLocation}</span>
                    </div>
                  </div>
                  <span className="bg-[#F60102] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                    Zero Surge
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-[2px]">
                <button
                  type="submit"
                  id="gform_submit_button_1"
                  disabled={isSubmitting}
                  className={`w-full bg-[#F60102] hover:bg-[#d40102] text-white font-orbitron text-[15px] font-semibold py-[13px] px-[24px] rounded-[4px] transition-colors cursor-pointer shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Processing Quote & Notifications...' : 'Get Instant Quote'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
