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
} from '../types';

export const INITIAL_WEBSITE_CONFIG: WebsiteConfig = {
  instituteName: "V.G TUTORIAL DEWAS",
  founderName: "Swapnil Sir",
  phone: "+91 97528 04711",
  address: "Mukherjee Nagar, Nagar Nigam Colony",
  city: "Dewas",
  state: "Madhya Pradesh",
  pincode: "455001",
  googleReviewsCount: 141,
  heroHeading: "Your Success Story Starts Here.",
  heroSubheading: "Learn with confidence. Build strong concepts. Move closer to your academic goals with V.G TUTORIAL DEWAS.",
  announcementTicker: "Admissions Open for New Academic Batches at Mukherjee Nagar, Dewas! Contact Swapnil Sir directly for seat availability.",
  openingHours: "Mon – Sat: 8:00 AM – 8:00 PM | Sun: Special Doubt & Test Sessions",
  aboutIntro: "V.G TUTORIAL DEWAS is a premier academic coaching institute founded and guided by Swapnil Sir in Dewas, Madhya Pradesh. We specialize in concept-oriented education, disciplined regular practice, and personalized student mentoring.",
  teachingPhilosophy: "Education is not merely rote memorization—it is cultivating the ability to think logically and analyze systematically. Every student possesses unique learning speeds and strengths. Our classroom provides equal attention, structured doubt resolution, and step-by-step conceptual mastery.",
  mission: "To empower students across Dewas with rigorous academic foundations, analytical problem-solving skills, and the confidence to excel in competitive and board examinations.",
  vision: "To stand as the most trusted and results-driven educational institution in Dewas, recognized for pedagogical integrity and student-first mentoring."
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    name: "Foundation Mathematics & Science (Class 9th & 10th)",
    tagline: "Build unshakeable fundamentals for high school and future competitive exams",
    targetExamOrClass: "Class 9th & 10th (CBSE / MP Board)",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    duration: "Full Academic Year (10 Months)",
    teachingMode: "Offline Classroom",
    description: "Comprehensive syllabus coverage focused on conceptual clarity, NCERT mastery, daily practice problem sheets (DPPs), and weekly assessment tests.",
    features: [
      "Small batch size for direct student-teacher interaction",
      "Chapter-wise analytical question banks & formulas",
      "Regular parent-teacher academic review updates",
      "Special doubt-solving clinics before term examinations"
    ],
    feesPlaceholder: "Contact Institute for Batch Timings & Fee Schedule",
    isPublished: true,
    order: 1,
    image: "/src/assets/images/course_academic_physics_math_1792662029986.jpg"
  },
  {
    id: "course-2",
    name: "Senior Secondary Science Stream (Class 11th & 12th)",
    tagline: "In-depth concept mastery with analytical problem solving for board & entrance readiness",
    targetExamOrClass: "Class 11th & 12th (Science Stream)",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    duration: "1 or 2 Year Structured Program",
    teachingMode: "Offline Classroom",
    description: "Designed for rigorous subject mastery with systematic progression from basic board concepts to higher-order analytical problem solving.",
    features: [
      "Concept derivation sessions with real-world examples",
      "Timed mock tests simulating examination conditions",
      "Comprehensive chapter-wise printed revision booklets",
      "One-on-one personal guidance under Swapnil Sir"
    ],
    feesPlaceholder: "Contact Institute for Batch Timings & Fee Schedule",
    isPublished: true,
    order: 2,
    image: "/src/assets/images/course_science_lab_1792662030724.jpg"
  },
  {
    id: "course-3",
    name: "Specialized Concept & Doubt Mentorship Batch",
    tagline: "Focused targeted mentoring for specific high-difficulty chapters & revision",
    targetExamOrClass: "Board Aspirants & Competitive Foundation",
    subjects: ["Advanced Mathematics", "Numerical Physics", "Physical Chemistry"],
    duration: "Flexible 3 to 6 Month Modules",
    teachingMode: "Offline Classroom",
    description: "Special weekend and evening revision batches created for students needing dedicated practice, numerical problem drills, and personalized doubt clearance.",
    features: [
      "Topic-specific error analysis and formula drills",
      "Step-by-step problem dissection techniques",
      "Past 10-year board questions & pattern analysis",
      "Direct personalized feedback from faculty"
    ],
    feesPlaceholder: "Contact Institute for Batch Timings & Fee Schedule",
    isPublished: true,
    order: 3,
    image: "/src/assets/images/institute_counseling_hall_1792662030713.jpg"
  }
];

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: "fac-1",
    name: "Swapnil Sir",
    designation: "Founder & Lead Academic Mentor",
    subjects: ["Mathematics", "Physics", "Academic Mentorship"],
    qualification: "Senior Education Specialist",
    experience: "Years of Dedicated Teaching in Dewas",
    shortIntro: "Dedicated to nurturing concept-first clarity, logical reasoning, and disciplined academic performance for students across Dewas.",
    isFounder: true
  },
  {
    id: "fac-2",
    name: "Faculty Member (Science Specialist)",
    designation: "Senior Science Instructor",
    subjects: ["Chemistry", "Applied Sciences"],
    qualification: "M.Sc. / B.Ed. (Editable in Admin)",
    experience: "Experienced Subject Mentor",
    shortIntro: "Passionate about simplifying molecular concepts and laboratory theory into digestible mental models for students.",
    isFounder: false
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "stu-1",
    studentId: "VG-2026-001",
    name: "Aman Sharma",
    email: "aman.student@vgtutorial.local",
    phone: "+91 98260 12345",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98260 54321",
    batch: "Class 10th - Morning Batch A",
    courseIds: ["course-1"],
    enrolledDate: "2026-04-10",
    attendancePercentage: 94,
    status: "active"
  },
  {
    id: "stu-2",
    studentId: "VG-2026-002",
    name: "Pooja Verma",
    email: "pooja.verma@vgtutorial.local",
    phone: "+91 94250 88776",
    parentName: "Dinesh Verma",
    parentPhone: "+91 94250 11223",
    batch: "Class 12th - Evening Batch B",
    courseIds: ["course-2"],
    enrolledDate: "2026-04-15",
    attendancePercentage: 98,
    status: "active"
  },
  {
    id: "stu-3",
    studentId: "VG-2026-003",
    name: "Rohan Patel",
    email: "rohan.patel@vgtutorial.local",
    phone: "+91 99770 33445",
    parentName: "Sunil Patel",
    parentPhone: "+91 99770 99887",
    batch: "Class 10th - Morning Batch A",
    courseIds: ["course-1"],
    enrolledDate: "2026-05-02",
    attendancePercentage: 91,
    status: "active"
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-1",
    studentName: "Aditya Chouhan",
    parentName: "Mahesh Chouhan",
    phone: "+91 98270 44556",
    courseInterest: "Foundation Mathematics & Science (Class 9th & 10th)",
    preferredTime: "Evening 5:00 PM - 7:00 PM",
    message: "Seeking admission for 10th board preparation and regular doubt guidance.",
    createdAt: "2026-10-18T10:30:00Z",
    status: "Interested",
    followUpDate: "2026-10-24",
    notes: ["Parent visited center; requested batch timings for morning slot."]
  },
  {
    id: "enq-2",
    studentName: "Sneha Joshi",
    parentName: "Pradeep Joshi",
    phone: "+91 97550 66778",
    courseInterest: "Senior Secondary Science Stream (Class 11th & 12th)",
    preferredTime: "Morning 10:00 AM - 12:00 PM",
    message: "Inquiring about Chemistry & Physics batch schedule.",
    createdAt: "2026-10-20T14:15:00Z",
    status: "New",
    notes: ["Online enquiry submitted via website."]
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: "mat-1",
    title: "Class 10th Mathematics: Quadratic Equations & AP Comprehensive Notes",
    courseId: "course-1",
    courseName: "Foundation Mathematics & Science (Class 9th & 10th)",
    subject: "Mathematics",
    type: "PDF Notes",
    fileSize: "2.4 MB",
    uploadedAt: "2026-10-12",
    description: "Detailed step-by-step derivations, standard solved examples, and practice problems compiled by Swapnil Sir."
  },
  {
    id: "mat-2",
    title: "Light: Reflection & Refraction - Ray Diagrams & Numerical Sheet",
    courseId: "course-1",
    courseName: "Foundation Mathematics & Science (Class 9th & 10th)",
    subject: "Physics",
    type: "Formula Sheet",
    fileSize: "1.8 MB",
    uploadedAt: "2026-10-14",
    description: "Mirror and lens formula shortcuts, sign convention summary, and high-probability board numericals."
  },
  {
    id: "mat-3",
    title: "Electrostatics & Current Electricity Practice Problem Set",
    courseId: "course-2",
    courseName: "Senior Secondary Science Stream (Class 11th & 12th)",
    subject: "Physics",
    type: "Worksheet",
    fileSize: "3.1 MB",
    uploadedAt: "2026-10-16",
    description: "Kirchhoff's laws application problems, circuit analysis worksheets with answer keys."
  }
];

