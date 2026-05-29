export const lesson100 = {
  id: 100,
  unitId: 25,
  title: "Digital Security",
  description: "Discuss digital and cyber security, strong passwords, backup systems, and online scams, and review past modals of deduction (must have, can't have, might have).",
  explanation: {
    intro: "أهلاً بك في الدرس المائة ونهاية الوحدة الخامسة والعشرين! سنتحدث اليوم عن 'الأمن الرقمي' (Digital Security) وحماية البيانات من الاختراقات والبرمجيات الخبيثة. في الجرامر، سنراجع أفعال الاستنتاج في الماضي (Past Modals of Deduction) وكيف نستخدمها للتعبير عن مدى ثقتنا بأحداث الماضي.",
    sections: [
      {
        title: "1. استخدام Must have + V3 (أكيد / من المؤكد أنه حدث)",
        content: "- نستخدمها للتعبير عن استنتاج قوي وشبه مؤكد بنسبة 90% بأن شيئاً ما قد حدث في الماضي بناءً على دليل مادي حالي.\n  - **مثال:** The system got a virus. The technician **must have ignored** the security alert. (الوضع أصابه فيروس. أكيد الفني تجاهل تنبيه الأمان)."
      },
      {
        title: "2. استخدام Can't have + V3 (مستحيل / من غير الممكن أنه حدث)",
        content: "- نستخدمها للتعبير عن استنتاج قوي وشبه مؤكد بأن شيئاً ما مستحيل وقاطع أن يكون قد حدث في الماضي.\n  - **مثال:** He **can't have shared** his password; he knows cyber threat rules. (هو مستحيل يكون شارك كلمة المرور؛ هو يعرف قواعد التهديد السيبراني)."
      },
      {
        title: "3. استخدام Might have / May have / Could have + V3 (احتمال / قد يكون حدث)",
        content: "- نستخدمها للتعبير عن تخمين ضعيف أو احتمال غير مؤكد بنسبة 50% حول حدث ماضي.\n  - **مثال:** I lost my files. I **might have forgotten** to make a backup database. (لقد فقدت ملفاتي. ربما أكون قد نسيت عمل نسخة احتياطية)."
      }
    ]
  },
  vocabulary: [
    { id: 4001, word: "password", type: "noun", translation: "كلمة المرور / الرقم السري", example: "A secure password contains letters, numbers, and symbols.", exampleTranslation: "تحتوي كلمة المرور الآمنة على حروف وأرقام ورموز." },
    { id: 4002, word: "hack", type: "verb/noun", translation: "يخترق نظاماً / عملية اختراق", example: "A hacker tried to hack into the corporate server yesterday.", exampleTranslation: "حاول متسلل اختراق خادم الشركة أمس." },
    { id: 4003, word: "cyber", type: "adjective", translation: "سيبراني / مرتبط بالإنترنت والفضاء الرقمي", example: "Cyber security is a high priority for banks and companies.", exampleTranslation: "الأمن السيبراني هو أولوية قصوى للبنوك والشركات." },
    { id: 4004, word: "protect", type: "verb", translation: "يحمي / يقي", example: "Antivirus software helps protect your computer from threats.", exampleTranslation: "برنامج مكافحة الفيروسات يساعد في حماية جهاز الكمبيوتر الخاص بك من التهديدات." },
    { id: 4005, word: "alert", type: "noun/verb", translation: "تنبيه / ينذر وينبه", example: "We received a security alert about a login from another country.", exampleTranslation: "تلقينا تنبيهاً أمنياً بشأن تسجيل دخول من دولة أخرى." },
    { id: 4006, word: "account", type: "noun", translation: "حساب مستخدم", example: "She blocked her credit card account after discovering a scam.", exampleTranslation: "أغلقت حساب بطاقتها الائتمانية بعد اكتشاف عملية احتيال." },
    { id: 4007, word: "scam", type: "noun/verb", translation: "عملية احتيال إلكتروني / ينصب", example: "That email asking for money is definitely a scam.", exampleTranslation: "هذا البريد الإلكتروني الذي يطلب المال هو بالتأكيد عملية احتيال." },
    { id: 4008, word: "threat", type: "noun", translation: "تهديد / خطر داهم", example: "Phishing links represent a severe cyber threat.", exampleTranslation: "روابط التصيد الاحتيالي تمثل تهديداً سيبرانياً شديداً." },
    { id: 4009, word: "virus", type: "noun", translation: "فيروس برمجيات خبيثة", example: "His tablet was slow because it caught a dangerous virus.", exampleTranslation: "كان جهازه اللوحي بطيئاً لأنه أصيب بفيروس خطير." },
    { id: 4010, word: "backup", type: "noun/verb", translation: "نسخة احتياطية / ينسخ احتياطياً", example: "Always make a backup of your important documents.", exampleTranslation: "قم دائماً بعمل نسخة احتياطية من مستنداتك المهمة." }
  ],
  dialogue: {
    title: "The Security Breach",
    lines: [
      { speaker: "Sarah", text: "Omar, did you hear? Someone tried to hack the company's financial database last night.", translation: "يا عمر، هل سمعت؟ حاول شخص ما اختراق قاعدة البيانات المالية للشركة ليلة أمس." },
      { speaker: "Omar", text: "Oh, that is scary. The cyber security team must have detected the threat early.", translation: "أوه، هذا مخيف. لا بد أن فريق الأمن السيبراني اكتشف التهديد مبكراً (must have detected - استنتاج قوي)." },
      { speaker: "Sarah", text: "Yes, they blocked the account. The hacker can't have accessed any confidential data.", translation: "نعم، لقد أغلقوا الحساب. مستحيل أن يكون المخترق قد وصل إلى أي بيانات سرية (can't have accessed - استنتاج نفي قوي)." },
      { speaker: "Omar", text: "Thank goodness. Some employee might have clicked on a scam link. We should make a backup.", translation: "الحمد لله. ربما يكون أحد الموظفين قد نقر على رابط احتيالي (might have clicked - استنتاج ضعيف). يجب أن نصنع نسخة احتياطية." }
    ]
  },
  practice: {
    listening: [
      { text: "He has a virus on his PC. He must have downloaded a toxic file.", options: ["must have", "can't have", "might not"], answer: "must have", hint: "استنتاج شبه مؤكد لأن الفيروس موجود بالفعل على جهازه" },
      { text: "She can't have clicked on the link; she knows it was a scam.", options: ["can't have", "must have", "might"], answer: "can't have", hint: "استنتاج نفي مؤكد لأنها تعلم أنه احتيال ومستحيل أن تفتحه" },
      { text: "My phone was off. You might have tried calling, but I didn't get any alert.", options: ["might have", "can't have", "must"], answer: "might have", hint: "تخمين ضعيف أو احتمال غير مؤكد (ربما حاولت الاتصال)" }
    ],
    speaking: [
      { text: "The hacker must have bypassed the password using a scam algorithm.", translation: "لا بد أن المخترق تجاوز كلمة المرور باستخدام خوارزمية احتيالية." },
      { text: "They can't have hacked the server because our security is tight.", translation: "مستحيل أن يكونوا قد اخترقوا الخادم لأن أمننا مشدد." }
    ],
    reading: {
      passage: "Cyber security is crucial to protect personal accounts from data theft. Hackers use scam links and viruses to steal sensitive passwords. If an account is hacked, the user must have ignored basic protection guidelines. Fortunately, modern firewalls send alerts when threats are detected. A careful user can't have fallen for simple email scams. Experts recommend making a daily backup of critical files so that even if a threat succeeds, data is safe.",
      questions: [
        { q: "What do hackers use to steal passwords according to the text?", options: ["Scam links and viruses", "Strong backups", "Integrated smart lights"], answer: "Scam links and viruses", explanation: "يوضح النص أن المخترقين يستخدمون الروابط الاحتيالية والفيروسات لسرقة كلمات المرور." },
        { q: "What is recommended to keep data safe in case of a security breach?", options: ["Making a daily backup", "Using weak passwords", "Ignoring security alerts"], answer: "Making a daily backup", explanation: "يذكر النص أن الخبراء يوصون بعمل نسخة احتياطية يومية لحماية البيانات." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات لبناء جملة استنتاج ماضي صحيحة: (لا بد أن المخترق سرق الملفات.)", words: ["The hacker must have stolen", "the files.", "can't have"], correct: ["The hacker must have stolen", "the files."] },
      { prompt: "أكمل الجملة بالخيار الصحيح: They ___ (might have forgotten / must forgetting / can't forgot) to backup the database because everything is lost now.", placeholder: "might have forgotten", answer: "might have forgotten" }
    ]
  }
};
