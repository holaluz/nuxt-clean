import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios'
import { err, ok } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/http/HttpError'
import { HttpResult } from '@@/src/shared/http/HttpResult'

type Data = {
  [key: string]: unknown
}

type IHttpRequest = {
  url: string
  config?: Data
  data?: Data
}

export interface IHttpService {
  get<T>(request: IHttpRequest): HttpResult<T>
  post<T>(request: IHttpRequest): HttpResult<T>
}

export class HttpService implements IHttpService {
  private readonly axiosService: AxiosInstance

  constructor(baseUrl: string) {
    this.axiosService = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    })

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  public async get<T>({ url, config }: IHttpRequest): HttpResult<T> {
    try {
      const response = await this.axiosService.get<T>(url, config)
      return ok(response.data)
    } catch (error) {
      return err(error)
    }
  }

  public async post<T>({ url, data, config }: IHttpRequest): HttpResult<T> {
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
