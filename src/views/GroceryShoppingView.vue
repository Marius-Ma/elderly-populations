<template>
  <div>
    <Navigator />
    <div class="grocery-support">
      <div class="box">
        <h1>Grocery Shopping Assistance</h1>
        <p>
          At SilverWell, we offer personalized grocery shopping services for seniors. Whether it's
          picking up fresh produce or assisting with weekly shopping, our dedicated team ensures
          that groceries are delivered right to your door. We take the hassle out of grocery
          shopping, providing convenience and care with every delivery.
        </p>
      </div>
      <RatingComponent activityId="grocery" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import RatingComponent from '@/components/RatingComponent.vue'
</script>

<style scoped>
.grocery-support {
  background-color: #fef8f5;
  padding: 30px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  color: #8c5543;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.stars {
  font-size: 2.5rem;
  color: #ccc;
  display: inline-block;
  margin-bottom: 15px;
}

.box {
  background-color: #fef8f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}

.box h2 {
  font-size: 2rem;
  color: #8c5543;
  margin-bottom: 10px;
}

.box p {
  font-size: 1rem;
  color: #333;
}
</style>
