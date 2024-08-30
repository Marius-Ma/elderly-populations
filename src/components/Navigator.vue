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

      <!-- 根据用户身份显示不同的导航项 -->
      <template v-if="isAdminUser">
        <router-link to="/admin-dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/admin-users" class="nav-link">Manage Users</router-link>
        <router-link to="/admin-settings" class="nav-link">Settings</router-link>
      </template>

      <template v-else-if="isLoggedIn">
        <!-- 如果是已登录用户，显示用户的 dashboard 链接 -->
        <div class="dashboard-links">
          <router-link
            to="/user/profile"
            class="dashboard-link"
            :class="{ active: isActive('/user/profile') }"
            >Profile</router-link
          >
          <router-link
            to="/user/settings"
            class="dashboard-link"
            :class="{ active: isActive('/user/settings') }"
            >Settings</router-link
          >
          <router-link to="/logout" class="dashboard-link">Logout</router-link>
        </div>
      </template>

      <!-- 动态决定登录图标的链接 -->
      <template v-if="!isLoginPage">
        <router-link :to="loginIconLink" class="nav-icon">
          <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isAdmin, isUserLoggedIn } from '@/auth.js'

// 调用 auth.js 中的方法
const isAdminUser = computed(() => isAdmin())
const isLoggedIn = computed(() => isUserLoggedIn())

// 判断当前路由路径是否匹配
const route = useRoute()
const isActive = (path) => route.path === path

// 检查当前是否是登录页面
const isLoginPage = computed(() => route.path === '/login')

// 动态决定登录图标的链接
const loginIconLink = computed(() => {
  return isLoggedIn.value ? '/user-dashboard' : '/login'
})
</script>

<style scoped>
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

.nav-link,
.dashboard-link {
  color: #4d4d4d;
  font-weight: bold;
  text-decoration: none;
}

.nav-link:hover,
.dashboard-link:hover {
  text-decoration: underline;
}

.dashboard-link.active {
  color: #000;
  font-weight: bold;
  text-decoration: underline;
}

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
</style>
