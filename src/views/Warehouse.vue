<template>
  <div class="view-container">
    <div class="add-button" @click="openAddingProduct">&#43;</div>
    <confirm-box
      v-if="showConfirmBox"
      :confirmMsg="confirmBoxQuestion"
      @accept="confirmAlert"
      @decline="declineAlert"
    ></confirm-box>
    <div class="modal-container" :style="{width: widthOfModalBox + '%'}">
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
          <button class="button-normal accept-btn" @click="addProduct">dodaj</button>
        </div>
      </div>
    </div>
    <div class="component-navigation">
      <h2>Magazyn</h2>
      <div class="btn-container">
        <input type="text" placeholder="wyszukaj" v-model="search" />
      </div>
    </div>
    <div class="table-header">
      <span>Lp.</span>
      <span>Nazwa</span>
      <span>Ilość</span>
      <span>Jednostka</span>
      <span>Cena netto</span>
    </div>
    <div class="table-row" v-for="(product, index) in filteredProducts" :key="index">
      <span data-label="Lp.">{{index+1}}</span>
      <span data-label="Nazwa">{{product.title}}</span>
      <span data-label="Ilość" id="quantity">{{product.quantity}}</span>
      <span data-label="Jednostka">{{product.unit}}</span>
      <span data-label="Cena netto">{{formatCurrency(product.price)}}</span>
      <span data-label>
        <button
          class="accept-btn"
          @click="deleteProduct(product.id,index)"
          v-if="product.activeDeleteButton"
        >usuń</button>
      </span>
    </div>
  </div>
</template>
<script>
import ConfirmBox from './../components/ConfirmBox.vue';
import formatCurrency from '../utils/formatCurrency.js';
import store from '../store.js';
const API_HOST = process.env.VUE_APP_API_HOST;

export default {
  name: 'warehouse',
  store: store,
  data() {
    return {
      userToken: '',
      showModal: false,
      widthOfModalBox: 0,
      productTitle: '',
      productQuantity: 's',
      productUnit: '',
      activeDeleteButton: true,
      productPrice: '',
      units: [
        { unit: 'cm' },
        { unit: 'm2' },
        { unit: 'szt' },
        { unit: 'kpl' },
        { unit: 'kg' }
      ],
      confirmBoxQuestion: 'Na pewno chcesz usunąć ten produkt ?',
      showConfirmBox: false,
      productInfo: [],
      search: ''
    };
  },
  methods: {
    formatCurrency,
    showDeleteButton() {
      for (let i in this.products) {
        for (let j in this.orders) {
          if (this.orders[j].orderedProducts.title === this.products[i].title) {
            this.products[i].activeDeleteButton = false;
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

      this.$store.commit('REMOVE_PRODUCT', { id, index });
      console.log(`Produkt o id ${id} został usunięty pomyślnie`);
      this.showConfirmBox = false;
      this.productInfo = [];
    },
    declineAlert() {
      this.productInfo = [];
      this.showConfirmBox = false;
      console.log('Anulowałeś usuwanie produktu');
    },
    openAddingProduct() {
      this.widthOfModalBox = 50;
      if (window.innerWidth < 767) {
        this.widthOfModalBox = 100;
      }
      this.showModal = true;
      this.clearInputs();
    },
    addProduct() {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      this.userToken = window.btoa(obj.body.token);

      const validationInfo = document.getElementById('validationAlerts');

      if (
        this.productTitle == '' ||
        this.productQuantity == '' ||
        this.productUnit == '' ||
        this.productPrice == ''
      ) {
        validationInfo.innerHTML = 'Uzupełnij wymagane pola';
      } else if (this.productQuantity < 1 || this.productPrice < 1) {
        validationInfo.innerHTML = 'Cena oraz ilość musi być większa od 0';
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
            console.log('ERROR');
          });
        this.widthOfModalBox = 0;
        this.showModal = false;
        this.$store.commit('GET_PRODUCTLIST');
      }
    },
    clearInputs() {
      this.productTitle = '';
      this.productQuantity = '';
      this.productUnit = '';
      this.productPrice = '';
    },
    cancelAddingProduct() {
      this.clearInputs();
      this.widthOfModalBox = 0;
      this.showModal = false;
    }
  },
  created() {
    this.$store.commit('GET_PRODUCTLIST');
    this.$store.commit('GET_ORDERLIST');
    this.showDeleteButton();
  },
  updated() {
    this.showDeleteButton();
  },
  components: {
    confirmBox: ConfirmBox
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    orders() {
      return this.$store.state.orders;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    filteredProducts() {
      var self = this;
      if (this.products === null || this.products === undefined) {
        console.log('Warehouse list is undefined');
      } else {
        return this.products.filter(function(cust) {
          return (
            cust.title.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
          );
        });
      }
    }
  }
};
</script>
<style scoped>
.view-container {
  display: grid;
  grid-template-columns: auto;
  align-content: center;
}
@media (max-width: 767px) {
}
</style>
