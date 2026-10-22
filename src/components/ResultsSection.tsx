import React from 'react';
import { VerifiedAchievement } from '../types';
import { Award, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ResultsSectionProps {
  achievements: VerifiedAchievement[];
  onOpenEnquiry: () => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ achievements, onOpenEnquiry }) => {
  return (
    <section id="results" className="py-20 sm:py-24 bg-gradient-to-b from-[#07152F] via-[#091E44] to-[#07152F] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Integrity</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Results & Verified Achievements
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            We maintain strict academic transparency. Only independently verified examination scores and student achievements are published here with parental consent.
          </p>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.id}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#145DFF]/30 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {item.academicYear}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {item.studentName}
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-semibold mt-0.5">
                    {item.exam}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/20 text-center">
                  <span className="text-[11px] text-slate-400 block">Verified Score / Rank</span>
                  <span className="text-xl font-extrabold text-white font-heading">
                    {item.rankOrMarks}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Institute Record</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Attractive verified placeholder per instructions */
          <div className="max-w-2xl mx-auto rounded-2xl glass-card border border-[#38BDF8]/25 p-8 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] p-[1px] mx-auto shadow-lg shadow-[#145DFF]/30">
              <div className="w-full h-full bg-[#07152F] rounded-[15px] flex items-center justify-center text-[#38BDF8]">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-white">
                Verified Achievements Will Be Updated Here
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                In adherence to our strict academic standards, V.G TUTORIAL DEWAS never manufactures unverified ranks, toppers, or scores. Official student results will be posted here directly after board and entrance examination score verification.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0F2D5F]/50 border border-slate-700/60 flex items-center justify-center gap-2 text-xs text-[#8BD9FF]">
              <ShieldAlert className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>Current enrolled students can track their internal weekly test scores inside the Student Portal.</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg shadow-md transition-all cursor-pointer"
              >
                Join the Current Academic Batch
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
