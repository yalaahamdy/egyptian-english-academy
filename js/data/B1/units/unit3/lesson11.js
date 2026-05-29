export const lesson11 = {
  id: 11,
  unitId: 3,
  title: "Tech Support",
  description: "Learn vocabulary for solving technical problems and master the First Conditional structure.",
  explanation: {
    intro: "مرحباً بك في الدرس الحادي عشر! سنتحدث اليوم عن 'الدعم الفني ومشاكل الأجهزة' (Tech Support)، وهنتعلم قاعدة الشرط الأول (First Conditional) للتعبير عن أحداث محتملة الحدوث في المستقبل ونتائجها المتوقعة.",
    sections: [
      {
        title: "1. First Conditional (حالة الشرط الأولى)",
        content: "نستخدم الحالة الأولى للشرط للتعبير عن مواقف حقيقية أو محتملة في المستقبل ونتائجها:\n- **التركيبة:** `If + المضارع البسيط (Present Simple) -> will + المصدر (Infinitive)`.\n- **أمثلة:**\n  - If you restart your computer, it **will work** faster. (لو عملت ريستارت للكمبيوتر، هيشتغل أسرع).\n  - If they do not back up their files, they **will lose** them."
      },
      {
        title: "2. Conditional Clauses variations (تغيير الترتيب)",
        content: "يمكن أن نبدأ بجملة النتيجة أولاً بدون استخدام الفاصلة (comma):\n- The computer **will crash** if you open too many apps."
      }
    ]
  },
  vocabulary: [
    { id: 3101, word: "crash", type: "verb/noun", translation: "يتعطل فجأة / انهيار النظام", example: "The system will crash if it overheats.", exampleTranslation: "النظام هيعطل ويقفل لو حرارته زادت." },
    { id: 3102, word: "install", type: "verb", translation: "يثبت برنامج / يسطب", example: "I need to install the latest antivirus.", exampleTranslation: "محتاج أسطب برنامج مكافحة الفيروسات الأخير." },
    { id: 3103, word: "restart", type: "verb", translation: "يعيد التشغيل / يعمل ريستارت", example: "Restart the device to apply changes.", exampleTranslation: "اعمل ريستارت للجهاز عشان تطبق التغييرات." },
    { id: 3104, word: "backup", type: "noun/verb", translation: "نسخة احتياطية / يأخذ نسخة احتياطية", example: "Always make a backup of your data.", exampleTranslation: "دايماً اعمل نسخة احتياطية من بياناتك." },
    { id: 3105, word: "connection", type: "noun", translation: "اتصال بالشبكة", example: "The internet connection is unstable.", exampleTranslation: "اتصال الإنترنت غير مستقر النهارده." },
    { id: 3106, word: "settings", type: "noun", translation: "الإعدادات", example: "Go to settings to change the language.", exampleTranslation: "روح للإعدادات عشان تغير اللغة." },
    { id: 3107, word: "virus", type: "noun", translation: "فيروس إلكتروني", example: "My laptop got a virus from a link.", exampleTranslation: "اللاب توب بتاعي جاله فيروس من لينك فتحته." },
    { id: 3108, word: "manual", type: "noun", translation: "كتيب التعليمات / دليل المستخدم", example: "Read the manual before setting up the device.", exampleTranslation: "اقرأ كتيب التعليمات قبل ما تشغل وتظبط الجهاز." },
    { id: 3109, word: "resolve", type: "verb", translation: "يحل مشكلة", example: "We managed to resolve the network issue.", exampleTranslation: "نجحنا في حل مشكلة الشبكة." },
    { id: 3110, word: "troubleshoot", type: "verb", translation: "يستكشف الأخطاء وإصلاحها", example: "I will help you troubleshoot the connection.", exampleTranslation: "أنا هساعدك تستكشف وتصلح مشكلة الاتصال." }
  ],
  dialogue: {
    title: "Fixing a Laptop",
    lines: [
      { speaker: "Client", text: "Hello, my laptop screen froze, and I think it has a virus. Can you help?", translation: "أهلاً، شاشة اللاب توب بتاعي اتجمدت، وبتهيألي فيه فيروس. ممكن مساعدة؟" },
      { speaker: "Support", text: "Sure. If you hold the power button, the computer will restart. Try that first.", translation: "أكيد. لو فضلت دايس على زرار الباور، الكمبيوتر هيعمل ريستارت. جرب ده الأول." },
      { speaker: "Client", text: "Okay, I did it. It is working now, but should I install this program?", translation: "تمام، عملت كده. هو شغال حالياً، بس هل أسطب البرنامج ده؟" },
      { speaker: "Support", text: "No, if you install it, you will get a virus. Please read the security manual I sent.", translation: "لا، لو طبته هيجيلك فيروس. لو سمحت اقرأ دليل الأمان اللي بعتهولك." }
    ]
  },
  practice: {
    listening: [
      { text: "If it rains, we will stay at home.", options: ["rains", "will rain", "rained"], answer: "rains", hint: "جملة if الشرطية في الحالة الأولى تأتي في زمن المضارع البسيط" },
      { text: "You will lose data if you do not save.", options: ["will lose", "lose", "loses"], answer: "will lose", hint: "جملة النتيجة تأتي مع will + المصدر" },
      { text: "Always make a backup.", options: ["backup", "settings", "manual"], answer: "backup", hint: "نسخة احتياطية للبيانات" }
    ],
    speaking: [
      { text: "Always make a backup of your data", translation: "احرص دائماً على أخذ نسخة احتياطية من بياناتك." },
      { text: "Go to settings to change the language", translation: "اذهب إلى الإعدادات لتغيير اللغة." }
    ],
    reading: {
      passage: "Technical problems are common in the digital age. If your computer crashes, you should not panic. Often, if you restart the device, the problem will be resolved. If the issue is with the internet connection, check your router settings. To protect your laptop, you must install an antivirus to prevent any virus attack. Finally, remember that if you do not back up your data, you will lose important files during a system failure. Read the product manual for more tips.",
      questions: [
        { q: "What should you do if your computer crashes?", options: ["Restart the device", "Throw it away", "Install a virus"], answer: "Restart the device", explanation: "تذكر الفقرة أن إعادة تشغيل الجهاز غالباً ما تحل المشكلة." },
        { q: "Why is an antivirus necessary?", options: ["To prevent virus attacks", "To speed up the internet", "To delete files"], answer: "To prevent virus attacks", explanation: "يُثبت مضاد الفيروسات لحماية الجهاز من هجمات الفيروسات." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (لو عملت ريستارت، الجهاز هيشتغل كويس.)", words: ["work / it / will / restart / If / you / well"], correct: ["If", "you", "restart", "it", "will", "work", "well"] },
      { prompt: "أكمل الفراغ: If you click this link, the system ___ (will crash / crashes / crashed).", placeholder: "will crash", answer: "will crash" }
    ]
  }
};
