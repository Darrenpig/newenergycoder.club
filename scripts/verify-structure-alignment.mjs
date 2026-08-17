import { existsSync, readFileSync } from 'node:fs'

const architectureDoc = readFileSync(
  new URL('../public/docs/technical/architecture.md', import.meta.url),
  'utf8'
)
const appFile = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const preloaderFile = readFileSync(
  new URL('../src/components/RoutePreloader.tsx', import.meta.url),
  'utf8'
)
const learningRoutesPath = new URL('../src/routes/learningRoutes.tsx', import.meta.url)

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

if (existsSync(learningRoutesPath)) {
  throw new Error('src/routes/learningRoutes.tsx 仍然存在，说明死路由尚未清理')
}

if (preloaderFile.includes("case '/learning'")) {
  throw new Error('RoutePreloader 仍然在预加载不存在的 /learning 路由')
}

if (appFile.includes('Phase 2 Routes (currently placeholders)')) {
  throw new Error('App.tsx 仍保留误导性的占位路由注释')
}

console.log('PASS architecture')
console.log('PASS routes')
