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
        </div>

        <router-link to="/get-involved" class="nav-link">Get Involved</router-link>
        <div class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
          <router-link :to="loginIconLink" class="nav-icon">
            <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
          </router-link>
          <!-- Dropdown for logged-in users -->
          <div v-if="dropdownOpen && isLoggedIn" class="dropdown-menu">
            <router-link v-if="isAdminUser" to="/admin/profile" class="dropdown-item">
              Admin Dashboard
            </router-link>
            <router-link v-if="isAdminUser" to="/admin/manage-users" class="dropdown-item">
              Manage Users
            </router-link>
            <router-link v-if="isAdminUser" to="/settings" class="dropdown-item">
              Settings
            </router-link>
            <router-link v-if="!isAdminUser" to="/user/profile" class="dropdown-item">
              User Dashboard
            </router-link>
            <router-link v-if="!isAdminUser" to="/settings" class="dropdown-item">
              User Settings</router-link
            >
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin-specific navigation bar -->
    <div v-if="isLoggedIn && isAdminUser && isAdminDashboardPage" class="admin-nav">
      <router-link
        to="/admin/profile"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/profile') }"
        >Profile</router-link
      >
      <router-link
        to="/admin/manage-users"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/manage-users') }"
        >Manage Users</router-link
      >
      <router-link
        to="/admin/manage-booking"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/manage-booking') }"
        >Manage Booking</router-link
      >
      <router-link
        to="/settings"
        class="admin-nav-link"
        :class="{ active: isActive('/admin/settings') }"
        >Settings</router-link
      >
      <button @click="handleLogout" class="admin-nav-link logout">Logout</button>
    </div>

    <!-- User-specific navigation bar -->
    <div v-if="isLoggedIn && isUserDashboardPage && !isAdminUser" class="user-nav">
      <router-link
        to="/user/profile"
        class="user-nav-link"
        :class="{ active: isActive('/user/profile') }"
        >Profile</router-link
      >
      <router-link
        to="/settings"
        class="user-nav-link"
        :class="{ active: isActive('/user/settings') }"
        >Settings</router-link
      >
      <button @click="handleLogout" class="user-nav-link logout">Logout</button>
    </div>
    <div class="accessibility-controls">
      <button @click="decreaseFontSize">A-</button>
      <button @click="increaseFontSize">A+</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getAuth, signOut } from 'firebase/auth'

const store = useStore()
const route = useRoute()
const router = useRouter()

const dropdownOpen = ref(false)
const supportDropdownOpen = ref(false)

const isLoggedIn = computed(() => store.getters.isUserLoggedIn)
const isAdminUser = computed(() => store.getters.isAdmin)

const loginIconLink = computed(() =>
  isLoggedIn.value ? (isAdminUser.value ? '/admin/profile' : '/user/profile') : '/login'
)

const isUserDashboardPage = computed(() => ['/user/profile', '/user/settings'].includes(route.path))
const isAdminDashboardPage = computed(() =>
  ['/admin/profile', '/admin/manage-users', '/admin/settings', '/admin/manage-booking'].includes(
    route.path
  )
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

// 定义 isActive 函数
const isActive = (path) => {
  return route.path === path
}

const handleLogout = () => {
  const auth = getAuth()
  signOut(auth).then(() => {
    store.commit('clearUser') // Clear user from Vuex store
    router.push('/login') // Redirect to login page
  })
}

const increaseFontSize = () => {
  store.commit('increaseFontSize')
}

const decreaseFontSize = () => {
  store.commit('decreaseFontSize')
}
</script>

<style scoped>
.navigator {
  display: flex;
  flex-direction: column;
  background-color: #ddaa99;
  padding: 10px 20px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
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
  overflow: visible;
  white-space: nowrap; /* 确保所有链接都在一行内 */
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
  background-color: #ff4d4d !important;
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
  flex-wrap: wrap; /* Ensure that links wrap on smaller screens */
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

.accessibility-controls {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
}

.accessibility-controls button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.accessibility-controls button:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .accessibility-controls {
    justify-content: center; /* 在小屏幕上让按钮居中 */
  }
}

@media (max-width: 768px) {
  .nav-links {
    flex-wrap: nowrap;
    width: 100%;
  }

  .top-nav {
    justify-content: space-between;
  }

  .nav-link,
  .nav-icon {
    min-width: 80px;
  }
}
</style>
