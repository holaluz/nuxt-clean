// This is where we "inject" dependencies (notice the quotes)

import { ApiService } from '@infrastructure/ApiService'
import { ArticleService as makeArticleService } from '@infrastructure/Article/ArticleService'

import { createArticle as makeCreateArticle } from '@application/Article/createArticle'
import { getRecentArticles as makeGetRecentArticles } from '@application/Article/getRecentArticles'

// Dotenv or something
enum ENDPOINTS {
  CORE = 'https://jsonplaceholder.typicode.com',
}

const coreApiService = new ApiService(ENDPOINTS.CORE)

// Infra repositories
const articleService = makeArticleService({ apiService: coreApiService })

// Application
export const createArticle = makeCreateArticle({ articleService })
export const getRecentArticles = makeGetRecentArticles({ articleService })
