import React from 'react';
import { WebsiteConfig } from '../types';
import { Target, Eye, Sparkles, CheckCircle2, User } from 'lucide-react';

interface AboutSectionProps {
  config: WebsiteConfig;
  onOpenEnquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenEnquiry }) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-gradient-to-b from-[#07152F] via-[#091D42] to-[#07152F] border-t border-b border-[#38BDF8]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Photos & Swapnil Sir Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Center Photograph Container */}
            <div className="relative rounded-2xl glass-card overflow-hidden p-2">
              <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
                <img
                  src="/src/assets/images/institute_counseling_hall_1792662030713.jpg"
                  alt="V.G TUTORIAL DEWAS Academic Mentoring"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[#07152F]/85 backdrop-blur-md border border-[#38BDF8]/20">
                  <span className="text-[11px] font-semibold text-[#38BDF8] uppercase tracking-wider block">Dewas Learning Hub</span>
                  <p className="text-xs text-white font-medium">Mukherjee Nagar, Dewas (M.P.)</p>
                </div>
              </div>
            </div>

            {/* Founder Profile Card */}
            <div className="p-5 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/25 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] flex items-center justify-center text-white shrink-0 shadow-md">
                <User className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-white text-base">{config.founderName}</h4>
                  <span className="text-[10px] bg-[#145DFF]/40 text-[#8BD9FF] px-2 py-0.5 rounded border border-[#38BDF8]/30 font-semibold">Founder & Lead Mentor</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Committed to nurturing mathematical clarity, physics principles, and structured study discipline for students across Dewas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision, Teaching Methodology */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Our Institute</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empowering Students with Conceptual Depth & Academic Clarity
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {config.aboutIntro}
              </p>
            </div>

            {/* Philosophy Box */}
            <div className="p-5 rounded-xl bg-[#07152F]/80 border border-slate-700/60 space-y-2">
              <h3 className="font-heading font-bold text-sm text-[#8BD9FF] uppercase tracking-wide">
                Our Teaching Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {config.teachingPhilosophy}
              </p>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20 space-y-2">
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Target className="w-4 h-4" />
                  <h4 className="font-heading font-bold text-sm text-white">Our Mission</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {config.mission}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20 space-y-2">
                <div className="flex items-center gap-2 text-[#38BDF8]">
                  <Eye className="w-4 h-4" />
                  <h4 className="font-heading font-bold text-sm text-white">Our Vision</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {config.vision}
                </p>
              </div>
            </div>

            {/* Methodology Checkpoints */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Small, dedicated batch sizes to guarantee individual attention.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Weekly progress monitoring and timely parent communication.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Open-door doubt sessions before every school and board examination.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg shadow-md transition-all cursor-pointer"
              >
                Schedule Center Visit or Counseling
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
