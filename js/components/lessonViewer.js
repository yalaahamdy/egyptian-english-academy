/**
 * Lesson Viewer Component
 * Egyptian English Academy
 * Strictly English UI, isolated Egyptian Arabic tutoring content.
 * Renders explanations, vocabulary boxes, and conversational dialogues.
 */

import { curriculum } from '../data/curriculum.js';
import { getProgress } from '../storage.js';
import { flashcards } from '../data/flashcards.js';
import { dialogues } from '../data/dialogues.js';
import { initPractice } from './practiceEngine.js';
import { initQuiz } from './quizEngine.js';

export function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    // Read user-defined speech rate from localStorage
    const savedRate = parseFloat(localStorage.getItem("academy_speech_rate")) || 0.85;
    utterance.rate = savedRate;
    
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en-'));
    if (enVoice) utterance.voice = enVoice;
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis not supported");
  }
}

// Bind to window to allow easy execution from HTML string templates
window.speakText = speakText;

export function renderLesson(lessonId, tab = 'learn') {
  const container = document.getElementById("lesson-viewer-section");
  if (!container) return;

  const lesson = curriculum.find(l => l.id === parseInt(lessonId));
  if (!lesson) {
    window.location.hash = '#roadmap';
    return;
  }

  container.innerHTML = `
    <div class="lesson-header-box">
      <div class="lesson-header-info">
        <span class="badge badge-warning lesson-header-badge">
          Lesson ${lesson.id}
        </span>
        <h2>${lesson.title}</h2>
        <p>${lesson.description}</p>
      </div>
      <div>
        <a href="#roadmap" class="btn btn-secondary lesson-header-back-btn btn-back-svg-adjust">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span>Back to Roadmap</span>
        </a>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="lesson-tabs">
      <button class="lesson-tab-btn ${tab === 'learn' ? 'active' : ''}" onclick="window.location.hash = '#lesson-viewer?id=${lesson.id}&tab=learn'">
        <svg class="tab-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        <span>Learn</span>
      </button>
      <button class="lesson-tab-btn ${tab === 'practice' ? 'active' : ''}" onclick="window.location.hash = '#lesson-viewer?id=${lesson.id}&tab=practice'">
        <svg class="tab-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        <span>Practice</span>
      </button>
      <button class="lesson-tab-btn ${tab === 'quiz' ? 'active' : ''}" onclick="window.location.hash = '#lesson-viewer?id=${lesson.id}&tab=quiz'">
        <svg class="tab-svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        <span>Quiz</span>
      </button>
    </div>

    <!-- Active Tab Panel Container -->
    <div id="lesson-tab-content-panel"></div>
  `;

  const panel = document.getElementById("lesson-tab-content-panel");
  if (tab === 'learn') {
    renderLearnTab(lesson, panel);
  } else if (tab === 'practice') {
    renderPracticeTab(lesson, panel);
  } else if (tab === 'quiz') {
    renderQuizTab(lesson, panel);
  }
}

