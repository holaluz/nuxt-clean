import { AsyncResult } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/HttpError'

export type HttpResult<T> = AsyncResult<T, HttpError | Error>
