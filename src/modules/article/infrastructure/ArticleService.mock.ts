import { rest } from 'msw'
import { mockArticles } from '../domain'
import * as ArticleDTO from './ArticleParser'

export const ArticleServiceMock = [
  rest.post<ArticleDTO.IArticleDTO>(/\/create-article/, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ ...req.body, isFavorited: false }))
  }),

  rest.get<ArticleDTO.IArticleDTO[]>(/\/get-recent-articles/, (_, res, ctx) => {
    const articlesDTO = mockArticles().map((article) =>
      ArticleDTO.fromDomain(article)
    )

    return res(ctx.json(articlesDTO))
  }),
]
