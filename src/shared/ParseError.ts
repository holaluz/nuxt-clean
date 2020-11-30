export class ParseError extends Error {
  private constructor(error: Error) {
    super(error.message)

    Object.setPrototypeOf(this, ParseError.prototype)
  }

  public static fromError(error: Error) {
    return new this(error)
  }
}
