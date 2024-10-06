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
            <button class="btn" @click="openBookingModal('Grocery Shopping')">Book</button>
            <router-link to="/support/grocery" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/haircut.jpg" alt="Haircut Services" />
          <h3>Haircut Services</h3>
          <p>Regular haircut and grooming services at your convenience.</p>
          <div class="btn-group">
            <button class="btn" @click="openBookingModal('Haircut Services')">Book</button>
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
            <button class="btn" @click="openBookingModal('Book Club')">Book</button>
            <router-link to="/activities/bookclub" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/baker.jpg" alt="Baker Class" />
          <h3>Baker Class</h3>
          <p>Participate in our social baker class for some fun and enjoy the food.</p>
          <div class="btn-group">
            <button class="btn" @click="openBookingModal('Baker Class')">Book</button>
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
            <button class="btn" @click="makeEmergencyCall">Call</button>
            <router-link to="/support/medical" class="btn">Learn More</router-link>
          </div>
        </div>
        <div class="support-item">
          <img src="/images/emergency.jpg" alt="Emergency Contact" />
          <h3>Emergency Contact</h3>
          <p>24/7 emergency contact services for immediate support.</p>
          <div class="btn-group">
            <button class="btn" @click="makeEmergencyCall">Call</button>
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
import { ref } from 'vue'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import BookingModal from '@/components/BookingModal.vue'
import { getAuth } from 'firebase/auth'

const isBookingModalOpen = ref(false)
const selectedService = ref('')

//booking modal function, replace this with the actual logic
const openBookingModal = (serviceName) => {
  selectedService.value = serviceName
  isBookingModalOpen.value = true
  console.log('Modal Opened:', isBookingModalOpen.value)
}

const closeBookingModal = () => {
  isBookingModalOpen.value = false // 关闭预定模态框
  console.log('Modal Closed:', isBookingModalOpen.value)
}

const submitBooking = async (bookingDetails) => {
  const auth = getAuth()
  const userId = auth.currentUser?.uid // 获取当前登录用户的UID

  if (!userId) {
    alert('User not logged in. Please log in first.')
    return
  }

  try {
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
    console.error('Error sending booking:', error)
    alert('Failed to send booking.')
  }

  closeBookingModal()
}

// Mock emergency call function
const makeEmergencyCall = () => {
  alert('Dialing emergency contact')
  // Handle the logic for calling emergency services
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
  justify-content: space-between; /* 保证左右分布 */
  gap: 15px; /* 增加按钮之间的间距 */
}

.btn {
  padding: 8px 15px; /* 调整按钮的内边距，缩小大小 */
  background-color: #8c5543;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  min-width: 100px; /* 限制按钮的最小宽度，使其不会太长 */
  text-align: center; /* 确保文本居中 */
}

.btn:hover {
  background-color: #7a4a38;
}
</style>
