import React, { useState } from 'react';
import { Menu, X, GraduationCap, ShieldCheck, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
  onOpenStudentPortal: () => void;
  onOpenAdminPortal: () => void;
  currentView: 'home' | 'student' | 'admin';
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnquiry,
  onOpenStudentPortal,
  onOpenAdminPortal,
  currentView,
  onNavigateHome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-[#38BDF8]/20 bg-[#07152F]/85 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={onNavigateHome}
          className="text-left flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] rounded-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] p-[1.5px] shadow-lg shadow-[#145DFF]/30 group-hover:shadow-[#38BDF8]/40 transition-shadow">
            <div className="w-full h-full bg-[#07152F] rounded-[10px] flex items-center justify-center text-[#38BDF8] font-black text-sm tracking-tighter">
              VG
            </div>
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-[#8BD9FF] transition-colors">
              V.G TUTORIAL DEWAS
            </span>
            <span className="block text-[11px] text-[#8BD9FF]/70 tracking-wide font-medium">
              Swapnil Sir · Dewas (M.P.)
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (single-line text) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#about"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            About Us
          </a>
          <a
            href="#courses"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Courses
          </a>
          <a
            href="#faculty"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Faculty
          </a>
          <a
            href="#results"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Results
          </a>
          <a
            href="#gallery"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Gallery
          </a>
          <a
            href="#contact"
            onClick={() => currentView !== 'home' && onNavigateHome()}
            className="hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Action & Quick Mode Switchers */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenStudentPortal}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
              currentView === 'student'
                ? 'bg-[#145DFF] text-white border-[#38BDF8]'
                : 'text-slate-300 bg-slate-900/60 border-slate-700/60 hover:border-[#38BDF8]/50 hover:text-white'
            }`}
            title="Open Student Dashboard"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={onOpenAdminPortal}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
              currentView === 'admin'
                ? 'bg-[#1E3A8A] text-white border-[#38BDF8]'
                : 'text-slate-400 bg-slate-900/30 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Staff / Admin Dashboard"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Admin</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#145DFF] to-[#0284C7] hover:from-[#1d4ed8] hover:to-[#0369a1] rounded-lg shadow-md shadow-[#145DFF]/25 hover:shadow-[#145DFF]/40 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Enroll Now</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenEnquiry}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#145DFF] rounded-lg"
          >
            Enroll
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#38BDF8]/20 bg-[#07152F] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-200">
            <a
              href="#about"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              About Us
            </a>
            <a
              href="#courses"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              Courses
            </a>
            <a
              href="#faculty"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              Faculty
            </a>
            <a
              href="#results"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              Results & Achievements
            </a>
            <a
              href="#gallery"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') onNavigateHome();
              }}
              className="px-3 py-2 rounded-md hover:bg-slate-800/80"
            >
              Contact & Location
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-slate-800 text-white border border-slate-700"
            >
              <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
              Student Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminPortal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              Admin Portal
            </button>
            <a
              href="tel:+919752804711"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg bg-[#145DFF] text-white"
            >
              <PhoneCall className="w-4 h-4" />
              Call +91 97528 04711
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
