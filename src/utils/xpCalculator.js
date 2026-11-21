// Gamification Math & Formulas as defined in PRODIGY SRS Section 4

export const getXpThresholdForLevel = (level) => {
  if (level < 10) {
    return 100 * level;
  }
  return 1000;
};

export const getTitleForLevel = (level) => {
  if (level <= 4) return 'Beginner';
  if (level <= 9) return 'Achiever';
  if (level <= 14) return 'Productivity Pro';
  if (level <= 24) return 'Expert';
  return 'Master';
};

export const calculateTaskXp = (priority, isLate = false, isOnTime = true) => {
  let base = 25;
  if (priority === 'High') base = 50;
  else if (priority === 'Medium') base = 25;
  else if (priority === 'Low') base = 10;

  if (isLate) {
    return Math.floor(base / 2);
  }
  if (isOnTime) {
    return base + 5; // On-time bonus as per SRS 4.1
  }
  return base;
};
