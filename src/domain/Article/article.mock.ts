import { Article } from './article.types'

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
    createdAt: '2020-02-15T09:00:00 +01:00',
    favorited: true,
  },
]
