import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})*/
