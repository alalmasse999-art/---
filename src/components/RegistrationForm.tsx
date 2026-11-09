/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  User, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Calendar, 
  IdCard, 
  Sparkles, 
  RotateCcw,
  ChevronDown,
  X,
  School,
  Send,
  ShieldCheck
} from 'lucide-react';
import { StudentRegistration, GradeLevel, PlayerClassification, MedicalStatus } from '../types/league';
import { 
  SCHOOL_NAME, 
  FOOTBALL_POSITIONS, 
  GRADE_LEVELS, 
  PLAYER_CLASSIFICATIONS, 
  MEDICAL_STATUS_OPTIONS 
} from '../data/mockData';
import { calculateAge, gregorianToHijri } from '../utils/dateUtils';

interface RegistrationFormProps {
  onSuccess: (student: StudentRegistration) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  // Personal Info (Arabic)
  const [firstNameAr, setFirstNameAr] = useState('');
  const [secondNameAr, setSecondNameAr] = useState('');
  const [lastNameAr, setLastNameAr] = useState('');

  // Personal Info (English)
  const [firstNameEn, setFirstNameEn] = useState('');
  const [secondNameEn, setSecondNameEn] = useState('');
  const [lastNameEn, setLastNameEn] = useState('');

  // Date of Birth & Calendar
  const [calendarType, setCalendarType] = useState<'هجري' | 'ميلادي'>('هجري');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hijriDay, setHijriDay] = useState('');
  const [hijriMonth, setHijriMonth] = useState('');
  const [hijriYear, setHijriYear] = useState('');

  // Academic & Position (School is fixed to مدرسة سعد بن أبي وقاص, sport is Football only)
  const [gradeLevel, setGradeLevel] = useState<GradeLevel | ''>('');
  const [playerPosition, setPlayerPosition] = useState('');

  // Identification & Nationality
  const [nationality, setNationality] = useState<'سعودي' | 'غير سعودي'>('سعودي');
  const [nationalId, setNationalId] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [idCardFile, setIdCardFile] = useState<{ name: string; url: string } | null>(null);

  // Contacts: رقم جوال الطالب ورقم جوال ولي الأمر
  const [countryCode] = useState('+966');
  const [studentPhone, setStudentPhone] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [email, setEmail] = useState('');

  // Classification & Health
  const [classification, setClassification] = useState<PlayerClassification | ''>('');
  const [medicalStatus, setMedicalStatus] = useState<MedicalStatus | ''>('');
  const [medicalNotes, setMedicalNotes] = useState('');

  // Disclaimers & Consents
  const [healthAckAccepted, setHealthAckAccepted] = useState(false);
  const [smsConsentAccepted, setSmsConsentAccepted] = useState(false);
  const [transportAckAccepted, setTransportAckAccepted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showNationalityInfo, setShowNationalityInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const idFileInputRef = useRef<HTMLInputElement>(null);

  // Handle Photo Upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
        setErrors((prev) => {
          if (!prev.photo) return prev;
          const updated = { ...prev };
          delete updated.photo;
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle ID Document Upload
  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setIdCardFile({
          name: file.name,
          url: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Demo Autofill
  const handleQuickFill = () => {
    setFirstNameAr('محمد');
    setSecondNameAr('عبدالعزيز');
    setLastNameAr('الغامدي');

    setFirstNameEn('Mohammed');
    setSecondNameEn('Abdulaziz');
    setLastNameEn('Al-Ghamdi');

    setCalendarType('ميلادي');
    setDateOfBirth('2012-05-14');
    setGradeLevel('الصف الأول المتوسط');
    setPlayerPosition('صانع ألعاب (وسط هجومي)');

    setNationality('سعودي');
    setNationalId('1109845231');
    // Provide a demo player photo so quick-fill fulfills the mandatory requirement
    setPhotoUrl('https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=300&q=80');

    setStudentPhone('0554321987');
    setGuardianPhone('0501239876');
    setEmail('mohammed.ghamdi@saad.edu.sa');

    setClassification('منتخب مدرسي');
    setMedicalStatus('لائق طبياً ورياضياً بالكامل');
    setHealthAckAccepted(true);
    setSmsConsentAccepted(true);
    setTransportAckAccepted(true);
    setErrors({});
  };

  const handleReset = () => {
    setFirstNameAr('');
    setSecondNameAr('');
    setLastNameAr('');
    setFirstNameEn('');
    setSecondNameEn('');
    setLastNameEn('');
    setDateOfBirth('');
    setHijriDay('');
    setHijriMonth('');
    setHijriYear('');
    setGradeLevel('');
    setPlayerPosition('');
    setNationalId('');
    setPhotoUrl(null);
    setIdCardFile(null);
    setStudentPhone('');
    setGuardianPhone('');
    setEmail('');
    setClassification('');
    setMedicalStatus('');
    setMedicalNotes('');
    setHealthAckAccepted(false);
    setSmsConsentAccepted(false);
    setTransportAckAccepted(false);
    setErrors({});
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstNameAr.trim()) newErrors.firstNameAr = 'الرجاء ادخال الاسم الأول باللغة العربية';
    if (!secondNameAr.trim()) newErrors.secondNameAr = 'الرجاء ادخال الاسم الثاني باللغة العربية';
    if (!lastNameAr.trim()) newErrors.lastNameAr = 'الرجاء ادخال الاسم الأخير باللغة العربية';

    if (!firstNameEn.trim()) newErrors.firstNameEn = 'الرجاء إدخال الاسم الأول للاعب';
    if (!secondNameEn.trim()) newErrors.secondNameEn = 'الرجاء إدخال الاسم الثاني للاعب';
    if (!lastNameEn.trim()) newErrors.lastNameEn = 'الرجاء ادخال اسم اللاعب الأخير';

    if (calendarType === 'ميلادي' && !dateOfBirth) {
      newErrors.dateOfBirth = 'الرجاء تحديد تاريخ الميلاد';
    } else if (calendarType === 'هجري' && (!hijriDay || !hijriMonth || !hijriYear)) {
      newErrors.dateOfBirth = 'الرجاء ادخال التاريخ الهجري كاملاً';
    }

    if (!gradeLevel) newErrors.gradeLevel = 'الرجاء اختيار الصف الدراسي';
    if (!playerPosition) newErrors.playerPosition = 'الرجاء اختيار مركز اللاعب';

    if (!nationalId.trim()) {
      newErrors.nationalId = nationality === 'سعودي' ? 'الرجاء ادخال رقم الهوية الوطنية' : 'الرجاء ادخال رقم الإقامة';
    } else if (nationalId.trim().length !== 10) {
      newErrors.nationalId = 'رقم الهوية / الإقامة يجب أن يتكون من 10 أرقام';
    }

    if (!guardianPhone.trim()) {
      newErrors.guardianPhone = 'الرجاء ادخال رقم جوال ولي الأمر';
    }

    // Player photo is strictly mandatory for league card generation
    if (!photoUrl) {
      newErrors.photo = 'صورة اللاعب إجبارية لإصدار بطاقة دوري المدارس';
    }

    if (!classification) {
      newErrors.classification = 'اختر من القائمة';
    }

    if (!medicalStatus) {
      newErrors.medicalStatus = 'الرجاء اختيار الحالة الطبية';
    }

    if (!healthAckAccepted) {
      newErrors.healthAck = 'يجب الموافقة على إقرار المعلومات الصحية';
    }

    if (!smsConsentAccepted) {
      newErrors.smsConsent = 'يجب الموافقة على استلام رسالة ولي الأمر';
    }

    if (!transportAckAccepted) {
      newErrors.transportAck = 'يجب الموافقة على إقرار النقل واستلام وتسليم اللاعبين';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    let finalDob = dateOfBirth;
    let computedHijri = '';
    if (calendarType === 'هجري') {
      const gYear = parseInt(hijriYear) + 579;
      finalDob = `${gYear}-${hijriMonth.padStart(2, '0')}-${hijriDay.padStart(2, '0')}`;
      computedHijri = `${hijriDay}/${hijriMonth}/${hijriYear}`;
    } else {
      computedHijri = gregorianToHijri(dateOfBirth);
    }

    const selectedGrade = GRADE_LEVELS.find(g => g.label === gradeLevel);
    const stage = selectedGrade?.stage || 'متوسط';

    const newStudent: StudentRegistration = {
      id: `std_${Date.now()}`,
      registrationNumber: `SCH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      firstNameAr: firstNameAr.trim(),
      secondNameAr: secondNameAr.trim(),
      lastNameAr: lastNameAr.trim(),
      firstNameEn: firstNameEn.trim(),
      secondNameEn: secondNameEn.trim(),
      lastNameEn: lastNameEn.trim(),
      nationality,
      nationalId: nationalId.trim(),
      dateOfBirth: finalDob,
      calendarType,
      hijriDate: computedHijri,
      schoolName: SCHOOL_NAME,
      gradeLevel: gradeLevel as GradeLevel,
      educationStage: stage,
      sport: 'كرة القدم',
      playerPosition,
      classification: classification as PlayerClassification,
      studentPhone: studentPhone.trim(),
      guardianPhone: guardianPhone.trim(),
      email: email.trim(),
      photoUrl: photoUrl || undefined,
      idCardUrl: idCardFile?.url,
      medicalStatus: medicalStatus as MedicalStatus,
      medicalNotes: medicalNotes.trim(),
      healthAckAccepted,
      smsConsentAccepted,
      transportAckAccepted,
      status: 'قيد المراجعة'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(newStudent);
    }, 400);
  };

  const calculatedAge = dateOfBirth ? calculateAge(dateOfBirth) : (hijriYear ? (1448 - parseInt(hijriYear)) : 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Banner - Specific to مدرسة سعد بن أبي وقاص مع هوية دوري المدارس الرسمية */}
      <div className="bg-gradient-to-r from-[#0D2240] via-[#112E5A] to-[#005C2B] rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 border border-blue-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2 shadow-lg border border-white/80 shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/aistudio/image_e07eec39.png" 
                alt="دوري المدارس - Saudi Schools Tournament" 
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-white mb-2 backdrop-blur-xs border border-white/15">
                <School className="w-3.5 h-3.5 text-amber-300" />
                <span>{SCHOOL_NAME}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-bold">دوري المدارس بمنطقة نجران</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                نموذج تسجيل الطلاب في دوري كرة القدم
              </h1>
              <p className="mt-2 text-sm text-blue-100/90 max-w-2xl leading-relaxed">
                خاص بطلاب مدرسة سعد بن أبي وقاص (المرحلتين الابتدائية والمتوسطة) الراغبين بالمشاركة في دوري المدارس الخاص بمنطقة نجران للموسم الرياضي الحالي.
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleQuickFill}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-amber-300 hover:bg-amber-400 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تعبئة سريعة للتجربة</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-emerald-100 bg-white/10 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تعيين</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
        
        {/* Section: Personal Photo Upload (صورة اللاعب إجبارية لبطاقة الدوري) */}
        <div className="flex flex-col items-center justify-center pb-6 border-b border-slate-100">
          <input 
            type="file" 
            ref={photoInputRef}
            onChange={handlePhotoChange}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden" 
          />
          <div 
            onClick={() => photoInputRef.current?.click()}
            className="group relative cursor-pointer flex flex-col items-center"
          >
            <div className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all shadow-inner ${
              errors.photo 
                ? 'border-rose-500 bg-rose-50/70 ring-4 ring-rose-100 animate-pulse' 
                : photoUrl 
                  ? 'border-emerald-600 bg-emerald-50/30' 
                  : 'border-slate-300 bg-slate-100 group-hover:border-blue-600 group-hover:bg-blue-50/40'
            }`}>
              {photoUrl ? (
                <img src={photoUrl} alt="صورة الطالب" className="w-full h-full object-cover" />
              ) : (
                <User className={`w-14 h-14 transition-colors ${
                  errors.photo ? 'text-rose-400' : 'text-slate-300 group-hover:text-blue-600'
                }`} />
              )}
            </div>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                photoInputRef.current?.click();
              }}
              className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1.5"
            >
              <span>{photoUrl ? 'تغيير الصورة الشخصية' : 'اضف الصورة الشخصية'}</span>
              <span className="text-rose-500 font-extrabold text-base">*</span>
            </button>
            <span className="text-xs text-slate-500 mt-0.5 font-medium">
              صورة شخصية حديثة وواضحة (إجبارية لبطاقة دوري المدارس)
            </span>
          </div>

          {errors.photo && (
            <p className="mt-2 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.photo}</span>
            </p>
          )}

          {photoUrl && (
            <div className="mt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تم إرفاق صورة اللاعب بنجاح</span>
              </span>
              <button
                type="button"
                onClick={() => setPhotoUrl(null)}
                className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <X className="w-3.5 h-3.5" />
                <span>إزالة الصورة</span>
              </button>
            </div>
          )}
        </div>

        {/* Section 1: Arabic Names (Matches Screenshot 1) */}
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الأول باللغة العربية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={firstNameAr}
                onChange={(e) => {
                  setFirstNameAr(e.target.value);
                  if (errors.firstNameAr) setErrors({ ...errors, firstNameAr: '' });
                }}
                placeholder="الرجاء ادخال الاسم الأول باللغة العربية"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.firstNameAr ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.firstNameAr && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.firstNameAr}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الثاني باللغة العربية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={secondNameAr}
                onChange={(e) => {
                  setSecondNameAr(e.target.value);
                  if (errors.secondNameAr) setErrors({ ...errors, secondNameAr: '' });
                }}
                placeholder="الرجاء ادخال الاسم الثاني باللغة العربية"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.secondNameAr ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.secondNameAr && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.secondNameAr}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الأخير باللغة العربية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={lastNameAr}
                onChange={(e) => {
                  setLastNameAr(e.target.value);
                  if (errors.lastNameAr) setErrors({ ...errors, lastNameAr: '' });
                }}
                placeholder="الرجاء ادخال الاسم الأخير باللغة العربية"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.lastNameAr ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.lastNameAr && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.lastNameAr}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: English Names (Matches Screenshot 1) */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الأول باللغة الإنجليزية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                dir="ltr"
                value={firstNameEn}
                onChange={(e) => {
                  setFirstNameEn(e.target.value);
                  if (errors.firstNameEn) setErrors({ ...errors, firstNameEn: '' });
                }}
                placeholder="الرجاء إدخال الاسم الأول للاعب"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.firstNameEn ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.firstNameEn && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.firstNameEn}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الثاني باللغة الإنجليزية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                dir="ltr"
                value={secondNameEn}
                onChange={(e) => {
                  setSecondNameEn(e.target.value);
                  if (errors.secondNameEn) setErrors({ ...errors, secondNameEn: '' });
                }}
                placeholder="الرجاء إدخال الاسم الثاني للاعب"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.secondNameEn ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.secondNameEn && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.secondNameEn}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-1.5">
                الاسم الأخير باللغة الإنجليزية <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                dir="ltr"
                value={lastNameEn}
                onChange={(e) => {
                  setLastNameEn(e.target.value);
                  if (errors.lastNameEn) setErrors({ ...errors, lastNameEn: '' });
                }}
                placeholder="الرجاء ادخال اسم اللاعب الأخير"
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.lastNameEn ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              {errors.lastNameEn && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.lastNameEn}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Date of Birth with Hijri / Gregorian toggle (Matches Screenshot 2) */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            تاريخ الميلاد <span className="text-rose-500">*</span>
          </label>

          <div className="relative border border-slate-300 rounded-xl p-2.5 sm:p-3 bg-white focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Calendar Toggle Pill (Matches Screenshot 2) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setCalendarType('هجري')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    calendarType === 'هجري'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  هجري
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarType('ميلادي')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    calendarType === 'ميلادي'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ميلادي
                </button>
              </div>

              {/* Date Input */}
              <div className="flex-1 w-full">
                {calendarType === 'ميلادي' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: '' });
                      }}
                      className="w-full px-3 py-1.5 text-sm bg-transparent border-0 text-slate-900 text-left focus:outline-none"
                      placeholder="D/M/YYYY"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={hijriDay}
                      onChange={(e) => setHijriDay(e.target.value)}
                      placeholder="اليوم (1-30)"
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={hijriMonth}
                      onChange={(e) => setHijriMonth(e.target.value)}
                      placeholder="الشهر (1-12)"
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      min="1425"
                      max="1448"
                      value={hijriYear}
                      onChange={(e) => setHijriYear(e.target.value)}
                      placeholder="السنة (مثال: 1433)"
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {calculatedAge > 0 && (
            <div className="mt-2 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                عمر اللاعب: {calculatedAge} سنة ({calculatedAge <= 12 ? 'فئة البراعم' : 'فئة الناشئين'})
              </span>
            </div>
          )}

          {errors.dateOfBirth && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.dateOfBirth}
            </p>
          )}
        </div>

        {/* Section 4: Grade Level (High School removed as requested) & Football Position */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              الصف الدراسي <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={gradeLevel}
                onChange={(e) => {
                  setGradeLevel(e.target.value as GradeLevel);
                  if (errors.gradeLevel) setErrors({ ...errors, gradeLevel: '' });
                }}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-4 pl-10 ${
                  errors.gradeLevel ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              >
                <option value="">الرجاء اختيار الصف الدراسي</option>
                <optgroup label="المرحلة الابتدائية">
                  {GRADE_LEVELS.filter(g => g.stage === 'ابتدائي').map(g => (
                    <option key={g.label} value={g.label}>{g.label}</option>
                  ))}
                </optgroup>
                <optgroup label="المرحلة المتوسطة">
                  {GRADE_LEVELS.filter(g => g.stage === 'متوسط').map(g => (
                    <option key={g.label} value={g.label}>{g.label}</option>
                  ))}
                </optgroup>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.gradeLevel && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.gradeLevel}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              مركز اللاعب (كرة قدم) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={playerPosition}
                onChange={(e) => {
                  setPlayerPosition(e.target.value);
                  if (errors.playerPosition) setErrors({ ...errors, playerPosition: '' });
                }}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-4 pl-10 ${
                  errors.playerPosition ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              >
                <option value="">الرجاء اختيار مركز اللاعب</option>
                {FOOTBALL_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.playerPosition && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.playerPosition}
              </p>
            )}
          </div>

          {/* Team Assignment Banner */}
          <div className="sm:col-span-2 p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>
                  {gradeLevel ? (
                    GRADE_LEVELS.find(g => g.label === gradeLevel)?.stage === 'ابتدائي'
                      ? 'الفريق المخصص: فريق مدرسة سعد بن أبي وقاص للمرحلة الابتدائية (دوري مدارس نجران)'
                      : 'الفريق المخصص: فريق مدرسة سعد بن أبي وقاص للمرحلة المتوسطة (دوري مدارس نجران)'
                  ) : (
                    'فريقان مستقلان: سيكون هناك فريق للمرحلة الابتدائية وفريق خاص بالمرحلة المتوسطة'
                  )}
                </span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                {gradeLevel ? (GRADE_LEVELS.find(g => g.label === gradeLevel)?.stage === 'ابتدائي' ? 'فريق الابتدائي' : 'فريق المتوسط') : 'دوري نجران'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800">
              يتم تصنيف اللاعب تلقائياً في الفريق المناسب لصفه الدراسي للمشاركة في دوري المدارس بمنطقة نجران.
            </p>
          </div>
        </div>

        {/* Section 5: Nationality & National ID (Matches Screenshot 2) */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <label className="block text-sm font-semibold text-slate-900">
                جنسية اللاعب <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowNationalityInfo(!showNationalityInfo)}
                className="text-blue-500 hover:text-blue-700"
                title="معلومات الجنسية"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-800 cursor-pointer">
                <input
                  type="radio"
                  name="nationality"
                  value="سعودي"
                  checked={nationality === 'سعودي'}
                  onChange={() => setNationality('سعودي')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>سعودي</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-slate-800 cursor-pointer">
                <input
                  type="radio"
                  name="nationality"
                  value="غير سعودي"
                  checked={nationality === 'غير سعودي'}
                  onChange={() => setNationality('غير سعودي')}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span>غير سعودي</span>
              </label>
            </div>
          </div>

          {showNationalityInfo && (
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed">
              وفقاً للائحة دوري المدارس، يتاح التسجيل لجميع طلاب {SCHOOL_NAME} من حاملي الهوية الوطنية أو الإقامة النظامية.
            </div>
          )}

          {/* National ID Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              {nationality === 'سعودي' ? 'رقم الهوية الوطنية' : 'رقم الإقامة النظامية'} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={10}
                value={nationalId}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setNationalId(val);
                  if (errors.nationalId) setErrors({ ...errors, nationalId: '' });
                }}
                placeholder={nationality === 'سعودي' ? 'الرجاء ادخال رقم الهوية الوطنية (10 أرقام)' : 'الرجاء ادخال رقم الإقامة (10 أرقام)'}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                  errors.nationalId ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              />
              <IdCard className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.nationalId && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.nationalId}
              </p>
            )}
          </div>

          {/* Attachment Box: ارفاق صورة الهوية الوطنية */}
          <div>
            <input
              type="file"
              ref={idFileInputRef}
              onChange={handleIdFileChange}
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              className="hidden"
            />
            <div
              onClick={() => idFileInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-blue-400/80 hover:border-blue-600 bg-blue-50/20 hover:bg-blue-50/40 rounded-xl p-6 text-center transition-all group"
            >
              <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm">
                <Upload className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>{idCardFile ? `تم إرفاق: ${idCardFile.name}` : 'ارفاق صورة الهوية الوطنية (اختياري)'}</span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  اختياري
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                يرجى إرفاق الملف بصيغة JPG أو PNG (اختياري - يمكن مطابقتها حضورياً لاحقاً)
              </p>
            </div>
            {idCardFile && (
              <div className="mt-2 flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  تم تحميل وثيقة الهوية بنجاح
                </span>
                <button
                  type="button"
                  onClick={() => setIdCardFile(null)}
                  className="text-rose-600 hover:underline"
                >
                  حذف
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 6: Contact Information - رقم جوال الطالب و رقم جوال ولي الأمر */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <label className="block text-sm font-semibold text-slate-900">
            معلومات التواصل <span className="text-rose-500">*</span>
          </label>

          {/* Student Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              رقم جوال الطالب
            </label>
            <div className="flex border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <input
                type="tel"
                dir="ltr"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="رقم جوال اللاعب"
                className="flex-1 px-4 py-3 text-sm bg-white text-slate-900 text-right focus:outline-none placeholder-slate-400"
              />
              <div className="flex items-center gap-2 bg-slate-50 border-r border-slate-200 px-3 py-2 text-sm text-slate-700 shrink-0 select-none">
                <span className="text-base">🇸🇦</span>
                <span className="font-mono text-xs font-semibold">{countryCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Guardian Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              رقم جوال ولي الأمر <span className="text-rose-500">*</span>
            </label>
            <div className="flex border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
              <input
                type="tel"
                dir="ltr"
                value={guardianPhone}
                onChange={(e) => {
                  setGuardianPhone(e.target.value.replace(/\D/g, ''));
                  if (errors.guardianPhone) setErrors({ ...errors, guardianPhone: '' });
                }}
                placeholder="* رقم جوال ولي الأمر"
                className="flex-1 px-4 py-3 text-sm bg-white text-slate-900 text-right focus:outline-none placeholder-slate-400"
              />
              <div className="flex items-center gap-2 bg-slate-50 border-r border-slate-200 px-3 py-2 text-sm text-slate-700 shrink-0 select-none">
                <span className="text-base">🇸🇦</span>
                <span className="font-mono text-xs font-semibold">{countryCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
            {errors.guardianPhone && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.guardianPhone}
              </p>
            )}
          </div>

          {/* Optional Email */}
          <div>
            <label className="block text-xs text-slate-500 mb-1">البريد الإلكتروني (اختياري)</label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني للتواصل (اختياري)"
              className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-right"
            />
          </div>
        </div>

        {/* Section 7: Player Classification & Health Status */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              تصنيف اللاعب <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={classification}
                onChange={(e) => {
                  setClassification(e.target.value as PlayerClassification);
                  if (errors.classification) setErrors({ ...errors, classification: '' });
                }}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-4 pl-10 ${
                  errors.classification ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              >
                <option value="">اختر من القائمة</option>
                {PLAYER_CLASSIFICATIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.classification && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.classification}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              الحالة الصحية للاعب <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={medicalStatus}
                onChange={(e) => {
                  setMedicalStatus(e.target.value as MedicalStatus);
                  if (errors.medicalStatus) setErrors({ ...errors, medicalStatus: '' });
                }}
                className={`w-full px-4 py-3 text-sm bg-white border rounded-xl text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-4 pl-10 ${
                  errors.medicalStatus ? 'border-rose-300 ring-1 ring-rose-200' : 'border-slate-300'
                }`}
              >
                <option value="">الرجاء اختيار الحالة الطبية</option>
                {MEDICAL_STATUS_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.medicalStatus && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.medicalStatus}
              </p>
            )}

            {medicalStatus && medicalStatus !== 'لائق طبياً ورياضياً بالكامل' && (
              <div className="mt-2">
                <input
                  type="text"
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder="ملاحظات طبية إضافية أو اسم الدواء/التوصيات"
                  className="w-full px-3 py-2 text-xs border border-amber-200 bg-amber-50/50 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 8: Disclaimer & Guardian SMS Consent (Matches Screenshot 3) */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <label className="block text-sm font-bold text-slate-900">
            إخلاء مسؤولية ينص على ما يلي: <span className="text-rose-500">*</span>
          </label>

          <div className="space-y-4">
            {/* Disclaimer 1 */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={healthAckAccepted}
                onChange={(e) => {
                  setHealthAckAccepted(e.target.checked);
                  if (errors.healthAck) setErrors({ ...errors, healthAck: '' });
                }}
                className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 transition-colors"
              />
              <span className="text-sm text-slate-800 leading-relaxed group-hover:text-slate-900">
                أقرّ بأهمية تقديم معلومات صحية دقيقة وكاملة عن اللاعب، للمساعدة في الحفاظ على سلامته أثناء ممارسة الأنشطة الرياضية.
              </span>
            </label>
            {errors.healthAck && (
              <p className="text-xs text-rose-500 pr-8">
                {errors.healthAck}
              </p>
            )}

            {/* Disclaimer 2 */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={smsConsentAccepted}
                onChange={(e) => {
                  setSmsConsentAccepted(e.target.checked);
                  if (errors.smsConsent) setErrors({ ...errors, smsConsent: '' });
                }}
                className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 transition-colors"
              />
              <span className="text-sm text-slate-800 leading-relaxed group-hover:text-slate-900">
                أقرّ بعلمي بأنه سيتم إرسال رسالة نصية إلى رقم جوال ولي الأمر المسجل، لاستكمال الموافقة على شروط المشاركة في دوري المدارس.
              </span>
            </label>
            {errors.smsConsent && (
              <p className="text-xs text-rose-500 pr-8">
                {errors.smsConsent}
              </p>
            )}

            {/* Disclaimer 3: Transportation & Supervision */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={transportAckAccepted}
                onChange={(e) => {
                  setTransportAckAccepted(e.target.checked);
                  if (errors.transportAck) setErrors({ ...errors, transportAck: '' });
                }}
                className="mt-1 w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 transition-colors"
              />
              <span className="text-sm text-slate-800 leading-relaxed group-hover:text-slate-900">
                المدرسة و ادارة التعليم لا توفر وسيلة النقل من و إلى المنزل و أعلم بأن مسؤول الفريق سيكون في مقر المباريات فقط لاستلام اللاعبين قبل بداية المباريات و تسليمهم لأولياء أمورهم عند انهاء المباريات .
              </span>
            </label>
            {errors.transportAck && (
              <p className="text-xs text-rose-500 pr-8">
                {errors.transportAck}
              </p>
            )}
          </div>
        </div>

        {/* Submit Actions - Updated with 'مدرسة سعد بن أبي وقاص' and 'ارسال للمراجعة و الاعتماد' */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-900 font-bold flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <img src="/assets/aistudio/image_e07eec39.png" alt="" className="w-5 h-5 object-contain" />
            <span>مدرسة سعد بن أبي وقاص · دوري المدارس بنجران</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              مسح الحقول
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white bg-[#006C35] hover:bg-[#00552A] active:bg-[#004220] rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جارٍ الإرسال...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>ارسال للمراجعة و الاعتماد</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
