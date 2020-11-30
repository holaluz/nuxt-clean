// This is where we "inject" dependencies (notice the quotes)

import { HttpService } from '@shared/http/HttpService'
import { ArticleService as makeArticleService } from '@modules/article/infrastructure/ArticleService'

import { createArticle as makeCreateArticle } from '@modules/article/application/createArticle'
import { getRecentArticles as makeGetRecentArticles } from '@modules/article/application/getRecentArticles'

// Dotenv or something
enum ENDPOINTS {
  CORE = 'https://jsonplaceholder.typicode.com',
}

const coreHttpService = new HttpService(ENDPOINTS.CORE)

// Infra repositories
const articleService = makeArticleService(coreHttpService)

// Application
export const createArticle = makeCreateArticle({ articleService })
export const getRecentArticles = makeGetRecentArticles({ articleService })
