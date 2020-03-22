import { ARTICLE } from './mutationTypes'
import { createArticle } from '@/container'
import { Article } from '@/domain/Article'

type State = {
  loading: boolean
  articles: Array<Article>
  error: string | null
}

const state: State = {
  loading: false,
  articles: [],
  error: null
}

const mutations = {
  [ARTICLE.CREATE_ARTICLE_REQUEST](state: State) {
    state.loading = true
    state.error = null
  },

  [ARTICLE.CREATE_ARTICLE_SUCCESS](state: State, article: Article) {
    state.loading = false
    state.error = null
    state.articles = [...state.articles, article]
  },

  [ARTICLE.CREATE_ARTICLE_ERROR](state: State, error: string) {
    state.loading = false
    state.error = error
  }
}

const actions = {
  // Can I fix the "any"? Not that it matter much, but
  createArticle({ rootState, commit }: any, editingArticle: Article) {
    commit(ARTICLE.CREATE_ARTICLE_REQUEST)

    const { user } = rootState

    createArticle.execute(
      { editingArticle, user },
      {
        respondWithSuccess: (article) =>
          commit(ARTICLE.CREATE_ARTICLE_SUCCESS, article),

        respondWithError: (error) =>
          commit(ARTICLE.CREATE_ARTICLE_ERROR, `Unknown error: ${error}`),

        respondWithApiError: (error) =>
          commit(ARTICLE.CREATE_ARTICLE_ERROR, `Oops! Server failed: ${error}`),

        respondWithInvalidParam: (error) =>
          commit(
            ARTICLE.CREATE_ARTICLE_ERROR,
            `Your request is somewhat wrong: ${error}`
          )
      }
    )
  }
}

export default {
  state,
  mutations,
  actions
}
