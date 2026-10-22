import React, { useState } from 'react';
import { Course } from '../types';
import { BookOpen, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface CoursesSectionProps {
  courses: Course[];
  onSelectCourseEnquiry: (courseName: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onSelectCourseEnquiry }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'foundation' | 'senior' | 'mentorship'>('all');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const publishedCourses = courses.filter(c => c.isPublished);

  const filteredCourses = publishedCourses.filter(c => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'foundation') return c.targetExamOrClass.toLowerCase().includes('9th') || c.targetExamOrClass.toLowerCase().includes('10th');
    if (selectedFilter === 'senior') return c.targetExamOrClass.toLowerCase().includes('11th') || c.targetExamOrClass.toLowerCase().includes('12th');
    if (selectedFilter === 'mentorship') return c.name.toLowerCase().includes('mentorship') || c.teachingMode === 'Doubt Mentorship';
    return true;
  });

  return (
    <section id="courses" className="py-20 sm:py-24 bg-[#07152F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] tracking-widest uppercase mb-2">
              <span>Academic Programs</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Structured Batches & Courses
            </h2>
            <p className="mt-2 text-slate-300 text-sm max-w-xl">
              Thorough concept preparation, NCERT mastery, and problem-solving modules led by Swapnil Sir at our Dewas center.
            </p>
          </div>

          {/* Filter segment tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/20 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#145DFF] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              All Batches
            </button>
            <button
              onClick={() => setSelectedFilter('foundation')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'foundation'
                  ? 'bg-[#145DFF] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Class 9th & 10th
            </button>
            <button
              onClick={() => setSelectedFilter('senior')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'senior'
                  ? 'bg-[#145DFF] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Class 11th & 12th
            </button>
            <button
              onClick={() => setSelectedFilter('mentorship')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === 'mentorship'
                  ? 'bg-[#145DFF] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Doubt Mentorship
            </button>
          </div>
        </div>

        {/* 3D Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group relative"
            >
              {/* Course Top Media with 3D Scrim */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={course.image || '/src/assets/images/course_academic_physics_math_1792662029986.jpg'}
                  alt={course.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/40 to-transparent" />

                {/* Target badge overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#07152F]/90 backdrop-blur-md border border-[#38BDF8]/30 text-[11px] font-bold text-[#8BD9FF]">
                  {course.targetExamOrClass}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-[#8BD9FF]">
                    <MapPin className="w-3.5 h-3.5" />
                    {course.teachingMode}
                  </span>
                </div>
              </div>

              {/* Course Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#8BD9FF] transition-colors leading-snug">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Subject tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 font-medium block">Subjects Covered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#0F2D5F]/80 text-[#8BD9FF] border border-[#38BDF8]/20"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key features bullets */}
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  {course.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Fee and Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fee Schedule</span>
                    <span className="text-[11px] font-semibold text-slate-200">
                      {course.feesPlaceholder}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalCourse(course)}
                      className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-[#38BDF8]/50 rounded-lg cursor-pointer transition-colors"
                      title="View Details"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onSelectCourseEnquiry(course.name)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg shadow transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Course Details */}
        {activeModalCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="relative w-full max-w-xl rounded-2xl glass-card bg-[#07152F] border border-[#38BDF8]/30 p-6 sm:p-8 space-y-5 text-white max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#38BDF8] tracking-wider uppercase block">
                    {activeModalCourse.targetExamOrClass}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white mt-1">
                    {activeModalCourse.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalCourse.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0F2D5F]/50 border border-slate-700/60 text-xs">
                <div>
                  <span className="text-slate-400 block">Duration</span>
                  <span className="font-semibold text-white">{activeModalCourse.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Teaching Mode</span>
                  <span className="font-semibold text-white">{activeModalCourse.teachingMode}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#8BD9FF] uppercase tracking-wider">
                  Subjects Included
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalCourse.subjects.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-md bg-[#145DFF]/20 text-[#8BD9FF] border border-[#38BDF8]/30 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#8BD9FF] uppercase tracking-wider">
                  Curriculum Highlights
                </h4>
                <ul className="space-y-2">
                  {activeModalCourse.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Fee Information: </span>
                <span>{activeModalCourse.feesPlaceholder} (Transparent fee structure with batch schedule provided during center visit).</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = activeModalCourse.name;
                    setActiveModalCourse(null);
                    onSelectCourseEnquiry(name);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg shadow-md cursor-pointer"
                >
                  Enquire for this Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
