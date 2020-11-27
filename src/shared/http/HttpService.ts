import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios'
import { err, Result } from '@@/src/shared/Result'
import { HttpError } from '@@/src/shared/http/HttpError'
import { HttpResult } from '@@/src/shared/http/HttpResult'
import { ParseError } from '@@/src/shared/http/ParseError'

type IHttpRequest = {
  url: string
  config?: AxiosRequestConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

type FailableParser<T, M> = (_: T) => Result<M, ParseError>
type Parser<T, M> = (_: T) => M

type GetParser<T, M> = {
  parseTo: FailableParser<T, M>
}

type PostParser<T, M> = GetParser<T, M> & { parseFrom: Parser<M, T> }

export interface IHttpService {
  get<T, M>(request: IHttpRequest, parser: GetParser<T, M>): HttpResult<M>
  post<T, M>(request: IHttpRequest, parser: PostParser<T, M>): HttpResult<M>
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
    parser: GetParser<T, M>
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
    parser: PostParser<T, M>
  ): HttpResult<M> {
    try {
      const requestData = data ? parser.parseFrom(data) : {}

      const response = await this.axiosService.post<T>(url, requestData, config)
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
