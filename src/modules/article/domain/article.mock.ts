import { Article, EditingArticle } from './article.types'

export const mockArticle = (): Article => ({
  title: 'lorem ipsum',
  slug: 'lorem-ipsum',
  body: 'lorem ipsum',
  createdAt: new Date(2009, 3, 4),
  favorited: false,
})

export const mockArticles = (): Article[] => [
  {
    title: 'lorem ipsum',
    slug: 'lorem-ipsum',
    body: 'lorem ipsum',
    createdAt: new Date(2009, 3, 4),
    favorited: false,
  },
  {
    title: 'dolor sit amet',
    slug: 'dolor-sit-amet',
    body: 'dolor sit amet',
    createdAt: new Date(2019, 8, 9),
    favorited: true,
  },
]

export const mockEditingArticle = (): EditingArticle => ({
  title: 'lorem ipsum',
  slug: 'lorem-ipsum',
  body: 'lorem ipsum',
  createdAt: new Date(),
})
