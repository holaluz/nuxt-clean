import { Article } from '@modules/article/domain'
import { MutationTree } from 'vuex'
import { RootState } from './state'

export enum MutationTypes {
  GET_RECENT_ARTICLES_REQUEST = 'GET_RECENT_ARTICLES_REQUEST',
  GET_RECENT_ARTICLES_SUCCESS = 'GET_RECENT_ARTICLES_SUCCESS',
  GET_RECENT_ARTICLES_ERROR = 'GET_RECENT_ARTICLES_ERROR',
}

const mutations: MutationTree<RootState> = {
  [MutationTypes.GET_RECENT_ARTICLES_REQUEST](state) {
    state.loading = true
    state.error = null
  },

  [MutationTypes.GET_RECENT_ARTICLES_ERROR](state, error) {
    state.loading = false
    state.error = error
  },

  [MutationTypes.GET_RECENT_ARTICLES_SUCCESS](state, articles: Article[]) {
    state.loading = false
    state.error = null
    state.articles = articles
  },
}

export default mutations
