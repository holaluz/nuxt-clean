/*
warning: take this with a grain of salt!! types should be more
"complete" or "explicit", if you will, instead of using so many
primitive values. With current implementation, for instance, you
can easily mix title, body and slug, because they share structure.
*/

import { err, ok, Result } from '@shared/Result'

export type ArticleSlug = string
export type ArticleTitle = string

export type Article = {
  title: ArticleTitle
  slug: ArticleSlug
  body: string
  createdAt: Date
  favorited: boolean
}

export type EditingArticle = {
  title: string
  slug?: ArticleSlug
  body: string
  createdAt: Date
}

export function createArticleTitle(
  title: string
): Result<ArticleTitle, string> {
  if (title && title.length >= 10) {
    return ok(title)
  }
  return err('invalid title')
}
