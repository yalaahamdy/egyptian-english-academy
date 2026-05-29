export const lesson3 = {
  id: 3,
  unitId: 1,
  title: "Work-Life Balance",
  description: "Understand the concept of work-life balance and learn the difference between State Verbs and Action Verbs.",
  explanation: {
    intro: "أهلاً بك في الدرس الثالث! سنتحدث اليوم عن موضوع حيوي وهو 'التوازن بين الشغل والحياة الشخصية' (Work-Life Balance)، وهنتعلم إزاي نفرق بين أفعال الحالة (State Verbs) وأفعال الحركة (Action Verbs) في القواعد.",
    sections: [
      {
        title: "1. State Verbs vs Action Verbs (أفعال الحالة وأفعال الحركة)",
        content: "في اللغة الإنجليزية، تنقسم الأفعال إلى نوعين:\n- **Action Verbs (أفعال الحركة):** تعبر عن فعل مادي أو نشاط نقوم به، ويمكن استخدامها في الأزمنة المستمرة (Continuous). مثل: run, write, work. مثال: I am working now.\n- **State Verbs (أفعال الحالة):** تعبر عن مشاعر، تفكير، ملكية، أو حواس، وعادةً **لا** تستخدم في الأزمنة المستمرة. مثل: love, know, believe, own, understand, seem. مثال: I know the answer (وليس I am knowing)."
      },
      {
        title: "2. Talking about Well-being (الحديث عن الراحة النفسية والصحة)",
        content: "للتعبير عن الضغط والراحة:\n- **I feel stressed.** (حاسس بالضغط والتوتر.)\n- **I need to disconnect.** (محتاج أفصل عن الشغل شوية.)\n- **To set priorities.** (ترتيب الأولويات.)"
      }
    ]
  },
  vocabulary: [
    { id: 3021, word: "balance", type: "noun/verb", translation: "توازن / يوازن", example: "We must balance work and family.", exampleTranslation: "لازم نوازن بين الشغل والعيلة." },
    { id: 3022, word: "stress", type: "noun/verb", translation: "توتر / ضغط نفسي", example: "Exercise is a good way to reduce stress.", exampleTranslation: "الرياضة طريقة كويسة لتقليل التوتر والضغط." },
    { id: 3023, word: "priority", type: "noun", translation: "أولوية", example: "Health is my top priority.", exampleTranslation: "الصحة هي أولويتي الأولى." },
    { id: 3024, word: "burnout", type: "noun", translation: "الاحتراق النفسي والجسدي من التعب", example: "Long working hours lead to burnout.", exampleTranslation: "ساعات الشغل الطويلة بتؤدي للاحتراق والإنهاك التام." },
    { id: 3025, word: "flexible", type: "adjective", translation: "مرن", example: "I have flexible working hours.", exampleTranslation: "عندي ساعات عمل مرنة." },
    { id: 3026, word: "well-being", type: "noun", translation: "العافية والصحة النفسية والجسدية", example: "We care about the well-being of our staff.", exampleTranslation: "بنهتم بصحة وراحة الموظفين بتوعنا." },
    { id: 3027, word: "disconnect", type: "verb", translation: "يفصل / يبتعد عن التواصل", example: "It is important to disconnect on weekends.", exampleTranslation: "مهم تفصل وتوقف تواصل بالعمل في الويك إند." },
    { id: 3028, word: "hobbies", type: "noun", translation: "هوايات", example: "My hobbies are reading and painting.", exampleTranslation: "هواياتي هي القراءة والرسم." },
    { id: 3029, word: "overwhelmed", type: "adjective", translation: "مغمور بالمشاعر / مجهد جداً من كثرة الشغل", example: "I feel overwhelmed by tasks.", exampleTranslation: "حاسس بضغط وإنهاك بسبب كتر المهام." },
    { id: 3030, word: "leisure", type: "noun", translation: "وقت الفراغ والراحة", example: "I enjoy leisure activities.", exampleTranslation: "بستمتع بأنشطة وقت الفراغ." }
  ],
  dialogue: {
    title: "Avoiding Burnout",
    lines: [
      { speaker: "Sarah", text: "Hi Sherif, you look very tired. Are you okay?", translation: "أهلاً يا شريف، شكلك تعبان أوي. أنت كويس؟" },
      { speaker: "Sherif", text: "Not really. I feel overwhelmed. I have worked overtime every day this week.", translation: "مش أوي بصراحة. حاسس بضغط كبير. اشتغلت وقت إضافي كل يوم الأسبوع ده." },
      { speaker: "Sarah", text: "You need a balance. Your well-being should be a priority. You must disconnect on weekends.", translation: "محتاج تعمل توازن. صحتك وراحتك لازم تكون أولوية. لازم تفصل في الويك إند." },
      { speaker: "Sherif", text: "I know, but I understand the company's situation. I need a more flexible schedule.", translation: "عارف، بس أنا متفهم وضع الشركة. محتاج جدول مواعيد يكون مرن أكتر." }
    ]
  },
  practice: {
    listening: [
      { text: "I understand your point of view.", options: ["understand", "am understanding", "understands"], answer: "understand", hint: "فعل understand هو فعل حالة (State Verb) ولا يمكن استخدامه في المستمر" },
      { text: "He owns a big car.", options: ["owns", "is owning", "own"], answer: "owns", hint: "الملكية تعتبر حالة وليس حركة، لذا نستخدم المضارع البسيط" },
      { text: "I need to reduce my stress.", options: ["stress", "hobbies", "leisure"], answer: "stress", hint: "الضغط والتوتر العصبي" }
    ],
    speaking: [
      { text: "Health is my top priority", translation: "الصحة هي أولويتي القصوى." },
      { text: "I feel overwhelmed by tasks", translation: "أشعر بالإرهاق الشديد بسبب كثرة المهام." }
    ],
    reading: {
      passage: "Achieving a good work-life balance is crucial for your long-term health. Many employees today experience burnout because they work long hours and do not take time to disconnect. Experts advise that personal well-being and family should be your top priority. Having a flexible job can help you manage your time better. Doing hobbies and leisure activities like sports or painting can also reduce stress and help you feel more productive when you return to work.",
      questions: [
        { q: "What is a main cause of burnout?", options: ["Working long hours", "Having hobbies", "Taking vacations"], answer: "Working long hours", explanation: "ساعات العمل الطويلة وعدم الفصل عن العمل يسببان الاحتراق والإنهاك النفسي." },
        { q: "How can hobbies help employees?", options: ["By reducing stress", "By increasing workload", "By making them lazy"], answer: "By reducing stress", explanation: "ممارسة الهوايات تساعد في تقليل التوتر والضغط العصبي." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (الصحة لازم تكون أولوية لكل شخص.)", words: ["everyone / Health / be / a priority / should / for"], correct: ["Health", "should", "be", "a priority", "for", "everyone"] },
      { prompt: "أكمل الفراغ بالكتابة الصحيحة: I ___ (know / am knowing) the new manager since last year.", placeholder: "know", answer: "know" }
    ]
  }
};
