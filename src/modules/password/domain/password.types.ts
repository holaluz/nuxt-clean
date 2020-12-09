import { Result, err, ok } from '@shared/result'
import { Nominal } from '@@/src/shared/Nominal'
import { ParseError, collectParseErrors } from '@shared/parseError'

enum PasswordErrors {
  minLength = 'minLength',
  maxLength = 'maxLength',
  noNumb = 'noNumb',
}

export type Password = Nominal<string, 'Password'>

const validateMinLength = (s: string): ParseError | null =>
  s.length < 8
    ? ParseError.fromError(new Error(PasswordErrors.minLength))
    : null

const validateMaxLength = (s: string): ParseError | null =>
  s.length > 10
    ? ParseError.fromError(new Error(PasswordErrors.maxLength))
    : null

const validateContainsNumb = (s: string): ParseError | null =>
  !s.match(/.*\d.*/)
    ? ParseError.fromError(new Error(PasswordErrors.noNumb))
    : null

export function createPassword(
  password: string
): Result<Password, ParseError[]> {
  const collectedErrors = collectParseErrors(
    [validateMinLength, validateMaxLength, validateContainsNumb],
    password
  )

  return collectedErrors.length
    ? err(collectedErrors)
    : ok(password as Password)
}
