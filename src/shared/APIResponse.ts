import { IHttpError } from './HttpErrors'
import { Result } from './Result'

export type ApiResult<T> = Result<T, IHttpError | Error>
