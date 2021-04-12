import { collectParseErrors, ParseError } from './'

const parsedError = ParseError.fromError(new Error('error'))

const passingValidation = () => undefined // a passing validation does not return
const failingValidation = () => parsedError

describe('collectParseErrors', () => {
  test('returns no errors if no validations are passed', () => {
    const collectedErrors = collectParseErrors([], 'irrelevantValue')
    expect(collectedErrors.getErrors()).toHaveLength(0)
  })

  test('returns no error if validation does pass', () => {
    const collectedErrors = collectParseErrors(
      [passingValidation],
      'irrelevantValue'
    )
    expect(collectedErrors.getErrors()).toHaveLength(0)
  })

  test('returns error if validation does fail', () => {
    const collectedErrors = collectParseErrors(
      [failingValidation],
      'irrelevantValue'
    )

    expect(collectedErrors.getErrors()).toHaveLength(1)
    expect(collectedErrors.getErrors()[0]).toBeInstanceOf(Error)
  })

  test('returns expected errors when some validations fail', () => {
    const collectedErrors = collectParseErrors(
      [passingValidation, failingValidation, failingValidation],
      'irrelevantValue'
    )

    expect(collectedErrors.getErrors()).toHaveLength(2)
    expect(collectedErrors.getErrors()[0]).toBeInstanceOf(Error)
    expect(collectedErrors.getErrors()[1]).toBeInstanceOf(Error)
  })
})
