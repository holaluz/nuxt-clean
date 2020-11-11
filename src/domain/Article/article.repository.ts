import { HttpResult } from '@@/src/shared/HttpResult'
import { Article, EditingArticle } from './article.types'

export interface IArticleRepository {
  getRecentArticles(): Promise<HttpResult<Article[]>>
  createArticle(article: EditingArticle): Promise<HttpResult<Article>>
}
