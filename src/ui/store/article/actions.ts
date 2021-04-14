import { ActionTree } from 'vuex'
import { getRecentArticles } from '@@/src/container'
import { RootState } from './state'
import { MutationTypes } from './mutations'

export enum ActionTypes {
  getRecentArticles = 'getRecentArticles',
}

const actions: ActionTree<RootState, RootState> = {
  async [ActionTypes.getRecentArticles]({ commit }) {
    commit(MutationTypes.GET_RECENT_ARTICLES_REQUEST)

    // Just to make it wait for a while
    await sleep(2000)

    await getRecentArticles.execute(null, {
      onSuccess: (articles) => {
        commit(MutationTypes.GET_RECENT_ARTICLES_SUCCESS, articles)
      },
      onClientError: (error) => {
        commit(
          MutationTypes.GET_RECENT_ARTICLES_ERROR,
          `oops I fucked up with a ${error.status} error!: ${error.message}`
        )
      },
      onServerError: (error) => {
        commit(
          MutationTypes.GET_RECENT_ARTICLES_ERROR,
          `heheeh it is on them ${error.name}`
        )
      },
    })

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  },
}

export default actions
