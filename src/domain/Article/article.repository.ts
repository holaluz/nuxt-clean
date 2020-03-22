import { Article, EditingArticle } from './article.types'
import { User } from '@/domain/User'

export type ArticleRepository = {
  get: (id: string, user: User) => Promise<Article>
  add: (editingArticle: EditingArticle, user: User) => Promise<Article>
  // update
  // remove
  // ...
}
