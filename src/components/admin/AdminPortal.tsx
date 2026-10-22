import React, { useState } from 'react';
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
  DoubtQuery,
  AuditLog
} from '../../types';
import { StorageService } from '../../services/storage';
import {
  ShieldCheck,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  Award,
  Globe,
  Bell,
  Activity,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
  CheckCircle,
  Clock,
  ArrowLeft,
  Save,
  Check,
  HelpCircle
} from 'lucide-react';

interface AdminPortalProps {
  config: WebsiteConfig;
  courses: Course[];
  students: Student[];
  enquiries: Enquiry[];
  studyMaterials: StudyMaterial[];
  tests: TestItem[];
  results: StudentResult[];
  announcements: Announcement[];
  faculty: FacultyMember[];
  achievements: VerifiedAchievement[];
  testimonials: TestimonialItem[];
  doubts: DoubtQuery[];
  auditLogs: AuditLog[];
  onBackToWebsite: () => void;
  onRefreshData: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  config,
  courses,
  students,
  enquiries,
  studyMaterials,
  tests,
  results,
  announcements,
  faculty,
  achievements,
  testimonials,
  doubts,
  auditLogs,
  onBackToWebsite,
  onRefreshData
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'students' | 'courses' | 'enquiries' | 'materials' | 'tests' | 'cms' | 'notices' | 'doubts' | 'audit'
  >('dashboard');

