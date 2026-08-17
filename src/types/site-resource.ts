export type SiteResourceCategory =
  | 'all'
  | 'tutorials'
  | 'tools'
  | 'books'
  | 'courses'
  | 'documentation'

export type SiteResourceDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type SiteResourceAccess = 'free' | 'paid'

export interface SiteResource {
  id: string
  title: string
  description: string
  image: string
  category: Exclude<SiteResourceCategory, 'all'>
  difficulty: SiteResourceDifficulty
  type: SiteResourceAccess
  author: string
  rating: number
  url: string
  downloadUrl?: string
  tags: string[]
}
