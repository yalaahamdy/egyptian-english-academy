/**
 * Dashboard Component
 * Egyptian English Academy
 * Strictly English UI, isolated Egyptian Arabic tutoring content.
 * Features SVG Circular Progress and detailed performance metrics.
 */

import { getProgress } from '../storage.js';
import { curriculum } from '../data/curriculum.js';
// Flashcards are replaced by Vocab Recitation progress

export function renderDashboard() {
  const container = document.getElementById("dashboard-section");
  if (!container) return;

  const progress = getProgress();
  
  // Calculate Stats
  const completedCount = progress.completedLessons.length;
  const totalLessons = curriculum.length;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);
  
  // Calculate total and recited words dynamically
  const totalWords = curriculum.reduce((sum, lesson) => sum + (lesson.vocabulary ? lesson.vocabulary.length : 0), 0);
  const recitedWordsCount = (progress.completedVocabRecitations || []).reduce((sum, lessonId) => {
    const lesson = curriculum.find(l => l.id === lessonId);
    return sum + (lesson && lesson.vocabulary ? lesson.vocabulary.length : 0);
  }, 0);
  const completedVocabCount = (progress.completedVocabRecitations || []).length;
  
  // Calculate detailed performance percentages
  const grammarPercent = completionPercentage;
  const vocabPercent = totalWords > 0 ? Math.round((recitedWordsCount / totalWords) * 100) : 0;
  
  // Average Quiz Score calculation
  const quizScoresArray = Object.values(progress.quizScores);
  const avgQuizScore = quizScoresArray.length > 0
    ? Math.round((quizScoresArray.reduce((sum, score) => sum + score, 0) / (quizScoresArray.length * 5)) * 100)
    : 0;

  // Find next lesson to study
  let nextLesson = curriculum[0];
  for (let i = 0; i < curriculum.length; i++) {
    const id = curriculum[i].id;
    if (!progress.completedLessons.includes(id)) {
      nextLesson = curriculum[i];
      break;
    }
  }

  const allLessonsDone = completedCount === totalLessons;
  
  // SVG circular properties
  const radius = 26;
  const circumference = 2 * Math.PI * radius; // ~163.36
  const strokeDashoffset = circumference - (circumference * completionPercentage) / 100;

  // Render HTML
  container.innerHTML = `
    <div class="welcome-banner">
      <div class="welcome-text">
        <h1>Welcome Back, Champion!</h1>
        <div class="tutor-arabic-card dashboard-welcome-banner-tutor">
          <p class="ar-text">جاهز تكمل رحلتك النهاردة؟ كل خطوة بتاخدها بتقربك من إتقان المستوى A1. كمل مذاكرة وحل الكويزات عشان تلم نقاط XP وتفتح الشهادة الذهبية!</p>
        </div>
        <div class="welcome-action">
          ${allLessonsDone 
            ? `<a href="#final-test" class="btn btn-accent">Final Mastery Exam</a>`
            : `<a href="#lesson-viewer?id=${nextLesson.id}" class="btn btn-primary">Study: ${nextLesson.title}</a>`
          }
        </div>
      </div>
      <div>
        <img class="welcome-image-mock" src="././icon/logo.png" alt="EE Academy Logo">
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Card 1: Completed Lessons -->
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        </div>
        <div>
          <div class="stat-value">${completedCount} / ${totalLessons}</div>
          <div class="stat-label">Lessons Completed</div>
        </div>
      </div>

      <!-- Card 2: Recited Words -->
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
        </div>
        <div>
          <div class="stat-value">${recitedWordsCount} / ${totalWords}</div>
          <div class="stat-label">Words Recited</div>
        </div>
      </div>

      <!-- Card 3: Experience Points -->
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        </div>
        <div>
          <div class="stat-value">${progress.xp}</div>
          <div class="stat-label">Total XP</div>
        </div>
      </div>

      <!-- Card 4: Course Progress (SVG Circular Ring) -->
      <div class="stat-card stat-card-progress">
        <div class="stat-progress-ring-wrapper">
          <svg width="64" height="64" viewBox="0 0 64 64" class="stat-progress-ring-svg">
            <circle cx="32" cy="32" r="${radius}" stroke="rgba(255,255,255,0.05)" stroke-width="6" fill="transparent"/>
            <circle cx="32" cy="32" r="${radius}" stroke="var(--primary)" stroke-width="6" fill="transparent"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
                    stroke-linecap="round" class="stat-progress-ring-circle-transition"/>
          </svg>
          <div class="stat-progress-ring-text">
            ${completionPercentage}%
          </div>
        </div>
        <div class="stat-progress-text-wrapper">
          <div class="stat-progress-value">Progress</div>
          <div class="stat-label">${completedCount} of ${totalLessons} Lessons</div>
        </div>
      </div>
    </div>

    <!-- Triple Column Details Layout -->
    <div class="dashboard-details-grid">
      
      <!-- Column 1: Study Path -->
      <div class="dashboard-panel">
        <h3 class="panel-title">Current Study Path</h3>
        <div class="roadmap-preview">
          ${curriculum.slice(0, 4).map(lesson => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isUnlocked = lesson.id === 1 || progress.completedLessons.includes(lesson.id - 1);
            let statusClass = "locked";
            let statusText = "Locked";

            if (isCompleted) {
              statusClass = "completed";
              statusText = "Completed";
            } else if (isUnlocked) {
              statusClass = "unlocked";
              statusText = "Available";
            }

            return `
              <div class="roadmap-preview-card ${statusClass} roadmap-preview-card-clean">
                <div class="card-main-info roadmap-card-main-info">
                  <div class="card-num roadmap-card-num-clean">${lesson.id}</div>
                  <div class="preview-text">
                    <h4 class="roadmap-preview-text-title">${lesson.title}</h4>
                    <p class="roadmap-preview-text-desc">${lesson.description.substring(0, 42)}...</p>
                  </div>
                </div>
                <div>
                  <span class="badge ${isCompleted ? 'badge-success' : isUnlocked ? 'badge-primary' : 'badge-warning'} roadmap-preview-badge">
                    ${statusText}
                  </span>
                </div>
              </div>
            `;
          }).join('')}
          <div class="dashboard-center-margin-top">
            <a href="#roadmap" class="btn btn-secondary roadmap-preview-view-all-btn">View Full Roadmap</a>
          </div>
        </div>
      </div>

      <!-- Column 2: Performance Indicators (XP bars for skills) -->
      <div class="dashboard-panel">
        <h3 class="panel-title">Skill Performance</h3>
        <div class="skill-perf-list">
          
          <!-- Grammar Level Progress -->
          <div class="skill-perf-item">
            <div class="skill-perf-header">
              <span>Grammar Mastery</span>
              <span class="skill-perf-percentage">${grammarPercent}%</span>
            </div>
            <div class="skill-perf-bar-clean">
              <div class="skill-perf-fill-clean" style="width: ${grammarPercent}%;"></div>
            </div>
          </div>

          <!-- Vocabulary Level Progress -->
          <div class="skill-perf-item">
            <div class="skill-perf-header">
              <span>Vocabulary Mastered</span>
              <span class="skill-perf-percentage">${vocabPercent}%</span>
            </div>
            <div class="skill-perf-bar-clean">
              <div class="skill-perf-fill-clean" style="width: ${vocabPercent}%;"></div>
            </div>
          </div>

          <!-- Quiz Scores Progress -->
          <div class="skill-perf-item">
            <div class="skill-perf-header">
              <span>Average Quiz Grade</span>
              <span class="skill-perf-percentage">${avgQuizScore}%</span>
            </div>
            <div class="skill-perf-bar-clean">
              <div class="skill-perf-fill-clean" style="width: ${avgQuizScore}%;"></div>
            </div>
          </div>

          <!-- Final Exam readiness -->
          <div class="skill-perf-item">
            <div class="skill-perf-header">
              <span>Exam Readiness</span>
              <span class="skill-perf-percentage">${completionPercentage === 100 ? '100' : Math.round(completionPercentage * 0.9)}%</span>
            </div>
            <div class="skill-perf-bar-clean">
              <div class="skill-perf-fill-clean" style="width: ${completionPercentage === 100 ? 100 : Math.round(completionPercentage * 0.9)}%;"></div>
            </div>
          </div>

        </div>
      </div>

      <!-- Column 3: Vocab Recitation widget -->
      <div class="dashboard-panel">
        <h3 class="panel-title">Vocab Recitation</h3>
        <div class="review-widget">
          <div class="review-circle-wrapper vocab-recite-circle-wrapper">
            <div class="review-number">${completedVocabCount} / ${totalLessons}</div>
            <div class="review-desc vocab-recite-desc">
              Lessons where you fully recited and memorized all vocabulary.
            </div>
            <a href="#vocab-center" class="btn btn-accent vocab-recite-btn">Start Recitation</a>
          </div>
          
          <div class="vocab-recite-coach-wrapper">
            <h4 class="vocab-recite-coach-title">Tutor Coach Tip</h4>
            <div class="tutor-arabic-card vocab-recite-coach-card">
              <p class="ar-text vocab-recite-coach-text">
                "تسميع كلمات الدرس نطقاً وكتابة شرط أساسي للانتقال للدرس الجاي! ادخل على مركز الكلمات وسمّعها يا بطل."
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}
