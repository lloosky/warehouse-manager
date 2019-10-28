<template>
  <div class="view-container">
    <div class="modal-container">
      <div class="modal-box" v-if="show">
        <form action>
          <label for>Imię i nazwisko:</label>
          <input type="text" v-model="customerName" />
          <label for style="width:50%">Produkt:</label>
          <label for style="width:50%">Ilość:</label>
          <select style="width:50%;height: 20px;" id="productList" v-model="orderedProducts">
            <option
              v-for="product in products"
              v-bind:value="product.title"
              :key="product.id"
            >{{product.title}} {{product.price}}</option>
          </select>
          <input type="text" style="width:50%" v-model="orderedQuantity" />
          <label for style="width:50%">Obsługa:</label>
          <select style="width:50%;height: 20px;" v-model="whoServes">
            <option v-for="serve in staff" v-bind:value="serve.worker">{{ serve.worker }}</option>
          </select>
          <!-- <p>{{getOrderDate}}</p> -->
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
      <span>{{order.orderedQuantity}}</span>
      <span>{{order.serves}}</span>
      <span>{{order.data}}</span>
      <span>
        <button @click="test(index)">usuń</button>
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
      orderedQuantity: "",
      whoServes: "",
      data: ""
    };
  },
  methods: {
    test(index) {
      console.log(this.orders[index]);
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
    worthOfOrder() {
      this.worthResult = 0;
      const productPrice = document.getElementById("productList").value;
      console.log((this.worthResult += productPrice * this.orderedQuantity));
    },
    getOrderDate() {
      const date = new Date();
      return ((date.getMonth() + 1) + "/" + (date.getDate()) + "/" + (date.getFullYear()))
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
