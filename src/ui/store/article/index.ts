import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Article } from '@domain/Article'
import { createArticle } from '@@/src/container'
import { ARTICLE } from './mutationTypes'

export const state = () => ({
  loading: false,
  articles: [] as Article[],
  error: null as string | null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  [ARTICLE.CREATE_ARTICLE_REQUEST](state) {
    state.loading = true
    state.error = null
  },

  [ARTICLE.CREATE_ARTICLE_SUCCESS](state, article: Article) {
    state.loading = false
    state.error = null
    state.articles = [...state.articles, article]
  },

  [ARTICLE.CREATE_ARTICLE_ERROR](state, error: string) {
    state.loading = false
    state.error = error
  },
}

export const getters: GetterTree<RootState, RootState> = {
  totalArticles: (state) => state.articles.length,
}

export const actions: ActionTree<RootState, RootState> = {
  createArticle({ commit }, editingArticle: Article) {
    commit(ARTICLE.CREATE_ARTICLE_REQUEST)

    const user = {
      email: 'email',
      token: 'token',
      username: 'username',
    }

    createArticle.execute(
      { editingArticle, user },
      {
        respondWithSuccess: (article) => {
          commit(ARTICLE.CREATE_ARTICLE_SUCCESS, article)
        },

        respondWithError: (error) => {
          commit(ARTICLE.CREATE_ARTICLE_ERROR, `Unknown error: ${error}`)
        },

        respondWithApiError: (error) => {
          commit(ARTICLE.CREATE_ARTICLE_ERROR, `Oops! Server failed: ${error}`)
        },

        respondWithInvalidParam: (error) => {
          commit(
            ARTICLE.CREATE_ARTICLE_ERROR,
            `Your request is somewhat wrong: ${error}`
          )
        },
      }
    )
  },
}
