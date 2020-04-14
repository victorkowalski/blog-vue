import NotFoundView from '../components/404.vue'
import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/components/Login.vue'
import RegisterView from '@/components/Register.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
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
