import { ApiResult } from '@@/src/shared/ApiResponse'
import { Article, EditingArticle } from './article.types'

export interface IArticleRepository {
  getRecentArticles(): Promise<ApiResult<Article[]>>
  createArticle(article: EditingArticle): Promise<ApiResult<Article>>
}
