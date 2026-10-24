import { StorageSchema, UserTrainingRecord, FinalReportData, ChapterAssessmentAttempt, FinalAssessmentAttempt } from '../types/index.ts';
import { CHAPTERS_DATA } from '../data/chaptersData.ts';

const STORAGE_KEY = 'educationSalesCounsellingTraining_v1';

/**
 * Creates default initial chapter progress state for all 11 chapters
 */
export function createInitialChaptersMap(): UserTrainingRecord['chapters'] {
  const map: UserTrainingRecord['chapters'] = {};
  for (const ch of CHAPTERS_DATA) {
    map[String(ch.id)] = {
      videoPosition: 0,
      assessment: {
        inProgress: null,
        attempts: [],
        bestScore: null,
        latestScore: null,
        passed: false
      }
    };
  }
  return map;
}

/**
 * Creates a pristine user training record
 */
export function createNewUserRecord(name: string): UserTrainingRecord {
  const userId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const now = new Date().toISOString();

  return {
    userId,
    name: name.trim(),
    createdAt: now,
    lastActiveAt: now,
    currentChapterId: 1,
    chapters: createInitialChaptersMap(),
    finalAssessment: {
      status: 'not_started',
      currentQuestionIndex: 0,
      answers: {},
      startedAt: null,
      endsAt: null,
      attempts: [],
      latestScore: null,
      bestScore: null,
      passed: false
    },
    report: {
      generated: false,
      data: null
    }
  };
}

/**
 * Safely loads the root storage state from localStorage
 */
export function getStorageData(): StorageSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        version: 1,
        activeUserId: null,
        users: {}
      };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { version: 1, activeUserId: null, users: {} };
    }
    return {
      version: parsed.version || 1,
      activeUserId: parsed.activeUserId || null,
      users: parsed.users || {}
    };
  } catch (err) {
    console.error('Failed to parse localStorage data:', err);
    return {
      version: 1,
      activeUserId: null,
      users: {}
    };
  }
}

/**
 * Safely saves the entire storage schema to localStorage
 */
