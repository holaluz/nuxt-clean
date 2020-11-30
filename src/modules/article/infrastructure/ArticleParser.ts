import { Article } from '@modules/article/domain'
import { ParseError } from '@shared/http/ParseError'
import { err, ok, combine, Result } from '@shared/Result'
import { createArticleTitle } from '../domain'

export type IArticleDTO = {
  slug: string
  title: string
  createdAt: string
  body: string
  isFavorited: boolean
}

export function toDomain(dto: IArticleDTO): Result<Article, ParseError> {
  const articleTitle = createArticleTitle(dto.title)

  // imagine we had several Results
  const severalResults = [articleTitle]
  const combinedResults = combine(severalResults)

  // oops! something went wrong when creating domain objects from DTO
  if (combinedResults.isErr()) {
    const error = new Error(combinedResults.error)
    return err(ParseError.fromError(error))
  }

  // everything is ok! Now we can get the valid results back
  const [title] = combinedResults.value

  return ok({
    title,
    slug: dto.slug,
    createdAt: new Date(dto.createdAt),
    body: dto.body,
    favorited: dto.isFavorited,
  })
}

export function fromDomain(dto: Article): IArticleDTO {
  return {
    slug: dto.slug,
    title: dto.title,
    createdAt: dto.createdAt.toISOString(),
    body: dto.body,
    isFavorited: dto.favorited,
  } as IArticleDTO
}
