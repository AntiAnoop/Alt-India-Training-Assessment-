import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateChapterScore, calculateFinalScore, formatSeconds, sanitizeReportFilename } from './scoring.ts';
import { Question } from '../types/index.ts';

test('calculateChapterScore computes accurate score and pass status at 70% threshold', () => {
  const dummyQuestions: Question[] = [
    { id: 'q1', question: 'A?', options: ['1', '2'], correctAnswer: 0, explanation: '' },
    { id: 'q2', question: 'B?', options: ['1', '2'], correctAnswer: 1, explanation: '' },
    { id: 'q3', question: 'C?', options: ['1', '2'], correctAnswer: 0, explanation: '' },
    { id: 'q4', question: 'D?', options: ['1', '2'], correctAnswer: 1, explanation: '' },
    { id: 'q5', question: 'E?', options: ['1', '2'], correctAnswer: 1, explanation: '' }
  ];

  // 4 out of 5 = 80% (Pass >= 70%)
  const passedAnswers = { q1: 0, q2: 1, q3: 0, q4: 1, q5: 0 };
  const res1 = calculateChapterScore(passedAnswers, dummyQuestions, 70);
  assert.equal(res1.score, 4);
  assert.equal(res1.percentage, 80);
  assert.equal(res1.passed, true);

  // 3 out of 5 = 60% (Fail < 70%)
  const failedAnswers = { q1: 0, q2: 1, q3: 0, q4: 0, q5: 0 };
  const res2 = calculateChapterScore(failedAnswers, dummyQuestions, 70);
  assert.equal(res2.score, 3);
  assert.equal(res2.percentage, 60);
  assert.equal(res2.passed, false);
});

test('calculateFinalScore accurately accumulates marks across all three sections', () => {
  const mockFinalQuestions: Question[] = [
    // 2 Core questions (2 marks each)
    { id: 'fq1', section: 'coreKnowledge', marks: 2, question: 'A?', options: ['1', '2'], correctAnswer: 1, explanation: '' },
    { id: 'fq2', section: 'coreKnowledge', marks: 2, question: 'B?', options: ['1', '2'], correctAnswer: 0, explanation: '' },
    // 1 Scenario question (6 marks)
    { id: 'fq3', section: 'scenarioBased', marks: 6, question: 'C?', options: ['1', '2'], correctAnswer: 0, explanation: '' },
    // 1 Practical question (6 marks)
    { id: 'fq4', section: 'practical', marks: 6, question: 'D?', options: ['1', '2'], correctAnswer: 1, explanation: '' }
  ];

  // Answer fq1 (2), fq3 (6), fq4 (6) correctly -> total 14
  const answers = { fq1: 1, fq2: 1, fq3: 0, fq4: 1 };
  const result = calculateFinalScore(answers, mockFinalQuestions);

  assert.equal(result.sectionScores.coreKnowledge, 2);
  assert.equal(result.sectionScores.scenarioBased, 6);
  assert.equal(result.sectionScores.practical, 6);
  assert.equal(result.totalScore, 14);
});

test('formatSeconds properly pads minutes and seconds', () => {
  assert.equal(formatSeconds(300), '05:00');
  assert.equal(formatSeconds(282), '04:42');
  assert.equal(formatSeconds(9), '00:09');
  assert.equal(formatSeconds(0), '00:00');
  assert.equal(formatSeconds(-10), '00:00');
});

test('sanitizeReportFilename creates safe valid filename with user name', () => {
  assert.equal(
    sanitizeReportFilename('Rahul Sharma'),
    'Rahul_Sharma_Alt_India_Sales_Counselling_Assessment_Report.pdf'
  );
  assert.equal(
    sanitizeReportFilename('Sakshi  Agarwal/'),
    'Sakshi_Agarwal_Alt_India_Sales_Counselling_Assessment_Report.pdf'
  );
  assert.equal(
    sanitizeReportFilename(''),
    'Candidate_Alt_India_Sales_Counselling_Assessment_Report.pdf'
  );
});
