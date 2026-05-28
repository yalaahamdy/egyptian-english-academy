/**
 * AI Chat Coach Component
 * Egyptian English Academy
 * Premium open-ended Local NLP conversation engine.
 * Users lead the conversation freely; chatbot responds contextually without forced steps.
 */

import { getProgress, addXP } from '../storage.js';
import { curriculum } from '../data/curriculum.js';
import { speakText } from './lessonViewer.js';
import { sfx } from '../audioEffects.js';

// State variables
let activeScenario = null;
let chatHistory = []; // [{ sender: 'bot'|'user', text: '', tutorNote: '' }]
let activeGoals = [];  // [{ id: 1, text: '', completed: false, keywords: [] }]
let chatState = 'idle'; // 'idle' | 'chatting' | 'finished'
let isBotTyping = false;

// Speech recognition state
let isChatRecording = false;
let chatRecognition = null;

// Dynamic Session Context Memory
let chatSessionState = {
  userName: "",
  location: "",
  selectedFood: "",
  selectedDrink: "",
  selectedItem: "",
  selectedSize: "",
  symptom: "",
  bodyPart: "",
  meetingDay: "",
  meetingTime: "",
  job: "",
  hobby: "",
  weather: ""
};

function resetChatSessionState() {
  chatSessionState = {
    userName: "",
    location: "",
    selectedFood: "",
    selectedDrink: "",
    selectedItem: "",
    selectedSize: "",
    symptom: "",
    bodyPart: "",
    meetingDay: "",
    meetingTime: "",
    job: "",
    hobby: "",
    weather: ""
  };
}

