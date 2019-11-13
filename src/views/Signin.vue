<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
      <ul>
        <li>warehouse</li>
        <li>manager</li>
      </ul>
    </div>
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
              this.userToken = window.btoa(authResponse.body.token);
              localStorage.setItem(
                "authResponse",
                JSON.stringify(authResponse)
              );
              this.$router.push({ path: "/dashboard" });
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
.logo {
  padding-top: 20px;
  color: black;
  justify-self: center; 
}
.logo ul {
  padding: 0;
  list-style: none;
  display: flex;
}
.logo ul li:last-child {
  letter-spacing: 4px;
  font-weight: 800;
}
.logo ul li {
  font-size: 30px;
}
</style>
