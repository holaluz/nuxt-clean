export type ArticleSlug = string

export type Article = {
  title: string
  slug: ArticleSlug
  body: string
  createdAt: Date | string
  favorited: boolean
}

export type EditingArticle = {
  title: string
  slug?: ArticleSlug
  body: string
  createdAt: Date | string
}
