import { render, fireEvent } from '@ui/utils/test'
import resetPassword from './index.vue'

describe('Reset password page', () => {
  test('asserts dom properly', () => {
    const { getByLabelText } = render(resetPassword)

    expect(getByLabelText(/Password/i)).toBeInTheDocument()
  })

  test('displays password errors when it should', async () => {
    const { getByLabelText, findByText, debug } = render(resetPassword)

    await fireEvent.update(getByLabelText(/Password/i), '1')

    debug()
    expect(await findByText(/minLength/i)).toBeInTheDocument()
  })
})
