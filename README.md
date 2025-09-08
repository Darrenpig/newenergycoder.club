# New Energy Coder Club 官方网站

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-cyan.svg)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**新能源编程俱乐部官方网站** - 一个旨在连接、启发和赋能新能源领域开发者和爱好者的现代化、功能丰富的平台。

🌐 **在线访问**: [https://www.newenergycoder.club/](https://www.newenergycoder.club/)
## ✨ 项目简介

新能源编程俱乐部（New Energy Coder Club）是一个致力于探索和推进软件技术在新能源领域应用的开发者社区。我们相信，通过代码和创新，可以为可持续发展的未来贡献力量。

本网站作为俱乐部的官方门户，旨在：
- **展示俱乐部形象**：分享我们的使命、愿景和团队成员。
- **发布最新动态**：发布俱乐部活动、技术研讨会和项目更新。
- **提供资源共享**：汇集学习资料、开发工具和行业报告。
- **促进社区互动**：提供一个平台，让成员可以交流思想、协作项目。

## 🚀 快速启动

### 环境要求

- **Node.js**: >= 22.0.0 (项目配置要求)
- **包管理器**: npm (推荐) 或 pnpm/yarn
- **操作系统**: Windows, macOS, Linux

### 本地开发

1. **克隆仓库**
```bash
git clone https://gitee.com/darrenpig/new_energy_coder_club.git
cd newenergycoder.club
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动，支持热重载。

### 其他命令

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

### 本地测试指南

#### 功能测试清单

- [ ] **页面导航**: 测试所有页面路由是否正常工作
  - 首页 (`/`)
  - 团队页面 (`/team`)
  - 活动页面 (`/events`)
  - 项目页面 (`/projects`)
  - 资源页面 (`/resources`)
  - 加入我们 (`/join`)
  - 联系我们 (`/contact`)
  - 仪表板 (`/dashboard`) - 需要登录
  - 飞书加入表单 (`/feishu-join`)
  - 显示比例页面 (`/display-ratio`)

- [ ] **响应式设计**: 在不同屏幕尺寸下测试
  - 桌面端 (≥1200px)
  - 平板端 (768px-1199px)
  - 移动端 (<768px)

- [ ] **主题切换**: 测试明亮/暗黑模式切换

- [ ] **语言切换**: 测试中英文切换功能

- [ ] **交互功能**: 测试按钮、表单、模态框等交互元素

#### 常见问题排查

**端口被占用**
```bash
# 查看端口占用
netstat -ano | findstr :5173  # Windows
lsof -ti:5173 | xargs kill -9  # macOS/Linux
```

**依赖安装失败**
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**TypeScript 类型错误**
```bash
# 检查 TypeScript 配置
npx tsc --noEmit
```

## 🚀 部署

### Vercel 部署（推荐）

本项目已配置 Vercel 自动部署：

1. **自动部署**: 推送到 `main` 分支即可自动部署到生产环境
2. **预览部署**: Pull Request 会自动创建预览环境
3. **域名配置**: 在 Vercel 控制台配置自定义域名

### 手动部署

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview

# 部署到其他平台
# 将 dist 目录上传到静态托管服务
```

### 环境变量配置

在部署平台配置以下环境变量：

```bash
# Vercel Analytics（可选）
VITE_VERCEL_ANALYTICS_ID=your_analytics_id

# 其他配置
VITE_APP_TITLE=New Energy Coder Club
VITE_APP_DESCRIPTION=新能源编程俱乐部官方网站
```

### 部署检查清单

- [ ] 构建成功无错误
- [ ] 所有页面路由正常
- [ ] 响应式设计在各设备正常显示
- [ ] 主题切换功能正常
- [ ] 语言切换功能正常
- [ ] 图片和静态资源加载正常
- [ ] SEO 元数据配置正确


## 🌟 主要功能

### 核心功能
- **🌍 多语言支持**: 内置国际化（i18n），支持中英文无缝切换
- **🎨 主题切换**: 支持明亮和暗黑模式，自动适应系统设置
- **📱 响应式设计**: 完美适配桌面、平板和移动设备
- **🔐 用户认证**: 完整的登录/注册系统，支持受保护路由
- **📊 数据可视化**: 内置图表和数据展示组件

### 页面功能
- **🏠 首页**: 展示俱乐部概况、特色功能和最新动态
- **👥 团队页面**: 展示核心团队成员和组织架构
- **📅 活动页面**: 发布和管理俱乐部活动、技术研讨会
- **🚀 项目页面**: 展示开源项目和技术成果
- **📚 资源页面**: 提供学习资料、开发工具和行业报告
- **🤝 加入我们**: 多种加入方式，包括飞书群和表单申请
- **📞 联系我们**: 完整的联系信息和地图定位
- **📊 仪表板**: 用户个人中心和数据管理（需登录）

### 技术特性
- **⚡ 高性能**: 基于 Vite 构建，支持热重载和快速构建
- **🧩 组件化**: 基于 `shadcn/ui` 和 `Radix UI`，易于维护和扩展
- **🎯 类型安全**: 完整的 TypeScript 支持
- **📈 分析统计**: 集成 Vercel Analytics 进行访问统计
- **🔍 SEO 优化**: 良好的搜索引擎优化支持

## 🛠️ 技术栈

### 核心技术
- **前端框架**: React 18.2.0 + TypeScript 5.7.2
- **构建工具**: Vite 6.3.5
- **样式框架**: Tailwind CSS 3.x
- **UI 组件库**: shadcn/ui + Radix UI
- **路由管理**: React Router DOM 6.22.1
- **状态管理**: Zustand 5.0.6

### 开发工具
- **代码检查**: ESLint 9.22.0 + TypeScript ESLint 8.26.1
- **样式处理**: PostCSS + Autoprefixer
- **图标库**: Lucide React 0.503.0
- **工具函数**: clsx + tailwind-merge + class-variance-authority

### 监控与分析
- **部署平台**: Vercel
- **CDN 加速**: Cloudflare
- **访问统计**: Vercel Analytics 1.5.0
- **构建优化**: Terser 5.43.1

### 开发体验
- **热重载**: Vite HMR
- **类型检查**: TypeScript 严格模式
- **代码格式化**: ESLint + React Hooks 插件
- **国际化**: 自定义 i18n 解决方案

## 📁 项目结构

```
newenergycoder.club/
├── public/                 # 静态资源
├── src/
│   ├── components/        # 可复用组件
│   │   ├── auth/         # 用户认证组件
│   │   ├── forms/        # 表单组件
│   │   ├── home/         # 首页专用组件
│   │   ├── layout/       # 布局组件
│   │   └── ui/           # 基础 UI 组件 (shadcn/ui)
│   ├── contexts/          # React Context
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具库和配置
│   │   ├── i18n/         # 国际化配置
│   │   └── utils.ts      # 工具函数
│   ├── pages/             # 页面组件
│   ├── store/             # Zustand 状态管理
│   ├── services/          # API 服务
│   ├── App.tsx            # 应用主组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── eslint.config.js       # ESLint 配置
├── tailwind.config.js     # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
├── vercel.json            # Vercel 部署配置
└── package.json           # 项目依赖和脚本
```

## 👨‍💻 开发指南

### 代码规范

- **命名约定**: 使用 PascalCase 命名组件，camelCase 命名变量和函数
- **文件组织**: 每个组件一个文件，相关组件放在同一目录下
- **类型定义**: 优先使用 TypeScript 接口定义数据结构
- **样式规范**: 使用 Tailwind CSS 类名，避免内联样式

### 主要技术使用

- **组件开发**: 基于 React + TypeScript
- **样式系统**: Tailwind CSS + shadcn/ui 组件
- **状态管理**: Zustand (轻量级状态管理)
- **路由管理**: React Router DOM
- **国际化**: 自定义 i18n 解决方案
- **构建工具**: Vite (快速开发和构建)

## 🤝 贡献指南

我们欢迎任何形式的贡献！无论是报告错误、提交功能请求，还是直接贡献代码。

### 贡献流程

1. **Fork 本仓库**
2. **创建您的分支** (`git checkout -b feature/AmazingFeature`)
3. **提交您的更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 代码审查

- 确保代码通过 ESLint 检查
- 确保 TypeScript 类型检查通过
- 添加必要的注释和文档
- 测试新功能的各种场景

## ⚡ 性能特性

- **快速构建**: 基于 Vite 的极速开发体验
- **代码分割**: 自动路由级别的代码分割
- **资源优化**: 生产构建自动压缩和优化
- **响应式设计**: 完美适配各种设备
- **现代浏览器**: 支持最新的 Web 标准

## ❓ 常见问题

### Q: 开发服务器启动失败？

A: 
```bash
# 1. 确保 Node.js 版本 >= 22.0.0
node --version

# 2. 清除缓存重新安装依赖
npm cache clean --force
rm -rf node_modules package-lock.json  # Linux/macOS
# 或 rmdir /s node_modules && del package-lock.json  # Windows
npm install

# 3. 检查端口是否被占用
netstat -ano | findstr :5173  # Windows
lsof -ti:5173 | xargs kill -9  # macOS/Linux
```

### Q: 如何添加新的页面？

A: 
1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `App.tsx` 中添加路由配置
3. 在导航组件中添加链接

### Q: 如何自定义主题？

A: 
1. 修改 `tailwind.config.js` 中的颜色配置
2. 更新 CSS 变量定义
3. 确保深色模式适配

### Q: TypeScript 类型错误？

A: 
```bash
# 检查 TypeScript 配置
npx tsc --noEmit
```

## 📞 联系我们

- **官方网站**: [https://www.newenergycoder.club/](https://www.newenergycoder.club/)
- **Gitee 仓库**: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)
- **项目负责人**: [DarrenPig](https://gitee.com/darrenpig)
- **加入我们**: 访问网站 `/join` 页面了解更多

## 📜 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

- **Gitee 仓库**: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)
- **项目负责人**: [DarrenPig](https://gitee.com/darrenpig)

---

**New Energy Coder Club** - 连接新能源领域的开发者，用代码创造可持续的未来 🌱
