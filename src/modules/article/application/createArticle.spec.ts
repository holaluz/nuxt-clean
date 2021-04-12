import { HttpService } from '@@/src/shared/http/HttpService'
import { mockServer } from '@@/src/shared/mockService'
import { ArticleService as makeArticleService } from '../infrastructure/ArticleService'
import { ArticleServiceMock } from '../infrastructure/ArticleService.mock'
import { mockEditingArticle } from '../domain'
import { createArticle as makeGetRecentArticles } from './createArticle'

const mockHttpService = new HttpService('irrelevant')
const articleService = makeArticleService(mockHttpService)
const useCase = makeGetRecentArticles({ articleService })

mockServer(...ArticleServiceMock)

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
