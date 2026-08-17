# Structure Alignment Minimal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让仓库的技术文档、路由入口、资源数据来源和 mock 鉴权语义与当前真实实现重新对齐，并完成最小、低风险的落地整理。

**Architecture:** 这次实现不做平台化扩张，而是围绕“真实边界”收口。文档层先回写真实架构，代码层清理未接线路由和预加载分支，资源页改为消费 `src/data/*` 的统一数据入口，鉴权层用明确的 mock 常量和提示组件收口语义，并用一个轻量 Node 校验脚本做静态回归验证。

**Tech Stack:** React 18, TypeScript, Vite 6, React Router 6, Zustand, Node 22, pnpm

---

## File Map

- Modify: `public/docs/technical/architecture.md`
  - 回写当前真实架构，只保留已实现能力，并单独标注未来扩展边界。
- Create: `scripts/verify-structure-alignment.mjs`
  - 轻量静态校验脚本，负责检查文档真相、路由收口、资源来源和 mock 鉴权边界。
- Modify: `src/App.tsx`
  - 清理误导性注释；把 `/admin` 与 `/dashboard` 统一纳入受保护路由边界。
- Modify: `src/components/RoutePreloader.tsx`
  - 删除 `/learning` 的死预加载分支，保持预加载配置只覆盖真实可达路由。
- Delete: `src/routes/learningRoutes.tsx`
  - 移除当前未接入、无调用方的路由配置文件，避免“配置存在但不生效”。
- Create: `src/types/site-resource.ts`
  - 定义资源页真实使用的数据类型，避免大页面继续维护局部类型。
- Create: `src/data/siteResources.ts`
  - 基于 `src/data/resources.ts` 的 `trainingCategories` 导出资源页可消费的统一数据。
- Modify: `src/pages/ResourcesPage.tsx`
  - 删除页内 `mockResources` 和局部类型，改为消费 `siteResources`。
- Create: `src/components/auth/MockAuthNotice.tsx`
  - 给 dashboard/admin 等演示态页面提供统一 mock 鉴权提示。
- Modify: `src/store/auth-store.ts`
  - 显式导出 mock 鉴权模式常量，并为 store 增加清晰的边界说明。
- Modify: `src/components/auth/ProtectedRoute.tsx`
  - 统一引用 mock 鉴权模式常量，避免“看起来是真实鉴权”的语义漂移。
- Modify: `src/pages/DashboardPage.tsx`
  - 显示 mock 鉴权提示，明确页面为演示态。
- Modify: `src/pages/AdminDashboard.tsx`
  - 显示 mock 鉴权提示，避免未保护监控页被误解为真实后台。

## Task 1: 回写真实架构文档

**Files:**
- Create: `scripts/verify-structure-alignment.mjs`
- Modify: `public/docs/technical/architecture.md`

- [ ] **Step 1: 写出会先失败的文档校验脚本**

```js
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
```

- [ ] **Step 2: 运行校验脚本并确认它先失败**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: FAIL，并出现类似 `architecture.md 仍包含未实现能力: Supabase`

- [ ] **Step 3: 用真实运行链路重写架构文档**

将 `public/docs/technical/architecture.md` 重写为当前真实状态，最小可用内容如下：

