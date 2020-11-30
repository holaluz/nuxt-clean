import { ArticleSlug } from '@modules/article/domain'

test('just asserting imports work fine in Jest env', () => {
  const slug: ArticleSlug = 'asd'
  expect(slug).toStrictEqual('asd')
})
