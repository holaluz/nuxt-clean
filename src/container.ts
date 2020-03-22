// This is where we "inject" dependencies (notice the quotes)

import * as apiService from '@/infrastructure/ApiService'
import { articleRepository as makeArticleRepository } from '@/infrastructure/Article/articleRepository'

import { createArticle as makeCreateArticle } from '@/application/Article/createArticle'

// Infra repositories
const articleRepository = makeArticleRepository({ apiService })

// Application
export const createArticle = makeCreateArticle({ articleRepository })
