import React from 'react';
import { MapPin, Phone, Mail, Clock, Anchor, Plane, CheckCircle2, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Seattle Express Shuttle Story */}
          <div className="lg:col-span-7">
            <span className="text-xs font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase block mb-3">
              About Seattle Express Shuttle
            </span>

            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-6">
              20+ Years of Dependable Transportation Across the Pacific Northwest
            </h2>

            <div className="w-16 h-[2px] bg-[#C6AD83] mb-6" />

            <div className="space-y-4 font-manrope text-sm sm:text-base text-[#55524D] leading-relaxed">
              <p>
                At <strong>Seattle Express Shuttle</strong>, we pride ourselves on delivering safe, reliable, and comfortable transportation throughout Seattle and Sea-Tac Airport. Whether you are traveling for business, family vacations, cruise departures, or group events, our professional team is committed to making every ride smooth and stress-free.
              </p>
              <p>
                We are renowned for our signature <strong>$30 per person cruise shuttles</strong> from any hotel near Sea-Tac Airport directly to Seattle cruise berths at <strong>Pier 66</strong> and <strong>Pier 91</strong>. Our fleet features luxury Mercedes Sprinter vans and executive SUVs designed with spacious seating, climate control, device charging ports, smooth suspension, and abundant luggage space.
              </p>
              <p>
                Headquartered at <strong>3507 S 188th St, SeaTac, WA 98188</strong>, our operations center provides 24-hour dispatch and flight tracking, ensuring your driver is waiting curbside from the moment your plane touches down or your cruise ship docks.
              </p>
            </div>

            {/* Authentic Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 mt-6 border-t border-[#EAE4D9]">
              {[
                '20+ Years of Dependable Service in Puget Sound',
                'Official Sea-Tac Pier 66 & Pier 91 Cruise Transfers ($30/pax)',
                'Clean, disinfected & sanitized fleet before every ride',
                '24/7 Live Local Dispatch Hotline: (206) 504-6000',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-manrope text-[#35434A]">
                  <CheckCircle2 className="w-4 h-4 text-[#A88B61] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Authentic Contact Card */}
          <div className="lg:col-span-5">
            <div className="luxury-card rounded-sm bg-white p-8 sm:p-10 border border-[#C6AD83]/30 shadow-lg relative">
              <span className="text-[11px] font-manrope font-semibold text-[#A88B61] tracking-[0.2em] uppercase block mb-2">
                Business Information
              </span>

              <h3 className="font-cormorant font-bold text-2xl text-[#35434A] mb-6">
                Seattle Express Shuttle Headquarters
              </h3>

              <div className="space-y-5 font-manrope text-sm text-[#343434]">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#EAE4D9]/80">
                  <MapPin className="w-5 h-5 text-[#A88B61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35434A] text-xs uppercase tracking-wider mb-0.5">Headquarters Address</strong>
                    <span>3507 S 188th St, SeaTac, WA 98188</span>
                    <span className="block text-xs text-[#77736D] mt-0.5">Located near Sea-Tac Airport &amp; Area Hotels</span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#EAE4D9]/80">
                  <Phone className="w-5 h-5 text-[#A88B61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35434A] text-xs uppercase tracking-wider mb-0.5">Phone &amp; SMS Dispatch</strong>
                    <a href="tel:+12065046000" className="text-[#35434A] hover:text-[#A88B61] font-bold text-base transition-colors">
                      +1 (206) 504-6000
                    </a>
                    <span className="block text-xs text-[#77736D] mt-0.5">Call or text anytime 24/7</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#EAE4D9]/80">
                  <Mail className="w-5 h-5 text-[#A88B61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35434A] text-xs uppercase tracking-wider mb-0.5">Direct Email</strong>
                    <a href="mailto:info@seattleexpressshuttle.com" className="text-[#35434A] hover:text-[#A88B61] font-semibold transition-colors">
                      info@seattleexpressshuttle.com
                    </a>
                  </div>
                </div>

                {/* Terminals Served */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-[#EAE4D9]/80">
                  <Anchor className="w-5 h-5 text-[#A88B61] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#35434A] text-xs uppercase tracking-wider mb-0.5">Cruise Terminals Served</strong>
                    <span className="block text-xs text-[#55524D]">• Pier 66: 2225 Alaskan Way, Seattle, WA 98121</span>
                    <span className="block text-xs text-[#55524D] mt-0.5">• Pier 91: 2001 W Garfield St, Seattle, WA 98119</span>
                  </div>
                </div>

                {/* Embedded Live Google Map for Headquarters */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#35434A] uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#C6AD83]" />
                      <span>Live Location Map</span>
                    </span>
                    <a
                      href="https://maps.google.com/?q=3507+S+188th+St,+SeaTac,+WA+98188"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A88B61] hover:text-[#35434A] font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="w-full h-44 sm:h-48 rounded-sm overflow-hidden border border-[#EAE4D9] shadow-xs relative bg-gray-100">
                    <iframe
                      title="Seattle Express Shuttle Headquarters Map"
                      src="https://maps.google.com/maps?q=3507+S+188th+St,+SeaTac,+WA+98188&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Call CTA */}
              <div className="mt-8 pt-4 border-t border-[#EAE4D9]">
                <a
                  href="tel:+12065046000"
                  className="w-full bg-[#F60102] hover:bg-[#d40102] text-white py-3.5 px-6 rounded-sm text-center text-xs sm:text-sm font-manrope font-bold tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current text-white" />
                  <span>CALL HOTLINE: (206) 504-6000</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
