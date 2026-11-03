import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, GraduationCap, ShieldCheck, Smartphone, RotateCcw, Sparkles } from 'lucide-react';

export const DemoBar: React.FC = () => {
  const { currentRole, setCurrentRole, jobs, tutors, resetDemoData } = useApp();

  const pendingJobsCount = jobs.filter(j => j.status === 'pending_review').length;
  const unverifiedTutorsCount = tutors.filter(t => !t.isVerified).length;
  const totalPending = pendingJobsCount + unverifiedTutorsCount;

  return (
    <div className="bg-slate-900 text-white px-3 py-2 sticky top-0 z-50 shadow-md border-b border-slate-800 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 font-medium">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500 text-slate-950 uppercase tracking-wide">
            <Sparkles className="w-3 h-3 mr-1" />
            ডেমো শোকেস মোড
          </span>
          <span className="hidden sm:inline text-slate-300 text-xs">
            যেকোনো মোডে ক্লিক করে ক্লায়েন্টকে দেখান:
          </span>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setCurrentRole('public')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
              currentRole === 'public'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>পাবলিক ও অভিভাবক ভিউ</span>
          </button>

          <button
            onClick={() => setCurrentRole('tutor')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
              currentRole === 'tutor'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>টিউটর পোর্টাল</span>
          </button>

          <button
            onClick={() => setCurrentRole('admin')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-medium relative ${
              currentRole === 'admin'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>অ্যাডমিন ও মিডিয়া প্যানেল</span>
            {totalPending > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 animate-pulse">
                {totalPending} নতুন
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentRole('mobile_preview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
              currentRole === 'mobile_preview'
                ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-purple-300" />
            <span>মোবাইল অ্যাপ প্রিভিউ</span>
          </button>

          <button
            onClick={resetDemoData}
            title="ডাটা রিসেট করুন"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
