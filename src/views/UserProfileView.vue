<template>
  <div>
    <Navigator />
    <div class="container mt-5">
      <h1>User Profile</h1>
      <p>Welcome, {{ user.username }}!</p>
      <div class="user-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Birthdate:</strong> {{ user.birthdate }}</p>
        <!-- Add more user-specific details here -->
      </div>
      <router-link to="/user/settings" class="btn btn-secondary mt-3">Edit Profile</router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { getLoggedInUser } from '@/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref(getLoggedInUser())
if (!user.value) {
  router.push('/login')
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-info p {
  margin-bottom: 10px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
</style>
