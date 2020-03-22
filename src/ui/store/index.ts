import Vue from 'vue'
import Vuex from 'vuex'
import article from './article'

import * as container from '@/container'

Vue.use(Vuex)

// Can I fix the "any"? Not that it matter much, but
const injectContainer = (store: any) => {
  store.app = container
}

export default new Vuex.Store({
  modules: {
    article
  },
  plugins: [injectContainer]
})
