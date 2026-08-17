import { readFileSync } from 'node:fs'

const architectureDoc = readFileSync(
  new URL('../public/docs/technical/architecture.md', import.meta.url),
  'utf8'
)

const requiredPhrases = [
  '官网 SPA',
  'Markdown 文档系统',
  '/api/join',
  'Vercel Serverless',
]

const forbiddenPhrases = [
  'Supabase',
  'Redis',
  '微服务架构',
  'React Query',
  'React Hook Form',
  'SendGrid',
  'OpenAI API',
]

for (const phrase of requiredPhrases) {
  if (!architectureDoc.includes(phrase)) {
    throw new Error(`architecture.md 缺少真实架构关键字: ${phrase}`)
  }
}

for (const phrase of forbiddenPhrases) {
  if (architectureDoc.includes(phrase)) {
    throw new Error(`architecture.md 仍包含未实现能力: ${phrase}`)
  }
}

console.log('PASS architecture')
