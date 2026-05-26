import { curriculum } from './curriculum.js';

export const flashcards = [];

curriculum.forEach(lesson => {
  if (lesson.vocabulary) {
    lesson.vocabulary.forEach(vocab => {
      flashcards.push({
        id: vocab.id,
        lessonId: lesson.id,
        word: vocab.word,
        type: vocab.type,
        translation: vocab.translation,
        example: vocab.example,
        exampleTranslation: vocab.exampleTranslation
      });
    });
  }
});
