<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand" href="/dashboard">
      warehouse<strong>manager</strong>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">Pulpit</router-link>
        </li>
                <li class="nav-item">
          <router-link to="/orders" class="nav-link">Zamówienia</router-link>
        </li>
                <li class="nav-item">
          <router-link to="/warehouse" class="nav-link">Magazyn</router-link>
        </li>
                <li class="nav-item">
          <router-link to="/tasks" class="nav-link">Zadania</router-link>
        </li>
                <li class="nav-item" >
          <a class="nav-link" @click="logout">Wyloguj</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
    }
  }
};
</script>

<style scoped>
.navbar {
  padding: 0px;
  margin-bottom: 10px;
}
.navbar-brand {
  padding-top: 0px;
  color: white;
}
.navbar-expand-lg .navbar-collapse {
  justify-content: flex-end;
}
strong {
  font-size: 1.25rem;
}
.navbar-light .navbar-nav .nav-link {
  color: white;
  cursor: pointer;
}
.navbar-light .navbar-brand:hover {
  color: white;
}
@media (max-width: 767px) {
}
</style>
