import { User } from '@domain/User'
import { Article, ArticleRepository } from '@domain/Article'

type Parameters = {
  editingArticle: Article
  user: User
}

type Callbacks = {
  respondWithSuccess(article: Article): void
  respondWithError(error: Error): void
  respondWithApiError(error: Error): void
  respondWithInvalidParam(error: Error): void
}

type Repositories = {
  articleRepository: ArticleRepository
}

function createArticle({
  articleRepository,
}: Repositories): UseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { editingArticle, user }: Parameters,
    {
      respondWithSuccess,
      respondWithError,
      respondWithApiError,
      respondWithInvalidParam,
    }: Callbacks
  ) {
    try {
      const article = await articleRepository.add(editingArticle, user)

      respondWithSuccess(article)
    } catch (error) {
      // if (error instanceof UserError) {
      //   respondWithInvalidParam(error.message)
      //   return
      // }
      // if (error instanceof ApiError) {
      //   respondWithApiError(error)
      //   return
      // }
      respondWithInvalidParam(error.message)
      respondWithApiError(error)

      respondWithError(error)
    }
  }
}

export { createArticle }
