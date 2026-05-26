/**
 * Final Mastery Test & Certificate Component
 * Egyptian English Academy
 * Strictly English UI, isolated Egyptian Arabic tutoring content.
 * Integrates Synthesized Sound Effects (SFX).
 */

import { getProgress, saveFinalTestScore } from '../storage.js';
import { curriculum } from '../data/curriculum.js';
import { sfx } from '../audioEffects.js';
import { generateCumulativeExamQuestions } from '../data/questionGenerator.js';
import { startSession } from './sessionRunner.js';

let examScore = 0;
let examQuestions = [];

export function initFinalTest() {
  const progress = getProgress();
  const allCompleted = progress.completedLessons.length === curriculum.length;
  
  const container = document.getElementById("final-test-section");
  if (!container) return;

  if (!allCompleted) {
    renderLockedScreen(container, progress);
    return;
  }

  if (progress.finalTestScore !== null && progress.finalTestScore >= 40) {
    renderCertificateView(container);
  } else {
    renderIntroScreen(container);
  }
}

function renderLockedScreen(container, progress) {
  container.innerHTML = `
    <div class="quiz-container cert-locked-state">
      <div class="results-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
      </div>
      <h2>Mastery Exam Locked</h2>
      <p class="cert-locked-desc">
        You must complete all 40 roadmap lessons and pass their quizzes to unlock the cumulative final exam.
      </p>
      
      <div class="tutor-arabic-card cert-locked-tutor">
        <p class="ar-text">
          يا بطل، لازم تخلص الـ 40 درساً كاملة وتعدي اختباراتهم بنجاح عشان تفتح الامتحان الشامل وتنافس على الشهادة الفخمة! إنت مخلص حالياً ${progress.completedLessons.length} دروس فقط.
        </p>
      </div>
      
      <a href="#roadmap" class="btn btn-primary">Go to Lessons Roadmap</a>
    </div>
  `;
}

function renderIntroScreen(container) {
  container.innerHTML = `
    <div class="quiz-container cert-intro-state">
      <div class="results-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </div>
      <h1>A1 Level Mastery Exam</h1>
      <p class="cert-intro-desc">
        This cumulative test has 50 questions covering grammar, vocabulary, listening, reading, writing, and speaking from all 40 lessons.
        Score 80%+ (40/50) to graduate and claim your certificate!
      </p>
      
      <div class="tutor-arabic-card cert-intro-tutor">
        <p class="ar-text">
          جاهز يا وحش الإنجليزي للمحطة الأخيرة؟ الامتحان ده بيقيس مستواك في كل اللي فات وبيتكون من 50 سؤال. هتحتاج تجيب 40 من 50 عشان تاخد شهادة التخرج بتوقيع المدرس!
        </p>
      </div>
      
      <div>
        <button class="btn btn-accent" onclick="window.startFinalExamNow()">Start Exam Now</button>
      </div>
    </div>
  `;

  window.startFinalExamNow = function() {
    startExamSession();
  };
}

function startExamSession() {
  const progress = getProgress();
  const completedIds = progress.completedLessons || [];
  const completedLessons = curriculum.filter(l => completedIds.includes(l.id));

  examQuestions = generateCumulativeExamQuestions(completedLessons);
  
  startSession(examQuestions, {
    mode: 'final',
    containerId: 'final-test-section',
    onComplete: (score, total) => {
      examScore = score;
      showExamResults(score, total);
    },
    onExit: () => {
      window.location.hash = '#roadmap';
    }
  });
}

