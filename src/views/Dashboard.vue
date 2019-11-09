<template>
  <div class="view-container">
    <div class="component-navigation">
      <h2>Pulpit</h2>
      <h4 class="btn-container">{{getOrderDate}}</h4>
    </div>
    <div class="dashboard">
      <div class="board">
        <div class="board-title">
          <div>Ostatnie zamówienie: N-SR-{{this.orders[this.orders.length-1].id}}</div>
        </div>
        <div class="board-sub-title">Wartość:</div>
        <div
          class="board-sub-body"
        >{{formatCurrency(this.orders[this.orders.length-1].orderedProductsValue)}}</div>
        <div class="board-body"></div>
      </div>
      <div class="board">
        <div class="board-title">
          <div>Magazyn</div>
        </div>
        <div class="board-sub-title">Ilość produktów:</div>
        <div class="board-sub-body">{{this.products.length}}</div>
        <div class="board-body"></div>
      </div>
      <div class="board">
        <div class="board-title">
          <div>Test</div>
        </div>
        <div class="board-sub-title"></div>
        <div class="board-sub-body"></div>
        <div class="board-body"></div>
      </div>
      <div class="board">
        <div class="board-title">
          <div>Test</div>
        </div>
        <div class="board-sub-title"></div>
        <div class="board-sub-body"></div>
        <div class="board-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import formatCurrency from "../utils/formatCurrency.js";
import moment from "moment";
moment.locale("pl");

export default {
  name: "dashboard",
  data() {
    return {};
  },
  methods: {
    formatCurrency
  },
  created() {
    this.$store.commit("GET_ORDERLIST");
    this.$store.commit("GET_PRODUCTLIST");
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    products() {
      return this.$store.state.products;
    },
    getOrderDate() {
      return moment().format("ll");
    }
  }
};
</script>
<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 10px;
}
.btn-container {
  color: black;
}
.board {
  display: grid;
  grid-template-rows: 15% 35% 50%;
  background-color: #ffffff;
  height: 40vh;
  align-items: center;
  justify-items: center;
  color: black;
}
.board-title {
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(216, 75, 75, 1) 0%,
    rgba(238, 139, 63, 1) 100%
  );
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 15px;
  color: white;
  display: grid;
  justify-items: center;
  align-items: center;
  border-bottom: 1px solid #d2d2d2;
}
.board-sub-title {
  font-size: 20px;
}
.board-sub-body {
  font-size: 50px;
  align-self: stretch;
}
</style>
