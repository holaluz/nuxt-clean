import { ApiResult } from '@@/src/shared/ApiResponse'
import { Article, EditingArticle, IArticleRepository } from '@domain/Article'

import { IApiService } from '../ApiService'
import { fromDTOtoViewModel } from './ArticleMapper'
import { ArticleDTO } from './ArticleDTO'

type ApiService = {
  apiService: IApiService
}

/**
 * The goal of this layer is to perform a request and transform the data
 * returned by the server to a domain model defined in our application.
 */
export function ArticleService({ apiService }: ApiService): IArticleRepository {
  return {
    getRecentArticles,
    createArticle,
  }

  async function getRecentArticles(): Promise<ApiResult<Article[]>> {
    const result = await apiService.get<ArticleDTO[]>({
      url: '/posts',
    })

    return result.map((articlesDTO) => articlesDTO.map(fromDTOtoViewModel))
  }

  async function createArticle(
    article: EditingArticle
  ): Promise<ApiResult<Article>> {
    const result = await apiService.post<ArticleDTO>({
      url: '/posts',
      data: article,
    })

    return result.map(fromDTOtoViewModel)
  }
}
