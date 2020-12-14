import { render, fireEvent } from '@ui/utils/nuxt-clean-test-utils'
import resetPassword from './index.vue'

describe('Reset password page', () => {
  test('asserts dom properly', () => {
    const { getByLabelText } = render(resetPassword)

    expect(getByLabelText(/Password/i)).toBeInTheDocument()
  })

  test('displays password errors when it should', async () => {
    const { getByLabelText, findByText } = render(resetPassword)

    await fireEvent.update(getByLabelText(/Password/i), '1')

    expect(
      await findByText(/The field should have at least 8 characters/i)
    ).toBeInTheDocument()
  })
})
