/* eslint-disable no-console */
import { EditingArticle, IArticleRepository } from '@modules/article/domain'
import { HttpError, isHttpError } from '@shared/http/HttpError'

type Parameters = {
  editingArticle: EditingArticle
}

type Services = {
  articleService: IArticleRepository
}

type Callbacks = {
  onSuccess: () => void
  onClientError: (e: HttpError) => void
  onServerError: (e: HttpError) => void
  onGenericError: (e: Error) => void
}

export function createArticle({
  articleService,
}: Services): AsyncUseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { editingArticle }: Parameters,
    { onSuccess, onClientError, onServerError, onGenericError }: Callbacks
  ) {
    const result = await articleService.createArticle({
      ...editingArticle,
      createdAt: new Date(), // Business logic requires that a new article must have a created date
    })

    if (result.isErr()) {
      const error = result.error

      if (!isHttpError(error)) {
        onGenericError(error)
        return
      }

      if (error.isClientError()) {
        onClientError(error)
        return
      }

      onServerError(error)
      return
    }

    onSuccess()
  }
}
