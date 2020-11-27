import {
  Article,
  EditingArticle,
  IArticleRepository,
} from '@@/src/modules/article/domain'
import { combine } from '@@/src/shared/Result'
import { HttpResult } from '@@/src/shared/http/HttpResult'
import { IHttpService } from '@@/src/shared/http/HttpService'
import { IArticleDTO } from './ArticleParser'
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
    function parseTo(articlesDTO: IArticleDTO[]) {
      const listOfArticleResults = articlesDTO.map(ArticleDTO.toDomain)
      return combine(listOfArticleResults)
    }

    const result = await httpService.get<IArticleDTO[], Article[]>(
      { url: '/posts' },
      { parseTo }
    )

    return result
  }

  async function createArticle(article: EditingArticle): HttpResult<Article> {
    const result = await httpService.post<IArticleDTO, Article>(
      {
        url: '/posts',
        data: article,
      },
      {
        parseTo: (articleDTO: IArticleDTO) => ArticleDTO.toDomain(articleDTO),

        // not 100% sure about this
        parseFrom: (editingArticle: Article) =>
          ArticleDTO.fromDomain(editingArticle),
      }
    )

    return result
  }
}
