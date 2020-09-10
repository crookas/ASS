// routes.js
import Vue from 'vue'
import { store } from './store/store'
import VueRouter from 'vue-router'

import SearchPage from './views/SearchPage.vue'
import LandingPage from './views/LandingPage.vue'
import CreatePage from './views/CreatePage.vue'
import ImportPage from './views/ImportPage.vue'
import BulkUpdatePage from './views/BulkUpdatePage.vue'
import SoftwarePage from './views/SoftwarePage.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {   
            name: 'landing',
            path: '/', 
            component: LandingPage, 
        },
        { 
            name: 'search', 
            path: '/search', 
            component: SearchPage,
            meta: {
                requiresAuth: true
            }
        },
        { 
            name: 'create',
            path: '/create',
            component: CreatePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'import',
            path: '/import',
            component: ImportPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'bulk_update',
            path: '/bulk_update', 
            component: BulkUpdatePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'software',
            path: '/software', 
            component: SoftwarePage,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach(function(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.isUserLoggedIn) {
        next({ name: 'landing' })
      } else {
        next() // go to wherever I'm going
      }
    } else {
      next() // does not require auth, make sure to always call next()!
    }
})

export default router;