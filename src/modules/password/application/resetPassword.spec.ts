import { HttpError } from '@@/src/shared/http/HttpError'
import { ok, err } from '@@/src/shared/result'
import { resetPassword as makeResetpassword } from './resetPassword'

const passwordService = {
  resetPassword: jest.fn(),
}

const useCase = makeResetpassword({
  passwordService,
})

const useCaseCallbacks = {
  onSuccess: jest.fn(),
  onParseError: jest.fn(),
  onClientError: jest.fn(),
  onServerError: jest.fn(),
  onGenericError: jest.fn(),
}

describe('Reset Password use case', () => {
  describe('invalid password string is passed as entry param', () => {
    const password = '1234567'
    test('onParseError callback is triggered when cannot create password', () => {
      useCase.execute({ password }, useCaseCallbacks)

      expect(useCaseCallbacks.onParseError).toHaveBeenCalledTimes(1)
      expect(passwordService.resetPassword).not.toHaveBeenCalled()
    })
  })

  describe('valid password string is passed as entry param', () => {
    const password = '12345678'
    test('onSuccess callback is triggered when everything goes right', async () => {
      passwordService.resetPassword.mockResolvedValue(ok(password))
      await useCase.execute({ password }, useCaseCallbacks)

      expect(passwordService.resetPassword).toHaveBeenCalledTimes(1)
      expect(useCaseCallbacks.onSuccess).toHaveBeenCalledTimes(1)
    })

    test('onClientError callback is trigger when client error', async () => {
      const clientError = new HttpError(404, 'irrelevant')
      passwordService.resetPassword.mockResolvedValue(err(clientError))
      await useCase.execute({ password }, useCaseCallbacks)

      expect(passwordService.resetPassword).toHaveBeenCalledTimes(1)
      expect(useCaseCallbacks.onClientError).toHaveBeenCalledTimes(1)
      expect(useCaseCallbacks.onClientError).toHaveBeenCalledWith(clientError)
    })
  })
})
