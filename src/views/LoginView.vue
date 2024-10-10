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
              <small class="form-text forgot-password" @click="resetPassword"
                >Forgot password?</small
              >
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              <div v-if="errors.login" class="text-danger">{{ errors.login }}</div>
            </div>
            <button type="submit" class="btn btn-outline-dark btn-block mb-3 mt-4">Log in</button>
          </form>
          <div class="social-login d-flex justify-content-center">
            <button class="btn btn-outline-secondary google-login" @click="loginWithGoogle">
              <img src="/icons/google-icon.png" alt="Google" class="mr-2" /> Google
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
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail
} from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const auth = getAuth()
const provider = new GoogleAuthProvider()
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

const resetPassword = async () => {
  if (!formData.value.email) {
    errors.value.email = 'Please enter your email to reset your password.'
    return
  }

  try {
    await sendPasswordResetEmail(auth, formData.value.email)
    alert('Password reset email sent! Check your inbox.')
  } catch (error) {
    console.error('Error sending password reset email:', error)
    errors.value.email = 'Failed to send password reset email. Please try again.'
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
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    console.log('User logged in with Google:', user)
    const userDoc = await getDoc(doc(db, 'users', user.uid))

    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName || 'Anonymous',
        email: user.email,
        photoURL: user.photoURL || null,
        role: 'user'
      })
    }
    router.push('/user/profile')
  } catch (error) {
    console.error('Error logging in with Google:', error)
    errors.value.login = 'Failed to log in with Google. Please try again.'
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
  padding: 12px 20px;
  width: 100%;
  margin-top: 15px;
}

.btn-outline-dark:hover {
  background-color: #000;
  color: hsl(0, 0%, 100%);
}

.google-login {
  background-color: #080001;
  color: #ffffff;
  border: 1px solid #afafaf;
  box-shadow: 0 2px 5px rgba(52, 49, 49, 0.1);
  width: 280px;
  margin-top: 20px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.google-login img {
  width: 28px;
  height: auto;
  margin-right: 7px;
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
  white-space: nowrap;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  margin: 8px 2px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.vertical-line {
  border-left: 2px solid rgba(255, 255, 255, 0.7);
  height: 160px; /* Increased the height slightly */
  margin: auto 50px; /* Adjusted margin for spacing around the text */
}

.social-login {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.form-group {
  position: relative;
  margin-bottom: 25px; /* Increased margin between inputs */
}

.forgot-password {
  position: absolute;
  right: 0;
  top: 100%;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer; /* Add this for better UX */
  text-decoration: underline; /* Makes it look more like a link */
}

@media (max-width: 768px) {
  .row {
    flex-direction: column; /* 将横向布局改为纵向堆叠 */
  }

  .vertical-line {
    display: none; /* 小屏幕时隐藏竖线 */
  }

  .not-member-text {
    margin-top: 20px; /* 增加一些空间 */
    text-align: center;
  }

  .col-12,
  .col-md-5,
  .col-md-1,
  .col-lg-4,
  .col-xl-3 {
    max-width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .vertical-line {
    display: none; /* 小屏幕时隐藏竖线 */
  }

  .not-member-text {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .create-account-box {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .btn {
    width: 100%;
  }

  .google-login {
    width: 100%;
  }
}
</style>
