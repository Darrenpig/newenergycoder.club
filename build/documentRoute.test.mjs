import test from 'node:test'
import assert from 'node:assert/strict'

import { resolveDocumentRouteParams } from '../src/utils/documentRoute.js'

test('falls back to technical category for technical docs layout routes', () => {
  assert.deepEqual(
    resolveDocumentRouteParams(
      { slug: 'architecture' },
      '/docs/technical/architecture',
    ),
    {
      category: 'technical',
      subcategory: undefined,
      slug: 'architecture',
    },
  )
})

test('preserves explicit category and subcategory params for generic doc routes', () => {
  assert.deepEqual(
    resolveDocumentRouteParams(
      {
        category: 'tutorials',
        subcategory: 'basic',
        slug: 'introduction',
      },
      '/docs/tutorials/basic/introduction',
    ),
    {
      category: 'tutorials',
      subcategory: 'basic',
      slug: 'introduction',
    },
  )
})
