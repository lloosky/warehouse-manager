<template>
  <header>
    <img src="/img/logo.png" alt="logo" class="header-logo" />
    <ul>
      <li>
        <router-link to="/dashboard">Pulpit</router-link>
      </li>
      <li>
        <router-link to="/orders">Zamówienia</router-link>
      </li>
      <li>
        <router-link to="/warehouse">Magazyn</router-link>
      </li>
      <li>
        <router-link to="/tasks">Zadania</router-link>
      </li>
      <li>
        <router-link to="/calculator">Kalkulator</router-link>
      </li>
      <li @click="logout">
        <strong>Wyloguj</strong>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT');
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: none;
  color: #e18500;
}
li > a {
  color: #e18500;
}
header {
  display: grid;
  grid-template-columns: auto auto;
  align-content: center;
  margin-bottom: 20px;
}
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  font-size: 17px;
  align-content: center;
  margin-bottom: 0px;
  color: #e18500;
}
li {
  display: inline;
  cursor: pointer;
  transition: 0.3s all;
}
.header-logo {
  width: 25%;
}
li:hover {
  transform: translateX(-5px);
}
</style>
