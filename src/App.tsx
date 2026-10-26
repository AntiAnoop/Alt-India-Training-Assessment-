/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserTrainingRecord } from './types/index.ts';
import { CHAPTERS_DATA } from './data/chaptersData.ts';
import {
  getActiveUser,
  createAndActivateUser,
  setActiveUser,
  logoutUser,
  getStorageData,
  saveActiveView
} from './services/storageService.ts';
import { Header } from './components/Header.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { ChapterDetailView } from './components/ChapterDetailView.tsx';
import { AssessmentView } from './components/AssessmentView.tsx';
import { FinalAssessmentView } from './components/FinalAssessmentView.tsx';
import { ReportView } from './components/ReportView.tsx';
import { ResetModal } from './components/ResetModal.tsx';

type ViewType = 'dashboard' | 'chapters' | 'chapter-detail' | 'assessment' | 'final-assessment' | 'report';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserTrainingRecord | null>(() => {
    return getActiveUser();
  });

  const [activeView, setActiveView] = useState<ViewType>(() => {
    const user = getActiveUser();
    return user?.lastView || 'dashboard';
  });

  const [selectedChapterId, setSelectedChapterId] = useState<number>(() => {
    const user = getActiveUser();
    return user?.currentChapterId || 1;
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Sync state with storage on storage event (multi-tab support)
  useEffect(() => {
    const handleStorageChange = () => {
      const active = getActiveUser();
      setCurrentUser(active);
      if (active?.lastView) {
        setActiveView(active.lastView);
      }
      if (active?.currentChapterId) {
        setSelectedChapterId(active.currentChapterId);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update view with autosave
  const navigateToView = (view: ViewType, chapterId?: number) => {
    setActiveView(view);
    const targetChapter = chapterId !== undefined ? chapterId : selectedChapterId;
    if (chapterId !== undefined) {
      setSelectedChapterId(chapterId);
    }
    saveActiveView(view, targetChapter);
  };

  // Handle starting training with a new name
  const handleStartTraining = (name: string) => {
    const newUser = createAndActivateUser(name);
    setCurrentUser(newUser);
    navigateToView('dashboard', 1);
  };

  // Handle continuing an existing profile
  const handleContinueExisting = (userId: string) => {
    const existing = setActiveUser(userId);
    if (existing) {
      setCurrentUser(existing);
      navigateToView(existing.lastView || 'dashboard', existing.currentChapterId || 1);
    }
  };

  // Handle Logout (Requirement 4: preserves data, clears session)
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  // Open Chapter
  const handleOpenChapter = (chapterId: number) => {
    navigateToView('chapter-detail', chapterId);
  };

  // Start Chapter Assessment
  const handleStartChapterAssessment = (chapterId: number) => {
    navigateToView('assessment', chapterId);
  };

  // Start Final Assessment
  const handleStartFinalAssessment = () => {
    navigateToView('final-assessment');
  };

  // View Report
  const handleViewReport = () => {
    navigateToView('report');
  };

  // When assessment completes
  const handleUserUpdated = (updated: UserTrainingRecord) => {
    setCurrentUser(updated);
  };

  // Reset complete
  const handleResetComplete = () => {
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  // If no user is logged in, show the LoginScreen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col justify-between">
        <LoginScreen
          onStart={handleStartTraining}
          onContinueExisting={handleContinueExisting}
        />
        {/* Discreet developer reset in footer */}
        <footer className="py-4 text-center text-[11px] text-slate-400">
          <span>Alt India Sales Counselling Training · Internal Platform</span>
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="ml-3 text-slate-400 hover:text-slate-600 underline cursor-pointer"
          >
            Reset Test Data
          </button>
        </footer>

        <ResetModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onResetComplete={handleResetComplete}
        />
      </div>
    );
  }

  const selectedChapter = CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || CHAPTERS_DATA[0];
  const hasReport = currentUser.report.generated && currentUser.report.data !== null;
  const hasFinalScore = currentUser.finalAssessment.latestScore !== null;

  const theoryModules = CHAPTERS_DATA.filter((c) => c.type === 'theory');
  const totalTheoryCount = theoryModules.length;
  const chaptersPassedCount = theoryModules.filter(
    (ch) => currentUser.chapters[String(ch.id)]?.assessment?.passed
  ).length;
  const allChaptersCleared = chaptersPassedCount === totalTheoryCount;

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col text-slate-900">
      <Header
        candidateName={currentUser.name}
        activeView={activeView}
        onNavigate={(view) => {
          if (view === 'chapters') {
            navigateToView('dashboard');
          } else if (view === 'final-assessment' && !allChaptersCleared) {
            // Cannot navigate to locked final assessment
            navigateToView('dashboard');
          } else {
            navigateToView(view);
          }
        }}
        onLogout={handleLogout}
        hasReport={hasReport}
        hasFinalScore={hasFinalScore}
        allChaptersCleared={allChaptersCleared}
        chaptersPassedCount={chaptersPassedCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeView === 'dashboard' && (
          <DashboardView
            user={currentUser}
            onOpenChapter={handleOpenChapter}
            onStartFinalAssessment={handleStartFinalAssessment}
            onViewReport={handleViewReport}
          />
        )}

        {activeView === 'chapter-detail' && (
          <ChapterDetailView
            chapter={selectedChapter}
            user={currentUser}
            onBack={() => navigateToView('dashboard')}
            onStartAssessment={handleStartChapterAssessment}
          />
        )}

        {activeView === 'assessment' && (
          <AssessmentView
            chapter={selectedChapter}
            user={currentUser}
            onBackToChapter={() => navigateToView('chapter-detail')}
            onBackToDashboard={() => navigateToView('dashboard')}
            onAssessmentCompleted={handleUserUpdated}
          />
        )}

        {activeView === 'final-assessment' && (
          <FinalAssessmentView
            user={currentUser}
            onBackToDashboard={() => navigateToView('dashboard')}
            onViewReport={handleViewReport}
            onUserUpdated={handleUserUpdated}
          />
        )}

        {activeView === 'report' && (
          <ReportView
            user={currentUser}
            onBackToDashboard={() => navigateToView('dashboard')}
            onUserUpdated={handleUserUpdated}
          />
        )}
      </main>

      {/* Discreet footer */}
      <footer className="no-print border-t border-slate-200/80 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            Alt India Sales Counselling Training · Internal Assessment Framework
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Active Record: {currentUser.name}</span>
            <span>·</span>
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              Reset Test Data
            </button>
          </div>
        </div>
      </footer>

      {/* Developer Reset Modal */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onResetComplete={handleResetComplete}
      />
    </div>
  );
}
