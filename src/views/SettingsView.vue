<template>
  <div class="app-container">
    <Navigator />
    <main class="main-content">
      <div v-if="user" class="settings-form">
        <h1>User Settings</h1>
        <p>Edit your personal information and save the changes.</p>

        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="updatedUsername" />
          </div>

          <div class="form-group">
            <label for="email">Email (cannot be changed):</label>
            <input type="email" id="email" v-model="email" disabled />
          </div>

          <div class="form-group">
            <label for="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" v-model="updatedBirthdate" />
          </div>

          <div class="form-group">
            <label for="password">New Password:</label>
            <input type="password" id="password" v-model="updatedPassword" />
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" />
          </div>

          <button type="submit" :disabled="!canSave">Save Changes</button>
        </form>

        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
      </div>
      <div v-else>
        <p>Loading user data...</p>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/main'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'

const store = useStore()

// Watch for user changes and handle null cases
const user = computed(() => store.getters.getUser)
const updatedUsername = ref('')
const updatedBirthdate = ref('')
const updatedPassword = ref('')
const confirmPassword = ref('')
const email = ref('')

// Watch for changes in the user object
watch(
  user,
  (newUser) => {
    if (newUser) {
      updatedUsername.value = newUser.username
      updatedBirthdate.value = newUser.birthdate
      email.value = newUser.email
    }
  },
  { immediate: true }
)

const errorMessage = ref('')
const successMessage = ref('')

// Form validation
const canSave = computed(() => {
  return updatedUsername.value && updatedPassword.value === confirmPassword.value
})

// Function to save changes to Firestore
const saveChanges = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (updatedPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match!'
    return
  }

  try {
    const userDoc = doc(db, 'users', user.value.id) // Assuming user ID is the document ID
    await updateDoc(userDoc, {
      username: updatedUsername.value,
      birthdate: updatedBirthdate.value,
      ...(updatedPassword.value && { password: updatedPassword.value })
    })
    successMessage.value = 'Changes saved successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to save changes. Please try again.'
    console.error('Error updating user info:', error)
  }
}
</script>

<style scoped>
/* Flexbox layout to ensure consistent header, footer, and content spacing */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ddaa99; /* 使用页面背景颜色 */
}

/* Settings form styles remain unchanged */
.settings-form {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  color: #666;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 1rem;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
