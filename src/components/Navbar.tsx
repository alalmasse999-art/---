/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Trophy, 
  FileText, 
  Users, 
  BarChart3, 
  Lock, 
  LogOut, 
  ShieldCheck, 
  UserPlus 
} from 'lucide-react';
import { SCHOOL_NAME } from '../data/mockData';

interface NavbarProps {
  activeTab: 'form' | 'table' | 'analytics';
  setActiveTab: (tab: 'form' | 'table' | 'analytics') => void;
  registeredCount: number;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onAdminLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  registeredCount,
  isAdmin,
  onOpenAdminLogin,
  onAdminLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark with Saad bin Abi Waqas School & Najran League */}
          <div 
            onClick={() => setActiveTab('form')}
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="/assets/aistudio/image_e07eec39.png" 
                alt="شعار دوري المدارس" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
                {SCHOOL_NAME}
              </span>
              <span className="text-[11px] text-[#112E5A] font-bold whitespace-nowrap flex items-center gap-1">
                <span>دوري المدارس</span>
                <span>·</span>
                <span className="text-amber-600 font-semibold">منطقة نجران</span>
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Roster & Analytics are hidden from public, visible ONLY to admin) */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'form'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>نموذج التسجيل</span>
            </button>

            {/* Admin-only tabs: سجل لاعبي المدرسة وإحصائيات التسجيل */}
            {isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'table'
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>سجل لاعبي المدرسة</span>
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-200/70 text-slate-700">
                    {registeredCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === 'analytics'
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>إحصائيات التسجيل</span>
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Action & Admin Lock Control */}
          <div className="flex items-center gap-3 shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>لوحة المسؤول</span>
                </span>

                {activeTab !== 'form' && (
                  <button
                    onClick={() => setActiveTab('form')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>تسجيل طالب</span>
                  </button>
                )}

                <button
                  onClick={onAdminLogout}
                  title="تسجيل خروج المسؤول وإخفاء البيانات"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">خروج المسؤول</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap border border-slate-200"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>دخول المشرف / المسؤول</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sub-bar (Only when admin is logged in) */}
        {isAdmin && (
          <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
                activeTab === 'form' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-slate-600'
              }`}
            >
              نموذج التسجيل
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
                activeTab === 'table' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-slate-600'
              }`}
            >
              سجل اللاعبين ({registeredCount})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1 rounded-md font-medium whitespace-nowrap ${
                activeTab === 'analytics' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-slate-600'
              }`}
            >
              الإحصائيات
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
