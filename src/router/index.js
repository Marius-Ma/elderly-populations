import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '/src/views/HomeView.vue'
import LoginView from '/src/views/LoginView.vue'
import RegisterView from 'src/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
