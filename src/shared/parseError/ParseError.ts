export class ParseError extends Error {
  private values?: Record<string, unknown>

  private constructor(error: Error, values?: Record<string, unknown>) {
    super(error.message)

    Object.setPrototypeOf(this, ParseError.prototype)
    this.values = values
  }

  public static fromError(error: Error) {
    return new this(error)
  }

  public static fromUIValidation(validationName = '', validationValues = {}) {
    return new this(new Error(validationName), validationValues)
  }

  public getValues() {
    return this.values
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
