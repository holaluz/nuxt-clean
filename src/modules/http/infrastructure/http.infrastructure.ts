import { HttpError } from '../domain/HttpError.model'
import { ParseError } from '../domain/ParseError.model'

export class HttpInfrastructure {
  // eslint-disable-next-line no-useless-constructor
  constructor(private baseUrl: string) {}

  get<T, M>(path: string, parser: (dto: T) => M) {
    return fetch(this.baseUrl + path)
      .then((response) => {
        if (response.ok) return response.json() as Promise<T>
        // Use "errorable" wrapper instead of exceptions
        throw new HttpError(response.statusText)
      })
      .then((dto) => {
        try {
          return parser(dto)
        } catch (e) {
          // Use "errorable" wrapper instead of exceptions
          throw new ParseError(e)
        }
      })
  }
}
