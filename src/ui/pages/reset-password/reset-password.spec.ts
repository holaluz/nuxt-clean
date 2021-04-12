import { render, fireEvent, waitFor } from '@ui/utils/nuxt-clean-test-utils'
import userEvent from '@testing-library/user-event'
import resetPassword from './index.vue'

beforeEach(() => jest.useFakeTimers())

describe('Reset password page', () => {
  test.each`
    inputValue       | errorName      | displayedError
    ${'1'}           | ${'minLength'} | ${'The field is too short'}
    ${'12345678910'} | ${'maxLength'} | ${'The field is too long'}
  `(
    `displays $errorName error when password value is '$inputValue'`,
    async ({ inputValue, displayedError }) => {
      const { getByLabelText, findByText, getByRole } = render(resetPassword)

      await fireEvent.update(getByLabelText('Password'), inputValue)
      await fireEvent.update(getByLabelText('Repeat password'), inputValue)

      expect(await findByText(displayedError)).toBeInTheDocument()
      expect(getByRole('button', { name: /Reset Password/i })).toBeDisabled()
    }
  )

  test('does not allow to submit form if empty', async () => {
    const { getByText, getByRole, getByLabelText } = render(resetPassword)

    await waitFor(() =>
      expect(getByRole('button', { name: /Reset Password/i })).toBeDisabled()
    )

    await fireEvent.touch(getByLabelText('Password'))
    await fireEvent.touch(getByLabelText('Repeat password'))

    expect(getByText('The field is required')).toBeInTheDocument()
  })

  test('submit button is enabled when form is correct', () => {
    const { debug, getByLabelText, getByRole } = render(resetPassword)

    userEvent.type(getByLabelText('Password'), '123455678')
    userEvent.type(getByLabelText('Repeat password'), '123455678')

    expect(getByRole('button', { name: /Reset Password/i })).not.toBeDisabled()
  })
})