export const INITIAL_TESTS: TestItem[] = [
  {
    id: "test-1",
    testName: "Class 10 Mid-Term Mathematics Assessment",
    courseId: "course-1",
    courseName: "Foundation Mathematics & Science (Class 9th & 10th)",
    subject: "Mathematics",
    totalMarks: 50,
    date: "2026-10-28",
    durationMinutes: 90,
    syllabus: "Real Numbers, Polynomials, Linear Equations in Two Variables & Quadratic Equations",
    isPublished: true
  },
  {
    id: "test-2",
    testName: "Class 12 Physics: Optics & Wave Mechanics Unit Test",
    courseId: "course-2",
    courseName: "Senior Secondary Science Stream (Class 11th & 12th)",
    subject: "Physics",
    totalMarks: 70,
    date: "2026-11-04",
    durationMinutes: 120,
    syllabus: "Ray Optics, Optical Instruments, Wave Optics & Interference",
    isPublished: true
  }
];

export const INITIAL_RESULTS: StudentResult[] = [
  {
    id: "res-1",
    testId: "test-1",
    testName: "Class 10 Mathematics Unit Test 1",
    studentId: "VG-2026-001",
    studentName: "Aman Sharma",
    marksObtained: 46,
    totalMarks: 50,
    percentage: 92,
    remarks: "Excellent algebraic problem solving. Work on time management in 4-mark questions.",
    publishedAt: "2026-10-05"
  },
  {
    id: "res-2",
    testId: "test-1",
    testName: "Class 10 Mathematics Unit Test 1",
    studentId: "VG-2026-003",
    studentName: "Rohan Patel",
    marksObtained: 42,
    totalMarks: 50,
    percentage: 84,
    remarks: "Good conceptual clarity. Review quadratic formula factorisation steps.",
    publishedAt: "2026-10-05"
  },
  {
    id: "res-3",
    testId: "test-2",
    testName: "Class 12 Physics Diagnostic Exam",
    studentId: "VG-2026-002",
    studentName: "Pooja Verma",
    marksObtained: 66,
    totalMarks: 70,
    percentage: 94.2,
    remarks: "Outstanding ray diagrams and derivation clarity. Keep up the consistent revision.",
    publishedAt: "2026-10-08"
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Upcoming Diwali & Special Revision Schedule",
    content: "Classes will observe festival break as per the official holiday calendar. Special doubt resolution hours will be conducted on weekend mornings. Check your course materials section for the festive holiday practice booklet.",
    category: "General",
    targetCourseId: "all",
    date: "2026-10-20",
    isPinned: true
  },
  {
    id: "ann-2",
    title: "Mathematics Mid-Term Test Scheduled for Oct 28",
    content: "All Class 10th students must report 15 minutes before exam start time. Bring your geometry instruments and formula sheets for pre-exam check.",
    category: "Exam Notice",
    targetCourseId: "course-1",
    date: "2026-10-19",
    isPinned: true
  }
];

