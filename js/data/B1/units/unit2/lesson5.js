export const lesson5 = {
  id: 5,
  unitId: 2,
  title: "Academic Life",
  description: "Learn vocabulary related to university and studies, and understand the usage of Gerunds and Infinitives.",
  explanation: {
    intro: "أهلاً بك في الوحدة الثانية والدرس الخامس! سنتحدث اليوم عن 'الحياة الأكاديمية والجامعية' (Academic Life)، وسنتعرف على واحدة من أهم القواعد وهي استخدامات Gerunds (اسم المصدر المنتهي بـ -ing) و Infinitives (المصدر المسبوق بـ to).",
    sections: [
      {
        title: "1. Gerunds vs Infinitives (اسم المصدر والمصدر الكامل)",
        content: "بعض الأفعال في الإنجليزية يأتي بعدها دائماً فعل بـ **-ing** (Gerund)، وأفعال أخرى يأتي بعدها دائماً **to + المصدر** (Infinitive):\n- **أفعال يتبعها Gerund (-ing):** avoid (يتجنب), enjoy (يستمتع), suggest (يقترح), admit (يعترف). مثال: I enjoy studying in the library.\n- **أفعال يتبعها Infinitive (to + verb):** decide (يقرر), hope (يأمل), promise (يعد), agree (يوافق). مثال: I decided to enroll in this course."
      },
      {
        title: "2. Verbs with both (أفعال تقبل الاثنين)",
        content: "هناك أفعال تقبل الحالتين بدون تغيير كبير في المعنى مثل start, begin, love, like. مثال: I started working أو I started to work."
      }
    ]
  },
  vocabulary: [
    { id: 3041, word: "campus", type: "noun", translation: "الحرم الجامعي", example: "Our campus has a huge library.", exampleTranslation: "الحرم الجامعي بتاعنا فيه مكتبة ضخمة." },
    { id: 3042, word: "assignment", type: "noun", translation: "واجب دراسي / مهمة مكلف بها", example: "I must submit the assignment tonight.", exampleTranslation: "لازم أسلم الواجب الليلة دي." },
    { id: 3043, word: "scholarship", type: "noun", translation: "منحة دراسية", example: "He won a scholarship to study in Germany.", exampleTranslation: "هو كسب منحة دراسية عشان يدرس في ألمانيا." },
    { id: 3044, word: "tuition", type: "noun", translation: "مصاريف الدراسة", example: "University tuition is rising every year.", exampleTranslation: "مصاريف الجامعة بتزيد كل سنة." },
    { id: 3045, word: "lecture", type: "noun/verb", translation: "محاضرة / يلقي محاضرة", example: "The chemistry lecture starts at nine.", exampleTranslation: "محاضرة الكيمياء بتبدأ الساعة تسعة." },
    { id: 3046, word: "degree", type: "noun", translation: "شهادة جامعية / درجة علمية", example: "She earned a degree in computer science.", exampleTranslation: "هي حصلت على شهادة جامعية في علوم الكمبيوتر." },
    { id: 3047, word: "enroll", type: "verb", translation: "يسجل اسم في دراسة / يلتحق بـ", example: "I want to enroll in the English course.", exampleTranslation: "عايز أسجل في كورس الإنجليزي." },
    { id: 3048, word: "major", type: "noun/verb", translation: "التخصص الدراسي / يتخصص في", example: "My major is business administration.", exampleTranslation: "تخصصي الدراسي هو إدارة الأعمال." },
    { id: 3049, word: "graduate", type: "verb/noun", translation: "يتخرج / خريج", example: "I will graduate next year.", exampleTranslation: "أنا هأتخرج السنة الجاية." },
    { id: 3050, word: "academic", type: "adjective", translation: "أكاديمي / دراسي", example: "The academic year begins in September.", exampleTranslation: "السنة الدراسية بتبدأ في سبتمبر." }
  ],
  dialogue: {
    title: "University Decisions",
    lines: [
      { speaker: "Karim", text: "Hi Ramy, are you planning to enroll in the summer semester?", translation: "أهلاً يا رامي، هل بتخطط تسجل في الترم الصيفي؟" },
      { speaker: "Ramy", text: "No, I decided to apply for a scholarship instead. I hope to get it.", translation: "لا، أنا قررت أقدم على منحة دراسية بدلاً من ده. وأتمنى أقبل فيها." },
      { speaker: "Karim", text: "That is great! I know the tuition is very expensive. What is your major?", translation: "جميل جداً! أنا عارف إن مصاريف الدراسة غالية أوي. تخصصك إيه؟" },
      { speaker: "Ramy", text: "I major in software engineering. I enjoy solving coding problems.", translation: "تخصصي هندسة برمجيات. وبستمتع بحل مشكلات البرمجة." }
    ]
  },
  practice: {
    listening: [
      { text: "I decided to study abroad.", options: ["to study", "studying", "study"], answer: "to study", hint: "الفعل decide يتبعه دائماً to + المصدر" },
      { text: "She avoids walking late.", options: ["walking", "to walk", "walk"], answer: "walking", hint: "الفعل avoid يتبعه دائماً اسم مصدر ينتهي بـ -ing" },
      { text: "The campus is very large.", options: ["campus", "tuition", "degree"], answer: "campus", hint: "المساحة الجغرافية والمباني التابعة للجامعة" }
    ],
    speaking: [
      { text: "I want to enroll in the English course", translation: "أريد التسجيل في دورة اللغة الإنجليزية." },
      { text: "I will graduate next year", translation: "سأتخرج العام القادم." }
    ],
    reading: {
      passage: "Academic life at university can be challenging but exciting. Students have to manage their time well to finish every assignment on time. Most students hope to graduate with a high degree to get good job prospects. However, university tuition can be very expensive, which is why many students try to win a scholarship. On campus, there are many lectures every day, and students must choose their major carefully based on their interests and skills.",
      questions: [
        { q: "Why do students try to win scholarships?", options: ["Because tuition is expensive", "Because they do not like campus", "To avoid graduation"], answer: "Because tuition is expensive", explanation: "يسعى الطلاب للحصول على منح دراسية لأن مصاريف الجامعة مرتفعة للغاية." },
        { q: "What should students carefully choose?", options: ["Their major", "Their clothes", "Their commute"], answer: "Their major", explanation: "يجب على الطلاب اختيار تخصصهم الدراسي بعناية." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (أنا استمتعت بحضور المحاضرة النهارده.)", words: ["today / attending / enjoyed / I / the lecture"], correct: ["I", "enjoyed", "attending", "the lecture", "today"] },
      { prompt: "أكمل الفراغ: We hope ___ (to visit / visiting / visit) the university library soon.", placeholder: "to visit", answer: "to visit" }
    ]
  }
};
