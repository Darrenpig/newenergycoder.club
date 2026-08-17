# New Energy Coder Club 官网

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8.svg)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000.svg)](https://vercel.com/)

新能源编程俱乐部官网项目，面向新能源、嵌入式、机器人和开源协作场景，提供俱乐部展示、活动发布、项目介绍、学习资源、技术文档和成员加入入口。

- 线上地址: [https://newenergycoder.club](https://newenergycoder.club)
- 主仓库: [https://github.com/new-energy-coder-club/newenergycoder.club](https://github.com/new-energy-coder-club/newenergycoder.club)
- 历史归档仓库: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)

## 项目概览

本项目是一个基于 Vite 的 React 单页应用，部署在 Vercel。除了官网展示能力外，仓库还包含文档渲染、SEO 静态页生成、活动图库缩略图生成、成员数据同步和站点收录推送等配套脚本。

当前站点包含的核心能力：

- 官网首页、团队、项目、活动、资源、联系与加入页面
- Markdown 文档浏览与技术文档目录
- 中英文切换、暗黑模式与响应式布局
- 基于 Feishu/Lark Base 的加入表单提交接口
- SEO 相关资源，如 `robots.txt`、`sitemap.xml`、`llms.txt`
- 构建后静态页生成与搜索引擎收录辅助脚本

## 技术栈

- 前端框架: React 18
- 开发语言: TypeScript
- 构建工具: Vite 6
- 样式方案: Tailwind CSS 3 + Radix UI + shadcn/ui
- 动效: GSAP + Framer Motion
- 路由: React Router
- 状态管理: Zustand
- 文档渲染: react-markdown + remark-gfm
- 监控分析: Sentry + Vercel Analytics + Vercel Speed Insights
- 部署平台: Vercel

## 快速开始

### 环境要求

- Node.js `22.x`
- pnpm `9+` 或兼容版本

### 安装依赖

```bash
git clone https://github.com/new-energy-coder-club/newenergycoder.club.git
cd newenergycoder.club
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

默认开发地址为 [http://localhost:5173](http://localhost:5173)。

### 常用命令

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm generate:gallery-thumbnails
pnpm fetch:gitee-team-stats
pnpm indexnow:push
pnpm indexnow:push:all
pnpm indexnow:dry
```

命令说明：

- `pnpm dev`: 启动本地开发服务器
- `pnpm build`: 执行 TypeScript 构建、Vite 打包，并生成静态页面
- `pnpm preview`: 本地预览生产构建结果
- `pnpm lint`: 运行 ESLint
- `pnpm generate:gallery-thumbnails`: 生成活动图库缩略图
- `pnpm fetch:gitee-team-stats`: 拉取 Gitee 团队统计数据
- `pnpm indexnow:*`: 向搜索引擎推送站点 URL

## 环境变量

复制模板后再填写真实值：

```bash
cp .env.example .env.local
```

常用变量如下：

| 变量名 | 说明 | 必填 |
| --- | --- | --- |
| `VITE_SENTRY_DSN` | Sentry DSN | 否 |
| `VITE_APP_VERSION` | 站点版本号 | 否 |
| `VITE_APP_NAME` | 站点名称 | 否 |
| `VITE_APP_DESCRIPTION` | 站点描述 | 否 |
| `VITE_API_BASE_URL` | 前端调用 API 的基础地址 | 否 |
| `VITE_ASSISTANT_PROVIDER` | AI 助手提供方，支持 `mintlify` 或 `dify` | 否 |
| `VITE_DIFY_EMBED_TOKEN` | Dify 嵌入 token | `provider=dify` 时必填 |
| `VITE_DIFY_BASE_URL` | Dify 服务地址 | 否 |
| `FEISHU_APP_ID` | 飞书应用 App ID | 启用加入表单后端写入时必填 |
| `FEISHU_APP_SECRET` | 飞书应用 App Secret | 启用加入表单后端写入时必填 |
| `FEISHU_JOIN_BASE_APP_TOKEN` | 飞书多维表格 App Token | 启用加入表单后端写入时必填 |
| `FEISHU_JOIN_TABLE_ID` | 飞书多维表格 Table ID | 启用加入表单后端写入时必填 |
| `FEISHU_JOIN_FIELD_*` | 表单字段映射 | 启用加入表单后端写入时必填 |

说明：

- 前端环境变量使用 `VITE_*` 前缀。
- 涉及密钥的变量只应保存在本地或部署平台，不要提交到 Git。
- `api/join.ts` 会使用 `FEISHU_*` 变量将报名信息写入飞书多维表格。

## 项目结构

```text
newenergycoder.club/
|- api/                  # Vercel Serverless Functions
|- public/               # 静态资源与公开文档
|  |- docs/              # Markdown 文档内容
|- scripts/              # 构建、同步、推送类脚本
|- src/
|  |- components/        # 业务组件与通用 UI
|  |- contexts/          # Context 状态
|  |- data/              # 站点数据
|  |- hooks/             # 自定义 Hooks
|  |- lib/               # 基础工具与 i18n
|  |- pages/             # 页面级组件
|  |- services/          # 文档、缓存、链接处理服务
|  |- store/             # Zustand store
|  |- types/             # 类型定义
|  |- utils/             # 通用工具函数
|- vercel.json           # Vercel 构建与路由配置
|- .env.example          # 环境变量模板
|- pnpm-lock.yaml        # pnpm 锁文件
```

## 部署说明

项目默认部署到 Vercel，关键配置位于 `vercel.json`：

- 安装命令: `pnpm install --no-frozen-lockfile`
- 构建命令: `pnpm build`
- 输出目录: `dist`
- 路由策略: 通过 rewrite 将 SPA 路由回退到 `index.html`
- 缓存策略: 为 `assets` 设置长缓存

如果需要本地验证生产构建：

```bash
pnpm build
pnpm preview
```

## 开发说明

- 文档内容主要维护在 `public/docs/`
- 加入表单后端逻辑位于 `api/join.ts`
- 技术文档、学习路径与资源页面均依赖 Markdown 内容和前端渲染组件
- 构建流程会额外执行 `scripts/generate-static-pages.mjs` 生成 SEO 相关静态页

## 贡献建议

- 优先使用 `pnpm`
- 提交前至少执行 `pnpm lint`
- 修改文档时同步检查站内链接和导航结构
- 涉及环境变量或第三方服务接入时，同时更新 `.env.example` 和相关文档

## License

本项目采用 [MIT License](LICENSE)。
