/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RegistrationForm } from './components/RegistrationForm';
import { StudentsTable } from './components/StudentsTable';
import { AnalyticsView } from './components/AnalyticsView';
import { StudentDetailModal } from './components/StudentDetailModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { StudentRegistration, RegistrationStatus } from './types/league';
import { INITIAL_STUDENTS, SCHOOL_NAME } from './data/mockData';
import { Trophy, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'school_league_saad_students_v2';
const ADMIN_AUTH_KEY = 'school_league_is_admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'table' | 'analytics'>('form');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [students, setStudents] = useState<StudentRegistration[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  const [selectedStudentForModal, setSelectedStudentForModal] = useState<StudentRegistration | null>(null);
  const [isNewRegistrationModal, setIsNewRegistrationModal] = useState(false);

  // Sync students to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [students]);

  // Keep admin status synced to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save admin state:', e);
    }
  }, [isAdmin]);

  // Handle new student registration (sent for review and approval)
  const handleRegistrationSuccess = (newStudent: StudentRegistration) => {
    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudentForModal(newStudent);
    setIsNewRegistrationModal(true);
  };

  // Update status (Admin only)
  const handleUpdateStatus = (studentId: string, status: RegistrationStatus) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  // Delete student (Admin only)
  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  const handleOpenStudentCard = (student: StudentRegistration) => {
    setSelectedStudentForModal(student);
    setIsNewRegistrationModal(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminModalOpen(false);
    setActiveTab('table');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setActiveTab('form');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Bar Navigation (Roster & Analytics only accessible when admin is logged in) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        registeredCount={students.length} 
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 pb-16">
        {/* Form is open to students and parents */}
        {activeTab === 'form' && (
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        )}

        {/* Roster is visible only to Admin */}
        {activeTab === 'table' && isAdmin && (
          <StudentsTable
            students={students}
            onViewCard={handleOpenStudentCard}
            onUpdateStatus={handleUpdateStatus}
            onDeleteStudent={handleDeleteStudent}
            onNewRegistration={() => setActiveTab('form')}
          />
        )}

        {/* Analytics are visible only to Admin */}
        {activeTab === 'analytics' && isAdmin && (
          <AnalyticsView 
            students={students} 
            onRegisterClick={() => setActiveTab('form')} 
          />
        )}
      </main>

      {/* Admin Login Modal (PIN protected) */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Modal for Player Pass Card / Full Details */}
      <StudentDetailModal
        student={selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
        isNewRegistration={isNewRegistrationModal}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <img 
                src="/assets/aistudio/image_e07eec39.png" 
                alt="شعار دوري المدارس" 
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 border border-slate-200 shadow-2xs" 
              />
              <span className="font-bold text-slate-800">{SCHOOL_NAME}</span>
              <span aria-hidden="true">·</span>
              <span>دوري المدارس بمنطقة نجران (فريق المرحلة الابتدائية وفريق المرحلة المتوسطة)</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>نظام تسجيل معتمد</span>
              </span>
              <span className="font-mono">الموسم الرياضي 1448 / 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
