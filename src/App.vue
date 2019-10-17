<template>
  <div id="application">
    <app-header v-if="$route.meta.hideNavigation"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>
<style>
* {
  font-family: AvantGarde Bk BT;
  box-sizing: border-box;
}
body {
  color: #e18500;
  padding: 15px;
  background: linear-gradient(
      to left,
      rgba(65, 65, 65, 0.79),
      rgba(65, 65, 65, 0.79)
    ),
    url("..//src/background.jpg");
  height: 100vh;
  background-repeat: no-repeat;
}
h2 {
  margin-bottom: 0;
}
</style>
