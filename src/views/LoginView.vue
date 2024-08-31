<
<template>
  <div class="container login-page">
    <!-- Navigator -->
    <Navigator />
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-md-5 col-lg-4 col-xl-3 text-left">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Username"
              v-model="formData.username"
              @blur="validateUsername(true)"
              @input="validateUsername(false)"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>
          <div class="form-group position-relative">
            <input
              type="password"
              class="form-control mb-3"
              placeholder="Password"
              v-model="formData.password"
              @blur="validatePassword"
            />
            <small class="form-text forgot-password">Forgot password?</small>
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            <div v-if="errors.login" class="text-danger">{{ errors.login }}</div>
            <!-- 错误消息显示在这里 -->
          </div>
          <button type="submit" class="btn btn-outline-dark btn-block mb-3 mt-4">Log in</button>
        </form>
        <div class="social-login d-flex justify-content-between">
          <button class="btn btn-outline-secondary google-login mr-2">
            <img src="/icons/google-icon.png" alt="Google" class="mr-2" /> Google
          </button>
          <button class="btn btn-outline-secondary facebook-login">
            <img src="/icons/facebook-icon.png" alt="Facebook" class="mr-2" /> Facebook
          </button>
        </div>
      </div>

      <!-- Middle Line -->
      <div class="col-12 col-md-1 text-center my-3 my-md-0">
        <div class="vertical-line"></div>
        <div class="not-member-text">Not a member?</div>
        <div class="vertical-line"></div>
      </div>

      <!-- Right Section -->
      <div class="col-12 col-md-5 col-lg-4 col-xl-3 text-center">
        <div class="create-account-box">
          <router-link to="/register" class="btn btn-light btn-block create-account-button"
            >Create an account</router-link
          >
        </div>
      </div>
    </div>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { loginUser } from '@/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null,
  login: null // 用于显示登录错误
})

const validateUsername = (blur) => {
  const specialCharPattern = /[^a-zA-Z0-9_]/

  if (!formData.value.username) {
    if (blur) errors.value.username = 'Username is required.'
  } else if (specialCharPattern.test(formData.value.username)) {
    errors.value.username = 'Username cannot contain special characters.'
  } else if (formData.value.username.length < 5) {
    if (blur) errors.value.username = 'Username must be at least 5 characters long.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = () => {
  if (!formData.value.password) {
    errors.value.password = 'Password is required.'
  } else {
    errors.value.password = null
  }
}

const submitForm = () => {
  validateUsername(true)
  validatePassword()

  if (!errors.value.username && !errors.value.password) {
    const username = formData.value.username
    const password = formData.value.password

    // 调用 loginUser 函数，并将错误处理逻辑传递给 setError
    const user = loginUser(username, password, (errorMessage) => {
      errors.value.login = errorMessage // 设置错误消息
    })

    if (user) {
      // 用户存在且登录成功，跳转到相应页面
      if (user.role === 'admin') {
        router.push('/admin/profile')
      } else {
        router.push('/user/profile')
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  background-color: #ddaa99;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  padding: 0 10%;
  margin: 0 auto;
}

/* Additional styles */
.form-control {
  background-color: #f5c6c6;
  border: none;
  border-radius: 10px;
  padding: 10px;
}

.forgot-password {
  position: absolute;
  right: 0;
  top: 100%;
  color: #666;
  font-size: 0.9rem;
}

.btn-dark,
.btn-light,
.btn-outline-dark {
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
}

.btn-outline-dark:hover {
  background-color: #000;
  color: #fff;
}

.google-login,
.facebook-login {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 180px;
  margin-top: 10px;
}

.google-login img,
.facebook-login img {
  width: 20px;
  height: auto;
}

.create-account-box {
  background-color: transparent;
  border-radius: 10px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.create-account-button {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
}

.not-member-text {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin: 15px 0;
}

.vertical-line {
  border-left: 2px solid rgba(255, 255, 255, 0.7);
  height: 50px;
  margin: auto;
}

.social-login {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}
</style>
