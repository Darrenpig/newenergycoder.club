import test from 'node:test'
import assert from 'node:assert/strict'

import { getDifficultyAccentClasses } from '../src/utils/difficultyStyles.js'

test('returns stable accent classes for intermediate difficulty', () => {
  assert.deepEqual(getDifficultyAccentClasses('intermediate'), {
    text: 'text-amber-600 hover:text-amber-800',
    border: 'border-l-amber-500',
  })
})

test('falls back to basic accent classes for unknown difficulty', () => {
  assert.deepEqual(getDifficultyAccentClasses('unknown'), {
    text: 'text-blue-600 hover:text-blue-800',
    border: 'border-l-blue-500',
  })
})
