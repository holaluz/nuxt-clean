import { collectErrors } from './CollectErrors'

const validations = {
  success: jest.fn(() => null),
  error: jest.fn(() => new Error()),
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('collectErrors', () => {
  test('returns no errors if no validations are passed', () => {
    const collectedErrors = collectErrors([], 'irrelevant')
    expect(collectedErrors.length).toBe(0)
  })

  test('returns no error if validation does pass', () => {
    const collectedErrors = collectErrors([validations.success], 'irrelevant')
    expect(validations.success.mock.calls.length).toBe(1)
    expect(collectedErrors.length).toBe(0)
  })

  test('returns error if validation does fail', () => {
    const collectedErrors = collectErrors([validations.error], 'irrelevant')
    expect(validations.error.mock.calls.length).toBe(1)
    expect(collectedErrors.length).toBe(1)
  })

  test('returns expected errors when some validations fail', () => {
    const collectedErrors = collectErrors(
      [validations.success, validations.error, validations.error],
      'irrelevant'
    )
    expect(validations.success.mock.calls.length).toBe(1)
    expect(validations.error.mock.calls.length).toBe(2)
    expect(collectedErrors.length).toBe(2)
  })
})
