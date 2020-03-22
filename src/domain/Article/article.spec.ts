import { createArticle } from './article'
import { mockArticles } from './article.mock'

describe('createArticle', () => {
  test('fails on too short body', () => {
    const tooShortBody = 'lorem ipsum'

    expect(() => {
      createArticle({
        ...mockArticles()[0],
        body: tooShortBody
      })
    }).toThrow()
  })
})
