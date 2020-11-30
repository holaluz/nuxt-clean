import { HttpResult } from '@shared/http/HttpResult'
import { Article, EditingArticle } from './article.types'

export interface IArticleRepository {
  getRecentArticles(): HttpResult<Article[]>
  createArticle(article: EditingArticle): HttpResult<Article>
}
