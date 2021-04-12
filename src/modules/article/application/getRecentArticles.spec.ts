import { HttpError } from '@shared/http/HttpError'
import { rest } from 'msw'
import { HttpService } from '@@/src/shared/http/HttpService'
import { mockServer } from '@@/src/shared/mockService'
import { ArticleService as makeArticleService } from '../infrastructure/ArticleService'
import { ArticleServiceMock } from '../infrastructure/ArticleService.mock'
import { mockArticles } from '../domain'
import { getRecentArticles as makeGetRecentArticles } from './getRecentArticles'

const mockHttpService = new HttpService('irrelevant')
const articleService = makeArticleService(mockHttpService)
const useCase = makeGetRecentArticles({ articleService })

const server = mockServer(...ArticleServiceMock)

const useCaseCallbacks = {
  respondWithSuccess: jest.fn(),
  respondWithClientError: jest.fn(),
  respondWithServerError: jest.fn(),
}

test('getRecentArticles method is called', async () => {
  const spiedMethod = jest.spyOn(articleService, 'getRecentArticles')
  await useCase.execute(null, useCaseCallbacks)

  expect(articleService.getRecentArticles).toHaveBeenCalledTimes(1)
  spiedMethod.mockRestore()
})

test('responds with success', async () => {
  await useCase.execute(null, useCaseCallbacks)

  expect(useCaseCallbacks.respondWithSuccess).toHaveBeenCalledTimes(1)
  expect(useCaseCallbacks.respondWithSuccess).toHaveBeenCalledWith(
    mockArticles()
  )
})

test.skip('responds with server error', async () => {
  const serverError = new HttpError(500, 'irrelevant')
  server.use(
    rest.get(/\/get-recent-articles/, (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  await useCase.execute(null, useCaseCallbacks)

  expect(useCaseCallbacks.respondWithSuccess).not.toHaveBeenCalled()
  expect(useCaseCallbacks.respondWithServerError).toHaveBeenCalledTimes(1)
  // expect(useCaseCallbacks.respondWithServerError).toHaveBeenCalledWith(
  //   serverError
  // )
})
