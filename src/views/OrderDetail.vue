<template>
  <div class="view-container">
    <cancel-box
      v-if="showCancelBox"
      :confirmMsg="confirmBoxQuestion"
      @accept="confirmAlert"
      @decline="declineAlert"
    ></cancel-box>
    <div class="component-navigation">
      <h2>Zamówienie N-SR-{{id}}</h2>
      <div class="btn-container">
        <router-link to="/orders">
          <button class="button-normal" @click="close">x</button>
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
    <div class="btn-container">
      <button class="accept-btn" @click="deleteOrder(id)">anuluj</button>
      <button class="button-normal">zrealizuj</button>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import showCurrency from "../utils/showCurrency.js";
import CancelBox from "./../components/CancelBox.vue";

import moment from "moment";
moment.locale("pl");

export default {
  name: "order-detail",
  props: ["id"],
  data() {
    return {
      confirmBoxQuestion: "Na pewno chcesz usunąć to zamówienie ?",
      showCancelBox: false,
      orderInfo: []
    };
  },
  methods: {
    confirmAlert(reasonOfCancel) {
      const id = this.orderInfo[0].orderId;
      if (reasonOfCancel == "") {
        console.log("Podaj przyczynę usunięcia zamówienia");
      } else {
        this.$store.commit("REMOVE_ORDER", id);
        console.log(`Zamówienie o id ${id} zostało usunięte`);
        console.log(`Przyczyna usunięcia: ${reasonOfCancel}`);
        this.showCancelBox = false;
        this.orderInfo = [];
        this.$store.state.widthOfOrderDetail = 0;
        this.$router.push({ path: "/orders" });
      }
    },
    declineAlert() {
      this.orderInfo = [];
      this.showCancelBox = false;
      console.log("Anulowałeś usuwanie zamówienia");
    },
    deleteOrder(id) {
      this.showCancelBox = true;
      this.orderInfo.push({ orderId: id });
      console.log(this.orderInfo);
    },
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
        showCurrency(this.orders[id - 1].orderedProductsValue)
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
  },
  components: {
    cancelBox: CancelBox
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
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 5px;
}
.accept-btn {
  background-color: #e13800;
  border: 1px solid #8c0909;
  color: white;
}
</style>
