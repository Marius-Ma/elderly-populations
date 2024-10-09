import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '/src/views/HomeView.vue'
import LoginView from '/src/views/LoginView.vue'
import RegisterView from '/src/views/RegisterView.vue'
import UserProfileView from '/src/views/UserProfileView.vue'
import AdminProfileView from '/src/views/AdminProfileView.vue'
import AboutUsView from '/src/views/AboutUsView.vue'
import CommunitySupportView from '/src/views/CommunitySupportView.vue'
import HaircutSupportView from '@/views/HaircutSupportView.vue'
import ManageBookingView from '@/views/ManageBookingView.vue'
import ManageUsersView from '@/views/ManageUsersView.vue'

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
  },
  {
    path: '/user/profile',
    name: 'UserProfile',
    component: UserProfileView
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: AdminProfileView
  },
  {
    path: '/admin/manage-booking',
    name: 'ManageBooking',
    component: ManageBookingView
  },
  {
    path: '/admin/manage-users',
    name: 'ManageUsers',
    component: ManageUsersView
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUsView
  },
  {
    path: '/community-support',
    name: 'CommunitySupport',
    component: CommunitySupportView
  },
  {
    path: '/community-support/haircut',
    name: 'HaircutSupport',
    component: HaircutSupportView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
