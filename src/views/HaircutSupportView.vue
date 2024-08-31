<template>
  <div class="container haircut-support">
    <div class="box">
      <h1>Haircut Support for Seniors</h1>
      <p>
        At SilverWell, we understand the importance of personal grooming for seniors. Our haircut
        support service provides professional haircutting right at home, ensuring that our elderly
        community members feel confident and well-groomed without the need to travel.
      </p>
    </div>

    <div v-if="isUser && isLoggedIn" class="box rating-section">
      <h3>Rate this Service</h3>
      <div class="stars">
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
      <p v-if="totalRating">You rated this service: {{ totalRating }}</p>
      <button class="btn-submit" @click="submitRating">Submit Rating</button>
    </div>

    <p v-else-if="isLoggedIn && isAdminUser">Ratings are available only for regular users.</p>
    <p v-else class="box">Please log in to rate this service.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { isAdmin, isUserLoggedIn, getLoggedInUser } from '@/auth.js'

// 检查用户是否已登录
const isLoggedIn = computed(() => isUserLoggedIn())

// 获取当前用户
const user = computed(() => getLoggedInUser())

// 检查用户是否是普通用户
const isUser = computed(() => user.value && !isAdmin())

// 检查用户是否是管理员
const isAdminUser = computed(() => user.value && isAdmin())

// 每颗星星的评分状态（0：无评分，0.5：半颗星，1：整颗星）
const ratings = ref([0, 0, 0, 0, 0])
const hoverRating = ref([0, 0, 0, 0, 0])
const lastRatedIndex = ref(-1) // 跟踪最后被操作的星星索引

// 总评分
const totalRating = computed(() => ratings.value.reduce((acc, cur) => acc + cur, 0))

// 切换评分，控制单颗星星
const toggleRating = (index) => {
  if (canRate(index)) {
    if (ratings.value[index] === 0) {
      ratings.value[index] = 0.5 // 第一次点击设置为半颗星
    } else if (ratings.value[index] === 0.5) {
      ratings.value[index] = 1 // 第二次点击设置为整颗星
    } else {
      ratings.value[index] = 0 // 第三次点击清除评分
    }

    // 更新最后被操作的星星索引
    if (ratings.value[index] === 0) {
      // 如果评分被清除，更新 lastRatedIndex
      if (index === lastRatedIndex.value) {
        // 寻找前一个有评分的星星
        let newIndex = index - 1
        while (newIndex >= 0 && ratings.value[newIndex] === 0) {
          newIndex--
        }
        lastRatedIndex.value = newIndex
      }
    } else {
      // 否则，更新为当前操作的星星
      lastRatedIndex.value = index
    }
  }
}

// 判断是否可以操作某颗星星
const canRate = (index) => {
  if (lastRatedIndex.value === -1) {
    // 如果还没有评分，允许评分第一颗星
    return index === 0
  }

  if (ratings.value[lastRatedIndex.value] === 0.5) {
    // 如果最后评分的星星是半颗星，只允许操作该星星
    return index === lastRatedIndex.value
  } else {
    // 如果最后评分的星星是整颗星，允许操作该星星及下一颗
    return index === lastRatedIndex.value || index === lastRatedIndex.value + 1
  }
}

// 鼠标悬停时显示星级
const handleHoverRating = (index) => {
  if (canRate(index)) {
    hoverRating.value[index] = ratings.value[index] === 1 ? 1 : ratings.value[index] > 0 ? 1 : 0.5
  }
}

// 鼠标离开后重置悬停星级
const resetHover = () => {
  hoverRating.value = [...ratings.value]
}

// 获取每个星星的填充宽度
const getStarWidth = (index) => {
  const rating = hoverRating.value[index] || ratings.value[index]
  if (rating === 1) return 100
  if (rating === 0.5) return 50
  return 0
}

// 提交评分
const submitRating = () => {
  const totalRating = ratings.value.reduce((acc, cur) => acc + cur, 0)
  alert(`You have submitted a rating of ${totalRating} out of 5!`)
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
  display: block; /* 确保按钮一直占据一个块状位置 */
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
