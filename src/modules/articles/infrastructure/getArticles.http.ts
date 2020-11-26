import { httpCore } from '../../http/use-case/http-core.uc'
import { Article } from '../domain/article.model'

type ArticleDTO = {
  slug: string
  title: string
  createdAt: string
  body: string
  excerpt: string
  isFavorited: boolean
}

function parser(dto: ArticleDTO) {
  return {
    slug: dto.slug,
    title: dto.title,
    createdAt: new Date(dto.createdAt),
  } as Article
}

export function getArticles() {
  return httpCore.get<ArticleDTO, Article>('articles', parser)
}
