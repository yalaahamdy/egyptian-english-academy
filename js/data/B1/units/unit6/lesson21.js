export const lesson21 = {
  id: 21,
  unitId: 6,
  title: "Lost in Transition",
  description: "Navigate travel delays and lost items, and review Past Continuous and Past Simple combined sentences.",
  explanation: {
    intro: "أهلاً بك في الوحدة السادسة والدرس الحادي والعشرين! سنتحدث اليوم عن 'مشاكل السفر وتأخر الرحلات وضياع الحقائب' (Lost in Transition)، وسنراجع قاعدة الدمج بين زمن الماضي المستمر (Past Continuous) والماضي البسيط (Past Simple) للتعبير عن أحداث قاطعها حدث آخر في الماضي.",
    sections: [
      {
        title: "1. Past Continuous + Past Simple (الحدث المستمر والحدث المقاطع)",
        content: "نستخدم الماضي المستمر للتعبير عن فعل كان مستمراً في وقت معين في الماضي، والماضي البسيط للتعبير عن حدث أقصر قاطعه فجأة:\n- **الروابط الشائعة:** `When` (عندما) و `While` (بينما / أثناء).\n- **أمثلة:**\n  - I **was waiting** for my luggage when the power **went** out. (كنت مستمر في انتظار شنطي لما الكهرباء قطعت فجأة).\n  - While they **were checking in**, they **realized** they had lost their passports."
      },
      {
        title: "2. Rules for 'while' and 'when' (الفرق بين الروابط)",
        content: "- يتبع **While** دائماً جملة في زمن الماضي المستمر (V-ing). مثال: While I was traveling...\n- يتبع **When** عادة جملة في زمن الماضي البسيط. مثال: When the plane landed..."
      }
    ]
  },
  vocabulary: [
    { id: 3201, word: "delay", type: "noun/verb", translation: "تأخير / يؤجل ويعطل", example: "There is a two-hour delay on our flight.", exampleTranslation: "فيه تأخير ساعتين في الرحلة بتاعتنا." },
    { id: 3202, word: "luggage", type: "noun", translation: "أمتعة وحقائب السفر", example: "I lost my luggage at the airport.", exampleTranslation: "شنط السفر بتاعتي ضاعت في المطار." },
    { id: 3203, word: "miss", type: "verb", translation: "يفوت قطاراً أو طائرة", example: "Hurry up or we will miss the train.", exampleTranslation: "بسرعة وإلا هيفوتنا القطر." },
    { id: 3204, word: "cancel", type: "verb", translation: "يلغي", example: "The airline decided to cancel the flight.", exampleTranslation: "شركة الطيران قررت تلغي الرحلة." },
    { id: 3205, word: "departure", type: "noun", translation: "المغادرة / الإقلاع", example: "Check the departure board for your gate.", exampleTranslation: "بص على لوحة المغادرة عشان تعرف البوابة بتاعتك." },
    { id: 3206, word: "arrival", type: "noun", translation: "الوصول", example: "His arrival was delayed by traffic.", exampleTranslation: "وصوله اتأخر بسبب زحمة المرور." },
    { id: 3207, word: "transit", type: "noun", translation: "العبور المؤقت / الترانزيت", example: "We had a five-hour transit in Dubai.", exampleTranslation: "كان عندنا خمس ساعات ترانزيت في دبي." },
    { id: 3208, word: "passenger", type: "noun", translation: "راكب / مسافر", example: "Passengers must wear seatbelts.", exampleTranslation: "المسافرين لازم يلبسوا أحزمة الأمان." },
    { id: 3209, word: "check-in", type: "noun/verb", translation: "تسجيل الدخول بالمطار أو الفندق", example: "Go to the check-in desk to get your ticket.", exampleTranslation: "روح لمكتب تسجيل الدخول عشان تاخد تذكرتك." },
    { id: 3210, word: "lost and found", type: "noun", translation: "مكتب المفقودات", example: "I went to the lost and found to report my bag.", exampleTranslation: "رحت لمكتب المفقودات عشان أبلغ عن شنطتي." }
  ],
  dialogue: {
    title: "At the Information Desk",
    lines: [
      { speaker: "Passenger", text: "Excuse me, I was waiting for my luggage when the belt stopped. My bag didn't arrive.", translation: "لو سمحت، أنا كنت واقف مستني شنطي لما السير وقف فجأة. شنطتي موصلتش." },
      { speaker: "Agent", text: "I apologize. What is your flight number? Was there a delay in your departure?", translation: "بعتذر لحضرتك. إيه هو رقم الرحلة؟ وهل كان فيه تأخير في الإقلاع؟" },
      { speaker: "Passenger", text: "Yes, our flight was delayed in London. We had to rush during transit.", translation: "أيوة، رحلتنا اتأخرت في لندن. واضطرين نجري بسرعة في الترانزيت." },
      { speaker: "Agent", text: "I understand. While you were boarding the plane, your bag might have missed the connection. Let us check the lost and found.", translation: "متفهم ده. بينما كنت بتركب الطيارة، الشنطة بتاعتك غالباً فاتها ميعاد النقل. يلا نشوف مكتب المفقودات." }
    ]
  },
  practice: {
    listening: [
      { text: "I was sleeping when the phone rang.", options: ["when", "while", "during"], answer: "when", hint: "يأتي بعدها الماضي البسيط الذي قاطع الفعل المستمر" },
      { text: "While we were walking, it started to rain.", options: ["While", "When", "Since"], answer: "While", hint: "يأتي بعدها الماضي المستمر للتعبير عن فعل طويل الأمد" },
      { text: "I reported my lost bag to the agent.", options: ["luggage", "passenger", "arrival"], answer: "luggage", hint: "أمتعة وحقائب السفر المفقودة" }
    ],
    speaking: [
      { text: "I lost my luggage at the airport", translation: "فقدت أمتعتي في المطار." },
      { text: "Hurry up or we will miss the train", translation: "أسرع وإلا سيفوتنا القطار." }
    ],
    reading: {
      passage: "Travel can be stressful when things do not go as planned. Last summer, Tarek was traveling to Paris. While he was waiting at the airport, he heard that his flight had a three-hour delay due to weather. Later, the airline decided to cancel the flight completely. Tarek had to go to the check-in desk to rebook. While the agent was processing his ticket, Tarek realized that he had left his small bag at the transit cafe. He immediately went to the lost and found to report it.",
      questions: [
        { q: "Why was Tarek's flight delayed?", options: ["Due to weather", "Because he missed the plane", "Because of lost luggage"], answer: "Due to weather", explanation: "تأخرت الرحلة بسبب الأحوال الجوية السيئة." },
        { q: "Where did Tarek leave his small bag?", options: ["At the transit cafe", "At the check-in desk", "On the plane"], answer: "At the transit cafe", explanation: "ترك طارق حقيبته الصغيرة في مقهى الترانزيت." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (بينما كنت مسافر، أنا فقدت شنطتي.)", words: ["my bag / I / lost / was / traveling, / While / I"], correct: ["While", "I", "was", "traveling,", "I", "lost", "my bag"] },
      { prompt: "أكمل الفراغ: The passenger was sleeping ___ (when / while / because) the plane landed.", placeholder: "when", answer: "when" }
    ]
  }
};
