export type ArticleSlug = string

export type Article = {
  title: string
  description: string
  slug: ArticleSlug
  body: string
  createdAt: Date | string
  favorited: boolean
}

export type EditingArticle = {
  title: string
  description: string
  slug?: ArticleSlug
  body: string
}
