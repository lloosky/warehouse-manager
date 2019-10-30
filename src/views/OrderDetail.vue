<template>
  <div class="view-container">
      <h4>{{orders[id-1].name}}</h4>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import moment from "moment";
moment.locale("pl");

export default {
  name: "orderDetail",
  props: ["id"],
  data() {
    return {
    };
  },
  methods: {},
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

</style>
