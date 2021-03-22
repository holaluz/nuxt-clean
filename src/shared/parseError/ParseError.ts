export class ParseError extends Error {
  private errors: Error[]

  private constructor(error: Error, errors?: Error[]) {
    super(error.message)

    Object.setPrototypeOf(this, ParseError.prototype)
    this.errors = errors || []
  }

  public static fromString(errorMessage: string) {
    const error = new Error(errorMessage)
    return new this(error, [error])
  }

  public static fromError(error: Error) {
    return new this(error, [error])
  }

  // TODO: what about the "name" (that is, the first parameter)?
  public static fromErrorList(list: Error[]) {
    return new this(new Error('ParseError'), list)
  }

  public getErrors(): Error[] {
    return this.errors || []
  }

  public hasErrors(): boolean {
    return !!this.errors.length
  }
}

type Validator<T> = (val: T) => ParseError | undefined

export const collectParseErrors = <T>(
  validators: Validator<T>[],
  val: T
): ParseError => {
  const errors = validators.reduce(
    (errors: Error[], validator: Validator<T>) => {
      const maybeError = validator(val)
      if (maybeError) {
        return [...errors, ...maybeError.getErrors()]
      }
      return errors
    },
    [] as Error[]
  )

  return ParseError.fromErrorList(errors)
}
