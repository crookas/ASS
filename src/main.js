// main.js

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store'
import { router } from './routes'

Vue.config.productionTip = false

// Get data from server and load it into the vuex store
// This happens asynchronously in the background before and while th euser logs in - pretty clever hey
// loadMarvalData gets the statuses/models/makes etc needed for dynamic select menus
// locaCIData gets all of the end-user-device data
store.dispatch('loadMarvalData')
store.dispatch('loadCIData')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

