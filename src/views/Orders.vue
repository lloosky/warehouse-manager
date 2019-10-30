<template>
  <div class="view-container">
    <div class="modal-container">
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
            >{{product.title}}</option>
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
        <div class="btn-container">
          <button @click="addOrder">dodaj zamówienie</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Zamówienia</h2>
      <div class="btn-container">
        <button class="accept-btn" @click="show=true">dodaj zamówienie</button>
      </div>
    </div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Numer zamówienia</span>
      <span>Imię i Nazwisko</span>
      <span>Wartość</span>
      <span>Obsługa</span>
      <span>Data utworzenia</span>
    </div>
    <div class="table-row" v-for="(order, index) in orders " :key="index">
      <span>{{index+1}}</span>
      <span>N-SR-{{order.id}}</span>
      <span>{{order.name}}</span>
      <span>{{showCurrency(order.orderedProductsValue)}}</span>
      <span>{{order.employee}}</span>
      <span>{{order.data}}</span>
      <span>
        <router-link :to="`orders/order-detail/${order.id}`">
          <button @click="showOrderDetail(order.id)">Otwórz</button>
        </router-link>
      </span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
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
      selected: ""
    };
  },
  methods: {
    showOrderDetail(id) {
      console.log(this.orders[id - 1]);
    },
    showCurrency(orderedProductsValue) {
      return new Intl.NumberFormat("pl-PLN", {
        style: "currency",
        currency: "PLN"
      }).format(orderedProductsValue);
    },
    worthOfOrder(orderedProducts) {
      const result = orderedProducts.price * this.orderedQuantity;
      this.orderValue = result;
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
  grid-template-columns: 5% 20% 20% 20% 15% 13% 7%;
}
</style>
