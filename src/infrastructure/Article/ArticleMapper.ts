import { Article } from '@domain/Article'
import { ArticleDTO } from './ArticleDTO'

// Imagine the API does not map our Entity 1-to-1. This mapper helps
// us with the translation.
export class ArticleMapper {
  public static fromDTOtoViewModel(dto: ArticleDTO): Article {
    return {
      slug: dto.slug,
      title: dto.title,
      createdAt: dto.createdAt,
      body: dto.body,
      favorited: dto.isFavorited,
    }
  }
}
