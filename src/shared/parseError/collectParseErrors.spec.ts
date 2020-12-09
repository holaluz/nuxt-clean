import { collectParseErrors, ParseError } from './'

const parsedError = ParseError.fromError(new Error('error'))

const validations = {
  success: () => null,
  error: () => parsedError,
}

describe('collectParseErrors', () => {
  test('returns no errors if no validations are passed', () => {
    const collectedErrors = collectParseErrors([], 'irrelevant')
    expect(collectedErrors).toHaveLength(0)
  })

  test('returns no error if validation does pass', () => {
    const collectedErrors = collectParseErrors(
      [validations.success],
      'irrelevant'
    )
    expect(collectedErrors).toHaveLength(0)
  })

  test('returns error if validation does fail', () => {
    const collectedErrors = collectParseErrors(
      [validations.error],
      'irrelevant'
    )
    expect(collectedErrors).toStrictEqual([parsedError])
  })

  test('returns expected errors when some validations fail', () => {
    const collectedErrors = collectParseErrors(
      [validations.success, validations.error, validations.error],
      'irrelevant'
    )
    expect(collectedErrors).toStrictEqual([parsedError, parsedError])
  })
})
