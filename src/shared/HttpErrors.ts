import { HttpStatusCode } from './HttpStatusCode'

export interface IHttpError {
  status: number
  name: string
  message: string
  stack?: string
}

export class HttpError extends Error implements IHttpError {
  public status!: number

  constructor(status: number, message?: string) {
    super(message)
    this.name = HttpStatusCode[status]
    this.message = message || HttpStatusCode[status]
    Object.setPrototypeOf(this, HttpError.prototype)

    this.status = status
  }

  public isClientError(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.status! >= 400 && this.status! <= 499
  }

  public isServerError(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.status! >= 500 && this.status! <= 599
  }

  public static fromStatus(status: number, message?: string) {
    return new this(status, message)
  }
}

export const isHttpError = (e: Error): e is HttpError => {
  return Number.isInteger((e as HttpError).status)
}
