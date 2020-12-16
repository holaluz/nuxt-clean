import { render, fireEvent, waitFor } from '@ui/utils/nuxt-clean-test-utils'
import resetPassword from './index.vue'

jest.useFakeTimers()

describe('Reset password page', () => {
  test.each`
    inputValue       | errorName      | displayedError
    ${'1'}           | ${'minLength'} | ${'The field should have at least 8 characters'}
    ${''}            | ${'required'}  | ${'The field is required'}
    ${'12345678910'} | ${'maxLength'} | ${'The field cannot have more than 10 characters'}
  `(
    `displays $errorName error when it should`,
    async ({ inputValue, displayedError }) => {
      const { getByLabelText, findByText, getByText } = render(resetPassword)

      await fireEvent.update(getByLabelText('Password'), inputValue)

      expect(await findByText(displayedError)).toBeInTheDocument()
      // expect(getByText(/Reset Password/i)).toBeDisabled()
    }
  )

  test.only('does not allow to submit form if empty', async () => {
    const { debug, getByText } = render(resetPassword)

    debug()

    jest.runAllTimers()

    await waitFor(() => expect(getByText(/Reset Password/i)).toBeDisabled())
  })

  test('displays confirmed error when it should', async () => {
    const { getByLabelText, findByText, debug, getByText } = render(
      resetPassword
    )

    await fireEvent.update(getByLabelText('Repeat password'), '2')

    expect(
      await findByText(/Required fields do not match/i)
    ).toBeInTheDocument()
    debug()
    expect(getByText(/Reset Password/i)).toBeDisabled()
  })

  test('submit button is enabled when form is correct', async () => {
    const { getByLabelText, getByText } = render(resetPassword)

    await fireEvent.update(getByLabelText('Password'), '123455678')
    await fireEvent.update(getByLabelText('Repeat password'), '123455678')

    expect(getByText(/Reset Password/i)).not.toBeDisabled()
  })
})
