import { AsyncResult } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/http/HttpError'
import { ParseError } from './ParseError'

export type HttpResult<T> = AsyncResult<T, HttpError | ParseError>
