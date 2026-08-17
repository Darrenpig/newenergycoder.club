const DIFFICULTY_ACCENT_CLASSES = {
  basic: {
    text: 'text-blue-600 hover:text-blue-800',
    border: 'border-l-blue-500',
  },
  intermediate: {
    text: 'text-amber-600 hover:text-amber-800',
    border: 'border-l-amber-500',
  },
  advanced: {
    text: 'text-red-600 hover:text-red-800',
    border: 'border-l-red-500',
  },
}

export function getDifficultyAccentClasses(difficulty) {
  return DIFFICULTY_ACCENT_CLASSES[difficulty] ?? DIFFICULTY_ACCENT_CLASSES.basic
}
