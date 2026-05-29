export const lesson2 = {
  id: 2,
  unitId: 1,
  title: "At the Workplace",
  description: "Learn workplace terminology and how to use the Present Perfect tense with 'already', 'yet', and 'just'.",
  explanation: {
    intro: "مرحباً بك في الدرس الثاني! سنتحدث اليوم عن بيئة العمل اليومية والمهام والمواعيد النهائية (Deadlines)، وكيفية استخدام كلمات مهمة جداً مثل already و yet و just للحديث عن إنجاز المهام.",
    sections: [
      {
        title: "1. Present Perfect with 'already', 'yet', 'just' (المضارع التام مع الكلمات المساعدة)",
        content: "نستخدم هذه الكلمات لتوضيح حالة إنجاز المهام:\n- **Already** (بالفعل): نستخدمها للقول بأن الشيء تم إنجازه قبل الآن (غالباً في الجمل المثبتة). مثال: I have already finished the report.\n- **Yet** (حتى الآن): نستخدمها في الجمل المنفية والاستفهامية للتعبير عن شيء نتوقع حدوثه ولم يحدث بعد. مثال: I haven't sent the email yet. أو Have you finished yet?\n- **Just** (للتو / حالا): تعبر عن حدث انتهى قبل لحظات قليلة جداً. مثال: She has just signed the contract."
      },
      {
        title: "2. Asking about Tasks (السؤال عن المهام)",
        content: "في العمل نستخدم عبارات مثل:\n- **How is the project going?** (أخبار المشروع إيه؟)\n- **Are we on track?** (هل إحنا ماشيين حسب الجدول؟)\n- **I am working on it.** (أنا شغال عليه حالياً.)"
      }
    ]
  },
  vocabulary: [
    { id: 3011, word: "deadline", type: "noun", translation: "الموعد النهائي لتقديم العمل", example: "The deadline is tomorrow at noon.", exampleTranslation: "آخر ميعاد لتسليم الشغل بكره الظهر." },
    { id: 3012, word: "collaboration", type: "noun", translation: "تعاون", example: "This project requires close collaboration.", exampleTranslation: "المشروع ده بيحتاج تعاون وثيق." },
    { id: 3013, word: "feedback", type: "noun", translation: "ملاحظات تقييمية / تغذية راجعة", example: "I need your feedback on this design.", exampleTranslation: "عايز رأيك وملاحظاتك على التصميم ده." },
    { id: 3014, word: "overtime", type: "noun/adverb", translation: "ساعات عمل إضافية", example: "We worked overtime to finish the task.", exampleTranslation: "اشتغلنا وقت إضافي عشان نخلص المهمة." },
    { id: 3015, word: "workload", type: "noun", translation: "عبء العمل / كمية الشغل", example: "She has a heavy workload this week.", exampleTranslation: "هي عندها ضغط شغل كبير الأسبوع ده." },
    { id: 3016, word: "colleague", type: "noun", translation: "زميل عمل", example: "My colleagues are very supportive.", exampleTranslation: "زمايلي في الشغل متعاونين جداً." },
    { id: 3017, word: "shift", type: "noun", translation: "فترة العمل / الوردية", example: "I am working the night shift.", exampleTranslation: "أنا شغال في الوردية الليلية." },
    { id: 3018, word: "performance", type: "noun", translation: "الأداء", example: "His performance has improved a lot.", exampleTranslation: "أداؤه اتحسن كتير جداً." },
    { id: 3019, word: "target", type: "noun", translation: "الهدف المطلق تحقيقه", example: "Did you meet your monthly target?", exampleTranslation: "هل حققت هدفك الشهري؟" },
    { id: 3020, word: "productive", type: "adjective", translation: "إنتاجي / فعال", example: "Today was a very productive day.", exampleTranslation: "النهارده كان يوم إنتاجي ومثمر جداً." }
  ],
  dialogue: {
    title: "Checking Project Status",
    lines: [
      { speaker: "Karim", text: "Hi Mona, have you finished the presentation for the meeting yet?", translation: "أهلاً يا منى، هل خلصتي العرض التقديمي للاجتماع ولا لسه؟" },
      { speaker: "Mona", text: "Yes, I have already sent it to the manager. I just completed it ten minutes ago.", translation: "أهلاً يا كريم، أيوة بعته بالفعل للمدير. لسه مخلصاه حالا من عشر دقايق." },
      { speaker: "Karim", text: "Excellent! The deadline is very tight. How about the financial reports?", translation: "ممتاز! الميعاد النهائي ضيق جداً. وأخبار التقارير المالية إيه؟" },
      { speaker: "Mona", text: "I haven't started them yet. The workload is really heavy today.", translation: "لسه مبدأتش فيهم. عبء الشغل تقيل أوي النهارده." }
    ]
  },
  practice: {
    listening: [
      { text: "Have you sent the email yet?", options: ["yet", "already", "just"], answer: "yet", hint: "تستخدم في الأسئلة لمعرفة ما إذا كان الشيء قد تم أم لا" },
      { text: "I have just finished eating.", options: ["just", "yet", "still"], answer: "just", hint: "تعني أن الفعل حدث قبل وقت قصير جداً" },
      { text: "We have already met our targets.", options: ["already", "yet", "any"], answer: "already", hint: "تستخدم للتأكيد على إنجاز الشيء بالفعل" }
    ],
    speaking: [
      { text: "I have already finished the report", translation: "لقد انتهيت بالفعل من التقرير." },
      { text: "The deadline is tomorrow at noon", translation: "الموعد النهائي غداً ظهراً." }
    ],
    reading: {
      passage: "Working in a team requires constant collaboration and communication. At our office, we hold a weekly meeting to discuss our performance and goals. Every team member has a specific workload. If the workload is too heavy, we sometimes work overtime. It is important to meet every deadline to keep clients happy. Yesterday, the manager gave us positive feedback on our latest design. We have already achieved our target for this month, which makes us feel very productive.",
      questions: [
        { q: "What happens if the workload is too heavy?", options: ["We work overtime", "We ignore the deadlines", "We cancel the meetings"], answer: "We work overtime", explanation: "تذكر الفقرة أنه عندما يكون عبء العمل ثقيلًا، يعمل الفريق أوقاتًا إضافية." },
        { q: "Have they achieved their target for this month?", options: ["Yes, already", "No, not yet", "They do not have a target"], answer: "Yes, already", explanation: "حققت المجموعة أهدافها للشهر الحالي بالفعل." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (منى بعتت العرض للمدير بالفعل.)", words: ["the presentation / Mona / already / has / sent / to the manager"], correct: ["Mona", "has", "already", "sent", "the presentation", "to the manager"] },
      { prompt: "أكمل الفراغ: I have not received the feedback ___ (already / yet / just).", placeholder: "yet", answer: "yet" }
    ]
  }
};
