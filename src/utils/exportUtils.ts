/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentRegistration } from '../types/league';

export function exportStudentsToCsv(students: StudentRegistration[], filename = 'دوري_المدارس_كشف_الطلاب.csv') {
  if (!students.length) return;

  const headers = [
    'رقم القيد',
    'الاسم الكامل بالعربية',
    'الاسم الكامل بالإنجليزية',
    'الجنسية',
    'رقم الهوية / الإقامة',
    'تاريخ الميلاد',
    'المدرسة',
    'المرحلة',
    'الصف الدراسي',
    'الرياضة',
    'مركز اللاعب',
    'رقم القميص',
    'المقاس',
    'تصنيف اللاعب',
    'الحالة الصحية',
    'جوال اللاعب',
    'جوال ولي الأمر',
    'حالة التسجيل',
    'تاريخ التسجيل'
  ];

  const rows = students.map((s) => [
    `"${s.registrationNumber}"`,
    `"${s.firstNameAr} ${s.secondNameAr} ${s.lastNameAr}"`,
    `"${s.firstNameEn} ${s.secondNameEn} ${s.lastNameEn}"`,
    `"${s.nationality}"`,
    `"${s.nationalId}"`,
    `"${s.dateOfBirth}"`,
    `"${s.schoolName}"`,
    `"${s.educationStage}"`,
    `"${s.gradeLevel}"`,
    `"${s.sport}"`,
    `"${s.playerPosition}"`,
    `"${s.jerseyNumber ?? '-'}"`,
    `"${s.jerseySize ?? '-'}"`,
    `"${s.classification}"`,
    `"${s.medicalStatus}"`,
    `"${s.studentPhone}"`,
    `"${s.guardianPhone}"`,
    `"${s.status}"`,
    `"${s.createdAt}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
