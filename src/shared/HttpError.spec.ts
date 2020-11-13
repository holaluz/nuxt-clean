import { HttpError, isHttpError } from './HttpError'

describe('HttpError', () => {
  test('creates an HTTP error', () => {
    const input = new HttpError(404, 'message')

    expect(input).toBeInstanceOf(Error)

    expect(input.message).toStrictEqual('message')
    expect(input.name).toStrictEqual('NOT_FOUND')
    expect(input.status).toStrictEqual(404)
  })

  test('sets default message', () => {
    const input = new HttpError(404)

    expect(input.message).toStrictEqual('NOT_FOUND')
  })

  test('identifies client errors', () => {
    const clientError = new HttpError(404, 'message')

    expect(clientError.isClientError()).toBe(true)
    expect(clientError.isServerError()).toBe(false)
  })

  test('identifies server errors', () => {
    const clientError = new HttpError(503, 'message')

    expect(clientError.isServerError()).toBe(true)
    expect(clientError.isClientError()).toBe(false)
  })
})

describe('isHttpError', () => {
  test('identifies HTTP errors', () => {
    const httpError = new HttpError(400)

    expect(isHttpError(httpError)).toBe(true)
  })

  test('identifies non-HTTP errors', () => {
    const error = new Error()

    expect(isHttpError(error)).toBe(false)
  })
})
