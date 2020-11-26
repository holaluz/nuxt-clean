import { Article } from '@@/src/modules/article/domain'
import { ArticleDTO } from './ArticleDTO'

// Imagine the API does not map our Entity 1-to-1. This mapper helps
// us with the translation.
export function ArticleParser(dto: ArticleDTO) {
  return {
    slug: dto.slug,
    title: dto.title,
    createdAt: new Date(dto.createdAt),
    body: dto.body,
    favorited: dto.isFavorited,
  } as Article
}
