import { Question } from '../types/index.ts';

/**
 * Question Bank for Individual Chapter Assessments (Chapters 1 to 11)
 * Each chapter contains 5 focused questions (Passing: 70%, i.e., 4/5 correct).
 */
export const CHAPTER_QUESTIONS: Record<number, Question[]> = {
  // Chapter 1: Introduction to Education Sales Counselling
  1: [
    {
      id: 'ch1-q1',
      question: 'What is the primary difference between a consultative education counsellor and a transactional salesperson?',
      options: [
        'A consultative counsellor prioritizes the student’s career trajectory and alignment over quick closure',
        'A transactional salesperson offers higher tuition discounts to force signups',
        'A consultative counsellor only communicates via automated email sequences',
        'There is no functional difference; both only focus on volume metrics'
      ],
      correctAnswer: 0,
      explanation: 'Consultative counselling centers on understanding the learner’s genuine career objectives and recommending programs that provide demonstrable ROI.'
    },
    {
      id: 'ch1-q2',
      question: 'Which of the following mindsets is most essential for establishing trust in the opening 2 minutes of a call?',
      options: [
        'Aggressive pitching of promotional prices',
        'Empathetic listening and setting a collaborative agenda',
        'Reading verbatim script disclaimers',
        'Asking for credit card details immediately'
      ],
      correctAnswer: 1,
      explanation: 'Rapport and authority are established by active listening, acknowledging learner context, and outlining a structured advisory conversation.'
    },
    {
      id: 'ch1-q3',
      question: 'Why is ethical counselling critical to the long-term success of an education institution?',
      options: [
        'It eliminates the need for any CRM software',
        'Misaligned students drop out, seek refunds, and damage brand reputation and alumni outcomes',
        'Regulatory bodies require 100% discount waivers for unhappy students',
        'It prevents students from ever asking questions about fees'
      ],
      correctAnswer: 1,
      explanation: 'Enrolling learners who lack prerequisite skills or genuine intent causes dropouts, refund disputes, and weakens institutional placement statistics.'
    },
    {
      id: 'ch1-q4',
      question: 'What should an education counsellor do if a student is clearly unsuitable for an advanced technical program?',
      options: [
        'Enroll them anyway to meet daily targets',
        'Recommend a prerequisite foundational track or honestly advise an alternative learning path',
        'Hang up immediately without explanation',
        'Double the fee to discourage them'
      ],
      correctAnswer: 1,
      explanation: 'Professional counsellors redirect learners to foundational courses or more suitable pathways rather than setting them up for failure.'
    },
    {
      id: 'ch1-q5',
      question: 'Which metric measures the percentage of contacted prospective learners who convert into enrolled students?',
      options: [
        'Cost per Click (CPC)',
        'Lead-to-Enrollment Conversion Rate',
        'Net Promoter Score (NPS) of mentors',
        'Course syllabus completion index'
      ],
      correctAnswer: 1,
      explanation: 'The Lead-to-Enrollment Conversion Rate calculates the ratio of enrolled students relative to total qualified leads engaged.'
    }
  ],

  // Chapter 2: Understanding Leads & Education Counselling
  2: [
    {
      id: 'ch2-q1',
      question: 'Which type of lead typically demonstrates the highest buying intent and highest conversion potential?',
      options: [
        'Inbound organic inquiry requesting a callback or syllabus download',
        'Cold scraped database contact',
        'User who misclicked an irrelevant social media game ad',
        'Expired contact from two years prior'
      ],
      correctAnswer: 0,
      explanation: 'Inbound learners who actively search, submit forms, or request course syllabi demonstrate immediate intent and higher conversion rates.'
    },
    {
      id: 'ch2-q2',
      question: 'What is the "Golden Window" for making the first contact attempt on a freshly submitted inbound lead?',
      options: [
        'Within 5 to 15 minutes of submission',
        'After 48 to 72 hours so they do not feel rushed',
        'At the end of the monthly billing cycle',
        'Only on Sunday evenings'
      ],
      correctAnswer: 0,
      explanation: 'Speed to lead is paramount; reaching an inbound prospect within 5–15 minutes increases call connection and conversion rates significantly.'
    },
    {
      id: 'ch2-q3',
      question: 'When analyzing a learner’s lead profile before dialing, which data point is most crucial?',
      options: [
        'Their social media profile picture',
        'Current educational/work background, expressed interest, and lead source',
        'Their mobile phone carrier network',
        'Their physical postal pin code only'
      ],
      correctAnswer: 1,
      explanation: 'Reviewing background, program interest, and source gives the counsellor the context needed to tailor the conversation hook.'
    },
    {
      id: 'ch2-q4',
      question: 'What characterizes a "Working Professional Career Switcher" lead persona?',
      options: [
        'They are looking for campus extracurricular clubs',
        'They already have industry experience and seek higher salary, upskilling, or domain transition',
        'They only care about passing semester exams',
        'They do not have financial independence'
      ],
      correctAnswer: 1,
      explanation: 'Career switchers prioritize career outcomes, salary increments, flexible class timings, and mentorship relevant to their transition.'
    },
    {
      id: 'ch2-q5',
      question: 'How should a counsellor treat a referral lead referred by an active or graduated student?',
      options: [
        'Treat them as cold outreach with standard generic scripts',
        'Acknowledge the mutual connection warmly, as trust and conversion likelihood are already elevated',
        'Refuse to speak with them unless they re-apply via web forms',
        'Offer zero counselling because they already know everything'
      ],
      correctAnswer: 1,
      explanation: 'Referral leads have social proof and high trust; referencing the recommender builds instant credibility.'
    }
  ],

  // Chapter 3: Channels for Connectivity
  3: [
    {
      id: 'ch3-q1',
      question: 'What is the primary objective of sending a WhatsApp message immediately after an unanswered first call attempt?',
      options: [
        'To accuse the candidate of avoiding your call',
        'To introduce yourself politely, state why you called, and offer convenient callback time options',
        'To send a 100-page PDF brochure without explanation',
        'To demand payment immediately'
      ],
      correctAnswer: 1,
      explanation: 'A quick WhatsApp message identifies who called, verifies intent, and allows the prospect to reply with a convenient time window.'
    },
    {
      id: 'ch3-q2',
      question: 'Which email subject line follows best practices for an education follow-up?',
      options: [
        'URGENT PLEASE READ OR YOUR RECORD WILL BE DELETED!!!',
        'Information requested: Data Science curriculum & career outcomes for [Learner Name]',
        'Course info',
        'Check out this big discount now'
      ],
      correctAnswer: 1,
      explanation: 'Clear, personalized, benefit-driven subject lines yield superior open rates and establish professionalism.'
    },
    {
      id: 'ch3-q3',
      question: 'What is an optimal calling cadence across a 7-day period for an uncontacted qualified lead?',
      options: [
        'Call 25 times in a single afternoon',
        'Diversify call times (morning, afternoon, early evening) across 4–6 strategic attempts paired with WhatsApp and email',
        'Never call more than once ever',
        'Only send automated robocalls at midnight'
      ],
      correctAnswer: 1,
      explanation: 'Varying call times across different slots respects the learner’s workday while maximizing connectivity probability.'
    },
    {
      id: 'ch3-q4',
      question: 'In omnichannel communication, what role does SMS or WhatsApp notification play prior to a scheduled counselling session?',
      options: [
        'It replaces the need for the actual phone counselling call',
        'It serves as a 15-minute appointment reminder, drastically decreasing no-show rates',
        'It collects signatures for contract agreements',
        'It notifies the candidate’s employer'
      ],
      correctAnswer: 1,
      explanation: 'Timely reminders before scheduled sessions cut no-show rates and show respect for both parties’ calendars.'
    },
    {
      id: 'ch3-q5',
      question: 'When is it appropriate to send voice notes or short explanatory videos on WhatsApp?',
      options: [
        'Never, under any circumstances',
        'When explaining a complex curriculum module or clarifying personalized doubt after establishing initial contact',
        'As cold unsolicited first outreach to strangers',
        'To broadcast company staff meetings'
      ],
      correctAnswer: 1,
      explanation: 'Personalized voice notes or short walk-through clips humanize the counsellor and explain nuance effectively.'
    }
  ],

  // Chapter 4: Discovery & Learner Profiling
  4: [
    {
      id: 'ch4-q1',
      question: 'What does the "4 Pillars of Learner Profiling" framework encompass?',
      options: [
        'Height, Weight, Age, Location',
        'Background, Career Aspirations, Pain Points / Skill Gaps, and Financial / Time Readiness',
        'Credit Score, Bank PIN, Laptop Model, Internet Speed',
        'High School GPA, Sports Played, Social Media Followers, Hobby'
      ],
      correctAnswer: 1,
      explanation: 'Discovery must map: current reality (background), target future (aspiration), obstacles (skill gaps), and logistics (time & budget).'
    },
    {
      id: 'ch4-q2',
      question: 'Which of the following is an effective open-ended discovery question?',
      options: [
        'Do you want this course? Yes or No?',
        'Can you afford 50,000 rupees right now?',
        'What specific roadblocks have you encountered in your recent job applications or workplace projects?',
        'Is your name John?'
      ],
      correctAnswer: 2,
      explanation: 'Open-ended questions starting with "What", "How", or "Tell me about..." encourage the candidate to articulate their underlying challenges.'
    },
    {
      id: 'ch4-q3',
      question: 'Why must a counsellor identify who the true decision-maker and sponsor is early in the conversation?',
      options: [
        'To terminate the call immediately if the learner is under 25',
        'To ensure the decision-maker (e.g., parents, spouse, or self) is included in subsequent evaluations and financial discussions',
        'To demand immediate direct transfer from the parent’s account',
        'To prevent the student from talking'
      ],
      correctAnswer: 1,
      explanation: 'If a parent or spouse finances the education, pitching solely to a dependent student leads to stalled closures unless the sponsor is engaged.'
    },
    {
      id: 'ch4-q4',
      question: 'During discovery, what is the recommended talking-to-listening ratio for an education counsellor?',
      options: [
        '80% counsellor talking, 20% learner listening',
        '30% counsellor asking/listening, 70% learner sharing their goals and background',
        '50% silence, 50% music',
        '100% counsellor monologue'
      ],
      correctAnswer: 1,
      explanation: 'Effective discovery requires the counsellor to listen actively while the prospective student shares their context.'
    },
    {
      id: 'ch4-q5',
      question: 'What should a counsellor do immediately after uncovering a learner’s primary career goal?',
      options: [
        'Ignore it and read the generic company history brochure',
        'Reflect and validate their goal in the learner’s own words to confirm deep understanding',
        'Tell them their goal is unrealistic and criticize their ambitions',
        'Transfer the call to billing'
      ],
      correctAnswer: 1,
      explanation: 'Active reflective listening ("If I understood correctly, you are aiming to...") builds immense psychological alignment.'
    }
  ],

  // Chapter 5: Counselling Content & First Conversation
  5: [
    {
      id: 'ch5-q1',
      question: 'What is the "Feature-Benefit-Outcome" (FBO) technique in course presentation?',
      options: [
        'Listing only the number of hours of video content',
        'Connecting a syllabus feature to its practical learning benefit, and tying it to the learner’s desired career outcome',
        'Offering a 50% discount on every feature',
        'Speaking as quickly as possible so the learner cannot interrupt'
      ],
      correctAnswer: 1,
      explanation: 'FBO bridges technical specifications (e.g. Capstone project) to real benefits (portfolio creation) to target outcomes (clearing job interviews).'
    },
    {
      id: 'ch5-q2',
      question: 'How should mentor credentials and faculty background be presented to a prospective student?',
      options: [
        'Read every university degree they earned 20 years ago',
        'Highlight their active industry leadership, real-world project experience, and track record in mentoring learners into top firms',
        'Keep faculty identity completely secret until after payment',
        'Claim the mentors will do the student’s work for them'
      ],
      correctAnswer: 1,
      explanation: 'Students value industry relevance, modern practical tools, and approachable mentorship.'
    },
    {
      id: 'ch5-q3',
      question: 'When presenting placement assistance or career services, what constitutes ethical and accurate representation?',
      options: [
        'Guaranteeing a 100% unconditional $100,000 salary without student effort',
        'Explaining interview preparation, resume reviews, hiring partner access, and student eligibility criteria clearly',
        'Denying that any placement support exists',
        'Promising that Google or Microsoft personally inspects each student'
      ],
      correctAnswer: 1,
      explanation: 'Ethical counsellors describe the partnership: rigorous institution support paired with necessary student effort and attendance.'
    },
    {
      id: 'ch5-q4',
      question: 'What should always be established before ending the first counselling call?',
      options: [
        'A concrete mutually agreed next step with a specific date and time',
        'A vague promise to "talk sometime next month"',
        'An argument about competitor pricing',
        'Nothing; hang up abruptly'
      ],
      correctAnswer: 0,
      explanation: 'Every productive counselling conversation concludes with a clear next step (e.g., webinar attendance, review call with parents at 6 PM tomorrow).'
    },
    {
      id: 'ch5-q5',
      question: 'If a learner asks a highly technical syllabus question that you do not know the answer to, how should you respond?',
      options: [
        'Make up a false answer to maintain authority',
        'Acknowledge the great question transparently, take a note, and arrange a short technical mentor clarification or confirm via message',
        'Tell the student technical questions are forbidden',
        'Change the topic to tuition fees immediately'
      ],
      correctAnswer: 1,
      explanation: 'Intellectual honesty builds deep trust; committing to verify technical nuances with academic mentors protects credibility.'
    }
  ],

  // Chapter 6: Objection Handling
  6: [
    {
      id: 'ch6-q1',
      question: 'What are the 4 core steps of the "ECIR" objection handling framework?',
      options: [
        'Evade, Cancel, Interrupt, Reject',
        'Empathize, Clarify, Isolate, and Reframe',
        'Email, Call, Invoice, Repeat',
        'Estimate, Calculate, Inflate, Reduce'
      ],
      correctAnswer: 1,
      explanation: 'ECIR stands for: Empathize with the concern, Clarify the root cause, Isolate if this is the only blocker, and Reframe the value.'
    },
    {
      id: 'ch6-q2',
      question: 'When a prospective learner says "The fees are too high for me", what is the most consultative response?',
      options: [
        'Say "No they are not, they are very cheap!"',
        'Empathize with their investment consideration, clarify whether it is upfront cashflow or total value perceived, and explore flexible EMI plans',
        'Immediately cut the price by 80% without explanation',
        'Terminate the call because they cannot afford it'
      ],
      correctAnswer: 1,
      explanation: 'Price objections frequently represent cashflow friction rather than absolute lack of value; flexible installment plans and ROI comparison clarify affordability.'
    },
    {
      id: 'ch6-q3',
      question: 'How should you respond when a student objects: "I don’t have time because of my job"?',
      options: [
        'Tell them to quit their job immediately',
        'Help them conduct a weekly time audit, showing how asynchronous recorded sessions and weekend cohorts fit into 6–8 hours/week',
        'Agree that they should give up on career advancement',
        'Tell them they only need to study 5 minutes a month'
      ],
      correctAnswer: 1,
      explanation: 'Breaking weekly study commitments down into realistic chunks (e.g. 1 hour/day) removes perceived overwhelm.'
    },
    {
      id: 'ch6-q4',
      question: 'What is the purpose of the "Isolate" step in objection handling?',
      options: [
        'To put the caller on hold for 10 minutes',
        'To confirm whether this specific concern is the single remaining hurdle before they can confidently move forward',
        'To isolate the student from their family members',
        'To disconnect their internet'
      ],
      correctAnswer: 1,
      explanation: 'Isolating ("Aside from the schedule, is there any other factor holding you back?") uncovers hidden hesitations and ensures clarity.'
    },
    {
      id: 'ch6-q5',
      question: 'When a learner brings up a direct competitor, what is the best practice?',
      options: [
        'Insult and demean the competitor’s teachers and courses',
        'Acknowledge the competitor respectfully while highlighting your program’s unique strengths, mentor access, and practical curriculum depth',
        'Hang up because competitor shoppers never buy',
        'Deny that the competitor exists'
      ],
      correctAnswer: 1,
      explanation: 'Bashing competitors looks insecure and unprofessional; standing confidently on your distinct value propositions commands respect.'
    }
  ],

  // Chapter 7: Follow-Up — Connected Leads
  7: [
    {
      id: 'ch7-q1',
      question: 'What is wrong with beginning a follow-up conversation with: "Hi, I am just calling to check in"?',
      options: [
        'Nothing, it is the best greeting in sales',
        'It brings zero value, feels self-serving, and invites the learner to brush you off with "still thinking"',
        'It is illegal under CRM guidelines',
        'It makes calls too long'
      ],
      correctAnswer: 1,
      explanation: 'Value-led follow-ups lead with a reason: sharing a relevant project case study, invite to an expert session, or updates on seat allocation.'
    },
    {
      id: 'ch7-q2',
      question: 'What is the 24-48-72 hour cadence for engaged prospective learners?',
      options: [
        'Calling 100 times in 24 hours',
        'Strategic touchpoints delivering supplemental syllabus assets, alumni transition stories, and batch registration deadlines over 3 days',
        'Ignoring the lead for 72 hours until they beg for a call',
        'Deleting the lead after 24 hours'
      ],
      correctAnswer: 1,
      explanation: 'Momentum is highest in the first 72 hours; structured value drops sustain enthusiasm and answer lingering questions.'
    },
    {
      id: 'ch7-q3',
      question: 'Which of the following represents a strong buying signal during a follow-up conversation?',
      options: [
        'The candidate asks about batch start dates, EMI payment options, and laptop technical requirements',
        'The candidate says "Never call me again"',
        'The candidate has changed their phone number',
        'The candidate does not remember who you are'
      ],
      correctAnswer: 0,
      explanation: 'Questions regarding logistics, payment schedules, and hardware requirements indicate the learner is mentally picturing participation.'
    },
    {
      id: 'ch7-q4',
      question: 'How should social proof (alumni success stories) be utilized in follow-up messaging?',
      options: [
        'Send 50 generic links with no explanation',
        'Share a story of a graduate who shared a similar background, previous education, or career obstacle as the prospect',
        'Invent fake celebrities who took the course',
        'Only send stories in foreign languages'
      ],
      correctAnswer: 1,
      explanation: 'Relatability is key; a non-tech background prospect is inspired by seeing another non-tech learner succeed.'
    },
    {
      id: 'ch7-q5',
      question: 'If a prospect has postponed the follow-up call twice, what is the best strategy?',
      options: [
        'Send an angry reprimand on WhatsApp',
        'Send a polite, low-pressure permission message acknowledging their busy week and suggesting a specific asynchronous resource or weekend slot',
        'Call their office reception desk',
        'Continuously redial every 30 seconds'
      ],
      correctAnswer: 1,
      explanation: 'Low-friction messages lower defensive barriers and give prospects an easy way to re-engage when ready.'
    }
  ],

  // Chapter 8: Follow-Up — RNR, WhatsApp, Email & AI
  8: [
    {
      id: 'ch8-q1',
      question: 'What does the industry acronym "RNR" stand for in lead management?',
      options: [
        'Rest and Recreation',
        'Ringing No Response',
        'Refund Not Required',
        'Registration Number Recorded'
      ],
      correctAnswer: 1,
      explanation: 'RNR (Ringing No Response) refers to dialled calls where the telephone rings until voicemail/disconnection without an answer.'
    },
    {
      id: 'ch8-q2',
      question: 'Why should counsellors vary the time of day when attempting calls on RNR leads?',
      options: [
        'To trick the telecommunication carriers',
        'Because prospects have varying work shifts, commute hours, and lecture schedules; catching them at a different hour often unlocks connectivity',
        'To avoid working in the morning',
        'Because phone batteries work better in the evening'
      ],
      correctAnswer: 1,
      explanation: 'If a prospect is in daily meetings at 11 AM, redialling at 11 AM will fail repeatedly. Shifting to 6 PM or lunch hours succeeds.'
    },
    {
      id: 'ch8-q3',
      question: 'How can modern AI tools assist an education counsellor during follow-up workflows?',
      options: [
        'AI can make all sales closures without any human counsellor involved',
        'AI can quickly summarize call notes, draft personalized email follow-ups, and suggest tailored objection talking points',
        'AI can replace the institution’s teaching staff entirely',
        'AI is prohibited in all education sales contexts'
      ],
      correctAnswer: 1,
      explanation: 'AI accelerates repetitive drafting, improves grammar/tone, and allows counsellors to craft tailored responses in seconds.'
    },
    {
      id: 'ch8-q4',
      question: 'What is a "Breakup Message" in an RNR follow-up sequence?',
      options: [
        'A hostile message firing the student as a customer',
        'A polite, respectful message letting the prospect know you will stop outreach so as not to bother them, leaving the door open to reconnect',
        'A notice of legal action',
        'A message breaking up with your team manager'
      ],
      correctAnswer: 1,
      explanation: 'The breakup message removes sales pressure, triggers loss aversion, and frequently prompts unresponsive prospects to reply.'
    },
    {
      id: 'ch8-q5',
      question: 'When should an RNR lead be moved to an automated nurture bucket or archived in the CRM?',
      options: [
        'After 1 unanswered call',
        'After an exhaustive multi-touch cadence (e.g. 6–8 calls, 3 WhatsApps, 2 emails across 10–14 days) with zero engagement',
        'Never; keep calling them daily forever',
        'Only after 5 years'
      ],
      correctAnswer: 1,
      explanation: 'Clean CRM hygiene requires recycling non-responsive leads to automated email marketing to keep counsellor focus on active pipelines.'
    }
  ],

  // Chapter 9: Closing the Sale & Creating Urgency
  9: [
    {
      id: 'ch9-q1',
      question: 'What distinguishes ethical urgency from manipulative false pressure in education counselling?',
      options: [
        'Ethical urgency is based on real constraints like batch kickoff dates, mentor capacity, or official scholarship application cutoffs',
        'Ethical urgency means threatening the student that they will be fired from their current job',
        'There is no such thing as ethical urgency in sales',
        'False pressure involves giving true information'
      ],
      correctAnswer: 0,
      explanation: 'Real deadlines (cohort start date, limited seat ratios for mentor code reviews) are genuine; fake threats erode institutional integrity.'
    },
    {
      id: 'ch9-q2',
      question: 'What is a "Trial Close" and when should it be used?',
      options: [
        'A court proceeding against students who do not enroll',
        'A low-stakes question used throughout the call to gauge readiness, such as "How does this curriculum structure feel so far?"',
        'Demanding immediate payment in the first 30 seconds',
        'Offering a 30-day free trial on everything'
      ],
      correctAnswer: 1,
      explanation: 'Trial closes test the temperature of the buyer and uncover remaining objections before asking for financial commitment.'
    },
    {
      id: 'ch9-q3',
      question: 'What is the "Assumptive Close" technique?',
      options: [
        'Assuming the student has no money and terminating the call',
        'Guiding the student naturally through the enrollment steps as though the decision to join has already been mutually resolved',
        'Assuming competitor courses are superior',
        'Guessing the student’s credit card number'
      ],
      correctAnswer: 1,
      explanation: 'The assumptive close shifts focus from "if" to "how" (e.g., "Shall we register you under the weekend batch or the weekday evening cohort?").'
    },
    {
      id: 'ch9-q4',
      question: 'How should a counsellor handle downpayment / seat reservation fees during the closing conversation?',
      options: [
        'Send an unverified third-party personal account link',
        'Stay on the line, walk through the secure official portal step-by-step, and confirm the receipt generated in real-time',
        'Tell them to pay cash at a random train station',
        'Tell them to pay whenever they feel like it in 6 months'
      ],
      correctAnswer: 1,
      explanation: 'Guiding the candidate through the official portal provides reassurance, prevents checkout drop-off, and ensures immediate confirmation.'
    },
    {
      id: 'ch9-q5',
      question: 'If a student is fully convinced of program value but hesitates solely at the final transaction screen, what is usually happening?',
      options: [
        'They are experiencing last-minute buyer hesitation or payment portal technical confusion; calm reassurance and step-by-step guidance resolves it',
        'They hate the company and are wasting your time',
        'Their computer has exploded',
        'They want you to pay for them'
      ],
      correctAnswer: 0,
      explanation: 'Last-minute cold feet is normal psychological friction. Calmly reaffirming their goals and assisting with payment modes secures closure.'
    }
  ],

  // Chapter 10: Closure Roleplay
  10: [
    {
      id: 'ch10-q1',
      question: 'During a closure roleplay simulation, what is the most common mistake novice counsellors make?',
      options: [
        'Listening too carefully to the student',
        'Over-talking, interrupting the prospect, and continuing to pitch features after the prospect has already agreed to enroll',
        'Asking for the learner’s preferred schedule',
        'Taking notes on the CRM'
      ],
      correctAnswer: 1,
      explanation: 'When the buyer says yes or shows readiness, stop selling and start facilitating the onboarding process.'
    },
    {
      id: 'ch10-q2',
      question: 'In call deconstruction, how can a counsellor detect a "polite brush-off" masquerading as interest?',
      options: [
        'The prospect asks in-depth questions about project requirements',
        'The prospect gives rapid, vague agreements ("Yes, yes, looks great, send everything to email, bye") without answering discovery questions',
        'The prospect asks to speak with their mentor',
        'The prospect shares their resume for evaluation'
      ],
      correctAnswer: 1,
      explanation: 'Overly rapid superficial agreement without engagement is the classic hallmark of a lead trying to exit the call.'
    },
    {
      id: 'ch10-q3',
      question: 'How should a counsellor respond if a simulated roleplay prospect interrupts with: "Just tell me the price, skip everything else"?',
      options: [
        'Refuse to speak and demand they apologize',
        'Acknowledge transparently: provide the investment range or baseline fee, then briefly explain how scholarships and tracks depend on their background',
        'Hang up the phone immediately',
        'Quote 10 times the actual price'
      ],
      correctAnswer: 1,
      explanation: 'Dodging price when explicitly challenged destroys credibility; giving the range and explaining track dependencies preserves both control and trust.'
    },
    {
      id: 'ch10-q4',
      question: 'What is the primary benefit of peer roleplay sessions with manager feedback?',
      options: [
        'To publicly humiliate underperforming staff',
        'To practice difficult objections in a zero-risk environment and build muscle memory for tone, pace, and reframing',
        'To waste time before the workday finishes',
        'To memorize a script that can never be modified'
      ],
      correctAnswer: 1,
      explanation: 'Roleplay creates safe deliberate practice so counsellors react smoothly and empathetically during high-stakes calls.'
    },
    {
      id: 'ch10-q5',
      question: 'In an effective roleplay scorecard, which criterion evaluates if the counsellor actually secured a firm commitment?',
      options: [
        'Call Duration only',
        'Call Closure & Next-Step Definition (e.g., payment completed, date/time locked, or calendar invitation accepted)',
        'Speed of typing',
        'Volume of counsellor’s microphone'
      ],
      correctAnswer: 1,
      explanation: 'High scoring calls consistently culminate in unambiguous, scheduled, and verified commitments.'
    }
  ],

  // Chapter 11: Final Counselling & Closure Mindset
  11: [
    {
      id: 'ch11-q1',
      question: 'How should top-performing education counsellors cognitively reframe hearing "No" from a prospect?',
      options: [
        'As personal failure and an indicator they should resign',
        'As "Not right now" or a sign that discovery was incomplete, serving as data to refine future diagnostic conversations',
        'As an enemy attack that requires revenge',
        'As proof that education has no value'
      ],
      correctAnswer: 1,
      explanation: 'Resilient counsellors treat rejection as diagnostic feedback: understanding where value or fit fell short to continuously improve.'
    },
    {
      id: 'ch11-q2',
      question: 'What is the "Pipeline Mathematics" principle for consistently hitting monthly enrollment targets?',
      options: [
        'Relying on luck and hoping one big deal closes on the 31st',
        'Knowing your exact conversion ratios (e.g., 100 dials → 30 connects → 10 discovery calls → 3 enrollments) and executing the daily required inputs',
        'Asking management to lower the target to zero',
        'Only calling leads whose name starts with letter A'
      ],
      correctAnswer: 1,
      explanation: 'Consistent target achievement is rooted in predictable input metrics: managing daily dials, connects, and qualified pitches.'
    },
    {
      id: 'ch11-q3',
      question: 'Which daily time-blocking habit protects high conversion energy throughout the day?',
      options: [
        'Browsing social media randomly between dials',
        'Designating focused, uninterrupted calling sprints (e.g., 10am-12pm and 4pm-6pm) separated from administrative CRM updating periods',
        'Doing all administrative work while talking on the phone to students',
        'Never taking lunch breaks'
      ],
      correctAnswer: 1,
      explanation: 'Batching tasks into dedicated calling blocks maintains vocal energy and momentum, while batching admin tasks prevents distraction.'
    },
    {
      id: 'ch11-q4',
      question: 'What is the role of continuous learning in an education counsellor’s career progression?',
      options: [
        'None; once you memorize the first pitch you never need to study again',
        'Understanding evolving industry hiring demands, emerging tech stacks, and career market trends makes your advice authoritative and unmatched',
        'Only learning how to manipulate CRM reports',
        'Learning only competitor discount coupons'
      ],
      correctAnswer: 1,
      explanation: 'Education counsellors are career advisors; deep knowledge of industry hiring trends gives them authentic authority.'
    },
    {
      id: 'ch11-q5',
      question: 'What defines an exceptional, long-term Education Sales Leader?',
      options: [
        'One who pushes predatory loans and burns out after 2 months',
        'One who balances uncompromising ethical standards with high sales execution, mentoring colleagues and genuinely celebrating student career transformations',
        'One who hides leads from their teammates',
        'One who never speaks with prospective learners directly'
      ],
      correctAnswer: 1,
      explanation: 'True leadership in education sales combines commercial excellence, ethical advocacy for students, and team mentorship.'
    }
  ]
};

