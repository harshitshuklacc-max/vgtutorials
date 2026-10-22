import React, { useState } from 'react';
import { TestimonialItem } from '../types';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  googleReviewsCount: number;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  googleReviewsCount
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="py-20 sm:py-24 bg-[#07152F] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Student Experiences</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Feedback from Our Classroom
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Authentic reflections from students who experience Swapnil Sir's daily conceptual guidance in Dewas.
            </p>
          </div>

          {/* Google Reviews Reference Notice Box (Separate from testimonials per prompt) */}
          <div className="p-3.5 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#145DFF]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0 font-bold text-xs">
              G
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white font-mono tabular-nums">{googleReviewsCount} Reviews</span>
                <span className="text-slate-400">on Google</span>
              </div>
              <span className="text-[10px] text-slate-400 block">(User-provided public reference)</span>
            </div>
          </div>
        </div>

        {testimonials.length > 0 && current && (
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden space-y-6">
              {/* Quote marks icon */}
              <div className="text-[#38BDF8]/20 text-6xl font-serif leading-none absolute top-4 right-6 pointer-events-none">
                “
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Feedback text */}
              <blockquote className="text-base sm:text-lg text-slate-200 leading-relaxed italic">
                "{current.feedback}"
              </blockquote>

              {/* Student identity lockup */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-white text-base">
                    {current.studentName}
                  </h4>
                  <p className="text-xs text-[#8BD9FF]">
                    {current.batchOrClass}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[11px]">Enrolled Student Feedback</span>
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex ? 'w-6 bg-[#38BDF8]' : 'w-2 bg-slate-700'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
