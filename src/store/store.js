import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    debug: true,
    user: [
      // username
      // firstname
      // lastname
      // auth_level
      // email
    ],
    marval_data: [{
      statuses: [],
      purposes: [],
      campuses: [],
      locations: [],
      orgs: [],
      makes: [],
      models: [],
    }],
    hardware_data: [],
  },
  getters,
  actions,
  mutations
})




