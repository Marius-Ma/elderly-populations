<template>
  <div class="navigator">
    <div class="top-nav">
      <div class="logo">
        <router-link to="/">
          <h1>SilverWell</h1>
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/about" class="nav-link">About Us</router-link>
        <router-link to="/health-resources" class="nav-link">Health Resources</router-link>
        <div class="dropdown" @mouseenter="openSupportDropdown" @mouseleave="closeSupportDropdown">
          <router-link to="/community-support" class="nav-link">Community Support</router-link>
          <div v-if="supportDropdownOpen" class="dropdown-menu">
            <router-link to="/community-support/daily-support" class="dropdown-item"
              >Daily Support</router-link
            >
            <router-link to="/community-support/community-activities" class="dropdown-item"
              >Community Activities</router-link
            >
            <router-link to="/community-support/emergency-support" class="dropdown-item"
              >Emergency Support</router-link
            >
          </div>
        </div>

        <router-link to="/get-involved" class="nav-link">Get Involved</router-link>
        <div class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
          <router-link :to="loginIconLink" class="nav-icon">
            <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
          </router-link>
          <div v-if="dropdownOpen && isLoggedIn" class="dropdown-menu">
            <router-link v-if="isAdminUser" to="/admin/profile" class="dropdown-item"
              >Admin Dashboard</router-link
            >
            <router-link v-if="isAdminUser" to="/admin/users" class="dropdown-item"
              >Manage Users</router-link
            >
            <router-link v-if="isAdminUser" to="/admin/settings" class="dropdown-item"
              >Settings</router-link
            >
            <router-link v-if="isAdminUser" to="/admin/data" class="dropdown-item"
              >Data Overview</router-link
            >
            <router-link v-if="!isAdminUser" to="/user/profile" class="dropdown-item"
              >User Dashboard</router-link
            >
            <router-link v-if="!isAdminUser" to="/user/settings" class="dropdown-item"
              >User Settings</router-link
            >
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoggedIn && isAdminUser && isAdminDashboardPage" class="admin-nav">
      <router-link
        to="/admin/profile"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/profile') }"
        >Profile</router-link
      >
      <router-link
        to="/admin/users"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/users') }"
        >Manage Users</router-link
      >
      <router-link
        to="/admin/settings"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/settings') }"
        >Settings</router-link
      >
      <router-link
        to="/admin/data"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/data') }"
        >Data Overview</router-link
      >
      <button @click="handleLogout" class="admin-nav-link">Logout</button>
    </div>

    <div v-if="isLoggedIn && isUserDashboardPage && !isAdminUser" class="user-nav">
      <router-link
        to="/user/profile"
        class="user-nav-link"
        :class="{ active: isActive('/user/profile') }"
        >Profile</router-link
      >
      <router-link
        to="/user/settings"
        class="user-nav-link"
        :class="{ active: isActive('/user/settings') }"
        >Settings</router-link
      >
      <button @click="handleLogout" class="user-nav-link">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAdmin, isUserLoggedIn, logoutUser as logout } from '@/auth.js'

const dropdownOpen = ref(false)
const supportDropdownOpen = ref(false)

const isAdminUser = computed(() => isAdmin())
const isLoggedIn = computed(() => isUserLoggedIn())
const route = useRoute()
const isActive = (path) => route.path === path
const isLoginPage = computed(() => route.path === '/login')
const loginIconLink = computed(() =>
  isLoggedIn.value ? (isAdminUser.value ? '/admin/profile' : '/user/profile') : '/login'
)
const isUserDashboardPage = computed(() => ['/user/profile', '/user/settings'].includes(route.path))
const isAdminDashboardPage = computed(() =>
  ['/admin/profile', '/admin/users', '/admin/settings', '/admin/data'].includes(route.path)
)

const openDropdown = () => {
  dropdownOpen.value = true
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const openSupportDropdown = () => {
  supportDropdownOpen.value = true
}

const closeSupportDropdown = () => {
  supportDropdownOpen.value = false
}

const router = useRouter()
const handleLogout = () => {
  logout()
  closeDropdown() // 关闭下拉菜单
  router.push('/') // 重定向到首页
}
</script>

<style scoped>
.navigator {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #ddaa99;
  padding: 10px 20px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo h1 {
  margin: 0;
  font-size: 48px;
  font-weight: bold;
  color: #000;
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #4d4d4d;
  font-weight: bold;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 8px 10px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e5e5;
  margin: 8px 0;
}

.logout {
  color: #ff4d4d;
}

.logout:hover {
  background-color: #ffe5e5;
}

.login-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  cursor: pointer;
}

.user-nav,
.admin-nav {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.user-nav-link,
.admin-nav-link {
  padding: 8px 15px;
  background-color: #f5c6c6;
  border-radius: 5px;
  color: #4d4d4d;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.user-nav-link:hover,
.admin-nav-link:hover {
  background-color: #eaa;
}

.user-nav-link.active,
.admin-nav-link.active {
  background-color: #d88;
  color: #fff;
}
</style>
