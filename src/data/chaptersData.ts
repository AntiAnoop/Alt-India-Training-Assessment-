import { ChapterInfo } from '../types/index.ts';

/**
 * Canonical Curriculum Configuration
 * Exactly 9 modules: 7 Theory Modules (with assessments) followed by 2 Kannada Roleplays (no assessments).
 *
 * To update video URLs for any chapter, edit the `videoUrl` field below with any Google Drive link.
 */
export const CHAPTERS_DATA: ChapterInfo[] = [
  {
    id: 1,
    number: '01',
    title: 'Introduction to Counselling',
    subtitle: 'Foundations of Sales Counselling & Career Understanding',
    description:
      'Introduction to education sales counselling: why sales is rewarding, understanding education counselling vs. ordinary product sales, diagnosing the learner’s situation and aspirations before recommending courses, and mastering cold calling, lead calling, regional-language rapport, and urgency.',
    keyPoints: [
      'Education counselling vs. ordinary product sales: diagnose before recommending',
      'Understanding the learner’s situation, career aspirations, profile, and goals',
      'Scope: cold calling, lead calling, lead management, WhatsApp follow-up, regional rapport',
      'Ethical consulting and positioning recommendations to career outcomes'
    ],
    videoUrl: 'https://drive.google.com/file/d/1mZY1oSPEU8hu66YV_y6DFtih_jjU7v6U/view?usp=drive_link',
    duration: '18 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5,
    type: 'theory',
    primaryRecording: 'intro couneslloing.mp3',
    assessmentId: 'assessment-module-1'
  },
  {
    id: 2,
    number: '02',
    title: 'Introduction to Education Counselling',
    subtitle: 'Lead Sources, ICP Evaluation & Pipeline Fundamentals',
    description:
      'Understanding education leads and evaluating qualification. Explore lead generation sources (data analyst teams, marketing campaigns), fresh leads, organic high-intent leads, churned/re-churned leads, and assessing suitability across age, background, employment status, income, and language.',
    keyPoints: [
      'What a lead is and key sources: lead/data analyst team and marketing team',
      'Fresh leads vs. organic high-intent leads vs. churned/re-churned leads',
      'Evaluating the Ideal Customer Profile (ICP): age, education, work status, income, language',
      'Assessing lead quality and tailoring outreach accordingly'
    ],
    videoUrl: 'https://drive.google.com/file/d/1ap9yVvFKrHmrluH_sZ9yrDfUj3kI1cxm/view?usp=drive_link',
    duration: '22 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5,
    type: 'theory',
    primaryRecording: 'Intro Education Counesllor.mp3',
    assessmentId: 'assessment-module-2'
  },
  {
    id: 3,
    number: '03',
    title: 'Channels of Connectivity',
    subtitle: 'Omnichannel Reach: Call, WhatsApp & Email Protocols',
    description:
      'Master professional outreach hygiene across Phone, WhatsApp, and Email. Learn Truecaller hygiene, professional WhatsApp Business setup, company/university email identity, avoiding context-free greetings, and introducing yourself with clear reasons for contact.',
    keyPoints: [
      'Core channels: Phone Call, WhatsApp, and Professional Email',
      'Caller identity hygiene: Truecaller name, company/university identity, professional photo',
      'WhatsApp Business: separating work and personal, professional profile status and photo',
      'First outreach protocol: clear introduction, context/reason for contact, polite callback request'
    ],
    videoUrl: 'https://drive.google.com/file/d/1vdZDRjYRHhT2dVnzCt_h2Y4XnqN-gaUR/view?usp=drive_link',
    duration: '20 mins',
    assessmentQuestionCount: 6,
    passingPercentage: 70,
    timeLimitMinutes: 6,
    type: 'theory',
    primaryRecording: 'Channel.mp3',
    supportingRecording: 'Sakshi Channelshp3.mp3',
    assessmentId: 'assessment-module-3'
  },
  {
    id: 4,
    number: '04',
    title: 'Content',
    subtitle: 'The 60/40 Call Balance, Profiling & Product Alignment',
    description:
      'Structuring the counselling conversation. Maintain the 60% learner / 40% counsellor balance, check availability, profile city, language, and background, repeat the profile back to confirm understanding, connect product features to aspirations, and agree on next reconnection steps.',
    keyPoints: [
      'Conversation balance: learner drives ~60%, counsellor drives ~40%',
      'Opening hygiene: check if it is a good time to talk, ask for 5 minutes',
      'Comprehensive profiling: city, language, working/studying, income band, age',
      'Active rapport: repeat profile back, connect product to aspirations, transition to WhatsApp/email'
    ],
    videoUrl: 'https://drive.google.com/file/d/16mO5FmR6VgW5hhnemFy7eeahPcSMqQi0/view?usp=drive_link',
    duration: '26 mins',
    assessmentQuestionCount: 7,
    passingPercentage: 70,
    timeLimitMinutes: 7,
    type: 'theory',
    primaryRecording: 'contetn chapter4.mp3',
    assessmentId: 'assessment-module-4'
  },
  {
    id: 5,
    number: '05',
    title: 'Objection Handling',
    subtitle: 'Resolving Price, Competition, Time & Family Doubts',
    description:
      'Handling student objections with calmness, patience, and confidence. Address fee resistance by connecting career ROI, structure ethical competitor USP comparisons, uncover root hesitation behind "need time to think", and involve family decision-makers via Google Meet/Zoom.',
    keyPoints: [
      'Core mindset: stay calm, patient, composed, confident, and know the product',
      'Fees objection: diagnose affordability, highlight brand, specialization, placements, and networking',
      'Competitor objection: structured USP comparison without unsupported disparagement',
      'Hesitation & family: uncover true blocker, offer Google Meet/Zoom with family decision-makers'
    ],
    videoUrl: 'https://drive.google.com/file/d/10aSzLbbBhAdCnviwkINuEAfstmPQAaqU/view?usp=drive_link',
    duration: '28 mins',
    assessmentQuestionCount: 7,
    passingPercentage: 70,
    timeLimitMinutes: 7,
    type: 'theory',
    primaryRecording: 'objection_chapter 5.mp4',
    assessmentId: 'assessment-module-5'
  },
  {
    id: 6,
    number: '06',
    title: 'Follow-Up',
    subtitle: 'Connected Leads Cadence, RNR Discipline & Smart Tools',
    description:
      'Systematic follow-up systems for connected and RNR prospects. Shift connected leads to WhatsApp Business, manage Ringing-No-Response (3 calls/day across morning, afternoon, evening for 3 days followed by WhatsApp), avoid back-to-back spamming, and leverage AI tools for professional drafting.',
    keyPoints: [
      'Connected leads: 5–15 min two-way call, transition to WhatsApp Business, set specific reconnect times',
      'RNR protocol: 3 calls/day (morning, afternoon, evening) across Day 1, 2, and 3 + WhatsApp',
      'Calling hygiene: never call back-to-back, avoid friend-like abbreviations or overly casual language',
      'Using AI (ChatGPT/Gemini) to refine polished English and regional follow-up text'
    ],
    videoUrl: 'https://drive.google.com/file/d/1zZVt0FOkhXGET3D5DCThglFlTC7_W-DQ/view?usp=sharing',
    duration: '24 mins',
    assessmentQuestionCount: 7,
    passingPercentage: 70,
    timeLimitMinutes: 7,
    type: 'theory',
    primaryRecording: 'followupfinalch.mp3',
    supportingRecording: 'follow_up_chaprer7.mp3',
    assessmentId: 'assessment-module-6'
  },
  {
    id: 7,
    number: '07',
    title: 'Closure',
    subtitle: 'Aspiration Reconnection, Actionable Steps & Ethical Urgency',
    description:
      'Executing closure: reconnect the student to their stated career aspiration (CTC jump, leadership, career switch), discuss rapid industry change and AI upskilling necessity, create urgency based on genuine product/admission deadlines, and guide them to simple actionable steps like registration fee or seat blocking.',
    keyPoints: [
      'Closure is not a new sales pitch: remind the learner of their own stated career aspirations',
      'Discuss changing industry and AI: consequences of remaining stagnant vs. upskilling',
      'Guide toward the simplest actionable step: registration fee or seat blocking',
      'Authentic urgency: tie deadlines to actual admission cohorts, batch start dates, and seat caps'
    ],
    videoUrl: 'https://drive.google.com/file/d/1mYlz0ZhSW3IFAz8owvnCxmMH-64s5iA-/view?usp=drive_link',
    duration: '25 mins',
    assessmentQuestionCount: 7,
    passingPercentage: 70,
    timeLimitMinutes: 7,
    type: 'theory',
    primaryRecording: 'closuresfinalchp7.mp3',
    assessmentId: 'assessment-module-7'
  },
  {
    id: 8,
    number: '08',
    title: 'Roleplay Kannada - Discovery',
    subtitle: 'Kannada Roleplay Demonstration · No Assessment',
    description:
      'Practical demonstration of a complete discovery call conducted in Kannada. Observe natural call opening, establishing call purpose, university awareness, educational qualification profiling (CGPA, degree, work experience), and uncovering learner motivations for Masters education.',
    keyPoints: [
      'Opening introduction and establishing clear reason for call',
      'Probing highest education, CGPA, work domain, and years of experience',
      'Understanding interest in Masters and current compensation benchmarks',
      'Kannada roleplay observation session — no assessment required'
    ],
    videoUrl: 'https://drive.google.com/file/d/1NY9zY8Oqv-WExekgJCtDo_6v4YWFH0x5/view?usp=drive_link',
    duration: '18 mins',
    assessmentQuestionCount: 0,
    passingPercentage: 0,
    timeLimitMinutes: 0,
    type: 'roleplay',
    primaryRecording: 'ddiscoverychp1kananada.mp3',
    assessmentId: null
  },
  {
    id: 9,
    number: '09',
    title: 'Roleplay Kannada - Closure',
    subtitle: 'Kannada Roleplay Demonstration · No Assessment',
    description:
      'Practical demonstration of a closure call conducted in Kannada. Observe managing hesitation when a learner says they need time or are switching jobs, addressing salary aspirations, offering parent involvement via Google Meet, creating timeline urgency, and securing registration seat blocking.',
    keyPoints: [
      'Handling learner hesitation around work commitments and job switches',
      'Connecting Masters education directly to salary growth and career trajectory',
      'Involving family through Google Meet and securing concrete callback commitments',
      'Kannada roleplay observation session — no assessment required'
    ],
    videoUrl: 'https://drive.google.com/file/d/1iE7yr6KgJQcP9-KXnVP93_e_m2tRluZw/view?usp=drive_link',
    duration: '30 mins',
    assessmentQuestionCount: 0,
    passingPercentage: 0,
    timeLimitMinutes: 0,
    type: 'roleplay',
    primaryRecording: 'cloasurefinalchp3.mp3',
    assessmentId: null
  }
];
