import { createPassword } from './'

describe('createPassword', () => {
  test('returns password when object value meets required validations', () => {
    const password = createPassword('12345678')
    expect(password.isOk()).toBe(true)
  })

  test('returns error when object value does not meet required validations', () => {
    const password = createPassword('')
    expect(password.isErr()).toBe(true)
  })
})
