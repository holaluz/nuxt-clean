import { User } from '@domain/User'
import { Article, EditingArticle } from './article.types'

export type ArticleRepository = {
  get: (id: string, user: User) => Promise<Article>
  add: (editingArticle: EditingArticle, user: User) => Promise<Article>
  // update
  // remove
  // ...
}
