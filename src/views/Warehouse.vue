<template>
  <div class="view-container">
    <confirm-box
      v-if="showConfirmBox"
      :confirmMsg="confirmBoxQuestion"
      @accept="confirmAlert"
      @decline="declineAlert"
    ></confirm-box>
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
            <option
              v-for="product in units"
              v-bind:value="product.unit"
              :key="product.id"
            >{{ product.unit }}</option>
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
      <span>{{formatCurrency(product.price)}}</span>
      <span>
        <button class="accept-btn" @click="deleteProduct(product.id,index)" v-if="product.activeDeleteButton">usuń</button>
      </span>
    </div>
  </div>
</template>
<script>
const API_HOST = process.env.VUE_APP_API_HOST;
import ConfirmBox from "./../components/ConfirmBox.vue";
import formatCurrency from "../utils/formatCurrency.js";

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
      activeDeleteButton: true,
      productPrice: "",
      units: [{ unit: "cm" }, { unit: "m2" }, { unit: "szt" }, { unit: "kpl" }],
      confirmBoxQuestion: "Na pewno chcesz usunąć ten produkt ?",
      showConfirmBox: false,
      productInfo: []
    };
  },
  methods: {
    formatCurrency,
    showDeleteButton() {
      for (let i in this.products) {
        for (let j in this.orders) {
          if(this.orders[j].orderedProducts.title === this.products[i].title){
            this.products[i].activeDeleteButton = false
          }
        }
      }
    },
    deleteProduct(id, index) {
      this.showConfirmBox = true;
      this.productInfo.push({ productId: id, productIndex: index });
    },
    confirmAlert() {
      const id = this.productInfo[0].productId;
      const index = this.productInfo[0].productIndex;

      this.$store.commit("REMOVE_PRODUCT", { id, index });
      console.log(`Produkt o id ${id} został usunięty pomyślnie`);
      this.showConfirmBox = false;
      this.productInfo = [];
    },
    declineAlert() {
      this.productInfo = [];
      this.showConfirmBox = false;
      console.log("Anulowałeś usuwanie produktu");
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
              price: this.productPrice,
              activeDeleteButton: this.activeDeleteButton
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
              price: this.productPrice,
              activeDeleteButton: this.activeDeleteButton
            });
          })
          .catch(() => {
            console.log("ERROR");
          });
        this.isWidth = 0;
        this.showModal = false;
        this.$store.commit("GET_PRODUCTLIST");
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
    },
    orders() {
      return this.$store.state.orders;
    }
  },
  created() {
    this.$store.commit("GET_PRODUCTLIST");
    this.$store.commit("GET_ORDERLIST");
    this.showDeleteButton();
  },
  updated() {
    this.showDeleteButton();
  },
  components: {
    confirmBox: ConfirmBox
  }
};
</script>
<style scoped>
.view-container {
  display: grid;
  grid-template-columns: auto;
  align-content: center;
}
</style>
