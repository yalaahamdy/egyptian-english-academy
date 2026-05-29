import { unit1 } from './units/unit1.js';
import { unit2 } from './units/unit2.js';
import { unit3 } from './units/unit3.js';
import { unit4 } from './units/unit4.js';
import { unit5 } from './units/unit5.js';
import { unit6 } from './units/unit6.js';
import { unit7 } from './units/unit7.js';
import { unit8 } from './units/unit8.js';
import { unit9 } from './units/unit9.js';
import { unit10 } from './units/unit10.js';
import { unit11 } from './units/unit11.js';
import { unit12 } from './units/unit12.js';

// List of active units for Level B1 Phase 3
export const units = [
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  unit7,
  unit8,
  unit9,
  unit10,
  unit11,
  unit12
];

// Flat array of all lessons (sequential IDs 1 to 48)
export const curriculum = [];

units.forEach(unit => {
  unit.lessons.forEach(lesson => {
    lesson.unitId = unit.id;
    curriculum.push(lesson);
  });
});
