import { User } from '@domain/User'
import {
  ArticleRepository,
  EditingArticle,
  createArticle
} from '@domain/Article'

type Services = {
  apiService: any // ??
}

function articleRepository({ apiService }: Services): ArticleRepository {
  return {
    get,
    add
  }

  async function get(id: string, user: User) {
    const { data: rawArticle } = await apiService.get(`/article/${id}`, user)

    return createArticle(rawArticle)
  }

  async function add(article: EditingArticle, user: User) {
    const { data: rawArticle } = await apiService.post('/articles', user, {
      article
    })

    return createArticle(rawArticle)
  }
}

export { articleRepository }
