/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  IdCard, 
  FileText, 
  User, 
  Phone, 
  School, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2,
  Printer
} from 'lucide-react';
import { StudentRegistration } from '../types/league';
import { PlayerIdCard } from './PlayerIdCard';

interface StudentDetailModalProps {
  student: StudentRegistration | null;
  onClose: () => void;
  isNewRegistration?: boolean;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  isNewRegistration = false,
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'details'>('card');

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header for New Submissions */}
        {isNewRegistration && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img 
                src="/assets/aistudio/image_e07eec39.png" 
                alt="دوري المدارس" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <h3 className="font-extrabold text-emerald-950 text-sm">
                تم إرسال بيانات الطالب للمراجعة والاعتماد بنجاح!
              </h3>
              <p className="text-xs text-emerald-800">
                مدرسة سعد بن أبي وقاص · رقم القيد: <span className="font-mono font-bold">{student.registrationNumber}</span>. تم توثيق إشعار ولي الأمر.
              </p>
            </div>
          </div>
        )}

        {/* View Switcher Pill */}
        <div className="flex items-center justify-center gap-1 p-1 bg-slate-100 rounded-xl mb-6 max-w-xs mx-auto no-print">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'card'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <IdCard className="w-3.5 h-3.5" />
            <span>بطاقة اللاعب الرقمية</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'details'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>تفاصيل الملف والوثائق</span>
          </button>
        </div>

        {/* Tab 1: Digital Player ID Card */}
        {activeTab === 'card' && (
          <PlayerIdCard student={student} onClose={onClose} />
        )}

        {/* Tab 2: Full Detailed Profile & Attached Documents */}
        {activeTab === 'details' && (
          <div className="space-y-6 text-xs text-slate-700">
            {/* Student Header */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                {student.photoUrl ? (
                  <img src={student.photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {student.firstNameAr} {student.secondNameAr} {student.lastNameAr}
                </h4>
                <p className="text-slate-500 font-mono" dir="ltr">
                  {student.firstNameEn} {student.secondNameEn} {student.lastNameEn}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-emerald-800 font-bold">{student.registrationNumber}</span>
                  <span>·</span>
                  <span className="font-semibold">{student.sport}</span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block text-[10px]">المدرسة والصف:</span>
                <span className="font-bold text-slate-900 block">{student.schoolName}</span>
                <span className="text-slate-600 block">{student.gradeLevel} ({student.educationStage})</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block text-[10px]">رقم الهوية والجنسية:</span>
                <span className="font-mono font-bold text-slate-900 block">{student.nationalId}</span>
                <span className="text-slate-600 block">{student.nationality}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block text-[10px]">تاريخ الميلاد:</span>
                <span className="font-bold text-slate-900 block">{student.dateOfBirth} (ميلادي)</span>
                {student.hijriDate && (
                  <span className="text-slate-600 block">{student.hijriDate} (هجري)</span>
                )}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-slate-400 block text-[10px]">معلومات الاتصال:</span>
                <span className="font-mono text-slate-900 block">جوال ولي الأمر: {student.guardianPhone}</span>
                {student.studentPhone && (
                  <span className="font-mono text-slate-600 block">جوال الطالب: {student.studentPhone}</span>
                )}
              </div>
            </div>

            {/* Health & Verification */}
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2">
              <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>السلامة والإقرارات المعتمدة</span>
              </h5>
              <p><strong>الحالة الطبية:</strong> {student.medicalStatus}</p>
              {student.medicalNotes && (
                <p><strong>ملاحظات إضافية:</strong> {student.medicalNotes}</p>
              )}
              <div className="space-y-1 text-emerald-800 text-[11px] pt-1">
                <p>✓ تم توثيق إقرار صحة البيانات الطبية للحفاظ على سلامة اللاعب.</p>
                <p>✓ تم توثيق الموافقة على رسالة ولي الأمر النصية لشروط المشاركة.</p>
                <p>✓ تم توثيق إقرار ولي الأمر بمسؤولية النقل واستلام/تسليم اللاعب بمقر المباريات.</p>
              </div>
            </div>

            {/* Attached ID Document */}
            {student.idCardUrl ? (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">وثيقة الهوية المرفقة:</span>
                <div className="max-h-48 overflow-hidden rounded-xl border border-slate-300">
                  <img src={student.idCardUrl} alt="الهوية الوطنية" className="w-full object-contain max-h-48" />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
                <span>وثيقة الهوية الوطنية: لم تُرفق إلكترونياً (اختيارية)</span>
                <span className="text-slate-400 font-medium">تتم المطابقة حضورياً من قِبل مسؤول الفريق</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
