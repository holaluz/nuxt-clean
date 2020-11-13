import { Article, EditingArticle, IArticleRepository } from '@domain/Article'
import { HttpResult } from '@@/src/shared/HttpResult'
import { IHttpService } from '../HttpService'
import { fromDTOtoViewModel } from './ArticleMapper'
import { ArticleDTO } from './ArticleDTO'

/**
 * The goal of this layer is to perform a request and transform the data
 * returned by the server to a domain model defined in our application.
 */
export function ArticleService(httpService: IHttpService): IArticleRepository {
  return {
    getRecentArticles,
    createArticle,
  }

  async function getRecentArticles(): Promise<HttpResult<Article[]>> {
    const result = await httpService.get<ArticleDTO[]>({
      url: '/posts',
    })

    return result.map((articlesDTO) => articlesDTO.map(fromDTOtoViewModel))
  }

  async function createArticle(
    article: EditingArticle
  ): Promise<HttpResult<Article>> {
    const result = await httpService.post<ArticleDTO>({
      url: '/posts',
      data: article,
    })

    return result.map(fromDTOtoViewModel)
  }
}
