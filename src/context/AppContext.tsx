import React, { createContext, useContext, useState, useEffect } from 'react';
import { TuitionJob, Tutor, TutorApplicant, UserRole } from '../types';
import { INITIAL_JOBS, INITIAL_TUTORS } from '../data/mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  jobs: TuitionJob[];
  tutors: Tutor[];
  applications: TutorApplicant[];
  activeTutor: Tutor;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addGuardianRequest: (data: Omit<TuitionJob, 'id' | 'status' | 'applicantsCount' | 'createdAt'>) => void;
  approveJob: (jobId: string) => void;
  assignTutor: (jobId: string, tutorId: string) => void;
  applyForJob: (jobId: string, pitchNote?: string) => boolean;
  registerTutor: (data: Omit<Tutor, 'id' | 'rating' | 'totalTuitionsCompleted' | 'isVerified' | 'joinedDate'>) => void;
  verifyTutor: (tutorId: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');

  // Load from localStorage or defaults
  const [jobs, setJobs] = useState<TuitionJob[]>(() => {
    const saved = localStorage.getItem('tm_demo_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [tutors, setTutors] = useState<Tutor[]>(() => {
    const saved = localStorage.getItem('tm_demo_tutors');
    return saved ? JSON.parse(saved) : INITIAL_TUTORS;
  });

  const [applications, setApplications] = useState<TutorApplicant[]>(() => {
    const saved = localStorage.getItem('tm_demo_apps');
    return saved ? JSON.parse(saved) : [
      { jobId: 'JOB-2026-081', tutorId: 't-101', appliedAt: '১ ঘণ্টা আগে', status: 'applied', pitchNote: 'আমি এই এলাকায় কাছাকাছি থাকি, ফিজিক্সে ভালো দখল আছে।' },
      { jobId: 'JOB-2026-081', tutorId: 't-103', appliedAt: '৪৫ মিনিট আগে', status: 'applied', pitchNote: 'ঢাকা মেডিকেলের ৩য় বর্ষ, আন্তরিকতার সাথে পড়াবো।' },
      { jobId: 'JOB-2026-082', tutorId: 't-102', appliedAt: '৩ ঘণ্টা আগে', status: 'applied', pitchNote: 'ইংলিশ মিডিয়ামের কেজি থেকে ও-লেভেল বহু বছর পড়িয়েছি।' },
    ];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tm_demo_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('tm_demo_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('tm_demo_apps', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const activeTutor = tutors[0]; // Default logged-in demo tutor (Tanvir / BUET)

  const addGuardianRequest = (data: Omit<TuitionJob, 'id' | 'status' | 'applicantsCount' | 'createdAt'>) => {
    const newId = `JOB-2026-${String(jobs.length + 80).padStart(3, '0')}`;
    const newJob: TuitionJob = {
      ...data,
      id: newId,
      status: 'pending_review', // Important: Admin reviews first!
      applicantsCount: 0,
      createdAt: 'এইমাত্র'
    };
    setJobs(prev => [newJob, ...prev]);
    showToast('আপনার টিউশন রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন শীঘ্রই যাচাই করে অনুমোদন করবেন।');
  };

  const approveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'approved' };
      }
      return job;
    }));
    showToast(`টিউশন পোস্ট (${jobId}) সফলভাবে অনুমোদন ও লাইভ করা হয়েছে!`);
  };

  const assignTutor = (jobId: string, tutorId: string) => {
    const selectedTutor = tutors.find(t => t.id === tutorId);
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'assigned', assignedTutorId: tutorId };
      }
      return job;
    }));

    setApplications(prev => prev.map(app => {
      if (app.jobId === jobId) {
        return {
          ...app,
          status: app.tutorId === tutorId ? 'assigned' : 'rejected'
        };
      }
      return app;
    }));

    showToast(`অভিনন্দন! টিউটর ${selectedTutor?.name || ''} কে টিউশনে চূড়ান্ত নিয়োগ দেওয়া হয়েছে।`);
  };

  const applyForJob = (jobId: string, pitchNote?: string): boolean => {
    const alreadyApplied = applications.some(a => a.jobId === jobId && a.tutorId === activeTutor.id);
    if (alreadyApplied) {
      showToast('আপনি ইতিপূর্বেই এই টিউশনটিতে আবেদন করেছেন!');
      return false;
    }

    const newApp: TutorApplicant = {
      jobId,
      tutorId: activeTutor.id,
      appliedAt: 'এইমাত্র',
      status: 'applied',
      pitchNote: pitchNote || 'আমি এই টিউশন পড়াতে আগ্রহী এবং যোগ্য।'
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, applicantsCount: job.applicantsCount + 1 };
      }
      return job;
    }));

    showToast('আপনার আবেদন অ্যাডমিন প্যানেলে জমা হয়েছে! শর্টলিস্ট হলে কল করা হবে।');
    return true;
  };

  const registerTutor = (data: Omit<Tutor, 'id' | 'rating' | 'totalTuitionsCompleted' | 'isVerified' | 'joinedDate'>) => {
    const newId = `t-${100 + tutors.length + 1}`;
    const newTutor: Tutor = {
      ...data,
      id: newId,
      rating: 5.0,
      totalTuitionsCompleted: 0,
      isVerified: false, // Must be verified by Admin!
      joinedDate: 'আজ',
    };
    setTutors(prev => [newTutor, ...prev]);
    showToast('টিউটর রেজিস্ট্রেশন সম্পন্ন হয়েছে! অ্যাডমিন আইডি যাচাই করে প্রোফাইল ভেরিফাই করবেন।');
  };

  const verifyTutor = (tutorId: string) => {
    setTutors(prev => prev.map(t => {
      if (t.id === tutorId) {
        return { ...t, isVerified: true };
      }
      return t;
    }));
    showToast('টিউটর আইডি কার্ড ও তথ্য যাচাই করে ভেরিফাইড ব্যাজ দেওয়া হয়েছে!');
  };

  const resetDemoData = () => {
    localStorage.removeItem('tm_demo_jobs');
    localStorage.removeItem('tm_demo_tutors');
    localStorage.removeItem('tm_demo_apps');
    setJobs(INITIAL_JOBS);
    setTutors(INITIAL_TUTORS);
    setApplications([
      { jobId: 'JOB-2026-081', tutorId: 't-101', appliedAt: '১ ঘণ্টা আগে', status: 'applied', pitchNote: 'আমি এই এলাকায় কাছাকাছি থাকি, ফিজিক্সে ভালো দখল আছে।' },
      { jobId: 'JOB-2026-081', tutorId: 't-103', appliedAt: '৪৫ মিনিট আগে', status: 'applied', pitchNote: 'ঢাকা মেডিকেলের ৩য় বর্ষ, আন্তরিকতার সাথে পড়াবো।' },
      { jobId: 'JOB-2026-082', tutorId: 't-102', appliedAt: '৩ ঘণ্টা আগে', status: 'applied', pitchNote: 'ইংলিশ মিডিয়ামের কেজি থেকে ও-লেভেল বহু বছর পড়িয়েছি।' },
    ]);
    showToast('ডেমো ডাটা সফলভাবে রিসেট করা হয়েছে!');
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        jobs,
        tutors,
        applications,
        activeTutor,
        toastMessage,
        showToast,
        addGuardianRequest,
        approveJob,
        assignTutor,
        applyForJob,
        registerTutor,
        verifyTutor,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
