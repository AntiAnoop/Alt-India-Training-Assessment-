export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  marks?: number; // For final assessment
  section?: 'coreKnowledge' | 'scenarioBased' | 'practical';
}

export interface ChapterInfo {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  videoUrl: string; // Google Drive embed URL or direct video URL
  duration: string;
  assessmentQuestionCount: number;
  passingPercentage: number;
  timeLimitMinutes: number;
}

export interface ChapterAssessmentAttempt {
  attemptNumber: number;
  timestamp: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, number>;
}

export interface ChapterProgress {
  videoPosition: number; // in seconds
  videoDuration?: number;
  lastWatchedAt?: string;
  assessment: {
    inProgress?: {
      answers: Record<string, number>;
      currentQuestionIndex: number;
      startedAt: number;
      endsAt: number;
    } | null;
    attempts: ChapterAssessmentAttempt[];
    bestScore: number | null;
    latestScore: number | null;
    passed: boolean;
  };
}

export interface FinalAssessmentAttempt {
  attemptNumber: number;
  timestamp: string;
  totalScore: number;
  maximumScore: number;
  passed: boolean;
  percentage: number;
  sectionScores: {
    coreKnowledge: number;
    scenarioBased: number;
    practical: number;
  };
  answers: Record<string, number>;
}

export interface FinalAssessmentState {
  status: 'not_started' | 'in_progress' | 'completed';
  currentQuestionIndex: number;
  answers: Record<string, number>;
  startedAt: number | null;
  endsAt: number | null;
  attempts: FinalAssessmentAttempt[];
  latestScore: number | null;
  bestScore: number | null;
  passed: boolean;
}

export interface FinalReportData {
  candidateName: string;
  userId: string;
  generatedAt: string;
  finalScore: number;
  maximumScore: number;
  percentage: number;
  status: 'PASSED' | 'NEEDS RETAKE';
  sectionScores: {
    coreKnowledge: { score: number; max: number };
    scenarioBased: { score: number; max: number };
    practical: { score: number; max: number };
  };
  chapterResults: Array<{
    chapterId: number;
    chapterNumber: string;
    title: string;
    bestScore: number | null;
    totalQuestions: number;
    passed: boolean;
    attempts: number;
  }>;
  finalAttempts: number;
}

export interface UserTrainingRecord {
  userId: string;
  name: string;
  createdAt: string;
  lastActiveAt: string;
  currentChapterId: number;
  lastView?: 'dashboard' | 'chapters' | 'chapter-detail' | 'assessment' | 'final-assessment' | 'report';
  chapters: Record<string, ChapterProgress>;
  finalAssessment: FinalAssessmentState;
  report: {
    generated: boolean;
    data: FinalReportData | null;
  };
}

export interface StorageSchema {
  version: number;
  activeUserId: string | null;
  users: Record<string, UserTrainingRecord>;
}
