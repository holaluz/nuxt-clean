import { createPassword, IPasswordRepository } from '@modules/password/domain'
import { HttpError, isHttpError } from '@shared/http/HttpError'
import { ParseError } from '@shared/parseError'

type Parameters = {
  password: string
}

type Services = {
  passwordService: IPasswordRepository
}

type Callbacks = {
  onSuccess: () => void
  onParseError: (e: ParseError) => void
  onClientError: (e: HttpError) => void
  onServerError: (e: HttpError) => void
  onGenericError: (e: Error) => void
}

export function resetPassword({
  passwordService,
}: Services): AsyncUseCase<Parameters, Callbacks> {
  return { execute }

  async function execute(
    { password }: Parameters,
    {
      onSuccess,
      onParseError,
      onClientError,
      onServerError,
      onGenericError,
    }: Callbacks
  ) {
    const passwordResult = createPassword(password)

    if (passwordResult.isErr()) {
      onParseError(passwordResult.error)
      return
    }

    const result = await passwordService.resetPassword(passwordResult.value)

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
