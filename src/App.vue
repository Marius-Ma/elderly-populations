<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <div :style="{ fontSize: fontSize }">
    <router-view />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const fontSize = computed(() => store.getters.currentFontSize)

// 监听 fontSize 的变化并更新全局变量
watch(fontSize, (newSize) => {
  document.documentElement.style.setProperty('--global-font-size', newSize)
})
</script>

<style>
/* App.vue */
body {
  background-color: #ddaa99 !important;
  color: #333;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #8c5543;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
}

.btn:hover {
  background-color: #7a4a38;
}

a {
  color: #8c5543;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.bg-light {
  background-color: #ddaa99;
}

.bg-dark {
  background-color: #333;
  color: #fff;
}
</style>
