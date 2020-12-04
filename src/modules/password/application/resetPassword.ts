import { createPassword, IPasswordRepository } from '@modules/password/domain'
import { HttpError, isHttpError } from '@shared/http/HttpError'
import { ParseError } from '@shared/ParseError'

type Parameters = {
  password: string
}

type Services = {
  passwordService: IPasswordRepository
}

type Callbacks = {
  respondWithSuccess: () => void
  respondWithParseError: (e: ParseError[]) => void
  respondWithClientError: (e: HttpError) => void
  respondWithServerError: (e: HttpError) => void
  respondWithGenericError: (e: Error) => void
}

export function resetPassword({
  passwordService,
}: Services): AsyncUseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { password }: Parameters,
    {
      respondWithSuccess,
      respondWithParseError,
      respondWithClientError,
      respondWithServerError,
      respondWithGenericError,
    }: Callbacks
  ) {
    const passwordResult = createPassword(password)

    if (passwordResult.isErr()) {
      respondWithParseError(passwordResult.error)
      return
    }

    const result = await passwordService.resetPassword(passwordResult.value)

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
