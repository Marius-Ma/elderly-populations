<!-- <template>
  <div class="navigator">
    <div class="logo">
      <router-link to="/">
        <h1>SilverWell</h1>
      </router-link>
    </div>
    <div class="nav-links">
      <router-link to="/about" class="nav-link">About Us</router-link>
      <router-link to="/health-resources" class="nav-link">Health Resources</router-link>
      <router-link to="/community-support" class="nav-link">Community Support</router-link>
      <router-link to="/get-involved" class="nav-link">Get Involved</router-link>
      <router-link to="/login" class="nav-icon">
        <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
      </router-link>
    </div>
  </div>
</template> -->

<!-- <style scoped>
.navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ddaa99;
  padding: 10px 20px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #000;
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

/* 登录图标样式 */
.nav-icon {
  margin-left: 20px;
}

.login-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.logo a {
  text-decoration: none;
  color: inherit;
}
</style> -->

<template>
  <div class="navigator">
    <div class="top-nav">
      <div class="logo">
        <router-link to="/">
          <h1>SilverWell</h1>
        </router-link>
      </div>
      <div class="nav-links">
        <!-- 显示公共链接，无论是否登录 -->
        <router-link to="/about" class="nav-link">About Us</router-link>
        <router-link to="/health-resources" class="nav-link">Health Resources</router-link>
        <router-link to="/community-support" class="nav-link">Community Support</router-link>
        <router-link to="/get-involved" class="nav-link">Get Involved</router-link>

        <!-- 登录图标 -->
        <template v-if="!isLoginPage">
          <router-link :to="loginIconLink" class="nav-icon">
            <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
          </router-link>
        </template>
      </div>
    </div>

    <!-- 用户独有的导航项，仅在用户处于用户 Dashboard 时显示 -->
    <div v-if="isLoggedIn && isUserDashboardPage" class="user-nav">
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAdmin, isUserLoggedIn, logoutUser as logout } from '@/auth.js'

// 调用 auth.js 中的方法
const isAdminUser = computed(() => isAdmin())
const isLoggedIn = computed(() => isUserLoggedIn())

// 判断当前路由路径是否匹配
const route = useRoute()
const isActive = (path) => route.path === path

// 检查当前是否是登录页面
const isLoginPage = computed(() => route.path === '/login')

// 检查当前是否处于用户 Dashboard 页面
const isUserDashboardPage = computed(() => {
  return ['/user/profile', '/user/settings'].includes(route.path)
})

// 动态决定登录图标的链接
const loginIconLink = computed(() => {
  return isLoggedIn.value ? '/user/profile' : '/login'
})

const router = useRouter()
const handleLogout = () => {
  logout()
  router.push('/')
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
  font-size: 24px;
  font-weight: bold;
  color: #000;
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

.user-nav {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.user-nav-link {
  padding: 8px 15px;
  background-color: #f5c6c6;
  border-radius: 5px;
  color: #4d4d4d;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.user-nav-link:hover {
  background-color: #eaa;
}

.user-nav-link.active {
  background-color: #d88;
  color: #fff;
}

.nav-icon {
  margin-left: auto;
}

.login-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.logo a {
  text-decoration: none;
  color: inherit;
}
</style>
