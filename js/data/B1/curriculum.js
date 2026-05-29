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
import { unit13 } from './units/unit13.js';
import { unit14 } from './units/unit14.js';
import { unit15 } from './units/unit15.js';
import { unit16 } from './units/unit16.js';
import { unit17 } from './units/unit17.js';
import { unit18 } from './units/unit18.js';
import { unit19 } from './units/unit19.js';
import { unit20 } from './units/unit20.js';
import { unit21 } from './units/unit21.js';
import { unit22 } from './units/unit22.js';
import { unit23 } from './units/unit23.js';
import { unit24 } from './units/unit24.js';

// List of active units for Level B1 Phase 6
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
  unit12,
  unit13,
  unit14,
  unit15,
  unit16,
  unit17,
  unit18,
  unit19,
  unit20,
  unit21,
  unit22,
  unit23,
  unit24
];

// Flat array of all lessons (sequential IDs 1 to 48)
export const curriculum = [];

units.forEach(unit => {
  unit.lessons.forEach(lesson => {
    lesson.unitId = unit.id;
    curriculum.push(lesson);
  });
});
