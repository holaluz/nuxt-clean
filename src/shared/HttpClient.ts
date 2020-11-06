import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
} from 'axios'
import { HttpError } from './HttpErrors'

export abstract class HttpClient {
  protected readonly httpService: AxiosInstance

  public constructor(baseURL: string) {
    this.httpService = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  private _initializeRequestInterceptor = () => {
    this.httpService.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  private _initializeResponseInterceptor = () => {
    this.httpService.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleRequest = (config: AxiosRequestConfig) => {
    // get this from a cookie, or whatever
    config.headers.Authorization = 'Bearer ...'

    return config
  }

  private _handleResponse = (response: AxiosResponse) => response

  private _handleError = (error: AxiosError): void => {
    if (error.response) {
      throw new HttpError(error.response.status, error.message)
    }

    throw error
  }
}
