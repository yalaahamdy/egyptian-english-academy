/**
 * Level Manager Component
 * Egyptian English Academy
 * Handles dynamic level loading and switching (e.g. A1, A2, etc.) dynamically.
 */

export const levelData = {
  currentLevel: 'A1',
  curriculum: [],
  units: [],
  flashcards: [],
  dialogues: []
};

/**
 * Loads data dynamically for the requested level
 */
export async function loadLevelData(levelId) {
  try {
    levelData.currentLevel = levelId;

    // Dynamically import data files for the specific level
    const [levelCurriculum, levelFlashcards, levelDialogues] = await Promise.all([
      import(`./data/${levelId}/curriculum.js`),
      import(`./data/${levelId}/flashcards.js`),
      import(`./data/${levelId}/dialogues.js`)
    ]);

    // Update global level state
    levelData.curriculum = levelCurriculum.curriculum;
    levelData.units = levelCurriculum.units;
    levelData.flashcards = levelFlashcards.flashcards;
    levelData.dialogues = levelDialogues.dialogues;

    // Cache the level selection in localStorage
    localStorage.setItem("academy_current_level", levelId);
    
    console.log(`[LevelManager] Successfully loaded data for level: ${levelId}`);
  } catch (error) {
    console.error(`[LevelManager] Failed to load data for level: ${levelId}`, error);
    throw error;
  }
}

/**
 * Initializes the level manager on application startup
 */
export async function initLevelManager() {
  const savedLevel = localStorage.getItem("academy_current_level") || "A1";
  await loadLevelData(savedLevel);
}
