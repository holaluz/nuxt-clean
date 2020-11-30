import { AsyncResult } from '@shared/Result'
import { HttpError } from '@shared/http/HttpError'
import { ParseError } from './ParseError'

export type HttpResult<T> = AsyncResult<T, HttpError | ParseError>
