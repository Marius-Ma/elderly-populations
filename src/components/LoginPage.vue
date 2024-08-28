<template>
  <div class="container-fluid login-page">
    <div class="nav-links text-right">
      <a href="#" class="nav-link">About Us</a>
      <a href="#" class="nav-link">Health Resources</a>
      <a href="#" class="nav-link">Community Support</a>
    </div>

    <div class="row align-items-center justify-content-between">
      <div class="col-md-5 text-left">
        <h1 class="display-4 mb-4">SilverWell</h1>
        <form>
          <div class="form-group">
            <input type="email" class="form-control mb-3" placeholder="Email" />
          </div>
          <div class="form-group">
            <input type="password" class="form-control mb-2" placeholder="Password" />
            <small class="form-text">Forgot password?</small>
          </div>
          <button type="submit" class="btn btn-dark btn-block mb-3">Log in</button>
        </form>
        <div class="social-login text-left">
          <button class="btn btn-outline-secondary mb-2">
            <img src="/icons/google-icon.png" alt="Google" class="mr-2" /> Google
          </button>
          <button class="btn btn-outline-secondary">
            <img src="/icons/facebook-icon.png" alt="Facebook" class="mr-2" /> Facebook
          </button>
        </div>
      </div>

      <div class="col-md-5 text-center">
        <div class="create-account-box p-4">
          <p class="mb-4">Not a member?</p>
          <button class="btn btn-light btn-block">Create an account</button>
        </div>
      </div>
    </div>

    <footer class="footer mt-5 text-center">
      <p class="mb-0">© copyright | Privacy Policy | +61 3000000000</p>
      <div class="social-icons mt-2">
        <img src="/icons/google-icon.png" alt="Icon1" class="mr-2" />
        <img src="/icons/facebook-icon.png" alt="Icon2" class="mr-2" />
        <img src="/icons/insta-icon.png" alt="Icon3" />
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
  margin-bottom: 30px;
}

.nav-link {
  color: #333;
  font-weight: bold;
  margin-right: 15px;
  text-decoration: none;
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

.form-text {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}

.btn-dark,
.btn-light {
  border-radius: 10px;
  padding: 10px 20px;
}

.create-account-box {
  background-color: #f5c6c6;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.footer {
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 10px;
  color: #333;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer p {
  margin: 0;
}

.social-login button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 220px;
}

.social-login img {
  width: 20px;
  height: 20px;
}

.social-icons img {
  width: 25px;
  height: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  position: relative;
}

.form-group small {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 0.9rem;
}
</style>
