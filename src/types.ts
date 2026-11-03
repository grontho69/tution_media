export type UserRole = 'public' | 'tutor' | 'admin' | 'mobile_preview';

export type JobStatus = 'pending_review' | 'approved' | 'assigned' | 'completed' | 'cancelled';

export interface TuitionJob {
  id: string;
  title: string;
  classGrade: string; // e.g. "Class 9", "HSC 1st Year"
  curriculum: 'বাংলা ভার্সন' | 'English Version' | 'English Medium' | 'মাদরাসা';
  subjects: string[]; // e.g. ["Physics", "Higher Math"]
  daysPerWeek: number; // e.g. 3, 4
  salary: number; // e.g. 6000
  location: string; // e.g. "উত্তরা সেক্টর ৭"
  district: string; // e.g. "ঢাকা"
  genderPreference: 'ছেলে বা মেয়ে যেকোনো' | 'শুধু ছেলে টিউটর' | 'শুধু মেয়ে টিউটর';
  guardianName: string; // Private (Admin only)
  guardianPhone: string; // Private (Admin only)
  guardianAddress: string; // Private (Admin only)
  status: JobStatus;
  applicantsCount: number;
  assignedTutorId?: string;
  createdAt: string;
  additionalNotes?: string;
}

export interface TutorApplicant {
  jobId: string;
  tutorId: string;
  appliedAt: string;
  status: 'applied' | 'shortlisted' | 'assigned' | 'rejected';
  pitchNote?: string;
}

export interface Tutor {
  id: string;
  name: string;
  photoUrl: string;
  gender: 'পুরুষ' | 'মহিলা';
  institution: string; // e.g. "ঢাকা বিশ্ববিদ্যালয় (DU)"
  department: string; // e.g. "কম্পিউটার সায়েন্স"
  yearOfStudy: string; // e.g. "৩য় বর্ষ"
  hscCollege: string;
  phone: string;
  email: string;
  preferredAreas: string[];
  preferredSubjects: string[];
  experienceYears: number;
  expectedSalary: string;
  isVerified: boolean;
  idCardPhotoUrl?: string;
  rating: number;
  totalTuitionsCompleted: number;
  bio: string;
  joinedDate: string;
}
