<template>
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
      <!-- 登录图标 -->
      <router-link to="/login" class="nav-icon">
        <img src="/icons/login-icon.png" alt="Login" class="login-icon" />
      </router-link>
    </div>
  </div>
</template>

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
</style>
