export const lesson31 = {
  id: 31,
  unitId: 8,
  title: "Banking & Services",
  description: "Learn essential terminology for banking, and master comparative structures like 'as...as' and 'not as...as' in detail.",
  explanation: {
    intro: "أهلاً بك في الدرس الحادي والثلاثين! سنتحدث اليوم عن 'الخدمات المصرفية والمعاملات البنكية' (Banking & Services)، وسنراجع ونعمق فهمنا لصيغ المقارنة المتساوية وغير المتساوية باستخدام: as...as و not as...as للتعبير عن المقارنات المالية.",
    sections: [
      {
        title: "1. Equative Comparisons: 'as...as' & 'not as...as' (مقارنة التساوي وعدم التساوي)",
        content: "- **as + صفة + as (متساوي مع):** تستخدم لتوضيح أن شيئين متطابقين في صفة معينة. مثال: The interest rate at Bank A is **as high as** Bank B. (سعر الفائدة في البنك أ متساوي مع البنك ب).\n- **not as + صفة + as (ليس مثل / غير متساوٍ):** تعبر عن أن الشيء الأول أقل في الصفة من الثاني (وهي شائعة جداً وبديلة لـ less than). مثال: Transferring money at the branch is **not as fast as** using the app. (تحويل الفلوس من الفرع مش سريع وسهل زي استخدام التطبيق أونلاين)."
      },
      {
        title: "2. Banking terms (مصطلحات بنكية هامة)",
        content: "- **To make a deposit** (يودع فلوس في حسابه).\n- **To withdraw money** (يسحب فلوس من ماكينة ATM).\n- **Interest rate** (سعر الفائدة المئوية)."
      }
    ]
  },
  vocabulary: [
    { id: 3311, word: "bank account", type: "noun", translation: "حساب بنكي", example: "I need to open a new bank account.", exampleTranslation: "محتاج أفتح حساب بنكي جديد." },
    { id: 3312, word: "loan", type: "noun/verb", translation: "قرض مالي / يقرض", example: "He applied for a loan to buy a flat.", exampleTranslation: "هو قدم على قرض عشان يشتري شقة." },
    { id: 3313, word: "interest rate", type: "noun", translation: "سعر الفائدة البنكية", example: "The interest rate on this loan is 5%.", exampleTranslation: "سعر الفائدة على القرض ده 5%." },
    { id: 3314, word: "ATM", type: "noun", translation: "ماكينة الصراف الآلي لسحب النقود", example: "Is there an ATM near the hotel?", exampleTranslation: "هل فيه ماكينة صراف آلي (ATM) قريبة من الفندق؟" },
    { id: 3315, word: "deposit", type: "verb/noun", translation: "يودع مالاً / وديعة مالية", example: "You can deposit checks at this machine.", exampleTranslation: "تقدر تودع الشيكات في الماكينة دي." },
    { id: 3316, word: "withdraw", type: "verb", translation: "يسحب نقوداً من الحساب", example: "I want to withdraw some cash.", exampleTranslation: "عايز أسحب شوية فلوس كاش." },
    { id: 3317, word: "transfer", type: "verb/noun", translation: "يحوّل مالاً / تحويل مالي", example: "I will transfer the money to your account.", exampleTranslation: "أنا هحول الفلوس لحسابك البنكي." },
    { id: 3318, word: "teller", type: "noun", translation: "موظف الخزينة / الصراف في البنك", example: "The bank teller was very helpful.", exampleTranslation: "موظف الخزينة في البنك كان متعاون جداً." },
    { id: 3319, word: "fee", type: "noun", translation: "رسوم مصرفية أو مالية", example: "There is no fee for online transfers.", exampleTranslation: "مفيش أي رسوم إضافية للتحويلات أونلاين." },
    { id: 3320, word: "branch", type: "noun", translation: "فرع البنك أو الشركة", example: "Where is the nearest branch of your bank?", exampleTranslation: "فين أقرب فرع للبنك بتاعك؟" }
  ],
  dialogue: {
    title: "Opening an Account",
    lines: [
      { speaker: "Client", text: "Hello, I want to open a bank account. What are the requirements?", translation: "أهلاً، أنا عايز أفتح حساب بنكي. إيه هي الطلبات والأوراق المطلوبة؟" },
      { speaker: "Teller", text: "Hello. You just need your ID card and a minimum deposit. The process is not as long as it used to be.", translation: "أهلاً بك. محتاج بس بطاقة الرقم القومي وإيداع حد أدنى للفلوس. الإجراءات مابقتش بتاخد وقت طويل زي زمان." },
      { speaker: "Client", text: "Great. Can I also apply for a loan here? What is the interest rate?", translation: "جميل. هل أقدر أقدم على قرض هنا برضه؟ وسعر الفائدة كام؟" },
      { speaker: "Teller", text: "The interest rate on this loan is 8%. It is as low as any other branch, but you can also apply online without fees.", translation: "سعر الفائدة على القرض ده 8%. وهي منخفضة ومساوية لأي فرع تاني، بس تقدر تقدم برضه أونلاين بدون رسوم إضافية." }
    ]
  },
  practice: {
    listening: [
      { text: "My new bank is as good as the old one.", options: ["as good as", "good as", "better as"], answer: "as good as", hint: "تعبير عن التساوي التام في المقارنة" },
      { text: "This ATM is not as fast as the other one.", options: ["not as fast as", "not fast than", "less fast than"], answer: "not as fast as", hint: "تعبير عن عدم التساوي ويعني أن الأولى أبطأ" },
      { text: "I want to withdraw some cash.", options: ["withdraw", "deposit", "transfer"], answer: "withdraw", hint: "سحب النقود الكاش من الماكينة أو البنك" }
    ],
    speaking: [
      { text: "I need to open a new bank account", translation: "أحتاج إلى فتح حساب مصرفي جديد." },
      { text: "The bank teller was very helpful", translation: "كان موظف البنك متعاوناً للغاية." }
    ],
    reading: {
      passage: "Modern banking services have changed completely over the last few years. Today, visiting a local branch to make a deposit or transfer money is not as common as using mobile apps. Most customers prefer using an ATM to withdraw cash because it is fast and has no fee. When clients need a large amount of money, they consult a bank teller or apply for a loan. However, interest rates on loans are not as low as they were in the past.",
      questions: [
        { q: "Is visiting a bank branch still common today?", options: ["No, it is not as common as using mobile apps", "Yes, it is the only way", "It is banned now"], answer: "No, it is not as common as using mobile apps", explanation: "تذكر الفقرة أن زيارة الفرع لم تعد شائعة مثل استخدام التطبيقات الذكية." },
        { q: "Why do customers prefer using an ATM?", options: ["Because it is fast and has no fee", "Because it gives loans", "Because it has solar energy"], answer: "Because it is fast and has no fee", explanation: "يفضل العملاء ماكينات الصراف الآلي لأنها سريعة وبدون رسوم إضافية." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (سعر الفائدة بيكون منخفض زي السنة اللي فاتت.)", words: ["as last year. / as low / The interest rate / is"], correct: ["The interest rate", "is", "as low", "as last year."] },
      { prompt: "أكمل الفراغ: The transaction fee online is not as high ___ (as / than / of) at the branch.", placeholder: "as", answer: "as" }
    ]
  }
};
