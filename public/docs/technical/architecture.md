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

- 不存在独立托管数据库、缓存或服务端数据层
- 不存在 API Gateway 或微服务拆分
- 不存在真实 OAuth 用户体系
- 不存在专门的服务端状态管理层

## 后续扩展原则

如果未来要引入真实数据层、认证体系或学习平台能力，应单独设计并实施，不应继续写入当前实现说明。
