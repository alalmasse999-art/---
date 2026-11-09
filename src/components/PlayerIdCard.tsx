/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Trophy, 
  Printer, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  QrCode, 
  School,
  Share2,
  X
} from 'lucide-react';
import { StudentRegistration } from '../types/league';

interface PlayerIdCardProps {
  student: StudentRegistration;
  onClose?: () => void;
  showActions?: boolean;
}

export const PlayerIdCard: React.FC<PlayerIdCardProps> = ({ 
  student, 
  onClose,
  showActions = true 
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `بطاقة لاعب دوري المدارس - ${student.firstNameAr} ${student.lastNameAr}`,
        text: `تم تسجيل الطالب ${student.firstNameAr} ${student.lastNameAr} في دوري المدارس برقم قيد ${student.registrationNumber}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `بطاقة لاعب دوري المدارس:\nالطالب: ${student.firstNameAr} ${student.lastNameAr}\nالمدرسة: ${student.schoolName}\nالرياضة: ${student.sport} (${student.playerPosition})\nرقم القيد: ${student.registrationNumber}`
      );
      alert('تم نسخ بيانات البطاقة إلى الحافظة!');
    }
  };

  const maskedId = student.nationalId 
    ? `${student.nationalId.slice(0, 3)}****${student.nationalId.slice(-3)}` 
    : 'غير متوفر';

  return (
    <div className="flex flex-col items-center">
      {/* The Printable Player Pass Card */}
      <div 
        id="player-card-printable"
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden border-2 border-emerald-700 shadow-xl relative text-slate-900"
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#0D2240] via-[#112E5A] to-[#005C2B] p-5 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/80">
                <img 
                  src="/assets/aistudio/image_e07eec39.png" 
                  alt="دوري المدارس" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-wide">دوري المدارس · منطقة نجران</h3>
                <p className="text-[11px] text-amber-300 font-medium">مدرسة سعد بن أبي وقاص</p>
              </div>
            </div>

            <div className="text-left font-mono">
              <span className="block text-[10px] text-emerald-300 uppercase tracking-wider">بطاقة لاعب معتمد</span>
              <span className="text-xs font-bold text-amber-300">{student.registrationNumber}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-100/80 pt-2 border-t border-emerald-700/50">
            <span>الموسم الرياضي 1448 / 2026</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>معتمد نظامياً</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-5 bg-gradient-to-b from-slate-50 to-white">
          {/* Top Info Row: Photo & Names */}
          <div className="flex items-center gap-4">
            {/* Player Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-slate-200 border-2 border-emerald-600 overflow-hidden shadow-md flex items-center justify-center">
                {student.photoUrl ? (
                  <img 
                    src={student.photoUrl} 
                    alt={student.firstNameAr} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-slate-400" />
                )}
              </div>
              {student.jerseyNumber && (
                <div className="absolute -bottom-2 -left-2 bg-amber-400 text-slate-900 font-extrabold text-xs w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm font-mono">
                  #{student.jerseyNumber}
                </div>
              )}
            </div>

            {/* Names & Position */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-black text-slate-900 truncate">
                {student.firstNameAr} {student.secondNameAr} {student.lastNameAr}
              </h2>
              <p className="text-xs font-medium text-slate-500 font-sans tracking-wide truncate" dir="ltr">
                {student.firstNameEn} {student.secondNameEn} {student.lastNameEn}
              </p>

              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {student.sport}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {student.playerPosition}
                </span>
              </div>
            </div>
          </div>

          {/* Academic & Tournament Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-100/70 rounded-2xl text-xs border border-slate-200">
            <div>
              <span className="block text-slate-400 text-[10px]">المدرسة:</span>
              <span className="font-bold text-slate-800 truncate block">{student.schoolName}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">الصف الدراسي:</span>
              <span className="font-bold text-slate-800 block">{student.gradeLevel}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">الهوية / الإقامة:</span>
              <span className="font-mono font-bold text-slate-800 block">{maskedId}</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">فصيلة الدم / اللياقة:</span>
              <span className="font-bold text-emerald-700 block">{student.bloodType || 'سليم'} · لائق</span>
            </div>
          </div>

          {/* Verification Barcode & QR Code Footer */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-xs">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[11px] text-slate-500">
                <p className="font-bold text-slate-700">رمز التحقق الميداني</p>
                <p>امسح الرمز للتأكد من هوية اللاعب عند بدء المباراة</p>
              </div>
            </div>

            <div className="text-left font-mono text-[9px] text-slate-400">
              <span className="block tracking-tighter">||| | |||| | ||| || |||</span>
              <span>{student.registrationNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions (Print, Share, Close) */}
      {showActions && (
        <div className="mt-6 flex items-center gap-3 no-print">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة البطاقة</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl shadow-xs transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
            <span>مشاركة</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
              <span>إغلاق</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
