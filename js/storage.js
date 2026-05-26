/**
 * LocalStorage Manager for Progress Tracking
 * Egyptian English Academy
 */

import { curriculum } from './data/curriculum.js';

const STORAGE_KEY = "egyptian_english_academy_progress";

const DEFAULT_PROGRESS = {
  completedLessons: [],          // list of lesson IDs fully completed (quiz passed AND vocab recited)
  completedVocabRecitations: [], // list of lesson IDs where vocabulary was fully recited
  completedPractices: [],        // list of lesson IDs where practice was fully completed
  quizScores: {},                // lessonId -> highest score
  masteredCards: [],             // legacy (for compatibility)
  reviewCards: [],               // legacy (for compatibility)
  xp: 0,                         // Experience Points
  finalTestScore: null,          // Score of the final mastery test
  fullName: ""                   // Student's full name for the certificate
};

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return { ...DEFAULT_PROGRESS };
    }
    const parsed = JSON.parse(data);
    
    // Migration: If user had completed lessons in the past, automatically grant vocabulary recitation & practice completion
    if (parsed.completedLessons && parsed.completedLessons.length > 0) {
      if (!parsed.completedVocabRecitations) {
        parsed.completedVocabRecitations = [];
      }
      if (!parsed.completedPractices) {
        parsed.completedPractices = [];
      }
      parsed.completedLessons.forEach(id => {
        const idNum = parseInt(id);
        if (!parsed.completedVocabRecitations.includes(idNum)) {
          parsed.completedVocabRecitations.push(idNum);
        }
        if (!parsed.completedPractices.includes(idNum)) {
          parsed.completedPractices.push(idNum);
        }
      });
    }

    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch (e) {
    console.error("Error reading progress from localStorage", e);
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Trigger global event for components to listen and update UI
    window.dispatchEvent(new Event("academyProgressUpdated"));
  } catch (e) {
    console.error("Error saving progress to localStorage", e);
  }
}

export function completeLesson(lessonId) {
  const idNum = parseInt(lessonId);
  checkAndCompleteLesson(idNum);
}

export function saveQuizScore(lessonId, score, totalQuestions = 5) {
  const progress = getProgress();
  const idNum = parseInt(lessonId);
  const prevScore = progress.quizScores[idNum] || 0;
  
  if (score > prevScore) {
    progress.quizScores[idNum] = score;
    // Award XP differences
    const xpGained = (score - prevScore) * 20; // 20 XP per new correct answer
    progress.xp += xpGained;
  }
  
  saveProgress(progress);
  
  const passingScore = Math.ceil(totalQuestions * 0.9);
  if (score >= passingScore) {
    checkAndCompleteLesson(idNum);
  }
}

export function completeVocabRecitation(lessonId) {
  const progress = getProgress();
  const idNum = parseInt(lessonId);
  if (!progress.completedVocabRecitations) {
    progress.completedVocabRecitations = [];
  }
  if (!progress.completedVocabRecitations.includes(idNum)) {
    progress.completedVocabRecitations.push(idNum);
    progress.xp += 100; // 100 XP for mastering lesson vocabulary!
    saveProgress(progress);
  }
  checkAndCompleteLesson(idNum);
}

export function completePractice(lessonId) {
  const progress = getProgress();
  const idNum = parseInt(lessonId);
  if (!progress.completedPractices) {
    progress.completedPractices = [];
  }
  if (!progress.completedPractices.includes(idNum)) {
    progress.completedPractices.push(idNum);
    progress.xp += 100; // 100 XP for completing lesson practices!
    saveProgress(progress);
  }
  checkAndCompleteLesson(idNum);
}

export function checkAndCompleteLesson(lessonId) {
  const progress = getProgress();
  const idNum = parseInt(lessonId);
  const lesson = curriculum.find(l => l.id === idNum);
  if (!lesson) return;

  const totalQuestions = lesson.quiz ? lesson.quiz.length : 15;
  const passingScore = Math.ceil(totalQuestions * 0.9);
  const quizPassed = (progress.quizScores[idNum] || 0) >= passingScore;
  const vocabPassed = progress.completedVocabRecitations && progress.completedVocabRecitations.includes(idNum);
  
  if (quizPassed && vocabPassed) {
    if (!progress.completedLessons.includes(idNum)) {
      progress.completedLessons.push(idNum);
      progress.xp += 150; // Bonus XP for fully completing the lesson (quiz + vocab)
      saveProgress(progress);
    }
  }
}

export function updateCardStatus(cardId, status) {
  const progress = getProgress();
  const idNum = parseInt(cardId);
  
  progress.masteredCards = progress.masteredCards.filter(id => id !== idNum);
  progress.reviewCards = progress.reviewCards.filter(id => id !== idNum);
  
  if (status === "mastered") {
    progress.masteredCards.push(idNum);
    progress.xp += 5;
  } else if (status === "review") {
    progress.reviewCards.push(idNum);
  }
  
  saveProgress(progress);
}

export function addXP(amount) {
  const progress = getProgress();
  progress.xp += amount;
  saveProgress(progress);
}

export function saveFinalTestScore(score, name) {
  const progress = getProgress();
  progress.finalTestScore = score;
  if (name) {
    progress.fullName = name;
  }
  if (score >= 40) {
    progress.xp += 300;
  } else {
    progress.xp += 50;
  }
  saveProgress(progress);
}

export function resetProgress() {
  saveProgress(DEFAULT_PROGRESS);
}
