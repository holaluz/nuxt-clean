import { rest } from 'msw'
import { Article, mockArticle, mockArticles } from '../domain'
import * as ArticleDTO from './ArticleParser'

export const ArticleServiceMock = [
  rest.post<Article, ArticleDTO.IArticleDTO>(
    /\/create-article/,
    (_, res, ctx) => {
      return res(ctx.json(ArticleDTO.fromDomain(mockArticle())))
    }
  ),

  rest.get<Article[], ArticleDTO.IArticleDTO[]>(
    /\/get-recent-articles/,
    (_, res, ctx) => {
      const articlesDTO = mockArticles().map((article) =>
        ArticleDTO.fromDomain(article)
      )

      return res(ctx.json(articlesDTO))
    }
  ),
]
