<template>
  <div class="container-fluid login-page">
    <!-- 右上角导航栏 -->
    <div class="nav-links text-right">
      <a href="#" class="nav-link">About Us</a>
      <a href="#" class="nav-link">Health Resources</a>
      <a href="#" class="nav-link">Community Support</a>
    </div>

    <div class="row align-items-center justify-content-between">
      <!-- 左侧部分：Logo和登录表单 -->
      <div class="col-12 col-md-5 text-left">
        <h1 class="display-4 mb-4">SilverWell</h1>
        <form>
          <div class="form-group">
            <input type="email" class="form-control mb-3" placeholder="Email" />
          </div>
          <div class="form-group position-relative">
            <input type="password" class="form-control mb-3" placeholder="Password" />
            <small class="form-text forgot-password">Forgot password?</small>
          </div>
          <button type="submit" class="btn btn-outline-dark btn-block mb-3 mt-4">Log in</button>
        </form>
        <div class="social-login d-flex justify-content-between">
          <button class="btn btn-outline-secondary google-login mr-2">
            <img src="/icons/google-icon.png" alt="Google" class="mr-2" /> Google
          </button>
          <button class="btn btn-outline-secondary facebook-login">
            <img src="/icons/facebook-icon.png" alt="Facebook" class="mr-2" /> Facebook
          </button>
        </div>
      </div>

      <!-- 中间的竖线 -->
      <div class="col-12 col-md-1 text-center my-3 my-md-0">
        <div class="vertical-line"></div>
        <div class="not-member-text">Not a member?</div>
        <div class="vertical-line"></div>
      </div>

      <!-- 右侧部分：注册提示 -->
      <div class="col-12 col-md-5 text-center">
        <div class="create-account-box">
          <button class="btn btn-light btn-block create-account-button">Create an account</button>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
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
  </div>
</template>

<style scoped>
.login-page {
  background-color: #ddaa99;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
}

.nav-links {
  padding-top: 20px;
  text-align: right;
  margin-bottom: 30px;
}

.nav-link {
  color: #4d4d4d; /* 深灰色 */
  font-weight: bold;
  margin-right: 15px;
  text-decoration: none;
  display: inline-block;
}

.nav-link:hover {
  text-decoration: underline;
}

h1.display-4 {
  font-weight: bold;
}

.form-control {
  background-color: #f5c6c6;
  border: none;
  border-radius: 10px;
  padding: 10px;
}

.forgot-password {
  position: absolute;
  right: 0;
  top: 100%;
  color: #666;
  font-size: 0.9rem;
}

.btn-dark,
.btn-light,
.btn-outline-dark {
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%; /* 确保按钮占据整个宽度 */
}

.btn-outline-dark:hover {
  background-color: #000;
  color: #fff;
}

.google-login,
.facebook-login {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 180px; /* 设定按钮宽度 */
  margin-top: 10px;
}

.google-login img,
.facebook-login img {
  width: 20px; /* 设定图片宽度 */
  height: auto; /* 自动调整高度 */
}

.create-account-box {
  background-color: transparent; /* 移除多余的背景 */
  border-radius: 10px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}

.create-account-button {
  background-color: #ffffff; /* 只保留按钮的背景 */
  border-radius: 10px;
  padding: 10px 20px;
}

.not-member-text {
  color: rgba(255, 255, 255, 0.9); /* 纯白色带阴影 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  margin: 15px 0;
}

.vertical-line {
  border-left: 2px solid rgba(255, 255, 255, 0.7);
  height: 50px;
  margin: auto;
}

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

.social-login {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.social-icons img {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}
</style>
