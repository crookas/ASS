import axios from 'axios'
export default {
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
  }
}