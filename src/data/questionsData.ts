import { Question } from '../types/index.ts';

/**
 * Question Bank for Individual Theory Module Assessments (Modules 1 to 7)
 * Strictly 7 Theory Modules (Modules 8 & 9 are Roleplays with ZERO assessments).
 *
 * Question Counts:
 * - Module 1: 5 Questions
 * - Module 2: 5 Questions
 * - Module 3: 6 Questions
 * - Module 4: 7 Questions
 * - Module 5: 7 Questions
 * - Module 6: 7 Questions
 * - Module 7: 7 Questions
 * Total Module Assessment Questions: 44
 * Passing Threshold: 70%
 */
export const CHAPTER_QUESTIONS: Record<number, Question[]> = {
  // Module 1: Introduction to Counselling (5 Questions)
  1: [
    {
      id: 'mod1-q1',
      question: 'What is the key difference between ordinary product sales and education counselling?',
      options: [
        'Education counselling first understands the learner’s current situation, aspirations, profile, goals, education and interests before recommending a suitable course.',
        'Ordinary product sales requires more CRM documentation than education counselling.',
        'Education counselling focuses solely on closing transactions on the first cold call without diagnosis.',
        'There is no distinction; education products are pitched identically to physical consumer goods.'
      ],
      correctAnswer: 0,
      explanation: 'Education counselling first understands the learner’s current situation, aspirations, profile, goals, education and interests before recommending a suitable course.'
    },
    {
      id: 'mod1-q2',
      question: 'Which approach best represents education counselling?',
      options: [
        'Offer immediate fee waivers without asking about career aspirations.',
        'Understand the learner first and then connect the relevant educational product to their goals.',
        'Deliver an identical script pitch to every prospective applicant regardless of background.',
        'Focus exclusively on meeting daily call quotas without evaluating course relevance.'
      ],
      correctAnswer: 1,
      explanation: 'Understand the learner first and then connect the relevant educational product to their goals.'
    },
    {
      id: 'mod1-q3',
      question: 'Which of the following is part of the training’s education sales counselling scope?',
      options: [
        'Setting course examination papers and managing campus laboratory equipment.',
        'Cold calling, lead calling, lead management, WhatsApp follow-up, regional-language rapport and closing.',
        'Drafting legal university contracts and software code for LMS servers.',
        'Managing social media ad budgets and buying server hardware.'
      ],
      correctAnswer: 1,
      explanation: 'The scope covers cold calling, lead calling, lead management, WhatsApp follow-up, regional-language rapport and closing with urgency.'
    },
    {
      id: 'mod1-q4',
      question: 'Why should a counsellor understand the learner’s aspirations before recommending a course?',
      options: [
        'To verify whether the student qualifies for international travel visas immediately.',
        'So the recommendation can be connected to the learner’s actual career goals and situation.',
        'To report personal details to government regulatory boards before the call ends.',
        'To prevent the student from asking questions about course schedules.'
      ],
      correctAnswer: 1,
      explanation: 'So the recommendation can be connected to the learner’s actual career goals and situation.'
    },
    {
      id: 'mod1-q5',
      question: 'Which mindset best represents the role of an education counsellor?',
      options: [
        'Understand the learner’s needs and guide them toward a relevant educational opportunity.',
        'Push for immediate downpayments regardless of candidate academic eligibility.',
        'Discourage prospective applicants from pursuing higher education credentials.',
        'Automate all interactions with generic marketing emails and avoid phone calls.'
      ],
      correctAnswer: 0,
      explanation: 'Understand the learner’s needs and guide them toward a relevant educational opportunity.'
    }
  ],

  // Module 2: Introduction to Education Counselling (5 Questions)
  2: [
    {
      id: 'mod2-q1',
      question: 'What is a lead?',
      options: [
        'An enrolled student who has completed all degree examinations.',
        'A prospective learner/contact who can potentially be engaged for counselling and conversion.',
        'An internal employee working in the institution’s finance department.',
        'A competitor educational institution offering similar programs.'
      ],
      correctAnswer: 1,
      explanation: 'A lead is a prospective learner/contact who can potentially be engaged for counselling and conversion.'
    },
    {
      id: 'mod2-q2',
      question: 'Which teams are identified as major sources of leads?',
      options: [
        'Legal compliance and security guard teams.',
        'Lead/data analyst team and marketing team.',
        'Printing press and campus maintenance vendors.',
        'Academic grading and library administration teams.'
      ],
      correctAnswer: 1,
      explanation: 'Lead/data analyst team and marketing team are identified as the primary sources of leads.'
    },
    {
      id: 'mod2-q3',
      question: 'What are churned or re-churned leads?',
      options: [
        'Older enquiries that were not previously followed up or closed and may be re-engaged.',
        'Students who have formally graduated with first-class honors.',
        'Inactive phone numbers permanently disconnected by telecom operators.',
        'External recruiters hiring graduates from university campuses.'
      ],
      correctAnswer: 0,
      explanation: 'Churned or re-churned leads are older enquiries that were not previously followed up or closed and may be re-engaged.'
    },
    {
      id: 'mod2-q4',
      question: 'Which combination is useful when evaluating whether a lead fits the ideal customer profile?',
      options: [
        'Favorite sports team, personal social media follower count, and vehicle model.',
        'Age, educational/background profile, working/studying status, income/affordability and language/rapport.',
        'Typing speed, smartphone battery capacity, and desktop wallpaper preference.',
        'Credit card reward point balance and internet browser version only.'
      ],
      correctAnswer: 1,
      explanation: 'Evaluating age, educational/background profile, working/studying status, income/affordability and language/rapport determines ICP fit.'
    },
    {
      id: 'mod2-q5',
      question: 'Why can marketing-generated organic/high-intent leads be valuable?',
      options: [
        'They are legally guaranteed to pay full tuition fees without any phone calls.',
        'They do not require any verification of academic prerequisites.',
        'They may already demonstrate stronger intent because they have actively discovered the offering.',
        'They never seek clarification regarding curriculum or faculty credentials.'
      ],
      correctAnswer: 2,
      explanation: 'They may already demonstrate stronger intent because they have actively discovered the offering.'
    }
  ],

  // Module 3: Channels of Connectivity (6 Questions)
  3: [
    {
      id: 'mod3-q1',
      question: 'What are the main connectivity channels taught in this module?',
      options: [
        'Physical postal mail, telegraph, and fax machines.',
        'Call, WhatsApp and email.',
        'Billboard ads, newspaper inserts, and radio broadcasts.',
        'In-person door-to-door visits and corporate flyer distribution.'
      ],
      correctAnswer: 1,
      explanation: 'The main connectivity channels taught in this module are Call, WhatsApp and email.'
    },
    {
      id: 'mod3-q2',
      question: 'What is good phone-call hygiene?',
      options: [
        'Calling from an anonymous hidden number without stating your identity.',
        'Maintain a professional caller identity, including appropriate name/university/company information and profile presentation where applicable.',
        'Speaking in casual street slang to seem informal and friendly.',
        'Hanging up if the prospect does not answer within three seconds.'
      ],
      correctAnswer: 1,
      explanation: 'Maintain a professional caller identity, including appropriate name/university/company information and profile presentation where applicable.'
    },
    {
      id: 'mod3-q3',
      question: 'Why is WhatsApp Business recommended?',
      options: [
        'It creates a more professional separation between work communication and personal communication.',
        'It automatically charges the student’s credit card without their consent.',
        'It bypasses all telecommunication regulations and privacy laws.',
        'It prevents learners from sending questions about course pricing.'
      ],
      correctAnswer: 0,
      explanation: 'It creates a more professional separation between work communication and personal communication.'
    },
    {
      id: 'mod3-q4',
      question: 'Which email approach is preferred?',
      options: [
        'Using a personal anonymous webmail address with nicknames.',
        'Use an appropriate professional/company/university email identity rather than an unrelated personal email when possible.',
        'Sending all emails in ALL-CAPS font with excessive exclamation marks.',
        'Never adding a subject line or email signature.'
      ],
      correctAnswer: 1,
      explanation: 'Use an appropriate professional/company/university email identity rather than an unrelated personal email when possible.'
    },
    {
      id: 'mod3-q5',
      question: 'Which is the best first WhatsApp outreach style?',
      options: [
        'Sending a single "?" punctuation mark to see if they reply.',
        'Sending 15 uncompressed video brochures without greeting.',
        'Introduce yourself, explain why you are contacting the learner and politely ask for availability/callback.',
        'Asking for immediate bank account details in the first sentence.'
      ],
      correctAnswer: 2,
      explanation: 'Introduce yourself, explain why you are contacting the learner and politely ask for availability/callback.'
    },
    {
      id: 'mod3-q6',
      question: 'Which message should a counsellor avoid?',
      options: [
        'A clear follow-up summarizing program eligibility and brochure links.',
        'An email confirming a mutually agreed consultation call slot.',
        'Random "Hi" or "Good morning" messages with no introduction, context or reason for contact.',
        'A courteous message asking whether morning or afternoon suits for a 5-minute discussion.'
      ],
      correctAnswer: 2,
      explanation: 'Random "Hi" or "Good morning" messages with no introduction, context or reason for contact should be avoided.'
    }
  ],

  // Module 4: Content (7 Questions)
  4: [
    {
      id: 'mod4-q1',
      question: 'According to the training, approximately how should a counselling call be balanced?',
      options: [
        'The counsellor should speak 95% of the time without pausing.',
        'The learner should drive about 60% of the conversation and the counsellor about 40%.',
        'The counsellor should remain completely silent throughout the call.',
        'The conversation should be 100% scripted robot reading.'
      ],
      correctAnswer: 1,
      explanation: 'The learner should drive about 60% of the conversation and the counsellor about 40%.'
    },
    {
      id: 'mod4-q2',
      question: 'Why should a counsellor check whether it is a good time to talk?',
      options: [
        'To comply with international time zone copyright restrictions.',
        'Because the learner’s attention may be limited and the counselling conversation requires meaningful engagement.',
        'Because counsellors are only allowed to speak if the learner is sitting at a computer.',
        'To delay the conversation so that daily calling targets expire.'
      ],
      correctAnswer: 1,
      explanation: 'Because the learner’s attention may be limited and the counselling conversation requires meaningful engagement.'
    },
    {
      id: 'mod4-q3',
      question: 'Which is an important part of learner profiling?',
      options: [
        'Checking whether the learner owns stock in competitor edtech firms.',
        'Understanding factors such as city, language, working/studying status, income band where appropriate and age.',
        'Asking for the learner’s passport number and childhood home address.',
        'Logging the learner’s favorite movie genres and weekend hobbies.'
      ],
      correctAnswer: 1,
      explanation: 'Understanding factors such as city, language, working/studying status, income band where appropriate and age.'
    },
    {
      id: 'mod4-q4',
      question: 'Why can switching into a learner’s comfortable regional language help?',
      options: [
        'It bypasses university admission qualification criteria automatically.',
        'It can make the learner more comfortable and help build rapport.',
        'It eliminates the need for curriculum study materials.',
        'It is required by telecom operators for international toll calls.'
      ],
      correctAnswer: 1,
      explanation: 'It can make the learner more comfortable and help build rapport.'
    },
    {
      id: 'mod4-q5',
      question: 'What does "repeat the profile back" mean?',
      options: [
        'Repeat every word the learner says with an echo effect on the call.',
        'Summarize the learner’s situation and aspirations back to them to confirm understanding and build trust.',
        'Disagree with the learner’s career goals and propose an unrelated program.',
        'Dictate the learner’s contact details back to them for spelling errors only.'
      ],
      correctAnswer: 1,
      explanation: 'Summarize the learner’s situation and aspirations back to them to confirm understanding and build trust.'
    },
    {
      id: 'mod4-q6',
      question: 'After profiling, what should the counsellor do when introducing the product?',
      options: [
        'Read the entire 80-page university syllabus word for word.',
        'Offer a 90% discount before describing any program features.',
        'Explain the product in the context of the learner’s aspirations rather than simply delivering a generic pitch.',
        'Declare that other programs in the market are fraudulent.'
      ],
      correctAnswer: 2,
      explanation: 'Explain the product in the context of the learner’s aspirations rather than simply delivering a generic pitch.'
    },
    {
      id: 'mod4-q7',
      question: 'What is an appropriate next step after a successful phone conversation?',
      options: [
        'Never contact the learner again unless they call back first.',
        'Move the conversation to WhatsApp or email, share relevant material and agree on when to reconnect.',
        'Demand an immediate credit card authorization before ending the call.',
        'Forward the learner’s private details to third-party loan marketing agencies.'
      ],
      correctAnswer: 1,
      explanation: 'Move the conversation to WhatsApp or email, share relevant material and agree on when to reconnect.'
    }
  ],

  // Module 5: Objection Handling (7 Questions)
  5: [
    {
      id: 'mod5-q1',
      question: 'What should a counsellor do first when a learner says the fees are too high?',
      options: [
        'Hang up immediately and mark the lead as disqualified.',
        'Understand the learner’s affordability/financial situation and the value factors important to them.',
        'Argue with the student and claim that education is always expensive.',
        'Triple the course price to make it seem more prestigious.'
      ],
      correctAnswer: 1,
      explanation: 'Understand the learner’s affordability/financial situation and the value factors important to them.'
    },
    {
      id: 'mod5-q2',
      question: 'Which is NOT an appropriate comparison factor when handling a competitor objection?',
      options: [
        'Reviewing differences in faculty credentials and industry specialization.',
        'Comparing curriculum depth and placement support infrastructure.',
        'Making unsupported claims about a competitor.',
        'Highlighting alumni network strength and accredited university standing.'
      ],
      correctAnswer: 2,
      explanation: 'Making unsupported claims about a competitor is NOT an appropriate comparison factor.'
    },
    {
      id: 'mod5-q3',
      question: 'What should a counsellor know before handling market-comparison objections?',
      options: [
        'Competitor office addresses and employees’ personal phone numbers.',
        'Relevant competitor information and a structured USP/value comparison.',
        'Secret algorithms used by search engine advertising networks.',
        'How to file court lawsuits against other educational institutions.'
      ],
      correctAnswer: 1,
      explanation: 'Relevant competitor information and a structured USP/value comparison.'
    },
    {
      id: 'mod5-q4',
      question: 'When a learner says "I need time to think," what should the counsellor try to discover?',
      options: [
        'How many days of vacation the learner takes per year.',
        'The actual reason or blocker behind the hesitation.',
        'The brand of computer the learner uses at work.',
        'Whether the learner is willing to forfeit their graduation certificate.'
      ],
      correctAnswer: 1,
      explanation: 'The actual reason or blocker behind the hesitation.'
    },
    {
      id: 'mod5-q5',
      question: 'How should a counsellor handle a family-permission objection?',
      options: [
        'Tell the student to enroll secretly without informing their family.',
        'Offer to involve the decision-maker through a suitable conversation such as Google Meet, Zoom or a conference call.',
        'Insist that adult learners must never consult parents on educational choices.',
        'Cancel the application permanently without further discussion.'
      ],
      correctAnswer: 1,
      explanation: 'Offer to involve the decision-maker through a suitable conversation such as Google Meet, Zoom or a conference call.'
    },
    {
      id: 'mod5-q6',
      question: 'Why is product knowledge important in objection handling?',
      options: [
        'It eliminates the need for any active listening or empathetic communication.',
        'It allows the counsellor to respond confidently and accurately to learner concerns.',
        'It guarantees that 100% of contacted prospects will enroll immediately.',
        'It replaces all administrative CRM record-keeping tasks.'
      ],
      correctAnswer: 1,
      explanation: 'It allows the counsellor to respond confidently and accurately to learner concerns.'
    },
    {
      id: 'mod5-q7',
      question: 'What overall attitude should a counsellor maintain while handling objections?',
      options: [
        'Aggressive, defensive, impatient and dismissive.',
        'Passive, disinterested, silent and apologetic.',
        'Calm, patient, composed and confident.',
        'Sarcastic, emotional, confrontational and rushed.'
      ],
      correctAnswer: 2,
      explanation: 'Calm, patient, composed and confident.'
    }
  ],

  // Module 6: Follow-Up (7 Questions)
  6: [
    {
      id: 'mod6-q1',
      question: 'Why is follow-up important?',
      options: [
        'Because telecom companies charge penalties for uncompleted follow-up calls.',
        'Because connected and interested learners often need continued engagement before making a decision.',
        'Because students will forget their own career aspirations within 2 hours.',
        'Because CRM systems automatically delete leads after 24 hours.'
      ],
      correctAnswer: 1,
      explanation: 'Because connected and interested learners often need continued engagement before making a decision.'
    },
    {
      id: 'mod6-q2',
      question: 'What is RNR?',
      options: [
        'Registration Not Received.',
        'Return and Refund.',
        'Ringing, No Response.',
        'Review Needed Urgently.'
      ],
      correctAnswer: 2,
      explanation: 'RNR stands for Ringing, No Response.'
    },
    {
      id: 'mod6-q3',
      question: 'What is the recommended RNR calling pattern described in the training?',
      options: [
        'Calling 15 times back-to-back within a single 5-minute period.',
        'Calling once a month only via automated robocalls.',
        'Three calls per day at different times across Day 1, Day 2 and Day 3, with WhatsApp follow-up after RNR attempts.',
        'Sending a single email and archiving the lead immediately.'
      ],
      correctAnswer: 2,
      explanation: 'Three calls per day at different times across Day 1, Day 2 and Day 3, with WhatsApp follow-up after RNR attempts.'
    },
    {
      id: 'mod6-q4',
      question: 'What should a counsellor avoid during RNR follow-up?',
      options: [
        'Sending a professional WhatsApp introductory message.',
        'Calling at varied times of the day to test prospect availability.',
        'Back-to-back/intrusive repeated calls.',
        'Logging interaction timestamps in the CRM.'
      ],
      correctAnswer: 2,
      explanation: 'Back-to-back/intrusive repeated calls.'
    },
    {
      id: 'mod6-q5',
      question: 'Why should connected-lead follow-ups move toward WhatsApp Business?',
      options: [
        'It eliminates the requirement for students to pay tuition fees.',
        'It provides a professional, convenient channel for continued communication and reduces reliance on ordinary phone calls.',
        'It allows counsellors to monitor the student’s personal phone storage.',
        'It replaces all curriculum lectures with chat summaries.'
      ],
      correctAnswer: 1,
      explanation: 'It provides a professional, convenient channel for continued communication and reduces reliance on ordinary phone calls.'
    },
    {
      id: 'mod6-q6',
      question: 'How can AI tools such as ChatGPT or Gemini be used in follow-up?',
      options: [
        'To forge student degree certificates and academic transcripts.',
        'To help refine professional English or regional-language follow-up messages.',
        'To impersonate university vice-chancellors on live voice calls.',
        'To hack into competitor CRM systems and scrape student contact details.'
      ],
      correctAnswer: 1,
      explanation: 'To help refine professional English or regional-language follow-up messages.'
    },
    {
      id: 'mod6-q7',
      question: 'Which communication style should be avoided in professional follow-up?',
      options: [
        'Courteous greetings and structured bullet-pointed highlights.',
        'Providing verified links to course curriculum and alumni placements.',
        'Friend-like abbreviations and overly casual language.',
        'Polite inquiries regarding convenient callback times.'
      ],
      correctAnswer: 2,
      explanation: 'Friend-like abbreviations and overly casual language.'
    }
  ],

  // Module 7: Closure (7 Questions)
  7: [
    {
      id: 'mod7-q1',
      question: 'According to the training, what should the counsellor remind the learner of during closure?',
      options: [
        'The counsellor’s monthly personal sales commission target.',
        'The aspiration the learner shared during profiling.',
        'The date the university building was originally constructed.',
        'The penalties for missing telephone calls.'
      ],
      correctAnswer: 1,
      explanation: 'The aspiration the learner shared during profiling.'
    },
    {
      id: 'mod7-q2',
      question: 'Which is an example of a learner aspiration?',
      options: [
        'Buying a new smartphone cover next weekend.',
        'Increasing CTC, getting a leadership position or switching career.',
        'Browsing internet forums without specific learning objectives.',
        'Keeping their resume unchanged for the next twenty years.'
      ],
      correctAnswer: 1,
      explanation: 'Increasing CTC, getting a leadership position or switching career.'
    },
    {
      id: 'mod7-q3',
      question: 'What is the purpose of creating urgency?',
      options: [
        'To frighten the learner into transferring money without understanding the course.',
        'To encourage the learner to take an appropriate action within the relevant decision/admission timeline instead of unnecessarily postponing it.',
        'To force learners to drop out of their existing full-time employment.',
        'To prevent candidates from reviewing the program syllabus.'
      ],
      correctAnswer: 1,
      explanation: 'To encourage the learner to take an appropriate action within the relevant decision/admission timeline instead of unnecessarily postponing it.'
    },
    {
      id: 'mod7-q4',
      question: 'Which is an example of a practical immediate action?',
      options: [
        'Submitting an immediate resignation from their current job before enrollment.',
        'Paying an appropriate registration fee or blocking a seat where that process genuinely exists.',
        'Transferring all personal savings to an unverified private bank account.',
        'Waiting six months before checking the course curriculum.'
      ],
      correctAnswer: 1,
      explanation: 'Paying an appropriate registration fee or blocking a seat where that process genuinely exists.'
    },
    {
      id: 'mod7-q5',
      question: 'What should urgency be based on?',
      options: [
        'Fictional emergency stories created on the spot by the counsellor.',
        'The actual lifetime, deadline, seat availability or admission timeline of the product.',
        'The counsellor’s remaining mobile phone battery percentage.',
        'Arbitrary threats that course fees will increase tenfold tomorrow.'
      ],
      correctAnswer: 1,
      explanation: 'The actual lifetime, deadline, seat availability or admission timeline of the product.'
    },
    {
      id: 'mod7-q6',
      question: 'Why should the counsellor discuss the changing industry and AI?',
      options: [
        'To convince learners that all human jobs will disappear within 24 hours.',
        'To help the learner understand the consequences of staying stagnant and the relevance of upskilling/career development.',
        'To sell hardware computer chips directly to the student.',
        'To discourage students from ever using technology in their careers.'
      ],
      correctAnswer: 1,
      explanation: 'To help the learner understand the consequences of staying stagnant and the relevance of upskilling/career development.'
    },
    {
      id: 'mod7-q7',
      question: 'Which is the strongest closure approach?',
      options: [
        'Demand full tuition payment immediately and refuse to answer questions.',
        'Reconnect the decision to the learner’s own aspiration, address the immediate blocker, create appropriate urgency and guide them toward the simplest actionable next step.',
        'Hang up and assume the learner will figure out how to enroll on their own.',
        'Promise 100% guaranteed executive promotions without completing course coursework.'
      ],
      correctAnswer: 1,
      explanation: 'Reconnect the decision to the learner’s own aspiration, address the immediate blocker, create appropriate urgency and guide them toward the simplest actionable next step.'
    }
  ]
};

