<template>
  <div>
    <Navigator />
    <div class="medical-assistance">
      <div class="box">
        <h1>Medical Assistance</h1>
        <p>
          Immediate access to professional medical support for seniors. Whether it’s an emergency
          situation or regular check-up, our medical assistance service ensures that help is just a
          call away. Stay safe and cared for with our dedicated health team, available when you need
          them the most.
        </p>
      </div>
      <RatingComponent activityId="medical" />
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
.medical-assistance {
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
