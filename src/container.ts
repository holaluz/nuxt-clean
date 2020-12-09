// This is where we "inject" dependencies (notice the quotes)

import { HttpService } from '@shared/http/HttpService'
import { ArticleService as makeArticleService } from '@modules/article/infrastructure/ArticleService'
import { PasswordService as makePasswordService } from '@modules/password/infrastructure/PasswordService'

import { createArticle as makeCreateArticle } from '@modules/article/application/createArticle'
import { getRecentArticles as makeGetRecentArticles } from '@modules/article/application/getRecentArticles'
import { resetPassword as makeResetpassword } from '@modules/password/application/resetPassword'

// Dotenv or something
enum ENDPOINTS {
  CORE = 'https://jsonplaceholder.typicode.com',
}

const coreHttpService = new HttpService(ENDPOINTS.CORE)

// Infra repositories
const articleService = makeArticleService(coreHttpService)
const passwordService = makePasswordService(coreHttpService)

// Application
export const createArticle = makeCreateArticle({ articleService })
export const getRecentArticles = makeGetRecentArticles({ articleService })
export const resetPassword = makeResetpassword({ passwordService })
