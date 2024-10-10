<template>
  <div>
    <Navigator />
    <div class="container user-profile" v-if="user">
      <div class="profile-card">
        <h1>User Profile</h1>
        <div class="profile-info">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Birthdate:</strong> {{ formatDate(user.birthdate) }}</p>
          <!-- 使用格式化日期函数 -->
        </div>
        <router-link to="/settings" class="btn btn-edit mt-3">Edit Profile</router-link>
      </div>
    </div>

    <div v-else class="container">
      <p>Loading user data...</p>
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

// Function to format date
const formatDate = (date) => {
  if (!date) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

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
  background-color: #b0b0b0;
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
  background-color: #8c8c8c;
}
</style>
