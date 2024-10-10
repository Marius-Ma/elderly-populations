<template>
  <div v-if="aboutUs.introduction">
    <Navigator />

    <!-- Contact Us Section -->
    <div class="contact-section">
      <div class="contact-content">
        <div class="contact-left">
          <button @click="makeCall" class="cta-button">Let's have a chat</button>
        </div>
        <div class="contact-right">
          <h1>Contact Us</h1>
          <p class="phone-number">03 0000 0000</p>
          <p class="email">ymaa0106@student.monash.edu</p>
        </div>
      </div>
    </div>

    <div class="about-us container">
      <section class="hero">
        <div class="hero-content">
          <h1>{{ aboutUs.introduction.title }}</h1>
          <p>{{ aboutUs.introduction.description }}</p>
        </div>
        <img src="/images/community.jpg" alt="Concierge Service" class="hero-image" />
      </section>

      <!-- Services Section -->
      <section class="services">
        <h2>SAY HELLO TO EXCEPTIONAL SERVICES</h2>
        <p>Our team can help with personal, household, and nursing needs whenever you need.</p>
        <div class="service-list">
          <div v-for="service in aboutUs.services" :key="service.title" class="service-item">
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </section>

      <section class="mission">
        <h2>{{ aboutUs.mission.title }}</h2>
        <p>{{ aboutUs.mission.description }}</p>
      </section>

      <!-- SilverWell Office Locations Section -->
      <section class="office-locations">
        <h2>SilverWell Office Locations</h2>
        <div class="offices-container">
          <div class="office">
            <h3>Eastern Office</h3>
            <p>921 Princes Hwy</p>
            <p>Springvale, 3171</p>
          </div>
          <div class="office">
            <h3>Western Office</h3>
            <p>253 Normanby Rd</p>
            <p>South Melbourne, 3205</p>
          </div>
          <div class="office">
            <h3>Mornington Office</h3>
            <p>432 Nepean Highway</p>
            <p>Frankston, 3199</p>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import aboutUsData from '../assets/json/aboutUs.json'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

// Simulating the phone call action
const makeCall = () => {
  alert('Calling 03 0000 0000...')
}

// Load the about us data
const aboutUs = ref({})

onMounted(() => {
  aboutUs.value = aboutUsData
})
</script>

<style scoped>
.contact-section {
  background-color: #f9e0e0; /* Light pink */
  padding: 60px 30px;
  text-align: center;
  border-radius: 22px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.contact-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* Max width for content */
  margin: 0 auto; /* Center the content */
}

.contact-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-right {
  flex: 1;
}

.contact-right h1 {
  font-size: 3rem; /* Increase the font size */
  color: #8c5543; /* Original color retained */
}

.contact-right .phone-number,
.contact-right .email {
  font-size: 2rem;
  margin-top: 10px;
  color: #160c08; /* Keep the original color */
}

/* Rounded CTA button */
.cta-button {
  background-color: #f8f8f8;
  color: #333;
  padding: 15px 30px;
  border-radius: 30px; /* Rounded for smooth edges */
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
}

.cta-button:hover {
  background-color: #7a4a38;
  color: white;
}

.about-us {
  background-color: #fdf3ec; /* Neutral beige tone */
  width: 100%; /* 全屏宽度 */
  max-width: 1200px; /* 与上面相同的最大宽度 */
  margin: 0 auto; /* 保证居中 */
  padding: 40px;
  border-radius: 20px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  max-width: 50%;
}

.hero h1 {
  font-size: 2.5rem;
  color: #8c5543;
}

.hero p {
  font-size: 1.2rem;
  margin-top: 20px;
}

.hero-image {
  width: 45%;
}

/* Services section */
.services {
  padding: 40px 0;
  text-align: center;
}

.service-list {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.service-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  width: 30%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Mission section */
.mission {
  text-align: center;
  padding: 30px;
}

/* Office locations section */
.office-locations {
  background-color: #e0e0e0; /* Slightly darker shade for contrast */
  padding: 40px 20px;
  text-align: center;
  margin-top: 30px;
  border-radius: 10px; /* Rounds the edges of the office location section */
}

.offices-container {
  display: flex;
  justify-content: space-around;
}

.office h3 {
  font-size: 1.5rem;
  color: #8c5543;
}

.office p {
  font-size: 1rem;
  margin: 5px 0;
}
</style>
