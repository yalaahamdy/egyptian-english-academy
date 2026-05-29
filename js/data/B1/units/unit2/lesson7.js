export const lesson7 = {
  id: 7,
  unitId: 2,
  title: "Language Learning",
  description: "Explore the best strategies for learning languages and master the use of Relative Pronouns 'who', 'which', and 'that'.",
  explanation: {
    intro: "مرحباً بك في الدرس السابع! سنتحدث اليوم عن 'تعلم اللغات' (Language Learning) وأفضل الطرق الفعالة لاكتساب اللغات، وسنتعلم قاعدة ربط الجمل باستخدام ضمائر الوصل (Relative Pronouns): who و which و that.",
    sections: [
      {
        title: "1. Relative Clauses: 'who', 'which', 'that' (ضمائر الوصل)",
        content: "نستخدم ضمائر الوصل لربط جملتين معاً لإعطاء معلومات إضافية عن الفاعل أو المفعول وتجنب التكرار:\n- **Who:** تستخدم للحديث عن الأشخاص (العاقل). مثال: The teacher who taught me was great. (المعلم الذي علمني كان رائعاً).\n- **Which:** تستخدم للأشياء والحيوانات (غير العاقل). مثال: I bought a dictionary which helps me. (اشتريت قاموساً يساعدني).\n- **That:** تستخدم للعاقل وغير العاقل في الجمل التعريفية (Informal). مثال: The app that I use is free."
      },
      {
        title: "2. Tips for Fluency (نصائح لطلاقة اللسان)",
        content: "- **To acquire a language** (اكتساب اللغة بشكل طبيعي وليس مجرد حفظ قواعد).\n- **To have a natural accent** (امتلاك لهجة أو نطق طبيعي ومفهوم).\n- **To practice pronunciation** (ممارسة نطق الحروف والكلمات)."
      }
    ]
  },
  vocabulary: [
    { id: 3061, word: "fluency", type: "noun", translation: "الطلاقة والسهولة في التحدث", example: "Fluency requires daily practice.", exampleTranslation: "الطلاقة في الكلام بتحتاج ممارسة يومية." },
    { id: 3062, word: "accent", type: "noun", translation: "اللهجة / طريقة نطق الكلمات", example: "He speaks with an American accent.", exampleTranslation: "هو بيتكلم بلهجة أمريكية." },
    { id: 3063, word: "pronunciation", type: "noun", translation: "نطق الكلمات مخارج الحروف", example: "Check the pronunciation in the dictionary.", exampleTranslation: "راجع نطق الكلمة في القاموس." },
    { id: 3064, word: "memorize", type: "verb", translation: "يحفظ عن ظهر قلب", example: "Do not just memorize rules, use them.", exampleTranslation: "ما تحفظش القواعد وخلاص، استخدمها في جمل." },
    { id: 3065, word: "acquire", type: "verb", translation: "يكتسب مهارة أو لغة", example: "Children acquire languages easily.", exampleTranslation: "الأطفال بيكتسبوا اللغات بسهولة وبشكل طبيعي." },
    { id: 3066, word: "translate", type: "verb", translation: "يترجم", example: "Can you translate this sentence for me?", exampleTranslation: "ممكن تترجم لي الجملة دي؟" },
    { id: 3067, word: "bilingual", type: "adjective", translation: "ثنائي اللغة يتحدث لغتين بطلاقة", example: "She is bilingual in Arabic and English.", exampleTranslation: "هي بتتكلم لغتين بطلاقة (العربي والإنجليزي)." },
    { id: 3068, word: "input", type: "noun", translation: "المدخلات اللغوية (استماع وقراءة)", example: "Listening is a crucial input for learning.", exampleTranslation: "الاستماع هو مدخل لغوي أساسي ومهم للتعلم." },
    { id: 3069, word: "vocabulary", type: "noun", translation: "المفردات والكلمات", example: "You need to expand your vocabulary.", exampleTranslation: "أنت محتاج تزود وتوسع حصيلة الكلمات بتاعتك." },
    { id: 3070, word: "subtitle", type: "noun", translation: "ترجمة الأفلام المكتوبة أسفل الشاشة", example: "I watch movies with English subtitles.", exampleTranslation: "بتفرج على الأفلام بترجمة مكتوبة بالإنجليزي." }
  ],
  dialogue: {
    title: "How to Learn English",
    lines: [
      { speaker: "Yasmine", text: "How did you get such a good accent in English, Karim?", translation: "إزاي جبت النطق واللهجة الحلوة دي في الإنجليزي يا كريم؟" },
      { speaker: "Karim", text: "I have been watching videos that have native speakers. It helped me acquire the language.", translation: "أنا بقالي فترة بتفرج على فيديوهات فيها متحدثين أصليين. ده ساعدني أكتسب اللغة بشكل طبيعي." },
      { speaker: "Yasmine", text: "That is smart. I have a friend who memorizes 20 words a day, but she cannot speak.", translation: "ده ذكاء فعلاً. أنا عندي صاحبة بتحفظ 20 كلمة في اليوم، بس مش بتعرف تتكلم." },
      { speaker: "Karim", text: "Yes, because lists which are just translated do not build fluency. She should practice speaking.", translation: "أيوة، لأن القوائم المترجمة بس مش بتبني طلاقة لسان. لازم تمارس الكلام." }
    ]
  },
  practice: {
    listening: [
      { text: "The candidate who won was very happy.", options: ["who", "which", "whose"], answer: "who", hint: "يستخدم للعاقل (الأشخاص)" },
      { text: "This is the dictionary which I bought.", options: ["which", "who", "whom"], answer: "which", hint: "يستخدم لغير العاقل (الأشياء)" },
      { text: "The student that studies hard succeeds.", options: ["that", "which", "whom"], answer: "that", hint: "يمكن استخدامه بدلاً من who للعاقل في الجمل التعريفية" }
    ],
    speaking: [
      { text: "Fluency requires daily practice", translation: "الطلاقة تتطلب ممارسة يومية." },
      { text: "Can you translate this sentence for me", translation: "هل يمكنك ترجمة هذه الجملة لي؟" }
    ],
    reading: {
      passage: "Language learning is an active process that requires patience and practice. To achieve fluency, learners need plenty of input, which means listening to podcasts and reading articles. Memorizing lists of words is not enough; you should learn how to use them in context. Many bilingual people recommend watching movies with English subtitles to improve pronunciation and acquire a natural accent. Finding a partner who can practice speaking with you is also highly beneficial.",
      questions: [
        { q: "What does input mean in language learning?", options: ["Listening and reading", "Speaking and writing", "Memorizing grammar"], answer: "Listening and reading", explanation: "المدخلات (input) تشمل الاستماع والقراءة وفقاً لما ذكرته الفقرة." },
        { q: "What is recommended to improve accent and pronunciation?", options: ["Watching movies with English subtitles", "Translating every word", "Ignoring native speakers"], answer: "Watching movies with English subtitles", explanation: "ينصح الخبراء بمشاهدة الأفلام بترجمة إنجليزية لتحسين النطق واللهجة." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (البنت اللي بتتكلم لغتين هي أختي.)", words: ["my sister / is / bilingual / who / is / The girl"], correct: ["The", "girl", "who", "is", "bilingual", "is", "my sister"] },
      { prompt: "أكمل الفراغ: This is the book ___ (which / who / whose) helped me pass the exam.", placeholder: "which", answer: "which" }
    ]
  }
};
