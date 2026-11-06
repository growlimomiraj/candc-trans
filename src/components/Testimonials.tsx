import React from 'react';
import { Star, CheckCircle, ExternalLink, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const verifiedReviews = [
    {
      name: 'James Carter',
      role: 'Corporate Executive · Puget Sound Tech Summit',
      trip: 'C&C Executive & EV9 Flagship',
      rating: 5,
      date: 'Verified Client',
      content:
        'C&C Transportation handled our executive leadership travel during our Seattle summit flawlessly. The confirmed black 2026 Kia EV9 was whisper-quiet, pristine, and ultra-luxurious. The chauffeur knew every alternate route to bypass the I-5 bottlenecks.',
    },
    {
      name: 'Sarah Khan',
      role: 'Frequent Business Traveler',
      trip: 'AeroRide Sea-Tac Airport Transfer',
      rating: 5,
      date: 'Verified Client',
      content:
        'Used AeroRide for my airport transfer to Sea-Tac—exact fixed price with zero surge pricing, and the driver arrived 10 minutes early. Spotless interior, smooth driving, and courteous luggage assistance. Fantastic service!',
    },
    {
      name: 'Ahmed Rafi',
      role: 'Private Client',
      trip: 'Executive Chauffeur Charter',
      rating: 5,
      date: 'Verified Client',
      content:
        'Best chauffeur service in Seattle so far. Seamless booking process, immaculate black luxury vehicles, and genuine professionalism. They made our family airport transfer completely stress-free.',
    },
    {
      name: 'Linda & David M.',
      role: 'Alaska Cruise Passengers',
      trip: 'SeaTac Hotel to Pier 66 Cruise Terminal',
      rating: 5,
      date: 'Verified Client',
      content:
        'Our hotel shuttle to Pier 66 was prompt and effortless. The driver handled all six of our heavy cruise bags and delivered us directly to the porter drop at Bell Street Pier. Will book again every cruise season.',
    },
  ];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FAF8F4] border-t border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C6AD83]/40 text-[#35434A] text-xs font-semibold tracking-wider uppercase mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-[#A88B61]" />
            <span>Verified Passenger Experiences</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#35434A] tracking-tight mb-4">
            Trusted by Executives &amp; Travelers
          </h2>

          <div className="w-16 h-[2px] bg-[#C6AD83] mx-auto mb-4" />

          {/* Google 5-Star Banner */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-manrope text-[#55524D]">
            <div className="flex items-center gap-1 text-[#C6AD83]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C6AD83] text-[#C6AD83]" />
              ))}
            </div>
            <strong className="text-[#35434A]">5.0 Star Rating</strong>
            <span>•</span>
            <span>Over 378+ authentic Google and client reviews</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Seattle+Express+Shuttle"
              className="inline-flex items-center gap-1 text-[#A88B61] hover:underline font-semibold text-xs ml-1"
            >
              <span>View on Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 4 Clean Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verifiedReviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 bg-white rounded-sm border border-[#C6AD83]/25 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Top Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C6AD83] text-[#C6AD83]" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-[#EAE4D9]" />
                </div>

                {/* Review Quote */}
                <p className="font-manrope text-sm sm:text-[15px] text-[#44423E] leading-relaxed italic mb-6">
                  "{rev.content}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#EAE4D9] flex items-center justify-between text-xs font-manrope">
                <div>
                  <strong className="block text-[#35434A] text-sm font-semibold">{rev.name}</strong>
                  <span className="text-[#77736D]">{rev.role}</span>
                </div>
                <span className="px-2.5 py-1 rounded-sm bg-[#FAF8F4] text-[#A88B61] border border-[#EAE4D9] text-[10px] font-semibold uppercase tracking-wider">
                  {rev.trip}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
