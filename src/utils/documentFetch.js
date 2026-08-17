export function shouldFallbackToDirectMarkdown(response) {
  if (!response?.ok) {
    return true
  }

  const contentType = response.headers?.get?.('content-type')?.toLowerCase() ?? ''

  return contentType.includes('text/html')
}
