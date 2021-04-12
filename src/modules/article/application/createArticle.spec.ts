import { rest } from 'msw'
import { HttpError } from '@shared/http/HttpError'
import { HttpService } from '@@/src/shared/http/HttpService'
import { mockServer } from '@@/src/shared/mockService'
import { ArticleService as makeArticleService } from '../infrastructure/ArticleService'
import { ArticleServiceMock } from '../infrastructure/ArticleService.mock'
import { mockEditingArticle } from '../domain'
import { createArticle as makeGetRecentArticles } from './createArticle'

const mockHttpService = new HttpService('irrelevant')
const articleService = makeArticleService(mockHttpService)
const useCase = makeGetRecentArticles({ articleService })

const server = mockServer(...ArticleServiceMock)

const useCaseCallbacks = {
  respondWithSuccess: jest.fn(),
  respondWithClientError: jest.fn(),
  respondWithServerError: jest.fn(),
  respondWithGenericError: jest.fn(),
}

const editingArticle = mockEditingArticle()

test('createArticle method is called', async () => {
  const spiedMethod = jest.spyOn(articleService, 'createArticle')
  await useCase.execute({ editingArticle }, useCaseCallbacks)

  expect(articleService.createArticle).toHaveBeenCalledTimes(1)
  expect(articleService.createArticle).toHaveBeenCalledWith(editingArticle)
  spiedMethod.mockRestore()
})

test('responds with success', async () => {
  await useCase.execute({ editingArticle }, useCaseCallbacks)
  expect(useCaseCallbacks.respondWithSuccess).toHaveBeenCalledTimes(1)
})

test('responds with server error', async () => {
  const serverError = new HttpError(500, 'Request failed with status code 500')
  server.use(
    rest.post(/\/create-article/, (_, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  await useCase.execute({ editingArticle }, useCaseCallbacks)

  expect(useCaseCallbacks.respondWithSuccess).not.toHaveBeenCalled()
  expect(useCaseCallbacks.respondWithServerError).toHaveBeenCalledTimes(1)
  expect(useCaseCallbacks.respondWithServerError).toHaveBeenCalledWith(
    serverError
  )
})

test('responds with client error', async () => {
  const clientError = new HttpError(400, 'Request failed with status code 400')
  server.use(
    rest.post(/\/create-article/, (_, res, ctx) => {
      return res(ctx.status(400))
    })
  )

  await useCase.execute({ editingArticle }, useCaseCallbacks)

  expect(useCaseCallbacks.respondWithSuccess).not.toHaveBeenCalled()
  expect(useCaseCallbacks.respondWithClientError).toHaveBeenCalledTimes(1)
  expect(useCaseCallbacks.respondWithClientError).toHaveBeenCalledWith(
    clientError
  )
})
