import { IPasswordRepository, Password } from '@modules/password/domain'
import { HttpResult } from '@shared/http/HttpResult'
import { IHttpService } from '@shared/http/HttpService'

export function PasswordService(
  httpService: IHttpService
): IPasswordRepository {
  return {
    resetPassword,
  }

  async function resetPassword(password: Password): HttpResult<void> {
    const result = await httpService.post<string, void>(
      {
        url: '/posts',
        data: password,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        parseTo: () => {},
      }
    )

    return result
  }
}
