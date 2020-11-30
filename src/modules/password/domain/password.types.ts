import { Result, err, ok } from '@shared/result'
import { collectErrors } from '@shared/collectErrors'
import { Nominal } from '@@/src/shared/Nominal'
import { ParseError } from '@shared/ParseError'

enum PasswordErrors {
  minLength = 'minLength',
  maxLength = 'maxLength',
}

type Password = Nominal<string, 'Password'>

const validateMinLength = (s: string): ParseError | null =>
  s.length <= 8
    ? ParseError.fromError(new Error(PasswordErrors.minLength))
    : null

const validateMaxLength = (s: string): ParseError | null =>
  s.length > 10
    ? ParseError.fromError(new Error(PasswordErrors.maxLength))
    : null

export function createPassword(
  password: string
): Result<Password, ParseError[]> {
  const combined = collectErrors(
    [validateMinLength, validateMaxLength],
    password
  )

  return combined.length ? err(combined) : ok(password as Password)
}
