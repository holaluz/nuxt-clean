import { Article } from './article.types'

const MINIMUM_BODY_LENGTH = 100

export const createArticle = (rawArticle: Article): Article => {
  if (rawArticle.body.length < MINIMUM_BODY_LENGTH) {
    throw new Error(
      `Article must contain at least ${MINIMUM_BODY_LENGTH} chars`
    )
  }

  return rawArticle
}
