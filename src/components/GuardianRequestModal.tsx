import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, ShieldCheck, Lock, Phone, MapPin, BookOpen, AlertCircle } from 'lucide-react';
import { TuitionJob } from '../types';

interface GuardianRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTutorName?: string;
}

export const GuardianRequestModal: React.FC<GuardianRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedTutorName
}) => {
  const { addGuardianRequest } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    classGrade: 'ক্লাস ৯ (বিজ্ঞান বিভাগ)',
    curriculum: 'বাংলা ভার্সন' as TuitionJob['curriculum'],
    subjects: 'পদার্থবিজ্ঞান, সাধারণ গণিত',
    daysPerWeek: 3,
    salary: 6000,
    district: 'ঢাকা',
    location: 'মিরপুর ১০, ঢাকা',
    genderPreference: 'ছেলে বা মেয়ে যেকোনো' as TuitionJob['genderPreference'],
    guardianName: '',
    guardianPhone: '',
    guardianAddress: '',
    additionalNotes: preselectedTutorName ? `পছন্দের টিউটর: ${preselectedTutorName}` : ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guardianName || !formData.guardianPhone || !formData.location) {
      alert('দয়া করে অভিভাবকের নাম, মোবাইল নম্বর এবং এলাকা পূরণ করুন।');
      return;
    }

    const titleText = formData.title || `${formData.classGrade} - ${formData.curriculum} টিউটর আবশ্যক`;
    const subjectsArray = formData.subjects.split(',').map(s => s.trim()).filter(Boolean);

    addGuardianRequest({
      title: titleText,
      classGrade: formData.classGrade,
      curriculum: formData.curriculum,
      subjects: subjectsArray.length > 0 ? subjectsArray : ['সকল বিষয়'],
      daysPerWeek: Number(formData.daysPerWeek),
      salary: Number(formData.salary),
      district: formData.district,
      location: formData.location,
      genderPreference: formData.genderPreference,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      guardianAddress: formData.guardianAddress || formData.location,
      additionalNotes: formData.additionalNotes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                অভিভাবক ফর্ম
              </span>
              <h3 className="text-lg font-bold">প্রাইভেট টিউটর রিকোয়েস্ট করুন</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              সঠিক তথ্য দিন, আমাদের টিম দ্রুত যাচাই করে সেরা টিউটর নিশ্চিত করবে।
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-sm">
          
          {/* Privacy Trust Banner */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-start space-x-2 text-xs text-amber-900">
            <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">১০০% তথ্যের নিরাপত্তা গ্যারান্টি</p>
              <p className="text-[11px] text-amber-800">
                ফেসবুকের মতো আপনার মোবাইল নম্বর কোনো পাবলিক গ্রুপে ছড়াবে না। এটি কেবল মিডিয়া অ্যাডমিন সুরক্ষিতভাবে দেখতে পারবে।
              </p>
            </div>
          </div>

          {/* Student Academic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষার্থীর শ্রেণি / ক্লাস *</label>
              <select
                value={formData.classGrade}
                onChange={(e) => setFormData({ ...formData, classGrade: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value="কেজি - ক্লাস ৫">কেজি - ক্লাস ৫</option>
                <option value="ক্লাস ৬ - ৮ (JSC)">ক্লাস ৬ - ৮ (JSC)</option>
                <option value="ক্লাস ৯ (বিজ্ঞান বিভাগ)">ক্লাস ৯ (বিজ্ঞান বিভাগ)</option>
                <option value="ক্লাস ১০ (SSC ব্যাচ)">ক্লাস ১০ (SSC ব্যাচ)</option>
                <option value="এইচএসসি ১ম বর্ষ">এইচএসসি ১ম বর্ষ</option>
                <option value="এইচএসসি ২য় বর্ষ">এইচএসসি ২য় বর্ষ</option>
                <option value="O-Level / A-Level">O-Level / A-Level</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">কারিকুলাম মাধ্যম *</label>
              <select
                value={formData.curriculum}
                onChange={(e) => setFormData({ ...formData, curriculum: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value="বাংলা ভার্সন">বাংলা ভার্সন</option>
                <option value="English Version">English Version</option>
                <option value="English Medium">English Medium</option>
                <option value="মাদরাসা">মাদরাসা ব্যাকগ্রাউন্ড</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">যেসব বিষয় পড়াতে হবে *</label>
            <input
              type="text"
              required
              placeholder="যেমন: পদার্থবিজ্ঞান, উচ্চতর গণিত বা সব বিষয়"
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Days, Salary, Gender preference */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">সপ্তাহে কতদিন? *</label>
              <select
                value={formData.daysPerWeek}
                onChange={(e) => setFormData({ ...formData, daysPerWeek: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value={2}>২ দিন</option>
                <option value={3}>৩ দিন</option>
                <option value={4}>৪ দিন</option>
                <option value={5}>৫ দিন</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">বাজেট / বেতন (টাকা) *</label>
              <input
                type="number"
                step="500"
                min="2000"
                required
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">শিক্ষকের জেন্ডার *</label>
              <select
                value={formData.genderPreference}
                onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value="ছেলে বা মেয়ে যেকোনো">যেকোনো</option>
                <option value="শুধু ছেলে টিউটর">শুধু ছেলে</option>
                <option value="শুধু মেয়ে টিউটর">শুধু মেয়ে</option>
              </select>
            </div>
          </div>

          {/* Location & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">জেলা *</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value="ঢাকা">ঢাকা</option>
                <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                <option value="রাজশাহী">রাজশাহী</option>
                <option value="সিলেট">সিলেট</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">এলাকা / লোকেশন *</label>
              <input
                type="text"
                required
                placeholder="যেমন: উত্তরা সেক্টর ৭ বা ধানমন্ডি ২৭"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Guardian Private Contacts (Admin only) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>অভিভাবকের গোপনীয় তথ্য (কেবল অ্যাডমিন দেখতে পারবে)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">অভিভাবকের পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: রফিকুল ইসলাম"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">বিস্তারিত ঠিকানা (বাসা/রোড নম্বর)</label>
              <input
                type="text"
                placeholder="যেমন: বাসা ১২, রোড ৪, ব্লক বি"
                value={formData.guardianAddress}
                onChange={(e) => setFormData({ ...formData, guardianAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">অতিরিক্ত কোনো শর্ত বা চাহিদা (যদি থাকে)</label>
            <textarea
              rows={2}
              placeholder="যেমন: বুয়েটের টিউটর অগ্রাধিকার পাবে..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>টিউশন রিকোয়েস্ট নিশ্চিত করুন</span>
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              রিকোয়েস্ট করার পর অ্যাডমিন ফোন করে বিস্তারিত যাচাই করবেন।
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
