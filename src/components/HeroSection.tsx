import React from 'react';
import { WebsiteConfig } from '../types';
import { MapPin, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  config: WebsiteConfig;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOpenEnquiry }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-[#38BDF8]/15 bg-gradient-to-b from-[#07152F] via-[#091C3E] to-[#07152F]">
      {/* Background ambient decorative light cones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#145DFF]/20 via-[#38BDF8]/15 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-[#145DFF]/10 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement Ticker Bar */}
        {config.announcementTicker && (
          <div className="mb-8 flex items-center justify-between gap-3 p-3 px-4 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/25 text-xs text-[#EFF7FF] shadow-lg shadow-[#07152F]/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-[#38BDF8] shrink-0 uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Notice:
              </span>
              <span className="truncate text-slate-200">{config.announcementTicker}</span>
            </div>
            <a
              href="#contact"
              className="text-[#8BD9FF] hover:underline whitespace-nowrap text-xs font-semibold shrink-0"
            >
              Enquire Now &rarr;
            </a>
          </div>
        )}

        {/* 2-Column Split: Editorial & 3D Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dewas Location & Academic Tagline (Unboxed Metadata) */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[#8BD9FF] tracking-wide">
              <span className="flex items-center gap-1.5 bg-[#0F2D5F]/80 px-3 py-1 rounded-full border border-[#38BDF8]/20">
                <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                Mukherjee Nagar, Dewas, Madhya Pradesh
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">Under Swapnil Sir's Mentorship</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] text-balance">
              {config.heroHeading}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {config.heroSubheading}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#145DFF] to-[#0284C7] hover:from-[#1d4ed8] hover:to-[#0369a1] rounded-xl shadow-xl shadow-[#145DFF]/30 hover:shadow-[#38BDF8]/40 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Admission Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#0F2D5F]/70 hover:bg-[#145DFF]/20 border border-[#38BDF8]/30 rounded-xl transition-all flex items-center gap-2"
              >
                Explore Courses
              </a>

              <a
                href="https://wa.me/919752804711?text=Hello%20Swapnil%20Sir,%20I%20would%20like%20to%20enquire%20about%20admissions%20at%20V.G%20TUTORIAL%20DEWAS."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 rounded-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Swapnil Sir</span>
              </a>
            </div>

            {/* Trust badge note */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Dedicated offline coaching center · Personal doubt-clearing sessions</span>
            </div>
          </div>

          {/* Right Column: Proud Smiling Student with Backpack & Institute Features */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl glass-card overflow-hidden p-2 group">
              {/* Proud Student Photo Container */}
              <div className="relative w-full h-[420px] sm:h-[460px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0F2D5F] to-[#07152F]">
                <img
                  src="/src/assets/images/student_smiling_backpack_1792662905964.jpg"
                  alt="Student wearing backpack and smiling proudly at V.G TUTORIAL DEWAS"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle blue gradient overlay scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/25 to-transparent opacity-85" />

                {/* Top floating trust badge */}
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-[#07152F]/85 backdrop-blur-md border border-[#38BDF8]/30 shadow-lg flex items-center gap-1.5 text-xs font-bold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Student Success Mindset</span>
                </div>

                {/* Bottom floating achievement & guidance badge */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#07152F]/90 backdrop-blur-md border border-[#38BDF8]/25 shadow-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                      V.G TUTORIAL DEWAS
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-semibold">
                      Concept Mastery
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    Confident Preparation with Swapnil Sir
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Structured syllabus coverage, disciplined study routines, and individual doubt support.
                  </p>
                </div>
              </div>

              {/* Classroom Link Footer Tag */}
              <div className="mt-2 p-3 rounded-xl bg-[#07152F]/70 border border-slate-700/50 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#38BDF8]/30">
                  <img
                    src="/src/assets/images/hero_classroom_learning_1792662029624.jpg"
                    alt="V.G TUTORIAL DEWAS Modern Classroom"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">Mukherjee Nagar Learning Center</h4>
                  <p className="text-[11px] text-slate-300 truncate">Equipped with digital presentation & doubt boards</p>
                </div>
                <a
                  href="#gallery"
                  className="text-xs text-[#38BDF8] font-semibold hover:underline shrink-0"
                >
                  View Tour
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI/Proof Strip (Strictly formatted per Frontend Design spatial rules) */}
        <div className="mt-14 pt-8 border-t border-[#38BDF8]/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-[#0F2D5F]/35 border border-[#38BDF8]/15">
            <span className="block text-xs text-slate-400 font-medium">Location</span>
            <span className="text-base sm:text-lg font-bold text-white font-heading">
              Dewas, M.P.
            </span>
            <span className="block text-[11px] text-slate-400">Mukherjee Nagar Colony</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2D5F]/35 border border-[#38BDF8]/15">
            <span className="block text-xs text-slate-400 font-medium">Founder & Mentor</span>
            <span className="text-base sm:text-lg font-bold text-white font-heading">
              {config.founderName}
            </span>
            <span className="block text-[11px] text-slate-400">Direct Academic Mentoring</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2D5F]/35 border border-[#38BDF8]/15">
            <span className="block text-xs text-slate-400 font-medium">Public Reference</span>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">
                {config.googleReviewsCount}
              </span>
              <span className="text-xs text-[#8BD9FF] font-semibold">Google Reviews</span>
            </div>
            <span className="block text-[10px] text-slate-500">(Reference only)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0F2D5F]/35 border border-[#38BDF8]/15">
            <span className="block text-xs text-slate-400 font-medium">Pedagogy</span>
            <span className="text-base sm:text-lg font-bold text-white font-heading">
              Concept-First
            </span>
            <span className="block text-[11px] text-slate-400">No Rote Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
};
