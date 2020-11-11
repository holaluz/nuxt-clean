import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios'
import { ApiResult } from '../shared/ApiResponse'
import { HttpError } from '../shared/HttpError'
import { err, ok } from '../shared/Result'

export interface Data {
  [key: string]: unknown
}

type IRequestWithoutData = {
  url: string
  config?: AxiosRequestConfig
}

type IRequestWithData = IRequestWithoutData & { data?: Data }

export interface IApiService {
  get<T>(request: IRequestWithoutData): Promise<ApiResult<T>>
  post<T>(request: IRequestWithData): Promise<ApiResult<T>>
}

export class ApiService implements IApiService {
  protected readonly axiosService: AxiosInstance

  constructor(baseUrl: string) {
    this.axiosService = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    })

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  public async get<T>({
    url,
    config,
  }: IRequestWithoutData): Promise<ApiResult<T>> {
    try {
      const response = await this.axiosService.get<T>(url, config)
      return ok(response.data)
    } catch (error) {
      return err(error)
    }
  }

  public async post<T>({
    url,
    data,
    config,
  }: IRequestWithData): Promise<ApiResult<T>> {
    try {
      const response = await this.axiosService.post(url, data, config)
      return ok(response.data)
    } catch (error) {
      return err(error)
    }
  }

  private _initializeRequestInterceptor = () => {
    this.axiosService.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _initializeResponseInterceptor = () => {
    this.axiosService.interceptors.response.use(
      (response: AxiosResponse) => response,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    // get this from a cookie, or whatever
    config.headers.Authorization = 'Bearer ...'

    return config
  }

  private _handleError = (error: AxiosError): HttpError => {
    if (error.response) {
      return HttpError.fromStatus(error.response.status, error.message)
    }

    throw error
  }
}
