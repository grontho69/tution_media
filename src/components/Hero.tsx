import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Sparkles, MapPin, BookOpen, Users, ArrowRight } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: { district: string; classGrade: string; medium: string }) => void;
  onOpenGuardianModal: () => void;
  onOpenTutorModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenGuardianModal, onOpenTutorModal }) => {
  const [district, setDistrict] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [medium, setMedium] = useState('');

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ district, classGrade, medium });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Background soft glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 to-teal-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & Search Bar */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-emerald-100/80 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>বাংলাদেশের নির্ভরযোগ্য টিউটর ম্যাচিং প্ল্যাটফর্ম</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.25]">
              আপনার সন্তানের ভবিষ্যতের জন্য <br />
              <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
                সেরা ও ভেরিফাইড
              </span>{' '}
              গৃহশিক্ষক খুঁজুন
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              বুয়েট, ঢাকা বিশ্ববিদ্যালয়, মেডিকেল কলেজসহ দেশের শীর্ষ শিক্ষা প্রতিষ্ঠানের অভিজ্ঞ শিক্ষক বাছাই করুন। অভিভাবকের জন্য রিকোয়েস্ট পোস্ট করা সম্পূর্ণ ফ্রি!
            </p>

            {/* Quick trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-700 pt-1">
              <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>২ দিনের ফ্রি ট্রায়াল ক্লাস</span>
              </span>
              <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>১০০% এনআইডি ও আইডি ভেরিফাইড</span>
              </span>
              <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>৪৮ ঘণ্টার মধ্যে টিউটর কনফার্ম</span>
              </span>
            </div>

            {/* Search Box Card */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 mt-4">
              <form onSubmit={handleSearchClick} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* District */}
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    <option value="ঢাকা">ঢাকা জেলা</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম জেলা</option>
                    <option value="রাজশাহী">রাজশাহী জেলা</option>
                    <option value="সিলেট">সিলেট জেলা</option>
                    <option value="খুলনা">খুলনা জেলা</option>
                  </select>
                </div>

                {/* Class */}
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="">শ্রেণি / ক্লাস</option>
                    <option value="Class 1-5">কেজি - ক্লাস ৫</option>
                    <option value="Class 6-8">ক্লাস ৬ - ৮ (JSC)</option>
                    <option value="Class 9-10">ক্লাস ৯ - ১০ (SSC)</option>
                    <option value="HSC">এইচএসসি (HSC 1st/2nd)</option>
                    <option value="O-Level">O-Level / A-Level</option>
                  </select>
                </div>

                {/* Medium */}
                <div>
                  <select
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="">মাধ্যম (Medium)</option>
                    <option value="বাংলা ভার্সন">বাংলা ভার্সন</option>
                    <option value="English Version">English Version</option>
                    <option value="English Medium">English Medium</option>
                    <option value="মাদরাসা">মাদরাসা ব্যাকগ্রাউন্ড</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="sm:col-span-3 pt-1 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2 text-sm"
                  >
                    <Search className="w-4 h-4" />
                    <span>টিউশন ও টিউটর ফিল্টার করুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenGuardianModal}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>সরাসরি টিউটর রিকোয়েস্ট করুন</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Interactive Trust Card / Tutor Preview */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/60 border border-slate-200/80 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">সর্বশেষ ম্যাচিং আপডেট</span>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full">
                  সরাসরি মিডিয়া কন্ট্রোল
                </span>
              </div>

              {/* Sample featured tutor mini-profile */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-start space-x-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Tutor"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-sm font-bold text-slate-900 truncate">তানভীর আহমেদ</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">✓ ভেরিফাইড</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium truncate">বুয়েট (BUET) • EEE ৪র্থ বর্ষ</p>
                    <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                      <span className="text-amber-500 font-bold">★ ৪.৯ (১৪টি রিভিউ)</span>
                      <span>•</span>
                      <span>ধানমন্ডি, মিরপুর</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">বিষয়: পদার্থবিজ্ঞান ও উচ্চতর গণিত</span>
                  <span className="font-bold text-emerald-700">বেতন: ৭,০০০ ৳</span>
                </div>
              </div>

              {/* Live Matching Feed simulation */}
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2.5 bg-emerald-50/80 rounded-xl text-emerald-900 border border-emerald-100">
                  <span className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>উত্তরা সেক্টর ৭: ম্যাথ টিউটর কনফার্ম হয়েছে</span>
                  </span>
                  <span className="text-[10px] text-slate-500">১০ মি. আগে</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>ধানমন্ডি: ইংলিশ মিডিয়াম টিউটর আবেদন চলছে</span>
                  </span>
                  <span className="text-[10px] text-slate-500">২৫ মি. আগে</span>
                </div>
              </div>

              {/* Bottom Quick Action for Tutors */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">আপনি কি শিক্ষকতা করতে চান?</p>
                  <p className="text-[11px] text-slate-500">প্রতি মাসে হাজারো নতুন টিউশন পোস্ট</p>
                </div>
                <button
                  onClick={onOpenTutorModal}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors border border-emerald-200"
                >
                  ফ্রি প্রোফাইল খুলুন
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
