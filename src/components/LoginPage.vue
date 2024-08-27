<template>
  <div class="login-page">
    <div class="left-section">
      <div class="logo">
        <h1>SilverWell</h1>
      </div>
    </div>
    <div class="right-section">
      <nav class="navigation">
        <a href="#">About Us</a>
        <a href="#">Health Resources</a>
        <a href="#">Community Support</a>
        <a href="#">Contact Us</a>
      </nav>
      <div class="login-form">
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="First Name" />
        <button>Login</button>
        <button>Sign up</button>
      </div>
      <a href="#" class="admin-login">Login as admin</a>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  background-color: #ddaa99;
  min-height: 100vh;
  display: flex;
  align-items: center; /* Centers content vertically */
  justify-content: space-between; /* Centers content horizontally */
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
}

.left-section {
  flex: 1;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center; /* Center vertically */
}

.logo h1 {
  font-size: 3em; /* Adjust the size as needed */
  color: #333;
}

.navigation {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.navigation a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.login-form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.social-login {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.social-login button {
  background: none;
  border: none;
  cursor: pointer;
}

.admin-login {
  color: #666;
  text-decoration: none;
  font-size: 0.9em;
}
</style>
