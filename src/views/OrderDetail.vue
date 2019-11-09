<template>
  <div class="view-container">
    <cancel-box
      v-if="showCancelBox"
      :confirmMsg="confirmBoxQuestion"
      @accept="confirmAlert"
      @decline="declineAlert"
    ></cancel-box>
    <realize-box
      v-if="showRealizeBox"
      :realizeMsg="realizeBoxQuestion"
      @accept="confirmRealization"
      @decline="declineRealization"
    ></realize-box>
    <div class="component-navigation">
      <h3>Zamówienie N-SR-{{orders[this.index].id}}</h3>
      <div class="btn-container">
        <router-link to="/orders">
          <button class="button-normal" @click="close">x</button>
        </router-link>
      </div>
    </div>
    <span>Data:</span>
    <p>{{orders[this.index].data}}</p>
    <span>Zamówiony towar:</span>
    <p>{{orderedProductsDetail(this.index)}}</p>
    <span>Obsługa:</span>
    <p>{{orders[this.index].employee}}</p>
    <span>Dane osoby zamawiającej:</span>
    <p>{{orders[this.index].name}}</p>
    <div class="btn-container">
      <button class="accept-btn" @click="deleteOrder">anuluj</button>
      <button class="accept-btn" @click="realizeOrder">zrealizuj</button>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import formatCurrency from "../utils/formatCurrency.js";
import CancelBox from "./../components/CancelBox.vue";
import RealizeBox from "./../components/RealizeBox.vue";

import moment from "moment";
moment.locale("pl");

export default {
  name: "order-detail",
  props: ["id"],
  data() {
    return {
      confirmBoxQuestion: "Na pewno chcesz usunąć to zamówienie ?",
      realizeBoxQuestion: "Na pewno chcesz zrealizować to zamówienie ?",
      showCancelBox: false,
      showRealizeBox: false,
      orderInfo: [],
      index: this.$store.state.orderIndexId[0].index
    };
  },
  methods: {
    confirmAlert(reasonOfCancellation) {
      const id = this.orderInfo[0].orderId;
      if (reasonOfCancellation == "") {
        console.log("Podaj przyczynę usunięcia zamówienia");
      } else {
        this.$store.commit("REMOVE_ORDER", id);
        console.log(`Zamówienie o id ${id} zostało usunięte`);
        console.log(`Przyczyna usunięcia: ${reasonOfCancellation}`);
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
    deleteOrder() {
      this.showCancelBox = true;
      const id = this.$route.params.id;
      this.orderInfo.push({ orderId: id });
      console.log(id);
    },
    realizeOrder() {
      this.showRealizeBox = true;
      const id = this.$route.params.id;
      this.orderInfo.push({ orderId: id });
    },
    async confirmRealization() {
      const id = this.orderInfo[0].orderId;
      const productId = this.orders[id - 1].orderedProducts.id;
      console.log(this.orders[id - 1].name);
      const value =
        this.products[productId - 1].quantity -
        this.orders[id - 1].orderedQuantity;
      if (value < 0) {
        console.log("Niewystaczająca ilość produktu na stanie magazynowym");
      } else {
        try {
          const product = this.orders[id - 1].orderedProducts;
          const { data } = await this.$http.put(
            `${API_HOST}/api/warehouse/${productId}`,
            {
              price: product.price,
              quantity: value,
              title: product.title,
              unit: product.unit
            }
          );
          console.log(
            `Nowy stan magazynowy produktu o id ${this.orders[id - 1].orderedProducts.id} wynosi ${value}`
          );
        } catch {
          console.log("ERROR - order detail");
        }
        this.$store.commit("REMOVE_ORDER", id);
        this.showRealizeBox = false;
        this.$router.push("/orders");
        this.close();
      }
    },
    declineRealization() {
      const id = this.orderInfo[0].orderId;
      this.showRealizeBox = false;
      console.log(`Anulowałeś realizowanie zamówienia o id ${id}`);
      this.orderInfo = [];
    },
    close() {
      this.$store.state.widthOfOrderDetail = 0;
    },
    orderedProductsDetail(id) {
      return (
        this.orders[id].orderedProducts.title +
        " " +
        this.orders[id].orderedQuantity +
        " " +
        this.orders[id].orderedProducts.unit +
        " - " +
        formatCurrency(this.orders[id].orderedProductsValue)
      );
    }
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
    }
  },
  components: {
    cancelBox: CancelBox,
    realizeBox: RealizeBox
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
.component-navigation {
  grid-template-columns: auto auto;
}
</style>
