<template>
  <div class="view-container">
    <h2>DETALE </h2>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import moment from "moment";
moment.locale("pl");

export default {
  data() {
    return {};
  },
  methods: {
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  }
};
</script>
<style scoped>
span {
    background-color: rgba(255, 255, 255, 0.418);
    color: black;
}
</style>
