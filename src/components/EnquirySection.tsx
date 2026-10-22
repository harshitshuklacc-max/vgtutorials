import React, { useState } from 'react';
import { Course } from '../types';
import { StorageService } from '../services/storage';
import { Send, PhoneCall, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface EnquirySectionProps {
  courses: Course[];
  prefilledCourse?: string;
  onEnquirySuccess?: () => void;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({
  courses,
  prefilledCourse = '',
  onEnquirySuccess
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    courseInterest: prefilledCourse || (courses[0]?.name || 'Foundation Mathematics & Science (Class 9th & 10th)'),
    preferredTime: 'Evening (5:00 PM - 7:30 PM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.studentName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter both student name and a valid phone number.');
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      studentName: formData.studentName.trim(),
      parentName: formData.parentName.trim() || 'Parent/Guardian',
      phone: formData.phone.trim(),
      courseInterest: formData.courseInterest,
      preferredTime: formData.preferredTime,
      message: formData.message.trim(),
      createdAt: new Date().toISOString(),
      status: 'New' as const,
      notes: ['Direct web inquiry submitted.']
    };

    const existing = StorageService.getEnquiries();
    StorageService.saveEnquiries([newEnquiry, ...existing]);
    StorageService.logAuditAction('New Enquiry Submitted', 'Website Visitor', `Enquiry from ${formData.studentName} (${formData.phone}) for ${formData.courseInterest}`);

    setSubmitted(true);
    if (onEnquirySuccess) onEnquirySuccess();
  };

  return (
    <section id="enquire" className="py-20 sm:py-24 bg-[#07152F] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-[#38BDF8]/25">
          {/* Subtle ambient gradient backdrops */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#145DFF]/20 via-transparent to-transparent pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#38BDF8] tracking-widest uppercase block mb-1">
              Admissions & Counseling
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Begin Your Learning Journey with Us
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              Submit your inquiry below or contact Swapnil Sir directly to schedule a personal batch assessment at our Dewas center.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#0F2D5F]/80 border border-emerald-500/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Enquiry Successfully Registered!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reaching out to V.G TUTORIAL DEWAS. Swapnil Sir or our center coordinator will contact you at <strong className="text-white">{formData.phone}</strong> during your preferred time slot ({formData.preferredTime}).
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://wa.me/919752804711?text=Hello%20Swapnil%20Sir,%20I%20have%20submitted%20an%20enquiry%20for%20${encodeURIComponent(formData.studentName)}%20for%20${encodeURIComponent(formData.courseInterest)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Swapnil Sir on WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      studentName: '',
                      parentName: '',
                      phone: '',
                      courseInterest: courses[0]?.name || '',
                      preferredTime: 'Evening (5:00 PM - 7:30 PM)',
                      message: ''
                    });
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Student Full Name <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Aman Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Mobile Number <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 97528 04711"
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Course / Class of Interest
                  </label>
                  <select
                    value={formData.courseInterest}
                    onChange={e => setFormData({ ...formData, courseInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white outline-none transition-all"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name} className="bg-[#07152F] text-white">
                        {c.name}
                      </option>
                    ))}
                    <option value="General Academic Counseling" className="bg-[#07152F] text-white">
                      General Academic Counseling
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Preferred Contact Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white outline-none transition-all"
                  >
                    <option value="Morning (9:00 AM - 12:00 PM)" className="bg-[#07152F] text-white">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)" className="bg-[#07152F] text-white">Afternoon (1:00 PM - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 7:30 PM)" className="bg-[#07152F] text-white">Evening (5:00 PM - 7:30 PM)</option>
                    <option value="Anytime Convenient" className="bg-[#07152F] text-white">Anytime Convenient</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-200">
                    Specific Learning Goal or Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Board exam revision, weak in trigonometry"
                    className="w-full px-4 py-3 rounded-xl bg-[#07152F] border border-slate-700 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Privacy and Consent Note */}
              <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>
                  We respect student privacy. Contact information is strictly used for V.G TUTORIAL DEWAS academic counseling and is never shared with third parties.
                </span>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#145DFF] to-[#0284C7] hover:from-[#1d4ed8] hover:to-[#0369a1] rounded-xl shadow-lg shadow-[#145DFF]/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Admission Enquiry</span>
                </button>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <a
                    href="tel:+919752804711"
                    className="flex items-center gap-1.5 text-slate-300 hover:text-[#38BDF8] transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Call: +91 97528 04711</span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
