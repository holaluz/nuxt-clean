import { ApiResult } from '@@/src/shared/ApiResponse'
import { Article, EditingArticle, IArticleRepository } from '@domain/Article'

import { IApiService } from '../ApiService'
import { ArticleMapper } from './ArticleMapper'
import { ArticleDTO } from './ArticleDTO'

type ApiService = {
  apiService: IApiService
}

export function ArticleService({ apiService }: ApiService): IArticleRepository {
  return {
    getRecentArticles,
    createArticle,
  }

  async function getRecentArticles(): Promise<ApiResult<Article[]>> {
    const result = await apiService.get<ArticleDTO[]>({
      url: '/posts',
    })

    return result.map((articlesDTO) =>
      articlesDTO.map((p: ArticleDTO) => ArticleMapper.fromDTOtoViewModel(p))
    )
  }

  async function createArticle(
    article: EditingArticle
  ): Promise<ApiResult<Article>> {
    const result = await apiService.post<ArticleDTO>({
      url: '/posts',
      data: article,
    })

    return result.map((articleDTO) =>
      ArticleMapper.fromDTOtoViewModel(articleDTO)
    )
  }
}
