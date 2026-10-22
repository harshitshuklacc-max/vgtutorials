export type UserRole = 'guest' | 'student' | 'admin';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  batch: string;
  courseIds: string[];
  enrolledDate: string;
  attendancePercentage: number;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  tagline: string;
  targetExamOrClass: string;
  subjects: string[];
  duration: string;
  teachingMode: 'Offline Classroom' | 'Hybrid' | 'Doubt Mentorship';
  description: string;
  features: string[];
  feesPlaceholder: string;
  isPublished: boolean;
  order: number;
  image?: string;
}

export interface Enquiry {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  courseInterest: string;
  preferredTime: string;
  message?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Interested' | 'Enrolled' | 'Closed';
  followUpDate?: string;
  notes?: string[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  subject: string;
  type: 'PDF Notes' | 'Worksheet' | 'Formula Sheet' | 'Question Bank';
  fileSize: string;
  uploadedAt: string;
  downloadUrl?: string;
  description: string;
}

export interface TestItem {
  id: string;
  testName: string;
  courseId: string;
  courseName: string;
  subject: string;
  totalMarks: number;
  date: string;
  durationMinutes: number;
  syllabus: string;
  isPublished: boolean;
}

export interface StudentResult {
  id: string;
  testId: string;
  testName: string;
  studentId: string;
  studentName: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  remarks: string;
  publishedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Exam Notice' | 'Class Timetable' | 'Holiday' | 'General';
  targetCourseId: string; // 'all' or specific courseId
  date: string;
  isPinned: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  subjects: string[];
  qualification: string;
  experience: string;
  shortIntro: string;
  isFounder?: boolean;
}

export interface VerifiedAchievement {
  id: string;
  studentName: string;
  exam: string;
  rankOrMarks: string;
  academicYear: string;
  description: string;
  verified: boolean;
}

export interface TestimonialItem {
  id: string;
  studentName: string;
  batchOrClass: string;
  feedback: string;
  rating: number;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Doubt Sessions' | 'Guidance' | 'Library';
  imageUrl: string;
  caption: string;
}

export interface DoubtQuery {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  topic: string;
  question: string;
  status: 'Pending' | 'Answered';
  reply?: string;
  submittedAt: string;
}

export interface WebsiteConfig {
  instituteName: string;
  founderName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleReviewsCount: number;
  heroHeading: string;
  heroSubheading: string;
  announcementTicker: string;
  openingHours: string;
  aboutIntro: string;
  teachingPhilosophy: string;
  mission: string;
  vision: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}
