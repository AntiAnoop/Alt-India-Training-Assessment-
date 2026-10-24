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
 * Calculates individual chapter assessment score.
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
 * Total marks: 100. Passing: 75/100 (75%).
 * Section marks:
 * - coreKnowledge: 20 Qs * 2 marks = 40 max
 * - scenarioBased: 5 Qs * 6 marks = 30 max
 * - practical: 5 Qs * 6 marks = 30 max
 */
export function calculateFinalScore(
  answers: Record<string, number>,
  questions: Question[]
): FinalScoreResult {
  let coreScore = 0;
  let scenarioScore = 0;
  let practicalScore = 0;

  for (const q of questions) {
    const isCorrect = answers[q.id] !== undefined && answers[q.id] === q.correctAnswer;
    const marks = q.marks ?? 2;

    if (isCorrect) {
      if (q.section === 'coreKnowledge') {
        coreScore += marks;
      } else if (q.section === 'scenarioBased') {
        scenarioScore += marks;
      } else if (q.section === 'practical') {
        practicalScore += marks;
      } else {
        coreScore += marks;
      }
    }
  }

  const totalScore = coreScore + scenarioScore + practicalScore;
  const maximumScore = 100;
  const percentage = Math.round((totalScore / maximumScore) * 100);
  const passed = totalScore >= 75;

  return {
    totalScore,
    maximumScore,
    percentage,
    passed,
    sectionScores: {
      coreKnowledge: coreScore,
      scenarioBased: scenarioScore,
      practical: practicalScore
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
 * Requirement: [CandidateName]_Education_Sales_Counselling_Assessment_Report.pdf
 */
export function sanitizeReportFilename(name: string): string {
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9_\s-]/g, '')
    .replace(/\s+/g, '_') || 'Candidate';
  return `${cleanName}_Alt_India_Sales_Counselling_Assessment_Report.pdf`;
}
