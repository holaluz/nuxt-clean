import { Result } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/HttpError'

export type HttpResult<T> = Result<T, HttpError | Error>
