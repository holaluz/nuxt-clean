import { ok } from '@@/src/shared/result'
import { IPasswordRepository, Password } from '@modules/password/domain'
import { HttpResult } from '@shared/http/HttpResult'
import { IHttpService } from '@shared/http/HttpService'

export function PasswordService(
  httpService: IHttpService
): IPasswordRepository {
  return {
    resetPassword,
  }

  async function resetPassword(password: Password): HttpResult<string> {
    const result = await httpService.post<string, string>(
      {
        url: '/posts',
        data: password,
      },
      {
        parseTo: (_password: string) => ok(_password),
      }
    )

    return result
  }
}
