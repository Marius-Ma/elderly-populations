<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <router-view></router-view>
  </main>
</template>

<style>
/* App.vue */
body {
  background-color: #ddaa99 !important;
  color: #333;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

/* 全局容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 全局按钮样式 */
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

/* 全局链接样式 */
a {
  color: #8c5543;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 全局背景色的全局样式 */
.bg-light {
  background-color: #ddaa99;
}

.bg-dark {
  background-color: #333;
  color: #fff;
}
</style>
