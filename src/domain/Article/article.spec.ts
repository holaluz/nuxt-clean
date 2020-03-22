import { createArticle } from './article'
import { mockArticle } from './article.mock'

describe('createArticle', () => {
  test('fails on too short body', () => {
    const tooShortBody = 'lorem ipsum'

    expect(() => {
      createArticle({
        ...mockArticle(),
        body: tooShortBody
      })
    }).toThrow()
  })
})
