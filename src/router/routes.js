import NotFoundView from '../components/404.vue'
import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/components/Login.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: HelloWorld
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
