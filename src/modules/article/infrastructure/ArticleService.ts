import { Article, IArticleRepository } from '@modules/article/domain'
import { combine } from '@shared/result'
import { HttpResult } from '@shared/http/HttpResult'
import { IHttpService } from '@shared/http/HttpService'
import * as ArticleDTO from './ArticleParser'

/**
 * The goal of this layer is to perform a request and transform the data
 * returned by the server to a domain model defined in our application.
 */
export function ArticleService(httpService: IHttpService): IArticleRepository {
  return {
    getRecentArticles,
    createArticle,
  }

  async function getRecentArticles(): HttpResult<Article[]> {
    function parseTo(articlesDTO: ArticleDTO.IArticleDTO[]) {
      const listOfArticleResults = articlesDTO.map(ArticleDTO.toDomain)
      return combine(listOfArticleResults)
    }

    const result = await httpService.get<ArticleDTO.IArticleDTO[], Article[]>(
      { url: '/posts' },
      { parseTo }
    )

    return result
  }

  async function createArticle(article: Article): HttpResult<Article> {
    const parsedArticle = ArticleDTO.fromDomain(article)

    const result = await httpService.post<ArticleDTO.IArticleDTO, Article>(
      {
        url: '/posts',
        data: parsedArticle,
      },
      {
        parseTo: (articleDTO: ArticleDTO.IArticleDTO) =>
          ArticleDTO.toDomain(articleDTO),
      }
    )

    return result
  }
}
