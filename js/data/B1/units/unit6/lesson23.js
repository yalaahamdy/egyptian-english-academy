export const lesson23 = {
  id: 23,
  unitId: 6,
  title: "Tourism & Sightseeing",
  description: "Explore famous landmarks and master the usage of Non-defining Relative Clauses.",
  explanation: {
    intro: "أهلاً بك في الدرس الثالث والعشرين! سنتحدث اليوم عن 'السياحة وزيارة المعالم التاريخية والأثرية' (Tourism & Sightseeing)، وسنتعلم قاعدة متقدمة في القواعد وهي الجمل الموصولة غير التعريفية (Non-defining Relative Clauses) التي تعطي معلومات إضافية غير أساسية.",
    sections: [
      {
        title: "1. Non-defining Relative Clauses (جمل الوصل غير التعريفية)",
        content: "تستخدم هذه الجمل لإعطاء معلومات إضافية (يمكن الاستغناء عنها دون أن يتأثر المعنى الأساسي للجملة)، وتوضع دائماً بين **فاصلتين (commas)**، ولا يمكن استخدام ضمير الوصل `that` فيها بل نستخدم `who` للعاقل و `which` لغير العاقل:\n- **مثال:**\n  - The Pyramids, **which** are located in Giza, are thousands of years old. (الأهرامات، التي تقع في الجيزة، عمرها آلاف السنين - لو حذفنا 'التي تقع في الجيزة' ستظل الجملة مفيدة: الأهرامات عمرها آلاف السنين)."
      },
      {
        title: "2. Speaking about Attractions (الحديث عن المعالم)",
        content: "- **Historical landmarks** (معالم تاريخية بارزة).\n- **Tourist attractions** (أماكن الجذب السياحي).\n- **To buy souvenirs** (شراء الهدايا التذكارية)."
      }
    ]
  },
  vocabulary: [
    { id: 3221, word: "tourism", type: "noun", translation: "السياحة", example: "Tourism is a key industry in Egypt.", exampleTranslation: "السياحة مجال وصناعة رئيسية في مصر." },
    { id: 3222, word: "sightseeing", type: "noun", translation: "زيارة المعالم السياحية ومشاهدتها", example: "We spent the day sightseeing in Rome.", exampleTranslation: "قضينا اليوم في زيارة وتفرج المعالم السياحية في روما." },
    { id: 3223, word: "landmark", type: "noun", translation: "معلم بارز / موقع شهير", example: "The Eiffel Tower is a famous landmark.", exampleTranslation: "برج إيفل هو معلم سياحي شهير جداً." },
    { id: 3224, word: "historical", type: "adjective", translation: "تاريخي", example: "Egypt has many historical monuments.", exampleTranslation: "مصر فيها آثار ومعالم تاريخية كتير." },
    { id: 3225, word: "guide", type: "noun/verb", translation: "مرشد سياحي / يرشد ويوجه", example: "The tour guide explained the history.", exampleTranslation: "المرشد السياحي شرح وتكلم عن التاريخ." },
    { id: 3226, word: "attraction", type: "noun", translation: "مكان جذب سياحي", example: "The museum is a major tourist attraction.", exampleTranslation: "المتحف مكان رئيسي لجذب السياح." },
    { id: 3227, word: "local culture", type: "noun", translation: "الثقافة المحلية والتقاليد للبلد", example: "I love learning about local culture.", exampleTranslation: "بحب أتعلم وأعرف عن الثقافة المحلية للبلاد." },
    { id: 3228, word: "explore", type: "verb", translation: "يستكشف", example: "We want to explore the old city streets.", exampleTranslation: "عايزين نستكشف شوارع المدينة القديمة." },
    { id: 3229, word: "souvenir", type: "noun", translation: "هدية تذكارية", example: "I bought a small statue as a souvenir.", exampleTranslation: "اشتريت تمثال صغير كهدية تذكارية." },
    { id: 3230, word: "architecture", type: "noun", translation: "الفن المعماري والتصميم الهندسي للمباني", example: "Islamic architecture in Cairo is stunning.", exampleTranslation: "العمارة الإسلامية في القاهرة مذهلة وجميلة." }
  ],
  dialogue: {
    title: "Visiting Cairo Landmarks",
    lines: [
      { speaker: "Tourist", text: "Excuse me, we want to go sightseeing today. What landmarks do you recommend?", translation: "لو سمحت، عايزين نتفرج ونزور المعالم السياحية النهارده. ترشح لنا معالم إيه؟" },
      { speaker: "Guide", text: "You should visit the Egyptian Museum, which is in Tahrir Square, and the Citadel.", translation: "المفروض تزوروا المتحف المصري، اللي موجود في ميدان التحرير، وكمان القلعة." },
      { speaker: "Tourist", text: "Great. Our friend, who visited Cairo last year, told us the Islamic architecture is beautiful.", translation: "جميل. صديقنا، اللي زار القاهرة السنة اللي فاتت، قال لنا إن العمارة الإسلامية جميلة جداً." },
      { speaker: "Guide", text: "Indeed. Khan El-Khalili, which is a very old market, has amazing architecture and souvenirs.", translation: "حقيقي فعلاً. خان الخليلي، اللي هو سوق قديم جداً، فيه عمارة وهدايا تذكارية تجنن." }
    ]
  },
  practice: {
    listening: [
      { text: "My uncle, who lives in Paris, is a guide.", options: ["who", "which", "that"], answer: "who", hint: "تستخدم للعاقل في الجمل المعترضة ولا يصح استخدام that" },
      { text: "The Pyramids, which are in Giza, are old.", options: ["which", "that", "who"], answer: "which", hint: "تستخدم لغير العاقل في الجمل غير التعريفية المعترضة بين فاصلتين" },
      { text: "We bought souvenirs from the market.", options: ["souvenirs", "attractions", "architecture"], answer: "souvenirs", hint: "أشياء نشتريها لتذكر الرحلة والمكان" }
    ],
    speaking: [
      { text: "The Eiffel Tower is a famous landmark", translation: "برج إيفل هو معلم شهير." },
      { text: "Egypt has many historical monuments", translation: "مصر لديها العديد من الآثار التاريخية." }
    ],
    reading: {
      passage: "Tourism is an important industry that helps people explore different cultures. When visiting a new country, sightseeing is the best way to spend your holiday. Most tourists visit historical landmarks and popular attractions. For example, Giza, which is located near Cairo, attracts millions of visitors who want to see the Pyramids. Hiring a professional tour guide can make the experience better. Travelers also enjoy admiring the local architecture and buying unique souvenirs to remember their trip.",
      questions: [
        { q: "What is sightseeing best for?", options: ["Spending your holiday", "Reducing workload", "Avoiding tourism"], answer: "Spending your holiday", explanation: "تذكر الفقرة أن مشاهدة المعالم (sightseeing) هي أفضل طريقة لقضاء الإجازة." },
        { q: "Where are the Pyramids located according to the passage?", options: ["Near Cairo", "In Paris", "In Rome"], answer: "Near Cairo", explanation: "تقع الأهرامات بالقرب من القاهرة (في الجيزة)." }
      ]
    },
    writing: [
      { prompt: "رتب الكلمات: (المتحف المصري، اللي بيكون في القاهرة، هو سياحي جداً.)", words: ["which is in Cairo, / The Egyptian Museum, / very popular / is"], correct: ["The Egyptian Museum,", "which is in Cairo,", "is", "very popular"] },
      { prompt: "أكمل الفراغ بالضمير الصحيح: My guide, ___ (who / which / that) was very friendly, spoke fluent Arabic.", placeholder: "who", answer: "who" }
    ]
  }
};
