import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS_DATA } from './chaptersData.ts';
import { CHAPTER_QUESTIONS, FINAL_ASSESSMENT_QUESTIONS } from './questionsData.ts';

test('Curriculum has exactly 9 modules in exact sequence', () => {
  assert.equal(CHAPTERS_DATA.length, 9, 'Must have exactly 9 modules');

  const expectedTitles = [
    'Introduction to Counselling',
    'Introduction to Education Counselling',
    'Channels of Connectivity',
    'Content',
    'Objection Handling',
    'Follow-Up',
    'Closure',
    'Roleplay Kannada - Discovery',
    'Roleplay Kannada - Closure'
  ];

  CHAPTERS_DATA.forEach((ch, idx) => {
    assert.equal(ch.id, idx + 1);
    assert.equal(ch.title, expectedTitles[idx]);
  });

  // Verify theory vs roleplay types
  for (let i = 0; i < 7; i++) {
    assert.equal(CHAPTERS_DATA[i].type, 'theory');
  }
  assert.equal(CHAPTERS_DATA[7].type, 'roleplay');
  assert.equal(CHAPTERS_DATA[8].type, 'roleplay');
});

test('Module assessments question counts match specifications (44 total across 7 theory modules)', () => {
  assert.equal(CHAPTER_QUESTIONS[1].length, 5, 'Module 1 must have 5 questions');
  assert.equal(CHAPTER_QUESTIONS[2].length, 5, 'Module 2 must have 5 questions');
  assert.equal(CHAPTER_QUESTIONS[3].length, 6, 'Module 3 must have 6 questions');
  assert.equal(CHAPTER_QUESTIONS[4].length, 7, 'Module 4 must have 7 questions');
  assert.equal(CHAPTER_QUESTIONS[5].length, 7, 'Module 5 must have 7 questions');
  assert.equal(CHAPTER_QUESTIONS[6].length, 7, 'Module 6 must have 7 questions');
  assert.equal(CHAPTER_QUESTIONS[7].length, 7, 'Module 7 must have 7 questions');

  // Roleplays must have zero questions
  assert.equal(CHAPTER_QUESTIONS[8], undefined, 'Module 8 must have 0 questions');
  assert.equal(CHAPTER_QUESTIONS[9], undefined, 'Module 9 must have 0 questions');

  const totalQuestions = [1, 2, 3, 4, 5, 6, 7].reduce(
    (sum, id) => sum + (CHAPTER_QUESTIONS[id]?.length || 0),
    0
  );
  assert.equal(totalQuestions, 44, 'Total module-assessment question count must be 44');
});

test('Final Assessment has exactly 30 questions drawn strictly from Modules 1 to 7', () => {
  assert.equal(FINAL_ASSESSMENT_QUESTIONS.length, 30, 'Final Assessment must have exactly 30 questions');

  // Verify all 30 questions have exactly 4 options and a valid correctAnswer index (0-3)
  FINAL_ASSESSMENT_QUESTIONS.forEach((q, idx) => {
    assert.equal(q.options.length, 4, `Question ${idx + 1} must have 4 options`);
    assert.ok(q.correctAnswer >= 0 && q.correctAnswer < 4, `Question ${idx + 1} must have valid correctAnswer`);
    assert.ok(q.question.length > 10, `Question ${idx + 1} question text must not be empty`);
    assert.ok(q.explanation.length > 5, `Question ${idx + 1} explanation must not be empty`);

    // Verify no roleplay questions exist
    const textLower = (q.question + ' ' + q.options.join(' ')).toLowerCase();
    assert.ok(!textLower.includes('swathi'), 'Must not mention roleplay characters');
    assert.ok(!textLower.includes('navya'), 'Must not mention roleplay characters');
    assert.ok(!textLower.includes('kannada discovery call'), 'Must not test roleplays');
    assert.ok(!textLower.includes('kannada closure roleplay'), 'Must not test roleplays');
  });
});
