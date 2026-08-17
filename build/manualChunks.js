export function getManualChunk(id) {
  // Keep React runtime and the router stack together to avoid cross-chunk
  // initialization ordering issues in production.
  if (
    id.includes("react-dom") ||
    id.includes("react/jsx-runtime") ||
    id.includes("react-router") ||
    id.includes("@remix-run/router") ||
    (id.includes("react") &&
      !id.includes("react-helmet") &&
      !id.includes("react-i18next") &&
      !id.includes("react-markdown") &&
      !id.includes("react-syntax-highlighter"))
  ) {
    return "react-vendor"
  }

  if (id.includes("@radix-ui/react-dialog")) {
    return "radix-dialog"
  }
  if (id.includes("@radix-ui/react-dropdown-menu")) {
    return "radix-dropdown"
  }
  if (id.includes("@radix-ui/react-select")) {
    return "radix-select"
  }
  if (id.includes("@radix-ui/react-tabs")) {
    return "radix-tabs"
  }
  if (id.includes("@radix-ui/react-toast")) {
    return "radix-toast"
  }
  if (id.includes("@radix-ui/react-tooltip")) {
    return "radix-tooltip"
  }
  if (id.includes("@radix-ui")) {
    return "radix-base"
  }
  if (id.includes("lucide-react")) {
    return "icons"
  }

  if (id.includes("framer-motion")) {
    return "animations"
  }

  if (id.includes("tailwind-merge")) {
    return "tailwind-merge"
  }
  if (id.includes("tailwindcss-animate")) {
    return "tailwind-animate"
  }
  if (id.includes("@tailwindcss/typography")) {
    return "tailwind-typography"
  }
  if (id.includes("clsx") || id.includes("class-variance-authority")) {
    return "style-utils"
  }

  if (id.includes("zustand")) {
    return "state-management"
  }

  if (id.includes("react-markdown")) {
    return "react-markdown"
  }
  if (id.includes("remark-gfm")) {
    return "remark-gfm"
  }
  if (id.includes("remark") || id.includes("rehype")) {
    return "markdown-processors"
  }

  if (id.includes("react-syntax-highlighter") || id.includes("prismjs")) {
    return "syntax-highlighter"
  }

  if (id.includes("@vercel/analytics")) {
    return "vercel-analytics"
  }
  if (id.includes("@vercel/speed-insights")) {
    return "vercel-insights"
  }
  if (id.includes("@sentry/react")) {
    return "sentry-react"
  }
  if (id.includes("@sentry/tracing")) {
    return "sentry-tracing"
  }
  if (id.includes("@sentry")) {
    return "sentry-core"
  }

  if (id.includes("react-i18next")) {
    return "react-i18next"
  }
  if (id.includes("i18next")) {
    return "i18next-core"
  }

  if (id.includes("react-helmet-async")) {
    return "react-helmet"
  }

  if (id.includes("node_modules")) {
    return undefined
  }
}
