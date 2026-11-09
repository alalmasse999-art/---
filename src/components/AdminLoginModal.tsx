/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234 or 2026
    if (pin === '1234' || pin === '2026') {
      setError('');
      setPin('');
      onLoginSuccess();
    } else {
      setError('رمز المرور غير صحيح. (الرمز الافتراضي للمسؤول: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
          <img 
            src="/assets/aistudio/image_e07eec39.png" 
            alt="دوري المدارس" 
            className="w-full h-full object-contain" 
          />
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          دخول المشرف الرياضي / المسؤول
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
          سجل لاعبي مدرسة سعد بن أبي وقاص والإحصائيات مخصصة فقط للمسؤولين المعتمدين.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-right">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              رمز المرور السري (PIN)
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                value={pin}
                autoFocus
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError('');
                }}
                placeholder="أدخل رمز مرور المشرف (مثال: 1234)"
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-center font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>تسجيل الدخول كمسؤول</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
            رمز المرور الافتراضي للإشراف: <span className="font-mono font-bold text-emerald-800">1234</span>
          </div>
        </form>
      </div>
    </div>
  );
};
