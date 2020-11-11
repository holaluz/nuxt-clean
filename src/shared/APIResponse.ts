import { HttpError } from './HttpError'
import { Result } from './Result'

export type ApiResult<T> = Result<T, HttpError | Error>
