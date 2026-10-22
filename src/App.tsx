/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import {
  WebsiteConfig,
  Course,
  Student,
  Enquiry,
  StudyMaterial,
  TestItem,
  StudentResult,
  Announcement,
  FacultyMember,
  VerifiedAchievement,
  TestimonialItem,
  GalleryItem,
  DoubtQuery,
  AuditLog
} from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustHighlights } from './components/TrustHighlights';
import { AboutSection } from './components/AboutSection';
import { CoursesSection } from './components/CoursesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FacultySection } from './components/FacultySection';
import { ResultsSection } from './components/ResultsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { EnquirySection } from './components/EnquirySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'student' | 'admin'>('home');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<string>('');

  // Persistent Application State
  const [config, setConfig] = useState<WebsiteConfig>(StorageService.getWebsiteConfig());
  const [courses, setCourses] = useState<Course[]>(StorageService.getCourses());
  const [students, setStudents] = useState<Student[]>(StorageService.getStudents());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(StorageService.getEnquiries());
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(StorageService.getStudyMaterials());
  const [tests, setTests] = useState<TestItem[]>(StorageService.getTests());
  const [results, setResults] = useState<StudentResult[]>(StorageService.getResults());
  const [announcements, setAnnouncements] = useState<Announcement[]>(StorageService.getAnnouncements());
  const [faculty, setFaculty] = useState<FacultyMember[]>(StorageService.getFaculty());
  const [achievements, setAchievements] = useState<VerifiedAchievement[]>(StorageService.getAchievements());
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(StorageService.getTestimonials());
  const [gallery, setGallery] = useState<GalleryItem[]>(StorageService.getGallery());
  const [doubts, setDoubts] = useState<DoubtQuery[]>(StorageService.getDoubts());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(StorageService.getAuditLogs());

  // Function to refresh state from storage
  const refreshAllData = () => {
    setConfig(StorageService.getWebsiteConfig());
    setCourses(StorageService.getCourses());
    setStudents(StorageService.getStudents());
    setEnquiries(StorageService.getEnquiries());
    setStudyMaterials(StorageService.getStudyMaterials());
    setTests(StorageService.getTests());
    setResults(StorageService.getResults());
    setAnnouncements(StorageService.getAnnouncements());
    setFaculty(StorageService.getFaculty());
    setAchievements(StorageService.getAchievements());
    setTestimonials(StorageService.getTestimonials());
    setGallery(StorageService.getGallery());
    setDoubts(StorageService.getDoubts());
    setAuditLogs(StorageService.getAuditLogs());
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleOpenCourseEnquiry = (courseName: string) => {
    setSelectedCourseForEnquiry(courseName);
    setIsEnquiryModalOpen(true);
  };

  // Render Student Portal view
  if (currentView === 'student') {
    return (
      <StudentPortal
        students={students}
        courses={courses}
        studyMaterials={studyMaterials}
        tests={tests}
        results={results}
        announcements={announcements}
        doubts={doubts}
        onBackToWebsite={() => setCurrentView('home')}
        onRefreshData={refreshAllData}
      />
    );
  }

  // Render Admin Portal view
  if (currentView === 'admin') {
    return (
      <AdminPortal
        config={config}
        courses={courses}
        students={students}
        enquiries={enquiries}
        studyMaterials={studyMaterials}
        tests={tests}
        results={results}
        announcements={announcements}
        faculty={faculty}
        achievements={achievements}
        testimonials={testimonials}
        doubts={doubts}
        auditLogs={auditLogs}
        onBackToWebsite={() => setCurrentView('home')}
        onRefreshData={refreshAllData}
      />
    );
  }

  // Render Main Public Website
  return (
    <div className="min-h-screen bg-[#07152F] text-slate-100 flex flex-col font-sans selection:bg-[#145DFF] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenEnquiry={() => {
          setSelectedCourseForEnquiry('');
          setIsEnquiryModalOpen(true);
        }}
        onOpenStudentPortal={() => setCurrentView('student')}
        onOpenAdminPortal={() => setCurrentView('admin')}
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          config={config}
          onOpenEnquiry={() => {
            setSelectedCourseForEnquiry('');
            setIsEnquiryModalOpen(true);
          }}
        />

        <TrustHighlights />

        <AboutSection
          config={config}
          onOpenEnquiry={() => {
            setSelectedCourseForEnquiry('');
            setIsEnquiryModalOpen(true);
          }}
        />

        <CoursesSection
          courses={courses}
          onSelectCourseEnquiry={handleOpenCourseEnquiry}
        />

        <WhyChooseUs />

        <FacultySection
          faculty={faculty}
          onOpenEnquiry={() => {
            setSelectedCourseForEnquiry('');
            setIsEnquiryModalOpen(true);
          }}
        />

        <ResultsSection
          achievements={achievements}
          onOpenEnquiry={() => {
            setSelectedCourseForEnquiry('');
            setIsEnquiryModalOpen(true);
          }}
        />

        <TestimonialsSection
          testimonials={testimonials}
          googleReviewsCount={config.googleReviewsCount}
        />

        <GallerySection gallery={gallery} />

        <EnquirySection
          courses={courses}
          prefilledCourse={selectedCourseForEnquiry}
          onEnquirySuccess={refreshAllData}
        />

        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        courses={courses}
        onOpenStudentPortal={() => setCurrentView('student')}
        onOpenAdminPortal={() => setCurrentView('admin')}
        onOpenEnquiry={() => {
          setSelectedCourseForEnquiry('');
          setIsEnquiryModalOpen(true);
        }}
      />

      {/* Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        courses={courses}
        prefilledCourse={selectedCourseForEnquiry}
        onEnquirySuccess={() => {
          refreshAllData();
          setIsEnquiryModalOpen(false);
        }}
      />
    </div>
  );
}
