/* eslint-disable no-console */
import {
  EditingArticle,
  IArticleRepository,
} from '@@/src/modules/article/domain'
import { HttpError, isHttpError } from '@@/src/shared/http/HttpError'

type Parameters = {
  editingArticle: EditingArticle
}

type Services = {
  articleService: IArticleRepository
}

type Callbacks = {
  respondWithSuccess: () => void
  respondWithClientError: (e: HttpError) => void
  respondWithServerError: (e: HttpError) => void
  respondWithGenericError: (e: Error) => void
}

export function createArticle({
  articleService,
}: Services): UseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { editingArticle }: Parameters,
    {
      respondWithSuccess,
      respondWithClientError,
      respondWithServerError,
      respondWithGenericError,
    }: Callbacks
  ) {
    const result = await articleService.createArticle({
      ...editingArticle,
      createdAt: new Date(),
    })

    if (result.isErr()) {
      const error = result.error

      if (!isHttpError(error)) {
        respondWithGenericError(error)
        return
      }

      if (error.isClientError()) {
        respondWithClientError(error)
        return
      }

      respondWithServerError(error)
      return
    }

    respondWithSuccess()
  }
}
