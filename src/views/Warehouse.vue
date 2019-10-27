<template>
  <div class="view-container">
    <div class="modal-container" :style="{width: isWidth + '%'}">
      <div class="modal-box" v-if="showModal">
        <div id="validationAlerts"></div>
        <form action>
          <label for>Nazwa:</label>
          <input type="text" v-model="productTitle" />
          <label for>Ilość:</label>
          <input type="number" v-model="productQuantity" />
          <label for>Jednostka:</label>
          <select v-model="productUnit">
            <option v-for="product in units" v-bind:value="product.unit">{{ product.unit }}</option>
          </select>
          <label for>Cena netto:</label>
          <input type="number" v-model="productPrice" />
        </form>
        <div class="modal-btn-container">
          <button class="button-normal" @click="clearInputs">wyczyść</button>
          <button class="button-normal" @click="cancelAddingProduct">anuluj</button>
          <button
            style="width:50%;justify-self:end;"
            class="button-normal accept-btn"
            @click="addProduct"
          >dodaj produkt</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Magazyn</h2>
      <div class="btn-container">
        <button class="accept-btn" @click="openAddingProduct">dodaj produkt</button>
      </div>
    </div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Nazwa</span>
      <span>Ilość</span>
      <span>Jednostka</span>
      <span>Cena netto</span>
    </div>
    <div class="table-row" v-for="(product, index) in products" :key="index">
      <span>{{index+1}}</span>
      <span>{{product.title}}</span>
      <span>{{product.quantity}}</span>
      <span>{{product.unit}}</span>
      <span>{{product.price}}</span>
      <span>
        <button @click="removeProduct(product.id,index)">usuń</button>
      </span>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;

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
      productPrice: "",
      units: [{ unit: "cm" }, { unit: "m2" }]
    };
  },
  methods: {
    removeProduct(id, index) {
      this.$store.commit("REMOVE_PRODUCT", { id, index });
    },
    openAddingProduct() {
      this.isWidth = 100;
      this.showModal = true;
      this.clearInputs();
    },
    addProduct() {
      let txt = localStorage.getItem("authResponse");
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      const validationInfo = document.getElementById("validationAlerts");

      if (
        this.productTitle == "" ||
        this.productQuantity == "" ||
        this.productUnit == "" ||
        this.productPrice == ""
      ) {
        validationInfo.innerHTML = "Uzupełnij wymagane pola";
      } else if (this.productQuantity < 1 || this.productPrice < 1) {
        validationInfo.innerHTML = "Cena oraz ilość musi być większa od 0";
      } else {
        this.$http
          .post(
            `${API_HOST}/api/warehouse`,
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
        this.showModal = false;
      }
    },
    clearInputs() {
      this.productTitle = "";
      this.productQuantity = "";
      this.productUnit = "";
      this.productPrice = "";
    },
    cancelAddingProduct() {
      this.clearInputs();
      this.isWidth = 0;
      this.showModal = false;
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
<style scoped>
.view-container {
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
  grid-template-columns: 5% 45% 15% 15% 15% 5%;
  align-content: center;
  margin-bottom: 20px;
}
.table-row {
  border: none;
  padding: 5px;
  background: #c2c2c2;
  color: black !important;
  display: grid;
  grid-template-columns: 5% 45% 15% 15% 15% 5%;
  align-content: center;
  font-weight: 800;
  transition: 0.3s all;
}
.table-row:nth-child(even) {
  background-color: #d2d2d2;
}
</style>