function showExamResults(score, total) {
  const container = document.getElementById("final-test-section");
  if (!container) return;

  const passed = score >= 40;
  saveFinalTestScore(score);

  let icon = passed 
    ? `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path></svg>`
    : `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--error)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>`;
  
  let commentEn = passed 
    ? "Excellent job, Graduate! You passed the cumulative exam and demonstrated proficiency at the A1 Level. Enter your name below to print your certificate!"
    : "You did not achieve the required 80% passing score (40/50). Do not worry! Review your lessons and try again.";
    
  let commentAr = passed
    ? "يا واد يا عبقري! إنت أثبت جدارتك وقفلت الامتحان الشامل بنجاح. مبروك عليك إتمام المستوى A1 بنجاح تام! اكتب اسمك تحت عشان نطبعلك شهادة معتمدة فخمة!"
    : "محاولة كويسة يا بطل، بس النتيجة لسة أقل من المطلوب. راجع الدروس اللي غلطت فيها وعيد الاختبار تاني، هتحتاج تجيب 40 من 50 عشان تاخد الشهادة المرة الجاية!";

  if (passed) {
    sfx.playCelebration();
  } else {
    sfx.playIncorrect();
  }

  container.innerHTML = `
    <div class="quiz-results-card">
      <div class="results-icon-wrapper-clean">${icon}</div>
      <div class="results-grade">${score} / ${total}</div>
      <div class="results-xp">${passed ? '+300 XP (Mastery Bonus)' : '+50 XP (Practice)'}</div>
      
      <p class="cert-results-desc">${commentEn}</p>
      
      <div class="tutor-arabic-card cert-results-tutor">
        <p class="ar-text cert-results-tutor-text">${commentAr}</p>
      </div>
      
      <div class="cert-results-actions">
        ${passed 
          ? `<button class="btn btn-accent" onclick="window.showCertificateForm()">Get Certificate</button>`
          : `<button class="btn btn-primary" onclick="window.retryExamNow()">Retry Exam</button>
             <a href="#roadmap" class="btn btn-secondary">Back to Roadmap</a>`
        }
      </div>
    </div>
  `;

  window.showCertificateForm = function() {
    renderCertificateView(container);
  };

  window.retryExamNow = function() {
    startExamSession();
  };
}

