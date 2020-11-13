export type ArticleDTO = {
  slug: string
  title: string
  createdAt: string | Date
  body: string
  excerpt: string
  isFavorited: boolean
}
