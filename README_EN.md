# New Energy Coder Club Website

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8.svg)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000.svg)](https://vercel.com/)

This repository contains the official website of New Energy Coder Club. It is built for new energy, embedded systems, robotics, and open-source collaboration scenarios, and provides club presentation, event publishing, project showcases, learning resources, technical documentation, and a membership application entry point.

- Live site: [https://newenergycoder.club](https://newenergycoder.club)
- Main repository: [https://github.com/new-energy-coder-club/newenergycoder.club](https://github.com/new-energy-coder-club/newenergycoder.club)
- Historical archive repository: [https://gitee.com/darrenpig/new_energy_coder_club](https://gitee.com/darrenpig/new_energy_coder_club)

## Overview

This project is a Vite-based React single-page application deployed on Vercel. In addition to the public-facing website, the repository also includes supporting scripts for Markdown document rendering, SEO static page generation, gallery thumbnail generation, member data synchronization, and search engine submission.

Core capabilities of the site include:

- Home, team, projects, events, resources, contact, and join pages
- Markdown-based documentation browsing and technical docs navigation
- Chinese and English language switching, dark mode, and responsive layouts
- A Feishu/Lark Base powered membership form submission API
- SEO resources such as `robots.txt`, `sitemap.xml`, and `llms.txt`
- Post-build static page generation and search indexing helper scripts

## Tech Stack

- Frontend framework: React 18
- Language: TypeScript
- Build tool: Vite 6
- Styling: Tailwind CSS 3 + Radix UI + shadcn/ui
- Motion: GSAP + Framer Motion
- Routing: React Router
- State management: Zustand
- Markdown rendering: react-markdown + remark-gfm
- Monitoring and analytics: Sentry + Vercel Analytics + Vercel Speed Insights
- Deployment platform: Vercel

## Quick Start

### Requirements

- Node.js `22.x`
- pnpm `9+` or a compatible version

### Install Dependencies

```bash
git clone https://github.com/new-energy-coder-club/newenergycoder.club.git
cd newenergycoder.club
pnpm install
```

### Start the Development Server

```bash
pnpm dev
```

The default local address is [http://localhost:5173](http://localhost:5173).

### Common Commands

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

Command summary:

- `pnpm dev`: start the local development server
- `pnpm build`: run TypeScript build, bundle with Vite, and generate static pages
- `pnpm preview`: preview the production build locally
- `pnpm lint`: run ESLint
- `pnpm generate:gallery-thumbnails`: generate event gallery thumbnails
- `pnpm fetch:gitee-team-stats`: fetch Gitee team statistics data
- `pnpm indexnow:*`: submit site URLs to search engines

## Environment Variables

Copy the template first, then fill in real values:

```bash
cp .env.example .env.local
```

Common variables:

| Variable | Description | Required |
| --- | --- | --- |
| `VITE_SENTRY_DSN` | Sentry DSN | No |
| `VITE_APP_VERSION` | Site version | No |
| `VITE_APP_NAME` | Site name | No |
| `VITE_APP_DESCRIPTION` | Site description | No |
| `VITE_API_BASE_URL` | Base URL for frontend API calls | No |
| `VITE_ASSISTANT_PROVIDER` | AI assistant provider, supports `mintlify` or `dify` | No |
| `VITE_DIFY_EMBED_TOKEN` | Dify embed token | Required when `provider=dify` |
| `VITE_DIFY_BASE_URL` | Dify service URL | No |
| `FEISHU_APP_ID` | Feishu app ID | Required when enabling join form backend write |
| `FEISHU_APP_SECRET` | Feishu app secret | Required when enabling join form backend write |
| `FEISHU_JOIN_BASE_APP_TOKEN` | Feishu Bitable app token | Required when enabling join form backend write |
| `FEISHU_JOIN_TABLE_ID` | Feishu Bitable table ID | Required when enabling join form backend write |
| `FEISHU_JOIN_FIELD_*` | Form field mapping | Required when enabling join form backend write |

Notes:

- Frontend environment variables use the `VITE_*` prefix.
- Secrets should only be stored locally or in the deployment platform and should never be committed to Git.
- `api/join.ts` uses the `FEISHU_*` variables to write membership applications into a Feishu Bitable.

## Project Structure

```text
newenergycoder.club/
|- api/                  # Vercel Serverless Functions
|- public/               # Static assets and public docs
|  |- docs/              # Markdown documentation content
|- scripts/              # Build, sync, and submission scripts
|- src/
|  |- components/        # Business components and shared UI
|  |- contexts/          # Context state
|  |- data/              # Site data
|  |- hooks/             # Custom hooks
|  |- lib/               # Base utilities and i18n
|  |- pages/             # Page-level components
|  |- services/          # Document, cache, and link processing services
|  |- store/             # Zustand store
|  |- types/             # Type definitions
|  |- utils/             # Shared utility functions
|- vercel.json           # Vercel build and routing configuration
|- .env.example          # Environment variable template
|- pnpm-lock.yaml        # pnpm lockfile
```

## Deployment

The project is deployed to Vercel by default. Key settings are defined in `vercel.json`:

- Install command: `pnpm install --no-frozen-lockfile`
- Build command: `pnpm build`
- Output directory: `dist`
- Routing strategy: SPA routes are rewritten back to `index.html`
- Cache strategy: long-term caching is enabled for `assets`

To validate the production build locally:

```bash
pnpm build
pnpm preview
```

## Development Notes

- Documentation content is mainly maintained under `public/docs/`
- The membership form backend logic is implemented in `api/join.ts`
- Technical docs, learning paths, and resource pages all depend on Markdown content and frontend rendering components
- The build pipeline additionally runs `scripts/generate-static-pages.mjs` to generate SEO-related static pages

## Contribution Notes

- Prefer using `pnpm`
- Run at least `pnpm lint` before committing
- When editing documentation, also verify internal links and navigation structure
- When introducing environment variables or third-party integrations, update both `.env.example` and the related docs

## License

This project is licensed under the [MIT License](LICENSE).
