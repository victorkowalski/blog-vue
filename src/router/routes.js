
import NotFoundView from '../components/404.vue'
import HelloWorld from '@/components/HelloWorld'
//import HelloWorld from '../components/HelloWorld'


// Routes
const routes = [
  /*{
    path: '/login',
    component: LoginView
  },*/
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
