import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, Home, Briefcase, User, Search, MapPin, 
  Banknote, Calendar, CheckCircle2, ShieldCheck, 
  Send, Sparkles, Smartphone, ChevronRight
} from 'lucide-react';
import { TuitionJob } from '../types';

export const MobileAppPreview: React.FC = () => {
  const { jobs, activeTutor, applyForJob, applications } = useApp();
  const [mobileTab, setMobileTab] = useState<'feed' | 'my_jobs' | 'profile'>('feed');
  const [showNotificationPopup, setShowNotificationPopup] = useState(true);

  const approvedJobs = jobs.filter(j => j.status === 'approved');
  const myAppliedJobs = applications.filter(a => a.tutorId === activeTutor.id);

  return (
    <div className="bg-slate-950 py-12 px-4 min-h-screen flex flex-col items-center justify-center">
      
      {/* Intro pitch for Mobile App */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs font-semibold">
          <Smartphone className="w-3.5 h-3.5" />
          <span>মোবাইল অ্যাপ প্রিভিউ (Android & iOS)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          টিউটরদের জন্য ডেডিকেটেড মোবাইল অ্যাপ
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          ক্লায়েন্টদের দেখান কীভাবে অভিভাবক ওয়েবসাইট থেকে রিকোয়েস্ট করলে সাথে সাথে টিউটরদের ফোনে পুশ নোটিফিকেশন পৌঁছে যায়।
        </p>
      </div>

      {/* Simulated Smartphone Shell */}
      <div className="relative w-full max-w-[370px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl shadow-purple-900/20 border-4 border-slate-700 ring-1 ring-white/10">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2"></div>
          <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
        </div>

        {/* Screen Container */}
        <div className="w-full bg-slate-100 rounded-[38px] overflow-hidden flex flex-col h-[650px] text-slate-800 relative select-none">
          
          {/* Top Status Bar */}
          <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-100">
            <span>9:41</span>
            <div className="flex items-center space-x-1 text-[10px]">
              <span>5G</span>
              <span>🔋 100%</span>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-white px-4 py-3 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                টি
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">টিউটর মিডিয়া অ্যাপ</h4>
                <p className="text-[10px] text-emerald-600 font-semibold">অনলাইন টিউটর কানেক্ট</p>
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowNotificationPopup(!showNotificationPopup)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              </button>
            </div>
          </div>

          {/* Simulated Push Notification Banner */}
          {showNotificationPopup && (
            <div className="m-3 p-3 bg-slate-900 text-white rounded-2xl shadow-lg border border-slate-800 animate-in slide-in-from-top-4 duration-200 relative">
              <button 
                onClick={() => setShowNotificationPopup(false)}
                className="absolute top-2 right-2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
              <div className="flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  🔔
                </div>
                <div>
                  <p className="text-[11px] font-bold text-amber-300">নতুন টিউশন অ্যালার্ট!</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">
                    উত্তরা সেক্টর ৭: ক্লাস ১০ পদার্থবিজ্ঞান ও গণিত টিউটর প্রয়োজন। মাসিক ৬,৫০০ ৳।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Screen Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            
            {/* Feed View */}
            {mobileTab === 'feed' && (
              <>
                <div className="bg-emerald-600 text-white p-3.5 rounded-2xl shadow-xs">
                  <p className="text-[10px] text-emerald-100">স্বাগতম, {activeTutor.name}!</p>
                  <h5 className="text-xs font-extrabold mt-0.5">আজকে নতুন ৪টি টিউশন পোস্ট হয়েছে</h5>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-800 px-1 pt-1">
                  <span>সর্বশেষ টিউশনসমূহ</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{approvedJobs.length} টি লাইভ</span>
                </div>

                {approvedJobs.map((job) => {
                  const hasApplied = applications.some(a => a.jobId === job.id && a.tutorId === activeTutor.id);

                  return (
                    <div key={job.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {job.id}
                        </span>
                        <span className="text-xs font-black text-emerald-700">
                          {job.salary.toLocaleString('bn-BD')} ৳/মাস
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {job.title}
                      </h5>

                      <div className="text-[11px] text-slate-500 space-y-0.5">
                        <p className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </p>
                        <p className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span>সপ্তাহে {job.daysPerWeek} দিন • {job.curriculum}</span>
                        </p>
                      </div>

                      <button
                        disabled={hasApplied}
                        onClick={() => applyForJob(job.id, 'মোবাইল অ্যাপ থেকে দ্রুত আবেদন।')}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                          hasApplied
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {hasApplied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>আবেদন গৃহীত হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3" />
                            <span>১-ক্লিকে আবেদন করুন</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </>
            )}

            {/* My Jobs Tab */}
            {mobileTab === 'my_jobs' && (
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-800 px-1">আমার আবেদনের তালিকা</h5>
                {myAppliedJobs.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400">
                    আপনি এখনও কোনো টিউশনে আবেদন করেননি।
                  </div>
                ) : (
                  myAppliedJobs.map((app, idx) => {
                    const job = jobs.find(j => j.id === app.jobId);
                    if (!job) return null;

                    return (
                      <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">{job.id}</span>
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {app.status === 'assigned' ? '🎉 কনফার্মড' : 'পর্যালোচনাধীন'}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900 truncate">{job.title}</p>
                        <p className="text-[11px] text-emerald-700 font-bold">{job.salary} ৳/মাস</p>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Profile Tab */}
            {mobileTab === 'profile' && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-3 text-center">
                <img
                  src={activeTutor.photoUrl}
                  alt={activeTutor.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-emerald-500"
                />
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{activeTutor.name}</h5>
                  <p className="text-[11px] text-emerald-700 font-semibold">{activeTutor.institution}</p>
                  <p className="text-[10px] text-slate-400">{activeTutor.department}</p>
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-900 text-[11px] font-bold">
                  ✓ এনআইডি ও আইডি ভেরিফাইড ব্যাজ একটিভ
                </div>
              </div>
            )}

          </div>

          {/* Bottom App Navigation Tabs */}
          <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[10px] font-bold text-slate-500">
            <button
              onClick={() => setMobileTab('feed')}
              className={`flex flex-col items-center space-y-1 ${
                mobileTab === 'feed' ? 'text-emerald-600' : 'hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>হোম</span>
            </button>

            <button
              onClick={() => setMobileTab('my_jobs')}
              className={`flex flex-col items-center space-y-1 ${
                mobileTab === 'my_jobs' ? 'text-emerald-600' : 'hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>আমার আবেদন</span>
            </button>

            <button
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center space-y-1 ${
                mobileTab === 'profile' ? 'text-emerald-600' : 'hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>প্রোফাইল</span>
            </button>
          </div>

          {/* Home Bar indicator */}
          <div className="bg-white py-1 flex justify-center">
            <div className="w-24 h-1 bg-slate-300 rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
};
