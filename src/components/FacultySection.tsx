import React from 'react';
import { FacultyMember } from '../types';
import { User, Award, BookOpen, Clock } from 'lucide-react';

interface FacultySectionProps {
  faculty: FacultyMember[];
  onOpenEnquiry: () => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ faculty, onOpenEnquiry }) => {
  return (
    <section id="faculty" className="py-20 sm:py-24 bg-[#07152F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
            <span>Academic Leadership</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet the Mentors Behind Your Success
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Dedicated educators with strong subject grasp, committed to inspiring clarity and academic discipline in Dewas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="space-y-5">
                {/* Header profile lockup */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] p-[1.5px] shrink-0 shadow-lg shadow-[#145DFF]/25">
                    <div className="w-full h-full bg-[#07152F] rounded-[14px] flex items-center justify-center text-[#38BDF8] group-hover:bg-[#145DFF] group-hover:text-white transition-all">
                      <User className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#8BD9FF] transition-colors">
                        {member.name}
                      </h3>
                      {member.isFounder && (
                        <span className="text-[10px] bg-[#145DFF]/30 text-[#8BD9FF] border border-[#38BDF8]/30 px-2 py-0.5 rounded font-bold">
                          Founder
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#38BDF8] mt-0.5">
                      {member.designation}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Qualification badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F2D5F]/60 border border-slate-700/60 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-[#38BDF8] shrink-0" />
                  <span className="font-medium">{member.qualification}</span>
                </div>

                {/* Short Intro */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {member.shortIntro}
                </p>

                {/* Subjects Handled */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                    Specialized Subjects:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#145DFF]/20 text-[#8BD9FF] border border-[#38BDF8]/20 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Available at Dewas Center</span>
                <button
                  onClick={onOpenEnquiry}
                  className="text-xs font-bold text-[#38BDF8] hover:text-white hover:underline cursor-pointer"
                >
                  Book Academic Counseling &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
