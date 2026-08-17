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
const resourcesPage = readFileSync(
  new URL('../src/pages/ResourcesPage.tsx', import.meta.url),
  'utf8'
)
const authStore = readFileSync(new URL('../src/store/auth-store.ts', import.meta.url), 'utf8')
const protectedRoute = readFileSync(
  new URL('../src/components/auth/ProtectedRoute.tsx', import.meta.url),
  'utf8'
)
const dashboardPage = readFileSync(new URL('../src/pages/DashboardPage.tsx', import.meta.url), 'utf8')
const adminDashboard = readFileSync(new URL('../src/pages/AdminDashboard.tsx', import.meta.url), 'utf8')

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

if (resourcesPage.includes('const mockResources')) {
  throw new Error('ResourcesPage 仍然保留页内 mockResources 数据')
}

if (!resourcesPage.includes("from '@/data/siteResources'")) {
  throw new Error('ResourcesPage 尚未改为消费统一的数据模块')
}

if (!authStore.includes("export const AUTH_IMPLEMENTATION = 'mock'")) {
  throw new Error('auth-store 尚未显式声明当前鉴权实现为 mock')
}

if (!protectedRoute.includes('AUTH_IMPLEMENTATION')) {
  throw new Error('ProtectedRoute 尚未引用统一的鉴权实现常量')
}

if (!dashboardPage.includes('MockAuthNotice')) {
  throw new Error('DashboardPage 尚未显示 mock 鉴权提示')
}

if (!adminDashboard.includes('MockAuthNotice')) {
  throw new Error('AdminDashboard 尚未显示 mock 鉴权提示')
}

if (!appFile.includes('path="/admin"') || !appFile.includes('<ProtectedRoute>')) {
  throw new Error('/admin 路由尚未纳入 ProtectedRoute')
}

console.log('PASS architecture')
console.log('PASS routes')
console.log('PASS resources')
console.log('PASS auth')
