<template>
  <Navigator />
  <div class="container login-page">
    <!-- 内容区域容器 -->
    <div class="content-wrapper">
      <div class="login">
        <h1>Log In</h1>
      </div>
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-md-5 col-lg-4 col-xl-3 text-left">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input
                type="text"
                class="form-control mb-3"
                placeholder="Email"
                v-model="formData.email"
                @blur="validateEmail(true)"
                @input="validateEmail(false)"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
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
            <router-link to="/register" class="btn btn-light btn-block create-account-button">
              Create an account
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const auth = getAuth()
const db = getFirestore()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: null,
  password: null,
  login: null
})

const validateEmail = (blur) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email) {
    errors.value.email = 'Email is required.'
  } else if (!emailRegex.test(formData.value.email)) {
    if (blur) errors.value.email = 'Invalid email format.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = () => {
  if (!formData.value.password) {
    errors.value.password = 'Password is required.'
  } else {
    errors.value.password = null
  }
}

const submitForm = async () => {
  validateEmail()
  validatePassword()

  if (!errors.value.email && !errors.value.password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.value.email,
        formData.value.password
      )

      const user = userCredential.user
      console.log('User logged in:', user)

      // Fetch additional user data (e.g., username, birthdate, role) from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        console.log('User data from Firestore:', userData)

        // Redirect based on role or other conditions
        if (userData.role === 'admin') {
          router.push('/admin/profile')
        } else {
          router.push('/user/profile')
        }
      }
    } catch (error) {
      // Log the entire error to see what Firebase is returning
      errors.value.login = 'Username or password is incorrect. Please try again.'
    }
  }
}
</script>

<style scoped>
.login-page {
  background-color: #ddaa99;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
  flex-grow: 1;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  min-height: 0;
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