export function saveStorageData(data: StorageSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

/**
 * Retrieves the currently active user record, or null if none
 */
export function getActiveUser(): UserTrainingRecord | null {
  const storage = getStorageData();
  if (!storage.activeUserId || !storage.users[storage.activeUserId]) {
    return null;
  }
  return storage.users[storage.activeUserId];
}

/**
 * Finds any existing user records matching the entered name (case-insensitive)
 */
export function findUsersByName(name: string): UserTrainingRecord[] {
  const storage = getStorageData();
  const trimmed = name.trim().toLowerCase();
  if (!trimmed) return [];
  return Object.values(storage.users).filter(
    (u) => u.name.trim().toLowerCase() === trimmed
  );
}

/**
 * Sets an existing user as the active user session
 */
export function setActiveUser(userId: string): UserTrainingRecord | null {
  const storage = getStorageData();
  if (!storage.users[userId]) return null;
  storage.activeUserId = userId;
  storage.users[userId].lastActiveAt = new Date().toISOString();
  saveStorageData(storage);
  return storage.users[userId];
}

/**
 * Creates and activates a new user record
 */
export function createAndActivateUser(name: string): UserTrainingRecord {
  const storage = getStorageData();
  const newUser = createNewUserRecord(name);
  storage.users[newUser.userId] = newUser;
  storage.activeUserId = newUser.userId;
  saveStorageData(storage);
  return newUser;
}

/**
 * Logs out the active user session without deleting their stored records
 */
export function logoutUser(): void {
  const storage = getStorageData();
  storage.activeUserId = null;
  saveStorageData(storage);
}

/**
 * Updates active user record with changes and autosaves immediately
 */
export function updateActiveUser(
  updater: (prev: UserTrainingRecord) => UserTrainingRecord
): UserTrainingRecord | null {
  const storage = getStorageData();
  if (!storage.activeUserId || !storage.users[storage.activeUserId]) {
    return null;
  }

  const currentUser = storage.users[storage.activeUserId];
  const updatedUser = updater({ ...currentUser });
  updatedUser.lastActiveAt = new Date().toISOString();

  storage.users[storage.activeUserId] = updatedUser;
  saveStorageData(storage);
  return updatedUser;
}

/**
 * Autosaves chapter video playback position
 */
export function saveVideoPosition(chapterId: number, seconds: number): void {
  updateActiveUser((user) => {
    const chKey = String(chapterId);
    const existingCh = user.chapters[chKey] || {
      videoPosition: 0,
      assessment: {
        inProgress: null,
        attempts: [],
        bestScore: null,
        latestScore: null,
        passed: false
      }
    };

    return {
      ...user,
      currentChapterId: chapterId,
      chapters: {
        ...user.chapters,
        [chKey]: {
          ...existingCh,
          videoPosition: seconds,
          lastWatchedAt: new Date().toISOString()
        }
      }
    };
  });
}

/**
 * Autosaves an answer selected for a chapter assessment in-progress
 */
export function saveChapterAssessmentAnswer(
  chapterId: number,
  questionId: string,
  answerIndex: number,
  currentQuestionIndex: number,
  endsAt: number
): void {
  updateActiveUser((user) => {
    const chKey = String(chapterId);
    const existingCh = user.chapters[chKey] || {
      videoPosition: 0,
      assessment: {
        inProgress: null,
        attempts: [],
        bestScore: null,
        latestScore: null,
        passed: false
      }
    };

    const inProg = existingCh.assessment.inProgress || {
      answers: {},
      currentQuestionIndex: 0,
      startedAt: Date.now(),
      endsAt
    };

    return {
      ...user,
      chapters: {
        ...user.chapters,
        [chKey]: {
          ...existingCh,
          assessment: {
            ...existingCh.assessment,
            inProgress: {
              ...inProg,
              currentQuestionIndex,
              endsAt,
              answers: {
                ...inProg.answers,
                [questionId]: answerIndex
              }
            }
          }
        }
      }
    };
  });
}

/**
 * Autosaves the last opened view and chapter ID for refresh restoration
 */
export function saveActiveView(
  view: UserTrainingRecord['lastView'],
  chapterId?: number
): void {
  updateActiveUser((user) => ({
    ...user,
    lastView: view,
    currentChapterId: chapterId !== undefined ? chapterId : user.currentChapterId
  }));
}

/**
 * Starts a chapter assessment (recording start and end timestamps for reload recovery)
 */
export function startChapterAssessment(
  chapterId: number,
  durationMinutes: number
): void {
  const startedAt = Date.now();
  const endsAt = startedAt + durationMinutes * 60 * 1000;

  updateActiveUser((user) => {
    const chKey = String(chapterId);
    const existingCh = user.chapters[chKey] || {
      videoPosition: 0,
      assessment: {
        inProgress: null,
        attempts: [],
        bestScore: null,
        latestScore: null,
        passed: false
      }
    };

    return {
      ...user,
      currentChapterId: chapterId,
      lastView: 'assessment',
      chapters: {
        ...user.chapters,
        [chKey]: {
          ...existingCh,
          assessment: {
            ...existingCh.assessment,
            inProgress: {
              answers: {},
              currentQuestionIndex: 0,
              startedAt,
              endsAt
            }
          }
        }
      }
    };
  });
}

/**
 * Submits a completed chapter assessment attempt
 */
export function submitChapterAssessment(
  chapterId: number,
  attempt: ChapterAssessmentAttempt
): UserTrainingRecord | null {
  return updateActiveUser((user) => {
    const chKey = String(chapterId);
    const existingCh = user.chapters[chKey] || {
      videoPosition: 0,
      assessment: {
        inProgress: null,
        attempts: [],
        bestScore: null,
        latestScore: null,
        passed: false
      }
    };

    const attempts = [...existingCh.assessment.attempts, attempt];
    const bestScore = existingCh.assessment.bestScore !== null
      ? Math.max(existingCh.assessment.bestScore, attempt.score)
      : attempt.score;
    const passed = existingCh.assessment.passed || attempt.passed;

    return {
      ...user,
      chapters: {
        ...user.chapters,
        [chKey]: {
          ...existingCh,
          assessment: {
            inProgress: null, // clear in-progress state
            attempts,
            bestScore,
            latestScore: attempt.score,
            passed
          }
        }
      }
    };
  });
}

/**
 * Starts or restarts final assessment with 40-minute duration
 */
export function startFinalAssessment(): void {
  const startedAt = Date.now();
  const endsAt = startedAt + 40 * 60 * 1000; // 40 minutes

  updateActiveUser((user) => {
    return {
      ...user,
      lastView: 'final-assessment',
      finalAssessment: {
        ...user.finalAssessment,
        status: 'in_progress',
        currentQuestionIndex: 0,
        answers: {},
        startedAt,
        endsAt
      }
    };
  });
}

/**
 * Autosaves final assessment answer and current question index immediately
 */
export function saveFinalAssessmentAnswer(
  questionId: string,
  answerIndex: number,
  currentQuestionIndex: number
): void {
  updateActiveUser((user) => {
    return {
      ...user,
      finalAssessment: {
        ...user.finalAssessment,
        currentQuestionIndex,
        answers: {
          ...user.finalAssessment.answers,
          [questionId]: answerIndex
        }
      }
    };
  });
}

/**
 * Updates final assessment current active question index without changing answers
 */
export function saveFinalAssessmentCurrentQuestion(index: number): void {
  updateActiveUser((user) => {
    return {
      ...user,
      finalAssessment: {
        ...user.finalAssessment,
        currentQuestionIndex: index
      }
    };
  });
}

/**
 * Submits final assessment attempt and updates scores
 */
export function submitFinalAssessment(
  attempt: FinalAssessmentAttempt
): UserTrainingRecord | null {
  return updateActiveUser((user) => {
    const attempts = [...user.finalAssessment.attempts, attempt];
    const bestScore = user.finalAssessment.bestScore !== null
      ? Math.max(user.finalAssessment.bestScore, attempt.totalScore)
      : attempt.totalScore;
    const passed = user.finalAssessment.passed || attempt.passed;

    return {
      ...user,
      finalAssessment: {
        ...user.finalAssessment,
        status: 'completed',
        attempts,
        latestScore: attempt.totalScore,
        bestScore,
        passed,
        startedAt: null,
        endsAt: null
      }
    };
  });
}

/**
 * Saves generated final assessment report
 */
export function saveFinalReport(reportData: FinalReportData): UserTrainingRecord | null {
  return updateActiveUser((user) => {
    return {
      ...user,
      report: {
        generated: true,
        data: reportData
      }
    };
  });
}

/**
 * Developer / testing only reset function
 */
export function clearAllTrainingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
}
