import { Result, err, ok } from '@shared/result'
import { Nominal } from '@@/src/shared/Nominal'
import { ParseError, collectParseErrors } from '@shared/parseError'

enum PasswordErrors {
  minLength = 'minLength',
  maxLength = 'maxLength',
}

export type Password = Nominal<string, 'Password'>

const passwordMinLength = 8
const passwordMaxLength = 10

const validateMinLength = (s: string): ParseError | null =>
  s.length < passwordMinLength
    ? ParseError.fromUIValidation(PasswordErrors.minLength, {
        [PasswordErrors.minLength]: passwordMinLength,
      })
    : null

const validateMaxLength = (s: string): ParseError | null =>
  s.length > passwordMaxLength
    ? ParseError.fromUIValidation(PasswordErrors.maxLength, {
        [PasswordErrors.maxLength]: passwordMaxLength,
      })
    : null

export function createPassword(
  password: string
): Result<Password, ParseError[]> {
  const collectedErrors = collectParseErrors(
    [validateMinLength, validateMaxLength],
    password
  )

  return collectedErrors.length
    ? err(collectedErrors)
    : ok(password as Password)
}
