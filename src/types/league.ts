/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SportType = 'كرة القدم';

export type GradeLevel = 
  | 'الصف الرابع الابتدائي'
  | 'الصف الخامس الابتدائي'
  | 'الصف السادس الابتدائي'
  | 'الصف الأول المتوسط'
  | 'الصف الثاني المتوسط'
  | 'الصف الثالث المتوسط';

export type PlayerClassification = 
  | 'مبتدئ'
  | 'هاوي ممارس'
  | 'لاعب نادي رسمي'
  | 'منتخب مدرسي'
  | 'أكاديمية رياضية خاصة';

export type MedicalStatus = 
  | 'لائق طبياً ورياضياً بالكامل'
  | 'يعاني من حساسية / ربو خفيف تحت السيطرة'
  | 'إصابة سابقة تم التعافي منها'
  | 'يحتاج رعاية خاصة / نظارة طبية رياضية';

export type RegistrationStatus = 'معتمد' | 'قيد المراجعة' | 'بانتظار الفحص الطبي' | 'مرفوض';

export interface StudentRegistration {
  id: string;
  registrationNumber: string; // e.g. SCH-2026-1042
  createdAt: string;

  // Personal Info (Arabic)
  firstNameAr: string;
  secondNameAr: string;
  lastNameAr: string;

  // Personal Info (English)
  firstNameEn: string;
  secondNameEn: string;
  lastNameEn: string;

  // Photo & Identification
  photoUrl?: string;
  idCardUrl?: string;
  nationality: 'سعودي' | 'غير سعودي';
  nationalId: string; // 10 digits

  // Date of Birth & Age
  dateOfBirth: string; // YYYY-MM-DD
  calendarType: 'هجري' | 'ميلادي';
  hijriDate?: string;

  // Academic Info
  schoolName: string;
  gradeLevel: GradeLevel;
  educationStage: 'ابتدائي' | 'متوسط';

  // Sports & League Details
  sport: SportType;
  playerPosition: string;
  jerseyNumber?: number;
  jerseySize?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  classification: PlayerClassification;

  // Contact Info
  studentPhone: string;
  guardianPhone: string;
  email?: string;

  // Health & Consent
  bloodType?: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  medicalStatus: MedicalStatus;
  medicalNotes?: string;
  healthAckAccepted: boolean;
  smsConsentAccepted: boolean;
  transportAckAccepted?: boolean;

  // Status & Administration
  status: RegistrationStatus;
  reviewedBy?: string;
  notes?: string;
}
