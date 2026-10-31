import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface TestimonialsProps {
  onViewAllReviewsClick?: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onViewAllReviewsClick }) => {
  const reviews = [
    {
      name: 'James Carter',
      avatar: '/assets/hd_avatar_james_perfect.png',
      quote:
        'C&C Transportation handled our corporate VIP travel flawlessly. The black 2026 Kia EV9 was whisper quiet, pristine, and ultra-luxurious!',
    },
    {
      name: 'Sarah Khan',
      avatar: '/assets/hd_avatar_sarah_perfect.png',
      quote:
        'Used AeroRide for my airport transfer—fixed cheap price with zero surge, and the driver arrived 10 minutes early. Fantastic service!',
    },
    {
      name: 'Ahmed Rafi',
      avatar: '/assets/hd_avatar_ahmed_perfect.png',
      quote:
        'Best chauffeur service so far. Seamless booking, immaculate black luxury cars, and top-tier professionalism from C&C.',
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-9 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092D5C] tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <button
            onClick={onViewAllReviewsClick}
            className="inline-flex items-center gap-1 text-[14px] font-bold text-[#092D5C] hover:text-[#FF7100] transition-colors self-start sm:self-auto cursor-pointer group"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Horizontal Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(9,45,92,0.06)] hover:shadow-[0_10px_28px_-6px_rgba(9,45,92,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Customer Profile & Name */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-100 flex-shrink-0 bg-gray-100 shadow-2xs">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15.5px] font-bold text-[#092D5C] leading-snug">
                      {rev.name}
                    </h3>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-[13.5px] text-[#64748B] font-medium leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* 5 Orange Stars */}
              <div className="flex items-center gap-1 mt-5 pt-4 border-t border-gray-50">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FF7100] text-[#FF7100]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
