<template>
  <header>
    <div class="logo">
      <ul>
        <li>warehouse</li>
        <li>manager</li>
      </ul>
    </div>
    <ul class="sidebar-menu" @click="closeNavbar">
      <li>
        <router-link to="/dashboard" active-class="active" >Pulpit</router-link>
      </li>
      <li>
        <router-link to="/orders" active-class="active">Zamówienia</router-link>
      </li>
      <li>
        <router-link to="/warehouse" active-class="active">Magazyn</router-link>
      </li>
      <li>
        <router-link to="/tasks" active-class="active">Zadania</router-link>
      </li>
    </ul>
    <ul>
      <li class="logout">
        <a @click="logout">Wyloguj</a>
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
      this.$store.commit("LOGOUT");
    },
    closeNavbar() {
      this.$store.state.menuLeft = -250;
    }
  }
};
</script>

<style scoped>
ul {
  padding-left: 0px;
  width: 100%;
}
header ul li {
  margin-top: 40px;
}
header .logo ul li {
  margin-top: 0px;
}
.logo {
  padding-top: 20px;
  color: black;
}
.logo ul li:last-child {
  letter-spacing: 2px;
  font-weight: 600;
}
.logo ul li {
  font-size: 20px;
}
.logout {
  padding-bottom: 20px;
  margin-top: 0px;
  text-align: center;
  color: black;
  font-weight: 600;
}
.sidebar-menu li {
  width: 100%;
  height: 40px;
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
}
.active {
  color: #3f88c5;
}
.active:after {
  content: "";
  height: 15px;
  width: 15px;
  -webkit-transform: translateX(2px) rotate(45deg);
  transform: translateY(2px) translateX(2px) rotate(45deg);
  left: -7px;
  background-color: #3f88c5;
  position: absolute;
}
.active:before {
  content: "";
  height: 100%;
  width: 3%;
  top: 0px;
  left: 0px;
  background-color: #3f88c5;
  position: absolute;
}
.sidebar-menu li:hover:before {
  content: "";
  height: 100%;
  width: 3%;
  left: -7px;
  background-color: #3f88c5;
  position: absolute;
  animation: sheen 0.5s both;
}
.sidebar-menu li:hover:after {
  content: "";
  height: 15px;
  width: 15px;
  transform: translateX(-5px) rotate(45deg);
  left: -7px;
  background-color: #3f88c5;
  position: absolute;
  animation: sheen 0.3s both;
}
a {
  color: black;
}
a:hover {
  text-decoration: none;
  color: #3f88c5;
}
@keyframes sheen {
  100% {
    left: 0px;
  }
}
@media (max-width: 767px) {
}
</style>
