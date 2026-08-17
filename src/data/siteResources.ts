import { trainingCategories } from '@/data/resources'
import {
  DifficultyLevel,
  ResourceType,
  type LearningResource,
} from '@/types/learning'
import type {
  SiteResource,
  SiteResourceCategory,
  SiteResourceDifficulty,
} from '@/types/site-resource'

type ResourcePageCategory = Exclude<SiteResourceCategory, 'all'>

const toSiteDifficulty = (
  difficulty: DifficultyLevel,
): SiteResourceDifficulty => {
  switch (difficulty) {
    case DifficultyLevel.EASY:
      return 'beginner'
    case DifficultyLevel.MEDIUM:
      return 'intermediate'
    case DifficultyLevel.HARD:
      return 'advanced'
  }
}

const toSiteCategory = (type: ResourceType): ResourcePageCategory => {
  switch (type) {
    case ResourceType.DOCUMENTATION:
    case ResourceType.COMMUNITY:
      return 'documentation'
    case ResourceType.VIDEO:
    case ResourceType.PRACTICE:
      return 'tutorials'
    case ResourceType.TOOL:
      return 'tools'
    case ResourceType.BOOK:
      return 'books'
    case ResourceType.COURSE:
      return 'courses'
  }
}

const buildImageUrl = (resource: LearningResource) => {
  const prompt = encodeURIComponent(
    [
      'realistic educational resource cover',
      resource.title,
      resource.tags.slice(0, 3).join(', '),
      'clean editorial layout',
      'modern learning website hero card',
      'high detail',
    ].join(', '),
  )

  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`
}

export const siteResources: SiteResource[] = trainingCategories.flatMap(
  (category) =>
    category.resources.map((resource) => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      image: buildImageUrl(resource),
      category: toSiteCategory(resource.type),
      difficulty: toSiteDifficulty(resource.difficulty),
      type: resource.isFree ? 'free' : 'paid',
      author: category.name,
      rating: category.recommendationLevel,
      url: resource.url,
      tags: resource.tags,
    })),
)
