export const lesson30 = {
  id: 30,
  unitId: 8,
  title: "E-commerce & Fraud",
  description: "Discuss online shopping safety and master the use of linking words like 'however', 'although', and 'therefore'.",
  explanation: {
    intro: "أهلاً بك في الدرس الثلاثين! سنتحدث اليوم عن 'التسوق الإلكتروني ومخاطر النصب والاحتيال' (E-commerce & Fraud)، وهنتعلم إزاي نربط الجمل ببعضها باستخدام كلمات الربط (Linking Words): however و although و therefore للتعبير عن التناقض أو النتيجة.",
    sections: [
      {
        title: "1. Linking Words for Contrast: 'although' & 'however' (كلمات الربط للتناقض والتعارض)",
        content: "نستخدم هذه الكلمات لربط جملتين بينهما تعارض أو تناقض في المعنى:\n- **Although (بالرغم من أن):** تأتي في بداية الجملة أو وسطها لربط التعارض. مثال: **Although** the website looked professional, it was a scam. (بالرغم من أن الموقع كان شكله احترافي، إلا إنه كان موقع نصاب).\n- **However (ومع ذلك / ولكن):** تستخدم لبدء جملة جديدة تعارض الجملة السابقة، وتوضع بعدها فاصلة (comma). مثال: I wanted to buy the item. **However**, I realized it was too expensive."
      },
      {
        title: "2. Linking Words for Cause and Result: 'therefore' (كلمات الربط للسبب والنتيجة)",
        content: "- **Therefore (بناءً على ذلك / وبالتالي):** تستخدم لتوضيح نتيجة حدث سابق، وتأتي لتبدأ جملة جديدة مع فاصلة. مثال: The transaction failed. **Therefore**, we did not receive the delivery."
      }
    ]
  },
  vocabulary: [
    { id: 310, word: "e-commerce", type: "noun", translation: "التجارة الإلكترونية", example: "E-commerce is growing very fast.", exampleTranslation: "التجارة الإلكترونية بتكبر بسرعة كبيرة جداً." },
    { id: 311, word: "fraud", type: "noun", translation: "النصب والاحتيال المالي", example: "Internet fraud is a major crime.", exampleTranslation: "النصب والاحتيال على الإنترنت جريمة كبيرة." },
    { id: 312, word: "scam", type: "noun/verb", translation: "عملية نصب / ينصب على", example: "This cheap website is a scam.", exampleTranslation: "الموقع الرخيص ده عبارة عن عملية نصب." },
    { id: 313, word: "transaction", type: "noun", translation: "معاملة مالية (تحويل أو دفع)", example: "The online transaction was secure.", exampleTranslation: "المعاملة المالية أونلاين كانت آمنة." },
    { id: 314, word: "credit card", type: "noun", translation: "بطاقة الائتمان / الفيزا كارد", example: "Never share your credit card details.", exampleTranslation: "أبداً ما تشاركش بيانات كارت الائتمان بتاعك." },
    { id: 315, word: "delivery", type: "noun", translation: "التوصيل والشحن", example: "How much is the delivery fee?", exampleTranslation: "تكلفة خدمة التوصيل والشحن كام؟" },
    { id: 316, word: "item", type: "noun", translation: "المنتج / السلعة المباعة", example: "The item was damaged during delivery.", exampleTranslation: "المنتج تالف وحصل فيه تلف أثناء الشحن والتوصيل." },
    { id: 317, word: "reliable", type: "adjective", translation: "موثوق ويعتمد عليه", example: "Buy only from reliable online shops.", exampleTranslation: "اشتري بس من مواقع التسوق أونلاين الموثوقة." },
    { id: 318, word: "refund", type: "noun/verb", translation: "استرداد الأموال", example: "I requested a refund for the damaged item.", exampleTranslation: "طلبت استرداد الفلوس عشان السلعة التالفة." },
    { id: 319, word: "secure", type: "adjective", translation: "آمن ومحمي", example: "Make sure the payment gateway is secure.", exampleTranslation: "تأكد إن بوابة الدفع الإلكتروني آمنة ومحمية." }
  ],
  dialogue: {
    title: "Online Shopping Scam",
    lines: [
      { speaker: "Heba", text: "Look at this amazing jacket. It is only ten dollars on this new website.", translation: "بصي على الجاكيت التحفة ده. سعره عشرة دولار بس على الموقع الجديد ده." },
      { speaker: "Yara", text: "Although the price is very cheap, the website is not reliable. I think it is a scam.", translation: "بالرغم من إن السعر رخيص جداً، بس الموقع ده مش موثوق. أعتقد إنه عملية نصب." },
      { speaker: "Heba", text: "But the transaction gateway looks secure. They accept credit cards.", translation: "بس بوابة الدفع والمعاملات شكلها آمن. وبيقبلوا كروت الائتمان." },
      { speaker: "Yara", text: "Many people didn't receive their items from it. Therefore, you should avoid it and protect your card.", translation: "ناس كتير ما استلمتش المنتجات بتاعتها منه. وبالتالي، لازم تتجنبيه وتحمي كارتك." }
    ]
  },
  practice: {
    listening: [
      { text: "Although the phone was cheap, it was very good.", options: ["Although", "However", "Therefore"], answer: "Although", hint: "تأتي في بداية الجملة لربط فكرتين متعارضتين بدون فواصل بعدها مباشرة" },
      { text: "The item was fake. Therefore, I asked for a refund.", options: ["Therefore", "Although", "But"], answer: "Therefore", hint: "تستخدم لتوضيح نتيجة حدث سابق وتأتي في بداية الجملة الجديدة مع فاصلة" },
      { text: "Internet fraud is very dangerous.", options: ["fraud", "delivery", "transaction"], answer: "fraud", hint: "عمليات النصب والاحتيال والسرقة المالية" }
    ],
    speaking: [
      { text: "Never share your credit card details", translation: "لا تشارك أبداً تفاصيل بطاقتك الائتمانية." },
      { text: "E commerce is growing very fast", translation: "التجارة الإلكترونية تنمو بسرعة كبيرة." }
    ],
    reading: {
      passage: "E-commerce has made shopping very convenient. Although it has many benefits, online shopping also carries risks of fraud. Scams are very common on social media platforms. Therefore, buyers must be careful when sharing their credit card details. Always buy from reliable websites that use a secure payment transaction. If you receive a damaged item or if the delivery is canceled, contact the seller immediately to ask for a full refund.",
      questions: [
        { q: "What is a main risk of e-commerce?", options: ["Online fraud and scams", "Fast delivery", "Cheap prices"], answer: "Online fraud and scams", explanation: "أبرز مخاطر التجارة الإلكترونية هو النصب والاحتيال (fraud & scams)." },
        { q: "What should you do if you get a damaged item?", options: ["Ask for a full refund", "Keep it and say nothing", "Throw it in the trash"], answer: "Ask for a full refund", explanation: "توصي الفقرة بالتواصل مع البائع لطلب استرداد كامل للمال (refund)." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (بالرغم من إنه كان غالي، أنا اشتريت الموبايل.)", words: ["expensive, / I bought / the phone / Although / it was"], correct: ["Although", "it was", "expensive,", "I bought", "the phone"] },
      { prompt: "أكمل الفراغ: The transaction was not secure. ___ (Therefore / Although / However), my credit card was blocked by the bank.", placeholder: "Therefore", answer: "Therefore" }
    ]
  }
};
