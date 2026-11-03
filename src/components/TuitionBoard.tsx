import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionJob } from '../types';
import { 
  MapPin, Calendar, Banknote, ShieldAlert, CheckCircle, 
  Clock, ArrowUpRight, Lock, Filter, Search, UserCheck
} from 'lucide-react';

interface TuitionBoardProps {
  onApplyJob: (job: TuitionJob) => void;
  onOpenGuardianModal: () => void;
}

export const TuitionBoard: React.FC<TuitionBoardProps> = ({ onApplyJob, onOpenGuardianModal }) => {
  const { jobs, currentRole } = useApp();
  const [selectedCurriculum, setSelectedCurriculum] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter jobs that are approved or assigned for public board
  const publicJobs = jobs.filter(job => job.status === 'approved' || job.status === 'assigned');

  const filteredJobs = publicJobs.filter(job => {
    if (selectedCurriculum !== 'all' && job.curriculum !== selectedCurriculum) return false;
    if (selectedDistrict !== 'all' && job.district !== selectedDistrict) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchSubjects = job.subjects.some(s => s.toLowerCase().includes(q));
      const matchLocation = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchSubjects && !matchLocation) return false;
    }
    return true;
  });

  return (
    <section id="tuition-jobs" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>লাইভ টিউশন জব বোর্ড</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              সাম্প্রতিক পোস্টকৃত টিউশনসমূহ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              টিউশন পাওয়ার জন্য আবেদন করুন। অ্যাডমিন তথ্য যাচাই করে সেরা টিউটরকে অভিভাবকের সাথে সরাসরি যুক্ত করবেন।
            </p>
          </div>

          <button
            onClick={onOpenGuardianModal}
            className="self-start md:self-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            + আপনার টিউশন পোস্ট করুন
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="বিষয়, এলাকা বা ক্লাস দিয়ে খুঁজুন (যেমন: ধানমন্ডি, ফিজিক্স)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Curriculum Filter */}
            <select
              value={selectedCurriculum}
              onChange={(e) => setSelectedCurriculum(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">সকল কারিকুলাম</option>
              <option value="বাংলা ভার্সন">বাংলা ভার্সন</option>
              <option value="English Version">English Version</option>
              <option value="English Medium">English Medium</option>
            </select>

            {/* District Filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">সকল জেলা</option>
              <option value="ঢাকা">ঢাকা</option>
              <option value="চট্টগ্রাম">চট্টগ্রাম</option>
            </select>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">কোনো টিউশন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => {
              const isAssigned = job.status === 'assigned';

              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg flex flex-col justify-between ${
                    isAssigned 
                      ? 'border-slate-200 opacity-80 bg-slate-50/50' 
                      : 'border-slate-200/90 hover:border-emerald-500/50 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Job Tag & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        আইডি: {job.id}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        {isAssigned ? (
                          <span className="bg-slate-200 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>চূড়ান্ত নিয়োগকৃত</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            <span>আবেদন চলছে</span>
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">{job.createdAt}</span>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2">
                      {job.title}
                    </h3>

                    {/* Subjects badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                      {job.subjects.map((subj, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-50 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded-md border border-emerald-100"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>

                    {/* Meta info list */}
                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>লোকেশন:</span>
                        </span>
                        <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                          {job.location}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>সপ্তাহে দিন:</span>
                        </span>
                        <span className="font-semibold text-slate-800">
                          {job.daysPerWeek} দিন
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center space-x-1.5 text-slate-500">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>পছন্দ:</span>
                        </span>
                        <span className="font-medium text-slate-700">
                          {job.genderPreference}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Alert note for prospective clients to see the value */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center space-x-1 text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded-lg mb-3">
                      <Lock className="w-3 h-3 flex-shrink-0 text-amber-600" />
                      <span className="truncate">অভিভাবকের ফোন ও ঠিকানা কেবল অ্যাডমিন সুরক্ষিত</span>
                    </div>

                    {/* Bottom Pricing & Apply Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">সম্মানী / বেতন:</span>
                        <span className="text-base font-extrabold text-emerald-700">
                          {job.salary.toLocaleString('bn-BD')} ৳<span className="text-xs font-normal text-slate-500">/মাস</span>
                        </span>
                      </div>

                      <button
                        disabled={isAssigned}
                        onClick={() => onApplyJob(job)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1 transition-all ${
                          isAssigned
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/30'
                        }`}
                      >
                        <span>{isAssigned ? 'নিয়োগ সম্পন্ন' : 'আবেদন করুন'}</span>
                        {!isAssigned && <ArrowUpRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Applicant count notice */}
                    <div className="mt-2 text-right">
                      <span className="text-[10px] text-slate-400">
                        {job.applicantsCount > 0 ? `${job.applicantsCount} জন আবেদন করেছেন` : 'নতুন পোস্ট - দ্রুত আবেদন করুন'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
