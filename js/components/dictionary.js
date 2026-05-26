/**
 * Dictionary / Cheat Sheet Component
 * Egyptian English Academy
 * Strictly English UI, isolated Egyptian Arabic tutoring content.
 */

import { flashcards } from '../data/flashcards.js';
import { speakText } from './lessonViewer.js';
import { getProgress, updateCardStatus } from '../storage.js';
import { curriculum } from '../data/curriculum.js';

let searchQuery = "";
let filterLesson = "all";

export function renderDictionary() {
  const container = document.getElementById("dictionary-section");
  if (!container) return;

  container.innerHTML = `
    <div class="section-header">
      <h1 class="section-title">A1 English Vocabulary Dictionary</h1>
      <p class="section-subtitle">Search and study all vocabulary words from the curriculum.</p>
      
      <div class="tutor-arabic-card dict-header-tutor">
        <p class="ar-text vocab-tutor-text">
          القاموس التفاعلي الشامل - ابحث عن أي كلمة أو عبارة بالإنجليزي أو العربي، واسمع نطقها ونطق الأمثلة عليها بالعامية المصرية!
        </p>
      </div>
    </div>

    <!-- Search Controls -->
    <div class="flashcards-filters dict-filters-box">
      <div class="filters-row">
        <div class="dict-search-wrapper">
          <span class="dict-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" id="dict-search-input" class="dict-search-input" placeholder="Search by English word or Arabic translation..." 
                 value="${searchQuery}" oninput="window.handleDictSearch(this.value)">
        </div>
        
        <div class="dict-filter-lesson-wrapper">
          <span class="dict-filter-lesson-label">Lesson:</span>
          <select id="dict-filter-lesson" class="filter-select" onchange="window.handleDictLessonFilter(this.value)">
            <option value="all" ${filterLesson === 'all' ? 'selected' : ''}>All Lessons</option>
            ${curriculum.map(l => `
              <option value="${l.id}" ${filterLesson === String(l.id) ? 'selected' : ''}>Lesson ${l.id}: ${l.title}</option>
            `).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- Results Grid -->
    <div id="dictionary-grid-container" class="dict-grid-container"></div>
  `;

  renderGrid();
}

function renderGrid() {
  const gridContainer = document.getElementById("dictionary-grid-container");
  if (!gridContainer) return;

  const progress = getProgress();
  const query = searchQuery.toLowerCase().trim();

  const filtered = flashcards.filter(card => {
    // 1. Filter by Lesson
    if (filterLesson !== "all" && card.lessonId !== parseInt(filterLesson)) {
      return false;
    }

    // 2. Filter by Search Query (word, translation, example, exampleTranslation)
    if (query) {
      const matchWord = card.word.toLowerCase().includes(query);
      const matchTrans = card.translation.toLowerCase().includes(query);
      const matchExample = card.example.toLowerCase().includes(query);
      
      return matchWord || matchTrans || matchExample;
    }

    return true;
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-deck-state dict-empty-padded">
        <div class="empty-deck-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <p class="dict-empty-title">No words match your search criteria.</p>
        <p class="dict-empty-desc">Try typing another word or selecting another lesson category.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = `
    <div class="dict-cards-grid">
      ${filtered.map(card => {
        const isBookmarked = progress.reviewCards.includes(card.id);
        return `
          <div class="stat-card dict-card">
            <div>
              <div class="dict-card-header">
                <div class="dict-card-bookmark-section">
                  <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" 
                          onclick="window.toggleDictBookmark(${card.id})" 
                          title="${isBookmarked ? 'Remove from Review Deck' : 'Add to Review Deck'}">
                    ${isBookmarked 
                      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
                      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
                    }
                  </button>
                  <span class="dict-card-lesson-tag">Lesson ${card.lessonId}</span>
                </div>
              </div>
              
              <div class="dict-card-word-row">
                <h3 class="dict-card-word audio-example-row" style="cursor: pointer;" onclick="window.speakDictWord('${card.word.replace(/'/g, "\\'")}')">${card.word}</h3>
              </div>
              
              <div class="tutor-arabic-card dict-card-translation-box">
                <p class="ar-text dict-card-translation">${card.translation}</p>
              </div>
              
              <div class="dict-card-example-section">
                <div class="dict-card-example-row">
                  <span class="audio-example-row" style="cursor: pointer;" onclick="window.speakDictWord('${card.example.replace(/'/g, "\\'")}')">"${card.example}"</span>
                </div>
                <div class="tutor-arabic-card dict-card-example-translation-box">
                  <p class="ar-text dict-card-example-translation">${card.exampleTranslation}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Global functions for events
window.handleDictSearch = function(val) {
  searchQuery = val;
  renderGrid();
};

window.handleDictLessonFilter = function(val) {
  filterLesson = val;
  renderGrid();
};

window.speakDictWord = function(text) {
  speakText(text);
};

window.toggleDictBookmark = function(cardId) {
  const progress = getProgress();
  const idNum = parseInt(cardId);
  const isBookmarked = progress.reviewCards.includes(idNum);
  
  if (isBookmarked) {
    updateCardStatus(idNum, 'none'); // removes from review list
  } else {
    updateCardStatus(idNum, 'review'); // adds to review list
  }
  
  // Refresh the vocabulary grid
  renderGrid();
};

window.renderDictionary = renderDictionary;
window.handleDictSearch = window.handleDictSearch;
window.handleDictLessonFilter = window.handleDictLessonFilter;
window.speakDictWord = window.speakDictWord;
window.toggleDictBookmark = window.toggleDictBookmark;