/**
 * FINAL COMPREHENSIVE ASSESSMENT (30 Questions, 100 Marks Total, Passing: 75/100)
 *
 * Part A: Core Knowledge (Questions 1 - 20) — 2 marks each = 40 marks
 * Part B: Scenario-Based Questions (Questions 21 - 25) — 6 marks each = 30 marks
 * Part C: Practical Counselling Tasks (Questions 26 - 30) — 6 marks each = 30 marks
 */
export const FINAL_ASSESSMENT_QUESTIONS: Question[] = [
  // PART A: CORE KNOWLEDGE (20 Questions, 2 marks each)
  {
    id: 'final-q1',
    section: 'coreKnowledge',
    marks: 2,
    question: '1. What is the fundamental mission of an education sales counsellor?',
    options: [
      'To sell the most expensive package regardless of applicant qualifications',
      'To consultatively diagnose learner aspirations, evaluate readiness, and guide them into programs that deliver tangible career progression',
      'To manage server infrastructure and software updates for the online LMS',
      'To automate spam messages across public social media forums'
    ],
    correctAnswer: 1,
    explanation: 'Education counselling is consultative: aligning student aptitude and aspirations with academic pathways that produce career growth.'
  },
  {
    id: 'final-q2',
    section: 'coreKnowledge',
    marks: 2,
    question: '2. Why is "Speed to Lead" critically important for inbound student inquiries?',
    options: [
      'Because inbound leads delete their internet browsers after 1 hour',
      'Because candidate intent, motivation, and availability are at their peak immediately after submitting an inquiry',
      'Because telecom providers fine institutions for delayed calls',
      'It is not important; calling 5 days later is statistically superior'
    ],
    correctAnswer: 1,
    explanation: 'Reaching a student within minutes of their inquiry capitalizes on their active attention and dramatically increases connection and enrollment rates.'
  },
  {
    id: 'final-q3',
    section: 'coreKnowledge',
    marks: 2,
    question: '3. What are the key components of the "ECIR" objection handling framework?',
    options: [
      'Evaluate, Calculate, Invoice, Receipt',
      'Empathize, Clarify, Isolate, Reframe',
      'Escalate, Cancel, Ignore, Replace',
      'Execute, Communicate, Inform, Release'
    ],
    correctAnswer: 1,
    explanation: 'ECIR stands for Empathize, Clarify the root concern, Isolate to confirm it is the only hurdle, and Reframe around return on investment.'
  },
  {
    id: 'final-q4',
    section: 'coreKnowledge',
    marks: 2,
    question: '4. What does the term "RNR" stand for in lead status tracking?',
    options: [
      'Registered Not Released',
      'Ringing No Response',
      'Rate of Net Returns',
      'Review Needed Rapidly'
    ],
    correctAnswer: 1,
    explanation: 'RNR denotes calls that ring out without being answered by the recipient.'
  },
  {
    id: 'final-q5',
    section: 'coreKnowledge',
    marks: 2,
    question: '5. Which communication channel has the highest open and read rate for immediate scheduling updates?',
    options: [
      'Direct postal mail',
      'WhatsApp / Instant messaging',
      'Printed billboard advertisements',
      'Voicemail recordings on landlines'
    ],
    correctAnswer: 1,
    explanation: 'WhatsApp maintains open rates exceeding 90% and allows swift two-way scheduling coordination.'
  },
  {
    id: 'final-q6',
    section: 'coreKnowledge',
    marks: 2,
    question: '6. In discovery, what is the key drawback of asking closed (Yes/No) questions?',
    options: [
      'They make the phone bill higher',
      'They restrict the student from revealing underlying motivations, anxieties, and background nuances',
      'They are forbidden under education regulations',
      'They make the call last more than 3 hours'
    ],
    correctAnswer: 1,
    explanation: 'Closed questions yield one-word answers, leaving the counsellor in the dark regarding the learner’s genuine drivers.'
  },
  {
    id: 'final-q7',
    section: 'coreKnowledge',
    marks: 2,
    question: '7. What does the "Feature-Benefit-Outcome" (FBO) model ensure during a pitch?',
    options: [
      'That every technical course feature is directly linked to student benefits and demonstrable career outcomes',
      'That all course features are priced separately',
      'That no outcomes are guaranteed under any circumstances',
      'That the counsellor speaks for 45 minutes continuously'
    ],
    correctAnswer: 0,
    explanation: 'FBO translates abstract curriculum topics into personal career capabilities that resonate with the buyer.'
  },
  {
    id: 'final-q8',
    section: 'coreKnowledge',
    marks: 2,
    question: '8. What constitutes legitimate urgency when discussing program enrollment?',
    options: [
      'Falsely claiming the government is shutting down higher education tomorrow',
      'Authentic constraints such as fixed cohort start dates, mentor-to-student caps, and scholarship application deadlines',
      'Threatening to report the student to their employer',
      'Changing the program fee every 15 minutes'
    ],
    correctAnswer: 1,
    explanation: 'Authentic urgency is anchored in tangible operational facts: cohort kickoffs and mentor capacity.'
  },
  {
    id: 'final-q9',
    section: 'coreKnowledge',
    marks: 2,
    question: '9. When should an education counsellor involve a student’s parents or financial sponsor?',
    options: [
      'Only after the student defaults on an invoice',
      'Early in discovery, whenever the learner indicates they rely on family sponsorship for tuition decisions',
      'Never, because third parties complicate sales',
      'Only if the student specifically requests a loan from the counsellor'
    ],
    correctAnswer: 1,
    explanation: 'Engaging the financial decision-maker early avoids stalled decisions and empowers everyone with accurate information.'
  },
  {
    id: 'final-q10',
    section: 'coreKnowledge',
    marks: 2,
    question: '10. What is the primary purpose of a structured CRM (Customer Relationship Management) system in education sales?',
    options: [
      'To spy on employee personal web browsing',
      'To maintain meticulous lead history, track touchpoints, schedule callbacks, and preserve pipeline integrity',
      'To replace all human teachers with software',
      'To generate random discount coupons automatically'
    ],
    correctAnswer: 1,
    explanation: 'A CRM records lead history, ensuring timely follow-ups and transparent handover across the counselling team.'
  },
  {
    id: 'final-q11',
    section: 'coreKnowledge',
    marks: 2,
    question: '11. Which metric evaluates the proportion of leads who answer your initial outreach call?',
    options: [
      'Connect Rate',
      'Bounce Rate',
      'Churn Rate',
      'Credit Score Index'
    ],
    correctAnswer: 0,
    explanation: 'Connect Rate is the percentage of total dialed phone calls that successfully connect to a speaking prospect.'
  },
  {
    id: 'final-q12',
    section: 'coreKnowledge',
    marks: 2,
    question: '12. Why is active listening considered more persuasive than smooth talking in consultative counselling?',
    options: [
      'Because listening allows the counsellor to sleep during the call',
      'Because people buy when they feel understood, and listening uncovers the exact levers needed for tailored closure',
      'Because listening reduces vocal cord strain',
      'It is not persuasive; non-stop talking always converts higher'
    ],
    correctAnswer: 1,
    explanation: 'When prospects feel genuinely heard, defensiveness evaporates, allowing tailored recommendations that hit their exact goals.'
  },
  {
    id: 'final-q13',
    section: 'coreKnowledge',
    marks: 2,
    question: '13. What is an "Assumptive Close"?',
    options: [
      'Assuming the customer cannot afford anything and hanging up',
      'Proceeding with the onboarding workflow and registration steps under the natural presumption that the candidate is joining',
      'Assuming competitor institutions have closed down',
      'Assuming the student already paid cash'
    ],
    correctAnswer: 1,
    explanation: 'The assumptive close frames next steps smoothly around logistics (e.g., batch scheduling or portal setup) rather than debating interest.'
  },
  {
    id: 'final-q14',
    section: 'coreKnowledge',
    marks: 2,
    question: '14. What does "Pipeline Hygiene" mean for a high-performing education counsellor?',
    options: [
      'Washing your computer desk twice a day',
      'Regularly updating statuses, discarding dead invalid numbers, and keeping call tasks scheduled with zero overdue items',
      'Keeping all leads in "In Progress" indefinitely to look busy',
      'Deleting any lead who asks for a syllabus'
    ],
    correctAnswer: 1,
    explanation: 'Pipeline hygiene ensures high focus on real opportunities by keeping records current and removing dead prospects.'
  },
  {
    id: 'final-q15',
    section: 'coreKnowledge',
    marks: 2,
    question: '15. Which of the following is an ethical way to present graduate employment statistics?',
    options: [
      'Claiming 100% of all students get hired at $200k regardless of attendance or effort',
      'Citing verified average placement rates, typical hiring partners, and the specific commitment criteria expected of learners',
      'Refusing to discuss job statistics because they are confidential',
      'Copying employment reports from a different university'
    ],
    correctAnswer: 1,
    explanation: 'Ethical institutions provide transparent cohort placement data and clarify student responsibility.'
  },
  {
    id: 'final-q16',
    section: 'coreKnowledge',
    marks: 2,
    question: '16. How does flexible installment / EMI financing aid in overcoming price resistance?',
    options: [
      'It converts an intimidating lump-sum tuition into manageable monthly payments that fit within a learner’s salary buffer',
      'It makes the course completely free forever',
      'It prevents the student from needing to study',
      'It guarantees a scholarship without an application'
    ],
    correctAnswer: 0,
    explanation: 'EMI plans align the cost of education with the student’s monthly cashflow, removing upfront capital barriers.'
  },
  {
    id: 'final-q17',
    section: 'coreKnowledge',
    marks: 2,
    question: '17. What should be done if a student repeatedly misses scheduled Zoom counselling sessions?',
    options: [
      'Spam their phone every 2 minutes with angry alerts',
      'Send a courteous check-in message offering an alternative low-friction medium (e.g., short voice summary or phone call) and ask if their schedule shifted',
      'Report them to law enforcement',
      'Delete their contact without any note'
    ],
    correctAnswer: 1,
    explanation: 'Courteous flexibility addresses the learner’s busy reality and opens lower-friction channels.'
  },
  {
    id: 'final-q18',
    section: 'coreKnowledge',
    marks: 2,
    question: '18. What is the primary role of alumni testimonials during the counselling cycle?',
    options: [
      'To brag about company revenue',
      'To provide relatable social proof that builds confidence for candidates facing similar doubts or career switches',
      'To replace curriculum teaching staff',
      'To verify the student’s identity documents'
    ],
    correctAnswer: 1,
    explanation: 'Prospective learners trust peers who walked the exact same path and overcame similar career transitions.'
  },
  {
    id: 'final-q19',
    section: 'coreKnowledge',
    marks: 2,
    question: '19. What should an education counsellor never do when handling a competitor comparison?',
    options: [
      'Highlight unique mentorship ratios of their own program',
      'Badmouth, insult, or make unsubstantiated claims against the competitor institution',
      'Share details of their own career placement partnerships',
      'Explain differences in practical capstone project scope'
    ],
    correctAnswer: 1,
    explanation: 'Disparaging competitors degrades professional standing and causes prospects to question the counsellor’s integrity.'
  },
  {
    id: 'final-q20',
    section: 'coreKnowledge',
    marks: 2,
    question: '20. What is the hallmark of a growth mindset in an education sales professional?',
    options: [
      'Believing sales talent is strictly genetic and cannot be learned',
      'Viewing objections and missed targets as analytical learning opportunities to refine communication, empathy, and product knowledge',
      'Blaming marketing leads for 100% of failed closures',
      'Refusing to participate in training sessions'
    ],
    correctAnswer: 1,
    explanation: 'Top counsellors treat challenges and lost opportunities as feedback to sharpen their craft.'
  },

  // PART B: SCENARIO-BASED QUESTIONS (5 Questions, 6 marks each)
  {
    id: 'final-q21',
    section: 'scenarioBased',
    marks: 6,
    question: '21. [Scenario] A 26-year-old marketing executive wants to transition into Data Science. During discovery, they express acute fear: "I haven\'t studied mathematics since high school, and I am terrified I will fail the coding modules." What is your optimal response?',
    options: [
      'Dismiss their concern: "Math is easy, anyone can do it, just pay the fee."',
      'Validate their vulnerability, share examples of successful alumni from non-tech backgrounds, and explain the step-by-step preparatory bridge module and 1-on-1 mentor support',
      'Tell them they are unqualified and suggest they stay in marketing forever',
      'Tell them to hire an outside tutor to do their homework for them'
    ],
    correctAnswer: 1,
    explanation: 'Acknowledging emotional apprehension and outlining concrete bridge modules and mentor safety nets resolves self-doubt with empirical proof.'
  },
  {
    id: 'final-q22',
    section: 'scenarioBased',
    marks: 6,
    question: '22. [Scenario] A candidate has completed two in-depth counselling calls, attended a preview masterclass, and says: "I love the program and know I need it, but I just want to wait for 6 months before starting." How should you handle this?',
    options: [
      'Say "Okay, goodbye, I will call you in 6 months."',
      'Explore what will change in 6 months, calculate the opportunity cost of waiting (6 months lost career transition and salary differential), and explore starting with manageable foundational hours now',
      'Threaten that course fees will triple next week',
      'Get angry and accuse them of being lazy'
    ],
    correctAnswer: 1,
    explanation: 'Procrastination is usually disguised fear or inertia. Gently evaluating the opportunity cost of delay versus immediate progress brings clarity.'
  },
  {
    id: 'final-q23',
    section: 'scenarioBased',
    marks: 6,
    question: '23. [Scenario] You call an inbound lead 8 minutes after submission. The prospect answers and says: "I only downloaded the syllabus to read, I don\'t want to be sold anything." How do you pivot?',
    options: [
      'Hang up immediately because they are angry',
      'Respectfully acknowledge: "Understood! I am not here to sell you anything. My role as an academic advisor is simply to ensure you got the exact specialization outline you needed and answer any questions about industry requirements. What prompted you to research this today?"',
      'Argue that they asked for a phone call by entering their number',
      'Launch straight into a scripted promotional discount pitch'
    ],
    correctAnswer: 1,
    explanation: 'Disarming sales resistance by agreeing with them and positioning yourself as a helpful curriculum resource opens a dialogue.'
  },
  {
    id: 'final-q24',
    section: 'scenarioBased',
    marks: 6,
    question: '24. [Scenario] An interested candidate says: "I am ready to enroll, but my father insists online education is a scam and won\'t release my tuition funds." What is your best action plan?',
    options: [
      'Tell the student to argue with their father or borrow money secretly',
      'Offer to conduct a dedicated 3-way conference session with the father to address his institutional accreditation, mentor credentials, and placement transparency concerns',
      'Give up on the enrollment because parents never change their minds',
      'Tell the student that older generations do not understand technology'
    ],
    correctAnswer: 1,
    explanation: 'Respecting the sponsor and offering an empathetic, structured family briefing addresses skepticism with professional legitimacy.'
  },
  {
    id: 'final-q25',
    section: 'scenarioBased',
    marks: 6,
    question: '25. [Scenario] A prospect says: "Competitor Institute X offers the exact same curriculum for 40% lower fees. Why should I pay more for your program?" What is the most effective approach?',
    options: [
      'Tell the prospect that Institute X is a criminal organization',
      'Break down your unique differentiators: 1-on-1 personalized mentorship, verified live capstone client projects, dedicated career coaching, and alumni network strength that low-cost recorded courses lack',
      'Immediately slash your price by 50% to undercut Institute X',
      'Admit that your program is overpriced'
    ],
    correctAnswer: 1,
    explanation: 'Competing on price is a race to the bottom. Educating the prospect on value drivers (live mentorship vs unmonitored videos) reframes the price comparison.'
  },

  // PART C: PRACTICAL COUNSELLING TASKS (5 Questions, 6 marks each)
  {
    id: 'final-q26',
    section: 'practical',
    marks: 6,
    question: '26. [Practical Task] You have a database of 20 leads marked as "RNR - 3 attempts". What structured action plan should you execute today?',
    options: [
      'Delete all 20 leads immediately to save disk storage',
      'Diversify calling time windows across morning/evening slots, send personalized value-add WhatsApp messages (e.g. Masterclass invite or salary guide), and log detailed notes in the CRM',
      'Call each number 30 consecutive times in 10 minutes',
      'Send a generic mass email with no personal greetings'
    ],
    correctAnswer: 1,
    explanation: 'A diversified multi-channel, time-varied approach systematically converts unresponsive leads without spamming.'
  },
  {
    id: 'final-q27',
    section: 'practical',
    marks: 6,
    question: '27. [Practical Task] In your CRM, a candidate notes: "Budget is tight, wants to shift from BPO to Cloud Engineering, very motivated, father is supportive." When executing the closure call, how should you structure the financing discussion?',
    options: [
      'Demand full upfront payment of the annual fee in cash',
      'Lead with a 0% interest monthly EMI plan, breaking the cost down to a daily coffee equivalent, and connect it directly to the 2.5x salary uplift typical of cloud engineers',
      'Tell them education is only for wealthy candidates',
      'Do not mention fees at all and hope they forget'
    ],
    correctAnswer: 1,
    explanation: 'Structuring EMI financing alongside ROI mathematics addresses cashflow constraints while reinforcing life-changing career upside.'
  },
  {
    id: 'final-q28',
    section: 'practical',
    marks: 6,
    question: '28. [Practical Task] You are 2 days away from monthly target deadline, needing 2 more enrollments. You have 5 "Warm - Thinking" prospects in your pipeline. What is your priority action?',
    options: [
      'Sit back and hope two of them decide to enroll online independently',
      'Conduct a targeted review of each prospect’s isolated objection, offer time-bound batch orientation privileges or scholarship hold waivers, and schedule definitive closing calls with each candidate and sponsor',
      'Cold call 500 new unverified phone numbers from the internet',
      'Complain to your manager that the target is unrealistic'
    ],
    correctAnswer: 1,
    explanation: 'Focusing on warm, late-stage pipeline with personalized, time-sensitive closing calls is the highest probability method to close target gaps.'
  },
  {
    id: 'final-q29',
    section: 'practical',
    marks: 6,
    question: '29. [Practical Task] A prospect says: "Send me everything on WhatsApp and I will look at it over the weekend." How do you secure a firm commitment without losing momentum?',
    options: [
      'Say "Sure thing, bye!" and send 12 unstructured links',
      'Agree warmly, curate 2 specific high-impact assets (e.g., syllabus PDF & relevant alumnus interview), and lock in a specific 10-minute follow-up slot: "I will send that right now! Let’s connect on Monday at 11 AM after you have reviewed it—does morning or afternoon suit you better?"',
      'Refuse to send anything unless they pay a deposit right now',
      'Call them every 3 hours over the weekend to check if they read it'
    ],
    correctAnswer: 1,
    explanation: 'Honoring their request while mutually locking in a scheduled calendar appointment maintains control and prevents the lead from going cold.'
  },
  {
    id: 'final-q30',
    section: 'practical',
    marks: 6,
    question: '30. [Practical Task] You are conducting a post-call self-audit. Your connect rate is high (60%), but discovery-to-pitch conversion is low (15%). What does this diagnostic tell you about where to adjust your technique?',
    options: [
      'Your phone speaker is broken',
      'You are likely rushing discovery, pitching generic features too early, and failing to uncover deep emotional pain points that make the learner want to hear the solution',
      'The leads are completely fake',
      'You should speak three times faster'
    ],
    correctAnswer: 1,
    explanation: 'High connection but low engagement indicates the opening hook connects, but discovery fails to build rapport or diagnose real learner motivation before pitching.'
  }
];
