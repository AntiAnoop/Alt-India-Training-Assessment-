import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateChapterScore,
  calculateFinalScore,
  formatSeconds,
  sanitizeReportFilename
} from './scoring.ts';
import { Question } from '../types/index.ts';

test('calculateChapterScore computes accurate score and pass status at 70% threshold', () => {
  const mockQuestions: Question[] = [
    { id: 'q1', question: 'Q1', options: ['A', 'B'], correctAnswer: 0, explanation: '' },
    { id: 'q2', question: 'Q2', options: ['A', 'B'], correctAnswer: 1, explanation: '' },
    { id: 'q3', question: 'Q3', options: ['A', 'B'], correctAnswer: 0, explanation: '' },
    { id: 'q4', question: 'Q4', options: ['A', 'B'], correctAnswer: 1, explanation: '' },
    { id: 'q5', question: 'Q5', options: ['A', 'B'], correctAnswer: 0, explanation: '' }
  ];

  // 4 out of 5 = 80% -> Passed
  const passResult = calculateChapterScore({ q1: 0, q2: 1, q3: 0, q4: 1, q5: 1 }, mockQuestions);
  assert.equal(passResult.score, 4);
  assert.equal(passResult.totalQuestions, 5);
  assert.equal(passResult.percentage, 80);
  assert.equal(passResult.passed, true);

  // 3 out of 5 = 60% -> Failed
  const failResult = calculateChapterScore({ q1: 0, q2: 1, q3: 0, q4: 0, q5: 1 }, mockQuestions);
  assert.equal(failResult.score, 3);
  assert.equal(failResult.percentage, 60);
  assert.equal(failResult.passed, false);
});

test('calculateFinalScore accurately calculates score out of 30 and 75% pass threshold', () => {
  const mockQuestions: Question[] = Array.from({ length: 30 }, (_, i) => ({
    id: `final-f${i + 1}`,
    question: `F${i + 1}`,
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: ''
  }));

  // 23 / 30 = 77% -> Passed
  const answersPass: Record<string, number> = {};
  for (let i = 0; i < 23; i++) {
    answersPass[`final-f${i + 1}`] = 0;
  }
  const passResult = calculateFinalScore(answersPass, mockQuestions);
  assert.equal(passResult.totalScore, 23);
  assert.equal(passResult.maximumScore, 30);
  assert.equal(passResult.percentage, 77);
  assert.equal(passResult.passed, true);

  // 22 / 30 = 73% -> Failed
  const answersFail: Record<string, number> = {};
  for (let i = 0; i < 22; i++) {
    answersFail[`final-f${i + 1}`] = 0;
  }
  const failResult = calculateFinalScore(answersFail, mockQuestions);
  assert.equal(failResult.totalScore, 22);
  assert.equal(failResult.percentage, 73);
  assert.equal(failResult.passed, false);
});

test('formatSeconds properly pads minutes and seconds', () => {
  assert.equal(formatSeconds(0), '00:00');
  assert.equal(formatSeconds(65), '01:05');
  assert.equal(formatSeconds(2400), '40:00');
});

test('sanitizeReportFilename creates safe valid filename with user name', () => {
  assert.equal(
    sanitizeReportFilename('Aarav Sharma'),
    'Aarav_Sharma_Alt_India_Sales_Counselling_Assessment_Report.pdf'
  );
  assert.equal(
    sanitizeReportFilename('John & Doe / 123!'),
    'John_Doe_123_Alt_India_Sales_Counselling_Assessment_Report.pdf'
  );
});
