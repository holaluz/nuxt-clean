import { HttpClient } from '../shared/HttpClient'
import { HttpError, isHttpError } from '../shared/HttpErrors'
import { ApiResult } from '../shared/ApiResponse'
import { err, ok } from '../shared/Result'

export interface Params {
  [key: string]: unknown
}

export interface Data {
  [key: string]: unknown
}

interface IRequestWithoutData {
  url: string
  params?: Params
}

interface IRequestWithData {
  url: string
  params?: Params
  data?: Data
}

export interface IApiService {
  get<T>(request: IRequestWithoutData): Promise<ApiResult<T>>
  post<T>(request: IRequestWithData): Promise<ApiResult<T>>
}

// We'll need to add support for additional config
export class ApiService extends HttpClient implements IApiService {
  public constructor() {
    // This should come from a dotenv
    super('https://httpstat.us')
  }

  public async get<T>(request: IRequestWithoutData): Promise<ApiResult<T>> {
    try {
      const response = await this.httpService.request<T>({
        method: 'GET',
        ...request,
      })

      return ok(response.data)
    } catch (error) {
      return err(this.handleError(error))
    }
  }

  public async post<T>(request: IRequestWithData): Promise<ApiResult<T>> {
    try {
      const response = await this.httpService.request<T>({
        method: 'POST',
        ...request,
      })

      return ok(response.data)
    } catch (error) {
      return err(this.handleError(error))
    }
  }

  private handleError(error: HttpError | Error) {
    if (isHttpError(error)) {
      return error
    }

    // This could happen if the request was made but there was no response,
    // or due to any not-API related error
    throw error
  }
}
