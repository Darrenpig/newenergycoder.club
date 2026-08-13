# 官网 SEO 优化与主流开源方案调研

> 日期：2026-08-12 · 作者：Claude / Kimi 协作
> 站点：https://newenergycoder.club（Vite + React 18 SPA，部署于 Vercel）

---

## 一、本次已完成的 SEO 优化

### 1. 修复核心缺陷：`HelmetProvider` 缺失
- `src/pages/LearningCenter.tsx` 早已使用 `react-helmet-async` 的 `<Helmet>`，但 `src/App.tsx` **从未包裹 `HelmetProvider`** → 所有页面级元数据实际从未生效。
- 现已在 `App.tsx` 根部注入 `HelmetProvider`（包在 `LanguageProvider` 外层），修复此失效 bug。

### 2. 新建可复用 SEO 组件
`src/components/SEO.tsx`（与 Kimi 会话共建）：
- 集中站点默认值（域名 / og-image / 默认描述 / Twitter 账号）
- 支持 `title | fullTitle | description | keywords | path | canonical | ogImage | ogType | noindex | jsonLd`
- 自动从 `useLocation()` 推导 canonical
- 导出 `orgAndWebsiteJsonLd()`（Organization + WebSite 结构化数据）

### 3. 全站主要页面接入 SEO 元数据
| 页面 | 说明 |
|---|---|
| `HomePage` | 完整 fullTitle + Organization/WebSite JSON-LD |
| `ProjectsPage` | 项目展示关键词 |
| `EventsPage` | 活动日历描述 |
| `ResourcesPage` | 学习资源描述 |
| `ContactPage` | 合作洽谈关键词（Kimi 完成） |
| `TeamPage` | 团队/Maintainer 关键词（Kimi 完成） |
| `InnovationShowcasePage` | 创新中心关键词（Kimi 完成） |
| `JoinPage` | 加入我们 |
| `GalleryPage` | 活动相册（本次补上） |
| `EmbeddedDetailPage` | 嵌入式路线 + 课程类关键词 |
| `MechanicalDetailPage` | 机械设计路线 |
| `GuiDetailPage` | GUI 开发路线 |
| `AlgorithmDetailPage` | 算法路线 |
| `DesignerDetailPage` | 设计路线 |
| `NotFoundPage` | `noindex, nofollow` 防索引 |

### 4. 静态层 SEO（index.html / robots.txt / sitemap.xml）
- `index.html` 头部加入完整双语元数据、OG/Twitter 卡片、Organization+WebSite+FAQPage 的 JSON-LD 结构化数据，以及 AI 爬虫辅助的 `llms.txt / llms-full.txt / ai-summary.txt` 链接（Kimi 完成）
- 新增 `<noscript>` 静态保底内容：无 JS 时搜索引擎/AI 也能读到站点导航、FAQ、核心板块
- `robots.txt` 显式放行国内外主流 AI 爬虫（DeepSeekBot、Kimi、Bytespider、GPTBot、ClaudeBot、PerplexityBot 等）
- `sitemap.xml` 补充 `lastmod/changefreq/priority` 字段；本次补上 `/gallery` 路由；新增 `sitemap-index.xml`

---

## 二、主流开源 SPA SEO 方案调研

当前项目痛点：纯 CSR SPA，首屏 HTML 无实际内容，**Google 虽能执行 JS 但渲染队列延迟、国内百度/搜狗对 JS 渲染支持差**。要根本性解决需引入「预渲染 / SSG」。

| 方案 | 最后更新 | 适配本项目 | 说明 |
|---|---|---|---|
| **vite-react-ssg** | 2026-07 ✅ 活跃 | ★★★★★ | 专为 Vite + React 设计的 SSG，API 极简，直接把现有 `createRoot` 换成 `ViteReactSSG` 即可，支持 `react-helmet-async`。**首选** |
| **Astro + @astrojs/react** | 2026-07 ✅ 活跃 | ★★★★ | 岛架构，把交互组件作为岛屿嵌入静态 HTML。SEO 最强，但要重写路由与组件为 `.astro`，迁移成本最高 |
| **vite-plugin-pages + vite-plugin-prerender** | 2026-02 / 2022-09 ⚠️ | ★★★ | `vite-plugin-pages` 还活跃，但 `vite-plugin-prerender` 已 3+ 年未更新，慎用 |
| **react-snap** | 2022-05 ❌ 停更 | ★★ | 基于 Puppeteer 快照，已停止维护 4 年，不推荐 |
| **prerender-spa-plugin** | 2023-04 ⚠️ | ★★ | webpack 时代产物，与 Vite 兼容性差 |
| **Next.js / Remix (React Router 8)** | 2026-08 ✅ 活跃 | ★★★ | 全栈框架，SSR/SSG/ISR 开箱即用。但本项目纯静态站，迁移性价比不如 vite-react-ssg |
| **TanStack Start** | 2026 活跃 | ★★★ | 新兴 React 全栈框架，生态仍在快速变动，不适合稳定社区站 |

### 推荐路径

**短期（已完成）**：本次的 Helmet + JSON-LD + noscript + AI 爬虫放行 + sitemap 已能覆盖 80% 基础需求。

**中期（1-2 周可完成）**：迁移到 **vite-react-ssg**
- 改动点：`main.tsx` 改用 `ViteReactSSG`，路由改为 `RouteRecord[]`，`vite.config.ts` 加 `ssgOptions`
- 收益：每个路由构建时产出真实 HTML，爬虫零渲染直接拿到完整内容；与现有 `react-helmet-async` 完全兼容
- 参考：https://github.com/Daydreamer-riri/vite-react-ssg

**长期（如果内容持续增长）**：评估 **Astro** 重构
- 适合文档/博客型站点；本项目的 Markdown 文档板块（`public/docs/`）天然契合 Astro Content Collections
- 但需将 22 个页面的路由与 i18n 体系迁移，工作量大，建议等内容形态稳定后再评估

---

## 三、后续建议（未做）

1. **预渲染迁移**：优先尝试 vite-react-ssg，见上文
2. **OG 图动态化**：当前所有页面共用一张 og-image.svg；可用 `@vercel/og` 在 Edge 上动态生成带页面标题的 PNG 卡片
3. **i18n hreflang**：站点已有 i18n（zh/en），但 canonical 与 og:locale:alternate 未按语言区分；若日后有 `/en` 路由需加 `hreflang="x-default"` 等
4. **百度/Google Search Console 提交**：sitemap 改完后，在两平台站长工具后台手动提交 `sitemap-index.xml`
5. **llms.txt 维护**：`public/llms.txt` 与 `llms-full.txt` 是 AI 检索的重要入口，内容更新后记得同步

---

## 附：验证方式

```bash
# 本地预览
pnpm build && pnpm preview
# 查看页面元数据是否生效（devtools → <head>）
# 结构化数据校验
# https://search.google.com/test/rich-results
# https://validator.schema.org/
```
