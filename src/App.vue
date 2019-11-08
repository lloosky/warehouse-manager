<template>
  <div id="application">
    <div class="header">
      <button @click="openMenu" class="menu-button">&#9776;</button>
      <app-header
        v-if="$route.meta.hideNavigation"
        :style="{width: this.$store.state.menuWidth + '%', left: this.$store.state.menuLeft + 'px'}"
      ></app-header>
    </div>
    <div class="app-body" @click="closeMenu">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  methods: {
    openMenu() {
      this.$store.state.menuWidth = 60;
      this.$store.state.menuLeft = 0;
    },
    closeMenu() {
      this.$store.state.menuWidth = 0;
      this.$store.state.menuLeft = -100;
    }
  },
  created() {
    this.$store.state.menuWidth = 0;
    this.$store.state.menuLeft = -100;
  }
};
</script>
<style>
@import "./assets/css/style.css";
.menu-button {
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  background-color: transparent;
  color: rgba(216, 75, 75, 1);
  font-size: 2.5em;
  display: none;
}
</style>
