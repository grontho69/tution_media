import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionJob } from '../types';
import { 
  GraduationCap, CheckCircle2, Clock, Send, 
  MapPin, Banknote, Calendar, BookOpen, AlertCircle, 
  UserCheck, ShieldCheck, ArrowRight 
} from 'lucide-react';

interface TutorPortalViewProps {
  onApplyJob: (job: TuitionJob) => void;
  onOpenRegisterModal: () => void;
}

export const TutorPortalView: React.FC<TutorPortalViewProps> = ({
  onApplyJob,
  onOpenRegisterModal
}) => {
  const { activeTutor, jobs, applications } = useApp();
  const [activeTab, setActiveTab] = useState<'available' | 'my_applications'>('available');

  const approvedJobs = jobs.filter(j => j.status === 'approved' || j.status === 'assigned');
  const myApplications = applications.filter(a => a.tutorId === activeTutor.id);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Tutor Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative">
              <img
                src={activeTutor.photoUrl}
                alt={activeTutor.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20"
              />
              {activeTutor.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-slate-900">{activeTutor.name}</h2>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  লগইনকৃত ডেমো টিউটর
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-700 flex items-center space-x-1">
                <GraduationCap className="w-4 h-4" />
                <span>{activeTutor.institution} — {activeTutor.department} ({activeTutor.yearOfStudy})</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span>মোবাইল: {activeTutor.phone}</span>
                <span>•</span>
                <span>অভিজ্ঞতা: {activeTutor.experienceYears} বছর</span>
                <span>•</span>
                <span className="text-amber-500 font-bold">★ {activeTutor.rating} রেটিং</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={onOpenRegisterModal}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            >
              + নতুন টিউটর অ্যাকাউন্ট টেস্ট করুন
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('available')}
            className={`font-bold text-sm px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'available'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            আবেদনযোগ্য টিউশন জবস ({approvedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('my_applications')}
            className={`font-bold text-sm px-4 py-2 rounded-xl transition-colors ${
              activeTab === 'my_applications'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white'
            }`}
          >
            আমার আবেদনসমূহ ({myApplications.length})
          </button>
        </div>

        {/* Available Jobs to apply */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {approvedJobs.map((job) => {
              const hasApplied = applications.some(a => a.jobId === job.id && a.tutorId === activeTutor.id);
              const isAssigned = job.status === 'assigned';

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {job.id}
                      </span>
                      <span className="font-extrabold text-emerald-700 text-sm">
                        {job.salary.toLocaleString('bn-BD')} ৳/মাস
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <p className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{job.location}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>সপ্তাহে {job.daysPerWeek} দিন • {job.curriculum}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>পছন্দ: {job.genderPreference}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {job.applicantsCount} জন আবেদন করেছেন
                    </span>

                    {hasApplied ? (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>আবেদন করা হয়েছে</span>
                      </span>
                    ) : (
                      <button
                        disabled={isAssigned}
                        onClick={() => onApplyJob(job)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1 ${
                          isAssigned
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isAssigned ? 'নিয়োগ সম্পন্ন' : 'আবেদন করুন'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'my_applications' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              আপনার জমাকৃত সকল আবেদনের বর্তমান স্ট্যাটাস
            </h3>

            {myApplications.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center">আপনি এখনও কোনো টিউশনে আবেদন করেননি।</p>
            ) : (
              <div className="space-y-3">
                {myApplications.map((app, idx) => {
                  const job = jobs.find(j => j.id === app.jobId);
                  if (!job) return null;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {job.id}
                          </span>
                          <strong className="text-sm text-slate-900">{job.title}</strong>
                        </div>
                        <p className="text-slate-600">
                          {job.location} • বেতন: {job.salary} ৳ • আবেদন সময়: {app.appliedAt}
                        </p>
                        <p className="text-slate-500 italic">আপনার নোট: "{app.pitchNote}"</p>
                      </div>

                      <div>
                        {app.status === 'assigned' ? (
                          <span className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs">
                            🎉 অভিনন্দন! আপনাকে ফাইনাল নিয়োগ দেওয়া হয়েছে
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-xl">
                            ⏳ মিডিয়া অ্যাডমিন পর্যালোচনা করছেন
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
