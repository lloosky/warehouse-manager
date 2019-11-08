<template>
  <div class="view-container">
    <div @click="openingAddingOrder" class="add-button">&#43;</div>
    <div class="modal-container" :style="{width: isWidth + '%'}">
      <div class="modal-box" v-if="show">
        <form action>
          <label for>Imię i nazwisko:</label>
          <input type="text" v-model="customerName" />
          <label>Produkt:</label>
          <select
            id="productList"
            v-model="orderedProducts"
            @change="worthOfOrder(orderedProducts)"
          >
            <option value>Wybierz</option>
            <option
              v-bind:value="product"
              v-for="product in products"
              :key="product.id"
            >{{product.title}} - {{product.quantity}} {{product.unit}}</option>
          </select>
          <label>Ilość:</label>
          <input type="number" v-model="orderedQuantity" @change="worthOfOrder(orderedProducts)" />
          <label>Obsługa:</label>
          <select v-model="whoServes">
            <option
              v-for="serve in staff"
              v-bind:value="serve.worker"
              :key="serve.id"
            >{{ serve.worker }}</option>
          </select>
        </form>
        <div class="modal-btn-container">
          <button class="button-normal" @click="clearInputs">wyczyść</button>
          <button class="button-normal" @click="cancelAddingOrder">anuluj</button>
          <button
            style="width:50%;justify-self:end;"
            class="button-normal accept-btn"
            @click="addOrder"
          >dodaj</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Zamówienia</h2>
      <div class="btn-container">
        <input type="text" placeholder="wyszukaj" />
      </div>
    </div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Numer zamówienia</span>
      <span>Imię i Nazwisko</span>
      <span>Wartość</span>
      <span>Obsługa</span>
      <span>Data</span>
    </div>
    <div class="table-row" v-for="(order, index) in orders " :key="index">
      <span>{{index+1}}</span>
      <span>N-SR-{{order.id}}</span>
      <span>{{order.name}}</span>
      <span>{{formatCurrency(order.orderedProductsValue)}}</span>
      <span>{{order.employee}}</span>
      <span>{{order.data}}</span>
      <span>
        <router-link :to="`orders/${index + 1}`">
          <button class="accept-btn" @click="showOrderDetail">Otwórz</button>
        </router-link>
      </span>
    </div>
    <div class="order-details" :style="{width: this.$store.state.widthOfOrderDetail + '%'}">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import formatCurrency from "../utils/formatCurrency.js";
import moment from "moment";
moment.locale("pl");

export default {
  name: "orders",
  data() {
    return {
      show: false,
      customerName: "",
      orderedProducts: "",
      orderedProductsPrice: "",
      orderedQuantity: "",
      orderValue: "",
      whoServes: "",
      data: "",
      selected: "",
      isWidth: 0
    };
  },
  methods: {
    formatCurrency,
    openingAddingOrder() {
      this.isWidth = 50;
      this.show = true;
      this.clearInputs();
    },
    showOrderDetail() {
      this.$store.state.widthOfOrderDetail = 50;
    },
    worthOfOrder(orderedProducts) {
      const result = orderedProducts.price * this.orderedQuantity;
      this.orderValue = result;
    },
    clearInputs() {
      this.customerName = "";
      this.orderedProducts = "";
      this.orderValue = "";
      this.orderedQuantity = "";
      this.whoServes = "";
    },
    cancelAddingOrder() {
      this.clearInputs();
      this.isWidth = 0;
      this.show = false;
    },
    addOrder() {
      let txt = localStorage.getItem("authResponse");
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      this.$http
        .post(
          `${API_HOST}/api/orders`,
          {
            name: this.customerName,
            orderedProducts: this.orderedProducts,
            orderedProductsValue: this.orderValue,
            orderedQuantity: this.orderedQuantity,
            employee: this.whoServes,
            data: this.getOrderDate
          },
          {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        )
        .then(data => {
          console.log(data);
          this.orders.push({
            name: this.customerName,
            orderedProducts: this.orderedProducts,
            orderedProductsValue: this.orderValue,
            orderedQuantity: this.orderedQuantity,
            employee: this.whoServes,
            data: this.getOrderDate
          });
        })
        .catch(() => {
          console.log("ERROR");
        });
      this.isWidth = 0;
      this.show = false;
      this.clearInputs();
      this.$store.commit("GET_ORDERLIST");
      console.log(this.orders);
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
    },
    staff() {
      return this.$store.state.staff;
    },
    getOrderDate() {
      return moment().format("ll");
    }
  }
};
</script>
<style scoped>
.table-header,
.table-row {
  grid-template-columns: 5% 20% 20% 20% 15% 12% 8%;
}
.order-details {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-color: #ffffff;
  border: 1px solid #d2d2d2;
  transition: 0.2s all;
  display: grid;
  align-items: center;
  justify-content: center;
}
</style>
