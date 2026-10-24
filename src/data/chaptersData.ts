import { ChapterInfo } from '../types/index.ts';

/**
 * Chapters Configuration
 * To update video URLs for any chapter, edit the `videoUrl` field below.
 * Supports Google Drive embed URLs (e.g., https://drive.google.com/file/d/.../preview),
 * direct video links, or standard web video streams.
 */
export const CHAPTERS_DATA: ChapterInfo[] = [
  {
    id: 1,
    number: '01',
    title: 'Introduction to Education Sales Counselling',
    subtitle: 'The Role, Mindset, and Ethics of an Education Counsellor',
    description:
      'Learn the foundational role of education counselling: bridging learner ambitions with practical learning pathways, understanding ethical consulting, establishing credibility, and the difference between consultative counselling and transactional sales.',
    keyPoints: [
      'The consultative sales mindset vs. pushy transactional selling',
      'Building early rapport, empathy, and professional authority',
      'The counsellor’s ethical responsibility to the student’s career',
      'Key performance indicators for education counselling'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH01/preview',
    duration: '18 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 2,
    number: '02',
    title: 'Understanding Leads & Education Counselling',
    subtitle: 'Lead Sources, Intent Levels, and Response Timelines',
    description:
      'Master the lifecycle of student leads. Distinguish inbound organic leads, social ads leads, webinar attendees, and referral leads, categorizing them by buyer intent and response urgency.',
    keyPoints: [
      'Anatomy of an education lead: intent, budget, timeline, and urgency',
      'Warm vs. cold inbound leads and response speed importance',
      'Analysing lead capture forms and previous interaction history',
      'Target personas: fresh graduates, working professionals, career switchers'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH02/preview',
    duration: '22 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 3,
    number: '03',
    title: 'Channels for Connectivity',
    subtitle: 'Omnichannel Reach: Phone, WhatsApp, Email & SMS',
    description:
      'Optimize multi-channel outreach to maximize connection rates. Understand call timing strategies, compliant messaging protocols, and when to switch from voice to text channels.',
    keyPoints: [
      'Best practices for primary voice calling and call windows',
      'WhatsApp outreach protocol: concise, conversational, and value-first',
      'Email follow-up structure: subject lines, curriculum highlights, and CTAs',
      'Cross-channel persistence without spamming'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH03/preview',
    duration: '20 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 4,
    number: '04',
    title: 'Discovery & Learner Profiling',
    subtitle: 'Uncovering Career Goals, Skill Gaps, and Financial Readliness',
    description:
      'Conduct powerful discovery sessions. Ask high-yield diagnostic questions to uncover the learner’s true pain points, motivations, current limitations, and decision criteria.',
    keyPoints: [
      'The 4 Pillars of Profiling: Background, Career Aspiration, Obstacles, Readiness',
      'Open-ended probing techniques that get learners opening up',
      'Identifying decision-makers (self-sponsored vs. parent/sponsor funded)',
      'Documenting discovery notes accurately in the CRM'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH04/preview',
    duration: '26 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 5,
    number: '05',
    title: 'Counselling Content & First Conversation',
    subtitle: 'Structuring the Winning First Pitch & Program Walkthrough',
    description:
      'Craft a compelling first counselling call. Transition smoothly from discovery to presenting course curriculum, mentor pedigree, placement assistance, and ROI.',
    keyPoints: [
      'Structuring the 20-minute first conversation',
      'Feature-Benefit-Outcome mapping tailored to discovery insights',
      'Highlighting alumni placement outcomes, projects, and certifications',
      'Setting clear mutual next steps before hanging up'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH05/preview',
    duration: '24 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 6,
    number: '06',
    title: 'Objection Handling',
    subtitle: 'Resolving Price, Time, Competitor, and Trust Concerns',
    description:
      'Turn hesitation into clarity. Learn proven frameworks (Empathize, Clarify, Isolate, Reframe) to address common student objections regarding course fees, time commitments, and self-doubt.',
    keyPoints: [
      'The "Fees are too high" objection: EMI restructuring & ROI reframing',
      'The "I don’t have enough time" objection: flexible schedules & time audits',
      'The "Let me think about it" objection: isolating hidden doubts',
      'Handling competitor comparisons professionally without badmouthing'
    ],
    videoUrl: 'https://drive.google.com/file/d/1RSjfEVPjYmtb7NPMKRHC7txL5VCG9vFu/view?usp=drive_link',
    duration: '28 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 7,
    number: '07',
    title: 'Follow-Up — Connected Leads',
    subtitle: 'Nurturing Warm Prospects to Decision Deadlines',
    description:
      'Develop structured follow-up cadences for candidates who answered your call. Keep value high through micro-content, guest masterclasses, and targeted alumni case studies.',
    keyPoints: [
      'The 24-48-72 hour follow-up cadence for connected leads',
      'Value-add touchpoints vs. dry "Just checking in" calls',
      'Sharing relevant success stories matching the learner’s exact background',
      'Recognizing buying signals during follow-up calls'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH07/preview',
    duration: '21 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 8,
    number: '08',
    title: 'Follow-Up — RNR, WhatsApp, Email & AI',
    subtitle: 'Re-engaging Ringing-No-Response Leads with Smart Tools',
    description:
      'Systematic strategies for Ringing-No-Response (RNR) leads. Leverage AI drafting tools, WhatsApp automation, time-zone mapping, and re-engagement campaigns.',
    keyPoints: [
      'RNR calling schedule: optimal time slot diversification',
      'WhatsApp hook messages that get 3x higher reply rates',
      'Using AI tools to quickly personalize follow-up emails and summaries',
      'When to archive a non-responsive lead to preserve pipeline health'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH08/preview',
    duration: '23 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 9,
    number: '09',
    title: 'Closing the Sale & Creating Urgency',
    subtitle: 'Batch Deadlines, Scholarship Quotas, and Commitment Steps',
    description:
      'Master the transition from counselling to financial commitment. Learn ethical urgency drivers, scholarship expiry, seat caps, and secure downpayment collection.',
    keyPoints: [
      'Creating authentic urgency (batch start dates, seat allocations)',
      'The trial close vs. definitive commitment close',
      'Spot scholarship discounts and time-bound tuition waivers',
      'Guiding candidates through instant online registration and seat booking'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH09/preview',
    duration: '25 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 10,
    number: '10',
    title: 'Closure Roleplay',
    subtitle: 'Simulated Calls, Critical Scenarios & Real-Time Corrections',
    description:
      'Listen to and analyze real counselling calls. Deconstruct successful closures and identify critical inflection points where counsellor responses made or broke the enrollment.',
    keyPoints: [
      'Full audio roleplay analysis: opening, discovery, pitch, and close',
      'Identifying verbal hesitations and subtle tone shifts in learners',
      'Spotting self-sabotaging counsellor mistakes (talking over the student)',
      'Actionable roleplay scorecard and peer feedback framework'
    ],
    videoUrl: 'https://drive.google.com/file/d/1HfxiEsc113pu2N6mu_Py2zEfbB2a5N2s/view?usp=drive_link',
    duration: '30 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  },
  {
    id: 11,
    number: '11',
    title: 'Final Counselling & Closure Mindset',
    subtitle: 'Resilience, Daily Discipline, Target Achievement & Career Growth',
    description:
      'Sustain high performance as an education counsellor. Build emotional resilience against rejections, organize daily calling sprints, and cultivate a genuine career mentor mindset.',
    keyPoints: [
      'Mental resilience and reframing "no" in education sales',
      'Daily time-blocking: calling sprints, follow-ups, and CRM hygiene',
      'Pipeline mathematics: conversion ratios and achieving monthly targets',
      'The long-term career trajectory of elite education sales leaders'
    ],
    videoUrl: 'https://drive.google.com/file/d/REPLACE_WITH_DRIVE_URL_CH11/preview',
    duration: '20 mins',
    assessmentQuestionCount: 5,
    passingPercentage: 70,
    timeLimitMinutes: 5
  }
];
