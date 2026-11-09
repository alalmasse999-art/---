/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  UserPlus, 
  IdCard, 
  Trash2, 
  User, 
  FileSpreadsheet,
  School,
  Phone
} from 'lucide-react';
import { StudentRegistration, RegistrationStatus } from '../types/league';
import { SCHOOL_NAME, FOOTBALL_POSITIONS } from '../data/mockData';
import { exportStudentsToCsv } from '../utils/exportUtils';

interface StudentsTableProps {
  students: StudentRegistration[];
  onViewCard: (student: StudentRegistration) => void;
  onUpdateStatus: (studentId: string, status: RegistrationStatus) => void;
  onDeleteStudent: (studentId: string) => void;
  onNewRegistration: () => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  onViewCard,
  onUpdateStatus,
  onDeleteStudent,
  onNewRegistration,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedNationality, setSelectedNationality] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        `${s.firstNameAr} ${s.secondNameAr} ${s.lastNameAr}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${s.firstNameEn} ${s.secondNameEn} ${s.lastNameEn}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nationalId.includes(searchTerm) ||
        s.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.guardianPhone.includes(searchTerm) ||
        (s.studentPhone && s.studentPhone.includes(searchTerm));

      const matchPosition = selectedPosition === 'all' || s.playerPosition === selectedPosition;
      const matchStage = selectedStage === 'all' || s.educationStage === selectedStage;
      const matchNationality = selectedNationality === 'all' || s.nationality === selectedNationality;
      const matchStatus = selectedStatus === 'all' || s.status === selectedStatus;

      return matchSearch && matchPosition && matchStage && matchNationality && matchStatus;
    });
  }, [students, searchTerm, selectedPosition, selectedStage, selectedNationality, selectedStatus]);

  // Aggregate stats
  const totalCount = students.length;
  const approvedCount = students.filter(s => s.status === 'معتمد').length;
  const pendingCount = students.filter(s => s.status === 'قيد المراجعة').length;
  const saudiCount = students.filter(s => s.nationality === 'سعودي').length;

  const handleExportCsv = () => {
    exportStudentsToCsv(filteredStudents, `سجل_طلاب_مدرسة_سعد_بن_أبي_وقاص_دوري_المدارس.csv`);
  };

  const handlePrintRoster = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Overview KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">إجمالي المسجلين بالمدرسة</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">{totalCount}</span>
            <span className="text-xs text-emerald-700 font-semibold">طالب</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">الطلاب المعتمدون</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700 font-mono tabular-nums">{approvedCount}</span>
            <span className="text-xs text-slate-500">من أصل {totalCount}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">طلبات قيد المراجعة</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600 font-mono tabular-nums">{pendingCount}</span>
            <span className="text-xs text-slate-500">بانتظار الاعتماد</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">المواطنون / المقيمون</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-700 font-mono tabular-nums">
              {saudiCount} / {totalCount - saudiCount}
            </span>
            <span className="text-xs text-slate-500">سعودي / غير سعودي</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <img 
                  src="/assets/aistudio/image_e07eec39.png" 
                  alt="دوري المدارس" 
                  className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 border border-slate-200 shadow-2xs" 
                />
                <h2 className="text-lg font-bold text-slate-900">سجل لاعبي {SCHOOL_NAME}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                دوري المدارس لكرة القدم بمنطقة نجران (فريق المرحلة الابتدائية وفريق المرحلة المتوسطة)
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors whitespace-nowrap"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>تصدير Excel (CSV)</span>
              </button>

              <button
                type="button"
                onClick={handlePrintRoster}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap no-print"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>طباعة الكشف</span>
              </button>

              <button
                type="button"
                onClick={onNewRegistration}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>تسجيل طالب جديد</span>
              </button>
            </div>
          </div>

          {/* Team Switcher Segmented Control */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-md">
            <button
              type="button"
              onClick={() => setSelectedStage('all')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStage === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جميع لاعبي المدرسة ({students.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStage('ابتدائي')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStage === 'ابتدائي'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فريق المرحلة الابتدائية ({students.filter(s => s.educationStage === 'ابتدائي').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStage('متوسط')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedStage === 'متوسط'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              فريق المرحلة المتوسطة ({students.filter(s => s.educationStage === 'متوسط').length})
            </button>
          </div>

          {/* Search & Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث بالاسم، رقم الهوية، جوال ولي الأمر، رقم القيد..."
                className="w-full pl-4 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Football Position Filter */}
            <div>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="all">جميع مراكز اللعب</option>
                {FOOTBALL_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            {/* Stage Filter (Elementary & Intermediate only) */}
            <div>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="all">المرحلتين (ابتدائي ومتوسط)</option>
                <option value="ابتدائي">المرحلة الابتدائية</option>
                <option value="متوسط">المرحلة المتوسطة</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="all">جميع حالات الاعتماد</option>
                <option value="معتمد">معتمد</option>
                <option value="قيد المراجعة">قيد المراجعة</option>
                <option value="بانتظار الفحص الطبي">بانتظار الفحص الطبي</option>
                <option value="مرفوض">مرفوض</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Records */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">الطالب</th>
                <th className="px-4 py-3">الصف الدراسي</th>
                <th className="px-4 py-3">مركز اللعب</th>
                <th className="px-4 py-3">رقم الهوية والجنسية</th>
                <th className="px-4 py-3">معلومات التواصل (الطالب / ولي الأمر)</th>
                <th className="px-4 py-3">الحالة الصحية</th>
                <th className="px-4 py-3">حالة المراجعة</th>
                <th className="px-4 py-3 text-center no-print">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Student Info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300 flex items-center justify-center">
                          {student.photoUrl ? (
                            <img src={student.photoUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {student.firstNameAr} {student.lastNameAr}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono" dir="ltr">
                            {student.firstNameEn} {student.lastNameEn} · {student.registrationNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Grade Level */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{student.gradeLevel}</div>
                      <div className="text-[10px] text-slate-500">مرحلة {student.educationStage}</div>
                    </td>

                    {/* Position */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-emerald-800">{student.playerPosition}</div>
                      <div className="text-[11px] text-slate-500">{student.classification}</div>
                    </td>

                    {/* National ID & Nationality */}
                    <td className="px-4 py-3">
                      <div className="font-mono text-slate-900">{student.nationalId}</div>
                      <div className="text-[11px] text-slate-500">{student.nationality}</div>
                    </td>

                    {/* Contact Info: Both Student & Guardian Phone */}
                    <td className="px-4 py-3">
                      <div className="space-y-0.5">
                        <div className="font-mono text-slate-900 text-[11px] flex items-center gap-1" dir="ltr">
                          <span className="text-[10px] text-slate-400">ولي الأمر:</span>
                          <span className="font-bold">{student.guardianPhone}</span>
                        </div>
                        {student.studentPhone && (
                          <div className="font-mono text-slate-600 text-[11px] flex items-center gap-1" dir="ltr">
                            <span className="text-[10px] text-slate-400">الطالب:</span>
                            <span>{student.studentPhone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Medical Status */}
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-medium ${
                        student.medicalStatus === 'لائق طبياً ورياضياً بالكامل' 
                          ? 'text-emerald-700' 
                          : 'text-amber-700'
                      }`}>
                        {student.medicalStatus}
                      </span>
                    </td>

                    {/* Registration Status */}
                    <td className="px-4 py-3">
                      <select
                        value={student.status}
                        onChange={(e) => onUpdateStatus(student.id, e.target.value as RegistrationStatus)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none transition-colors ${
                          student.status === 'معتمد'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : student.status === 'قيد المراجعة'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : student.status === 'بانتظار الفحص الطبي'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="قيد المراجعة">قيد المراجعة</option>
                        <option value="معتمد">معتمد</option>
                        <option value="بانتظار الفحص الطبي">بانتظار الفحص</option>
                        <option value="مرفوض">مرفوض</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center no-print">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onViewCard(student)}
                          title="عرض وطباعة بطاقة اللاعب"
                          className="p-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف تسجيل الطالب ${student.firstNameAr} ${student.lastNameAr}؟`)) {
                              onDeleteStudent(student.id);
                            }
                          }}
                          title="حذف التسجيل"
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <p className="text-sm">لا توجد نتائج مطابقة لشروط البحث والتصفية</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedPosition('all');
                        setSelectedStage('all');
                        setSelectedNationality('all');
                        setSelectedStatus('all');
                      }}
                      className="mt-2 text-xs text-emerald-700 hover:underline font-semibold"
                    >
                      إعادة ضبط الفلاتر
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>عرض {filteredStudents.length} من أصل {students.length} طالب مسجل في {SCHOOL_NAME}</span>
          <span>دوري كرة القدم المدرسي</span>
        </div>
      </div>
    </div>
  );
};
