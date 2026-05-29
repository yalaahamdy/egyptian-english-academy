export const lesson52 = {
  id: 52,
  unitId: 13,
  title: "Customer Relations",
  description: "Master customer service communication and review Reported Speech rules with tense shifts.",
  explanation: {
    intro: "أهلاً بك في الدرس الثاني والخمسين ونهاية الوحدة الثالثة عشر! سنتحدث اليوم عن 'علاقات العملاء وخدمة العملاء' (Customer Relations). كمان هنعمل مراجعة شاملة وقوية على نقل الكلام (Reported Speech: Statements & Questions) مع التركيز على تغيير الأزمنة وترتيب الكلمات في الأسئلة المنقولة.",
    sections: [
      {
        title: "1. Reported Statements with Tense Shifts (نقل الجمل الخبرية وتغيير الأزمنة)",
        content: "عند نقل الكلام الذي قيل في الماضي، نقوم بإرجاع زمن الفعل خطوة إلى الماضي:\n- المضارع البسيط يصبح ماضي بسيط: \"I need help.\" -> He said he **needed** help.\n- المضارع المستمر يصبح ماضي مستمر: \"I am waiting.\" -> She said she **was waiting**.\n- الماضي البسيط والمضارع التام يصبح ماضي تام: \"I received the package.\" -> He said he **had received** the package.\n- Will تصبح would، و can تصبح could: \"I will call back.\" -> She said she **would call** back."
      },
      {
        title: "2. Reported Questions (نقل الأسئلة)",
        content: "عند نقل الأسئلة، نستخدم فعل السؤال *ask* ونحول ترتيب الجملة ليكون الفاعل قبل الفعل (ترتيب جملة عادية وليس سؤال)، ولا نستخدم أفعالاً مساعدة مثل do/does/did:\n- **أسئلة نعم/لا (Yes/No Questions):** نستخدم *if* أو *whether*.\n  - Direct: \"Are you satisfied?\" -> He asked **if** I **was** satisfied.\n- **الأسئلة الاستفهامية (Wh- Questions):** نستخدم نفس أداة الاستفهام.\n  - Direct: \"Where is the representative?\" -> She asked **where** the representative **was**."
      }
    ]
  },
  vocabulary: [
    { id: 3521, word: "loyalty", type: "noun", translation: "الولاء / الوفاء للماركة", example: "Customer loyalty is built on trust and good service.", exampleTranslation: "ولاء العملاء بيتبني على الثقة والخدمة الجيدة." },
    { id: 3522, word: "client", type: "noun", translation: "العميل / الزبون المتعاقد", example: "We have a meeting with an important client today.", exampleTranslation: "عندنا اجتماع مع عميل مهم النهاردة." },
    { id: 3523, word: "complaint", type: "noun", translation: "شكوى من منتج أو خدمة", example: "The manager resolved the customer's complaint.", exampleTranslation: "المدير حل شكوى العميل." },
    { id: 3524, word: "satisfaction", type: "noun", translation: "الرضا / الارتياح والقبول", example: "Our goal is to ensure complete customer satisfaction.", exampleTranslation: "هدفنا هو ضمان رضا العملاء الكامل." },
    { id: 3525, word: "handle", type: "verb", translation: "يتعامل مع مشكلة / يحل", example: "She knows how to handle angry clients.", exampleTranslation: "هي بتعرف إزاي تتعامل مع العملاء الغاضبين." },
    { id: 3526, word: "query", type: "noun", translation: "استفسار / سؤال محدد", example: "I sent an email to answer the client's query.", exampleTranslation: "بعت إيميل للرد على استفسار العميل." },
    { id: 3527, word: "solve", type: "verb", translation: "يحل مشكلة أو لغزاً", example: "We need to solve this billing issue quickly.", exampleTranslation: "محتاجين نحل مشكلة الفواتير دي بسرعة." },
    { id: 3528, word: "support", type: "noun/verb", translation: "الدعم والمساعدة / يدعم ويؤيد", example: "Customer support is available 24/7.", exampleTranslation: "دعم العملاء متاح على مدار الساعة طوال أيام الأسبوع." },
    { id: 3529, word: "polite", type: "adjective", translation: "مهذب / خلوق ولطيف", example: "Always be polite when answering client queries.", exampleTranslation: "دايماً خليك مهذب وأنت بترد على استفسارات العملاء." },
    { id: 3530, word: "representative", type: "noun", translation: "مندوب / ممثل الشركة", example: "Speak to a customer service representative.", exampleTranslation: "اتكلم مع ممثل خدمة العملاء." }
  ],
  dialogue: {
    title: "Handling the Client Issue",
    lines: [
      { speaker: "Sarah", text: "Kareem, did you handle the complaint from our key client this morning?", translation: "يا كريم، هل اتعاملت مع الشكوى بتاعة العميل الرئيسي بتاعنا النهاردة الصبح؟" },
      { speaker: "Kareem", text: "Yes, I did. The client said that he had not received his order yet.", translation: "أيوة، حصل. العميل قال إنه لسه مستلمش الطلب بتاعه لحد دلوقتي." },
      { speaker: "Sarah", text: "Okay. And what did he ask you regarding the delivery?", translation: "تمام. وسألك عن إيه بخصوص التوصيل؟" },
      { speaker: "Kareem", text: "He asked when the delivery would arrive. I solved the query politely and assured him.", translation: "هو سأل إيمتى الدليفري هيوصل. أنا حليت الاستفسار بأدب وطمنته." }
    ]
  },
  practice: {
    listening: [
      { text: "He said he was waiting for the package.", options: ["was waiting", "is waiting", "has waited"], answer: "was waiting", hint: "عند نقل جملة مضارع مستمر في الماضي تتحول إلى ماضي مستمر (was waiting)" },
      { text: "She asked if I received the email.", options: ["if", "what", "that"], answer: "if", hint: "لنقل سؤال نعم/لا نستخدم الرابط if" },
      { text: "They asked where the office was.", options: ["was", "is", "were"], answer: "was", hint: "في الأسئلة المنقولة، نضع الفاعل قبل الفعل والزمن يرجع للماضي" }
    ],
    speaking: [
      { text: "Customer loyalty is built on trust and good service", translation: "ولاء العملاء يبنى على الثقة والخدمة الجيدة." },
      { text: "He asked when the delivery would arrive", translation: "هو سأل متى سيصل التوصيل." }
    ],
    reading: {
      passage: "Excellent customer relations are essential for building brand loyalty. When a client contacts support with a complaint or a query, the customer service representative must handle the situation in a polite and helpful way. Solving problems quickly leads to high customer satisfaction. In training, representatives are taught to document client interactions: for instance, reporting that a client asked if the delivery was free, or that they said they were very happy with the service.",
      questions: [
        { q: "What should a representative do when a client has a complaint?", options: ["Handle the situation politely", "Ignore the query", "Blame the customer"], answer: "Handle the situation politely", explanation: "يجب على ممثل خدمة العملاء التعامل مع الموقف بأدب." },
        { q: "What does fast problem-solving lead to?", options: ["High customer satisfaction", "Losing clients", "Technical errors"], answer: "High customer satisfaction", explanation: "حل المشكلات بسرعة يؤدي إلى رضا العملاء المرتفع." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات لتركيب السؤال المنقول: (هي سألتني أنا ساكن فين.)", words: ["lived. / where / She / asked / I / me"], correct: ["She", "asked", "me", "where", "I", "lived."] },
      { prompt: "أكمل الجملة بصيغة الكلام المنقول الصحيحة: Direct: \"I will help you,\" Ahmed said. -> Reported: Ahmed said he ___ (would help / will help / helps) me.", placeholder: "would help", answer: "would help" }
    ]
  }
};
