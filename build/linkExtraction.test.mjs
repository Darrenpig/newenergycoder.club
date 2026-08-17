import test from 'node:test'
import assert from 'node:assert/strict'

import {
  extractCandidateLinksFromMarkdown,
} from '../src/utils/linkExtraction.js'

test('ignores code fence placeholders and sample urls when extracting markdown links', () => {
  const markdown = `
# 开发指南

请先阅读[系统架构](/docs/technical/architecture)。

\`\`\`tsx
<img src={user.avatar} alt={user.name} />
\`\`\`

\`\`\`env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_URL=https://api.newenergycoder.club/v1
\`\`\`

\`\`\`regex
[^\\"'\`]* 
\`\`\`
`

  assert.deepEqual(extractCandidateLinksFromMarkdown(markdown), [
    '/docs/technical/architecture',
  ])
})
