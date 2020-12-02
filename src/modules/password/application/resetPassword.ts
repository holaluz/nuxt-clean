/* eslint-disable no-console */
import { createPassword, IPasswordRepository } from '@modules/password/domain'
import { HttpError, isHttpError } from '@shared/http/HttpError'

type Parameters = {
  password: string
}

type Services = {
  passwordService: IPasswordRepository
}

type Callbacks = {
  respondWithSuccess: () => void
  respondWithClientError: (e: HttpError) => void
  respondWithServerError: (e: HttpError) => void
  respondWithGenericError: (e: Error) => void
}

export function resetPassword({
  passwordService,
}: Services): UseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { password }: Parameters,
    {
      respondWithSuccess,
      respondWithClientError,
      respondWithServerError,
      respondWithGenericError,
    }: Callbacks
  ) {
    const passwordDomainObject = createPassword(password)
    if (passwordDomainObject.isErr()) {
      console.log(passwordDomainObject.error) // TODO: Respond with parseError
      return
    }

    const value = passwordDomainObject.value

    const result = await passwordService.resetPassword(value)

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
