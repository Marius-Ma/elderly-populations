<template>
  <div>
    <Navigator />
    <div class="haircut-support">
      <div class="box">
        <h1>Grocery Shopping</h1>
        <p>
          At SilverWell, we understand the importance of personal grooming for seniors. Our haircut
          support service provides professional haircutting right at home, ensuring that our elderly
          community members feel confident and well-groomed without the need to travel.
        </p>
      </div>
      <RatingComponent activityId="haircut" />
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
.haircut-support {
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
