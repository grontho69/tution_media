import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { DemoBar } from './components/DemoBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { TuitionBoard } from './components/TuitionBoard';
import { TutorDirectory } from './components/TutorDirectory';
import { GuardianRequestModal } from './components/GuardianRequestModal';
import { TutorRegisterModal } from './components/TutorRegisterModal';
import { JobApplyModal } from './components/JobApplyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileAppPreview } from './components/MobileAppPreview';
import { TutorPortalView } from './components/TutorPortalView';
import { Footer } from './components/Footer';
import { TuitionJob, Tutor } from './types';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { currentRole, toastMessage } = useApp();

  const [isGuardianModalOpen, setIsGuardianModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<TuitionJob | null>(null);
  const [preselectedTutorForHire, setPreselectedTutorForHire] = useState<string | undefined>(undefined);

  const handleScrollToJobs = () => {
    const el = document.getElementById('tuition-jobs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToTutors = () => {
    const el = document.getElementById('top-tutors');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTutorToHire = (tutor: Tutor) => {
    setPreselectedTutorForHire(tutor.name);
    setIsGuardianModalOpen(true);
  };

  const handleHeroSearch = (filters: { district: string; classGrade: string; medium: string }) => {
    handleScrollToJobs();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Demo Bar */}
      <DemoBar />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center space-x-3 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Render according to Selected Role */}
      {currentRole === 'public' && (
        <>
          <Navbar
            onOpenGuardianModal={() => {
              setPreselectedTutorForHire(undefined);
              setIsGuardianModalOpen(true);
            }}
            onOpenTutorModal={() => setIsTutorModalOpen(true)}
            onScrollToJobs={handleScrollToJobs}
            onScrollToTutors={handleScrollToTutors}
          />
          <main className="flex-1">
            <Hero
              onSearch={handleHeroSearch}
              onOpenGuardianModal={() => {
                setPreselectedTutorForHire(undefined);
                setIsGuardianModalOpen(true);
              }}
              onOpenTutorModal={() => setIsTutorModalOpen(true)}
            />
            <StatsSection />
            <TuitionBoard
              onApplyJob={(job) => setSelectedJobForApply(job)}
              onOpenGuardianModal={() => {
                setPreselectedTutorForHire(undefined);
                setIsGuardianModalOpen(true);
              }}
            />
            <TutorDirectory
              onSelectTutorToHire={handleSelectTutorToHire}
              onOpenTutorModal={() => setIsTutorModalOpen(true)}
            />
          </main>
          <Footer />
        </>
      )}

      {currentRole === 'tutor' && (
        <>
          <Navbar
            onOpenGuardianModal={() => {
              setPreselectedTutorForHire(undefined);
              setIsGuardianModalOpen(true);
            }}
            onOpenTutorModal={() => setIsTutorModalOpen(true)}
            onScrollToJobs={handleScrollToJobs}
            onScrollToTutors={handleScrollToTutors}
          />
          <main className="flex-1">
            <TutorPortalView
              onApplyJob={(job) => setSelectedJobForApply(job)}
              onOpenRegisterModal={() => setIsTutorModalOpen(true)}
            />
          </main>
          <Footer />
        </>
      )}

      {currentRole === 'admin' && (
        <>
          <Navbar
            onOpenGuardianModal={() => {
              setPreselectedTutorForHire(undefined);
              setIsGuardianModalOpen(true);
            }}
            onOpenTutorModal={() => setIsTutorModalOpen(true)}
            onScrollToJobs={handleScrollToJobs}
            onScrollToTutors={handleScrollToTutors}
          />
          <main className="flex-1">
            <AdminDashboard />
          </main>
        </>
      )}

      {currentRole === 'mobile_preview' && (
        <main className="flex-1">
          <MobileAppPreview />
        </main>
      )}

      {/* Modals */}
      <GuardianRequestModal
        isOpen={isGuardianModalOpen}
        onClose={() => setIsGuardianModalOpen(false)}
        preselectedTutorName={preselectedTutorForHire}
      />

      <TutorRegisterModal
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
      />

      <JobApplyModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
      />
    </div>
  );
};
