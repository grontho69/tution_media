import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                টিউশন<span className="text-emerald-500">মিডিয়া</span> BD
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              সারা বাংলাদেশের শিক্ষার্থী এবং শিক্ষকদের জন্য সবচেয়ে নিরাপদ ও আধুনিক টিউটর ম্যাচিং প্ল্যাটফর্ম।
            </p>
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% এনআইডি ও আইডি ভেরিফাইড নেটওয়ার্ক</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#tuition-jobs" className="hover:text-emerald-400 transition-colors">সাম্প্রতিক টিউশন বোর্ড</a></li>
              <li><a href="#top-tutors" className="hover:text-emerald-400 transition-colors">সেরা টিউটরদের তালিকা</a></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">অভিভাবকদের মতামত</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">টিউটর নীতি ও শর্তাবলী</span></li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">জনপ্রিয় টিউশন জোন</h4>
            <ul className="space-y-2 text-slate-400">
              <li>উত্তরা (সেক্টর ১ - ১৪)</li>
              <li>ধানমন্ডি ও লালমাটিয়া</li>
              <li>মিরপুর (১, ২, ৬, ১০, ১২)</li>
              <li>বসুন্ধরা আবাসিক এলাকা ও বারিধারা</li>
              <li>চট্টগ্রাম (আগ্রাবাদ, জিইসি, নাসিরাবাদ)</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">যোগাযোগ ও হেল্পডেস্ক</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>হটলাইন: ০১৯১১-০০২২৩৩</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>support@tuitionmediabd.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>বাড়ি ৪২, রোড ৭, ধানমন্ডি, ঢাকা</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-3">
          <p>© ২০২৬ টিউশন মিডিয়া বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center space-x-1">
            <span>নির্মিত হয়েছে বাংলাদেশের বিশ্বস্ত টিউশন সার্ভিসের জন্য</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