  // Search & Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [enquiryFilterStatus, setEnquiryFilterStatus] = useState<string>('All');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Modals & form states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    batch: 'Class 10th - Morning Batch A',
    courseId: courses[0]?.id || ''
  });

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    targetExamOrClass: '',
    subjects: 'Mathematics, Physics',
    duration: '10 Months',
    teachingMode: 'Offline Classroom' as const,
    description: '',
    feesPlaceholder: 'Contact Institute for Batch Timings & Fee Schedule'
  });

  const [showAddMaterialModal, setShowAddMaterialModal] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    courseId: courses[0]?.id || 'course-1',
    subject: 'Mathematics',
    type: 'PDF Notes' as const,
    fileSize: '2.5 MB',
    description: ''
  });

  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [newTest, setNewTest] = useState({
    testName: '',
    courseId: courses[0]?.id || 'course-1',
    subject: 'Mathematics',
    totalMarks: 50,
    date: '2026-11-10',
    durationMinutes: 90,
    syllabus: ''
  });

  const [showAddMarksModal, setShowAddMarksModal] = useState(false);
  const [newResult, setNewResult] = useState({
    testId: tests[0]?.id || '',
    studentId: students[0]?.studentId || '',
    marksObtained: 40,
    remarks: 'Good performance.'
  });

  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    category: 'General' as const,
    targetCourseId: 'all'
  });

  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    studentName: '',
    exam: 'Class 10th Board (CBSE / MPBSE)',
    rankOrMarks: '96.4%',
    academicYear: '2025-2026',
    description: 'Verified top performer in Mathematics and Science.'
  });

  // Website Config Edit Form State
  const [cmsConfig, setCmsConfig] = useState<WebsiteConfig>({ ...config });
  const [cmsSaveNotice, setCmsSaveNotice] = useState('');

  // Doubt Reply State
  const [replyingDoubtId, setReplyingDoubtId] = useState<string | null>(null);
  const [doubtReplyText, setDoubtReplyText] = useState('');

  // CALCULATE REAL PRODUCTION METRICS
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalCourses = courses.length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const pendingFollowupsCount = enquiries.filter(e => e.status === 'Interested' || e.status === 'Contacted').length;
  const totalMaterials = studyMaterials.length;
  const upcomingTestsCount = tests.length;
  const pendingDoubtsCount = doubts.filter(d => d.status === 'Pending').length;

  // HANDLERS
  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveWebsiteConfig(cmsConfig);
    StorageService.logAuditAction('Website Content Updated', 'Swapnil Sir (Admin)', 'Modified hero text, contact, and announcement banner.');
    setCmsSaveNotice('Website content successfully updated and published!');
    setTimeout(() => setCmsSaveNotice(''), 3000);
    onRefreshData();
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) return;

    const studentIdCode = `VG-2026-0${students.length + 1}`;
    const studentObj: Student = {
      id: `stu-${Date.now()}`,
      studentId: studentIdCode,
      name: newStudent.name.trim(),
      email: `${newStudent.name.toLowerCase().replace(/\s+/g, '.')}.stu@vgtutorial.local`,
      phone: newStudent.phone.trim(),
      parentName: newStudent.parentName.trim() || 'Parent',
      parentPhone: newStudent.parentPhone.trim() || newStudent.phone.trim(),
      batch: newStudent.batch,
      courseIds: [newStudent.courseId || courses[0]?.id || 'course-1'],
      enrolledDate: new Date().toISOString().split('T')[0],
      attendancePercentage: 100,
      status: 'active'
    };

    StorageService.saveStudents([...students, studentObj]);
    StorageService.logAuditAction('Student Enrolled', 'Swapnil Sir (Admin)', `Added student ${studentObj.name} (${studentIdCode})`);
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      phone: '',
      parentName: '',
      parentPhone: '',
      batch: 'Class 10th - Morning Batch A',
      courseId: courses[0]?.id || ''
    });
    onRefreshData();
  };

  const handleToggleStudentStatus = (id: string) => {
    const updated = students.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'active' ? 'inactive' : 'active';
        StorageService.logAuditAction('Student Status Changed', 'Swapnil Sir (Admin)', `${s.name} changed to ${nextStatus}`);
        return { ...s, status: nextStatus as 'active' | 'inactive' };
      }
      return s;
    });
    StorageService.saveStudents(updated);
    onRefreshData();
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name) return;

    const courseObj: Course = {
      id: `course-${Date.now()}`,
      name: newCourse.name.trim(),
      tagline: newCourse.targetExamOrClass,
      targetExamOrClass: newCourse.targetExamOrClass.trim(),
      subjects: newCourse.subjects.split(',').map(s => s.trim()),
      duration: newCourse.duration.trim(),
      teachingMode: newCourse.teachingMode,
      description: newCourse.description.trim() || 'Comprehensive syllabus coverage with continuous assessment.',
      features: [
        'Small batch size for personalized attention',
        'Structured chapter-wise question sheets',
        'Dedicated doubt clearance clinics'
      ],
      feesPlaceholder: newCourse.feesPlaceholder.trim(),
      isPublished: true,
      order: courses.length + 1,
      image: '/src/assets/images/course_academic_physics_math_1792662029986.jpg'
    };

    StorageService.saveCourses([...courses, courseObj]);
    StorageService.logAuditAction('Course Created', 'Swapnil Sir (Admin)', `Added course: ${courseObj.name}`);
    setShowAddCourseModal(false);
    onRefreshData();
  };

  const handleToggleCoursePublish = (id: string) => {
    const updated = courses.map(c => {
      if (c.id === id) {
        const next = !c.isPublished;
        StorageService.logAuditAction('Course Publication Toggled', 'Swapnil Sir (Admin)', `${c.name}: ${next ? 'Published' : 'Hidden'}`);
        return { ...c, isPublished: next };
      }
      return c;
    });
    StorageService.saveCourses(updated);
    onRefreshData();
  };

  const handleUpdateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map(e => {
      if (e.id === id) {
        StorageService.logAuditAction('Enquiry Status Updated', 'Swapnil Sir (Admin)', `${e.studentName} updated to ${status}`);
        return { ...e, status };
      }
      return e;
    });
    StorageService.saveEnquiries(updated);
    onRefreshData();
  };

  const handleExportEnquiriesCSV = () => {
    const headers = ['ID', 'Student Name', 'Parent Name', 'Phone', 'Course Interest', 'Preferred Time', 'Status', 'Date'];
    const rows = enquiries.map(e => [
      `"${e.id}"`,
      `"${e.studentName}"`,
      `"${e.parentName}"`,
      `"${e.phone}"`,
      `"${e.courseInterest}"`,
      `"${e.preferredTime}"`,
      `"${e.status}"`,
      `"${e.createdAt}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `VG_Tutorial_Dewas_Enquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddStudyMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterial.title) return;

    const selectedCourse = courses.find(c => c.id === newMaterial.courseId);
    const matObj: StudyMaterial = {
      id: `mat-${Date.now()}`,
      title: newMaterial.title.trim(),
      courseId: newMaterial.courseId,
      courseName: selectedCourse ? selectedCourse.name : 'All Batches',
      subject: newMaterial.subject,
      type: newMaterial.type,
      fileSize: newMaterial.fileSize,
      uploadedAt: new Date().toISOString().split('T')[0],
      description: newMaterial.description.trim() || 'Official study notes compiled by Swapnil Sir.'
    };

    StorageService.saveStudyMaterials([matObj, ...studyMaterials]);
    StorageService.logAuditAction('Study Material Uploaded', 'Swapnil Sir (Admin)', `Uploaded ${matObj.title}`);
    setShowAddMaterialModal(false);
    onRefreshData();
  };

  const handleDeleteMaterial = (id: string) => {
    const filtered = studyMaterials.filter(m => m.id !== id);
    StorageService.saveStudyMaterials(filtered);
    StorageService.logAuditAction('Study Material Deleted', 'Swapnil Sir (Admin)', `Removed material ID ${id}`);
    onRefreshData();
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTest.testName) return;

    const selectedCourse = courses.find(c => c.id === newTest.courseId);
    const testObj: TestItem = {
      id: `test-${Date.now()}`,
      testName: newTest.testName.trim(),
      courseId: newTest.courseId,
      courseName: selectedCourse ? selectedCourse.name : 'General',
      subject: newTest.subject,
      totalMarks: Number(newTest.totalMarks),
      date: newTest.date,
      durationMinutes: Number(newTest.durationMinutes),
      syllabus: newTest.syllabus.trim() || 'Unit assessment',
      isPublished: true
    };

    StorageService.saveTests([...tests, testObj]);
    StorageService.logAuditAction('Test Scheduled', 'Swapnil Sir (Admin)', `Created test: ${testObj.testName}`);
    setShowAddTestModal(false);
    onRefreshData();
  };

  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.studentId === newResult.studentId);
    const targetTest = tests.find(t => t.id === newResult.testId);

    if (!targetStudent || !targetTest) return;

    const marks = Number(newResult.marksObtained);
    const percentage = Number(((marks / targetTest.totalMarks) * 100).toFixed(1));

    const resultObj: StudentResult = {
      id: `res-${Date.now()}`,
      testId: targetTest.id,
      testName: targetTest.testName,
      studentId: targetStudent.studentId,
      studentName: targetStudent.name,
      marksObtained: marks,
      totalMarks: targetTest.totalMarks,
      percentage,
      remarks: newResult.remarks.trim(),
      publishedAt: new Date().toISOString().split('T')[0]
    };

    StorageService.saveResults([resultObj, ...results]);
    StorageService.logAuditAction('Marks Published', 'Swapnil Sir (Admin)', `Published marks for ${targetStudent.name} (${marks}/${targetTest.totalMarks})`);
    setShowAddMarksModal(false);
    onRefreshData();
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title) return;

    const noticeObj: Announcement = {
      id: `ann-${Date.now()}`,
      title: newNotice.title.trim(),
      content: newNotice.content.trim(),
      category: newNotice.category,
      targetCourseId: newNotice.targetCourseId,
      date: new Date().toISOString().split('T')[0],
      isPinned: true
    };

    StorageService.saveAnnouncements([noticeObj, ...announcements]);
    StorageService.logAuditAction('Announcement Posted', 'Swapnil Sir (Admin)', `Posted: ${noticeObj.title}`);
    setShowAddNoticeModal(false);
    onRefreshData();
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievement.studentName) return;

    const achObj: VerifiedAchievement = {
      id: `ach-${Date.now()}`,
      studentName: newAchievement.studentName.trim(),
      exam: newAchievement.exam.trim(),
      rankOrMarks: newAchievement.rankOrMarks.trim(),
      academicYear: newAchievement.academicYear.trim(),
      description: newAchievement.description.trim(),
      verified: true
    };

    StorageService.saveAchievements([...achievements, achObj]);
    StorageService.logAuditAction('Verified Achievement Added', 'Swapnil Sir (Admin)', `Added ${achObj.studentName} (${achObj.rankOrMarks})`);
    setShowAddAchievementModal(false);
    onRefreshData();
  };

  const handleReplyDoubt = (doubtId: string) => {
    if (!doubtReplyText.trim()) return;

    const updated = doubts.map(d => {
      if (d.id === doubtId) {
        return {
          ...d,
          reply: doubtReplyText.trim(),
          status: 'Answered' as const
        };
      }
      return d;
    });

    StorageService.saveDoubts(updated);
    StorageService.logAuditAction('Doubt Answered', 'Swapnil Sir (Admin)', `Replied to doubt ${doubtId}`);
    setReplyingDoubtId(null);
    setDoubtReplyText('');
    onRefreshData();
  };

  // Filtered lists
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.phone.includes(studentSearch)
  );

  const filteredEnquiries = enquiries.filter(e => {
    const matchesStatus = enquiryFilterStatus === 'All' ? true : e.status === enquiryFilterStatus;
    const matchesSearch =
      e.studentName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch) ||
      e.courseInterest.toLowerCase().includes(enquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#040D1D] text-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-[#07152F]/90 backdrop-blur-md border-b border-[#38BDF8]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToWebsite}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Return to Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg text-white">
                V.G TUTORIAL DEWAS
              </span>
              <span className="text-[10px] bg-[#1E3A8A] text-[#8BD9FF] px-2 py-0.5 rounded border border-[#38BDF8]/40 font-bold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Authenticated Session: <strong>Swapnil Sir (Director / Mentor)</strong>
            </span>
          </div>
        </div>

        <button
          onClick={onBackToWebsite}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#145DFF] hover:bg-[#1d4ed8] text-white transition-colors cursor-pointer"
        >
          View Live Website
        </button>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Admin Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-3">
          <div className="glass-card p-2 rounded-2xl space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-[#38BDF8]" />
                <span>Dashboard KPI</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'enquiries' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                <span>Admission Enquiries</span>
              </div>
              {newEnquiriesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">
                  {newEnquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'students' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#38BDF8]" />
                <span>Student Management</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{totalStudents}</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'courses' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#38BDF8]" />
                <span>Course Management</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{totalCourses}</span>
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'materials' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#38BDF8]" />
                <span>Study Materials & DPPs</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'tests' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#38BDF8]" />
                <span>Tests & Marks Publishing</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('doubts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'doubts' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
                <span>Student Doubts</span>
              </div>
              {pendingDoubtsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[10px] font-bold">
                  {pendingDoubtsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'notices' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#38BDF8]" />
                <span>Announcements</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'cms' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#38BDF8]" />
                <span>Website CMS & Content</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'audit' ? 'bg-[#145DFF] text-white shadow' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>Security & Audit Logs</span>
              </div>
            </button>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: DASHBOARD KPI */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    Center Management Overview
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Real-time metrics calculated from current Dewas database records.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl cursor-pointer"
                  >
                    View Leads ({newEnquiriesCount})
                  </button>
                </div>
              </div>

              {/* 8 Real Statistical KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Total Registered</span>
                  <span className="text-3xl font-extrabold font-mono text-white block tabular-nums">
                    {totalStudents}
                  </span>
                  <span className="text-[11px] text-[#8BD9FF]">Active: {activeStudents}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">New Enquiries</span>
                  <span className="text-3xl font-extrabold font-mono text-emerald-400 block tabular-nums">
                    {newEnquiriesCount}
                  </span>
                  <span className="text-[11px] text-slate-400">Follow-ups: {pendingFollowupsCount}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Active Batches</span>
                  <span className="text-3xl font-extrabold font-mono text-white block tabular-nums">
                    {totalCourses}
                  </span>
                  <span className="text-[11px] text-[#8BD9FF]">Classes 9th–12th</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Pending Doubts</span>
                  <span className="text-3xl font-extrabold font-mono text-amber-400 block tabular-nums">
                    {pendingDoubtsCount}
                  </span>
                  <span className="text-[11px] text-slate-400">Need mentor reply</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Study Materials</span>
                  <span className="text-3xl font-extrabold font-mono text-white block tabular-nums">
                    {totalMaterials}
                  </span>
                  <span className="text-[11px] text-[#8BD9FF]">PDFs & DPPs online</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Upcoming Tests</span>
                  <span className="text-3xl font-extrabold font-mono text-sky-400 block tabular-nums">
                    {upcomingTestsCount}
                  </span>
                  <span className="text-[11px] text-slate-400">Scheduled in Dewas</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Scorecards</span>
                  <span className="text-3xl font-extrabold font-mono text-white block tabular-nums">
                    {results.length}
                  </span>
                  <span className="text-[11px] text-slate-400">Published to portal</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/50 border border-[#38BDF8]/20 space-y-1">
                  <span className="text-xs text-slate-400">Google Reviews</span>
                  <span className="text-3xl font-extrabold font-mono text-[#8BD9FF] block tabular-nums">
                    {config.googleReviewsCount}
                  </span>
                  <span className="text-[11px] text-slate-400">Reference count</span>
                </div>
              </div>

              {/* Recent Enquiries Strip */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-white">
                    Recent Admission Enquiries
                  </h4>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs text-[#38BDF8] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-800">
                  {enquiries.slice(0, 3).map(enq => (
                    <div key={enq.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">{enq.studentName}</span>
                        <span className="text-slate-400 ml-2">({enq.phone})</span>
                        <p className="text-slate-300 mt-0.5">{enq.courseInterest}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'New' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {enq.status}
                        </span>
                        <a
                          href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-[#0F2D5F] hover:bg-[#145DFF] text-white text-[11px]"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ENQUIRIES CRM */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Admission Enquiries & Leads CRM
                  </h3>
                  <p className="text-xs text-slate-300">
                    Track student leads, set follow-up dates, update status, and export to CSV.
                  </p>
                </div>

                <button
                  onClick={handleExportEnquiriesCSV}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={enquirySearch}
                    onChange={e => setEnquirySearch(e.target.value)}
                    placeholder="Search by student name, phone, or course..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0F2D5F]/60 border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {['All', 'New', 'Interested', 'Contacted', 'Enrolled', 'Closed'].map(st => (
                    <button
                      key={st}
                      onClick={() => setEnquiryFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                        enquiryFilterStatus === st ? 'bg-[#145DFF] text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enquiry Cards */}
              <div className="space-y-3">
                {filteredEnquiries.map(enq => (
                  <div key={enq.id} className="glass-card p-5 rounded-2xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-base text-white">
                            {enq.studentName}
                          </h4>
                          <span className="text-xs text-[#8BD9FF] font-mono">
                            {enq.phone}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Parent: <strong className="text-slate-200">{enq.parentName}</strong> · Preferred Time: {enq.preferredTime}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={e => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg bg-[#07152F] border border-slate-700 text-xs text-white font-semibold outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Interested">Interested</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Closed">Closed</option>
                        </select>

                        <a
                          href={`tel:${enq.phone.replace(/\D/g, '')}`}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                          title="Call Lead"
                        >
                          📞
                        </a>
                        <a
                          href={`https://wa.me/${enq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.studentName)},%20this%20is%20Swapnil%20Sir%20from%20V.G%20TUTORIAL%20DEWAS.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300"
                          title="WhatsApp Lead"
                        >
                          💬
                        </a>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#07152F] border border-slate-800 text-xs space-y-1">
                      <div className="text-slate-400">Course Interest: <strong className="text-slate-200">{enq.courseInterest}</strong></div>
                      {enq.message && <div className="text-slate-300 italic">"{enq.message}"</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT MANAGEMENT */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Student Enrollment & Accounts
                  </h3>
                  <p className="text-xs text-slate-300">
                    Add registered students, assign batches, and control portal access.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enroll New Student</span>
                </button>
              </div>

              {/* Student Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  placeholder="Search students by name, Roll ID, or phone..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0F2D5F]/60 border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                />
              </div>

              {/* Students Table / Cards */}
              <div className="glass-card rounded-2xl overflow-hidden divide-y divide-slate-800">
                {filteredStudents.map(stu => (
                  <div key={stu.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-white">{stu.name}</h4>
                        <span className="font-mono text-[11px] text-[#38BDF8] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {stu.studentId}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          stu.status === 'active' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {stu.status}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        Batch: <strong className="text-slate-200">{stu.batch}</strong> · Phone: {stu.phone}
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Parent: {stu.parentName} ({stu.parentPhone}) · Enrolled: {stu.enrolledDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Attendance</span>
                        <span className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                          {stu.attendancePercentage}%
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleStudentStatus(stu.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                          stu.status === 'active'
                            ? 'bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800'
                            : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {stu.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Course & Curriculum Management
                  </h3>
                  <p className="text-xs text-slate-300">
                    Create, modify, publish or unpublish course offerings on the website.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddCourseModal(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>

              <div className="space-y-4">
                {courses.map(crs => (
                  <div key={crs.id} className="glass-card p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-white">{crs.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          crs.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {crs.isPublished ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{crs.description}</p>
                      <div className="text-[11px] text-slate-400">
                        Target: {crs.targetExamOrClass} · Mode: {crs.teachingMode} · Duration: {crs.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleCoursePublish(crs.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                      >
                        {crs.isPublished ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: STUDY MATERIALS */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Study Notes, DPPs & PDF Uploads
                  </h3>
                  <p className="text-xs text-slate-300">
                    Publish chapter notes and problem sheets visible inside the student portal.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddMaterialModal(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Resource</span>
                </button>
              </div>

              <div className="space-y-3">
                {studyMaterials.map(mat => (
                  <div key={mat.id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{mat.title}</span>
                        <span className="text-[10px] bg-[#145DFF]/30 text-[#8BD9FF] px-2 py-0.5 rounded font-mono">
                          {mat.type}
                        </span>
                      </div>
                      <p className="text-slate-300 mt-0.5">{mat.courseName} · {mat.subject} ({mat.fileSize})</p>
                    </div>

                    <button
                      onClick={() => handleDeleteMaterial(mat.id)}
                      className="p-2 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 transition-colors"
                      title="Delete Material"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TESTS & MARKS */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Examinations & Scorecard Publishing
                  </h3>
                  <p className="text-xs text-slate-300">
                    Create center tests and enter verified marks for enrolled students.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddTestModal(true)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
                  >
                    + Schedule Test
                  </button>
                  <button
                    onClick={() => setShowAddMarksModal(true)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl cursor-pointer"
                  >
                    + Publish Student Marks
                  </button>
                </div>
              </div>

              {/* Scheduled Tests */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-sm text-slate-300">
                  Scheduled Center Tests ({tests.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tests.map(t => (
                    <div key={t.id} className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-slate-700/60 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#38BDF8]">
                        <span className="font-semibold">{t.subject}</span>
                        <span className="font-mono">{t.totalMarks} Marks · {t.date}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{t.testName}</h5>
                      <p className="text-slate-300"><strong className="text-slate-400">Syllabus:</strong> {t.syllabus}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Published Results */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="font-heading font-bold text-sm text-slate-300">
                  Published Student Results ({results.length})
                </h4>
                <div className="glass-card rounded-2xl overflow-hidden divide-y divide-slate-800 text-xs">
                  {results.map(r => (
                    <div key={r.id} className="p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-white">{r.studentName}</span>
                        <span className="text-slate-400 ml-2 font-mono">({r.studentId})</span>
                        <p className="text-slate-300">{r.testName}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                          {r.marksObtained} / {r.totalMarks} ({r.percentage}%)
                        </span>
                        <span className="block text-[11px] text-slate-400 italic">"{r.remarks}"</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DOUBTS */}
          {activeTab === 'doubts' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-heading font-bold text-xl text-white">
                  Student Doubt Inquiries ({doubts.length})
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Answer questions submitted by enrolled students directly from Swapnil Sir.
                </p>
              </div>

              <div className="space-y-4">
                {doubts.map(d => (
                  <div key={d.id} className="glass-card p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">{d.studentName}</span>
                        <span className="text-slate-400 ml-2 font-mono">({d.studentId})</span>
                        <span className="text-[#38BDF8] ml-2">· {d.subject} ({d.topic})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'Answered' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200">
                      <strong className="text-slate-400">Doubt: </strong>{d.question}
                    </p>

                    {d.reply ? (
                      <div className="p-3 rounded-xl bg-[#0F2D5F]/60 border border-slate-700/60 text-xs">
                        <strong className="text-[#8BD9FF] block">Mentor Response:</strong>
                        <p className="text-slate-300 mt-0.5">{d.reply}</p>
                      </div>
                    ) : (
                      <div className="pt-2">
                        {replyingDoubtId === d.id ? (
                          <div className="space-y-2">
                            <textarea
                              rows={3}
                              value={doubtReplyText}
                              onChange={e => setDoubtReplyText(e.target.value)}
                              placeholder="Write detailed explanation or formula step for the student..."
                              className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                            />
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleReplyDoubt(d.id)}
                                className="px-4 py-1.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg"
                              >
                                Send Reply
                              </button>
                              <button
                                onClick={() => setReplyingDoubtId(null)}
                                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setReplyingDoubtId(d.id);
                              setDoubtReplyText('');
                            }}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-lg"
                          >
                            Reply to Student
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ANNOUNCEMENTS */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Announcement Noticeboard
                  </h3>
                  <p className="text-xs text-slate-300">
                    Publish timetable changes, holiday schedules, and exam alerts to student portals.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddNoticeModal(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Announcement</span>
                </button>
              </div>

              <div className="space-y-3">
                {announcements.map(ann => (
                  <div key={ann.id} className="glass-card p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-base text-white">{ann.title}</span>
                      <span className="text-[#38BDF8] font-mono">{ann.date}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: WEBSITE CMS */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Website CMS & Content Editor
                  </h3>
                  <p className="text-xs text-slate-300">
                    Edit homepage headlines, Swapnil Sir's introduction, contact phone, and verified achievements.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddAchievementModal(true)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                  >
                    + Add Verified Achievement
                  </button>
                </div>
              </div>

              {cmsSaveNotice && (
                <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{cmsSaveNotice}</span>
                </div>
              )}

              <form onSubmit={handleSaveCMS} className="glass-card p-6 sm:p-8 rounded-2xl space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Institute Name</label>
                    <input
                      type="text"
                      value={cmsConfig.instituteName}
                      onChange={e => setCmsConfig({ ...cmsConfig, instituteName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Founder / Mentor Name</label>
                    <input
                      type="text"
                      value={cmsConfig.founderName}
                      onChange={e => setCmsConfig({ ...cmsConfig, founderName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      value={cmsConfig.phone}
                      onChange={e => setCmsConfig({ ...cmsConfig, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-semibold">Center Address</label>
                    <input
                      type="text"
                      value={cmsConfig.address}
                      onChange={e => setCmsConfig({ ...cmsConfig, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-semibold">Hero Main Heading</label>
                  <input
                    type="text"
                    value={cmsConfig.heroHeading}
                    onChange={e => setCmsConfig({ ...cmsConfig, heroHeading: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-semibold">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={cmsConfig.heroSubheading}
                    onChange={e => setCmsConfig({ ...cmsConfig, heroSubheading: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-semibold">Announcement Ticker Banner</label>
                  <input
                    type="text"
                    value={cmsConfig.announcementTicker}
                    onChange={e => setCmsConfig({ ...cmsConfig, announcementTicker: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-semibold">About Institute Text</label>
                  <textarea
                    rows={3}
                    value={cmsConfig.aboutIntro}
                    onChange={e => setCmsConfig({ ...cmsConfig, aboutIntro: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-2 cursor-pointer shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 10: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-heading font-bold text-xl text-white">
                  Security & Activity Audit Logs
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Chronological record of administrative operations, student registrations, and mark entries.
                </p>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden divide-y divide-slate-800 text-xs">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{log.action}</span>
                        <span className="text-[#38BDF8] text-[11px]">by {log.actor}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">{log.details}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD STUDENT */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Enroll New Student</h3>
            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Rahul Sen"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.phone}
                    onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="+91 98260 00000"
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Batch Assignment</label>
                  <input
                    type="text"
                    value={newStudent.batch}
                    onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={e => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Parent Phone</label>
                  <input
                    type="tel"
                    value={newStudent.parentPhone}
                    onChange={e => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COURSE */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Create New Course / Batch</h3>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={newCourse.name}
                  onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g. Fast Track Numerical Physics Module"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Target Class / Exam</label>
                  <input
                    type="text"
                    required
                    value={newCourse.targetExamOrClass}
                    onChange={e => setNewCourse({ ...newCourse, targetExamOrClass: e.target.value })}
                    placeholder="Class 12th Board Aspirants"
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Duration</label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={e => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Subjects (comma separated)</label>
                <input
                  type="text"
                  value={newCourse.subjects}
                  onChange={e => setNewCourse({ ...newCourse, subjects: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newCourse.description}
                  onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD STUDY MATERIAL */}
      {showAddMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Upload Study Material</h3>
            <form onSubmit={handleAddStudyMaterial} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newMaterial.title}
                  onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  placeholder="e.g. Chapter 4 Trigonometric Identities Notes"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Subject</label>
                  <input
                    type="text"
                    value={newMaterial.subject}
                    onChange={e => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Resource Type</label>
                  <select
                    value={newMaterial.type}
                    onChange={e => setNewMaterial({ ...newMaterial, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  >
                    <option value="PDF Notes">PDF Notes</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                    <option value="Worksheet">Worksheet</option>
                    <option value="Question Bank">Question Bank</option>
                  </select>
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMaterialModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SCHEDULE TEST */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Schedule New Assessment Test</h3>
            <form onSubmit={handleCreateTest} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Test Title *</label>
                <input
                  type="text"
                  required
                  value={newTest.testName}
                  onChange={e => setNewTest({ ...newTest, testName: e.target.value })}
                  placeholder="e.g. Unit 2 Chemistry Periodic Trends Test"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Subject</label>
                  <input
                    type="text"
                    value={newTest.subject}
                    onChange={e => setNewTest({ ...newTest, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={newTest.totalMarks}
                    onChange={e => setNewTest({ ...newTest, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Date</label>
                  <input
                    type="date"
                    value={newTest.date}
                    onChange={e => setNewTest({ ...newTest, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newTest.durationMinutes}
                    onChange={e => setNewTest({ ...newTest, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Syllabus Covered</label>
                <input
                  type="text"
                  value={newTest.syllabus}
                  onChange={e => setNewTest({ ...newTest, syllabus: e.target.value })}
                  placeholder="Chapters 1, 2, and 3"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTestModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PUBLISH STUDENT MARKS */}
      {showAddMarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Record & Publish Student Marks</h3>
            <form onSubmit={handleAddResult} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Test</label>
                <select
                  value={newResult.testId}
                  onChange={e => setNewResult({ ...newResult, testId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                >
                  {tests.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.testName} (Total: {t.totalMarks})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Student</label>
                <select
                  value={newResult.studentId}
                  onChange={e => setNewResult({ ...newResult, studentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.studentId}>
                      {s.name} ({s.studentId})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Marks Obtained</label>
                <input
                  type="number"
                  required
                  value={newResult.marksObtained}
                  onChange={e => setNewResult({ ...newResult, marksObtained: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Teacher Remarks (Swapnil Sir)</label>
                <input
                  type="text"
                  value={newResult.remarks}
                  onChange={e => setNewResult({ ...newResult, remarks: e.target.value })}
                  placeholder="e.g. Strong algebra skills, work on step formatting"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMarksModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Publish Scorecard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: POST ANNOUNCEMENT */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Post Student Notice</h3>
            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="e.g. Extra Doubt Clearing Batch on Sunday"
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Notice Content</label>
                <textarea
                  rows={3}
                  required
                  value={newNotice.content}
                  onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Detail instructions for students and parents..."
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl font-bold"
                >
                  Post Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD VERIFIED ACHIEVEMENT */}
      {showAddAchievementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card bg-[#07152F] border border-[#38BDF8]/30 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Publish Verified Achievement</h3>
            <form onSubmit={handleAddAchievement} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={newAchievement.studentName}
                  onChange={e => setNewAchievement({ ...newAchievement, studentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Examination</label>
                  <input
                    type="text"
                    value={newAchievement.exam}
                    onChange={e => setNewAchievement({ ...newAchievement, exam: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Verified Score / Rank</label>
                  <input
                    type="text"
                    required
                    value={newAchievement.rankOrMarks}
                    onChange={e => setNewAchievement({ ...newAchievement, rankOrMarks: e.target.value })}
                    placeholder="95.2% or Rank"
                    className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Academic Year</label>
                <input
                  type="text"
                  value={newAchievement.academicYear}
                  onChange={e => setNewAchievement({ ...newAchievement, academicYear: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Details & Citation</label>
                <textarea
                  rows={2}
                  value={newAchievement.description}
                  onChange={e => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#040D1D] border border-slate-700 text-white outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddAchievementModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold"
                >
                  Publish Verified Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
