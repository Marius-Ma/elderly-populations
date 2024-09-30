<template>
  <div>
    <Navigator />
    <div class="container mt-5">
      <h1>User Profile</h1>
      <p v-if="user">Welcome, {{ user.username }}!</p>
      <div v-if="user" class="user-info">
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Birthdate:</strong> {{ user.birthdate }}</p>
        <!-- Add more user-specific details here -->
      </div>
      <div v-else>
        <p>Loading user data...</p>
      </div>
      <router-link to="/user/settings" class="btn btn-secondary mt-3">Edit Profile</router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const user = ref(null)
const db = getFirestore()
const auth = getAuth()

// Function to fetch the user profile from Firestore
const fetchUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      user.value = userDoc.data() // Store user profile data
    } else {
      console.log('No such user data in Firestore')
    }
  } catch (error) {
    console.error('Error fetching user profile:', error)
  }
}

// Check if the user is logged in via Firebase Authentication
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      // User is logged in, fetch their profile
      fetchUserProfile(firebaseUser.uid)
    } else {
      // Redirect to login if not logged in
      router.push('/login')
    }
  })
})
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
