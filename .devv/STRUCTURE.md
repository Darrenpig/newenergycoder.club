# This file is only for editing file nodes, do not break the structure
## Project Description
New Energy Coder Club website - A platform for a community of developers working on sustainable energy solutions. The website showcases the club's mission, projects, events, and provides resources for members interested in coding for clean energy applications.

## Key Features
- Modern, responsive design with clean energy-themed aesthetics
- Comprehensive club information with mission and team members
- GitHub repository integration and direct links
- Join page with redirect to membership application
- Project and event showcase for community engagement
- Resource sharing and learning materials section
- Social login with Google and WeChat
- Member dashboard for authenticated users

## Devv SDK Integration
No SDK features required (using mock authentication in Phase 1)

/src
├── assets/          # Static resources directory, storing static files like images and fonts
│
├── components/      # Components directory
│   ├── auth/       # Authentication components (login, user menu, protected routes)
│   ├── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook from shadcn (import { useIsMobile } from '@/hooks/use-mobile')
│   └── use-toast.ts  # Toast notification system hook for displaying toast messages (import { useToast } from '@/hooks/use-toast')
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── store/          # Application state management
│   └── auth-store.ts # Authentication state with Zustand
│
├── pages/          # Page components directory, based on React Router structure
│   ├── HomePage.tsx # Home page component, serving as the main entry point of the application
│   ├── JoinPage.tsx # Join page component, redirects to external membership application
│   ├── DashboardPage.tsx # Dashboard for authenticated users
│   └── NotFoundPage.tsx # 404 error page component, displays when users access non-existent routes
│
├── App.tsx         # Root component, with React Router routing system configured
│                   # Add new route configurations in this file
│                   # Includes catch-all route (*) for 404 page handling
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file, containing Tailwind configuration and custom styles
│                   # Modify theme colors and design system variables in this file
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file
# Contains theme customization, plugins, and content paths
# Includes shadcn/ui theme configuration

/.devv
│   ├── README.md        # Project overview and contribution guidelines
│   ├── STRUCTURE.md     # Describes the project structure and file purposes
│   └── TODO.md          # Records project progress and remaining tasks