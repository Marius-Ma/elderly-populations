<template>
  <div>
    <Navigator />
    <div class="container mt-5 form-container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center register-heading">Register</h1>
          <form @submit.prevent="submitForm" class="register-form">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
                @blur="() => validateUsername(true)"
                @input="() => validateUsername(false)"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <div class="mb-3">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>

            <div class="mb-3">
              <label for="birthdate" class="form-label">Birthdate</label>
              <input
                type="date"
                class="form-control"
                id="birthdate"
                v-model="formData.birthdate"
                @blur="() => validateBirthdate(true)"
                @input="() => validateBirthdate(false)"
              />
              <div v-if="errors.birthdate" class="text-danger">{{ errors.birthdate }}</div>
            </div>

            <div class="mb-3">
              <label for="role" class="form-label">Register as</label>
              <select id="role" class="form-control" v-model="formData.role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>

            <div class="text-center">
              <button type="submit" class="btn btn-register me-2">Register</button>
              <button type="button" class="btn btn-clear" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth()
const db = getFirestore()
const router = useRouter()

import { ref } from 'vue'

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: ''
})

const errors = ref({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
  birthdate: null
})

const errorMessage = ref(null)

const validateUsername = (blur) => {
  if (!formData.value.username) {
    if (blur) errors.value.username = 'Username is required.'
  } else if (formData.value.username.length < 5) {
    if (blur) errors.value.username = 'Username must be at least 5 characters long.'
  } else {
    errors.value.username = null
  }
}

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

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateBirthdate = (blur) => {
  if (!formData.value.birthdate) {
    if (blur) errors.value.birthdate = 'Birthdate is required.'
  } else {
    errors.value.birthdate = null
  }
}

const submitForm = async () => {
  validateUsername(true)
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateBirthdate(true)

  if (formData.value.role === 'admin' && !formData.value.email.endsWith('@student.monash.edu')) {
    errorMessage.value = 'You are not authorized to register as an Admin.'
    return
  }

  if (
    !errors.value.username &&
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.birthdate
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.value.email,
        formData.value.password
      )

      // Get the registered user
      const user = userCredential.user

      // Save user data to Firestore (like username, birthdate, role)
      await setDoc(doc(db, 'users', user.uid), {
        username: formData.value.username,
        email: formData.value.email,
        birthdate: formData.value.birthdate,
        role: formData.value.role
      })

      // Redirect user to profile page
      const redirectPath = formData.value.role === 'admin' ? '/admin/profile' : '/user/profile'
      router.push(redirectPath)
    } catch (error) {
      errorMessage.value = error.message
    }
  }
}
const clearForm = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  }
  errors.value = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    birthdate: null
  }
}
</script>

<style scoped>
/* Add a container for the form with shadow effect */
.form-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background-color: #efefef;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Header */
.register-heading {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #8c5543;
}

/* Input field styling */
.form-control {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

/* Button styling */
.btn-register {
  background-color: #8c5543;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.btn-register:hover {
  background-color: #7a4a38;
}

.btn-clear {
  background-color: #555;
  color: white;
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
}

.btn-clear:hover {
  background-color: #444;
}

.form-control {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>
