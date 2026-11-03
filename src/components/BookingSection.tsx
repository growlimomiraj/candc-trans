import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, PhoneCall, MessageSquare, Sparkles, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export interface SubmittedQuoteData {
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

interface BookingSectionProps {
  onQuoteGenerated?: (quote: SubmittedQuoteData) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onQuoteGenerated }) => {
  // Form State
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passengers, setPassengers] = useState<string>('2');
  const [date, setDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('Cruise Shuttle to Pier 66 / Pier 91 ($30/person)');
  const [dayOfWeek, setDayOfWeek] = useState<string>('Monday');
  const [bookingHours, setBookingHours] = useState<string>('2');
  const [pickupHour, setPickupHour] = useState<string>('10');
  const [pickupMinute, setPickupMinute] = useState<string>('00');
  const [pickupAmPm, setPickupAmPm] = useState<string>('AM');
  const [tripType, setTripType] = useState<string>('Cruise Port Shuttle ($30/person)');
  const [pickupLocation, setPickupLocation] = useState<string>('Hotel near Sea-Tac Airport');
  const [dropoffLocation, setDropoffLocation] = useState<string>('Seattle Cruise Terminal (Pier 66 / Pier 91)');
  const [canText, setCanText] = useState<string>('Yes');

  const [formError, setFormError] = useState<string>('');
  const [submittedQuote, setSubmittedQuote] = useState<SubmittedQuoteData | null>(null);
  const [smartNotice, setSmartNotice] = useState<string>('');

  // Quick Preset Routes from seattleexpressshuttle.com
  const quickRoutes = [
    {
      label: 'Sea-Tac Hotel ➔ Pier 66 Cruise ($30/pax)',
      service: 'Cruise Shuttle to Pier 66 / Pier 91 ($30/person)',
      trip: 'Cruise Port Shuttle ($30/person)',
      pickup: 'Hotel near Sea-Tac Airport',
      dropoff: 'Pier 66 Cruise Terminal (2225 Alaskan Way)',
      hours: '2',
      pax: '2',
    },
    {
      label: 'Sea-Tac Hotel ➔ Pier 91 Cruise ($30/pax)',
      service: 'Cruise Shuttle to Pier 66 / Pier 91 ($30/person)',
      trip: 'Cruise Port Shuttle ($30/person)',
      pickup: 'Hotel near Sea-Tac Airport',
      dropoff: 'Pier 91 Cruise Terminal (2001 W Garfield St)',
      hours: '2',
      pax: '2',
    },
    {
      label: 'Sea-Tac Airport ➔ Downtown Hotel',
      service: 'Sea-Tac Airport Express Transfer',
      trip: 'One Way Transfer',
      pickup: 'Seattle-Tacoma International Airport (SEA)',
      dropoff: 'Downtown Seattle Hotel / Residence',
      hours: '2',
      pax: '2',
    },
    {
      label: 'Hourly Executive Chauffeur (Seattle)',
      service: 'Executive Private Chauffeur',
      trip: 'Hourly Dedicated Charter',
      pickup: 'Seattle / SeaTac Area Address',
      dropoff: 'Puget Sound Regional Itinerary',
      hours: '4',
      pax: '4',
    },
  ];

  const handleSelectQuickRoute = (r: typeof quickRoutes[0]) => {
    setServiceType(r.service);
    setTripType(r.trip);
    setPickupLocation(r.pickup);
    setDropoffLocation(r.dropoff);
    setBookingHours(r.hours);
    setPassengers(r.pax);
    setSmartNotice(`Loaded preset: ${r.label}`);
    setTimeout(() => setSmartNotice(''), 3000);
  };

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
      setFormError('Please complete all required fields to generate your verified instant quote.');
      return;
    }

    const paxNum = Math.max(1, parseInt(passengers, 10) || 2);
    const hrsNum = Math.max(2, parseInt(bookingHours, 10) || 2);
    const isWeekend = ['Friday', 'Saturday', 'Sunday'].includes(dayOfWeek);

    // Exact transparent pricing formula
    let estimatedRate = 0;
    if (tripType.includes('$30/person') || serviceType.includes('$30/person')) {
      estimatedRate = paxNum * 30;
      if (estimatedRate < 60) estimatedRate = 60; // minimum 2 pax or flat base
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
      depositAmount,
    };

    setSubmittedQuote(quoteRecord);
    onQuoteGenerated?.(quoteRecord);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-[#FAF8F4] relative border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D9]/80 border border-[#C6AD83]/40 text-[#35434A] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#A88B61]" />
            <span>Seattle Express Shuttle Instant Quote</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-4">
            Instant Online Quote &amp; Reservation
          </h2>
          
          <div className="w-16 h-[2px] bg-[#C6AD83] mx-auto mb-4" />
          
          <p className="font-manrope text-[#77736D] text-base leading-relaxed">
            Reserve your Sea-Tac hotel cruise transfer ($30/person to Pier 66 &amp; Pier 91) or executive chauffeur ride.
            No hidden fees. Deposit confirms your reservation.
          </p>

          {/* Quick Route Selector Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-manrope font-semibold text-[#35434A] mr-1">
              Quick Routes:
            </span>
            {quickRoutes.map((r) => (
              <button
                key={r.label}
                type="button"
                onClick={() => handleSelectQuickRoute(r)}
                className="px-3 py-1.5 rounded-full text-xs font-manrope font-medium bg-white text-[#35434A] border border-[#C6AD83]/40 hover:border-[#35434A] hover:bg-[#35434A] hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Booking Container (Crisp White Card with Champagne Border) */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-[#C6AD83]/30 shadow-xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Subtle Top Gold Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C6AD83] via-[#DFCEB2] to-[#C6AD83]" />

          {smartNotice && (
            <div className="mb-6 p-3 bg-[#FAF8F4] border border-[#C6AD83]/40 rounded text-xs font-manrope text-[#35434A] flex items-center justify-between animate-fadeIn">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-[#A88B61]" />
                {smartNotice}
              </span>
              <button
                type="button"
                onClick={() => setSmartNotice('')}
                className="text-gray-400 hover:text-gray-700 text-sm"
              >
                ×
              </button>
            </div>
          )}

          {submittedQuote ? (
            /* ===============================================================
               SUCCESS QUOTE CONFIRMATION CARD
            =============================================================== */
            <div className="space-y-6 font-manrope text-[#343434] animate-fadeIn">
              <div className="p-4 rounded-sm bg-[#FAF8F4] border border-[#C6AD83]/50 flex items-center gap-3 text-[#35434A]">
                <CheckCircle2 className="w-6 h-6 text-[#A88B61] shrink-0" />
                <div>
                  <h3 className="font-cormorant font-bold text-2xl text-[#35434A] leading-tight">
                    Seattle Express Shuttle Quote — Ref #{submittedQuote.referenceCode}
                  </h3>
                  <p className="text-xs text-[#77736D] mt-0.5">
                    Your quote details have been logged in our SeaTac dispatch system. Deposit confirms reservation.
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F4] border border-[#EAE4D9] rounded-sm p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#77736D] block text-xs uppercase tracking-wider">Passenger Name</span>
                    <strong className="text-[#35434A] text-base">{submittedQuote.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#77736D] block text-xs uppercase tracking-wider">Contact Phone</span>
                    <strong className="text-[#35434A] text-base">{submittedQuote.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[#77736D] block text-xs uppercase tracking-wider">Service Selected</span>
                    <strong className="text-[#35434A]">{submittedQuote.serviceType}</strong>
                  </div>
                  <div>
                    <span className="text-[#77736D] block text-xs uppercase tracking-wider">Date &amp; Time</span>
                    <strong className="text-[#35434A]">
                      {submittedQuote.date} ({submittedQuote.dayOfWeek}) at {submittedQuote.pickupTime}
                    </strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EAE4D9]">
                  <span className="text-[#77736D] block text-xs uppercase tracking-wider mb-1">Itinerary Route</span>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#35434A]">
                    <MapPin className="w-4 h-4 text-[#A88B61] shrink-0" />
                    <span>{submittedQuote.pickupLocation}</span>
                    <span className="text-[#A88B61]">➔</span>
                    <span>{submittedQuote.dropoffLocation}</span>
                  </div>
                </div>

                {/* Rates Highlight Box */}
                <div className="p-4 bg-white rounded border border-[#C6AD83]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#77736D] block font-medium">
                      Estimated All-In Quote:
                    </span>
                    <span className="font-cormorant text-3xl font-bold text-[#35434A]">
                      ${submittedQuote.estimatedRate}
                    </span>
                    <span className="text-[11px] text-[#77736D] ml-2">
                      ({submittedQuote.passengers} Passengers)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#77736D] block font-medium">
                      Deposit to Confirm Reservation:
                    </span>
                    <span className="font-cormorant text-2xl font-bold text-[#A88B61]">
                      ${submittedQuote.depositAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={`sms:+12065046000?body=${encodeURIComponent(
                    `Hi Seattle Express Shuttle, my quote ref is ${submittedQuote.referenceCode} for ${submittedQuote.passengers} passengers on ${submittedQuote.date} at ${submittedQuote.pickupTime}. Pickup: ${submittedQuote.pickupLocation} to ${submittedQuote.dropoffLocation}.`
                  )}`}
                  className="w-full sm:flex-1 btn-slate py-3.5 px-6 rounded-sm text-center text-sm inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#C6AD83]" />
                  <span>Text: +1 (206) 504-6000</span>
                </a>

                <a
                  href="tel:+12065046000"
                  className="w-full sm:flex-1 btn-champagne py-3.5 px-6 rounded-sm text-center text-sm inline-flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Dispatch: (206) 504-6000</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedQuote(null)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-sm border border-[#EAE4D9] text-[#77736D] hover:text-[#35434A] hover:bg-gray-50 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  New Quote
                </button>
              </div>
            </div>
          ) : (
            /* ===============================================================
               BOOKING FORM
            =============================================================== */
            <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking_name" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Your Name <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_name"
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="luxury-input"
                  />
                </div>

                <div>
                  <label htmlFor="booking_phone" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Phone Number <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_phone"
                    type="tel"
                    required
                    placeholder="(206) 504-6000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Row 2: Email & Number of Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking_email" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Email Address <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_email"
                    type="email"
                    required
                    placeholder="info@seattleexpressshuttle.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="luxury-input"
                  />
                </div>

                <div>
                  <label htmlFor="booking_pax" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Number of Passengers <span className="text-[#A88B61]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="booking_pax"
                      type="number"
                      min={1}
                      max={35}
                      required
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="luxury-input"
                    />
                    <Users className="w-4 h-4 text-[#A88B61] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Service Type & Trip Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking_service" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Type of Service <span className="text-[#A88B61]">*</span>
                  </label>
                  <select
                    id="booking_service"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="luxury-input"
                  >
                    <option value="Cruise Shuttle to Pier 66 / Pier 91 ($30/person)">Cruise Shuttle from Sea-Tac Hotel to Pier 66 &amp; 91 ($30/person)</option>
                    <option value="Airport Transfer (Sea-Tac SEA)">Sea-Tac Airport Transfer (To/From Airport)</option>
                    <option value="Private Chauffeur / Executive Sedan/SUV">Private Sedan, SUV, Minivan or Sprinter</option>
                    <option value="AeroRide Fixed-Rate Electric Transfer">AeroRide 2026 Kia EV9 Fixed-Rate Transfer</option>
                    <option value="Airport Crew Layover Shuttle">Airport Crew Layover Hotel Shuttle</option>
                    <option value="Charter / Group Bus Rental">Charter / Group Bus Rental</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="booking_trip" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Type of Trip <span className="text-[#A88B61]">*</span>
                  </label>
                  <select
                    id="booking_trip"
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="luxury-input"
                  >
                    <option value="Cruise Port Shuttle ($30/person)">Cruise Port Shuttle ($30/person)</option>
                    <option value="One Way Transfer">One Way Transfer</option>
                    <option value="Round Trip">Round Trip (Arrival &amp; Departure)</option>
                    <option value="Hourly Charter">Hourly Charter (As Directed)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Date, Day of Week, Booking Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="booking_date" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Date <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_date"
                    type="date"
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
                    className="luxury-input"
                  />
                </div>

                <div>
                  <label htmlFor="booking_day" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Day of Week
                  </label>
                  <select
                    id="booking_day"
                    value={dayOfWeek}
                    onChange={(e) => setDayOfWeek(e.target.value)}
                    className="luxury-input"
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
                  <label htmlFor="booking_hours" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Booking Hours <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_hours"
                    type="number"
                    min={1}
                    max={24}
                    required
                    value={bookingHours}
                    onChange={(e) => setBookingHours(e.target.value)}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Row 5: Pick Up Time */}
              <fieldset>
                <legend className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                  Pick Up Time <span className="text-[#A88B61]">*</span>
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    placeholder="HH (1-12)"
                    aria-label="Hours"
                    required
                    value={pickupHour}
                    onChange={(e) => setPickupHour(e.target.value)}
                    className="luxury-input text-center"
                  />
                  <input
                    type="number"
                    min={0}
                    max={59}
                    placeholder="MM (00-59)"
                    aria-label="Minutes"
                    value={pickupMinute}
                    onChange={(e) => setPickupMinute(e.target.value)}
                    className="luxury-input text-center"
                  />
                  <select
                    aria-label="AM or PM"
                    value={pickupAmPm}
                    onChange={(e) => setPickupAmPm(e.target.value)}
                    className="luxury-input text-center"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </fieldset>

              {/* Row 6: Pick Up Location & Drop Off Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="booking_pickup" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Pick Up Location <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_pickup"
                    type="text"
                    required
                    placeholder="e.g. Sea-Tac Airport or SeaTac Hotel"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="luxury-input"
                  />
                </div>

                <div>
                  <label htmlFor="booking_dropoff" className="block text-[13px] font-semibold text-[#35434A] mb-1.5">
                    Drop Off Location <span className="text-[#A88B61]">*</span>
                  </label>
                  <input
                    id="booking_dropoff"
                    type="text"
                    required
                    placeholder="e.g. Pier 66 / Pier 91 / Downtown Seattle"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="luxury-input"
                  />
                </div>
              </div>

              {/* Row 7: Can We Text You? */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F4] p-3.5 rounded border border-[#EAE4D9]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A88B61]" />
                  <span className="text-xs font-semibold text-[#35434A]">
                    Can we text you driver arrival updates and quote confirmation?
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#35434A] cursor-pointer">
                    <input
                      type="radio"
                      name="can_text_opt"
                      value="Yes"
                      checked={canText === 'Yes'}
                      onChange={() => setCanText('Yes')}
                      className="luxury-radio"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#35434A] cursor-pointer">
                    <input
                      type="radio"
                      name="can_text_opt"
                      value="No"
                      checked={canText === 'No'}
                      onChange={() => setCanText('No')}
                      className="luxury-radio"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {formError && (
                <div className="text-xs font-manrope text-red-700 bg-red-50 border border-red-200 rounded p-3">
                  {formError}
                </div>
              )}

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-slate py-4 px-8 rounded-sm text-center text-sm font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all"
                >
                  <span>GET INSTANT ONLINE QUOTE</span>
                  <ArrowRight className="w-4 h-4 text-[#C6AD83]" />
                </button>
              </div>

              {/* Security & Guarantee Note */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#77736D] text-center pt-2">
                <span>✓ Deposit Confirms Reservation</span>
                <span>•</span>
                <span>✓ Call or Text 24/7: +1 (206) 504-6000</span>
                <span>•</span>
                <span>✓ info@seattleexpressshuttle.com</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
