import React, { useState, useEffect, useRef } from 'react';
import { UserTrainingRecord, FinalAssessmentAttempt, FinalReportData } from '../types/index.ts';
import { FINAL_ASSESSMENT_QUESTIONS } from '../data/questionsData.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';
import { calculateFinalScore, formatSeconds } from '../utils/scoring.ts';
import {
  startFinalAssessment,
  saveFinalAssessmentAnswer,
  saveFinalAssessmentCurrentQuestion,
  submitFinalAssessment,
  saveFinalReport
} from '../services/storageService.ts';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, Award, RotateCcw, ArrowRight, FileText, ChevronLeft, Lock } from 'lucide-react';

interface FinalAssessmentViewProps {
  user: UserTrainingRecord;
  onBackToDashboard: () => void;
  onViewReport: () => void;
  onUserUpdated: (updatedUser: UserTrainingRecord) => void;
}

export const FinalAssessmentView: React.FC<FinalAssessmentViewProps> = ({
  user,
  onBackToDashboard,
  onViewReport,
  onUserUpdated
}) => {
  const finalState = user.finalAssessment;
  const questions = FINAL_ASSESSMENT_QUESTIONS;

  // Verify all 7 theory modules are cleared before allowing access
  const theoryModules = CHAPTERS_DATA.filter((ch) => ch.type === 'theory');
  const totalTheoryCount = theoryModules.length; // 7
  const chaptersPassedCount = theoryModules.filter(
    (ch) => user.chapters[String(ch.id)]?.assessment?.passed
  ).length;
  const allChaptersCleared = chaptersPassedCount === totalTheoryCount;

  // Track if viewing result of latest submission or if state is completed
  const [showResultScreen, setShowResultScreen] = useState<boolean>(() => {
    return finalState.status === 'completed' && finalState.attempts.length > 0;
  });

  // Latest submitted attempt
  const latestAttempt = finalState.attempts.length > 0
    ? finalState.attempts[finalState.attempts.length - 1]
    : null;

  // Active question index (restored from saved state)
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return finalState.currentQuestionIndex || 0;
  });

  // Selected answers (restored from saved state)
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    return finalState.answers || {};
  });

  // 40-minute timer initialization
  const [endsAt, setEndsAt] = useState<number>(() => {
    if (finalState.endsAt && finalState.endsAt > Date.now()) {
      return finalState.endsAt;
    }
    const newEnd = Date.now() + 40 * 60 * 1000;
    if (allChaptersCleared) {
      startFinalAssessment();
    }
    return newEnd;
  });

  const endsAtRef = useRef<number>(endsAt);
  endsAtRef.current = endsAt;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    return Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
  });

  const isSubmittingRef = useRef(false);

  // Submits the final assessment, saves to storage, and generates report data
  const handleSubmit = (finalAnswers = answers) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const result = calculateFinalScore(finalAnswers, questions);
    const existingAttempts = finalState.attempts || [];

    const newAttempt: FinalAssessmentAttempt = {
      attemptNumber: existingAttempts.length + 1,
      timestamp: new Date().toISOString(),
      totalScore: result.totalScore,
      maximumScore: result.maximumScore,
      passed: result.passed,
      percentage: result.percentage,
      sectionScores: result.sectionScores,
      answers: finalAnswers
    };

    const updated = submitFinalAssessment(newAttempt);

    // Auto-generate report data structure
    if (updated) {
      const chapterResults = CHAPTERS_DATA.map((ch) => {
        const chProg = updated.chapters[String(ch.id)];
        return {
          chapterId: ch.id,
          chapterNumber: ch.number,
          title: ch.title,
          bestScore: ch.type === 'theory' ? (chProg?.assessment.bestScore ?? null) : null,
          totalQuestions: ch.assessmentQuestionCount,
          passed: ch.type === 'theory' ? (chProg?.assessment.passed ?? false) : true,
          attempts: chProg?.assessment.attempts.length ?? 0,
          type: ch.type
        };
      });

      const reportData: FinalReportData = {
        candidateName: updated.name,
        userId: updated.userId,
        generatedAt: new Date().toISOString(),
        finalScore: result.totalScore,
        maximumScore: result.maximumScore,
        percentage: result.percentage,
        status: result.passed ? 'PASSED' : 'NEEDS RETAKE',
        sectionScores: {
          coreKnowledge: { score: result.totalScore, max: result.maximumScore },
          scenarioBased: { score: 0, max: 0 },
          practical: { score: 0, max: 0 }
        },
        chapterResults,
        finalAttempts: updated.finalAssessment.attempts.length
      };

      const finalUser = saveFinalReport(reportData);
      if (finalUser) {
        onUserUpdated(finalUser);
      } else {
        onUserUpdated(updated);
      }
    }

    setShowResultScreen(true);
  };

  // Timer countdown hook
  useEffect(() => {
    if (showResultScreen) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const left = Math.max(0, Math.floor((endsAtRef.current - now) / 1000));
      setRemainingSeconds(left);

      if (left <= 0 && !isSubmittingRef.current) {
        clearInterval(timer);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showResultScreen]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectAnswer = (optionIdx: number) => {
    if (!currentQ || showResultScreen) return;
    const newAnswers = { ...answers, [currentQ.id]: optionIdx };
    setAnswers(newAnswers);
    saveFinalAssessmentAnswer(currentQ.id, optionIdx, currentIndex);
  };

  const handleNavigateQuestion = (idx: number) => {
    setCurrentIndex(idx);
    saveFinalAssessmentCurrentQuestion(idx);
  };

  const handleRetake = () => {
    isSubmittingRef.current = false;
    setShowResultScreen(false);
    setAnswers({});
    setCurrentIndex(0);
    const newEndsAt = Date.now() + 40 * 60 * 1000;
    setEndsAt(newEndsAt);
    endsAtRef.current = newEndsAt;
    setRemainingSeconds(40 * 60);
    startFinalAssessment();
  };

  // LOCK SCREEN IF THEORY MODULES ARE NOT YET CLEARED
  if (!allChaptersCleared && (!latestAttempt || finalState.status !== 'completed')) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Final Assessment Locked
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            You must complete and clear (≥ 70%) all 7 theory module assessments before you can unlock and attempt the Final Assessment.
          </p>

          <p className="text-xs text-slate-400">
            Modules 08 & 09 (Kannada Roleplays) are practical demonstrations and do not have assessments.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 max-w-xs mx-auto">
            Current Progress: <strong className="text-slate-900">{chaptersPassedCount}</strong> of <strong className="text-slate-900">{totalTheoryCount}</strong> Theory Modules Cleared
          </div>

          <div className="pt-2">
            <button
              onClick={onBackToDashboard}
              className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              Go to Training Modules
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULT SCREEN AFTER SUBMISSION
  if (showResultScreen && latestAttempt) {
    const isPass = latestAttempt.passed;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm text-center">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            {isPass ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            ) : (
              <AlertCircle className="w-12 h-12 text-amber-600" />
            )}
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Assessment Completed
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            {user.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Alt India Sales Counselling · Final Assessment (Modules 1–7)
          </p>

          {/* FINAL SCORE BANNER */}
          <div className="my-8 inline-flex flex-col items-center p-8 bg-slate-50 rounded-2xl border border-slate-200/80 w-full max-w-md">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              FINAL SCORE
            </div>
            <div className="text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
              {latestAttempt.totalScore} <span className="text-slate-400 font-normal text-2xl">/ 30</span>
            </div>
            <div className="text-sm font-semibold text-slate-700 mt-1">
              {latestAttempt.percentage}% Score
            </div>
            <div className={`mt-3 px-3 py-1 text-xs font-bold rounded-md ${
              isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isPass ? 'PASSED (≥ 75%)' : 'NEEDS RETAKE (Passing: 75%, 23/30)'}
            </div>
          </div>

          <div className="text-xs text-slate-500 pb-6 border-b border-slate-100">
            Assessment Attempts: {finalState.attempts.length} · 30 Questions · 40 Minutes
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onViewReport}
              className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate / View Assessment Report</span>
            </button>
            <button
              onClick={handleRetake}
              className="py-3 px-5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Final Assessment</span>
            </button>
            <button
              onClick={onBackToDashboard}
              className="py-3 px-5 text-slate-600 hover:text-slate-900 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE IN-PROGRESS FINAL ASSESSMENT VIEW
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Dashboard</span>
        </button>

        {/* 40-minute timer */}
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 ${
          remainingSeconds <= 300
            ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
            : 'bg-slate-100 text-slate-800'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Time Remaining: {formatSeconds(remainingSeconds)}</span>
        </div>
      </div>

      {/* Main Assessment Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        {/* Title & Section Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Comprehensive Final Assessment · Modules 1–7
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Question {currentIndex + 1} of {questions.length}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500">
              Answered: <strong className="text-slate-900">{answeredCount}</strong> / {questions.length}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">Passing: <strong>75% (23/30)</strong></span>
          </div>
        </div>

        {/* Question Selector Numbers Grid */}
        <div className="py-4 border-b border-slate-100 flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => handleNavigateQuestion(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 text-white font-bold ring-2 ring-slate-900 ring-offset-1'
                    : isAnswered
                    ? 'bg-slate-100 text-slate-900 border border-slate-300'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Content */}
        <div className="py-6 space-y-6">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = answers[currentQ.id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 font-bold ${
                    isSelected ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {optionLetters[optIdx]}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => handleNavigateQuestion(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`py-2 px-4 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
              currentIndex === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => handleNavigateQuestion(currentIndex + 1)}
              className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleSubmit()}
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Final Assessment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
