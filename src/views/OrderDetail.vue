<template>
  <div class="view-container">
    <div class="component-navigation">
      <h2>Zamówienie N-SR-{{id}}</h2>
      <div class="btn-container">
        <router-link to="/orders">
          <button class="accept-btn" @click="close">x</button>
        </router-link>
      </div>
    </div>
    <span>Data:</span>
    <p>{{orders[id-1].data}}</p>
    <span>Zamówiony towar:</span>
    <p>{{orderedProductsDetail(id)}}</p>
    <span>Obsługa:</span>
    <p>{{orders[id-1].employee}}</p>
    <span>Dane osoby zamawiającej:</span>
    <p>{{orders[id-1].name}}</p>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import { showCurrency } from '../utils/showCurrency.js'

import moment from "moment";
moment.locale("pl");

export default {
  name: "order-detail",
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$store.state.widthOfOrderDetail = 0;
    },
    orderedProductsDetail(id) {
      return (
        this.orders[id - 1].orderedProducts.title +
        " " +
        this.orders[id - 1].orderedQuantity +
        " " +
        this.orders[id - 1].orderedProducts.unit +
        " - " +
        new Intl.NumberFormat("pl-PLN", {
          style: "currency",
          currency: "PLN"
        }).format(this.orders[id - 1].orderedProductsValue)
      );
    }
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
.btn-container {
  align-self: center;
  justify-self: center;
}
</style>
