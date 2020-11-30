import { ParseError } from '@shared/ParseError'

type Validator<T> = (val: T) => ParseError | null

export const collectErrors = <T>(
  validators: Validator<T>[],
  val: T
): ParseError[] =>
  validators.reduce((errors: ParseError[], validator: Validator<T>) => {
    const maybeError = validator(val)
    if (maybeError) {
      return [...errors, maybeError]
    }
    return errors
  }, [])
