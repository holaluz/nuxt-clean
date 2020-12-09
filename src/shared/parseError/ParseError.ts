export class ParseError extends Error {
  private constructor(error: Error) {
    super(error.message)

    Object.setPrototypeOf(this, ParseError.prototype)
  }

  public static fromError(error: Error) {
    return new this(error)
  }
}

type Validator<T> = (val: T) => ParseError | null

export const collectParseErrors = <T>(
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
