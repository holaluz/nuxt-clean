import { createPassword } from './password.types'

export const mockValidPassword = createPassword('12345678')
export const mockInvalidPassword = createPassword('')
