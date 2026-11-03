import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, CheckCircle2, Clock, Users, Banknote, 
  Phone, MapPin, Eye, UserCheck, AlertCircle, Sparkles, Filter, 
  Check, ArrowRight, ExternalLink, Calendar, Search
} from 'lucide-react';
import { TuitionJob, Tutor } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    jobs, 
    tutors, 
    applications, 
    approveJob, 
    assignTutor, 
    verifyTutor,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'kyc' | 'matching' | 'commissions'>('requests');
  const [selectedJobForMatching, setSelectedJobForMatching] = useState<string>(
    jobs.find(j => j.status === 'approved')?.id || jobs[0]?.id || ''
  );

  // Stats calculation
  const pendingJobs = jobs.filter(j => j.status === 'pending_review');
  const approvedJobs = jobs.filter(j => j.status === 'approved');
  const assignedJobs = jobs.filter(j => j.status === 'assigned');
  const unverifiedTutors = tutors.filter(t => !t.isVerified);
  
  // Calculate simulated 50% first-month media commission
  const totalCommissionEarned = assignedJobs.reduce((acc, curr) => acc + (curr.salary * 0.5), 0);
  const potentialCommission = approvedJobs.reduce((acc, curr) => acc + (curr.salary * 0.5), 0);

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>সুপার অ্যাডমিন ও মিডিয়া কন্ট্রোল প্যানেল</span>
                </span>
                <span className="text-emerald-400 text-xs font-semibold">লাইভ কন্ট্রোল</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
                টিউশন মিডিয়া অপারেশন ও ম্যাচমেকিং সেন্টার
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                ফেসবুকের বিশৃঙ্খলা বাদ দিয়ে এক ক্লিকে অভিভাবকের রিকোয়েস্ট অনুমোদন করুন, টিউটর ভেরিফাই করুন এবং সঠিক শিক্ষক অ্যাসাইন করে কমিশন নিশ্চিত করুন।
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center space-x-4 self-start md:self-auto">
              <div>
                <p className="text-[11px] text-slate-300">চলতি মাসের সম্ভাব্য কমিশন:</p>
                <p className="text-2xl font-black text-amber-300">
                  {(totalCommissionEarned + potentialCommission).toLocaleString('bn-BD')} ৳
                </p>
                <p className="text-[10px] text-emerald-400 font-medium">নিশ্চিত অর্জিত: {totalCommissionEarned.toLocaleString('bn-BD')} ৳</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">পেন্ডিং রিকোয়েস্ট</p>
              <p className="text-xl font-extrabold text-slate-900">{pendingJobs.length} টি</p>
              <span className="text-[10px] text-amber-600 font-semibold">যাচাইয়ের অপেক্ষায়</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">অনুমোদিত লাইভ টিউশন</p>
              <p className="text-xl font-extrabold text-slate-900">{approvedJobs.length} টি</p>
              <span className="text-[10px] text-emerald-600 font-semibold">আবেদন চলছে</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">নিবন্ধিত টিউটর</p>
              <p className="text-xl font-extrabold text-slate-900">{tutors.length} জন</p>
              <span className="text-[10px] text-blue-600 font-semibold">
                {unverifiedTutors.length > 0 ? `${unverifiedTutors.length} জনের KYC বাকি` : 'সকল টিউটর ভেরিফাইড'}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">মিডিয়া ডিল কনফার্ম</p>
              <p className="text-xl font-extrabold text-slate-900">{assignedJobs.length} টি</p>
              <span className="text-[10px] text-purple-600 font-semibold">টিউটর অ্যাসাইন সম্পন্ন</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-1.5 border border-slate-200 flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'requests'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>১. নতুন টিউশন রিকোয়েস্ট যাচাই</span>
            {pendingJobs.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {pendingJobs.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('kyc')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'kyc'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>২. টিউটর ভেরিফিকেশন (KYC)</span>
            {unverifiedTutors.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {unverifiedTutors.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('matching')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'matching'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>৩. ম্যাচমেকিং ও টিউটর নির্বাচন</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
              {applications.length} আবেদন
            </span>
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'commissions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>৪. কমিশন ও পেমেন্ট হিস্ট্রি</span>
          </button>
        </div>

        {/* Tab 1: Requests Verification & Approval */}
        {activeTab === 'requests' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  অভিভাবকের জমাকৃত টিউশন রিকোয়েস্ট তালিকা
                </h3>
                <p className="text-xs text-slate-500">
                  অভিভাবকের ফোন নম্বরে কল করে সত্যতা নিশ্চিত করুন, তারপর "জব বোর্ডে লাইভ করুন" ক্লিক করুন।
                </p>
              </div>
              <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full self-start">
                মোট {jobs.length}টি পোস্ট
              </span>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => {
                const isPending = job.status === 'pending_review';
                const isApproved = job.status === 'approved';
                const isAssigned = job.status === 'assigned';

                return (
                  <div
                    key={job.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      isPending
                        ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200'
                        : isAssigned
                        ? 'bg-slate-50/70 border-slate-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      {/* Left: Job & Guardian Confidential Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                            {job.id}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {job.title}
                          </span>
                          {isPending && (
                            <span className="text-[11px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full animate-pulse">
                              ⏳ নতুন রিকোয়েস্ট (যাচাই প্রয়োজন)
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                              ✓ লাইভ অনুমোদিত (আবেদন চলছে)
                            </span>
                          )}
                          {isAssigned && (
                            <span className="text-[11px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                              🎯 টিউটর নিয়োগ সম্পন্ন
                            </span>
                          )}
                        </div>

                        {/* Guardian Confidential Box - Admin super power */}
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl text-xs space-y-1.5 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-amber-400 font-bold flex items-center space-x-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>অভিভাবকের কন্টাক্ট (কেবল অ্যাডমিন দেখতে পারে):</span>
                            </span>
                            <span className="text-slate-400 text-[10px]">{job.createdAt}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-medium">
                            <span className="flex items-center space-x-1 text-slate-200">
                              <span>নাম:</span>
                              <strong className="text-white">{job.guardianName}</strong>
                            </span>
                            <span className="flex items-center space-x-1 text-emerald-300">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <strong className="underline">{job.guardianPhone}</strong>
                            </span>
                            <span className="flex items-center space-x-1 text-slate-200 truncate">
                              <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                              <span className="truncate">{job.guardianAddress}</span>
                            </span>
                          </div>
                        </div>

                        {/* Academic details */}
                        <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                          <span>ক্লাস: <strong>{job.classGrade}</strong></span>
                          <span>কারিকুলাম: <strong>{job.curriculum}</strong></span>
                          <span>দিন: <strong>{job.daysPerWeek} দিন/সপ্তাহ</strong></span>
                          <span>বেতন: <strong className="text-emerald-700">{job.salary.toLocaleString('bn-BD')} ৳</strong></span>
                          <span>পছন্দ: <strong>{job.genderPreference}</strong></span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px]">
                        {isPending && (
                          <button
                            onClick={() => approveJob(job.id)}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>অনুমোদন ও লাইভ করুন</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedJobForMatching(job.id);
                            setActiveTab('matching');
                          }}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
                        >
                          <Users className="w-4 h-4 text-emerald-600" />
                          <span>আবেদনকারী টিউটর ({job.applicantsCount})</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: KYC Verification of Tutors */}
        {activeTab === 'kyc' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">
                টিউটর ডকুমেন্ট ও এনআইডি/আইডি কার্ড যাচাই (KYC)
              </h3>
              <p className="text-xs text-slate-500">
                নিবন্ধিত শিক্ষকের পরিচয় ও বিশ্ববিদ্যালয় স্টুডেন্ট কার্ড পরীক্ষা করে একাউন্টে ভেরিফাইড ব্যাজ অনুমোদন করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    !tutor.isVerified
                      ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={tutor.photoUrl}
                      alt={tutor.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{tutor.name}</h4>
                        {tutor.isVerified ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            ✓ ভেরিফাইড
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full animate-pulse">
                            ভেরিফিকেশন অপেক্ষমান
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-emerald-700">{tutor.institution}</p>
                      <p className="text-[11px] text-slate-500">{tutor.department} ({tutor.yearOfStudy})</p>
                      <p className="text-[11px] text-slate-600 font-mono mt-0.5">ফোন: {tutor.phone}</p>
                    </div>
                  </div>

                  {/* ID Card preview simulation */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      সংযুক্ত আইডি কার্ড / স্টুডেন্ট কার্ড প্রিভিউ:
                    </span>
                    <div className="flex items-center space-x-3">
                      <img
                        src={tutor.idCardPhotoUrl}
                        alt="ID Card"
                        className="w-16 h-10 rounded-lg object-cover border border-slate-300"
                      />
                      <span className="text-[11px] text-slate-500">
                        বিশ্ববিদ্যালয় আইডি কার্ড ডকুমেন্টের সত্যতা পরীক্ষা করা হয়েছে।
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">অভিজ্ঞতা: {tutor.experienceYears} বছর</span>
                    {!tutor.isVerified ? (
                      <button
                        onClick={() => verifyTutor(tutor.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>ভেরিফাই অনুমোদন করুন</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>যাচাই সম্পন্ন</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Matchmaking & Assigning Tutors */}
        {activeTab === 'matching' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  টিউশন অনুযায়ী টিউটর শর্টলিস্ট ও নিয়োগ (ম্যাচমেকিং)
                </h3>
                <p className="text-xs text-slate-500">
                  নির্দিষ্ট টিউশনের জন্য আবেদন করা শিক্ষকদের মধ্য থেকে সেরা শিক্ষককে নির্বাচন করুন।
                </p>
              </div>

              {/* Selector for which job */}
              <select
                value={selectedJobForMatching}
                onChange={(e) => setSelectedJobForMatching(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-800 outline-none"
              >
                {jobs.map(j => (
                  <option key={j.id} value={j.id}>
                    {j.id} - {j.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Currently selected Job details summary */}
            {(() => {
              const currentJob = jobs.find(j => j.id === selectedJobForMatching);
              if (!currentJob) return <p className="text-xs text-slate-500">কোনো টিউশন নির্বাচন করা হয়নি।</p>;

              const currentJobApps = applications.filter(a => a.jobId === currentJob.id);

              return (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                        নির্বাচিত টিউশন আইডি: {currentJob.id}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{currentJob.title}</h4>
                      <p className="text-xs text-slate-300">
                        লোকেশন: {currentJob.location} • বেতন: {currentJob.salary.toLocaleString('bn-BD')} ৳ • স্ট্যাটাস: {currentJob.status}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-amber-300 font-bold block">
                        মোট আবেদন: {currentJobApps.length} জন
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {currentJob.assignedTutorId ? 'টিউটর অ্যাসাইন সম্পন্ন হয়েছে' : 'বাছাই চলছে'}
                      </span>
                    </div>
                  </div>

                  {/* Applicants List */}
                  {currentJobApps.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <p className="text-xs text-slate-500">এই টিউশনটিতে এখনও কোনো টিউটর আবেদন করেননি।</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-slate-700">আবেদনকারীদের তালিকা ও যোগ্যতা:</h5>
                      {currentJobApps.map((app) => {
                        const applicantTutor = tutors.find(t => t.id === app.tutorId);
                        if (!applicantTutor) return null;

                        const isAssignedToThis = currentJob.assignedTutorId === applicantTutor.id;

                        return (
                          <div
                            key={app.tutorId}
                            className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                              isAssignedToThis
                                ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500'
                                : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex items-start space-x-3.5">
                              <img
                                src={applicantTutor.photoUrl}
                                alt={applicantTutor.name}
                                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-200"
                              />
                              <div className="text-xs space-y-1">
                                <div className="flex items-center space-x-2">
                                  <strong className="text-slate-900 text-sm">{applicantTutor.name}</strong>
                                  {applicantTutor.isVerified && (
                                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                      ✓ ভেরিফাইড
                                    </span>
                                  )}
                                  <span className="text-slate-400">• {app.appliedAt}</span>
                                </div>
                                <p className="font-semibold text-emerald-700">
                                  {applicantTutor.institution} — {applicantTutor.department}
                                </p>
                                <p className="text-slate-600 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                  "{app.pitchNote}"
                                </p>
                                <div className="flex items-center space-x-3 text-slate-500 pt-0.5">
                                  <span>ফোন: {applicantTutor.phone}</span>
                                  <span>•</span>
                                  <span>রেটিং: ★ {applicantTutor.rating}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 self-end md:self-auto">
                              {isAssignedToThis ? (
                                <span className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1 shadow-sm">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>চূড়ান্ত নিয়োগকৃত</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => assignTutor(currentJob.id, applicantTutor.id)}
                                  className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1"
                                >
                                  <span>এই টিউটরকে নির্বাচন করুন</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Tab 4: Commissions & Revenue */}
        {activeTab === 'commissions' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">
                মিডিয়া সার্ভিস ফি ও কমিশন ট্র্যাকিং লেজার
              </h3>
              <p className="text-xs text-slate-500">
                টিউটর নিয়োগ সম্পন্ন হওয়ার পর প্রথম মাসের টিউশন ফি থেকে ৫০% মিডিয়া কমিশন স্বয়ংক্রিয়ভাবে হিসাব করা হয়।
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">টিউশন আইডি</th>
                    <th className="py-3 px-4 font-bold">অভিভাবকের নাম ও ফোন</th>
                    <th className="py-3 px-4 font-bold">নিযুক্ত টিউটর</th>
                    <th className="py-3 px-4 font-bold">মাসিক বেতন</th>
                    <th className="py-3 px-4 font-bold text-emerald-700">৫০% মিডিয়া ফি</th>
                    <th className="py-3 px-4 font-bold">পেমেন্ট স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assignedJobs.map((job) => {
                    const tutor = tutors.find(t => t.id === job.assignedTutorId);
                    const fee = job.salary * 0.5;

                    return (
                      <tr key={job.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{job.id}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-900">{job.guardianName}</p>
                          <p className="text-[11px] text-slate-500">{job.guardianPhone}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-emerald-700">{tutor?.name || 'টিউটর'}</p>
                          <p className="text-[11px] text-slate-500">{tutor?.institution}</p>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          {job.salary.toLocaleString('bn-BD')} ৳
                        </td>
                        <td className="py-3.5 px-4 font-black text-emerald-600 text-sm">
                          {fee.toLocaleString('bn-BD')} ৳
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                            ✓ আদায় সম্পন্ন
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
