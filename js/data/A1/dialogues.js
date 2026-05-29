import { curriculum } from './curriculum.js';

export const dialogues = [];

curriculum.forEach(lesson => {
  if (lesson.dialogue) {
    dialogues.push({
      lessonId: lesson.id,
      title: lesson.dialogue.title,
      lines: lesson.dialogue.lines
    });
  }
});
