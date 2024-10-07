<template>
  <Navigator />
  <div class="community-support container">
    <div class="header">
      <h1>Community Support</h1>
      <p>We are here to provide comprehensive support for our community members.</p>
    </div>

    <!-- Daily Support Section -->
    <section class="support-section">
      <h2>Daily Support</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/grocery.jpg" alt="Grocery Shopping" />
          <h3>Grocery Shopping</h3>
          <p>Assistance with weekly grocery shopping and delivery.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canBook"
              :style="{ cursor: canBook ? 'pointer' : 'not-allowed' }"
              @click="canBook ? openBookingModal('Grocery Shopping') : null"
            >
              Book
            </button>
            <router-link to="/support/grocery" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/haircut.jpg" alt="Haircut Services" />
          <h3>Haircut Services</h3>
          <p>Regular haircut and grooming services at your convenience.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canBook"
              :style="{ cursor: canBook ? 'pointer' : 'not-allowed' }"
              @click="canBook ? openBookingModal('Haircut Services') : null"
            >
              Book
            </button>
            <router-link to="/community-support/haircut" class="btn">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Activities Section -->
    <section class="support-section">
      <h2>Community Activities</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/bookclub.jpg" alt="Book Club" />
          <h3>Book Club</h3>
          <p>Join our weekly book club to engage with fellow members.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canBook"
              :style="{ cursor: canBook ? 'pointer' : 'not-allowed' }"
              @click="canBook ? openBookingModal('Book Club') : null"
            >
              Book
            </button>
            <router-link to="/activities/bookclub" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/baker.jpg" alt="Baker Class" />
          <h3>Baker Class</h3>
          <p>Participate in our social baker class for some fun and enjoy the food.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canBook"
              :style="{ cursor: canBook ? 'pointer' : 'not-allowed' }"
              @click="canBook ? openBookingModal('Baker Class') : null"
            >
              Book
            </button>
            <router-link to="/activities/baker" class="btn">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Support Section -->
    <section class="support-section">
      <h2>Emergency Support</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/medical.png" alt="Medical Assistance" />
          <h3>Medical Assistance</h3>
          <p>Quick access to medical help in case of emergencies.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canCall"
              :style="{ cursor: canCall ? 'pointer' : 'not-allowed' }"
              @click="canCall ? makeEmergencyCall() : null"
            >
              Call
            </button>

            <router-link to="/support/medical" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/emergency.jpg" alt="Emergency Contact" />
          <h3>Emergency Contact</h3>
          <p>24/7 emergency contact services for immediate support.</p>
          <div class="btn-group">
            <button
              class="btn"
              :disabled="!canCall"
              :style="{ cursor: canCall ? 'pointer' : 'not-allowed' }"
              @click="canCall ? makeEmergencyCall() : null"
            >
              Call
            </button>

            <router-link to="/support/emergency-contact" class="btn">Learn More</router-link>
          </div>
        </div>
      </div>
    </section>

    <BookingModal
      :serviceName="selectedService"
      :isOpen="isBookingModalOpen"
      @submit="submitBooking"
      @close="closeBookingModal"
    />
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import BookingModal from '@/components/BookingModal.vue'
import { getAuth } from 'firebase/auth'
import { useStore } from 'vuex' // 使用 Vuex 访问全局状态

const store = useStore()
const isLoggedIn = computed(() => store.getters.isUserLoggedIn)
const isAdminUser = computed(() => store.getters.isAdmin)
const canBook = computed(() => isLoggedIn.value && !isAdminUser.value)
const canCall = computed(() => isLoggedIn.value && !isAdminUser.value)

const isBookingModalOpen = ref(false)
const selectedService = ref('')

// Firebase Firestore
const db = getFirestore()

// 打开预定模态框
const openBookingModal = (serviceName) => {
  if (!canBook.value) {
    alert('You must be logged in as a user to book services.')
    return
  }
  selectedService.value = serviceName
  isBookingModalOpen.value = true
}

// 关闭预定模态框
const closeBookingModal = () => {
  isBookingModalOpen.value = false
}

// 提交预定（发送邮件 + 存储到 Firestore）
const submitBooking = async (bookingDetails) => {
  const auth = getAuth()
  const userId = auth.currentUser?.uid

  if (!userId) {
    alert('User not logged in. Please log in first.')
    return
  }

  try {
    // 保存预定信息到 Firestore
    await addDoc(collection(db, 'bookings'), {
      userId: userId,
      serviceName: selectedService.value,
      bookingDetails: bookingDetails,
      timestamp: new Date()
    })

    // 发送邮件
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        bookingDetails: bookingDetails
      })
    })

    if (response.ok) {
      alert('Booking successful!')
    } else {
      alert('Failed to send booking.')
    }
  } catch (error) {
    console.error('Error submitting booking:', error)
    alert('Failed to submit booking.')
  }

  closeBookingModal()
}

// 模拟紧急电话功能
const makeEmergencyCall = () => {
  alert('Dialing emergency contact')
}
</script>

<style scoped>
.community-support {
  padding: 40px 20px;
  background-color: var(--bg-light);
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #8c5543;
}

.header p {
  font-size: 1.2rem;
  color: #4d4d4d;
}

.support-section {
  margin-bottom: 40px;
}

.support-section h2 {
  font-size: 2rem;
  color: #8c5543;
  margin-bottom: 20px;
}

.support-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.support-item {
  flex: 1 1 calc(33.333% - 20px);
  background-color: #f5c6c6;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.support-item img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
}

.support-item h3 {
  font-size: 1.5rem;
  color: #4d4d4d;
  margin-bottom: 10px;
}

.support-item p {
  font-size: 1rem;
  color: #4d4d4d;
  margin-bottom: 15px;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.btn {
  padding: 8px 15px;
  background-color: #8c5543;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  min-width: 100px;
  text-align: center;
}

.btn:hover {
  background-color: #7a4a38;
}

.btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
