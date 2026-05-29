export const lesson1 = {
  id: 1,
  unitId: 1,
  title: "Job Interviews",
  description: "Learn to answer common job interview questions and distinguish between the Present Perfect and Past Simple tenses.",
  explanation: {
    intro: "أهلاً بيك في أول دروس المستوى B1! النهاردة هنتكلم عن موضوع مهم جداً وهو مقابلات العمل (Job Interviews)، وإزاي تجاوب على الأسئلة بثقة وتختار الزمن الصح لما تتكلم عن خبراتك السابقة.",
    sections: [
      {
        title: "1. Present Perfect vs Past Simple (المضارع التام ضد الماضي البسيط)",
        content: "ده من أهم الفروق في قواعد B1:\n- نستخدم **Past Simple** لما نتكلم عن حدث بدأ وانتهى في وقت محدد في الماضي. مثلاً: I finished my university in 2022. (التاريخ محدد).\n- نستخدم **Present Perfect** لما نتكلم عن خبرة أو حدث في الماضي بدون تحديد وقت معين، أو حدث ليه تأثير على الحاضر. مثلاً: I have worked as a developer for three years. (الخبرة مستمرة أو تأثيرها موجود)."
      },
      {
        title: "2. Key Interview Phrases (عبارات المقابلة الأساسية)",
        content: "للإجابة عن نقاط قوتك وخبراتك:\n- **I have experience in...** (عندي خبرة في...)\n- **I am responsible for...** (أنا مسؤول عن...)\n- **I managed to...** (نجحت في أن...)"
      }
    ]
  },
  vocabulary: [
    { id: 3001, word: "applicant", type: "noun", translation: "متقدم لوظيفة", example: "The applicant was very confident.", exampleTranslation: "المتقدم للوظيفة كان واثق جداً من نفسه." },
    { id: 3002, word: "strengths", type: "noun", translation: "نقاط القوة", example: "What are your greatest strengths?", exampleTranslation: "إيه هي أكبر نقاط قوتك؟" },
    { id: 3003, word: "weaknesses", type: "noun", translation: "نقاط الضعف", example: "We all have strengths and weaknesses.", exampleTranslation: "كلنا عندنا نقاط قوة ونقاط ضعف." },
    { id: 3004, word: "experience", type: "noun", translation: "خبرة", example: "I have five years of experience.", exampleTranslation: "عندي خمس سنين خبرة." },
    { id: 3005, word: "background", type: "noun", translation: "خلفية معرفية / مهنية", example: "Tell me about your academic background.", exampleTranslation: "كلمني عن خلفيتك الأكاديمية." },
    { id: 3006, word: "qualifications", type: "noun", translation: "مؤهلات", example: "She has the right qualifications for the job.", exampleTranslation: "هي عندها المؤهلات المناسبة للوظيفة دي." },
    { id: 3007, word: "achieve", type: "verb", translation: "يحقق / ينجز", example: "How did you achieve your sales goals?", exampleTranslation: "إزاي حققت أهداف المبيعات بتاعتك؟" },
    { id: 3008, word: "skill set", type: "noun", translation: "مجموعة المهارات", example: "He has a diverse skill set.", exampleTranslation: "هو عنده مجموعة مهارات متنوعة." },
    { id: 3009, word: "hire", type: "verb", translation: "يوظف / يشغّل", example: "We decided to hire a new designer.", exampleTranslation: "قررنا نوظف مصمم جديد." },
    { id: 3010, word: "candidate", type: "noun", translation: "مرشح لوظيفة", example: "He is the best candidate for the role.", exampleTranslation: "هو أفضل مرشح للدور ده." }
  ],
  dialogue: {
    title: "The Job Interview",
    lines: [
      { speaker: "Interviewer", text: "Welcome to our company. Can you tell me about your background?", translation: "أهلاً بيك في شركتنا. ممكن تقولي عن خلفيتك المهنية؟" },
      { speaker: "Candidate", text: "Sure. I have worked in marketing for three years. In 2024, I managed a big campaign.", translation: "أكيد. أنا اشتغلت في التسويق لمدة تلات سنين. وفي سنة 2024، أدرت حملة كبيرة." },
      { speaker: "Interviewer", text: "Great. What are your greatest strengths?", translation: "ممتاز. إيه هي أكبر نقاط قوتك؟" },
      { speaker: "Candidate", text: "I believe my strengths are problem-solving and communication. I achieved all my targets last year.", translation: "أعتقد إن نقاط قوتي هي حل المشكلات والتواصل. وحققت كل أهدافي السنة اللي فاتت." }
    ]
  },
  practice: {
    listening: [
      { text: "I have worked here since 2023.", options: ["since", "for", "in"], answer: "since", hint: "تستخدم مع بداية نقطة زمنية محددة في المضارع التام" },
      { text: "He finished his project last week.", options: ["finished", "has finished", "finishes"], answer: "finished", hint: "الزمن الماضي البسيط لوجود كلمة last week" },
      { text: "She is a strong candidate.", options: ["candidate", "applicant", "employee"], answer: "candidate", hint: "مرشح مؤهل للوظيفة" }
    ],
    speaking: [
      { text: "I have five years of experience", translation: "لدي خمس سنوات من الخبرة." },
      { text: "What are your greatest strengths", translation: "ما هي أعظم نقاط قوتك؟" }
    ],
    reading: {
      passage: "Amr is an applicant for the marketing position. He had a job interview yesterday. The interviewer asked him about his qualifications and work history. Amr explained that he has worked in advertising for four years. During the interview, he discussed his main strengths, which are teamwork and creativity. Last year, he achieved a 20% increase in sales for his previous employer. The company was very impressed and decided to hire him.",
      questions: [
        { q: "What position did Amr apply for?", options: ["Marketing position", "Sales manager", "Web designer"], answer: "Marketing position", explanation: "تقدم عمرو لوظيفة في مجال التسويق." },
        { q: "How long has Amr worked in advertising?", options: ["Four years", "Three years", "Five years"], answer: "Four years", explanation: "ذكر عمرو أنه عمل في الدعاية والإعلان لمدة أربع سنوات." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (أنا أدرت حملة كبيرة في سنة 2024.)", words: ["campaign / I / in 2024 / a big / managed"], correct: ["I", "managed", "a big", "campaign", "in 2024"] },
      { prompt: "أكمل الفراغ: We decided to ___ (hire / hired) a new developer yesterday.", placeholder: "hire", answer: "hire" }
    ]
  }
};
