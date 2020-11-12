import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { state } from './state'

export default {
  state() {
    return state
  },
  mutations,
  actions,
  getters,
}
