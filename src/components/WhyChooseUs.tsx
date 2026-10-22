import React from 'react';
import { Lightbulb, Layers, RefreshCw, HelpCircle, TrendingUp, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Lightbulb,
      title: "Crystal-Clear Concepts",
      desc: "We prioritize foundational logic and step-by-step mathematical reasoning so students understand the 'why' behind every theorem and formula."
    },
    {
      icon: Layers,
      title: "Structured Learning Framework",
      desc: "Systematic chapter progression with sequential difficulty scaling from basic NCERT definitions to advanced application questions."
    },
    {
      icon: RefreshCw,
      title: "Consistent Practice & Revision",
      desc: "Weekly chapter summaries, timed simulation drills, and revision cycles ensure that previously learned topics stay fresh in memory."
    },
    {
      icon: HelpCircle,
      title: "Zero-Hesitation Doubt Support",
      desc: "Daily dedicated doubt clinics where students can openly discuss misunderstandings without judgment until concepts are firmly resolved."
    },
    {
      icon: TrendingUp,
      title: "Objective Progress Monitoring",
      desc: "Periodic written tests with detailed feedback sheets, identifying strengths and pin-pointing exact calculation errors."
    },
    {
      icon: HeartHandshake,
      title: "Supportive Learning Atmosphere",
      desc: "A positive, disciplined classroom environment focused on motivation, reducing exam stress, and cultivating academic self-belief."
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-[#07152F] via-[#081B3C] to-[#07152F] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
            <span>The V.G Advantage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Students & Parents Trust V.G TUTORIAL DEWAS
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Guiding students with proven pedagogical discipline, attentive mentoring, and rigorous preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] p-[1.5px] shadow-lg shadow-[#145DFF]/25">
                    <div className="w-full h-full bg-[#07152F] rounded-[10px] flex items-center justify-center text-[#38BDF8] group-hover:bg-[#145DFF] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#8BD9FF] transition-colors">
                    {pt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-[#38BDF8] font-mono">
                  <span>Advantage Check</span>
                  <span className="text-slate-400">P-{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
