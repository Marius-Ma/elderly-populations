<template>
  <div>
    <Navigator />
  </div>
  <div class="container admin-profile" v-if="admin">
    <h1>Admin Profile</h1>
    <div class="profile-info">
      <p><strong>Username:</strong> {{ admin.username }}</p>
      <p><strong>Email:</strong> {{ admin.email }}</p>
      <p><strong>Role:</strong> {{ admin.role }}</p>
    </div>
    <router-link to="/admin/settings" class="btn btn-primary mt-3">Edit Profile</router-link>
  </div>

  <div v-else class="container">
    <p>Loading...</p>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

const admin = ref(null) // Holds the admin data
const loading = ref(true) // To track loading state

const auth = getAuth()
const db = getFirestore()

onMounted(() => {
  // Listen for changes in the authentication state
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid)) // Fetch user data from Firestore
        if (userDoc.exists()) {
          admin.value = userDoc.data() // Assign the user data to the 'admin' ref
        } else {
          console.error('No such user document in Firestore.')
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
      }
    } else {
      console.error('No user is logged in.')
    }
    loading.value = false // Loading is complete
  })
})
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
