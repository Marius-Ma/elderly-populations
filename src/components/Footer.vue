<template>
  <footer class="footer mt-5 text-center">
    <div class="footer-line"></div>
    <div class="d-flex justify-content-between align-items-center">
      <p class="footer-text mb-0">© copyright | Privacy Policy | +61 3000000000</p>
      <div class="social-icons mt-2">
        <img src="/icons/google-icon.png" alt="Icon1" class="mr-2" />
        <img src="/icons/facebook-icon.png" alt="Icon2" class="mr-2" />
        <img src="/icons/insta-icon.png" alt="Icon3" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.footer-line {
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  width: 100%;
  margin-top: 10px;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.social-icons img {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}
</style>
