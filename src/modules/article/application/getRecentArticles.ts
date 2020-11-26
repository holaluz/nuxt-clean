/* eslint-disable no-console */
import { Article, IArticleRepository } from '@@/src/modules/article/domain'
import { HttpError, isHttpError } from '@@/src/shared/http/HttpError'
import { HttpStatusCode } from '@@/src/shared/http/HttpStatusCode'

type Services = {
  articleService: IArticleRepository
}

type Parameters = null
type Callbacks = {
  respondWithSuccess: (articles: Article[]) => void
  respondWithClientError: (e: HttpError) => void
  respondWithServerError: (e: HttpError) => void
}

export function getRecentArticles({
  articleService,
}: Services): UseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    _: Parameters,
    {
      respondWithSuccess,
      respondWithClientError,
      respondWithServerError,
    }: Callbacks
  ) {
    const result = await articleService.getRecentArticles()

    // // Example 1 - Imperative version:
    // if (result.isErr()) {
    //   // API failed
    //   console.error(result.error)
    // } else {
    //   const articles: Article[] = result.value
    //   respondWithSuccess(articles)
    //   console.log(articles)
    // }

    // Example 2 - Declarative version
    result
      .map((articleList) => {
        // The type annotation (Article[]) is unnecessary here but I've
        // included it for clarity.
        const articles: Article[] = articleList
        respondWithSuccess(articles)
      })
      .mapErr((error) => {
        // Example 2.1 - Error management with some cool helpers
        if (isHttpError(error)) {
          if (error.isClientError()) {
            respondWithClientError(error)
            return
          }

          respondWithServerError(error)
        }

        // Example 2.2 - We can also iterate on error constructor
        if (isHttpError(error)) {
          switch (error.status) {
            case HttpStatusCode.BAD_REQUEST:
              console.warn('BadRequestError!')
              break
            case HttpStatusCode.UNAUTHORIZED:
              console.warn('UnauthorizedError!')
              break
            case HttpStatusCode.NOT_FOUND:
              console.warn('NotFoundError!')
              break
            case HttpStatusCode.INTERNAL_SERVER_ERROR:
              console.warn('ServerError!')
              break
            default:
              console.warn('yoquese')
          }
        }
      })

    // Example 3 - Declarative version with Result.fold()
    // Notice that this version FORCES you to handle the error callback
    result.fold(
      (articleList) => console.log(articleList),
      (error) => console.warn(error)
    )
  }
}
