import { ARTICLE } from './mutationTypes'
import { Article } from '@/domain/Article'
import { createArticle } from '@/container'

type State = {
  loading: boolean
  articles: Array<Article>
  error: string | null
}

export const state = (): State => ({
  loading: false,
  articles: [],
  error: null
})

export const mutations = {
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

export const actions = {
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
