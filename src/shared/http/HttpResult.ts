import { AsyncResult } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/http/HttpError'

export type HttpResult<T> = AsyncResult<T, HttpError | Error>
