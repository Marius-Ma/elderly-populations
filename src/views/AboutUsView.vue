<template>
  <div v-if="aboutUs.introduction">
    <div class="about-us container">
      <Navigator />
      <section class="hero">
        <div class="hero-content">
          <h1>{{ aboutUs.introduction.title }}</h1>
          <p>{{ aboutUs.introduction.description }}</p>
          <button class="cta-button">Let's have a chat</button>
        </div>
        <img src="/images/community.jpg" alt="Concierge Service" class="hero-image" />
      </section>

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
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import aboutUsData from '../assets/json/aboutUs.json'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'

const aboutUs = ref({})

onMounted(() => {
  // 模拟异步加载数据
  aboutUs.value = aboutUsData
})
</script>

<style scoped>
.about-us {
  padding: 20px;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
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
  width: 40%;
}

.services,
.mission {
  padding: 20px 0;
}

.service-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.service-item {
  background-color: #f7e8e3;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 30%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.mission {
  text-align: center;
  background-color: #fef2e4;
  padding: 30px;
}

.mission h2 {
  color: #8c5543;
}
</style>
