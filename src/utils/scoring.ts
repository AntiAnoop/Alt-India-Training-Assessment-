import { Question } from '../types/index.ts';

export interface ChapterScoreResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
}

export interface FinalScoreResult {
  totalScore: number;
  maximumScore: number;
  percentage: number;
  passed: boolean;
  sectionScores: {
    coreKnowledge: number;
    scenarioBased: number;
    practical: number;
  };
}

/**
 * Calculates individual module assessment score.
 * Passing threshold is 70%.
 */
export function calculateChapterScore(
  answers: Record<string, number>,
  questions: Question[],
  passingPercentage: number = 70
): ChapterScoreResult {
  if (!questions || questions.length === 0) {
    return { score: 0, totalQuestions: 0, percentage: 0, passed: false };
  }

  let correctCount = 0;
  for (const q of questions) {
    if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  }

  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= passingPercentage;

  return {
    score: correctCount,
    totalQuestions: questions.length,
    percentage,
    passed
  };
}

/**
 * Calculates Final Comprehensive Assessment Score.
 * 30 questions based strictly on Modules 1–7.
 * Passing threshold: 75% (score percentage = correct answers / 30 * 100).
 */
export function calculateFinalScore(
  answers: Record<string, number>,
  questions: Question[]
): FinalScoreResult {
  const totalQuestions = questions.length || 30;
  let correctCount = 0;

  for (const q of questions) {
    const isCorrect = answers[q.id] !== undefined && answers[q.id] === q.correctAnswer;
    if (isCorrect) {
      correctCount += 1;
    }
  }

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = percentage >= 75;

  return {
    totalScore: correctCount,
    maximumScore: totalQuestions,
    percentage,
    passed,
    sectionScores: {
      coreKnowledge: correctCount,
      scenarioBased: 0,
      practical: 0
    }
  };
}

/**
 * Cleanly format seconds into MM:SS
 */
export function formatSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Sanitizes candidate name for standard PDF export filename.
 * Template: [CandidateName]_Alt_India_Sales_Counselling_Assessment_Report.pdf
 */
export function sanitizeReportFilename(name: string): string {
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9_\s-]/g, '')
    .replace(/\s+/g, '_') || 'Candidate';
  return `${cleanName}_Alt_India_Sales_Counselling_Assessment_Report.pdf`;
}
