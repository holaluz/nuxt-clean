import { AsyncResult } from '@shared/result'
import { HttpError } from '@shared/http/HttpError'
import { ParseError } from '@shared/parseError'

export type HttpResult<T> = AsyncResult<T, HttpError | ParseError>
