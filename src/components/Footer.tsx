import React, { useState } from 'react';
import { WebsiteConfig, Course } from '../types';
import { MapPin, Phone, GraduationCap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  config: WebsiteConfig;
  courses: Course[];
  onOpenStudentPortal: () => void;
  onOpenAdminPortal: () => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  courses,
  onOpenStudentPortal,
  onOpenAdminPortal,
  onOpenEnquiry
}) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040D1D] text-slate-400 border-t border-[#38BDF8]/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Institute Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] p-[1.5px] shadow-lg">
                <div className="w-full h-full bg-[#07152F] rounded-[10px] flex items-center justify-center text-[#38BDF8] font-black text-sm">
                  VG
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                  {config.instituteName}
                </span>
                <span className="text-xs text-[#8BD9FF]/80 font-medium">
                  Guided by {config.founderName}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier academic coaching center in Dewas, Madhya Pradesh. Specializing in concept-first fundamentals, small batches, and personal doubt resolution.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenStudentPortal}
                className="px-3 py-1.5 rounded-lg bg-[#0F2D5F] hover:bg-[#145DFF] text-white text-xs font-semibold border border-[#38BDF8]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Student Portal</span>
              </button>

              <button
                onClick={onOpenAdminPortal}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-[#38BDF8] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#38BDF8] transition-colors">
                  Our Courses
                </a>
              </li>
              <li>
                <a href="#faculty" className="hover:text-[#38BDF8] transition-colors">
                  Faculty Mentors
                </a>
              </li>
              <li>
                <a href="#results" className="hover:text-[#38BDF8] transition-colors">
                  Verified Results
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#38BDF8] transition-colors">
                  Classroom Tour
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#38BDF8] transition-colors">
                  Center Location
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Academic Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {courses.slice(0, 4).map(c => (
                <li key={c.id}>
                  <a href="#courses" className="hover:text-[#38BDF8] transition-colors line-clamp-1">
                    {c.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenEnquiry}
                  className="text-[#38BDF8] hover:underline font-semibold text-xs cursor-pointer"
                >
                  Request Admission Info &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Center Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Dewas Center
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{config.address}, {config.city}, {config.state} {config.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <a href={`tel:${config.phone.replace(/\s+/g, '')}`} className="text-white hover:text-[#38BDF8]">
                  {config.phone}
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                {config.openingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {config.instituteName}. All rights reserved. Dewas, Madhya Pradesh, India.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy / Terms Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 sm:p-8 max-w-xl w-full text-white space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-white">
                {activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <button
                onClick={() => setActiveLegalModal(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {activeLegalModal === 'privacy' ? (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  V.G TUTORIAL DEWAS values your privacy. We collect personal student and parent information solely for academic administration, progress reporting, test announcements, and admission counseling.
                </p>
                <p>
                  We do not sell, rent, or distribute personal data to third parties. Contact numbers provided during enquiry are used strictly to coordinate batch details with Swapnil Sir.
                </p>
                <p>
                  Enrolled students have access to their own private academic records, test marks, and attendance reports within the secure Student Portal.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  Welcome to V.G TUTORIAL DEWAS. By enrolling in courses or using this web portal, students and guardians agree to maintain academic integrity, punctuality, and classroom discipline.
                </p>
                <p>
                  Study materials, notes, and problem sets distributed by Swapnil Sir are for authorized educational use by enrolled students only. Unauthorized digital redistribution is prohibited.
                </p>
                <p>
                  For batch rescheduling or medical leave, please notify the center at least 24 hours in advance.
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 text-xs font-semibold bg-[#145DFF] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