export const INITIAL_ACHIEVEMENTS: VerifiedAchievement[] = []; // Verified records will be published here by Admin

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "testim-1",
    studentName: "Class 10th Student (Batch 2025-26)",
    batchOrClass: "Mukherjee Nagar, Dewas",
    feedback: "Swapnil Sir's method of breaking down complicated formulas into logical daily life analogies completely eliminated my fear of Mathematics. The regular tests kept us on track throughout the year.",
    rating: 5,
    verified: true
  },
  {
    id: "testim-2",
    studentName: "Class 12th Science Student",
    batchOrClass: "Nagar Nigam Colony Center",
    feedback: "The personal attention and patient doubt clearing make V.G TUTORIAL DEWAS stand out. Even when I had doubts late in the revision period, Sir took the time to explain every single concept until I mastered it.",
    rating: 5,
    verified: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Interactive Classroom & Lecture Hall",
    category: "Classroom",
    imageUrl: "/src/assets/images/hero_classroom_learning_1792662029624.jpg",
    caption: "Modern air-cooled classroom with smart teaching boards and comfortable ergonomic study benches."
  },
  {
    id: "gal-2",
    title: "Concept-Oriented Study & Problem-Solving Drills",
    category: "Doubt Sessions",
    imageUrl: "/src/assets/images/course_academic_physics_math_1792662029986.jpg",
    caption: "Focused analytical practice, geometric derivation sessions, and daily problem sheets."
  },
  {
    id: "gal-3",
    title: "Academic Mentoring & Guidance Corner",
    category: "Guidance",
    imageUrl: "/src/assets/images/institute_counseling_hall_1792662030713.jpg",
    caption: "One-on-one student counseling desk and academic review meetings with parents."
  },
  {
    id: "gal-4",
    title: "Science Conceptual Demonstration Materials",
    category: "Classroom",
    imageUrl: "/src/assets/images/course_science_lab_1792662030724.jpg",
    caption: "Visual representations and physical models to reinforce physics and chemistry principles."
  }
];

export const INITIAL_DOUBTS: DoubtQuery[] = [
  {
    id: "dbt-1",
    studentId: "VG-2026-001",
    studentName: "Aman Sharma",
    subject: "Mathematics",
    topic: "Quadratic Equations - Nature of Roots",
    question: "Sir, when discriminant D > 0 but not a perfect square, why are roots always conjugate surds?",
    status: "Answered",
    reply: "Because coefficients are rational. When solving (-b ± √D)/2a, √D remains irrational, giving pairs of p + √q and p - √q. We will review this on the board tomorrow!",
    submittedAt: "2026-10-18T16:20:00Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2026-10-21T09:00:00Z",
    action: "System Initialization",
    actor: "Admin (Swapnil Sir)",
    details: "Configured V.G TUTORIAL DEWAS academic portal and student database."
  },
  {
    id: "log-2",
    timestamp: "2026-10-21T11:30:00Z",
    action: "Study Material Upload",
    actor: "Admin (Swapnil Sir)",
    details: "Published Class 10th Mathematics Quadratic Equations comprehensive PDF notes."
  }
];