function renderLearnTab(lesson, panel) {
  // Fetch Vocabulary cards for this lesson
  const lessonVocab = flashcards.filter(card => card.lessonId === lesson.id);
  // Fetch Dialogues for this lesson
  const lessonDialogue = dialogues.find(d => d.lessonId === lesson.id);

  panel.innerHTML = `
    <div class="learn-container">
      <!-- Welcome Tutor Bubble -->
      <div class="tutor-intro-bubble">
        <div class="tutor-avatar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div class="tutor-text">
          <h4 class="lesson-tutor-title">Tutor Lesson Coach</h4>
          <div class="tutor-arabic-card lesson-tutor-inline-card">
            <p class="ar-text">${lesson.explanation.intro}</p>
          </div>
        </div>
      </div>

      <!-- Explanations Sections -->
      ${lesson.explanation.sections.map(sec => `
        <div class="explanation-card">
          <h3 class="lesson-section-title-secondary">
            ${sec.title}
          </h3>
          <div class="explanation-content ar-text markdown-body lesson-explanation-ar">
            ${parseSimpleMarkdown(sec.content)}
          </div>
        </div>
      `).join('')}

      <!-- 1. Lesson Vocabulary Table Box -->
      ${lessonVocab.length > 0 ? `
        <div class="explanation-card">
          <h3 class="lesson-section-title-accent">
            Lesson Vocabulary (${lessonVocab.length} Words)
          </h3>
          
          <div class="tutor-arabic-card lesson-vocab-tutor-card">
            <p class="ar-text lesson-vocab-tutor-text">
              دي الكلمات الأساسية للدرس ده يا بطل. اضغط على علامة الصوت عشان تسمع نطقها وتكرره وراك!
            </p>
          </div>

          <div class="table-container">
            <table class="markdown-table">
              <thead>
                <tr>
                  <th class="lesson-table-th">Word</th>
                  <th class="lesson-table-th lesson-table-translation">الترجمة بالعربي</th>
                  <th class="lesson-table-th lesson-table-audio">Audio</th>
                </tr>
              </thead>
              <tbody>
                ${lessonVocab.map(v => `
                  <tr>
                    <td class="lesson-table-td lesson-table-word">${v.word}</td>
                    <td class="lesson-table-td lesson-table-translation">${v.translation}</td>
                    <td class="lesson-table-td lesson-table-audio">
                      <button class="speak-btn speak-btn-m" onclick="speakText('${v.word.replace(/'/g, "\\'")}')">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- 2. Daily Survival Dialogue Section -->
      ${lessonDialogue ? `
        <div class="explanation-card">
          <h3 class="lesson-section-title-success">
            Survival Conversation: ${lessonDialogue.title}
          </h3>
          
          <div class="tutor-arabic-card lesson-dialogue-tutor-card">
            <p class="ar-text lesson-vocab-tutor-text">
              محادثة واقعية بتبين إزاي الكلمات دي بتستخدم في مواقف حقيقية! اضغط على كل جملة واسمع نطقها كويس يا بطل.
            </p>
          </div>

          <div class="lesson-dialogue-list">
            ${lessonDialogue.lines.map((line, idx) => {
              const isEven = idx % 2 === 0;
              const avatarChar = line.speaker.charAt(0).toUpperCase();
              
              return `
                <div class="lesson-dialogue-row ${isEven ? 'lesson-dialogue-row-even' : 'lesson-dialogue-row-odd'}">
                  <!-- Chat Row -->
                  <div class="lesson-dialogue-bubble-wrapper ${isEven ? 'lesson-dialogue-bubble-wrapper-even' : 'lesson-dialogue-bubble-wrapper-odd'}">
                    <!-- Avatar -->
                    <div class="lesson-dialogue-avatar ${isEven ? 'lesson-dialogue-avatar-even' : 'lesson-dialogue-avatar-odd'}">
                      ${avatarChar}
                    </div>
                    
                    <!-- Bubble Content -->
                    <div class="lesson-dialogue-bubble">
                      <div class="lesson-dialogue-speaker-name">
                        ${line.speaker}
                      </div>
                      <div class="lesson-dialogue-text audio-example-row" onclick="speakText('${line.text.replace(/'/g, "\\'")}')" title="Listen">
                        <span>"${line.text}"</span>
                      </div>
                      <div class="tutor-arabic-card lesson-dialogue-translation-card">
                        <p class="ar-text lesson-dialogue-translation-text">${line.translation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Bottom Nav Footer -->
      <div class="section-nav-footer">
        <div></div>
        <a href="#lesson-viewer?id=${lesson.id}&tab=practice" class="btn btn-primary btn-next-svg-adjust">
          <span>Start Practice</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  `;
}

function renderPracticeTab(lesson, panel) {
  panel.innerHTML = `<div id="practice-engine-root"></div>`;
  initPractice(lesson);
}

function renderQuizTab(lesson, panel) {
  panel.innerHTML = `<div id="quiz-engine-root"></div>`;
  initQuiz(lesson);
}

/**
 * Parses simple markdown links, bold text (**text**), code blocks / expressions (*text*), and newlines
 */
function parseSimpleMarkdown(text) {
  // 1. Handle bold and italics formatting first
  let html = text;
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // 2. Parse block-level elements line by line
  const lines = html.split('\n');
  const processedLines = [];
  
  let listType = null; // 'ul', 'ol', 'table', or null
  let tableRows = [];
  
  function closeOpenBlock() {
    if (listType === 'ul') {
      processedLines.push('</ul>');
    } else if (listType === 'ol') {
      processedLines.push('</ol>');
    } else if (listType === 'table') {
      processedLines.push('<div class="table-container"><table class="markdown-table">');
      tableRows.forEach((row, rowIndex) => {
        // Skip separator row containing dashes (e.g., |---|---|)
        if (row.some(cell => cell.includes('---'))) {
          return;
        }
        processedLines.push('<tr>');
        row.forEach(cell => {
          if (rowIndex === 0) {
            processedLines.push(`<th>${cell}</th>`);
          } else {
            processedLines.push(`<td>${cell}</td>`);
          }
        });
        processedLines.push('</tr>');
      });
      processedLines.push('</table></div>');
      tableRows = [];
    }
    listType = null;
  }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for unordered list (- item or * item)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (listType !== 'ul') {
        closeOpenBlock();
        processedLines.push('<ul class="markdown-list">');
        listType = 'ul';
      }
      processedLines.push(`<li>${line.substring(2)}</li>`);
      continue;
    }
    
    // Check for ordered list (1. item)
    const olMatch = line.match(/^(\d+)\.\s(.*)/);
    if (olMatch) {
      if (listType !== 'ol') {
        closeOpenBlock();
        processedLines.push('<ol class="markdown-list">');
        listType = 'ol';
      }
      processedLines.push(`<li>${olMatch[2]}</li>`);
      continue;
    }
    
    // Check for table row (| cell | cell |)
    if (line.startsWith('|') && line.endsWith('|')) {
      if (listType !== 'table') {
        closeOpenBlock();
        listType = 'table';
      }
      const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      tableRows.push(cells);
      continue;
    }
    
    // Empty line creates paragraph break
    if (!line) {
      closeOpenBlock();
      processedLines.push('<div class="spacer-line"></div>');
      continue;
    }
    
    // Normal paragraph line
    closeOpenBlock();
    processedLines.push(`<p>${line}</p>`);
  }
  
  closeOpenBlock();
  
  let finalHtml = processedLines.join('\n');
  
  // 3. Audio example text parsing for English words outside HTML tags
  const tagOrEnglishRegex = /(<[^>]+>)|([a-zA-Z0-9][a-zA-Z0-9\s',\.!\?\-]*[a-zA-Z0-9!\?])/g;
  
  finalHtml = finalHtml.replace(tagOrEnglishRegex, function(match, tag, word) {
    if (tag) {
      return tag;
    }
    
    const trimmed = word.trim();
    if (trimmed.length <= 1 || /^\d+$/.test(trimmed)) {
      return word;
    }
    
    const escaped = trimmed.replace(/'/g, "\\'");
    return `<span class="audio-example-row" onclick="speakText('${escaped}')" title="Listen">
              ${trimmed}
            </span>`;
  });
  
  return finalHtml;
}

window.renderLesson = renderLesson;
export { parseSimpleMarkdown };
