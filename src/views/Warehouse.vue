<template>
  <div class="warehouse-container">
    <div class="modal-container" :style="{width: isWidth + '%'}">
      <div class="modal-box">
        <form action>
          <label for>Nazwa:</label>
          <input type="text" v-model="productTitle" />
          <label for>Ilość:</label>
          <input type="number" v-model="productQuantity" />
          <label for>Jednostka:</label>
          <input type="text" v-model="productUnit" />
          <label for>Cena netto:</label>
          <input type="number" v-model="productPrice" />
        </form>
        <div class="btn-container">
          <button class @click="addProduct">dodaj produkt</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Magazyn</h2>
      <div class="btn-container">
        <button class="confirm-btn" @click="openAddingProduct">dodaj produkt</button>
      </div>
    </div>
    <div class="table-header">
      <span>nazwa</span>
      <span>Ilość</span>
      <span>Jednostka</span>
      <span>Cena netto</span>
    </div>
    <div class="table-row" v-for="(product, index) in products" :key="index">
      <span>{{product.title}}</span>
      <span>{{product.quantity}}</span>
      <span>{{product.unit}}</span>
      <span>{{product.price}}</span>
      <span>
        <button class="close-btn" @click="removeProduct(product.id,index)">usuń</button>
      </span>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
export default {
  name: "warehouse",
  data() {
    return {
      userToken: "",
      showModal: false,
      isWidth: 0,
      productTitle: "",
      productQuantity: "",
      productUnit: "",
      productPrice: ""
    };
  },
  components: {
    appHeader: Header
  },
  methods: {
    removeProduct(id, index) {
      this.$store.commit("REMOVE_PRODUCT", { id, index });
    },
    openAddingProduct() {
      this.isWidth = 100;
    },
    addProduct() {
      let txt = localStorage.getItem("authResponse");
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      this.$http
        .post(
          "http://karol.switalla.pl/api/warehouse",
          {
            title: this.productTitle,
            quantity: this.productQuantity,
            unit: this.productUnit,
            price: this.productPrice
          },
          {
            headers: { Authorization: `Bearer ${this.userToken}` }
          }
        )
        .then(data => {
          console.log(data);
          this.products.push({
            title: this.productTitle,
            quantity: this.productQuantity,
            unit: this.productUnit,
            price: this.productPrice
          });
        })
        .catch(() => {
          console.log("ERROR");
        });
      this.isWidth = 0;
    }
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.commit("GET_PRODUCTLIST");
  }
};
</script>
<style>
.close-btn {
  color: white;
  background-color: rgb(223, 78, 78);
  border: 1px solid rgb(163, 3, 3);
  font-weight: 100;
  width: 100%;
}
.modal-container {
  height: 70%;
  background-color: rgba(0, 0, 0, 0.925);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  transition: 0.3s all;
  display: grid;
  grid-template-columns: 50%;
  align-content: center;
  justify-content: center;
}
.modal-box {
  padding: 20px;
}
.btn-container {
  justify-self: end;
  position: relative;
  overflow: hidden;
}
.confirm-btn {
  background-color: #e18500;
  color: white;
  padding: 0px 15px 0px 15px;
  height: 100%;
}
.confirm-btn::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 0%;
  background-color: #fadcaf42;
  transition: all 0.3s ease 0s;
  top: 0;
  left: 0;
}
.confirm-btn:hover::before {
  width: 100%;
}
.warehouse-container {
  display: grid;
  grid-template-columns: auto;
  align-content: center;
}
.component-navigation {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 20px;
}
.table-header {
  padding: 5px;
  background: #6d6d6d;
  border: 1px solid #e18500;
  display: grid;
  grid-template-columns: 50% 15% 15% 15% 5%;
  align-content: center;
  margin-bottom: 20px;
}
.table-row {
  border: none;
  padding: 5px;
  background: #c2c2c2;
  color: black !important;
  display: grid;
  grid-template-columns: 50% 15% 15% 15% 5%;
  align-content: center;
  font-weight: 800;
  transition: 0.3s all;
}
.table-row:nth-child(even) {
  background-color: #d2d2d2;
}
.modal-box > form > input {
  height: 20px;
  width: 100%;
}
</style>