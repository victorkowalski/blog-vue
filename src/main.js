// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
// import router from './router'
import store from './store'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from './routes'

Vue.config.productionTip = false

Vue.use(Router)

// Routing logic
var router = new Router({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === 'null')
  ) {
    console.log(router.app.$store.state)
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')

    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#root',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
