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
            <option v-for="product in products" v-bind:value="product.title">{{product.title }}</option>
          </select>
          <input type="text" style="width:50%" v-model="orderedQuantity" />
          <label for style="width:50%">Obsługa:</label>
          <select style="width:50%;height: 20px;" id="productList" v-model="whoServes">
            <option v-for="serve in staff" v-bind:value="serve.worker">{{ serve.worker }}</option>
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
        <button class="confirm-btn" @click="show=true">dodaj zamówienie</button>
      </div>
    </div>
    <div v-for="(order, index) in orders">
  <p style="width:100%">{{order.name}} {{order.orderedProducts}} {{order.orderedQuantity}}/ Obsługa : {{order.serves}}/ Zamowienie nr: #{{order.id}}  </p>

    </div>
    
  </div>
</template>
<script>
export default {
  name: "orders",
  data() {
    return {
      show: false,
      customerName: "",
      orderedProducts: "",
      orderedQuantity: "",
      whoServes: "",
    };
  },
  methods: {
    addOrder() {
      let txt = localStorage.getItem("authResponse");
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      this.$http
        .post(
          "http://karol.switalla.pl/api/orders",
          {
            name: this.customerName,
            orderedProducts: this.orderedProducts,
            orderedQuantity: this.orderedQuantity,
            serves: this.whoServes
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
            serves: this.whoServes
          });
        })
        .catch(() => {
          console.log("ERROR");
        });
      this.isWidth = 0;
      this.show = false;
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
      return (this.worthResult += productPrice * this.orderedQuantity);
    }
  }
};
</script>
<style>
</style>
