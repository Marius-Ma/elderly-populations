<template>
  <div>
    <Navigator />
  </div>
  <div class="container admin-profile">
    <h1>Admin Profile</h1>
    <div class="profile-info">
      <p><strong>Username:</strong> {{ admin.username }}</p>
      <p><strong>Email:</strong> {{ admin.email }}</p>
      <p><strong>Role:</strong> {{ admin.role }}</p>
    </div>
    <router-link to="/admin/settings" class="btn btn-primary mt-3">Edit Profile</router-link>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getLoggedInUser } from '@/auth.js'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

const admin = ref(getLoggedInUser())
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.profile-info p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  padding: 10px;
}
</style>
