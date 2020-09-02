import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
  mutations: {
    setUser (state, user) {
      if (state.debug) console.log('store.setUser triggered with ', user)
      state.user = user
    },
    clearUser (state) {
      if (state.debug) console.log('store.clearUser triggered')
      state.user = []
    },
    setMarvalData (state, data) {
      if (state.debug) console.log('store.setMarvalData triggered')
      state.marval_data = data
    },
    setCIData (state, data) {
      if (state.debug) console.log('store.setCIData triggered')
      state.hardware_data = data
    }
  },
  actions: {
    setUser ( { commit }, user ) {
      commit('setUser',user)
    },
    clearUser ( { commit }) {
      commit('clearUser')
    },
    loadMarvalData ( { commit } ) {
      // Gets marval data from backend - Statuses,purposes,campuses, makes and models all that sort of shit
      axios.get('test_menu_data.json')
      .then(response => {
        commit('setMarvalData', response.data);
      })
      .catch(error => {
        console.log('Error downloading menu data in store' + error)
      })
    },
    loadCIData ( { commit } ) {
      // Gets CI data from backend
      axios.get('test_ci_data.json')
      .then(response => {
        response.data.forEach(function(row) {
          // convert date fields to date objects
          if(row.attr_WARRANTY_DATE) {
            row.attr_WARRANTY_DATE = new Date(row.attr_WARRANTY_DATE)
          }
        })
        commit('setCIData', response.data);
      })
      .catch(error => {
        console.log('Error downloading CI data in store' + error)
      })
    },
  },
  getters: {
    userData: state => {
      return state.user
    },
    isUserLoggedIn: state => {
      //return !!state.user.userName
      if (typeof state.user.userName === 'undefined' || state.user.userName === null) {
        return false
      } else {
        return true
      }
    },
    hardwareCICount() {
      return state => state.marval_data.hardware_data.length;
    },
    hardwareData: state => {
      return state.hardware_data
    },
    locationCampuses: state => {
      // return Campuses only from locations table
      if (state.debug) console.log('store.getter.locationsCampus triggered')
      if(!state.marval_data.locations) {
        return []
      } else {
        return state.marval_data.locations.filter(o => o.parentLocationId == null )
      }
    },
    locationBuildingsRooms: (state) => (parentLocationId) => {
      if (state.debug) console.log('store.getter.locationBuildingsRooms triggered parentLocationId='+parentLocationId)
      if(!parentLocationId) {
        return []
      } else {
        return state.marval_data.locations.filter(o => o.parentLocationId == parentLocationId)
      }
    },
    orgs: state => {
      return state.marval_data.orgs;
    },
    purposes: state => {
      return state.marval_data.purposes;
    },
    statuses: state => {
      return state.marval_data.statuses;
    },
    makes: state => {
      return state.marval_data.makes;
    },
    models: (state) => (makeId) => {
      if (state.debug) console.log('store.getter.models triggered makeId='+makeId)
      if(!makeId) {
        return state.marval_data.models
      } else {
        return state.marval_data.models.filter(o => o.makesId == makeId)
      }
    }
  }
})




