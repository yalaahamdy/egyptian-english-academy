/**
 * Roadmap Component
 * Egyptian English Academy
 * Strictly English UI, isolated Egyptian Arabic tutoring content.
 * Features a gamified, concise Unit selector board and lesson journey track.
 */

import { getProgress } from '../storage.js';
import { curriculum, units } from '../data/curriculum.js';

let selectedUnitId = null;

export function renderRoadmap() {
  const container = document.getElementById("roadmap-section");
  if (!container) return;

  const progress = getProgress();

  // Find the user's active unit to select it by default
  const nextLesson = curriculum.find(lesson => !progress.completedLessons.includes(lesson.id)) || curriculum[curriculum.length - 1];
  const activeUnitId = nextLesson ? nextLesson.unitId : 10;
  
  if (selectedUnitId === null) {
    selectedUnitId = activeUnitId;
  }

  // Bind select function globally
  window.selectRoadmapUnit = function(unitId) {
    selectedUnitId = parseInt(unitId);
    renderRoadmap();
  };

  const selectedUnit = units.find(u => u.id === selectedUnitId) || units[0];

  // 1. Header Section
  let html = `
    <div class="roadmap-header">
      <h1 class="roadmap-main-title">A1 Learning Journey</h1>
      <p class="roadmap-main-subtitle">Choose a unit and follow the step-by-step lesson track to master English!</p>
      
      <div class="tutor-arabic-card roadmap-tutor-banner">
        <p class="ar-text">
          رحلتك التعليمية للمستوى A1 مقسمة لـ 10 وحدات تفاعلية. اختر الوحدة النشطة وابدأ الدروس بالترتيب، كل درس يتطلب تسميع الكلمات واجتياز الكويز بنسبة 90% لفتح التالي!
        </p>
      </div>
    </div>
  `;

  // 2. Unit Grid Selection Board
  html += `
    <div class="roadmap-unit-grid">
  `;

  units.forEach(unit => {
    const completedCount = unit.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const progressPercent = Math.round((completedCount / unit.lessons.length) * 100);
    const isUnitCompleted = completedCount === unit.lessons.length;
    
    const isUnitUnlocked = unit.id === 1 || 
                           progress.completedLessons.includes(unit.lessons[0].id - 1) ||
                           unit.lessons.some(l => progress.completedLessons.includes(l.id));

    const isSelected = unit.id === selectedUnitId;
    
    let statusClass = "locked";
    if (isUnitCompleted) statusClass = "completed";
    else if (isUnitUnlocked) statusClass = "unlocked";

    const clickHandler = isUnitUnlocked 
      ? `onclick="window.selectRoadmapUnit(${unit.id})"`
      : `onclick="alert('This Unit is locked! Complete the previous unit lessons first.')"`;

    html += `
      <div class="unit-select-card ${statusClass} ${isSelected ? 'selected' : ''}" ${clickHandler}>
        <div class="unit-select-progress">
          <svg width="40" height="40" viewBox="0 0 36 36" class="progress-ring-svg">
            <circle class="ring-bg" cx="18" cy="18" r="14" stroke-width="3" fill="transparent"/>
            <circle class="ring-fill ${isUnitCompleted ? 'completed' : 'unlocked'}" cx="18" cy="18" r="14" stroke-width="3" fill="transparent"
                    style="stroke-dasharray: 88; stroke-dashoffset: ${88 - (88 * progressPercent) / 100};"
                    stroke-linecap="round" />
          </svg>
          <div class="progress-ring-text">${completedCount}/4</div>
        </div>
        <div class="unit-select-info">
          <span class="unit-label">UNIT ${unit.id}</span>
          <h3 class="unit-title">${unit.title}</h3>
        </div>
        ${!isUnitUnlocked ? `
          <div class="unit-lock-overlay">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `
    </div>
  `;

  // 3. Journey Track for the Selected Unit
  html += `
    <div class="journey-section-title">
      <h2>Unit ${selectedUnitId} Lesson Track: <span class="unit-title-highlight">${selectedUnit.title}</span></h2>
      <p>${selectedUnit.description}</p>
    </div>
    
    <div class="journey-track-container">
      <div class="journey-track-line"></div>
  `;

  selectedUnit.lessons.forEach((lesson, index) => {
    const isLessonCompleted = progress.completedLessons.includes(lesson.id);
    const isLessonUnlocked = lesson.id === 1 || progress.completedLessons.includes(lesson.id - 1);
    
    const isVocabPassed = progress.completedVocabRecitations && progress.completedVocabRecitations.includes(lesson.id);
    const isPracticePassed = progress.completedPractices && progress.completedPractices.includes(lesson.id);
    const isQuizPassed = progress.quizScores[lesson.id] >= 14;

    let lessonStatus = "locked";
    let badgeText = "Locked";
    let badgeClass = "badge-warning";
    let buttonHtml = `<button class="btn btn-secondary btn-sm" disabled>Locked</button>`;

    if (isLessonCompleted) {
      lessonStatus = "completed";
      badgeText = "Completed ✓";
      badgeClass = "badge-success";
      buttonHtml = `<a href="#lesson-viewer?id=${lesson.id}" class="btn btn-secondary btn-sm btn-next-svg-adjust"><span>Review</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>`;
    } else if (isLessonUnlocked) {
      lessonStatus = "active";
      badgeText = "Active";
      badgeClass = "badge-primary";
      buttonHtml = `<a href="#lesson-viewer?id=${lesson.id}" class="btn btn-primary btn-sm btn-next-svg-adjust study-glow-btn"><span>Study Now</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>`;
    }

    // Milestones sub-badges inside the card
    let milestonesHtml = '';
    if (isLessonUnlocked) {
      milestonesHtml = `
        <div class="lesson-milestones-list">
          <span class="milestone-badge ${isVocabPassed ? 'done' : 'pending'}">
            <span class="dot"></span> Vocab Recited
          </span>
          <span class="milestone-badge ${isPracticePassed ? 'done' : 'pending'}">
            <span class="dot"></span> Practice Completed
          </span>
          <span class="milestone-badge ${isQuizPassed ? 'done' : 'pending'}">
            <span class="dot"></span> Quiz Passed (14/15)
          </span>
        </div>
      `;
    }

    html += `
      <div class="journey-node ${lessonStatus}">
        <div class="journey-node-dot">
          ${isLessonCompleted ? '✓' : index + 1}
        </div>
        <div class="journey-node-card">
          <div class="journey-card-header">
            <span class="lesson-index">LESSON ${lesson.id}</span>
            <span class="badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="journey-card-body">
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            ${milestonesHtml}
          </div>
          <div class="journey-card-footer">
            ${buttonHtml}
          </div>
        </div>
      </div>
    `;
  });

  // Final Mastery Test Golden Trophy Card at the end of Unit 10 Journey
  if (selectedUnitId === 10) {
    const allLessonsCompleted = progress.completedLessons.length === curriculum.length;
    const hasPassedFinalTest = progress.finalTestScore !== null && progress.finalTestScore >= 16;
    
    let finalStatusClass = "locked";
    let finalBadgeText = "Locked";
    let finalBadgeClass = "badge-warning";
    let finalBtnHtml = `<button class="btn btn-secondary btn-sm" disabled>Locked</button>`;

    if (hasPassedFinalTest) {
      finalStatusClass = "completed";
      finalBadgeText = "Graduated 🎓";
      finalBadgeClass = "badge-success";
      finalBtnHtml = `<a href="#final-test" class="btn btn-accent btn-sm"><span>View Certificate</span></a>`;
    } else if (allLessonsCompleted) {
      finalStatusClass = "active";
      finalBadgeText = "Ready";
      finalBadgeClass = "badge-primary";
      finalBtnHtml = `<a href="#final-test" class="btn btn-accent btn-sm study-glow-btn btn-next-svg-adjust"><span>Take Final Exam</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg></a>`;
    }

    html += `
      <div class="journey-node final-mastery-node ${finalStatusClass}">
        <div class="journey-node-dot trophy-dot">
          🏆
        </div>
        <div class="journey-node-card final-mastery-card">
          <div class="journey-card-header">
            <span class="lesson-index">GRADUATION</span>
            <span class="badge ${finalBadgeClass}">${finalBadgeText}</span>
          </div>
          <div class="journey-card-body">
            <h3 class="gold-text">A1 Academy Graduation Exam</h3>
            <p>Demonstrate your mastery over all 40 lessons. Pass this 20-question cumulative exam with 80% to earn your official academy graduation certificate!</p>
            ${progress.finalTestScore !== null ? `
              <div class="final-score-display">Best Score: <strong>${progress.finalTestScore} / 20</strong></div>
            ` : ''}
          </div>
          <div class="journey-card-footer">
            ${finalBtnHtml}
          </div>
        </div>
      </div>
    `;
  }

  html += `
    </div>
  `;

  container.innerHTML = html;
}
window.renderRoadmap = renderRoadmap;
