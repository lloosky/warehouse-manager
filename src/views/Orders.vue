<template>
  <div class="view-container">
    <div class="modal-container">
      <div class="modal-box" v-if="show">
        <form action>
          <label for>Imię i nazwisko:</label>
          <input type="text" v-model="customerName" />
          <label for style="width:50%">Produkt:</label>
          <label for style="width:50%">Ilość:</label>
          <select
            style="width:50%;height: 20px;"
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
          <input
            type="text"
            style="width:50%"
            v-model="orderedQuantity"
            @change="worthOfOrder(orderedProducts)"
          />
          <label for style="width:50%">Obsługa:</label>
          <select style="width:50%;height: 20px;" v-model="whoServes">
            <option v-for="serve in staff" v-bind:value="serve.worker" :key="serve.id">{{ serve.worker }}</option>
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
      <span>{{order.orderedProductsValue}}</span>
      <span>{{order.serves}}</span>
      <span>{{order.data}}</span>
      <span>
        <button>usuń</button>
      </span>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;

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
    worthOfOrder(orderedProducts) {
      const result = orderedProducts.price * this.orderedQuantity;
      this.orderValue = result
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
            serves: this.whoServes,
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
            serves: this.whoServes,
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
      const date = new Date();
      return (
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );
    }
  }
};
</script>
<style scoped>
.table-header,
.table-row {
  grid-template-columns: 5% 20% 30% 15% 10% 15% 5%;
}
</style>
