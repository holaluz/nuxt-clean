/* eslint-disable no-console */
import { EditingArticle, IArticleRepository } from '@domain/Article'
import * as HttpErrors from '@@/src/shared/HttpErrors'
import { IHttpError } from '@@/src/shared/HttpErrors'

type Parameters = {
  editingArticle: EditingArticle
}

type Services = {
  articleService: IArticleRepository
}

type Callbacks = {
  respondWithSuccess: () => void
  respondWithClientError: (e: IHttpError) => void
  respondWithServerError: (e: IHttpError) => void
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

      if (!HttpErrors.isHttpError(error)) {
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
