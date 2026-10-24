import React from 'react';
import { ChapterInfo, UserTrainingRecord } from '../types/index.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { ArrowRight, CheckCircle2, AlertCircle, Clock, Award, FileText, ChevronRight } from 'lucide-react';

interface DashboardViewProps {
  user: UserTrainingRecord;
  onOpenChapter: (chapterId: number) => void;
  onStartFinalAssessment: () => void;
  onViewReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onOpenChapter,
  onStartFinalAssessment,
  onViewReport
}) => {
  const finalState = user.finalAssessment;
  const hasCompletedFinal = finalState.status === 'completed' && finalState.latestScore !== null;
  const reportAvailable = user.report.generated && user.report.data !== null;

  // Compute summary stats
  const totalChapters = CHAPTERS_DATA.length;
  const chaptersAttemptedCount = Object.values(user.chapters).filter(
    (ch) => ch.assessment.attempts.length > 0
  ).length;

  const chaptersPassedCount = Object.values(user.chapters).filter(
    (ch) => ch.assessment.passed
  ).length;

  const allChaptersCleared = chaptersPassedCount === totalChapters;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Welcome Hero - Clean Apple Style */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-block text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Counsellor Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Welcome, {user.name} 👋
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Alt India Sales Counselling Training · 11 Comprehensive Modules & Assessment
            </p>
          </div>

          <div className="flex items-center gap-6 sm:border-l sm:border-slate-100 sm:pl-6">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">
                {chaptersPassedCount}<span className="text-slate-400 font-normal text-sm"> / {totalChapters}</span>
              </div>
              <div className="text-xs text-slate-500">Chapters Cleared</div>
            </div>
            {finalState.bestScore !== null && (
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">
                  {finalState.bestScore}<span className="text-slate-400 font-normal text-sm"> / 100</span>
                </div>
                <div className="text-xs text-slate-500">Final Score</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapters Grid (11 Modules) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Training Chapters
            </h2>
            <p className="text-xs text-slate-500">
              Complete and clear all 11 chapter assessments (≥ 70%) to qualify for the Final Assessment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHAPTERS_DATA.map((chapter: ChapterInfo) => {
            const chProgress = user.chapters[String(chapter.id)];
            const assessment = chProgress?.assessment;
            const hasAttempted = assessment && assessment.attempts.length > 0;
            const isPassed = assessment?.passed;
            const bestScore = assessment?.bestScore;

            return (
              <div
                key={chapter.id}
                className="group bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {chapter.number}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chapter.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                    {chapter.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {chapter.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Assessment Status */}
                  <div>
                    {!hasAttempted ? (
                      <span className="text-slate-400 font-normal">
                        Assessment: Not Attempted
                      </span>
                    ) : isPassed ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Assessment: {bestScore}/5 — Passed</span>
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Assessment: {bestScore}/5 — Needs Retake</span>
                      </span>
                    )}
                  </div>

                  {/* Open Chapter Action */}
                  <button
                    onClick={() => onOpenChapter(chapter.id)}
                    className="inline-flex items-center gap-1 font-medium text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>Open Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL ASSESSMENT SECTION (Bottom) */}
      <div className={`bg-white rounded-2xl border p-6 sm:p-8 shadow-sm transition-all ${
        allChaptersCleared ? 'border-slate-200/90' : 'border-slate-200/80 bg-slate-50/40'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Course Culmination
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">30 Questions · 40 Minutes</span>
              {!allChaptersCleared && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-semibold text-amber-700">
                    Prerequisite: {chaptersPassedCount} of {totalChapters} Cleared
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span>FINAL ASSESSMENT</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {allChaptersCleared
                ? 'All 11 chapter assessments cleared! You are qualified to take the comprehensive final assessment (Passing score: 75/100).'
                : 'Locked. You must take and clear all 11 individual chapter assessments (≥ 70%) before you can begin the Final Assessment.'}
            </p>

            {hasCompletedFinal && (
              <div className="pt-2 flex items-center gap-3 text-xs">
                <span className="font-semibold text-slate-900">
                  Final Score: {finalState.latestScore}/100
                </span>
                <span className="text-slate-300">·</span>
                <span className={`font-semibold ${finalState.passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                  Status: {finalState.passed ? 'PASSED' : 'NEEDS RETAKE'}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">
                  Attempts: {finalState.attempts.length}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {!allChaptersCleared ? (
              <button
                disabled
                className="py-3 px-6 bg-slate-200 text-slate-400 font-medium rounded-xl text-xs sm:text-sm cursor-not-allowed flex items-center justify-center gap-2"
                title={`Pass all 11 chapters to unlock (${chaptersPassedCount}/${totalChapters} cleared)`}
              >
                <span>Locked ({chaptersPassedCount}/{totalChapters} Cleared)</span>
              </button>
            ) : hasCompletedFinal ? (
              <>
                <button
                  onClick={onViewReport}
                  className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View / Download Assessment Report</span>
                </button>
                <button
                  onClick={onStartFinalAssessment}
                  className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Retake Final</span>
                </button>
              </>
            ) : finalState.status === 'in_progress' ? (
              <button
                onClick={onStartFinalAssessment}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Resume Final Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onStartFinalAssessment}
                className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Final Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
