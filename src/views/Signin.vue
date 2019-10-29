<template>
  <div class="login-page">
    <div class="login-container">
      <img src="/img/logo.png" alt="logo" class="logo-login" />
      <form action>
        <label for>Użytkownik:</label>
        <input type="text" v-model="username" />

        <label for>Hasło:</label>
        <input type="password" v-model="password" />
      </form>
      <button class="submit-button" @click="login">zaloguj</button>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;

export default {
  name: 'login',
  data() {
    return {
      username: this.$store.state.username,
      password: this.$store.state.password,
      encodedUsername: this.$store.state.encodedUsername,
      userToken: this.$store.state.userToken
    };
  },
  methods: {
    login() {
      this.$http
        .post(`${API_HOST}/auth/token`, {
          username: this.username,
          password: this.password
        })
        .then(
          authResponse => {
            console.log(authResponse);
            if (authResponse.status === 201) {
              this.userToken = window.btoa(authResponse.body.token);
              localStorage.setItem(
                'authResponse',
                JSON.stringify(authResponse)
              );
              this.$router.push({ path: '/dashboard' });
            }
          },
          authResponse => {
            if (authResponse.status === 401) {
              console.log('invalid credentials');
            } else {
              console.log('login error');
            }
          }
        );
    }
  }
};
</script>
<style>
.logo-login {
  width: 100%;
  margin-bottom: 15%;
}
.login-page {
  display: grid;
  height: 100vh;
  grid-template-columns: auto;
  grid-template-rows: auto;
  align-content: center;
  justify-content: center;
}
.login-container {
  display: grid;
  height: 60vh;
  width: 45vh;
  background-color: #414141;
  border: 1px solid #e18500;
  grid-template-columns: 80%;
  align-content: center;
  justify-content: center;
}
label,
input,
select {
  width: 100%;
}
label {
  font-size: 15px;
  color: #e18500;
}
.submit-button {
  font-size: 20px;
  color: #e18500;
  margin-top: 20px;
  border: 1px solid #e18500;
  padding: 5px;
  transition: 0.2s all;
}
.submit-button:hover {
  color: #e18500;
  background-color: #fadcaf;
}
@media (max-width: 767px) {
  .login-container {
    height: 100vh;
    grid-template-columns: 100%;
    background-color: transparent;
    border: none;
  }
  .logo-login {
    margin-top: 0%;
  }
}
</style>