/**
 * Final Comprehensive Assessment Question Bank
 * Exactly 30 Questions (F1 to F30) drawn STRICTLY from Modules 1 to 7:
 * - Module 1: 4 Questions (F1 - F4)
 * - Module 2: 4 Questions (F5 - F8)
 * - Module 3: 4 Questions (F9 - F12)
 * - Module 4: 5 Questions (F13 - F17)
 * - Module 5: 5 Questions (F18 - F22)
 * - Module 6: 4 Questions (F23 - F26)
 * - Module 7: 4 Questions (F27 - F30)
 *
 * Rules:
 * - Time Limit: 40 Minutes
 * - Passing Score: 75% (23 / 30)
 * - Excludes Modules 8 & 9 (Roleplays) completely
 */
export const FINAL_ASSESSMENT_QUESTIONS: Question[] = [
  // Module 1 (4 questions: F1 to F4)
  {
    id: 'final-f1',
    question: 'F1: What distinguishes education counselling from ordinary product sales?',
    options: [
      'Understanding the learner’s profile, situation, aspirations and goals before recommending the educational product.',
      'Using aggressive end-of-quarter discount discounts to force same-day card swipes.',
      'Relying entirely on pre-recorded voicemail broadcasts rather than human calls.',
      'There is no distinction; educational degrees are sold identically to consumer electronics.'
    ],
    correctAnswer: 0,
    explanation: 'Understanding the learner’s profile, situation, aspirations and goals before recommending the educational product.'
  },
  {
    id: 'final-f2',
    question: 'F2: Which approach best represents an education counsellor?',
    options: [
      'Pitching course pricing within the first 30 seconds of the call.',
      'Understand the learner first and connect the relevant course to their career goals.',
      'Ignoring candidate educational qualifications to hit daily volume numbers.',
      'Treating every prospect identically regardless of work history or ambition.'
    ],
    correctAnswer: 1,
    explanation: 'Understand the learner first and connect the relevant course to their career goals.'
  },
  {
    id: 'final-f3',
    question: 'F3: Why is learner aspiration important?',
    options: [
      'It allows the counsellor to connect the educational opportunity to the learner’s desired career outcome.',
      'It is required by banking partners to run credit bureau background checks.',
      'It helps the marketing team design generic billboards.',
      'It eliminates the need to discuss course curriculum.'
    ],
    correctAnswer: 0,
    explanation: 'It allows the counsellor to connect the educational opportunity to the learner’s desired career outcome.'
  },
  {
    id: 'final-f4',
    question: 'F4: Which set represents the training scope of education sales counselling?',
    options: [
      'Grading student assignments, supervising exams, and managing university alumni funds.',
      'Lead calling, cold calling, lead management, WhatsApp follow-up, regional-language rapport and closing.',
      'Designing website logos, editing video footage, and maintaining server racks.',
      'Conducting campus recruitment drives and negotiating corporate office leases.'
    ],
    correctAnswer: 1,
    explanation: 'Lead calling, cold calling, lead management, WhatsApp follow-up, regional-language rapport and closing.'
  },

  // Module 2 (4 questions: F5 to F8)
  {
    id: 'final-f5',
    question: 'F5: Which two major sources of leads are identified?',
    options: [
      'Lead/data analyst team and marketing team.',
      'Campus security staff and local courier delivery agencies.',
      'University examination boards and regional print newspapers.',
      'Software maintenance contractors and hardware supply vendors.'
    ],
    correctAnswer: 0,
    explanation: 'Lead/data analyst team and marketing team.'
  },
  {
    id: 'final-f6',
    question: 'F6: What is a churned/re-churned lead?',
    options: [
      'A student who has successfully graduated and received alumni certification.',
      'An older enquiry that was not previously followed up or closed and can potentially be re-engaged.',
      'A fake phone number that must be permanently deleted from database storage.',
      'An applicant who declined admission and requested immediate profile deletion.'
    ],
    correctAnswer: 1,
    explanation: 'An older enquiry that was not previously followed up or closed and can potentially be re-engaged.'
  },
  {
    id: 'final-f7',
    question: 'F7: Which factors help determine whether a lead fits the ideal customer profile?',
    options: [
      'Social media follower counts, smartphone brand, and personal hobbies.',
      'Age, background, working/studying status, affordability/income and language/rapport.',
      'Typing speed, internet connection provider, and home address zipcode only.',
      'Credit score history and car ownership status.'
    ],
    correctAnswer: 1,
    explanation: 'Age, background, working/studying status, affordability/income and language/rapport.'
  },
  {
    id: 'final-f8',
    question: 'F8: Why should a counsellor understand lead quality before counselling?',
    options: [
      'To understand who the learner is and how relevant the offering may be to their profile.',
      'To decide whether to charge higher tuition rates to specific candidates.',
      'To predict if the learner will file customer service complaints.',
      'To skip the discovery phase and jump directly to payment links.'
    ],
    correctAnswer: 0,
    explanation: 'To understand who the learner is and how relevant the offering may be to their profile.'
  },

  // Module 3 (4 questions: F9 to F12)
  {
    id: 'final-f9',
    question: 'F9: What are the three primary connectivity channels?',
    options: [
      'Call, WhatsApp and email.',
      'SMS, postal mail, and physical office visits.',
      'Radio ads, newspaper leaflets, and billboards.',
      'Video conferencing, social media direct messages, and chat forums.'
    ],
    correctAnswer: 0,
    explanation: 'Call, WhatsApp and email.'
  },
  {
    id: 'final-f10',
    question: 'F10: What is a professional WhatsApp practice?',
    options: [
      'Use WhatsApp Business with professional identity/presentation and separate it from personal communication where possible.',
      'Send casual emojis and street slang to appear approachable.',
      'Forward non-educational internet memes to keep prospects entertained.',
      'Use an anonymous profile picture and an informal nickname.'
    ],
    correctAnswer: 0,
    explanation: 'Use WhatsApp Business with professional identity/presentation and separate it from personal communication where possible.'
  },
  {
    id: 'final-f11',
    question: 'F11: What should the first outreach message contain?',
    options: [
      'A demand for immediate course deposit payment with bank account IFSC details.',
      'A professional introduction, reason for contact and a polite request for availability/callback.',
      'A generic "Hi" greeting with no explanation of who is contacting them.',
      'A 10-page document attachment without any opening text.'
    ],
    correctAnswer: 1,
    explanation: 'A professional introduction, reason for contact and a polite request for availability/callback.'
  },
  {
    id: 'final-f12',
    question: 'F12: Why should random "Hi" or "Good morning" messages be avoided?',
    options: [
      'They provide no context and are not professional outreach.',
      'They violate telecom cellular carrier licensing restrictions.',
      'They consume excessive mobile network bandwidth.',
      'They trigger automatic cancellation of learner applications.'
    ],
    correctAnswer: 0,
    explanation: 'They provide no context and are not professional outreach.'
  },

  // Module 4 (5 questions: F13 to F17)
  {
    id: 'final-f13',
    question: 'F13: What conversation balance does the Content module recommend?',
    options: [
      'Approximately 60% learner and 40% counsellor.',
      'Approximately 90% counsellor pitch and 10% learner listening.',
      'Approximately 50% silence and 50% scripted disclaimers.',
      'Approximately 80% counsellor and 20% learner.'
    ],
    correctAnswer: 0,
    explanation: 'Approximately 60% learner and 40% counsellor.'
  },
  {
    id: 'final-f14',
    question: 'F14: Why should the counsellor ask profiling questions before pitching?',
    options: [
      'To stall the call until the daily shift timer expires.',
      'To understand the learner and make the counselling relevant rather than delivering a generic pitch.',
      'To collect personal data to sell to third-party marketing companies.',
      'To determine whether the student will argue about examination schedules.'
    ],
    correctAnswer: 1,
    explanation: 'To understand the learner and make the counselling relevant rather than delivering a generic pitch.'
  },
  {
    id: 'final-f15',
    question: 'F15: How can regional-language communication help?',
    options: [
      'It can make the learner more comfortable and strengthen rapport.',
      'It legally bypasses degree eligibility verification requirements.',
      'It reduces international calling tariffs automatically.',
      'It ensures students will never seek refunds.'
    ],
    correctAnswer: 0,
    explanation: 'It can make the learner more comfortable and strengthen rapport.'
  },
  {
    id: 'final-f16',
    question: 'F16: Why should the counsellor repeat the learner’s profile back?',
    options: [
      'To check whether the phone microphone has audio lag.',
      'To demonstrate understanding and build trust before recommending the product.',
      'To correct the student’s pronunciation of technical terms.',
      'To lengthen call duration to meet internal telephony targets.'
    ],
    correctAnswer: 1,
    explanation: 'To demonstrate understanding and build trust before recommending the product.'
  },
  {
    id: 'final-f17',
    question: 'F17: What should happen after product counselling?',
    options: [
      'End the conversation abruptly without confirming follow-up channels.',
      'Move toward an appropriate closure, confirm the preferred communication channel and establish the next reconnect point.',
      'Immediately call the learner back 10 consecutive times.',
      'Insist that the learner must make a decision within 60 seconds.'
    ],
    correctAnswer: 1,
    explanation: 'Move toward an appropriate closure, confirm the preferred communication channel and establish the next reconnect point.'
  },

  // Module 5 (5 questions: F18 to F22)
  {
    id: 'final-f18',
    question: 'F18: What is the appropriate response to "The fees are too high"?',
    options: [
      'Tell the student that higher education is not suited for their financial background.',
      'Understand affordability and connect the product’s relevant value to the learner.',
      'Immediately double the tuition fee to signal exclusivity.',
      'Hang up the call and label the lead as unqualified.'
    ],
    correctAnswer: 1,
    explanation: 'Understand affordability and connect the product’s relevant value to the learner.'
  },
  {
    id: 'final-f19',
    question: 'F19: What should a counsellor prepare for competitor comparisons?',
    options: [
      'A list of negative personal rumors about competitor executives.',
      'A clear understanding of competitors and relevant USP/value comparisons.',
      'Legal notices threatening competitor institutions with copyright claims.',
      'Scripted statements claiming all other institutions are fraudulent.'
    ],
    correctAnswer: 1,
    explanation: 'A clear understanding of competitors and relevant USP/value comparisons.'
  },
  {
    id: 'final-f20',
    question: 'F20: What is usually hidden behind "I need time to think"?',
    options: [
      'An underlying concern or blocker that needs to be understood.',
      'Complete lack of interest that cannot ever be overcome.',
      'A technical glitch in the candidate’s smartphone.',
      'A desire to enroll in multiple programs simultaneously.'
    ],
    correctAnswer: 0,
    explanation: 'An underlying concern or blocker that needs to be understood.'
  },
  {
    id: 'final-f21',
    question: 'F21: How can a family objection be handled?',
    options: [
      'Advise the candidate to take out a secret loan without informing family members.',
      'Offer to involve the decision-maker in a suitable conversation.',
      'Refuse to speak with parents because only the student attends classes.',
      'Close the application file and delete the candidate from the CRM.'
    ],
    correctAnswer: 1,
    explanation: 'Offer to involve the decision-maker in a suitable conversation.'
  },
  {
    id: 'final-f22',
    question: 'F22: What qualities should the counsellor demonstrate during objection handling?',
    options: [
      'Aggressiveness, impatience, confrontation and rigidity.',
      'Calmness, patience, composure and confidence.',
      'Passivity, submissiveness, disinterest and apathy.',
      'Urgency that relies on false personal guarantees.'
    ],
    correctAnswer: 1,
    explanation: 'Calmness, patience, composure and confidence.'
  },

  // Module 6 (4 questions: F23 to F26)
  {
    id: 'final-f23',
    question: 'F23: What does RNR stand for?',
    options: [
      'Ringing, No Response.',
      'Refund Not Registered.',
      'Re-engagement Needs Review.',
      'Regional Network Registration.'
    ],
    correctAnswer: 0,
    explanation: 'Ringing, No Response.'
  },
  {
    id: 'final-f24',
    question: 'F24: What is the recommended RNR pattern?',
    options: [
      'Continuous back-to-back dialing until the prospect answers or blocks the number.',
      'Three attempts per day at different times across Day 1, Day 2 and Day 3, with WhatsApp follow-up.',
      'A single call once per month without any digital messaging follow-up.',
      'Sending 10 emails a day with no phone calls.'
    ],
    correctAnswer: 1,
    explanation: 'Three attempts per day at different times across Day 1, Day 2 and Day 3, with WhatsApp follow-up.'
  },
  {
    id: 'final-f25',
    question: 'F25: Why move connected follow-ups to WhatsApp Business?',
    options: [
      'It provides a professional and convenient channel for continued engagement.',
      'It prevents students from asking questions about course pricing.',
      'It automates 100% of the sales counselling role without human involvement.',
      'It eliminates the need for university syllabus documentation.'
    ],
    correctAnswer: 0,
    explanation: 'It provides a professional and convenient channel for continued engagement.'
  },
  {
    id: 'final-f26',
    question: 'F26: How can AI assist with follow-up?',
    options: [
      'It can help refine professional English or regional-language messages.',
      'It can forge student identity documents to expedite admissions.',
      'It can impersonate government accreditation inspectors.',
      'It can replace all faculty mentors with automated bots.'
    ],
    correctAnswer: 0,
    explanation: 'It can help refine professional English or regional-language messages.'
  },

  // Module 7 (4 questions: F27 to F30)
  {
    id: 'final-f27',
    question: 'F27: What should a counsellor remind the learner of during closure?',
    options: [
      'The counsellor’s monthly sales quota deadline.',
      'The learner’s own aspiration.',
      'The legal penalties for failing university examinations.',
      'The number of calls the counsellor made that morning.'
    ],
    correctAnswer: 1,
    explanation: 'The learner’s own aspiration.'
  },
  {
    id: 'final-f28',
    question: 'F28: What is the purpose of urgency in closure?',
    options: [
      'To prevent unnecessary postponement and encourage an appropriate action within the actual timeline.',
      'To pressure the student into borrowing money they cannot repay.',
      'To hide course terms and conditions from the candidate.',
      'To force candidates to enroll before checking their academic eligibility.'
    ],
    correctAnswer: 0,
    explanation: 'To prevent unnecessary postponement and encourage an appropriate action within the actual timeline.'
  },
  {
    id: 'final-f29',
    question: 'F29: Which is an appropriate closure action?',
    options: [
      'A legitimate registration or seat-blocking step where applicable.',
      'Demanding immediate cash delivery to the counsellor’s personal home.',
      'Requiring candidates to sign lifelong binding loyalty contracts.',
      'Forcing candidates to quit their current jobs before starting classes.'
    ],
    correctAnswer: 0,
    explanation: 'A legitimate registration or seat-blocking step where applicable.'
  },
  {
    id: 'final-f30',
    question: 'F30: What should determine the urgency timeline?',
    options: [
      'The actual product/admission deadline, seat availability or relevant lifecycle.',
      'A random fictional emergency invented by the counsellor.',
      'The current time on the counsellor’s office clock.',
      'The date the counsellor’s mobile plan expires.'
    ],
    correctAnswer: 0,
    explanation: 'The actual product/admission deadline, seat availability or relevant lifecycle.'
  }
];
