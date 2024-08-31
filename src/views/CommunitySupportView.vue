<template>
  <div class="community-support container">
    <Navigator />
    <div class="header">
      <h1>Community Support</h1>
      <p>We are here to provide comprehensive support for our community members.</p>
    </div>

    <section class="support-section">
      <h2>Daily Support</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/grocery.jpg" alt="Grocery Shopping" />
          <h3>Grocery Shopping</h3>
          <p>Assistance with weekly grocery shopping and delivery.</p>
          <router-link to="/support/grocery" class="btn">Learn More</router-link>
        </div>
        <div class="support-item">
          <img src="/images/haircut.jpg" alt="Haircut Services" />
          <h3>Haircut Services</h3>
          <p>Regular haircut and grooming services at your convenience.</p>
          <router-link to="/community-support/haircut" class="btn">Learn More</router-link>
        </div>
      </div>
    </section>

    <section class="support-section">
      <h2>Community Activities</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/bookclub.jpg" alt="Book Club" />
          <h3>Book Club</h3>
          <p>Join our weekly book club to engage with fellow members.</p>
          <router-link to="/activities/bookclub" class="btn">Join Now</router-link>
        </div>
        <div class="support-item">
          <img src="/images/baker.jpg" alt="Baker Class" />
          <h3>Baker Class</h3>
          <p>Participate in our social baker class for some fun and enjoy the food.</p>
          <router-link to="/activities/baker" class="btn">Join Now</router-link>
        </div>
      </div>
    </section>

    <section class="support-section">
      <h2>Emergency Support</h2>
      <div class="support-list">
        <div class="support-item">
          <img src="/images/medical.png" alt="Medical Assistance" />
          <h3>Medical Assistance</h3>
          <p>Quick access to medical help in case of emergencies.</p>
          <router-link to="/support/medical" class="btn">Learn More</router-link>
        </div>
        <div class="support-item">
          <img src="/images/emergency.jpg" alt="Emergency Contact" />
          <h3>Emergency Contact</h3>
          <p>24/7 emergency contact services for immediate support.</p>
          <router-link to="/support/emergency-contact" class="btn">Learn More</router-link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
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

.btn {
  padding: 10px 20px;
  background-color: #8c5543;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.btn:hover {
  background-color: #7a4a38;
}
</style>
