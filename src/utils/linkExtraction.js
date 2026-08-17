const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g
const HTML_LINK_REGEX = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g
const FENCED_CODE_BLOCK_REGEX = /```[\s\S]*?```|~~~[\s\S]*?~~~/g
const INLINE_CODE_REGEX = /`[^`\n]+`/g

export function stripMarkdownCodeSegments(markdown) {
  return markdown
    .replace(FENCED_CODE_BLOCK_REGEX, '\n')
    .replace(INLINE_CODE_REGEX, '')
}

export function isMeaningfulLinkCandidate(link) {
  if (!link || link.trim().length === 0) return false

  const invalidPatterns = [
    /^javascript:/i,
    /^data:/i,
    /^blob:/i,
    /[\{\}\[\]`]/,
  ]

  return !invalidPatterns.some((pattern) => pattern.test(link))
}

export function extractCandidateLinksFromMarkdown(markdown) {
  const sanitized = stripMarkdownCodeSegments(markdown)
  const links = []

  let match

  while ((match = MARKDOWN_LINK_REGEX.exec(sanitized)) !== null) {
    links.push(match[2])
  }

  while ((match = HTML_LINK_REGEX.exec(sanitized)) !== null) {
    links.push(match[1])
  }

  while ((match = URL_REGEX.exec(sanitized)) !== null) {
    if (!links.includes(match[0])) {
      links.push(match[0])
    }
  }

  return [...new Set(links)].filter(isMeaningfulLinkCandidate)
}
