<template>
  <div class="rating-section">
    <h3>Overall Rating: {{ averageRating }} / 5</h3>
    <p>{{ totalRatings }} users have rated this service.</p>

    <div v-if="isUser && isLoggedIn" class="stars">
      <span
        v-for="(star, index) in 5"
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
    <p v-if="userRating">You rated this service: {{ userRating }}</p>
    <button v-if="isUser && isLoggedIn" class="btn-submit" @click="submitRating">
      Submit Rating
    </button>
    <p v-else-if="isLoggedIn && isAdminUser">Ratings are available only for regular users.</p>
    <p v-else>Please log in to rate this service.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const props = defineProps({
  activityId: String
})

const db = getFirestore()
const auth = getAuth()

// 用于存储和展示评分
const totalRatings = ref(0)
const totalRatingSum = ref(0)
const userRating = ref(0)

// 计算平均评分
const averageRating = computed(() => {
  return totalRatings.value === 0 ? 0 : (totalRatingSum.value / totalRatings.value).toFixed(1)
})

// 用户状态
const isLoggedIn = ref(false)
const isUser = ref(false)
const isAdminUser = ref(false)
let currentUser = null

// 获取当前用户
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      currentUser = firebaseUser
      isLoggedIn.value = true
      isAdminUser.value = firebaseUser.email.endsWith('@student.monash.edu')
      isUser.value = !isAdminUser.value

      // 获取用户之前的评分
      loadUserRating()
    } else {
      isLoggedIn.value = false
      currentUser = null
    }
  })
})

// 加载用户对当前活动的评分
const loadUserRating = async () => {
  if (!currentUser) return

  const activityRef = doc(db, 'activities', props.activityId)
  const activitySnapshot = await getDoc(activityRef)

  if (activitySnapshot.exists()) {
    const activityData = activitySnapshot.data()
    totalRatings.value = activityData.totalRatings || 0
    totalRatingSum.value = activityData.totalRatingSum || 0

    // 查找用户之前的评分
    const userRatings = activityData.userRatings || {}
    userRating.value = userRatings[currentUser.uid] || 0
  }
}

// 用户给活动打分
const submitRating = async () => {
  if (!currentUser || userRating.value === 0) return

  const activityRef = doc(db, 'activities', props.activityId)
  const activitySnapshot = await getDoc(activityRef)

  if (activitySnapshot.exists()) {
    const activityData = activitySnapshot.data()
    const previousRating = activityData.userRatings?.[currentUser.uid] || 0

    // 更新总评分和总评分次数
    const newTotalRatingSum = activityData.totalRatingSum - previousRating + userRating.value
    const newTotalRatings =
      previousRating === 0 ? activityData.totalRatings + 1 : activityData.totalRatings

    // 更新活动评分信息
    await updateDoc(activityRef, {
      totalRatingSum: newTotalRatingSum,
      totalRatings: newTotalRatings,
      [`userRatings.${currentUser.uid}`]: userRating.value
    })

    totalRatingSum.value = newTotalRatingSum
    totalRatings.value = newTotalRatings
    alert('Thank you for rating!')
  }
}

// 星星评分逻辑
const ratings = ref([0, 0, 0, 0, 0])
const hoverRating = ref([0, 0, 0, 0, 0])
const lastRatedIndex = ref(-1)

const toggleRating = (index) => {
  if (canRate(index)) {
    if (ratings.value[index] === 0) {
      ratings.value[index] = 0.5
    } else if (ratings.value[index] === 0.5) {
      ratings.value[index] = 1
    } else {
      ratings.value[index] = 0
    }
    // 更新 userRating，确保界面实时显示评分
    userRating.value = ratings.value.reduce((acc, cur, idx) => acc + (ratings.value[idx] || 0), 0)
    // 更新 lastRatedIndex
    if (ratings.value[index] === 0) {
      let newIndex = index - 1
      while (newIndex >= 0 && ratings.value[newIndex] === 0) {
        newIndex--
      }
      lastRatedIndex.value = newIndex
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
</script>

<style scoped>
.rating-section {
  margin-top: 20px;
  text-align: center;
}

.stars {
  font-size: 2.5rem;
  color: #ccc;
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
</style>
