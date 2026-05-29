export const lesson25 = {
  id: 25,
  unitId: 7,
  title: "Medical Symptoms",
  description: "Learn terminology for physical symptoms and medical advice, and review modal verbs of necessity 'need to', 'have to', and 'must'.",
  explanation: {
    intro: "أهلاً بك في الوحدة السابعة والدرس الخامس والعشرين! سنتحدث اليوم عن 'الأعراض الطبية وزيارة الطبيب' (Medical Symptoms)، وسنراجع ونعمق فهمنا لكيفية التعبير عن الضرورة والالتزام والنصيحة الطبية القوية باستخدام: must و have to و need to.",
    sections: [
      {
        title: "1. Must, Have to, Need to for Medical Advice (التعبير عن الضرورة الطبية)",
        content: "عند الحديث عن الصحة والأدوية، نستخدم هذه الأفعال للتعبير عن درجات مختلفة من الضرورة:\n- **Must (إلزام قوي / نصيحة حاسمة):** للتأكيد على أهمية الدواء أو الإجراء. مثال: You **must** finish the whole course of antibiotics. (لازم تكمل كورس المضاد الحيوي للآخر).\n- **Have to (إلزام خارجي / قواعد طبية):** مثال: I **have to** take this medicine after meals. (مضطر آخد الدواء ده بعد الأكل بناء على تعليمات الطبيب).\n- **Need to (حاجة وضرورة شخصية):** تعبر عن حاجة ملحة. مثال: You **need to** rest for a few days."
      },
      {
        title: "2. Lack of necessity (عدم وجود ضرورة)",
        content: "- نستخدم **don't need to** أو **don't have to** للتعبير عن أن الشيء غير ضروري (براحتك). مثال: You **don't need to** take this medicine if you feel better."
      }
    ]
  },
  vocabulary: [
    { id: 3241, word: "symptom", type: "noun", translation: "عَرَض مرضي", example: "Fever is a common symptom of flu.", exampleTranslation: "السخونية عَرَض شائع للإنفلونزا." },
    { id: 3242, word: "headache", type: "noun", translation: "صداع في الرأس", example: "I have a terrible headache today.", exampleTranslation: "عندي صداع فظيع النهارده." },
    { id: 3243, word: "fever", type: "noun", translation: "حمى / ارتفاع درجة الحرارة", example: "You must go to the doctor if you have a fever.", exampleTranslation: "لازم تروح للدكتور لو عندك سخونية وحمى." },
    { id: 3244, word: "cough", type: "noun/verb", translation: "كحة وسعال / يكح", example: "Drinking warm lemon water helps a cough.", exampleTranslation: "شرب المية الدافية بالليمون بيساعد في علاج الكحة." },
    { id: 3245, word: "prescription", type: "noun", translation: "روشتة العلاج الطبية", example: "The pharmacist processed my prescription.", exampleTranslation: "الصيدلي جهز وصرف الروشتة الطبية بتاعتي." },
    { id: 3246, word: "treatment", type: "noun", translation: "العلاج / طريقة التعامل الطبي", example: "This clinic offers advanced treatment.", exampleTranslation: "العيادة دي بتقدم علاج متطور." },
    { id: 3247, word: "infection", type: "noun", translation: "عدوى مرضيّة", example: "Wash your hands to prevent infection.", exampleTranslation: "اغسل إيدك عشان تمنع العدوى." },
    { id: 3248, word: "recovery", type: "noun", translation: "التعافي والشفاء", example: "We wish you a fast recovery.", exampleTranslation: "بنتمنالك شفاء وتعافي سريع." },
    { id: 3249, word: "consult", type: "verb", translation: "يستشير طبيباً أو خبيراً", example: "You need to consult a specialist.", exampleTranslation: "أنت محتاج تستشير طبيب متخصص." },
    { id: 3250, word: "pharmacy", type: "noun", translation: "الصيدلية", example: "I will buy the medicine from the pharmacy.", exampleTranslation: "هشتري الدواء من الصيدلية." }
  ],
  dialogue: {
    title: "At the Clinic",
    lines: [
      { speaker: "Doctor", text: "Hello, what are your symptoms today?", translation: "أهلاً بك، إيه هي الأعراض اللي عندك النهارده؟" },
      { speaker: "Patient", text: "I have a severe headache, a cough, and a high fever since yesterday.", translation: "عندي صداع شديد، وكحة، وسخونية عالية من امبارح." },
      { speaker: "Doctor", text: "I see. You have a throat infection. You need to rest, and you must take this medicine twice a day.", translation: "تمام. عندك احتقان وعدوى في الزور. محتاج ترتاح، ولازم تاخد الدواء ده مرتين في اليوم." },
      { speaker: "Patient", text: "Do I have to come back next week?", translation: "هل مضطر أرجع وأكشف تاني الأسبوع الجاي؟" },
      { speaker: "Doctor", text: "No, you don't have to return if you recover fully. Go to the pharmacy to get the prescription.", translation: "لا، مش مضطر ترجع لو خفيت واتعافيت تماماً. روح الصيدلية عشان تصرف الروشتة." }
    ]
  },
  practice: {
    listening: [
      { text: "You must take this medicine.", options: ["must", "must to", "should to"], answer: "must", hint: "يأتي بعده الفعل في المصدر بدون to للتعبير عن إلزام طبي قوي" },
      { text: "You don't need to pay, it is free.", options: ["don't need to", "mustn't", "need not to"], answer: "don't need to", hint: "تعبير عن عدم وجود ضرورة لشيء ما" },
      { text: "This is a prescription from the doctor.", options: ["prescription", "pharmacy", "treatment"], answer: "prescription", hint: "الورقة المكتوب فيها الأدوية من الطبيب" }
    ],
    speaking: [
      { text: "We wish you a fast recovery", translation: "نتمنى لك شفاءً عاجلاً." },
      { text: "Wash your hands to prevent infection", translation: "اغسل يديك للوقاية من العدوى." }
    ],
    reading: {
      passage: "Health is our most valuable asset. When you feel sick and notice unusual symptoms like a headache or a high fever, you should not ignore them. You need to consult a doctor to get the right treatment. The doctor will write a prescription for the medicines you have to take. You must follow the instructions carefully to ensure a quick recovery. Always buy your drugs from a licensed pharmacy and wash your hands to prevent any infection.",
      questions: [
        { q: "What should you do when you notice unusual symptoms?", options: ["Consult a doctor", "Ignore them", "Go to the gym"], answer: "Consult a doctor", explanation: "تذكر الفقرة أنه يجب استشارة الطبيب عند ظهور أعراض غريبة." },
        { q: "Where should you buy your drugs from?", options: ["A licensed pharmacy", "Online store", "A food market"], answer: "A licensed pharmacy", explanation: "يجب شراء الأدوية من صيدلية مرخصة." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (أنا مضطر أغير الضمادة دي كل يوم.)", words: ["bandage / have / to change / every day / I / this"], correct: ["I", "have", "to change", "this", "bandage", "every day"] },
      { prompt: "أكمل الفراغ: You ___ (must not / don't have to) take antibiotics without a doctor's prescription.", placeholder: "must not", answer: "must not" }
    ]
  }
};
