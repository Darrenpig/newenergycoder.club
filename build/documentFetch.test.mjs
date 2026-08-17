import test from 'node:test'
import assert from 'node:assert/strict'

import { shouldFallbackToDirectMarkdown } from '../src/utils/documentFetch.js'

test('falls back when index markdown request returns html content', () => {
  assert.equal(
    shouldFallbackToDirectMarkdown({
      ok: true,
      headers: {
        get(name) {
          return name.toLowerCase() === 'content-type' ? 'text/html; charset=utf-8' : null
        },
      },
    }),
    true,
  )
})

test('keeps index markdown response when markdown content is returned', () => {
  assert.equal(
    shouldFallbackToDirectMarkdown({
      ok: true,
      headers: {
        get(name) {
          return name.toLowerCase() === 'content-type' ? 'text/markdown; charset=utf-8' : null
        },
      },
    }),
    false,
  )
})
