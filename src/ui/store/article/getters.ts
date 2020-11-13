import { GetterTree } from 'vuex'
import { RootState } from './state'

const getters: GetterTree<RootState, RootState> = {
  totalArticles: (state) => state.articles.length,
}

export default getters
