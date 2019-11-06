<template>
  <div class="login-page">
    <div class="login-container">
      <!-- <img src="/img/logo.png" alt="logo" class="logo-login" /> -->
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
  name: "login",
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
              console.log(
                `Zostaniesz wylogowany za ${authResponse.body.expiresIn /
                  10} min`
              );
              this.userToken = window.btoa(authResponse.body.token);
              localStorage.setItem(
                "authResponse",
                JSON.stringify(authResponse)
              );
              this.$router.push({ path: "/dashboard" });
              this.$store.dispatch("AUTO_LOGOUT", authResponse.body.expiresIn);
            }
          },
          authResponse => {
            if (authResponse.status === 401) {
              console.log("invalid credentials");
            } else {
              console.log("login error");
            }
          }
        );
    }
  }
};
</script>
<style scoped>
form {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto auto;
  align-items: center;
  justify-items: center;
}

</style>