```md
---
title: 系统架构
description: 新能源编程俱乐部官网当前实现架构说明
author: 新能源编程俱乐部
tags: ["架构", "官网", "文档系统"]
difficulty: intermediate
lastModified: 2026-08-17
---

# 系统架构

## 概述

当前仓库实现的是一个以官网展示和文档阅读为主的 Web 应用，而不是完整的平台化后端系统。核心由官网 SPA、Markdown 文档系统、一个报名接口和若干构建/运营脚本组成。

## 当前真实架构

```mermaid
graph TD
    A[浏览器] --> B[Vercel CDN]
    B --> C[React + Vite SPA]
    C --> D[站内页面路由]
    C --> E[Markdown 文档系统]
    C --> F[/api/join]
    F --> G[Feishu Bitable]
    H[scripts/*.mjs] --> B
```

## 运行组成

### 1. 官网 SPA
- 使用 React 18、TypeScript、Vite 构建
- 页面路由由 `src/App.tsx` 统一维护
- 主要能力包括首页、项目、活动、资源、团队、加入、文档浏览

### 2. Markdown 文档系统
- 文档源位于 `public/docs/`
- 前端通过 `DocumentLoader` 和 `DocumentCache` 加载与缓存文档
- 文档页面由 `DocumentPage` 和 `TechnicalDocsLayout` 渲染

### 3. 报名接口
- `api/join.ts` 是当前唯一明确启用的服务端接口
- 部署形态为 Vercel Serverless Function
- 用于接收报名表单并写入飞书多维表格

### 4. 构建与运营脚本
- `scripts/generate-static-pages.mjs` 负责额外静态页生成
- `scripts/indexnow-push.mjs` 负责 SEO 推送
- 其他脚本用于图库缩略图、内容同步和统计抓取

## 当前边界

以下能力不属于当前已实现架构：

- 不存在 Supabase、Redis 或数据库服务层
- 不存在 API Gateway 或微服务拆分
- 不存在真实 OAuth 用户体系
- 不存在 React Query 驱动的服务端状态层

## 后续扩展原则

如果未来要引入真实数据层、认证体系或学习平台能力，应单独设计并实施，不应继续写入当前实现说明。
```

- [ ] **Step 4: 再次运行文档校验脚本并确认通过**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: PASS，并输出 `PASS architecture`

- [ ] **Step 5: 提交文档真相回写**

```bash
git add scripts/verify-structure-alignment.mjs public/docs/technical/architecture.md
git commit -m "docs: align architecture document with current implementation"
```

## Task 2: 清理未接线路由与死预加载

**Files:**
- Modify: `scripts/verify-structure-alignment.mjs`
- Modify: `src/App.tsx`
- Modify: `src/components/RoutePreloader.tsx`
- Delete: `src/routes/learningRoutes.tsx`

- [ ] **Step 1: 扩展校验脚本，让路由问题先暴露出来**

把 `scripts/verify-structure-alignment.mjs` 扩展为下面这个版本：

```js
import { readFileSync, existsSync } from 'node:fs'

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

const requiredPhrases = ['官网 SPA', 'Markdown 文档系统', '/api/join', 'Vercel Serverless']
const forbiddenPhrases = ['Supabase', 'Redis', '微服务架构', 'React Query', 'React Hook Form', 'SendGrid', 'OpenAI API']

for (const phrase of requiredPhrases) {
  if (!architectureDoc.includes(phrase)) throw new Error(`architecture.md 缺少真实架构关键字: ${phrase}`)
}

for (const phrase of forbiddenPhrases) {
  if (architectureDoc.includes(phrase)) throw new Error(`architecture.md 仍包含未实现能力: ${phrase}`)
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
```

- [ ] **Step 2: 运行脚本并确认路由检查先失败**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: FAIL，并出现以下任一错误：
- `src/routes/learningRoutes.tsx 仍然存在，说明死路由尚未清理`
- `RoutePreloader 仍然在预加载不存在的 /learning 路由`
- `App.tsx 仍保留误导性的占位路由注释`

- [ ] **Step 3: 做最小路由收口实现**

1. 删除 `src/routes/learningRoutes.tsx`
2. 在 `src/components/RoutePreloader.tsx` 中删掉 `/learning` 分支
3. 在 `src/App.tsx` 中把误导性注释改成与当前实际路由一致的说明

`src/components/RoutePreloader.tsx` 里的 `preloadRoute()` 应改成：

```ts
const preloadRoute = async (path: string) => {
  try {
    switch (path) {
      case '/projects':
        await import('@/pages/ProjectsPage')
        break
      case '/contact':
        await import('@/pages/ContactPage')
        break
      case '/team':
        await import('@/pages/TeamPage')
        break
      case '/join':
        await import('@/pages/JoinPage')
        break
      case '/events':
        await import('@/pages/EventsPage')
        break
      case '/resources':
        await import('@/pages/ResourcesPage')
        break
      case '/dashboard':
        await import('@/pages/DashboardPage')
        break
      default:
        console.log(`No preload configuration for route: ${path}`)
    }
  } catch (error) {
    console.warn(`Failed to preload route ${path}:`, error)
  }
}
```

`src/App.tsx` 中原来的占位注释：

```tsx
{/* Phase 2 Routes (currently placeholders) */}
```

改成：

```tsx
{/* Primary site routes */}
```

- [ ] **Step 4: 重新运行脚本，确认路由收口通过**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: PASS，并至少输出：
- `PASS architecture`
- `PASS routes`

- [ ] **Step 5: 提交路由与预加载清理**

```bash
git add scripts/verify-structure-alignment.mjs src/App.tsx src/components/RoutePreloader.tsx
git rm src/routes/learningRoutes.tsx
git commit -m "refactor: remove unused learning route config"
```

## Task 3: 让资源页改为消费 `src/data/*`

**Files:**
- Modify: `scripts/verify-structure-alignment.mjs`
- Create: `src/types/site-resource.ts`
- Create: `src/data/siteResources.ts`
- Modify: `src/pages/ResourcesPage.tsx`

- [ ] **Step 1: 扩展校验脚本，让资源页的内联 mock 先失败**

把 `scripts/verify-structure-alignment.mjs` 继续扩展，新增下面这段检查：

```js
const resourcesPage = readFileSync(
  new URL('../src/pages/ResourcesPage.tsx', import.meta.url),
  'utf8'
)

if (resourcesPage.includes('const mockResources')) {
  throw new Error('ResourcesPage 仍然保留页内 mockResources 数据')
}

if (!resourcesPage.includes("from '@/data/siteResources'")) {
  throw new Error('ResourcesPage 尚未改为消费统一的数据模块')
}

console.log('PASS resources')
```

- [ ] **Step 2: 运行脚本并确认资源校验先失败**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: FAIL，并出现 `ResourcesPage 仍然保留页内 mockResources 数据`

- [ ] **Step 3: 创建资源页专用类型并基于学习资源数据做适配**

先创建 `src/types/site-resource.ts`：

```ts
export type SiteResourceCategory =
  | 'all'
  | 'tutorials'
  | 'tools'
  | 'books'
  | 'courses'
  | 'documentation'

export type SiteResourceDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type SiteResourceAccess = 'free' | 'paid'

export interface SiteResource {
  id: string
  title: string
  description: string
  image: string
  category: Exclude<SiteResourceCategory, 'all'>
  difficulty: SiteResourceDifficulty
  type: SiteResourceAccess
  author: string
  rating: number
  url: string
  downloadUrl?: string
  tags: string[]
}
```

再创建 `src/data/siteResources.ts`：

```ts
import { trainingCategories } from '@/data/resources'
import { DifficultyLevel, ResourceType, type LearningResource } from '@/types/learning'
import type { SiteResource, SiteResourceCategory, SiteResourceDifficulty } from '@/types/site-resource'

const toSiteDifficulty = (difficulty: DifficultyLevel): SiteResourceDifficulty => {
  switch (difficulty) {
    case DifficultyLevel.EASY:
      return 'beginner'
    case DifficultyLevel.MEDIUM:
      return 'intermediate'
    case DifficultyLevel.HARD:
      return 'advanced'
  }
}

const toSiteCategory = (type: ResourceType): Exclude<SiteResourceCategory, 'all'> => {
  switch (type) {
    case ResourceType.DOCUMENTATION:
    case ResourceType.COMMUNITY:
      return 'documentation'
    case ResourceType.VIDEO:
    case ResourceType.PRACTICE:
      return 'tutorials'
    case ResourceType.TOOL:
      return 'tools'
    case ResourceType.BOOK:
      return 'books'
    case ResourceType.COURSE:
      return 'courses'
  }
}

const buildImageUrl = (resource: LearningResource) => {
  const prompt = encodeURIComponent(
    `realistic educational resource cover, ${resource.title}, ${resource.tags.slice(0, 3).join(', ')}, clean editorial layout, modern learning website, high detail`
  )
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`
}

export const siteResources: SiteResource[] = trainingCategories.flatMap(category =>
  category.resources.map(resource => ({
    id: resource.id,
    title: resource.title,
    description: resource.description,
    image: buildImageUrl(resource),
    category: toSiteCategory(resource.type),
    difficulty: toSiteDifficulty(resource.difficulty),
    type: resource.isFree ? 'free' : 'paid',
    author: category.name,
    rating: category.recommendationLevel,
    url: resource.url,
    tags: resource.tags,
  }))
)
```

- [ ] **Step 4: 改造 `ResourcesPage.tsx`，去掉局部数据真相**

把 `ResourcesPage.tsx` 顶部改成下面这个结构：

```ts
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ExternalLink, Download, Search, Star, BookOpen, Code, Wrench, GraduationCap, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from '@/contexts/LanguageContext'
import { PageLayout } from '@/components/layout/PageLayout'
import SEO from '@/components/SEO'
import { type AspectRatio } from '@/components/ui/floating-controls'
import { ImageProxy } from '@/components/ui/image-proxy'
import { siteResources } from '@/data/siteResources'
import type { SiteResource, SiteResourceAccess as ResourceType, SiteResourceCategory as ResourceCategory, SiteResourceDifficulty as ResourceDifficulty } from '@/types/site-resource'
```

并把：

```ts
const filteredResources = mockResources
```

替换为：

```ts
const filteredResources = siteResources
```

同时删除文件顶部这两段局部定义：

```ts
interface Resource { ... }
const mockResources: Resource[] = [ ... ]
```

- [ ] **Step 5: 重新运行脚本，确认资源页已切到统一数据模块**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: PASS，并新增输出 `PASS resources`

- [ ] **Step 6: 提交资源来源统一改造**

```bash
git add scripts/verify-structure-alignment.mjs src/types/site-resource.ts src/data/siteResources.ts src/pages/ResourcesPage.tsx
git commit -m "refactor: move resources page data into data layer"
```

## Task 4: 明确 mock 鉴权边界并统一保护后台页

**Files:**
- Modify: `scripts/verify-structure-alignment.mjs`
- Create: `src/components/auth/MockAuthNotice.tsx`
- Modify: `src/store/auth-store.ts`
- Modify: `src/components/auth/ProtectedRoute.tsx`
- Modify: `src/App.tsx`
- Modify: `src/pages/DashboardPage.tsx`
- Modify: `src/pages/AdminDashboard.tsx`

- [ ] **Step 1: 扩展校验脚本，让 mock 鉴权边界问题先失败**

给 `scripts/verify-structure-alignment.mjs` 增加下面的检查：

```js
const authStore = readFileSync(new URL('../src/store/auth-store.ts', import.meta.url), 'utf8')
const protectedRoute = readFileSync(
  new URL('../src/components/auth/ProtectedRoute.tsx', import.meta.url),
  'utf8'
)
const dashboardPage = readFileSync(new URL('../src/pages/DashboardPage.tsx', import.meta.url), 'utf8')
const adminDashboard = readFileSync(new URL('../src/pages/AdminDashboard.tsx', import.meta.url), 'utf8')

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

console.log('PASS auth')
```

- [ ] **Step 2: 运行脚本并确认鉴权检查先失败**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: FAIL，并出现下列错误之一：
- `auth-store 尚未显式声明当前鉴权实现为 mock`
- `DashboardPage 尚未显示 mock 鉴权提示`
- `/admin 路由尚未纳入 ProtectedRoute`

- [ ] **Step 3: 创建统一的 mock 鉴权提示组件**

创建 `src/components/auth/MockAuthNotice.tsx`：

```tsx
import { Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface MockAuthNoticeProps {
  scope: 'dashboard' | 'admin'
}

const scopeLabel = {
  dashboard: '用户仪表板',
  admin: '管理控制台',
}

export function MockAuthNotice({ scope }: MockAuthNoticeProps) {
  return (
    <Card className="mb-6 border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
      <CardContent className="flex items-start gap-3 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-1 text-sm">
          <p className="font-medium">{scopeLabel[scope]}当前处于演示态</p>
          <p>当前访问控制依赖本地持久化的 mock 登录状态，仅用于页面演示，不代表真实鉴权与权限系统。</p>
        </div>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 4: 统一鉴权常量、保护 `/admin`，并在页面里显式提示**

`src/store/auth-store.ts` 顶部新增：

```ts
export const AUTH_IMPLEMENTATION = 'mock' as const
```

并把 store 前的注释改成：

```ts
// 当前仓库仅实现本地持久化的 mock 鉴权，用于演示受保护页面流程。
// 这里不接真实 OAuth，也不提供服务端令牌校验。
```

`src/components/auth/ProtectedRoute.tsx` 改成：

```tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, AUTH_IMPLEMENTATION } from '@/store/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    console.warn(`[ProtectedRoute] blocked unauthenticated access in ${AUTH_IMPLEMENTATION} mode`, location.pathname)
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <>{children}</>
}
```

`src/App.tsx` 中 `/admin` 路由改成：

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <PageLayout><AdminDashboard /></PageLayout>
    </ProtectedRoute>
  }
/>
```

`src/pages/DashboardPage.tsx` 在标题块下方加入：

```tsx
<MockAuthNotice scope="dashboard" />
```

并在文件顶部补充导入：

```tsx
import { MockAuthNotice } from '@/components/auth/MockAuthNotice'
```

`src/pages/AdminDashboard.tsx` 在主内容前加入：

```tsx
<MockAuthNotice scope="admin" />
```

并在文件顶部补充导入：

```tsx
import { MockAuthNotice } from '@/components/auth/MockAuthNotice'
```

- [ ] **Step 5: 运行校验脚本，确认 mock 鉴权语义已经收口**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: PASS，并输出：
- `PASS architecture`
- `PASS routes`
- `PASS resources`
- `PASS auth`

- [ ] **Step 6: 提交鉴权语义收口**

```bash
git add scripts/verify-structure-alignment.mjs src/components/auth/MockAuthNotice.tsx src/store/auth-store.ts src/components/auth/ProtectedRoute.tsx src/App.tsx src/pages/DashboardPage.tsx src/pages/AdminDashboard.tsx
git commit -m "refactor: clarify mock auth boundaries"
```

## Task 5: 跑通最小集成验证

**Files:**
- Modify: `scripts/verify-structure-alignment.mjs` (only if a failed check reveals an implementation drift)
- Verify: `public/docs/technical/architecture.md`
- Verify: `src/App.tsx`
- Verify: `src/components/RoutePreloader.tsx`
- Verify: `src/data/siteResources.ts`
- Verify: `src/pages/ResourcesPage.tsx`
- Verify: `src/store/auth-store.ts`
- Verify: `src/components/auth/ProtectedRoute.tsx`
- Verify: `src/pages/DashboardPage.tsx`
- Verify: `src/pages/AdminDashboard.tsx`

- [ ] **Step 1: 运行静态收口校验**

Run: `node scripts/verify-structure-alignment.mjs`
Expected: PASS，并连续输出：
- `PASS architecture`
- `PASS routes`
- `PASS resources`
- `PASS auth`

- [ ] **Step 2: 运行类型与生产构建校验**

Run: `pnpm build`
Expected: PASS，并完成 `tsc -b && vite build && node scripts/generate-static-pages.mjs`

- [ ] **Step 3: 手动验证关键访问路径**

Run: `pnpm dev`
Expected: 本地站点正常启动，并能完成以下检查：
- `/docs/technical` 可访问，内容与当前架构一致
- `/resources` 正常渲染，卡片数据来自统一数据模块
- 未登录访问 `/dashboard` 会跳转首页
- 未登录访问 `/admin` 会跳转首页
- 登录后访问 `/dashboard` 与 `/admin` 能看到 mock 鉴权提示

- [ ] **Step 4: 提交最终收口结果**

```bash
git add public/docs/technical/architecture.md scripts/verify-structure-alignment.mjs src/App.tsx src/components/RoutePreloader.tsx src/types/site-resource.ts src/data/siteResources.ts src/pages/ResourcesPage.tsx src/components/auth/MockAuthNotice.tsx src/store/auth-store.ts src/components/auth/ProtectedRoute.tsx src/pages/DashboardPage.tsx src/pages/AdminDashboard.tsx
git commit -m "refactor: align structure docs routes data and auth"
```

## Self-Review Notes

- **Spec coverage:** 文档真相、路由收口、资源来源统一、mock 鉴权语义、最小验证都分别映射到了 Task 1-5。
- **Placeholder scan:** 计划中未使用 `TODO`、`TBD`、`稍后实现` 之类占位描述；每个任务都有明确文件、命令和目标代码。
- **Type consistency:** 资源页统一使用 `SiteResource`、`SiteResourceCategory`、`SiteResourceDifficulty`；鉴权统一使用 `AUTH_IMPLEMENTATION = 'mock'`。
