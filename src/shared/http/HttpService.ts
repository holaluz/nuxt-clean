import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios'
import { err, Result } from '@shared/result'
import { HttpError } from '@shared/http/HttpError'
import { HttpResult } from '@shared/http/HttpResult'
import { ParseError } from '@shared/ParseError'

type IHttpRequest = {
  url: string
  config?: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

// A FailableParser is just a Parser wrapped in a Result
type FailableParser<T, M> = (_: T) => Result<M, ParseError>

type Parser<T, M> = {
  parseTo: FailableParser<T, M> | (() => void)
}

export interface IHttpService {
  get<T, M>(request: IHttpRequest, parser: Parser<T, M>): HttpResult<M>
  post<T, M>(request: IHttpRequest, parser: Parser<T, M>): HttpResult<M>
}

export class HttpService {
  private readonly axiosService: AxiosInstance

  constructor(baseUrl: string) {
    this.axiosService = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    })

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  public async get<T, M>(
    { url, config }: IHttpRequest,
    parser: Parser<T, M>
  ): HttpResult<M> {
    try {
      const response = await this.axiosService.get<T>(url, config)
      return this._parseFailable<T, M>(response.data, parser.parseTo)
    } catch (error) {
      return err(error)
    }
  }

  public async post<T, M>(
    { url, data, config }: IHttpRequest,
    parser: Parser<T, M>
  ): HttpResult<M> {
    try {
      const response = await this.axiosService.post<T>(url, data, config)
      return this._parseFailable<T, M>(response.data, parser.parseTo)
    } catch (error) {
      return err(error)
    }
  }

  private _parseFailable<T, M>(
    data: T,
    parser: FailableParser<T, M>
  ): Result<M, ParseError> {
    try {
      return parser(data)

      // Exceptions (not errors) could happen when parsing. We capture them and
      // treat them as parsing errors.
    } catch (error) {
      const parseError = ParseError.fromError(error)
      return err(parseError)
    }
  }

  private _initializeRequestInterceptor() {
    this.axiosService.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _initializeResponseInterceptor() {
    this.axiosService.interceptors.response.use(
      (response: AxiosResponse) => response,
      this._handleError
    )
  }

  private _handleRequest(config: AxiosRequestConfig) {
    // get this from a cookie, or whatever
    config.headers.Authorization = 'Bearer ...'

    return config
  }

  private _handleError(error: AxiosError): HttpError {
    if (error.response) {
      return HttpError.fromStatus(error.response.status, error.message)
    }

    // Otherwise resume the chain of error throws
    throw error
  }
}
