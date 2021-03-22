import { Result, err, ok } from '@shared/result'
import { Nominal } from '@@/src/shared/Nominal'
import { ParseError, collectParseErrors } from '@shared/parseError'

export type Password = Nominal<string, 'Password'>

enum PasswordErrors {
  minLength = 'minLength',
  maxLength = 'maxLength',
}

export const passwordMinLength = 8
export const passwordMaxLength = 10

function validateLength(s: string) {
  if (s.length < passwordMinLength) {
    return ParseError.fromString(PasswordErrors.minLength)
  }

  if (s.length > passwordMaxLength) {
    return ParseError.fromString(PasswordErrors.maxLength)
  }
}

export function createPassword(password: string): Result<Password, ParseError> {
  const maybeErrors = collectParseErrors([validateLength], password)

  if (maybeErrors.hasErrors()) {
    return err(maybeErrors)
  }

  return ok(password as Password)
}
