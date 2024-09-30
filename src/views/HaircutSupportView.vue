<template>
  <div>
    <Navigator />
    <div class="haircut-support">
      <div class="box">
        <h1>Haircut Support for Seniors</h1>
        <p>
          At SilverWell, we understand the importance of personal grooming for seniors. Our haircut
          support service provides professional haircutting right at home, ensuring that our elderly
          community members feel confident and well-groomed without the need to travel.
        </p>
      </div>

      <div class="box rating-section">
        <h3>Overall Rating: {{ averageRating }} / 5</h3>
        <p>{{ totalRatings }} users have rated this service.</p>

        <div v-if="isUser && isLoggedIn" class="stars">
          <span
            v-for="(, index) in 5"
            :key="index"
            class="star"
            @click="toggleRating(index)"
            @mousemove="handleHoverRating(index)"
            @mouseleave="resetHover"
            :style="{ cursor: canRate(index) ? 'pointer' : 'not-allowed' }"
          >
            <span class="star-inner" :style="{ width: `${getStarWidth(index)}%` }">★</span>
            ★
          </span>
        </div>
        <p v-if="totalRating">You rated this service: {{ totalRating }}</p>
        <button v-if="isUser && isLoggedIn" class="btn-submit" @click="submitRating">
          Submit Rating
        </button>
        <p v-else-if="isLoggedIn && isAdminUser">Ratings are available only for regular users.</p>
        <p v-else class="box">Please log in to rate this service.</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { ref, computed, onMounted } from 'vue'
import { isAdmin, isUserLoggedIn, getLoggedInUser } from '@/auth.js'

// Simulated backend using localStorage for ratings
const storedRatings = ref(JSON.parse(localStorage.getItem('serviceRatings')) || [])
const totalRatings = ref(storedRatings.value.length)
const totalRatingSum = ref(storedRatings.value.reduce((acc, rating) => acc + rating, 0))

// Calculate average rating
const averageRating = computed(() => {
  if (totalRatings.value === 0) return 0
  return (totalRatingSum.value / totalRatings.value).toFixed(1)
})

const isLoggedIn = computed(() => isUserLoggedIn())
const user = computed(() => getLoggedInUser())
const isUser = computed(() => user.value && !isAdmin())
const isAdminUser = computed(() => user.value && isAdmin())

// User-specific ratings
const ratings = ref([0, 0, 0, 0, 0])
const hoverRating = ref([0, 0, 0, 0, 0])
const lastRatedIndex = ref(-1)

const totalRating = computed(() => ratings.value.reduce((acc, cur) => acc + cur, 0))

// Strict star rating logic
const toggleRating = (index) => {
  if (canRate(index)) {
    if (ratings.value[index] === 0) {
      ratings.value[index] = 0.5
    } else if (ratings.value[index] === 0.5) {
      ratings.value[index] = 1
    } else {
      ratings.value[index] = 0
    }
    // Update last rated index
    if (ratings.value[index] === 0) {
      if (index === lastRatedIndex.value) {
        let newIndex = index - 1
        while (newIndex >= 0 && ratings.value[newIndex] === 0) {
          newIndex--
        }
        lastRatedIndex.value = newIndex
      }
    } else {
      lastRatedIndex.value = index
    }
  }
}

const canRate = (index) => {
  if (lastRatedIndex.value === -1) {
    return index === 0
  }
  if (ratings.value[lastRatedIndex.value] === 0.5) {
    return index === lastRatedIndex.value
  } else {
    return index === lastRatedIndex.value || index === lastRatedIndex.value + 1
  }
}

const handleHoverRating = (index) => {
  if (canRate(index)) {
    hoverRating.value[index] = ratings.value[index] === 1 ? 1 : ratings.value[index] > 0 ? 1 : 0.5
  }
}

const resetHover = () => {
  hoverRating.value = [...ratings.value]
}

const getStarWidth = (index) => {
  const rating = hoverRating.value[index] || ratings.value[index]
  if (rating === 1) return 100
  if (rating === 0.5) return 50
  return 0
}

// Submit rating and store in localStorage
const submitRating = () => {
  const userTotalRating = ratings.value.reduce((acc, cur) => acc + cur, 0)
  if (userTotalRating > 0) {
    storedRatings.value.push(userTotalRating)
    totalRatings.value = storedRatings.value.length
    totalRatingSum.value = storedRatings.value.reduce((acc, rating) => acc + rating, 0)
    localStorage.setItem('serviceRatings', JSON.stringify(storedRatings.value))
    alert(`You have submitted a rating of ${userTotalRating} out of 5!`)
  } else {
    alert('Please select a rating before submitting.')
  }
}
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

.rating-section {
  margin-top: 20px;
  text-align: center;
}

.stars {
  font-size: 2.5rem;
  color: #ccc;
  display: inline-block;
  margin-bottom: 15px;
}

.star {
  display: inline-block;
  position: relative;
  color: #ccc;
}

.star-inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  color: #ffcc00;
  overflow: hidden;
  transition: width 0.2s ease;
}

.btn-submit {
  padding: 10px 20px;
  background-color: #8c5543;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;
  display: block;
}

.btn-submit:hover {
  background-color: #7a4a38;
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
