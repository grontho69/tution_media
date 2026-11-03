import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TuitionJob } from '../types';
import { X, Send, MapPin, Banknote, Calendar, BookOpen, User } from 'lucide-react';

interface JobApplyModalProps {
  job: TuitionJob | null;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, onClose }) => {
  const { applyForJob, activeTutor } = useApp();
  const [pitchNote, setPitchNote] = useState('আমি এই টিউশনটিতে পড়াতে অত্যন্ত আগ্রহী। আমার নিয়মিত অভিজ্ঞতা আছে এবং এলাকার যাতায়াত সুবিধাজনক।');

  if (!job) return null;

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyForJob(job.id, pitchNote);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
              টিউশন আবেদন
            </span>
            <h3 className="text-base font-bold mt-1">টিউশন আইডি: {job.id}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleConfirmApply} className="p-6 space-y-4 text-sm">
          {/* Job summary card */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate">{job.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold text-slate-800">{job.salary.toLocaleString('bn-BD')} ৳/মাস</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{job.daysPerWeek} দিন/সপ্তাহ</span>
              </span>
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>{job.curriculum}</span>
              </span>
            </div>
          </div>

          {/* Active Tutor identity */}
          <div className="flex items-center space-x-3 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <img
              src={activeTutor.photoUrl}
              alt={activeTutor.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/40"
            />
            <div className="text-xs">
              <p className="font-bold text-slate-900">{activeTutor.name}</p>
              <p className="text-slate-500">{activeTutor.institution} ({activeTutor.department})</p>
            </div>
          </div>

          {/* Pitch Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              অভিভাবক ও অ্যাডমিনের জন্য আপনার বিশেষ বার্তা (Pitch Note)
            </label>
            <textarea
              rows={3}
              required
              value={pitchNote}
              onChange={(e) => setPitchNote(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs"
              placeholder="আপনি কেন এই টিউশনের জন্য উপযুক্ত..."
            />
          </div>

          <div className="text-[11px] text-slate-500 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
            💡 <strong>মনে রাখবেন:</strong> অ্যাডমিন আপনার রেজুমি এবং আবেদনের নোট দেখে যাচাই করবেন। নির্বাচিত হলে টিউশন মিডিয়া কর্তৃপক্ষ আপনাকে সরাসরি ফোন করবে।
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>আবেদন পাঠান</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