// Local Entity Extractor Engine
function extractEntities(text) {
  const clean = text.toLowerCase().trim();
  
  // 1. Extract Personal Names
  const namePatterns = [
    /my name is\s+([a-zA-Z]+)/i,
    /i am\s+([a-zA-Z]+)/i,
    /i'm\s+([a-zA-Z]+)/i,
    /call me\s+([a-zA-Z]+)/i,
    /this is\s+([a-zA-Z]+)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = clean.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim();
      const exclusions = ["fine", "good", "happy", "sad", "sick", "student", "teacher", "doctor", "engineer", "here", "ready", "a", "the", "an"];
      if (!exclusions.includes(name.toLowerCase())) {
        chatSessionState.userName = name.charAt(0).toUpperCase() + name.slice(1);
        break;
      }
    }
  }

  // 2. Extract Foods & Drinks
  const foods = ["chicken", "fish", "beef", "meat", "pizza", "pasta", "salad", "soup", "rice", "burger"];
  for (const food of foods) {
    if (clean.includes(food)) {
      chatSessionState.selectedFood = food;
    }
  }
  
  const drinks = ["juice", "water", "coffee", "tea", "milk", "soda"];
  for (const drink of drinks) {
    if (clean.includes(drink)) {
      chatSessionState.selectedDrink = drink;
    }
  }

  // 3. Extract Locations
  if (clean.includes("live in")) {
    const match = clean.match(/live in\s+([a-zA-Z\s]+)/i);
    if (match && match[1]) {
      chatSessionState.location = match[1].trim();
    }
  } else if (clean.includes("from")) {
    const match = clean.match(/from\s+([a-zA-Z\s]+)/i);
    if (match && match[1]) {
      chatSessionState.location = match[1].trim();
    }
  }

  // 4. Extract Clothes & Sizes
  const clothes = ["shirt", "jacket", "trousers", "dress", "shoes", "skirt", "t-shirt", "coat"];
  for (const item of clothes) {
    if (clean.includes(item)) {
      chatSessionState.selectedItem = item;
    }
  }
  
  const sizes = ["small", "medium", "large", "xl", "extra large"];
  for (const size of sizes) {
    if (clean.includes(size)) {
      chatSessionState.selectedSize = size;
    }
  }

  // 5. Extract Medical Symptoms & Body Parts
  const symptoms = ["headache", "pain", "fever", "cough", "cold", "sore throat", "hurt"];
  for (const symptom of symptoms) {
    if (clean.includes(symptom)) {
      chatSessionState.symptom = symptom;
    }
  }
  
  const bodyParts = ["head", "stomach", "leg", "arm", "throat", "back", "eye", "ear"];
  for (const part of bodyParts) {
    if (clean.includes(part)) {
      chatSessionState.bodyPart = part;
    }
  }

  // 6. Extract Days & Times
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  for (const day of days) {
    if (clean.includes(day)) {
      chatSessionState.meetingDay = day;
    }
  }
  
  const times = ["am", "pm", "o'clock"];
  if (times.some(t => clean.includes(t))) {
    const match = clean.match(/at\s+(\d+(?::\d+)?\s*(?:am|pm)?)/i) || clean.match(/(\d+\s*o'clock)/i) || clean.match(/at\s+(\d+)/i);
    if (match && match[1]) {
      chatSessionState.meetingTime = match[1].trim();
    }
  }

  // 7. Extract Jobs & Studies
  const jobs = ["student", "teacher", "engineer", "doctor", "nurse", "accountant", "manager", "programmer", "worker"];
  for (const job of jobs) {
    if (clean.includes(job)) {
      chatSessionState.job = job;
    }
  }

  // 8. Extract Weather & Hobbies
  const weatherWords = ["sunny", "warm", "hot", "cold", "rainy", "cloudy", "nice", "beautiful"];
  for (const w of weatherWords) {
    if (clean.includes(w)) {
      chatSessionState.weather = w;
    }
  }
  
  const hobbies = ["play", "watch", "swim", "read", "run", "football", "movie", "club", "music", "tennis"];
  for (const h of hobbies) {
    if (clean.includes(h)) {
      chatSessionState.hobby = h;
    }
  }
}

// Local Intent Classifier
function classifyUserIntent(text) {
  const clean = text.toLowerCase().trim();
  
  if (clean.includes("hello") || clean.includes("hi") || clean.includes("hey") || clean.includes("good morning") || clean.includes("good afternoon")) {
    return "GREETING";
  }
  if (clean.includes("how are you") || clean.includes("how is it going") || clean.includes("how about you") || clean.includes("and you")) {
    return "ASK_WELLBEING";
  }
  if (clean.includes("fine") || clean.includes("good") || clean.includes("well") || clean.includes("great") || clean.includes("ok") || clean.includes("happy")) {
    return "STATE_WELLBEING";
  }
  if (clean.includes("name") || clean.includes("am ") || clean.includes("i'm ") || clean.startsWith("i am ")) {
    return "INTRODUCE_NAME";
  }
  if (clean.includes("live") || clean.includes("from") || clean.includes("egypt") || clean.includes("cairo")) {
    return "STATE_LOCATION";
  }
  if (clean.includes("father") || clean.includes("mother") || clean.includes("brother") || clean.includes("sister") || clean.includes("family") || clean.includes("parents")) {
    return "TALK_FAMILY";
  }
  if (clean.includes("bedroom") || clean.includes("kitchen") || clean.includes("living room") || clean.includes("bed") || clean.includes("sofa") || clean.includes("table") || clean.includes("tv")) {
    return "DESCRIBE_HOME";
  }
  if (clean.includes("chicken") || clean.includes("fish") || clean.includes("beef") || clean.includes("pizza") || clean.includes("pasta") || clean.includes("meat")) {
    return "ORDER_FOOD";
  }
  if (clean.includes("juice") || clean.includes("water") || clean.includes("coffee") || clean.includes("tea") || clean.includes("drink")) {
    return "ORDER_DRINK";
  }
  if (clean.includes("how much") || clean.includes("price") || clean.includes("cost") || clean.includes("bill") || clean.includes("check")) {
    return "ASK_COST";
  }
  if (clean.includes("monday") || clean.includes("tuesday") || clean.includes("wednesday") || clean.includes("thursday") || clean.includes("friday") || clean.includes("saturday") || clean.includes("sunday")) {
    return "STATE_DAY";
  }
  if (clean.includes("am") || clean.includes("pm") || clean.includes("o'clock") || clean.includes("at 10") || clean.includes("at 9") || clean.includes("at 3") || clean.includes("at 4")) {
    return "STATE_TIME";
  }
  if (clean.includes("student") || clean.includes("teacher") || clean.includes("engineer") || clean.includes("doctor") || clean.includes("work") || clean.includes("job") || clean.includes("occupation")) {
    return "TALK_CAREER";
  }
  if (clean.includes("shirt") || clean.includes("jacket") || clean.includes("trousers") || clean.includes("dress") || clean.includes("shoes") || clean.includes("size")) {
    return "SHOP_CLOTHES";
  }
  if (clean.includes("straight") || clean.includes("left") || clean.includes("right") || clean.includes("walk") || clean.includes("directions") || clean.includes("station") || clean.includes("hotel")) {
    return "ASK_GIVE_DIRECTIONS";
  }
  if (clean.includes("sick") || clean.includes("pain") || clean.includes("headache") || clean.includes("cough") || clean.includes("fever") || clean.includes("hurt") || clean.includes("throat")) {
    return "TALK_HEALTH";
  }
  if (clean.includes("weather") || clean.includes("sunny") || clean.includes("warm") || clean.includes("hot") || clean.includes("cold") || clean.includes("rainy") || clean.includes("hobby") || clean.includes("play") || clean.includes("football") || clean.includes("watch")) {
    return "TALK_WEATHER_HOBBIES";
  }
  if (clean.includes("yes") || clean.includes("ok") || clean.includes("sure") || clean.includes("agree") || clean.includes("sounds good") || clean.includes("let's")) {
    return "CONFIRM";
  }
  
  return "GENERAL";
}

// Scenarios Definitions - 100% Free flowing
const SCENARIOS = [
  {
    id: 1,
    unitId: 1,
    title: "Say Hello & Introduce Yourself",
    roleName: "Sarah (Friendly Friend)",
    avatar: "👩‍🦰",
    topicAr: "التعارف والترحيب بالآخرين وتقديم نفسك بحرية",
    botWelcome: "Hello! My name is Sarah. I am very happy to meet you today! 🌟 What is your name and how are you?",
    goals: [
      { id: 1, text: "Greet Sarah and state your name (e.g. Hello, my name is...)", completed: false, keywords: ["hello", "hi", "hey", "name", "am", "i'm"] },
      { id: 2, text: "Say how you are doing (e.g. I am fine / good)", completed: false, keywords: ["fine", "good", "well", "great", "ok", "happy"] },
      { id: 3, text: "Ask Sarah how she is doing (e.g. How are you?)", completed: false, keywords: ["how are you", "how about you", "and you"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "";
      const loc = chatSessionState.location || "";
      
      const greets = [
        `Nice to meet you ${name}! 😊 I live in Cairo, Egypt. It is a very busy and exciting city! Where do you live?`,
        `Great meeting you ${name}! 🌟 Tell me, which city are you from? I would love to know!`,
        `Wonderful! So, ${name}, what do you like to do in your free time?`
      ];

      const wellbeingResponses = [
        "I am doing great, thank you so much for asking! 🌟 How is your day going?",
        "Everything is wonderful on my side! 😊 How about you? What are you up to today?",
        "I feel fantastic! 🚀 Thanks for being so polite!"
      ];

      const locationResponses = [
        `Wow, ${loc} is a beautiful place! 🌍 Egypt has so many historic cities. Do you like living there?`,
        `Aha! I know ${loc} very well, it is famous for its warm people. What is your favorite hobby?`,
        `Amazing! Tell me ${name}, how is the weather in ${loc} today?`
      ];

      const randomSelection = (arr) => arr[Math.floor(Math.random() * arr.length)];

      switch (intent) {
        case "GREETING":
        case "INTRODUCE_NAME":
          responseText = name ? randomSelection(greets) : "Hello! 🌟 It is nice to meet you. Please, tell me what is your name?";
          tutorNote = name ? `تفاعل رائع! البوت عرف اسمك وهو (${name}) وبيسألك عن مكان سكنك أو هوايتك.` : "كويس جداً! البوت مستني يعرف اسمك عشان يكمل التعارف بحرية.";
          break;
        case "ASK_WELLBEING":
          responseText = randomSelection(wellbeingResponses);
          tutorNote = "سؤال لطيف! البوت بيطمنك عن حاله وبيفتح معاك موضوع دردشة بسيط.";
          break;
        case "STATE_WELLBEING":
          responseText = name ? `That is fantastic to hear, ${name}! 😊 Let's talk about our hobbies. What is your favorite hobby?` : "That is wonderful to hear! 😊 What is your favorite hobby or sport?";
          tutorNote = "رد سليم! البوت مبسوط إنك بخير وبيسألك عن هوايتك المفضلة.";
          break;
        case "STATE_LOCATION":
          responseText = randomSelection(locationResponses);
          tutorNote = `ممتاز! البوت اتعرف على مكانك وهو (${loc}) وبيسألك عن الطقس أو هواياتك هناك.`;
          break;
        default:
          responseText = name 
            ? `That sounds very interesting, ${name}! 😊 Tell me more about what you like to do or where you live.`
            : "That sounds very interesting! 😊 What is your name and where are you from?";
          tutorNote = "ردك تمام! البوت حابب يكمل الدردشة بحرية ويسمع تفاصيل أكتر عنك.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 2,
    unitId: 2,
    title: "Talk About Your Family",
    roleName: "John (Classmate)",
    avatar: "👦",
    topicAr: "التحدث عن أفراد عائلتك ووصفهم بحرية",
    botWelcome: "Hey there! We are classmates now. I want to know more about you. Do you have a big family? Tell me about your parents or brothers!",
    goals: [
      { id: 1, text: "State if your family is big or small", completed: false, keywords: ["big", "small", "family"] },
      { id: 2, text: "Mention at least one family member (mother, father, brother, sister)", completed: false, keywords: ["mother", "father", "brother", "sister", "parents"] },
      { id: 3, text: "Use possessive adjectives (my, his, her)", completed: false, keywords: ["my", "his", "her", "our"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "my friend";
      
      const familyResponses = [
        `That is beautiful, ${name}! 👨‍👩‍👧‍👦 Family is everything. My father is a teacher and my mother is a nurse. Do you have any brothers or sisters?`,
        `I love hearing about families! My sister lives in Alexandria. What do your family members do?`,
        `Wonderful! Describe your mother or father to me, what is their job?`
      ];

      const sizeResponses = [
        "Ah, I see! My family is small, I only have one brother. Who do you live with in your house?",
        "Cool! Big families are always full of fun and warm moments. Who is your favorite sibling?",
        "Nice! A small family means a quiet house. Do you have any pets as well?"
      ];

      const randomSelection = (arr) => arr[Math.floor(Math.random() * arr.length)];

      if (intent === "TALK_FAMILY") {
        responseText = randomSelection(familyResponses);
        tutorNote = "كلامك رائع عن العائلة! البوت اتعرف على الكيانات الأسرية وبيسألك عن الإخوة والأخوات.";
      } else if (cleanMsg.includes("big") || cleanMsg.includes("small")) {
        responseText = randomSelection(sizeResponses);
        tutorNote = "إجابة صحيحة! وصفت حجم عيلتك والبوت بيشاركك تفاصيل عن عيلته وبيسألك عن إخواتك.";
      } else {
        responseText = `That is cool, ${name}! 😊 Tell me, do you have any brothers or sisters? How many?`;
        tutorNote = "كلامك سليم! كمل كلامك عن أفراد عيلتك ووصفهم للبوت بحرية.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 3,
    unitId: 3,
    title: "Describe Your House",
    roleName: "Tarek (Egyptian Architect)",
    avatar: "🏡",
    topicAr: "وصف غرف وأثاث منزلك باستخدام حروف الجر بحرية",
    botWelcome: "Ahlan! I am Tarek. I design modern houses. Can you describe your house to me? How many rooms do you have?",
    goals: [
      { id: 1, text: "Mention at least two rooms (bedroom, kitchen, living room)", completed: false, keywords: ["bedroom", "kitchen", "living room", "bathroom", "rooms"] },
      { id: 2, text: "Mention at least one piece of furniture (bed, sofa, table, chair)", completed: false, keywords: ["bed", "sofa", "table", "chair", "fridge", "tv"] },
      { id: 3, text: "Use a preposition of place (in, on, next to, under)", completed: false, keywords: ["in", "on", "next to", "under", "behind", "between"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "my friend";
      
      const homeResponses = [
        `I love that description! Cozy spaces are the best. 🛋️ Where is the television or the sofa located in your living room?`,
        `That sounds like a beautiful design, ${name}! Is your bedroom next to the kitchen or the living room?`,
        `Excellent! What is your favorite piece of furniture in your bedroom?`
      ];

      const randomSelection = (arr) => arr[Math.floor(Math.random() * arr.length)];

      if (intent === "DESCRIBE_HOME") {
        responseText = randomSelection(homeResponses);
        tutorNote = "وصفت بيتك وغرفك بذكاء! طارق بيسألك دلوقتي عن أماكن قطع الأثاث باستخدام حروف الجر.";
      } else {
        responseText = `Interesting design, ${name}! 🏡 Tell me, do you have a big living room or a small kitchen? Describe it to me.`;
        tutorNote = "كلامك تمام! كمل وصف وتفاصيل لبيتك أو غرفتك المفضلة باستخدام حروف الجر.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 4,
    unitId: 4,
    title: "Order Food in a Restaurant",
    roleName: "Waiter (At 'Pyramids View')",
    avatar: "🤵",
    topicAr: "طلب الأطعمة والمشروبات والتعبير عن رغباتك بحرية",
    botWelcome: "Welcome to Pyramids View Restaurant! 🍽️ Here is the menu. Are you ready to order your lunch? What would you like to eat?",
    goals: [
      { id: 1, text: "Order a main dish (e.g. chicken, fish, beef, meat)", completed: false, keywords: ["chicken", "fish", "beef", "meat", "pizza", "pasta", "order", "like"] },
      { id: 2, text: "Order a drink (e.g. juice, water, coffee, tea)", completed: false, keywords: ["juice", "water", "coffee", "tea", "drink"] },
      { id: 3, text: "Politely ask for the bill (e.g. bill, check, please)", completed: false, keywords: ["bill", "check", "please", "how much"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "sir";
      const food = chatSessionState.selectedFood || "";
      const drink = chatSessionState.selectedDrink || "";

      if (intent === "ORDER_FOOD") {
        if (drink) {
          responseText = `Excellent choice! One ${food} and a refreshing ${drink} for you. 🥩 Would you like any dessert before the bill?`;
          tutorNote = `جميل جداً! النادل فهم طلبك بالكامل وهو (${food}) مع (${drink}). بيقترح عليك حلوى قبل الحساب.`;
        } else {
          responseText = `Very nice choice, ${name}! Our ${food} is extremely fresh today. 🐟 What would you like to drink with your ${food}?`;
          tutorNote = `طلبت الطبق الرئيسي وهو (${food}) بنجاح! النادل بيسألك دلوقتي عن المشروب المناسب معاه.`;
        }
      } else if (intent === "ORDER_DRINK") {
        if (food) {
          responseText = `Sure thing! One cold ${drink} to accompany your ${food}. 🥤 Shall I bring the bill now, or do you need anything else?`;
          tutorNote = `طلبت المشروب وهو (${drink}) بجانب الوجبة (${food}). النادل بيستفسر لو جاهز للحساب.`;
        } else {
          responseText = `Coming right up! A refreshing ${drink} for you. 🥤 What main dish would you like to order with your drink?`;
          tutorNote = `طلبت المشروب وهو (${drink}). النادل بيقترح عليك تطلب طبق رئيسي معاه.`;
        }
      } else if (intent === "ASK_COST") {
        const totalCost = food ? "180" : "60";
        responseText = `Here is your bill, ${name}. 🧾 The total is ${totalCost} Egyptian pounds. You can pay by cash or credit card. Thank you!`;
        tutorNote = "طلبت الحساب بشكل مهذب! النادل جابلك الفاتورة وبيوضحلك طريقة الدفع.";
      } else {
        responseText = `Certainly, ${name}! Let me help you. Would you like to try our special chicken, or just some water and juice?`;
        tutorNote = "النادل مستني منك تحدد طلبك للأكل أو الشرب بوضوح.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 5,
    unitId: 5,
    title: "Schedule a Meeting",
    roleName: "Manager (EEA Office)",
    avatar: "👔",
    topicAr: "تحديد مواعيد ومناقشة الوقت والتاريخ والأرقام بحرية",
    botWelcome: "Good morning. We need to schedule our weekly review meeting. 🗓️ What day and time are you free next week?",
    goals: [
      { id: 1, text: "Mention a specific day of the week (e.g. Monday, Sunday)", completed: false, keywords: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] },
      { id: 2, text: "State a specific time (e.g. at 10:00 AM, at 3 PM)", completed: false, keywords: ["am", "pm", "o'clock", "at 10", "at 9", "at 2", "at 3", "at 4", "at 5", "at 6", "at 7", "at 8"] },
      { id: 3, text: "Agree to the meeting (e.g. ok, fine, sounds good)", completed: false, keywords: ["ok", "fine", "sounds good", "great", "perfect", "agree"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "team member";
      const day = chatSessionState.meetingDay || "";
      const time = chatSessionState.meetingTime || "";

      if (intent === "STATE_DAY") {
        if (time) {
          responseText = `Perfect! ${day} at ${time} works great for my calendar. 📆 Does that time suit you, or should we invite other managers?`;
          tutorNote = `تم تحديد اليوم وهو (${day}) والوقت (${time}) بنجاح! المدير بيستفسر لو الموعد مريح ليك.`;
        } else {
          responseText = `Great, ${day} is fine! 📆 What time on ${day} are you free? I have openings at 10 AM and 3 PM.`;
          tutorNote = `حددت اليوم وهو (${day}). المدير بيقترح عليك مواعيد محددة في نفس اليوم لتختار منها.`;
        }
      } else if (intent === "STATE_TIME") {
        if (day) {
          responseText = `Okay! Let's lock in ${day} at ${time}. ⏰ Shall I send you the official email invite now?`;
          tutorNote = `تم رصد الميعاد وهو (${day}) في تمام (${time}). المدير بيسألك لو يرسل بريد التأكيد.`;
        } else {
          responseText = `Understood, at ${time}! ⏰ But which day next week are we talking about? Monday, Wednesday, or Thursday?`;
          tutorNote = `حددت الساعة وهي (${time}) ولكن ناقص تحدد اليوم. كمل حوارك وقول اسم اليوم.`;
        }
      } else if (intent === "CONFIRM") {
        const scheduleString = (day && time) ? `for ${day} at ${time}` : "next week";
        responseText = `Confirmed! 🤝 Our review meeting is locked in ${scheduleString}. I will send the email shortly. See you, ${name}!`;
        tutorNote = "أكدت الموعد بنجاح تام! المدير سجل المقابلة وهيحضرها معاك.";
      } else {
        responseText = `Let's find the best schedule, ${name}. What day next week are you free for the meeting?`;
        tutorNote = "المدير مستني تحدد معاه اليوم والساعة الأنسب لظروف شغلك.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 6,
    unitId: 6,
    title: "Talk About Your Job/Studies",
    roleName: "Career Coach",
    avatar: "👩‍🏫",
    topicAr: "الحديث عن دراستك أو مهنتك والروتين اليومي بحرية",
    botWelcome: "Hello! I am your career coach. 💼 I want to learn more about your professional life. Are you a student, or do you have a job? What is your occupation?",
    goals: [
      { id: 1, text: "State if you are a student or your job (teacher, engineer, doctor)", completed: false, keywords: ["student", "teacher", "engineer", "doctor", "nurse", "accountant", "manager", "work", "job"] },
      { id: 2, text: "Mention where you work or study (school, university, office)", completed: false, keywords: ["school", "university", "office", "hospital", "company", "home"] },
      { id: 3, text: "Describe one task or daily action (study, teach, design, write)", completed: false, keywords: ["study", "teach", "design", "write", "code", "manage", "work", "help"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "my friend";
      const job = chatSessionState.job || "";
      const loc = chatSessionState.location || "";

      if (intent === "TALK_CAREER") {
        responseText = `That is a very interesting field! 🚀 Being a ${job} is highly respectable. Where do you usually work or study? At an office, university, or school?`;
        tutorNote = `البوت عرف مهنتك وهي (${job})! كمل الكلام مع مدرب التوظيف وقوله مكان العمل أو الدراسة.`;
      } else if (cleanMsg.includes("university") || cleanMsg.includes("school") || cleanMsg.includes("office") || cleanMsg.includes("company")) {
        responseText = `I see! Working or studying there must be very exciting. What are your daily duties or tasks in that place?`;
        tutorNote = "وضحت مكان شغلك أو دراستك بنجاح! البوت بيسألك عن المهام اليومية اللي بتعملها.";
      } else {
        responseText = `That sounds good, ${name}! Tell me, what do you do every day at your study or work? Do you write codes, design houses, or help people?`;
        tutorNote = "كلامك تمام! كمل حوارك المهني مع البوت ووضح المهام اليومية اللي بتقوم بيها.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 7,
    unitId: 7,
    title: "Buy Clothes in a Shop",
    roleName: "Shop Assistant (At 'EEA Store')",
    avatar: "🛍️",
    topicAr: "الاستفسار عن الملابس والمقاسات والأسعار والدفع بحرية",
    botWelcome: "Hello! Welcome to EEA Store. 👕 How can I help you today? Are you looking for a shirt, a jacket, or trousers?",
    goals: [
      { id: 1, text: "Select a clothing item (shirt, jacket, trousers, dress)", completed: false, keywords: ["shirt", "jacket", "trousers", "dress", "shoes", "skirt", "t-shirt"] },
      { id: 2, text: "Specify your size (small, medium, large, XL)", completed: false, keywords: ["small", "medium", "large", "xl", "size"] },
      { id: 3, text: "Ask for the price (e.g. How much is it?)", completed: false, keywords: ["how much", "price", "cost"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "customer";
      const item = chatSessionState.selectedItem || "";
      const size = chatSessionState.selectedSize || "";

      if (intent === "SHOP_CLOTHES") {
        if (size) {
          responseText = `Excellent! We have the ${item} in ${size} size. 👕 Would you like to check the price or pay now?`;
          tutorNote = `تم رصد خياراتك: (${item}) بمقاس (${size}). البائع بيقترح عليك معرفة السعر أو الدفع.`;
        } else {
          responseText = `Great choice! Our ${item} has high quality. What size do you need for this ${item}? Small, medium, or large?`;
          tutorNote = `اخترت القطعة وهي (${item}). البائع بيستعلم عن مقاسك المناسب ليها.`;
        }
      } else if (intent === "ASK_COST") {
        const itemPrice = item ? "320" : "250";
        responseText = `This beautiful ${item || 'item'} is ${itemPrice} Egyptian pounds. 💳 Do you want to pay by cash or credit card?`;
        tutorNote = "سألت عن السعر بشكل رائع! البائع حدد التكلفة وبيستفسر عن وسيلة الدفع.";
      } else if (cleanMsg.includes("small") || cleanMsg.includes("medium") || cleanMsg.includes("large") || cleanMsg.includes("xl")) {
        if (item) {
          responseText = `Perfect, size ${size} for the ${item} is in stock! Would you like to ask about the price?`;
          tutorNote = `حددت المقاس وهو (${size}) للقطعة (${item}). اسأله عن السعر بالإنجليزية.`;
        } else {
          responseText = `Got it, size ${size}! But what item are you buying? A shirt, trousers, or a jacket?`;
          tutorNote = `البائع عرف مقاسك وهو (${size}) بس ناقص تقوله عاوز تشتري قميص ولا بنطلون ولا جاكيت.`;
        }
      } else {
        responseText = `Welcome ${name}! We have amazing discounts today. Tell me, what item of clothing are you looking for?`;
        tutorNote = "البائع بيرحب بيك ومستنيك تختار صنف الملابس اللي بتدور عليه.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 8,
    unitId: 8,
    title: "Ask for Directions",
    roleName: "Tourist (Lost in Cairo)",
    avatar: "🎒",
    topicAr: "إعطاء وصف للاتجاهات ووسائل النقل والمواقع بحرية",
    botWelcome: "Excuse me! I am a tourist and I am lost. 🗺️ Can you help me find the nearest train station or hotel?",
    goals: [
      { id: 1, text: "Give a direction word (go straight, turn left, turn right)", completed: false, keywords: ["go straight", "turn left", "turn right", "walk"] },
      { id: 2, text: "Mention a location indicator (next to, opposite, near)", completed: false, keywords: ["next to", "opposite", "near", "corner", "on the right", "on the left"] },
      { id: 3, text: "Recommend a transportation method (bus, taxi, train, walk)", completed: false, keywords: ["bus", "taxi", "train", "metro", "walk", "car"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "my friend";
      
      const touristResponses = [
        `Thank you so much! 🚇 Is it opposite the museum or next to the bank? How should I get there? By metro or bus?`,
        `Ah, I see! So I go straight and then turn. Is that near a restaurant or hotel?`,
        `Very helpful directions! Can I go there by taxi or is it better to walk?`
      ];

      const randomSelection = (arr) => arr[Math.floor(Math.random() * arr.length)];

      if (intent === "ASK_GIVE_DIRECTIONS") {
        responseText = randomSelection(touristResponses);
        tutorNote = "أعطيت اتجاهات صحيحة! السائح بيستفسر عن المعالم المحيطة ووسيلة المواصلات الأنسب.";
      } else if (cleanMsg.includes("metro") || cleanMsg.includes("bus") || cleanMsg.includes("taxi") || cleanMsg.includes("walk")) {
        responseText = `Perfect, taking a transport is very fast! Is the station opposite the central square? Thanks for helping me, ${name}!`;
        tutorNote = "اقترحت وسيلة مواصلات سريعة! السائح بيشكرك وبيأكد على المعلم المقابل ليها.";
      } else {
        responseText = `Excuse me, ${name}! 🗺️ I am really confused. Can you tell me: should I turn left, right, or go straight to reach the hotel?`;
        tutorNote = "السائح مشوش ومستني تديه كلمات اتجاهات صريحة (go straight / turn left / turn right).";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 9,
    unitId: 9,
    title: "Visit the Doctor",
    roleName: "Doctor (At EEA Clinic)",
    avatar: "🩺",
    topicAr: "وصف الأعراض والأمراض وأعضاء الجسم لطبيبك بحرية",
    botWelcome: "Hello! Come in and sit down. 🏥 I am Doctor Ahmed. What is the problem? How are you feeling today?",
    goals: [
      { id: 1, text: "State that you feel sick or have a symptom (headache, pain, fever)", completed: false, keywords: ["sick", "pain", "headache", "cold", "fever", "cough", "hurt", "sore"] },
      { id: 2, text: "Mention the affected body part (head, stomach, leg, arm, throat)", completed: false, keywords: ["head", "stomach", "leg", "arm", "throat", "body", "back"] },
      { id: 3, text: "Understand doctor's tip and thank him (thanks, thank you, okay)", completed: false, keywords: ["thanks", "thank you", "okay", "ok", "understand"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "my patient";
      const sym = chatSessionState.symptom || "";
      const part = chatSessionState.bodyPart || "";

      if (intent === "TALK_HEALTH") {
        if (part) {
          responseText = `Oh, I am sorry to hear that you have a ${sym} in your ${part}. 🩺 Let me check. I will write a medicine prescription. Take it, rest, and drink water. Okay?`;
          tutorNote = `شرحت العرض وهو (${sym}) في العضو (${part}) بدقة. الطبيب بيكتبلك العلاج وبيديك نصيحة للشفاء.`;
        } else {
          responseText = `I see. Having a ${sym} can be very annoying. 🩺 Which part of your body hurts? Your head, throat, or stomach?`;
          tutorNote = `حددت العرض المرضي وهو (${sym}). الطبيب بيسألك عن العضو المتأثر بالتحديد.`;
        }
      } else if (cleanMsg.includes("head") || cleanMsg.includes("stomach") || cleanMsg.includes("throat") || cleanMsg.includes("leg") || cleanMsg.includes("arm")) {
        responseText = `Understood. For your ${part || 'symptom'}, you need this medical pill. 💊 Take it after meals, rest well, and you will feel fine soon. Understand?`;
        tutorNote = `حددت مكان الوجع وهو (${part}). الطبيب بيقترح عليك أخذ الدواء المناسب وبيطلب منك تأكيد فهم النصيحة.`;
      } else if (intent === "CONFIRM" || cleanMsg.includes("thank")) {
        responseText = `You are very welcome, ${name}! 💊 Take care of yourself, rest well, and goodbye!`;
        tutorNote = "شكرت الطبيب وأكدت فهمك للنصيحة بنجاح كامل.";
      } else {
        responseText = `I want to help you feel better, ${name}. Describe your sickness or pain to me. What hurts?`;
        tutorNote = "الطبيب مستنيك توصف التعب أو الألم اللي بتشعر بيه بالإنجليزي.";
      }

      return { responseText, tutorNote };
    }
  },
  {
    id: 10,
    unitId: 10,
    title: "Weekend Plans & Weather",
    roleName: "Alex (Best Friend)",
    avatar: "👱",
    topicAr: "الحديث عن الطقس والأنشطة والهوايات في عطلة نهاية الأسبوع بحرية",
    botWelcome: "Hey buddy! Finally it's the weekend. ☀️ The weather is beautiful and sunny today. What are your plans? What do you want to do?",
    goals: [
      { id: 1, text: "Comment on the weather (sunny, warm, hot, nice)", completed: false, keywords: ["weather", "sunny", "warm", "hot", "nice", "cold", "rainy"] },
      { id: 2, text: "Mention a hobby or weekend activity (play, watch, go, swim)", completed: false, keywords: ["play", "watch", "go", "swim", "read", "run", "football", "movie", "club"] },
      { id: 3, text: "Invite Alex or agree to join (let's, join, come, with me)", completed: false, keywords: ["let's", "join", "come", "with me", "together", "you want"] }
    ],
    generateResponse: (cleanMsg) => {
      const intent = classifyUserIntent(cleanMsg);
      let responseText = "";
      let tutorNote = "";

      const name = chatSessionState.userName || "buddy";
      const weather = chatSessionState.weather || "";
      const hobby = chatSessionState.hobby || "";

      if (intent === "TALK_WEATHER_HOBBIES") {
        if (hobby) {
          responseText = `That sounds awesome! ⚽ Doing ${hobby} is perfect on a ${weather || 'sunny'} day. Shall we go together at 4 PM?`;
          tutorNote = `اتكلمت عن الهواية (${hobby}) والطقس (${weather}). أليكس صديقك بيقترح تتقابلوا الساعة 4 سوا.`;
        } else {
          responseText = `I agree! Since the weather is ${weather || 'nice'}, what do you want to do? Play football or watch a movie?`;
          tutorNote = `علقت على الطقس وهو (${weather}). أليكس بيقترح عليك أنشطة تختار منها.`;
        }
      } else if (intent === "CONFIRM" || cleanMsg.includes("join") || cleanMsg.includes("with me")) {
        responseText = `Awesome, let's meet at the club! 🤝 It is going to be so much fun. See you later, ${name}!`;
        tutorNote = "اتفقتوا على الميعاد والتجمع سوا لقضاء العطلة بنجاح.";
      } else {
        responseText = `It is a beautiful weekend, ${name}. What are your favorite outdoor activities when it is sunny?`;
        tutorNote = "أليكس مستني يعرف إيه خطتك وهوايتك للخروج والترفيه.";
      }

      return { responseText, tutorNote };
    }
  }
];

export function initChatCoach() {
  const container = document.getElementById("chat-coach-section");
  if (!container) return;

  chatState = 'idle';
  activeScenario = null;
  chatHistory = [];
  activeGoals = [];
  isBotTyping = false;
  isChatRecording = false;

  resetChatSessionState();

  if (chatRecognition) {
    try { chatRecognition.stop(); } catch(e){}
    chatRecognition = null;
  }

  // Bind actions to window
  window.selectChatScenario = (id) => startChatSession(id);
  window.sendChatMessage = () => sendUserMessage();
  window.toggleChatSpeech = () => toggleSpeech();
  window.speakChatMessage = (text) => speakText(text);
  window.exitChatSession = () => {
    if (confirm("Are you sure you want to exit the coaching session? Your earned XP will be saved, but progress will be reset.")) {
      initChatCoach();
    }
  };
  window.manualFinishChat = () => {
    showCoachingFinishedView();
  };

  renderScenarioSelector();
}

function renderScenarioSelector() {
  const container = document.getElementById("chat-coach-section");
  if (!container) return;

  const progress = getProgress();
  const completedLessonsCount = progress.completedLessons.length;

  let html = `
    <div class="section-header">
      <h1 class="section-title">AI Conversation Coach</h1>
      <p class="section-subtitle">Practice your English speaking and writing skills in real-world scenarios with our local AI assistant.</p>
      
      <div class="tutor-arabic-card review-tutor-arabic">
        <p class="ar-text">
          مرحباً بك يا بطل في المساعد الحواري الذكي! هنا تقدر تتحدث مع البوت إما كتابة أو نطقاً في المايك في سيناريوهات حقيقية. اختر السيناريو المناسب للوحدة اللي خلصتها وابدأ فوراً!
        </p>
      </div>
    </div>

    <div class="role-selection-container">
  `;

  SCENARIOS.forEach(sc => {
    const isUnlocked = sc.unitId === 1 || 
                       completedLessonsCount >= (sc.unitId - 1) * 4 || 
                       progress.completedLessons.some(lId => Math.ceil(lId/4) === sc.unitId);

    const clickHandler = isUnlocked 
      ? `onclick="window.selectChatScenario(${sc.id})"`
      : ``;

    html += `
      <div class="role-card ${!isUnlocked ? 'locked' : ''}" ${clickHandler}>
        <div class="role-header">
          <div class="role-emoji-wrapper">
            ${isUnlocked ? sc.avatar : '🔒'}
          </div>
          <span class="role-unit-badge">UNIT ${sc.unitId}</span>
        </div>
        
        <div class="role-body">
          <h3 class="role-title">${sc.title}</h3>
          <p class="role-topic">${sc.topicAr}</p>
        </div>

        <div class="role-footer">
          <span class="role-goals-count">🎯 3 Conversation Goals</span>
          ${!isUnlocked ? `
            <span class="role-lock-overlay">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Locked</span>
            </span>
          ` : `
            <span class="role-lock-overlay" style="color: var(--success);">
              <span>Start Chat →</span>
            </span>
          `}
        </div>
      </div>
    `;
  });

  html += `
    </div>
  `;

  container.innerHTML = html;
}

function startChatSession(scenarioId) {
  const sc = SCENARIOS.find(s => s.id === scenarioId);
  if (!sc) return;

  sfx.playTap();
  activeScenario = sc;
  chatState = 'chatting';
  chatHistory = [
    { sender: 'bot', text: sc.botWelcome, tutorNote: sc.goals[0].text }
  ];
  
  // Reset session memory
  resetChatSessionState();

  // Clone goals
  activeGoals = sc.goals.map(g => ({ ...g, completed: false }));

  renderChatWindow();
  
  // Speak welcome message
  setTimeout(() => speakText(sc.botWelcome), 500);
}

function renderChatWindow() {
  const container = document.getElementById("chat-coach-section");
  if (!container) return;

  const goalsMetCount = activeGoals.filter(g => g.completed).length;

  container.innerHTML = `
    <div class="chat-window-container">
      <!-- Left Panel: Chat Messages -->
      <div class="chat-messages-panel">
        <div class="chat-header-bar">
          <div class="chat-active-role-info">
            <span class="chat-active-emoji">${activeScenario.avatar}</span>
            <div>
              <h3 class="chat-active-title">${activeScenario.roleName}</h3>
              <span class="chat-active-subtitle">Roleplay: ${activeScenario.title}</span>
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            ${goalsMetCount >= 1 ? `
              <button class="btn btn-accent btn-sm" onclick="window.manualFinishChat()">
                Finish & Review
              </button>
            ` : ''}
            <button class="btn btn-secondary btn-sm" onclick="window.exitChatSession()">
              Exit
            </button>
          </div>
        </div>

        <!-- Messages tray -->
        <div class="chat-messages-tray" id="chat-messages-tray-div">
          ${renderHistoryBubbles()}
          ${isBotTyping ? `
            <div class="typing-indicator" id="chat-typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          ` : ''}
        </div>

        <!-- Input Bar -->
        <div class="chat-input-bar-container">
          <div class="chat-input-wrapper">
            <input type="text" id="chat-user-message-input" class="chat-text-input" 
                   placeholder="Type your response in English here..." autocomplete="off"
                   onkeydown="if(event.key==='Enter') window.sendChatMessage()">
            
            <button class="chat-mic-btn-input ${isChatRecording ? 'recording' : ''}" id="chat-mic-btn" onclick="window.toggleChatSpeech()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
            </button>
          </div>

          <button class="chat-send-btn" onclick="window.sendChatMessage()" id="chat-send-btn-el">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>

      <!-- Right Panel: Side Status (Goals & Helpers) -->
      <div class="chat-sidebar-panel">
        <h3 class="chat-sidebar-title">Conversation Goals</h3>
        
        <div class="chat-goals-list">
          ${activeGoals.map(g => `
            <div class="chat-goal-item ${g.completed ? 'completed' : ''}">
              <div class="chat-goal-checkbox">
                ${g.completed ? '✓' : ''}
              </div>
              <span class="chat-goal-text">${g.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="chat-hints-helper-panel">
          <h4 class="chat-hints-helper-title">Tutor Helper Note</h4>
          <p class="chat-hints-helper-desc" id="chat-sidebar-helper-desc">
            ${chatHistory[chatHistory.length - 1].tutorNote || "اكتب جملة بسيطة بالإنجليزي للرد على البوت يا بطل!"}
          </p>
        </div>
      </div>
    </div>
  `;

  scrollMessagesToBottom();
  
  setTimeout(() => {
    const input = document.getElementById("chat-user-message-input");
    if (input) input.focus();
  }, 100);
}

function renderHistoryBubbles() {
  return chatHistory.map((h, idx) => {
    const isBot = h.sender === 'bot';
    const avatarChar = isBot ? activeScenario.avatar : '🧑‍🎓';

    return `
      <div class="chat-bubble-wrapper ${isBot ? 'bot' : 'user'}">
        <div class="chat-avatar">${avatarChar}</div>
        <div class="chat-bubble-content-box">
          <div class="chat-bubble">
            ${h.text}
          </div>
          ${isBot ? `
            <button class="chat-audio-btn" onclick="window.speakChatMessage('${h.text.replace(/'/g, "\\'")}')" title="Listen">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function scrollMessagesToBottom() {
  const tray = document.getElementById("chat-messages-tray-div");
  if (tray) {
    tray.scrollTop = tray.scrollHeight;
  }
}

function sendUserMessage() {
  const input = document.getElementById("chat-user-message-input");
  if (!input || !input.value.trim() || isBotTyping) return;

  const msgText = input.value.trim();
  input.value = "";

  // Append user message
  chatHistory.push({ sender: 'user', text: msgText });
  renderChatWindow();

  // Evaluate goals against user message (order-independent)
  const cleanMsg = msgText.toLowerCase();
  
  // Extract entities first to update the session state memory
  extractEntities(msgText);
  
  activeGoals.forEach(g => {
    if (!g.completed) {
      const match = g.keywords.some(k => cleanMsg.includes(k));
      if (match) {
        g.completed = true;
        addXP(20); // Reward for meeting goals
        sfx.playCorrect();
      }
    }
  });

  // Trigger Bot thinking indicator
  isBotTyping = true;
  renderChatWindow();

  setTimeout(() => {
    // Generate Bot response from Dynamic Intent-based engine
    const { responseText, tutorNote } = activeScenario.generateResponse(cleanMsg);
    
    isBotTyping = false;

    chatHistory.push({ sender: 'bot', text: responseText, tutorNote: tutorNote });
    addXP(10); // Message exchange reward

    renderChatWindow();
    speakText(responseText);
  }, 1200);
}

function showCoachingFinishedView() {
  if (chatRecognition) {
    try { chatRecognition.stop(); } catch(e){}
    chatRecognition = null;
  }
  
  chatState = 'finished';
  sfx.playCelebration();
  addXP(100); // Mastery completion bonus

  const container = document.getElementById("chat-coach-section");
  if (!container) return;

  const goalsMetCount = activeGoals.filter(g => g.completed).length;

  container.innerHTML = `
    <div class="quiz-results-card" style="max-width: 650px; margin: 40px auto; animation: slideUp 0.4s ease-out;">
      <div class="results-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg>
      </div>
      <h2 class="practice-finished-title" style="color: var(--accent);">Roleplay Complete!</h2>
      <div class="results-grade" style="font-size: 1.8rem; margin: 10px 0;">Goals Met: ${goalsMetCount} / 3</div>
      <div class="results-xp">+100 XP Completion Bonus</div>
      
      <div class="tutor-arabic-card practice-finished-tutor">
        <p class="ar-text" style="font-size: 0.95rem; line-height: 1.5;">
          يا بطل الحوار! أتممت بنجاح المحادثة التفاعلية مع <strong>${activeScenario.roleName}</strong> في موضوع <em>"${activeScenario.title}"</em>. نطقك وعباراتك كانوا في غاية الروعة! استمر في الحديث وتطبيق ما درسته في الحياة العملية.
        </p>
      </div>
      
      <div class="quiz-results-actions" style="margin-top: 24px;">
        <button class="btn btn-primary btn-next-svg-adjust" onclick="window.selectChatScenario(${activeScenario.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
          <span>Restart Chat</span>
        </button>
        <a href="#roadmap" class="btn btn-secondary btn-next-svg-adjust">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon-left"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <span>Roadmap</span>
        </a>
      </div>
    </div>
  `;
}

function toggleSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById("chat-mic-btn");
  const input = document.getElementById("chat-user-message-input");

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser. Please type your response!");
    return;
  }

  if (isChatRecording) {
    if (chatRecognition) chatRecognition.stop();
    isChatRecording = false;
    if (micBtn) micBtn.classList.remove('recording');
    return;
  }

  try {
    chatRecognition = new SpeechRecognition();
    chatRecognition.lang = 'en-US';
    chatRecognition.interimResults = false;
    chatRecognition.maxAlternatives = 1;

    chatRecognition.onstart = function() {
      isChatRecording = true;
      if (micBtn) micBtn.classList.add('recording');
    };

    chatRecognition.onerror = function(e) {
      console.error(e);
      isChatRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
    };

    chatRecognition.onend = function() {
      isChatRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
    };

    chatRecognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      if (input) {
        input.value = transcript;
        sendUserMessage();
      }
    };

    chatRecognition.start();
  } catch(err) {
    console.error(err);
  }
}
