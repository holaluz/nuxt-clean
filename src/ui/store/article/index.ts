import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Article } from '@domain/Article'
import { getRecentArticles } from '@@/src/container'
import { ARTICLE } from './mutationTypes'

export const state = () => ({
  loading: false,
  articles: [] as Article[],
  error: null as string | null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  [ARTICLE.GET_RECENT_ARTICLES_REQUEST](state) {
    state.loading = true
    state.error = null
  },

  [ARTICLE.GET_RECENT_ARTICLES_ERROR](state, error) {
    state.loading = false
    state.error = error
  },

  [ARTICLE.GET_RECENT_ARTICLES_SUCCESS](state, articles: Article[]) {
    state.loading = false
    state.error = null
    state.articles = articles
  },
}

export const getters: GetterTree<RootState, RootState> = {
  totalArticles: (state) => state.articles.length,
}

export const actions: ActionTree<RootState, RootState> = {
  async getRecentArticles({ commit }) {
    commit(ARTICLE.GET_RECENT_ARTICLES_REQUEST)

    // Just to make it wait for a while
    await sleep(2000)

    await getRecentArticles.execute(null, {
      respondWithSuccess: (articles) => {
        commit(ARTICLE.GET_RECENT_ARTICLES_SUCCESS, articles)
      },
      respondWithClientError: (error) => {
        commit(
          ARTICLE.GET_RECENT_ARTICLES_ERROR,
          `oops I fucked up with a ${error.status} error!: ${error.message}`
        )
      },
      respondWithServerError: (error) => {
        commit(
          ARTICLE.GET_RECENT_ARTICLES_ERROR,
          `heheeh it is on them ${error.name}`
        )
      },
    })

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  },
}