function renderCertificateView(container) {
  const progress = getProgress();
  
  /* Ornate corner SVG path for all four corners */
  const cornerSVG = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M2 2 C2 2, 2 40, 2 50 C2 55, 4 58, 8 60 C12 62, 20 64, 30 66 C35 67, 38 68, 40 70 C42 72, 44 75, 44 78 M2 2 C2 2, 40 2, 50 2 C55 2, 58 4, 60 8 C62 12, 64 20, 66 30 C67 35, 68 38, 70 40 C72 42, 75 44, 78 44" fill="none" stroke="#d4af37" stroke-width="2.5"/><circle cx="8" cy="8" r="3" fill="#d4af37"/><path d="M12 2 Q20 12, 2 12" fill="none" stroke="#d4af37" stroke-width="1.5"/><path d="M2 20 Q14 18, 20 2" fill="none" stroke="#d4af37" stroke-width="1"/></svg>`;

  /* Flourish SVG divider used above and below the student name */
  const flourishSVG = `<svg class="cert-divider-flourish" viewBox="0 0 300 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 Q30 0, 60 10 T120 10 T180 10 T240 10 T300 10" fill="none" stroke="#d4af37" stroke-width="1.2"/><path d="M100 10 Q120 2, 150 10 Q180 2, 200 10" fill="none" stroke="#d4af37" stroke-width="1.8"/><circle cx="150" cy="10" r="2.5" fill="#d4af37"/><circle cx="130" cy="10" r="1.2" fill="#d4af37"/><circle cx="170" cy="10" r="1.2" fill="#d4af37"/></svg>`;
  
  /* Large watermark emblem SVG for the background */
  const watermarkSVG = `<svg class="cert-watermark" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="90" fill="none" stroke="#d4af37" stroke-width="1.5"/><circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" stroke-width="0.8" stroke-dasharray="4,4"/><circle cx="100" cy="100" r="65" fill="none" stroke="#d4af37" stroke-width="0.5"/><text x="100" y="95" text-anchor="middle" font-family="Cinzel,serif" font-size="16" font-weight="700" fill="#d4af37">EGYPTIAN</text><text x="100" y="115" text-anchor="middle" font-family="Cinzel,serif" font-size="12" fill="#d4af37">ENGLISH ACADEMY</text><polygon points="100,30 106,48 125,48 110,58 116,76 100,66 84,76 90,58 75,48 94,48" fill="#d4af37" opacity="0.6"/></svg>`;

  if (!progress.fullName) {
    container.innerHTML = `
      <div class="certificate-section-wrapper cert-name-prompt-wrapper">
        <div class="cert-name-prompt-card">
          <div class="results-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2>Enter Certificate Name</h2>
          <p class="cert-name-prompt-desc">
            Enter your full name as you want it to appear on your official certificate.
          </p>
          
          <div class="tutor-arabic-card cert-name-prompt-tutor">
            <p class="ar-text cert-name-prompt-tutor-text">
              اكتب اسمك الثلاثي باللغة الإنجليزية أو العربية بوضوح عشان يتكتب في نسختك الرسمية من الشهادة يا بطل!
            </p>
          </div>
          
          <input type="text" id="cert-fullname-input" class="cert-name-input" placeholder="e.g. Ahmed Aly Mansour">
          <button class="btn btn-accent cert-btn-full" onclick="window.generateCert()">Generate Certificate</button>
        </div>
      </div>
    `;
    return;
  }

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  container.innerHTML = `
    <div class="certificate-section-wrapper">
      <div class="certificate-frame-container" id="printable-certificate">
        
        <div class="certificate-decor-corner decor-tl">${cornerSVG}</div>
        <div class="certificate-decor-corner decor-tr">${cornerSVG}</div>
        <div class="certificate-decor-corner decor-bl">${cornerSVG}</div>
        <div class="certificate-decor-corner decor-br">${cornerSVG}</div>
        
        ${watermarkSVG}
        
        <div class="cert-content">
          
          <div class="cert-badge-wrapper">
            <div class="cert-badge-gold">
              <svg class="cert-badge-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="25%" stop-color="#fff5a0" />
                    <stop offset="50%" stop-color="#e1ad21" />
                    <stop offset="85%" stop-color="#8d6508" />
                    <stop offset="100%" stop-color="#553a00" />
                  </linearGradient>
                  <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#fffce0" />
                    <stop offset="50%" stop-color="#d4af37" />
                    <stop offset="100%" stop-color="#644e14" />
                  </linearGradient>
                  <linearGradient id="darkRoyal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#141a2e" />
                    <stop offset="50%" stop-color="#0a0d18" />
                    <stop offset="100%" stop-color="#05060b" />
                  </linearGradient>
                  <path id="textPathTop" d="M 32 100 A 68 68 0 0 1 168 100" fill="none" />
                  <path id="textPathBottom" d="M 32 100 A 68 68 0 0 0 168 100" fill="none" />
                  <g id="wreathBranch">
                    <path d="M 75 142 C 55 125, 55 85, 75 62" fill="none" stroke="url(#goldGrad2)" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M 72 135 C 60 137, 52 128, 58 122 C 64 116, 72 122, 72 135 Z" fill="url(#goldGrad1)"/>
                    <path d="M 62 118 C 50 117, 44 107, 51 101 C 58 95, 64 104, 62 118 Z" fill="url(#goldGrad1)"/>
                    <path d="M 57 98 C 45 95, 42 84, 49 79 C 56 74, 61 83, 57 98 Z" fill="url(#goldGrad1)"/>
                    <path d="M 59 78 C 49 73, 50 62, 57 59 C 64 56, 66 65, 59 78 Z" fill="url(#goldGrad1)"/>
                    <path d="M 70 62 C 62 54, 65 44, 72 43 C 79 42, 78 52, 70 62 Z" fill="url(#goldGrad1)"/>
                    <circle cx="65" cy="107" r="2" fill="url(#goldGrad2)"/>
                    <circle cx="60" cy="87" r="2" fill="url(#goldGrad2)"/>
                  </g>
                </defs>
                <circle cx="100" cy="100" r="95" fill="url(#goldGrad2)" />
                <circle cx="100" cy="100" r="91" fill="url(#darkRoyal)" />
                <circle cx="100" cy="100" r="86" fill="none" stroke="url(#goldGrad1)" stroke-width="2" stroke-dasharray="0 6" stroke-linecap="round" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#goldGrad2)" stroke-width="1.2" />
                <text font-family="'Cinzel', serif" font-size="8.2" font-weight="800" fill="url(#goldGrad1)" letter-spacing="0.8">
                  <textPath href="#textPathTop" startOffset="50%" text-anchor="middle">EGYPTIAN ENGLISH ACADEMY</textPath>
                </text>
                <text font-family="'Cinzel', serif" font-size="8.2" font-weight="800" fill="url(#goldGrad1)" letter-spacing="0.8">
                  <textPath href="#textPathBottom" startOffset="50%" text-anchor="middle">★ SEAL OF EXCELLENCE ★</textPath>
                </text>
                <use href="#wreathBranch" />
                <use href="#wreathBranch" transform="translate(200, 0) scale(-1, 1)" />
                <g transform="translate(0, -6)">
                  <polygon points="100,72 133,83 100,94 67,83" fill="url(#goldGrad1)" stroke="#4a3300" stroke-width="0.5" />
                  <path d="M 76,87 L 76,96 C 76,102 124,102 124,96 L 124,87 C 124,90 76,90 76,87 Z" fill="url(#goldGrad2)" stroke="#4a3300" stroke-width="0.5" />
                  <path d="M 100,83 L 122,89 L 122,103" fill="none" stroke="url(#goldGrad1)" stroke-width="1.2" stroke-linecap="round" />
                  <polygon points="120,103 122,108 124,103" fill="url(#goldGrad1)" />
                </g>
                <text x="100" y="132" text-anchor="middle" font-family="'Cinzel', serif" font-size="22" font-weight="900" fill="url(#goldGrad1)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.6))">A1</text>
                <text x="100" y="146" text-anchor="middle" font-family="'Montserrat', sans-serif" font-size="8" font-weight="800" letter-spacing="2" fill="url(#goldGrad2)">MASTERY</text>
              </svg>
            </div>
          </div>
          
          <h1 class="cert-main-title">Certificate of Completion</h1>
          <p class="cert-subtitle">A1 ELEMENTARY ENGLISH MASTERY</p>
          
          <span class="cert-presented-to">This certificate is proudly presented to</span>
          
          ${flourishSVG}
          <div class="cert-student-name">${progress.fullName}</div>
          ${flourishSVG}
          
          <p class="cert-achievement-text">
            For successfully completing all 40 lessons, interactive practice sections, 
            lesson assessments, and the cumulative mastery examination, thereby demonstrating 
            proficiency in English grammar, vocabulary, listening, reading, writing, 
            and speaking at the A1 Elementary Level.
          </p>
          
          <div class="cert-footer-row">
            <div class="cert-signature-block">
              <span class="cert-sig-drawing">El-Moallem</span>
              <div class="cert-sig-line"></div>
              <span class="cert-sig-name">Egyptian English Academy</span>
              <span class="cert-sig-title">Academy Director</span>
            </div>
            
            <div class="cert-signature-block">
              <span class="cert-verified-id">
                EEA-${progress.xp}-${Math.floor(Math.random()*9000 + 1000)}
              </span>
              <div class="cert-sig-line"></div>
              <span class="cert-sig-name">${today}</span>
              <span class="cert-sig-title">Date of Issue</span>
            </div>
          </div>
        </div>
      </div>

      <div class="cert-actions-row">
        <button class="btn btn-accent btn-cert-action-svg-adjust" onclick="window.printCertificate()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          <span>Print / Save PDF</span>
        </button>
        <button class="btn btn-secondary btn-cert-action-svg-adjust" onclick="window.resetCertName()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path></svg>
          <span>Change Name</span>
        </button>
      </div>
    </div>
  `;
}

window.generateCert = function() {
  const input = document.getElementById("cert-fullname-input");
  if (!input || !input.value.trim()) return;

  const name = input.value.trim();
  saveFinalTestScore(examScore, name);
  initFinalTest();
};

window.printCertificate = function() {
  window.print();
};

window.resetCertName = function() {
  const progress = getProgress();
  progress.fullName = "";
  localStorage.setItem("egyptian_english_academy_progress", JSON.stringify(progress));
  initFinalTest();
};
