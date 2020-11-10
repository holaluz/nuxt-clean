import { ok, err, Ok, Err, Result } from './Result'

describe('Result.Ok', () => {
  test('creates an Ok value', () => {
    const okVal = ok(12)

    expect(okVal.isOk()).toBe(true)
    expect(okVal.isErr()).toBe(false)
    expect(okVal).toBeInstanceOf(Ok)
  })

  test('creates an Ok value with null', () => {
    const okVal = ok(null)

    expect(okVal.isOk()).toBe(true)
    expect(okVal.isErr()).toBe(false)
  })

  test('creates an Ok value with undefined', () => {
    const okVal = ok(undefined)

    expect(okVal.isOk()).toBe(true)
    expect(okVal.isErr()).toBe(false)
  })

  test('maps over an Ok value', () => {
    const okVal = ok(12)
    const mapFn = jest.fn((number) => number.toString())

    const mapped = okVal.map(mapFn)

    expect(mapped.isOk()).toBe(true)
    expect(mapFn).toHaveBeenCalledTimes(1)
    expect(mapFn).toHaveBeenCalledWith(12)
  })

  test('skips `mapErr`', () => {
    const mapErrorFunc = jest.fn((_error) => 'mapped error value')

    const notMapped = ok(12).mapErr(mapErrorFunc)

    expect(notMapped.isOk()).toBe(true)
    expect(mapErrorFunc).not.toHaveBeenCalled()
  })

  test('matches on an Ok', () => {
    const okMapper = jest.fn((_val) => 'weeeeee')
    const errMapper = jest.fn((_val) => 'wooooo')

    const matched = ok(12).match(okMapper, errMapper)

    expect(matched).toBe('weeeeee')
    expect(okMapper).toHaveBeenCalledTimes(1)
    expect(okMapper).toHaveBeenCalledWith(12)
    expect(errMapper).not.toHaveBeenCalled()
  })

  test('can read the value after narrowing', () => {
    const fallible: () => Result<string, number> = () => ok('safe to read')
    const val = fallible()

    // After this check we val is narrowed to Ok<string, number>. Without this
    // line TypeScript will not allow accessing val.value.
    if (val.isErr()) return

    expect(val.value).toBe('safe to read')
  })
})

describe('Result.Err', () => {
  test('creates an Err value', () => {
    const errVal = err('errored value')

    expect(errVal.isOk()).toBe(false)
    expect(errVal.isErr()).toBe(true)
    expect(errVal).toBeInstanceOf(Err)
  })

  test('skips `map`', () => {
    const errVal = err('errored value')

    const mapper = jest.fn((_value) => 'noooo')

    const hopefullyNotMapped = errVal.map(mapper)

    expect(hopefullyNotMapped.isErr()).toBe(true)
    expect(mapper).not.toHaveBeenCalled()
  })

  test('maps over an Err', () => {
    const errVal = err('errored value')

    const mapper = jest.fn((error: string) => error.replace('1', '2'))

    const mapped = errVal.mapErr(mapper)

    expect(mapped.isErr()).toBe(true)
    expect(mapper).toHaveBeenCalledTimes(1)
    expect(mapper).toHaveBeenCalledWith('errored value')
  })

  test('matches on an Err', () => {
    const okMapper = jest.fn((_val) => 'weeeeee')
    const errMapper = jest.fn((_val) => 'wooooo')

    const matched = err(12).match(okMapper, errMapper)

    expect(matched).toBe('wooooo')
    expect(okMapper).not.toHaveBeenCalled()
    expect(errMapper).toHaveBeenCalledTimes(1)
    expect(errMapper).toHaveBeenCalledWith(12)
  })
})
