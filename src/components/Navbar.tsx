import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Phone, PlusCircle, Search, ShieldCheck, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenGuardianModal: () => void;
  onOpenTutorModal: () => void;
  onScrollToJobs: () => void;
  onScrollToTutors: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuardianModal,
  onOpenTutorModal,
  onScrollToJobs,
  onScrollToTutors
}) => {
  const { currentRole, setCurrentRole } = useApp();

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-10 z-40 border-b border-slate-200/80 shadow-xs">
      {/* Top mini emergency notice bar */}
      <div className="bg-emerald-50 text-emerald-800 text-xs py-1.5 px-4 border-b border-emerald-100 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">ভেরিফাইড</span>
            <span>ঢাকা, চট্টগ্রামসহ সারা বাংলাদেশের সেরা বিশ্ববিদ্যালয়গুলোর গৃহশিক্ষক নেটওয়ার্ক</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-700">হটলাইন: ০১৯১১-০০২২৩৩</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">সকাল ৯টা - রাত ১০টা</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentRole('public')}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">টিউশন</span>
              <span className="font-extrabold text-xl text-emerald-600">মিডিয়া</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">BD</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">বিশ্বস্ত প্রাইভেট টিউটর খোঁজার নির্ভরযোগ্য প্ল্যাটফর্ম</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <button 
            onClick={onScrollToJobs}
            className="hover:text-emerald-600 transition-colors flex items-center space-x-1"
          >
            <span>টিউশন বোর্ড</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">লাইভ</span>
          </button>
          <button 
            onClick={onScrollToTutors}
            className="hover:text-emerald-600 transition-colors"
          >
            সেরা টিউটরগণ
          </button>
          <button 
            onClick={() => setCurrentRole('admin')}
            className="hover:text-emerald-600 transition-colors flex items-center space-x-1 text-slate-500"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>অ্যাডমিন প্যানেল</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenGuardianModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-sm shadow-emerald-600/30 hover:shadow-md transition-all flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>শিক্ষক প্রয়োজন (ফ্রি)</span>
          </button>

          <button
            onClick={onOpenTutorModal}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors border border-slate-200 flex items-center space-x-1"
          >
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">টিউটর হিসেবে</span>
            <span>যুক্ত হোন</span>
          </button>
        </div>
      </div>
    </header>
  );
};
