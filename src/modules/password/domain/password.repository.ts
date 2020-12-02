import { HttpResult } from '@shared/http/HttpResult'
import { Password } from '../domain'

export interface IPasswordRepository {
  resetPassword(password: Password): HttpResult<void>
}
