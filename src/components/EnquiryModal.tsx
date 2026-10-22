import React from 'react';
import { Course } from '../types';
import { EnquirySection } from './EnquirySection';
import { X } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  prefilledCourse?: string;
  onEnquirySuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  courses,
  prefilledCourse,
  onEnquirySuccess
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <EnquirySection
          courses={courses}
          prefilledCourse={prefilledCourse}
          onEnquirySuccess={onEnquirySuccess}
        />
      </div>
    </div>
  );
};
