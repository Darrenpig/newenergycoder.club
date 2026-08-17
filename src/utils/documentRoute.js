export function resolveDocumentRouteParams(params, pathname = '') {
  const slug = params?.slug

  if (!slug) {
    return null
  }

  if (params?.category) {
    return {
      category: params.category,
      subcategory: params.subcategory,
      slug,
    }
  }

  if (pathname.startsWith('/docs/technical/')) {
    return {
      category: 'technical',
      subcategory: undefined,
      slug,
    }
  }

  return null
}
