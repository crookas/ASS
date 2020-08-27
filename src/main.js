// main.js

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from './routes';



import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({routes, mode: 'history'});

Vue.use(Vuex)
import { store } from './store'
store.dispatch('loadMarvalData')
store.dispatch('loadCIData')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

