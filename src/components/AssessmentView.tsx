import React, { useState, useEffect, useRef } from 'react';
import { ChapterInfo, UserTrainingRecord, Question, ChapterAssessmentAttempt } from '../types/index.ts';
import { CHAPTER_QUESTIONS } from '../data/questionsData.ts';
import { calculateChapterScore, formatSeconds } from '../utils/scoring.ts';
import {
  saveChapterAssessmentAnswer,
  submitChapterAssessment,
  startChapterAssessment
} from '../services/storageService.ts';
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, RotateCcw, ArrowRight, Lock } from 'lucide-react';

interface AssessmentViewProps {
  chapter: ChapterInfo;
  user: UserTrainingRecord;
  onBackToChapter: () => void;
  onBackToDashboard: () => void;
  onAssessmentCompleted: (updatedUser: UserTrainingRecord) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  chapter,
  user,
  onBackToChapter,
  onBackToDashboard,
  onAssessmentCompleted
}) => {
  const questions: Question[] = CHAPTER_QUESTIONS[chapter.id] || [];
  const chProgress = user.chapters[String(chapter.id)];
  const inProgress = chProgress?.assessment.inProgress;

  // Track if we are showing results of a just-submitted attempt
  const [submittedAttempt, setSubmittedAttempt] = useState<ChapterAssessmentAttempt | null>(null);

  // Restore currentQuestionIndex and answers from inProgress if available
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    return inProgress?.currentQuestionIndex ?? 0;
  });

  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    return inProgress?.answers ?? {};
  });

  // Calculate or initialize the endsAt timestamp properly via useState initializer
  const [endsAt, setEndsAt] = useState<number>(() => {
    if (inProgress?.endsAt && inProgress.endsAt > Date.now()) {
      return inProgress.endsAt;
    }
    // Initialize 5 minutes if starting fresh
    const newEnd = Date.now() + chapter.timeLimitMinutes * 60 * 1000;
    startChapterAssessment(chapter.id, chapter.timeLimitMinutes);
    return newEnd;
  });

  const endsAtRef = useRef<number>(endsAt);
  endsAtRef.current = endsAt;

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    return Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
  });

  const isSubmittingRef = useRef(false);

  // Auto-submit helper
  const handleSubmit = (finalAnswers = answers) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const result = calculateChapterScore(finalAnswers, questions, chapter.passingPercentage);
    const existingAttempts = chProgress?.assessment.attempts || [];

    const newAttempt: ChapterAssessmentAttempt = {
      attemptNumber: existingAttempts.length + 1,
      timestamp: new Date().toISOString(),
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      passed: result.passed,
      answers: finalAnswers
    };

    const updated = submitChapterAssessment(chapter.id, newAttempt);
    setSubmittedAttempt(newAttempt);
    if (updated) {
      onAssessmentCompleted(updated);
    }
  };

  // Timer countdown hook (persisted absolute endsAt)
  useEffect(() => {
    if (submittedAttempt) return;

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
  }, [submittedAttempt]);

  const currentQ = questions[currentIndex];

  // Handle selecting an answer
  const handleSelectAnswer = (optionIdx: number) => {
    if (!currentQ || submittedAttempt) return;
    const newAnswers = { ...answers, [currentQ.id]: optionIdx };
    setAnswers(newAnswers);

    // Autosave immediately (Requirement 3 & 10)
    saveChapterAssessmentAnswer(
      chapter.id,
      currentQ.id,
      optionIdx,
      currentIndex,
      endsAtRef.current
    );
  };

  // Retake assessment handler
  const handleRetake = () => {
    isSubmittingRef.current = false;
    setSubmittedAttempt(null);
    setAnswers({});
    setCurrentIndex(0);
    const newEndsAt = Date.now() + chapter.timeLimitMinutes * 60 * 1000;
    setEndsAt(newEndsAt);
    endsAtRef.current = newEndsAt;
    setRemainingSeconds(chapter.timeLimitMinutes * 60);
    startChapterAssessment(chapter.id, chapter.timeLimitMinutes);
  };

  // RESULTS VIEW AFTER SUBMISSION
  if (submittedAttempt) {
    const isPass = submittedAttempt.passed;
    const allAttempts = chProgress?.assessment.attempts || [submittedAttempt];
    const bestScore = chProgress?.assessment.bestScore ?? submittedAttempt.score;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm text-center">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4">
            {isPass ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            ) : (
              <AlertCircle className="w-12 h-12 text-amber-600" />
            )}
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Chapter {chapter.number} Assessment Result
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            {isPass ? 'Assessment Passed' : 'Assessment Completed — Retake Recommended'}
          </h2>

          <div className="my-6 inline-flex flex-col items-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {submittedAttempt.score} <span className="text-slate-400 font-normal text-2xl">/ {submittedAttempt.totalQuestions}</span>
            </div>
            <div className="text-sm font-semibold mt-1">
              {submittedAttempt.percentage}% Score · {isPass ? 'Passed (≥ 70%)' : 'Passing Threshold is 70%'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pb-4 border-b border-slate-100">
            <div>
              <span className="text-slate-400">Best Score:</span>{' '}
              <strong className="text-slate-900">{bestScore} / {questions.length}</strong>
            </div>
            <div>
              <span className="text-slate-400">Total Attempts:</span>{' '}
              <strong className="text-slate-900">{allAttempts.length}</strong>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetake}
              className="py-2.5 px-5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </button>
            <button
              onClick={onBackToChapter}
              className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-medium transition-colors shadow-sm cursor-pointer"
            >
              Back to Chapter
            </button>
            <button
              onClick={onBackToDashboard}
              className="py-2.5 px-5 text-slate-600 hover:text-slate-900 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Question Review & Explanations: ONLY SHOWN IF PASSED */}
        {isPass ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Review Questions & Answers
              </h3>
              <span className="text-xs font-semibold text-emerald-700">
                Assessment Passed · Solutions Unlocked
              </span>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const selected = submittedAttempt.answers[q.id];
                const isCorrect = selected === q.correctAnswer;

                return (
                  <div key={q.id} className="pt-4 first:pt-0 border-t first:border-t-0 border-slate-100">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-400 mr-2">Q{idx + 1}.</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">{q.question}</span>
                      </div>
                    </div>

                    <div className="mt-3 pl-6 space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selected === optIdx;
                        const isOptionCorrect = optIdx === q.correctAnswer;

                        let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (isOptionCorrect) {
                          optClass = 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          optClass = 'bg-rose-50/70 border-rose-300 text-rose-950';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClass}`}
                          >
                            <span>{opt}</span>
                            {isOptionCorrect && (
                              <span className="text-[10px] text-emerald-700 font-bold shrink-0 ml-2">Correct</span>
                            )}
                            {isOptionSelected && !isOptionCorrect && (
                              <span className="text-[10px] text-rose-600 font-bold shrink-0 ml-2">Your Answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 pl-6 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg">
                      <strong className="text-slate-700">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5 text-slate-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Answers & Explanations Hidden
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              To ensure genuine learning and conceptual understanding, correct answers and detailed explanations are only revealed after achieving a passing score of 70% (4/5) or higher.
            </p>
            <p className="text-xs text-slate-500">
              Please review the training video and core competencies, then retake the assessment.
            </p>
            <div className="pt-2">
              <button
                onClick={handleRetake}
                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ACTIVE IN-PROGRESS ASSESSMENT VIEW
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header bar with timer and back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToChapter}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Chapter</span>
        </button>

        {/* Countdown Timer (starts at 05:00, persisted) */}
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 ${
          remainingSeconds <= 60
            ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
            : 'bg-slate-100 text-slate-800'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>Time Remaining: {formatSeconds(remainingSeconds)}</span>
        </div>
      </div>

      {/* Main Assessment Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Chapter {chapter.number} Assessment
            </div>
            <div className="text-sm font-bold text-slate-900">
              Question {currentIndex + 1} of {questions.length}
            </div>
          </div>
          <div className="text-xs text-slate-400">
            Passing: 70%
          </div>
        </div>

        {/* Progress pills indicator */}
        <div className="flex gap-1.5 py-4">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-slate-900'
                    : isAnswered
                    ? 'bg-slate-400'
                    : 'bg-slate-200'
                }`}
                title={`Question ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Current Question Body */}
        {currentQ && (
          <div className="mt-4 space-y-6">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>

            <div className="space-y-2.5">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = answers[currentQ.id] === optIdx;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50/80 text-slate-950 font-medium ring-1 ring-slate-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-semibold ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Submit Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
