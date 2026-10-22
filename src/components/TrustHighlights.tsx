import React from 'react';
import { Compass, BookOpen, Users, ClipboardCheck, LifeBuoy, UserCheck } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Compass,
      title: "Experienced Guidance",
      description: "Direct mentorship and academic supervision under Swapnil Sir, cultivating disciplined study habits and exam confidence."
    },
    {
      icon: BookOpen,
      title: "Concept-Based Learning",
      description: "Emphasis on core fundamentals and derivation logic rather than mechanical memorization of formulas."
    },
    {
      icon: Users,
      title: "Student-Focused Teaching",
      description: "Carefully paced lecture delivery tailored to student comprehension levels with interactive classroom engagement."
    },
    {
      icon: ClipboardCheck,
      title: "Regular Practice",
      description: "Structured daily practice problem sheets (DPPs) and weekly checkpoint tests to reinforce retention."
    },
    {
      icon: LifeBuoy,
      title: "Academic Support",
      description: "Dedicated doubt-clearing sessions allowing students to ask questions freely without hesitation."
    },
    {
      icon: UserCheck,
      title: "Personal Attention",
      description: "Controlled batch sizes so every student's individual progress, strengths, and areas of improvement are monitored."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#07152F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
            <span>Institute Pillars</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Core Teaching Philosophy
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Every batch at V.G TUTORIAL DEWAS is anchored in systematic learning disciplines designed to build confident, independent thinkers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 sm:p-7 rounded-2xl relative overflow-hidden group"
              >
                {/* 3D Glass Light reflection beam */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#38BDF8]/10 via-transparent to-transparent pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#0284C7] p-[1px] mb-5 shadow-lg shadow-[#145DFF]/25">
                  <div className="w-full h-full bg-[#07152F] rounded-[11px] flex items-center justify-center text-[#38BDF8] group-hover:text-white group-hover:bg-[#145DFF] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-[#8BD9FF] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-[#38BDF8]/80 font-medium">
                  <span>V.G TUTORIAL Pillar</span>
                  <span className="font-mono tabular-nums">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
