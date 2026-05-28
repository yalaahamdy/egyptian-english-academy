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

      switch (intent) {
        case "GREETING":
        case "INTRODUCE_NAME":
          responseText = "Nice to meet you! 😊 I live in Cairo, Egypt. It is a very busy and exciting city! Where do you live and what do you like to do?";
          tutorNote = "رد رائع! البوت اتعرف عليك وبيقولك إنه ساكن في القاهرة، وبيسألك إنت ساكن فين وبتحب تعمل إيه؟";
          break;
        case "ASK_WELLBEING":
          responseText = "I am doing great, thank you for asking! 🌟 How is your day going so far?";
          tutorNote = "سؤال مهذب! البوت بيطمنك إنه بخير وبيسألك يومك ماشي إزاي.";
          break;
        case "STATE_WELLBEING":
          responseText = "That is wonderful to hear! 😊 We should talk more about our favorite things. What is your favorite hobby?";
          tutorNote = "جميل! البوت فرحان إنك بخير وبيسألك عن هوايتك المفضلة.";
          break;
        case "STATE_LOCATION":
          responseText = "Wow, that is beautiful! 🌍 Egypt has so many historic places. Do you like visiting the Pyramids or museums?";
          tutorNote = "الله ينور! جاوبت على مكان سكنك. البوت بيسألك لو بتحب تزور الأهرامات والمتاحف.";
          break;
        default:
          responseText = "That sounds very interesting! 😊 I want to know more about you. Tell me, what is your name and where are you from?";
          tutorNote = "ردك تمام! البوت حابب يكمل التعارف ويسألك عن اسمك ومكانك.";
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

      if (intent === "TALK_FAMILY") {
        responseText = "That's lovely! 👨‍👩‍👧‍👦 Family is very precious. My father is a teacher and my mother is a nurse. What do your parents do?";
        tutorNote = "جميل جداً! البوت بيحكيلك عن مهنة والديه وبيسألك عن مهنة والدك أو والدتك.";
      } else if (cleanMsg.includes("big") || cleanMsg.includes("small")) {
        responseText = "I see! My family is small, I only have one brother. Who do you live with in your house?";
        tutorNote = "رد ممتاز! البوت بيحكيلك عن عائلته الصغيرة وبيسألك عايش مع مين في البيت.";
      } else {
        responseText = "That sounds nice! 🌟 Tell me, do you have any brothers or sisters? What do they do?";
        tutorNote = "ردك سليم! كمل كلامك عن إخواتك ووالديك بحرية مع البوت.";
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

      if (intent === "DESCRIBE_HOME") {
        responseText = "I love that description! Cozy spaces with nice furniture are the best. 🛋️ What color is your bedroom sofa or table?";
        tutorNote = "وصفت منزلك وأثاثه للمهندس طارق بنجاح! هو بيسألك عن ألوان الأثاث.";
      } else {
        responseText = "Interesting design! 🏡 Every house has a unique story. Tell me about your kitchen or favorite room!";
        tutorNote = "كلامك تمام! كمل وصف وتفاصيل لبيتك أو غرفتك المفضلة.";
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

      if (intent === "ORDER_FOOD") {
        responseText = "Excellent choice! Our chicken and fish are very fresh today. 🐟 Would you like any orange juice or cold water to drink?";
        tutorNote = "طلبت الوجبة بنجاح! نادل المطعم بيسألك لو تحب مشروب محدد مع الوجبة.";
      } else if (intent === "ORDER_DRINK") {
        responseText = "Perfect, a refreshing drink! 🥤 Coming right up. Would you like to check the bill when you are done?";
        tutorNote = "طلبت المشروب بنجاح! النادل بيسألك لو جاهز للحساب.";
      } else if (intent === "ASK_COST") {
        responseText = "Here is your bill, sir. 🧾 It is 150 Egyptian pounds. Thank you for dining at Pyramids View!";
        tutorNote = "نادل المطعم جابلك الحساب فورا وبيشكرك.";
      } else {
        responseText = "Sure, I can help you with your dining experience. What else can I bring you today?";
        tutorNote = "ردك سليم! اطلب أكل أو مشروب لتأكيد الطلب.";
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

      if (intent === "STATE_DAY") {
        responseText = "Great! That day works well for me. 📆 What time is best for you on that day? We can do 10 AM or 3 PM.";
        tutorNote = "اخترت اليوم بنجاح! المدير بيقترح عليك ساعات للمقابلة في نفس اليوم.";
      } else if (intent === "STATE_TIME") {
        responseText = "Okay, that time is perfect. ⏰ I will write it in my meeting calendar. Does that sound good to you?";
        tutorNote = "حددت الساعة بدقة. المدير بيطلب منك تأكيد الموعد النهائي.";
      } else if (intent === "CONFIRM") {
        responseText = "Confirmed! 🤝 Meeting is locked in. I will send you the calendar invite email. See you!";
        tutorNote = "أكدت الموعد بنجاح تام.";
      } else {
        responseText = "Let's find the best schedule. Tell me, which day next week is good for you?";
        tutorNote = "المدير مستني تحدد معاه اليوم والساعة الأنسب ليك.";
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

      if (intent === "TALK_CAREER") {
        responseText = "That is a very respectable occupation! 🚀 Where do you work or study every day? At an office or a university?";
        tutorNote = "وضحت وظيفتك/دراستك. المدرب بيسألك دلوقتي عن مكان عملك أو دراستك.";
      } else if (cleanMsg.includes("university") || cleanMsg.includes("school") || cleanMsg.includes("office") || cleanMsg.includes("company")) {
        responseText = "Very nice environment! 🏫 What are your daily tasks or subjects there?";
        tutorNote = "حددت مكان العمل. المدرب حابب يعرف بتعمل إيه هناك كل يوم.";
      } else {
        responseText = "That is interesting! 🌟 Tell me more about what you study or do at work.";
        tutorNote = "كلامك تمام! كمل حوارك المهني مع البوت بحرية.";
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

      if (intent === "SHOP_CLOTHES") {
        responseText = "Great choice! We have high-quality fabrics. What size are you looking for? Small, medium, or large?";
        tutorNote = "اخترت الملابس! البائع بيسألك عن المقاس المناسب ليك.";
      } else if (intent === "ASK_COST") {
        responseText = "This item is 250 Egyptian pounds. 💳 You can pay by cash or credit card. What size do you need?";
        tutorNote = "عرفت السعر وطريقة الدفع! حدد المقاس مع البائع.";
      } else if (cleanMsg.includes("small") || cleanMsg.includes("medium") || cleanMsg.includes("large")) {
        responseText = "Perfect, size is in stock! Would you like to check the price or pay now?";
        tutorNote = "حددت مقاسك! البائع بيسألك لو عاوز تسأل عن السعر أو تدفع.";
      } else {
        responseText = "Let me help you find the perfect clothing item. What would you like to buy?";
        tutorNote = "البائع مستني يعرف طلبك بالتحديد عشان يساعدك.";
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

      if (intent === "ASK_GIVE_DIRECTIONS") {
        responseText = "Ah, thank you! Go straight or turn. 🚇 Is it near the museum? How should I go there? By bus or taxi?";
        tutorNote = "أوصفت الاتجاه! السائح بيسألك عن المعالم المحيطة ووسيلة المواصلات المناسبة.";
      } else if (cleanMsg.includes("metro") || cleanMsg.includes("bus") || cleanMsg.includes("taxi")) {
        responseText = "Excellent, taking a metro or bus is very easy. Is it next to the big square?";
        tutorNote = "اقترحت وسيلة مواصلات! السائح بيستفسر عن موقعها بالتحديد.";
      } else {
        responseText = "Okay! Can you give me directions to the train station?";
        tutorNote = "السائح مستني منك ترشده لأقرب محطة أو فندق.";
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

      if (intent === "TALK_HEALTH") {
        responseText = "I am sorry to hear that. 🩺 Which part of your body hurts? Your head, throat, or stomach?";
        tutorNote = "وصفت تعبك للطبيب! هو بيسألك دلوقتي عن العضو المؤلم لتشخيص الحالة.";
      } else if (cleanMsg.includes("head") || cleanMsg.includes("stomach") || cleanMsg.includes("throat") || cleanMsg.includes("leg")) {
        responseText = "I see. I will write a medicine prescription. 💊 Take it, rest, and drink warm water. Okay?";
        tutorNote = "حددت العضو! الطبيب كتبلك الدواء وبيديك نصيحة بالراحة.";
      } else {
        responseText = "I want to help you feel better. Describe your pain or sickness.";
        tutorNote = "أوصف للطبيب حالتك بحرية: I feel sick and have a fever.";
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

      if (intent === "TALK_WEATHER_HOBBIES") {
        responseText = "I agree, sunny days are perfect! ⚽ What hobby do you want to do? Play football or watch a movie?";
        tutorNote = "اتكلمت عن الطقس أو الهواية! أليكس بيقترح عليك أنشطة.";
      } else if (intent === "CONFIRM") {
        responseText = "Awesome, let's meet at 4 PM! 🤝 It is going to be so much fun!";
        tutorNote = "اتفقتوا على الميعاد والتجمع سوا بنجاح.";
      } else {
        responseText = "It is a beautiful weekend. What are your favorite outdoor plans?";
        tutorNote = "أليكس مستني يعرف إيه خطتك وهوايتك للخروج.";
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
  
  // Clone goals
  activeGoals = sc.goals.map(g => ({ ...g, completed: false }));

  renderChatWindow();
  
  // Speak welcome message
  setTimeout(() => speakText(sc.botWelcome), 500);
}

function renderChatWindow() {
  const container = document.getElementById("chat-coach-section");
  if (!container) return;

  const progress = getProgress();
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
    // Generate Bot response from Intent-based engine
    const { responseText, tutorNote } = activeScenario.generateResponse(cleanMsg, activeGoals);
    
    isBotTyping = false;

    chatHistory.push({ sender: 'bot', text: responseText, tutorNote: tutorNote });
    addXP(10); // Message exchange reward

    renderChatWindow();
    speakText(responseText);
  }, 1500);
}

function showCoachingFinishedView() {
  if (chatRecognition) {
    try { chatRecognition.stop(); } catch(e){}
    chatRecognition = null;
  }
  
  chatState = 'finished';
  sfx.playCelebration();
  addXP(100); // Mastery completion bonus!

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
