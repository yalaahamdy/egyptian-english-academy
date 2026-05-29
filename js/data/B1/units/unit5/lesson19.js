export const lesson19 = {
  id: 19,
  unitId: 5,
  title: "Natural Disasters",
  description: "Discuss safety during natural disasters and learn the basic structure of the Past Perfect Simple tense.",
  explanation: {
    intro: "مرحباً بك في الدرس التاسع عشر! سنتحدث اليوم عن 'الكوارث الطبيعية والإخلاء لحالات الطوارئ' (Natural Disasters)، وسنتعلم أساسيات زمن الماضي التام البسيط (Past Perfect Simple) الذي نستخدمه لترتيب الأحداث في الماضي.",
    sections: [
      {
        title: "1. Past Perfect Simple (الماضي التام البسيط)",
        content: "يتكون هذا الزمن من: `had + التصريف الثالث للفعل (Past Participle)`.\nنستخدمه للحديث عن حدث وقع وانتهى في الماضي **قبل** حدث آخر في الماضي أيضاً. يعني هو الحدث الأقدم زمنياً:\n- **مثال:**\n  - By the time the rescue team arrived, the flood **had stopped**. (قبل ما فريق الإنقاذ يوصل، كان الفيضان وقف بالفعل - توقف الفيضان هو الحدث الأقدم لذا وضع في الماضي التام)."
      },
      {
        title: "2. Key linking words for Past Perfect (الروابط الزمنية)",
        content: "غالباً ما يستخدم مع روابط مثل:\n- **Before** (قبل): He had left the house before the hurricane started.\n- **After** (بعد): After the earthquake had struck, we evacuated the building."
      }
    ]
  },
  vocabulary: [
    { id: 3181, word: "natural disaster", type: "noun", translation: "كارثة طبيعية", example: "Tsunamis are dangerous natural disasters.", exampleTranslation: "أمواج التسونامي كوارث طبيعية خطيرة جداً." },
    { id: 3182, word: "earthquake", type: "noun", translation: "زلزال", example: "The earthquake shook the entire city.", exampleTranslation: "الزلزال هز المدينة كلها." },
    { id: 3183, word: "flood", type: "noun/verb", translation: "فيضان / يفيض", example: "Heavy rain caused a massive flood.", exampleTranslation: "المطر الغزير سبب فيضان ضخم." },
    { id: 3184, word: "hurricane", type: "noun", translation: "إعصار", example: "The hurricane destroyed many coastal homes.", exampleTranslation: "الإعصار دمر بيوت كتير على الساحل." },
    { id: 3185, word: "evacuation", type: "noun", translation: "إجلاء السكان من منطقة الخطر", example: "The government ordered a fast evacuation.", exampleTranslation: "الحكومة أمرت بعملية إجلاء سريعة للسكان." },
    { id: 3186, word: "emergency", type: "noun", translation: "حالة طوارئ", example: "Call this number in case of emergency.", exampleTranslation: "اتصل بالرقم ده في حالة الطوارئ." },
    { id: 3187, word: "damage", type: "noun/verb", translation: "تلف وخسائر / يدمر ويتلف", example: "The storm caused severe damage.", exampleTranslation: "العاصفة سببت تلف وخسائر شديدة." },
    { id: 3188, word: "strike", type: "verb", translation: "يضرب (للكوارث أو العواصف)", example: "The disaster might strike at any time.", exampleTranslation: "الكارثة ممكن تضرب في أي وقت." },
    { id: 3189, word: "relief", type: "noun", translation: "إغاثة ومساعدات إنسانية", example: "Relief teams arrived with food and medicine.", exampleTranslation: "فرق الإغاثة وصلت ومعاها أكل وأدوية." },
    { id: 3190, word: "survive", type: "verb", translation: "ينجو من الموت / يعيش", example: "They managed to survive the freezing cold.", exampleTranslation: "نجحوا في النجاة من البرد القارس." }
  ],
  dialogue: {
    title: "The Flood Experience",
    lines: [
      { speaker: "Omar", text: "Did you hear about the massive flood in the south yesterday?", translation: "سمعت عن الفيضان الضخم اللي حصل في الجنوب امبارح؟" },
      { speaker: "Hana", text: "Yes, it was terrible. Fortunately, most families had evacuated before the flood struck their homes.", translation: "أيوة، كان فظيع جداً. لحسن الحظ، معظم العائلات كانت أخلت بيوتها قبل ما الفيضان يضربها." },
      { speaker: "Omar", text: "That is a relief. Did the emergency teams arrive quickly?", translation: "الحمد لله ده يطمن. هل فرق الطوارئ وصلت بسرعة؟" },
      { speaker: "Hana", text: "Yes, by the time they arrived, local volunteers had already started the rescue work.", translation: "أيوة، ولما وصلوا كان المتطوعين المحليين بدأوا بالفعل أعمال الإنقاذ." }
    ]
  },
  practice: {
    listening: [
      { text: "The rain had stopped before we went out.", options: ["had stopped", "has stopped", "was stopping"], answer: "had stopped", hint: "الحدث الأقدم في الماضي (الماضي التام)" },
      { text: "We evacuated after the alarm had rung.", options: ["had rung", "has rung", "rang"], answer: "had rung", hint: "الحدث الأقدم هو رنين الإنذار، لذا نستخدم الماضي التام" },
      { text: "This is a security emergency.", options: ["emergency", "relief", "evacuation"], answer: "emergency", hint: "حالة طارئة تتطلب تدخلاً فورياً" }
    ],
    speaking: [
      { text: "Call this number in case of emergency", translation: "اتصل بهذا الرقم في حالة الطوارئ." },
      { text: "The earthquake shook the entire city", translation: "هز الزلزال المدينة بأكملها." }
    ],
    reading: {
      passage: "Natural disasters like earthquakes, floods, and hurricanes can strike without warning and cause massive damage. Preparing for an emergency is vital for survival. During the hurricane last year, the government ordered an immediate evacuation of coastal areas. By the time the storm hit the city, most residents had already moved to safe shelters. Relief organizations arrived the next day to help survivors and distribute clean water and medical aid.",
      questions: [
        { q: "What did the residents do before the storm hit?", options: ["Moved to safe shelters", "Stayed in coastal homes", "Went to work"], answer: "Moved to safe shelters", explanation: "أخلت معظم العائلات منازلها وانتقلت للملاجئ الآمنة قبل وصول العاصفة." },
        { q: "When did relief organizations arrive?", options: ["The next day", "One week later", "Before the storm"], answer: "The next day", explanation: "وصلت منظمات الإغاثة والمساعدة في اليوم التالي." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (قبل ما يوصل الإعصار، إحنا كنا مشينا.)", words: ["arrived / we / left / had / before / the hurricane"], correct: ["we", "had", "left", "before", "the hurricane", "arrived"] },
      { prompt: "أكمل الفراغ: By the time the police came, the thief ___ (had escaped / has escaped / escapes).", placeholder: "had escaped", answer: "had escaped" }
    ]
  }
};
