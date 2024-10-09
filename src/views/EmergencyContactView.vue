<template>
  <div>
    <Navigator />
    <div class="emergency-contact">
      <div class="box">
        <h1>Emergency Contact</h1>
        <p>
          Our 24/7 emergency contact service offers immediate assistance in urgent situations.
          Whether it's a medical emergency or any critical need, we ensure quick and reliable
          responses to keep you safe. Always feel secure knowing that help is just a call away, any
          time, any day.
        </p>
      </div>
      <RatingComponent activityId="emergency" />
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
.emergency-contact {
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

.box {
  background-color: #fef8f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
}
</style>
