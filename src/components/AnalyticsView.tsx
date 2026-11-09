/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  School, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import { StudentRegistration } from '../types/league';
import { SCHOOL_NAME } from '../data/mockData';

interface AnalyticsViewProps {
  students: StudentRegistration[];
  onRegisterClick: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ students, onRegisterClick }) => {
  const total = students.length;

  // By Football Position
  const positionCounts: Record<string, number> = {};
  students.forEach(s => {
    positionCounts[s.playerPosition] = (positionCounts[s.playerPosition] || 0) + 1;
  });

  // By Stage
  const stageCounts = {
    ابتدائي: students.filter(s => s.educationStage === 'ابتدائي').length,
    متوسط: students.filter(s => s.educationStage === 'متوسط').length,
  };

  // By Status
  const statusCounts = {
    معتمد: students.filter(s => s.status === 'معتمد').length,
    قيدالمراجعة: students.filter(s => s.status === 'قيد المراجعة').length,
    فحصطبي: students.filter(s => s.status === 'بانتظار الفحص الطبي').length,
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            إحصائيات دوري كرة القدم - {SCHOOL_NAME}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            مؤشرات تسجيل طلاب المدرستين الابتدائية والمتوسطة وتوزيع مراكز اللعب
          </p>
        </div>
        <button
          onClick={onRegisterClick}
          className="self-start sm:self-center px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all"
        >
          تسجيل طالب جديد
        </button>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">إجمالي الطلاب المسجلين</span>
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900 font-mono tabular-nums">{total}</p>
          <p className="mt-1 text-xs text-emerald-700 font-medium">لاعب في كشف المدرسة</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">اللاعبون المعتمدون</span>
            <div className="p-2 bg-blue-50 rounded-xl text-blue-700">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900 font-mono tabular-nums">
            {statusCounts.معتمد}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            جاهزون للمشاركة الرسمية
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">بانتظار المراجعة والاعتماد</span>
            <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900 font-mono tabular-nums">
            {statusCounts.قيدالمراجعة}
          </p>
          <p className="mt-1 text-xs text-slate-500">طلبات جديدة قيد التدقيق</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">الموافقات الطبية وأولياء الأمور</span>
            <div className="p-2 bg-teal-50 rounded-xl text-teal-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-slate-900 font-mono tabular-nums">100%</p>
          <p className="mt-1 text-xs text-emerald-700 font-medium">مكتملة وموثقة إلكترونياً</p>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positions Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm">توزيع اللاعبين حسب مراكز كرة القدم</h3>
            <span className="text-xs text-slate-500">عدد اللاعبين</span>
          </div>

          <div className="space-y-3">
            {Object.entries(positionCounts).map(([pos, count]) => {
              const pct = total ? Math.round((count / total) * 100) : 0;
              return (
                <div key={pos} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{pos}</span>
                    <span className="text-slate-500 font-mono">{count} لاعب ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Distribution */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm">التوزيع بين المرحلتين الابتدائية والمتوسطة</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">المرحلة الابتدائية</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                  {stageCounts.ابتدائي}
                </span>
                <span className="text-xs text-slate-400">الصفوف (الرابع، الخامس، السادس)</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block">المرحلة المتوسطة</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                  {stageCounts.متوسط}
                </span>
                <span className="text-xs text-slate-400">الصفوف (الأول، الثاني، الثالث متوسط)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-bold block">ملاحظة تنظيمية لمشرف النشاط الرياضي:</span>
            <p>
              يتم تصنيف قوائم المباريات بحسب الفئة السنية لضمان التكافؤ البدني بين طلاب المرحلة الابتدائية وطلاب المرحلة المتوسطة في دوري مدرسة سعد بن أبي وقاص.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
