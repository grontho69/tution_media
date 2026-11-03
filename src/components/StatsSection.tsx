import React from 'react';
import { Users, GraduationCap, Building2, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: GraduationCap,
      number: '৫,০০০+',
      label: 'নিবন্ধিত যোগ্য টিউটর',
      detail: 'বুয়েট, ডিইউ, মেডিকেল ও শীর্ষ ভার্সিটি'
    },
    {
      icon: Users,
      number: '১২,৫০০+',
      label: 'সন্তুষ্ট অভিভাবক ও শিক্ষার্থী',
      detail: 'সারা দেশে নিয়মিত টিউশন চলছে'
    },
    {
      icon: Building2,
      number: '৬৪',
      label: 'জেলায় কার্যক্রম চালু',
      detail: 'অনলাইন ও অফলাইন হোম টিউশন'
    },
    {
      icon: Award,
      number: '৯৮%',
      label: 'সন্তুষ্টি ও সফলতা রেট',
      detail: 'ফ্রি ট্রায়াল ও বদলানোর সুবিধা'
    }
  ];

  return (
    <div className="bg-slate-900 text-white py-12 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 ring-1 ring-emerald-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {s.number}
                </div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">
                  {s.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {s.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
