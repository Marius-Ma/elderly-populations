<template>
  <div>
    <Navigator />
    <div class="book-club">
      <div class="box">
        <h1>Book Club for Seniors</h1>
        <p>
          At SilverWell, our weekly book club offers seniors a wonderful opportunity to gather,
          read, and discuss books in a relaxed and friendly environment. Whether you're a book lover
          or looking for a social group to join, our book club brings people together to share
          stories, ideas, and friendship. Come and enjoy good company while diving into great
          literature!
        </p>
      </div>
      <RatingComponent activityId="bookClub" />
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
.book-club {
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
