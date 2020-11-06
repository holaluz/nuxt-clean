// This is where we "inject" dependencies (notice the quotes)

import { ApiService } from '@@/src/infrastructure/ApiService'
import { ArticleService as makeArticleService } from '@infrastructure/Article/ArticleService'

import { createArticle as makeCreateArticle } from '@application/Article/createArticle'
import { getRecentArticles as makeGetRecentArticles } from '@application/Article/getRecentArticles'

// Infra repositories
const articleService = makeArticleService({ apiService: new ApiService() })

// Application
export const createArticle = makeCreateArticle({ articleService })
export const getRecentArticles = makeGetRecentArticles({ articleService })
