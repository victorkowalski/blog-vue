import NotFoundView from '@/components/404.vue'
import HelloWorld from '@/components/HelloWorld'
import LoginView from '@/components/Login.vue'
import RegisterView from '@/components/Register.vue'

// Routes
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    props: true
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/',
    component: HelloWorld,
    meta: { requiresAuth: true }
  },
  {
    // not found handler
    path: '*',
    component: NotFoundView
  },
  {
    path: '/auth/:provider/callback',
    component: {
      template: '<div class="auth-component"></div>'
    }
  }
]

export default routes
