import { AsyncResult } from '@shared/result'
import { HttpError } from '@shared/http/HttpError'
import { ParseError } from './ParseError'

export type HttpResult<T> = AsyncResult<T, HttpError | ParseError>
