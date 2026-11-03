import React from 'react';
import { useApp } from '../context/AppContext';
import { Tutor } from '../types';
import { 
  GraduationCap, CheckCircle2, Star, MapPin, 
  BookOpen, Award, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface TutorDirectoryProps {
  onSelectTutorToHire: (tutor: Tutor) => void;
  onOpenTutorModal: () => void;
}

export const TutorDirectory: React.FC<TutorDirectoryProps> = ({ 
  onSelectTutorToHire, 
  onOpenTutorModal 
}) => {
  const { tutors } = useApp();

  // Show verified tutors first
  const displayTutors = [...tutors].sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0));

  return (
    <section id="top-tutors" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-emerald-700 text-xs font-bold tracking-wide uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>আইডি ও সার্টিফিকেট ভেরিফাইড</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              আমাদের সেরা ও অভিজ্ঞ গৃহশিক্ষকবৃন্দ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              দেশের সেরা পাবলিক বিশ্ববিদ্যালয় ও স্বনামধন্য মেডিকেল কলেজের মেধাবী শিক্ষার্থীদের মধ্য থেকে বাছাইকৃত।
            </p>
          </div>

          <button
            onClick={onOpenTutorModal}
            className="self-start md:self-auto text-emerald-700 hover:text-emerald-800 text-sm font-bold flex items-center space-x-1 border border-emerald-200 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <span>সকল টিউটর প্রোফাইল দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 p-5 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Tutor Profile Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={tutor.photoUrl}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                    />
                    {tutor.isVerified && (
                      <span 
                        title="অ্যাডমিন ভেরিফাইড টিউটর"
                        className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 shadow"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-slate-900 text-base truncate">{tutor.name}</h3>
                    </div>
                    
                    <p className="text-xs font-semibold text-emerald-700 flex items-center space-x-1 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{tutor.institution}</span>
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{tutor.department} ({tutor.yearOfStudy})</p>

                    <div className="flex items-center space-x-2 mt-1.5">
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        <span>{tutor.rating}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {tutor.totalTuitionsCompleted}টি টিউশন সম্পন্ন
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                  "{tutor.bio}"
                </p>

                {/* Details Section */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">পছন্দের বিষয়সমূহ:</span>
                    <div className="flex flex-wrap gap-1">
                      {tutor.preferredSubjects.slice(0, 3).map((subj, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-md">
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">পছন্দের টিউশন এলাকা:</span>
                    <div className="flex items-center text-slate-600 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 mr-1 flex-shrink-0" />
                      <span className="truncate">{tutor.preferredAreas.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">প্রত্যাশিত বেতন:</span>
                  <span className="text-xs font-bold text-slate-800">{tutor.expectedSalary}</span>
                </div>

                <button
                  onClick={() => onSelectTutorToHire(tutor)}
                  className="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-xs px-3.5 py-2 rounded-xl transition-all border border-emerald-200"
                >
                  এই টিউটরকে নির্বাচন করুন
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join as Tutor CTA Box */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-emerald-700/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              আপনি কি দেশের শীর্ষ কোনো বিশ্ববিদ্যালয়ে পড়ছেন?
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              আমাদের প্ল্যাটফর্মে একজন ভেরিফাইড গৃহশিক্ষক হিসেবে যুক্ত হোন। আপনার পছন্দের এলাকায় সুবিধাজনক সময়ে টিউশন পেয়ে যান সহজে।
            </p>
          </div>

          <button
            onClick={onOpenTutorModal}
            className="bg-white hover:bg-slate-100 text-emerald-800 font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-md whitespace-nowrap"
          >
            ফ্রি টিউটর রেজিস্ট্রেশন করুন
          </button>
        </div>

      </div>
    </section>
  );
};
