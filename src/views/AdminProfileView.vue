<template>
  <div>
    <Navigator />
    <div class="container admin-profile" v-if="admin">
      <div class="profile-card">
        <h1>Admin Profile</h1>
        <div class="profile-info">
          <p><strong>Username:</strong> {{ admin.username }}</p>
          <p><strong>Email:</strong> {{ admin.email }}</p>
          <p><strong>Role:</strong> {{ admin.role }}</p>
          <p><strong>Birthdate:</strong> {{ formatDate(admin.birthdate) }}</p>
          <!-- 添加生日显示 -->
        </div>
        <router-link to="/settings" class="btn btn-edit mt-3">Edit Profile</router-link>
      </div>
    </div>

    <div v-else class="container">
      <p>Loading...</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/main'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

const admin = ref(null)
const loading = ref(true) // To track loading state

const auth = getAuth()

const formatDate = (date) => {
  if (!date) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

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

.profile-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center; /* 文本居中 */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.profile-info p {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #555;
}

.profile-info p strong {
  color: #333;
}

.btn-edit {
  background-color: #b0b0b0; /* 灰色按钮 */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 150px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.btn-edit:hover {
  background-color: #8c8c8c; /* 更深的灰色 */
}
</style>
