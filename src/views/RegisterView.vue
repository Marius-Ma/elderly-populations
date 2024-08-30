<template>
  <div>
    <Navigator />
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Register</h1>
          <form @submit.prevent="submitForm">
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

            <div class="text-center">
              <button type="submit" class="btn btn-primary me-2">Register</button>
              <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: ''
})

const errors = ref({
  email: null,
  password: null,
  confirmPassword: null,
  birthdate: null
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

const submitForm = () => {
  validateEmail(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateBirthdate(true)

  if (
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.birthdate
  ) {
    alert('Registration successful!')
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  }
  errors.value = {
    email: null,
    password: null,
    confirmPassword: null,
    birthdate: null
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
}
</style>
