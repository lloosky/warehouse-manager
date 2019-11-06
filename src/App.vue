<template>
  <div id="application">
    <div class="header">
      <app-header v-if="$route.meta.hideNavigation"></app-header>
    </div>
    <div class="app-body">
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
  }
};
</script>
<style>
@import "./assets/css/style.css";

</style>
