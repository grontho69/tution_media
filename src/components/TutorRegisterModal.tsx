import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, UserPlus, Upload, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Tutor } from '../types';

interface TutorRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorRegisterModal: React.FC<TutorRegisterModalProps> = ({ isOpen, onClose }) => {
  const { registerTutor } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    gender: 'পুরুষ' as Tutor['gender'],
    institution: 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET)',
    department: 'মেকানিক্যাল ইঞ্জিনিয়ারিং',
    yearOfStudy: '২য় বর্ষ',
    hscCollege: 'নটর ডেম কলেজ',
    phone: '',
    email: '',
    preferredAreas: 'মিরপুর, ধানমন্ডি, মোহাম্মদপুর',
    preferredSubjects: 'গণিত, পদার্থবিজ্ঞান, রসায়ন',
    experienceYears: 2,
    expectedSalary: '৬,০০০ - ৮,০০০ ৳',
    bio: 'আমি নিষ্ঠার সাথে বেসিক ধরে পড়াতে পছন্দ করি। সাপ্তাহিক মূল্যায়ন পরীক্ষা নেওয়া হয়।',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    idCardPhotoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.department) {
      alert('দয়া করে নাম, মোবাইল নম্বর এবং বিভাগের নাম দিন।');
      return;
    }

    const areas = formData.preferredAreas.split(',').map(s => s.trim()).filter(Boolean);
    const subjects = formData.preferredSubjects.split(',').map(s => s.trim()).filter(Boolean);

    registerTutor({
      name: formData.name,
      gender: formData.gender,
      institution: formData.institution,
      department: formData.department,
      yearOfStudy: formData.yearOfStudy,
      hscCollege: formData.hscCollege,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      preferredAreas: areas,
      preferredSubjects: subjects,
      experienceYears: Number(formData.experienceYears),
      expectedSalary: formData.expectedSalary,
      bio: formData.bio,
      photoUrl: formData.photoUrl,
      idCardPhotoUrl: formData.idCardPhotoUrl
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
                টিউটর রেজিস্ট্রেশন
              </span>
              <h3 className="text-lg font-bold">টিউটর হিসেবে যুক্ত হোন</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              আপনার যোগ্যতা ও পছন্দের এলাকা উল্লেখ করে প্রোফাইল খুলুন।
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পূর্ণ নাম *</label>
              <input
                type="text"
                required
                placeholder="যেমন: তানভীর আহমেদ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">জেন্ডার *</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-slate-50"
              >
                <option value="পুরুষ">পুরুষ</option>
                <option value="মহিলা">মহিলা</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">বিশ্ববিদ্যালয় / শিক্ষা প্রতিষ্ঠান *</label>
              <input
                type="text"
                required
                placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয় (DU)"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">বিভাগ (Department) & বর্ষ *</label>
              <input
                type="text"
                required
                placeholder="যেমন: রসায়ন, ৩য় বর্ষ"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর *</label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">এইচএসসি কলেজ</label>
              <input
                type="text"
                placeholder="যেমন: নটর ডেম কলেজ"
                value={formData.hscCollege}
                onChange={(e) => setFormData({ ...formData, hscCollege: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">যেসব বিষয় পড়াতে চান (কমা দিয়ে লিখুন) *</label>
            <input
              type="text"
              required
              placeholder="পদার্থবিজ্ঞান, উচ্চতর গণিত, ইংরেজি"
              value={formData.preferredSubjects}
              onChange={(e) => setFormData({ ...formData, preferredSubjects: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পছন্দের টিউশন এলাকা (কমা দিয়ে লিখুন) *</label>
            <input
              type="text"
              required
              placeholder="ধানমন্ডি, মিরপুর, আজিমপুর"
              value={formData.preferredAreas}
              onChange={(e) => setFormData({ ...formData, preferredAreas: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">পড়ানোর অভিজ্ঞতা (বছর)</label>
              <input
                type="number"
                min="0"
                max="15"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">প্রত্যাশিত বেতন</label>
              <input
                type="text"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Student ID / KYC Verification Card */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-900 flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>স্টুডেন্ট আইডি কার্ড / এনআইডি ভেরিফিকেশন (ডেমো)</span>
              </span>
              <span className="text-[10px] bg-emerald-200/80 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                ডেমো প্রি-লোড
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 mb-2">
              টিউশন মিডিয়া কর্তৃপক্ষ আপনার আইডি কার্ড ও পরিচয়পত্র যাচাই করে একাউন্টে নীল "ভেরিফাইড" ব্যাজ প্রদান করবেন।
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-600 bg-white p-2 rounded-xl border border-emerald-200/60">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>student_id_card_sample.jpg সংযুক্ত করা হয়েছে</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">নিজের সম্পর্কে সংক্ষিপ্ত বিবরণ (বায়ো)</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>প্রোফাইল তৈরি সম্পন্ন করুন</span>
          </button>
        </form>

      </div>
    </div>
  );
};
