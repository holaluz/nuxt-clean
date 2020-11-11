// This is where we "inject" dependencies (notice the quotes)

import { HttpService } from '@@/src/infrastructure/HttpService'
import { ArticleService as makeArticleService } from '@infrastructure/Article/ArticleService'

import { createArticle as makeCreateArticle } from '@application/Article/createArticle'
import { getRecentArticles as makeGetRecentArticles } from '@application/Article/getRecentArticles'

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
