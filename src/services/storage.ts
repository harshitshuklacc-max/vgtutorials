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
import {
  INITIAL_WEBSITE_CONFIG,
  INITIAL_COURSES,
  INITIAL_STUDENTS,
  INITIAL_ENQUIRIES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_TESTS,
  INITIAL_RESULTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_FACULTY,
  INITIAL_ACHIEVEMENTS,
  INITIAL_TESTIMONIALS,
  INITIAL_GALLERY,
  INITIAL_DOUBTS,
  INITIAL_AUDIT_LOGS
} from '../data/initialData';

const PREFIX = 'vg_tutorial_dewas_';

function load<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return defaultValue;
  }
}

function save<T>(key: string, data: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const StorageService = {
  getWebsiteConfig: (): WebsiteConfig => load('config', INITIAL_WEBSITE_CONFIG),
  saveWebsiteConfig: (cfg: WebsiteConfig) => save('config', cfg),

  getCourses: (): Course[] => load('courses', INITIAL_COURSES),
  saveCourses: (courses: Course[]) => save('courses', courses),

  getStudents: (): Student[] => load('students', INITIAL_STUDENTS),
  saveStudents: (students: Student[]) => save('students', students),

  getEnquiries: (): Enquiry[] => load('enquiries', INITIAL_ENQUIRIES),
  saveEnquiries: (enquiries: Enquiry[]) => save('enquiries', enquiries),

  getStudyMaterials: (): StudyMaterial[] => load('study_materials', INITIAL_STUDY_MATERIALS),
  saveStudyMaterials: (mats: StudyMaterial[]) => save('study_materials', mats),

  getTests: (): TestItem[] => load('tests', INITIAL_TESTS),
  saveTests: (tests: TestItem[]) => save('tests', tests),

  getResults: (): StudentResult[] => load('results', INITIAL_RESULTS),
  saveResults: (results: StudentResult[]) => save('results', results),

  getAnnouncements: (): Announcement[] => load('announcements', INITIAL_ANNOUNCEMENTS),
  saveAnnouncements: (anns: Announcement[]) => save('announcements', anns),

  getFaculty: (): FacultyMember[] => load('faculty', INITIAL_FACULTY),
  saveFaculty: (faculty: FacultyMember[]) => save('faculty', faculty),

  getAchievements: (): VerifiedAchievement[] => load('achievements', INITIAL_ACHIEVEMENTS),
  saveAchievements: (ach: VerifiedAchievement[]) => save('achievements', ach),

  getTestimonials: (): TestimonialItem[] => load('testimonials', INITIAL_TESTIMONIALS),
  saveTestimonials: (t: TestimonialItem[]) => save('testimonials', t),

  getGallery: (): GalleryItem[] => load('gallery', INITIAL_GALLERY),
  saveGallery: (gallery: GalleryItem[]) => save('gallery', gallery),

  getDoubts: (): DoubtQuery[] => load('doubts', INITIAL_DOUBTS),
  saveDoubts: (doubts: DoubtQuery[]) => save('doubts', doubts),

  getAuditLogs: (): AuditLog[] => load('audit_logs', INITIAL_AUDIT_LOGS),
  saveAuditLogs: (logs: AuditLog[]) => save('audit_logs', logs),

  logAuditAction: (action: string, actor: string, details: string) => {
    const logs = StorageService.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      actor,
      details
    };
    StorageService.saveAuditLogs([newLog, ...logs]);
  },

  resetAllData: () => {
    localStorage.clear();
  }
};
