import { render } from '@ui/utils/nuxt-clean-test-utils'
import AddArticleForm from '@ui/components/AddArticleForm.vue'

test('make sure testing UI env works', () => {
  const { getByLabelText } = render(AddArticleForm)

  expect(getByLabelText('Title')).toBeInTheDocument()
})
