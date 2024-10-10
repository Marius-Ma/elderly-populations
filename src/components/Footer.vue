<template>
  <footer class="footer">
    <div class="footer-line"></div>
    <div class="d-flex justify-content-between align-items-center">
      <p class="footer-text mb-0">
        <router-link to="/" class="footer-link">© copyright</router-link> |
        <a
          href="https://www.oaic.gov.au/privacy"
          class="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          >Privacy Policy</a
        >
        | +61 3000000000
      </p>
      <div class="social-icons mt-2">
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/google-icon.png" alt="Google" class="mr-2" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/facebook-icon.png" alt="Facebook" class="mr-2" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/icons/insta-icon.png" alt="Instagram" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: auto;
  width: 100%;
  background-color: #ddaa99;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.footer-line {
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  margin-top: 10px;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.footer-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
}

.social-icons img {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}
</style>
