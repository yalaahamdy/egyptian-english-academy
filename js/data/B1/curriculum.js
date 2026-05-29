import { unit1 } from './units/unit1.js';
import { unit2 } from './units/unit2.js';
import { unit3 } from './units/unit3.js';
import { unit4 } from './units/unit4.js';

// List of active units for Level B1 Phase 1
export const units = [
  unit1,
  unit2,
  unit3,
  unit4
];

// Flat array of all lessons (sequential IDs 1 to 16)
export const curriculum = [];

units.forEach(unit => {
  unit.lessons.forEach(lesson => {
    lesson.unitId = unit.id;
    curriculum.push(lesson);
  });
});
