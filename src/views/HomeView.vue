<template>
  <Navigator />
  <div class="container">
    <h1>Welcome to SilverWell</h1>
    <p>Discover our services and get involved in the community.</p>

    <!-- Section with three modules -->
    <div class="modules">
      <div class="module">
        <img src="/images/health-resource.jpg" alt="Health Resources" />
        <h2>Health Resources</h2>
        <p>Explore a range of healthcare services dedicated to seniors.</p>
        <router-link to="/health-resources">
          <button>Learn More</button>
        </router-link>
      </div>

      <div class="module">
        <img src="/images/community-support.jpeg" alt="Community Support" />
        <h2>Community Support</h2>
        <p>Join our community and participate in activities for seniors.</p>
        <router-link to="/community-support">
          <button>Join Us</button>
        </router-link>
      </div>

      <div class="module">
        <img src="/images/charity.png" alt="Get Involved" />
        <h2>Get Involved</h2>
        <p>Make a difference by supporting or volunteering in our community.</p>
        <router-link to="/get-involved">
          <button>Join Now</button>
        </router-link>
      </div>
    </div>

    <!-- Footer component -->
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #8c5543;
}

p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.modules {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.module {
  background-color: #f7e3d3;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.module img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.module h2 {
  font-size: 1.8rem;
  margin: 20px 0 10px;
}

.module p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

button {
  background-color: #8c5543;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #7a4a38;
}
</style>
