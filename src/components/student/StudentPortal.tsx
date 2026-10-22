import React, { useState } from 'react';
import { Student, Course, StudyMaterial, TestItem, StudentResult, Announcement, DoubtQuery } from '../../types';
import { StorageService } from '../../services/storage';
import {
  GraduationCap,
  BookOpen,
  FileText,
  ClipboardList,
  HelpCircle,
  User,
  Bell,
  Calendar,
  CheckCircle,
  Download,
  Send,
  Lock,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

interface StudentPortalProps {
  students: Student[];
  courses: Course[];
  studyMaterials: StudyMaterial[];
  tests: TestItem[];
  results: StudentResult[];
  announcements: Announcement[];
  doubts: DoubtQuery[];
  onBackToWebsite: () => void;
  onRefreshData: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  students,
  courses,
  studyMaterials,
  tests,
  results,
  announcements,
  doubts,
  onBackToWebsite,
  onRefreshData
}) => {
  // Active selected student for the session (default to first student)
  const [currentStudentId, setCurrentStudentId] = useState<string>(students[0]?.id || 'stu-1');
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'materials' | 'tests' | 'doubts' | 'profile'>('overview');

  // Doubt form state
  const [doubtSubject, setDoubtSubject] = useState('Mathematics');
  const [doubtTopic, setDoubtTopic] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtSuccess, setDoubtSuccess] = useState(false);

  // Password change state
  const [passwordNotice, setPasswordNotice] = useState('');

  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  // Filter student-specific records
  const studentCourses = courses.filter(c => currentStudent?.courseIds.includes(c.id));
  const studentResults = results.filter(r => r.studentId === currentStudent?.studentId);
  const studentDoubts = doubts.filter(d => d.studentId === currentStudent?.studentId);
  const studentMaterials = studyMaterials.filter(m =>
    currentStudent?.courseIds.includes(m.courseId) || m.courseId === 'all'
  );

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtTopic.trim() || !doubtQuestion.trim()) return;

    const newDoubt: DoubtQuery = {
      id: `dbt-${Date.now()}`,
      studentId: currentStudent.studentId,
      studentName: currentStudent.name,
      subject: doubtSubject,
      topic: doubtTopic.trim(),
      question: doubtQuestion.trim(),
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    const allDoubts = StorageService.getDoubts();
    StorageService.saveDoubts([newDoubt, ...allDoubts]);
    StorageService.logAuditAction('Student Asked Doubt', currentStudent.name, `${doubtSubject}: ${doubtTopic}`);

    setDoubtTopic('');
    setDoubtQuestion('');
    setDoubtSuccess(true);
    setTimeout(() => setDoubtSuccess(false), 4000);
    onRefreshData();
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice('Password changed securely for session.');
    setTimeout(() => setPasswordNotice(''), 3500);
  };

  return (
    <div className="min-h-screen bg-[#040D1D] text-slate-100 flex flex-col">
      {/* Top Header */}
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
              <span className="text-[10px] bg-[#145DFF]/40 text-[#8BD9FF] px-2 py-0.5 rounded border border-[#38BDF8]/30 font-bold uppercase tracking-wider">
                Student Portal
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Welcome back, <strong className="text-white">{currentStudent?.name}</strong> ({currentStudent?.studentId})
            </span>
          </div>
        </div>

        {/* Demo Student Switcher & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-slate-400">Viewing as:</span>
            <select
              value={currentStudentId}
              onChange={e => setCurrentStudentId(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0F2D5F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.batch.split('-')[0]})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onBackToWebsite}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Exit Portal
          </button>
        </div>
      </header>

      {/* Main Student Body with Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          {/* Quick Profile Summary Badge */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#145DFF] to-[#38BDF8] flex items-center justify-center text-white font-bold text-sm shadow">
                {currentStudent?.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-sm text-white truncate">
                  {currentStudent?.name}
                </h3>
                <span className="text-[11px] font-mono text-[#8BD9FF]">
                  {currentStudent?.studentId}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Batch:</span>
                <span className="font-medium text-right truncate max-w-[140px]">{currentStudent?.batch}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Attendance:</span>
                <span className="font-bold text-emerald-400 font-mono tabular-nums">{currentStudent?.attendancePercentage}%</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="glass-card p-2 rounded-2xl space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#38BDF8]" />
              <span>Overview & Notices</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'courses'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
              <span>My Enrolled Courses</span>
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'materials'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-[#38BDF8]" />
              <span>Study Notes & DPPs</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'tests'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-[#38BDF8]" />
              <span>Tests & Scorecards</span>
            </button>

            <button
              onClick={() => setActiveTab('doubts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'doubts'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-[#38BDF8]" />
              <span>Ask Swapnil Sir (Doubt)</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#145DFF] text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-[#38BDF8]" />
              <span>Profile & Security</span>
            </button>
          </nav>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20">
                  <span className="text-xs text-slate-400 block">Attendance</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    {currentStudent?.attendancePercentage}%
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Regular presence</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20">
                  <span className="text-xs text-slate-400 block">Enrolled Courses</span>
                  <span className="text-2xl font-bold font-mono text-white tabular-nums">
                    {studentCourses.length}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Active programs</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20">
                  <span className="text-xs text-slate-400 block">Available Notes</span>
                  <span className="text-2xl font-bold font-mono text-[#8BD9FF] tabular-nums">
                    {studentMaterials.length}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">PDFs & Formula sheets</span>
                </div>

                <div className="p-4 rounded-xl bg-[#0F2D5F]/40 border border-[#38BDF8]/20">
                  <span className="text-xs text-slate-400 block">Tests Taken</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {studentResults.length}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Scorecards published</span>
                </div>
              </div>

              {/* Announcements Noticeboard */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                  <Bell className="w-5 h-5 text-[#38BDF8]" />
                  <h3>Official Noticeboard & Timetable Updates</h3>
                </div>

                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-xl bg-[#07152F] border border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-heading font-bold text-sm text-white">
                          {ann.title}
                        </span>
                        <span className="text-[11px] text-[#38BDF8] font-mono shrink-0">
                          {ann.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Tests Schedule */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-white font-heading font-bold text-base">
                  <Calendar className="w-5 h-5 text-[#38BDF8]" />
                  <h3>Upcoming Tests & Assessments</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tests.map(t => (
                    <div
                      key={t.id}
                      className="p-4 rounded-xl bg-[#07152F] border border-slate-700/60 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#8BD9FF]">
                          <span>{t.subject}</span>
                          <span className="font-mono">{t.durationMinutes} Mins · {t.totalMarks} Marks</span>
                        </div>
                        <h4 className="font-heading font-bold text-white text-sm mt-1">
                          {t.testName}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          <strong className="text-slate-400">Syllabus: </strong>{t.syllabus}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Date: {t.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  My Enrolled Courses & Batches
                </h3>
                <p className="text-xs text-slate-300">
                  Your current active programs under Swapnil Sir at V.G TUTORIAL DEWAS.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {studentCourses.map(c => (
                  <div key={c.id} className="glass-card p-6 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-[#38BDF8] font-semibold uppercase tracking-wider">
                          {c.targetExamOrClass}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-white mt-0.5">
                          {c.name}
                        </h4>
                      </div>
                      <span className="self-start sm:self-auto px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                        Active Enrolled
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {c.description}
                    </p>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-slate-400">Key Curriculum Modules:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {c.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDY MATERIALS */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  Study Notes, DPPs & Formula Sheets
                </h3>
                <p className="text-xs text-slate-300">
                  Approved study material uploaded by Swapnil Sir for your enrolled subjects.
                </p>
              </div>

              <div className="space-y-3">
                {studentMaterials.map(mat => (
                  <div
                    key={mat.id}
                    className="p-5 rounded-2xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-[#145DFF]/30 text-[#8BD9FF] border border-[#38BDF8]/30 px-2 py-0.5 rounded font-bold">
                          {mat.type}
                        </span>
                        <span className="text-xs text-slate-400">· {mat.subject}</span>
                        <span className="text-xs text-slate-400">· {mat.fileSize}</span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-white">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {mat.description}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Downloading "${mat.title}" (${mat.fileSize}) prepared by Swapnil Sir.`)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TESTS & RESULTS */}
          {activeTab === 'tests' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  My Performance & Test Scorecards
                </h3>
                <p className="text-xs text-slate-300">
                  Verified marks, percentages, and faculty comments for all completed center assessments.
                </p>
              </div>

              <div className="space-y-4">
                {studentResults.length > 0 ? (
                  studentResults.map(res => (
                    <div key={res.id} className="glass-card p-6 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs text-[#38BDF8] font-mono block">Published: {res.publishedAt}</span>
                          <h4 className="font-heading text-base font-bold text-white mt-0.5">
                            {res.testName}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#0F2D5F]/80 border border-[#38BDF8]/30 text-center">
                            <span className="text-[10px] text-slate-400 block">Marks</span>
                            <span className="text-base font-bold text-white font-mono tabular-nums">
                              {res.marksObtained} / {res.totalMarks}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                            <span className="text-[10px] text-emerald-300 block">Percentage</span>
                            <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                              {res.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#07152F] border border-slate-700/60 text-xs space-y-1">
                        <span className="font-bold text-[#8BD9FF] block">Mentor Remarks (Swapnil Sir):</span>
                        <p className="text-slate-300 italic">"{res.remarks}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl glass-card text-center text-slate-400 text-xs">
                    No scorecard published yet for this student. Check upcoming test schedules.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DOUBTS & QUERIES */}
          {activeTab === 'doubts' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  Ask a Doubt to Swapnil Sir
                </h3>
                <p className="text-xs text-slate-300">
                  Post questions or numerical doubts directly to faculty. You will receive step-by-step guidance.
                </p>
              </div>

              {/* Form to submit doubt */}
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#38BDF8]" />
                  <span>Submit New Doubt</span>
                </h4>

                {doubtSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300">
                    Your doubt has been submitted directly to Swapnil Sir.
                  </div>
                )}

                <form onSubmit={handleAskDoubt} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-medium">Subject</label>
                      <select
                        value={doubtSubject}
                        onChange={e => setDoubtSubject(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                      >
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology / General Science">Biology / General Science</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-medium">Chapter / Topic</label>
                      <input
                        type="text"
                        required
                        value={doubtTopic}
                        onChange={e => setDoubtTopic(e.target.value)}
                        placeholder="e.g. Quadratic Equations derivation"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-medium">Describe your question or doubt</label>
                    <textarea
                      required
                      rows={3}
                      value={doubtQuestion}
                      onChange={e => setDoubtQuestion(e.target.value)}
                      placeholder="Type the specific question, step where you are stuck, or problem number..."
                      className="w-full px-3 py-2.5 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl flex items-center gap-2 cursor-pointer shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Mentor</span>
                  </button>
                </form>
              </div>

              {/* Doubt history */}
              <div className="space-y-3">
                <h4 className="font-heading text-sm font-bold text-slate-300">
                  My Recent Doubt Queries ({studentDoubts.length})
                </h4>

                {studentDoubts.map(d => (
                  <div key={d.id} className="glass-card p-5 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#38BDF8]">{d.subject} · {d.topic}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'Answered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {d.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200">
                      <strong className="text-slate-400">Question: </strong>{d.question}
                    </p>

                    {d.reply && (
                      <div className="p-3 rounded-xl bg-[#0F2D5F]/60 border border-[#38BDF8]/20 text-xs space-y-1">
                        <span className="text-[11px] font-bold text-[#8BD9FF] block">Reply from Swapnil Sir:</span>
                        <p className="text-slate-200 leading-relaxed">{d.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl space-y-2">
                <h3 className="font-heading font-bold text-xl text-white">
                  Student Account & Credentials
                </h3>
                <p className="text-xs text-slate-300">
                  Review your registration details and update security settings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl space-y-3">
                  <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-[#38BDF8]" />
                    <span>Personal Information</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Full Name:</span>
                      <span className="font-semibold text-white">{currentStudent?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Student Roll ID:</span>
                      <span className="font-mono text-[#8BD9FF]">{currentStudent?.studentId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Parent / Guardian:</span>
                      <span className="text-white">{currentStudent?.parentName} ({currentStudent?.parentPhone})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Registered Phone:</span>
                      <span className="text-white">{currentStudent?.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Center Location:</span>
                      <span className="text-white">Mukherjee Nagar, Dewas (M.P.)</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl space-y-4">
                  <h4 className="font-heading text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#38BDF8]" />
                    <span>Change Portal Password</span>
                  </h4>

                  {passwordNotice && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300">
                      {passwordNotice}
                    </div>
                  )}

                  <form onSubmit={handlePasswordUpdate} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-medium">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-medium">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl bg-[#07152F] border border-slate-700 text-xs text-white outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-[#145DFF] hover:bg-[#1d4ed8] rounded-xl cursor-pointer"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
