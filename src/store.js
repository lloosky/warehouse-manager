import Vue from 'vue';
import Vuex from 'vuex';
import router from './routes/router';

Vue.use(Vuex);

const API_HOST = process.env.VUE_APP_API_HOST;

export default new Vuex.Store({
  state: {
    username: '',
    password: '',
    encodedUsername: '',
    userToken: null,
    products: null,
    orders: null,
    staff: [
      { worker: 'Worker #1' },
      { worker: 'Worker #2' },
      { worker: 'Worker #3' }
    ],
    widthOfOrderDetail: 0
  },
  mutations: {
    async GET_PRODUCTLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      try {
        const { data } = await Vue.http.get(`${API_HOST}/api/warehouse`);
        state.products = data;
      } catch {
        console.log('ERROR-get product list ');
      }
    },
    async GET_ORDERLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      try {
        const { data } = await Vue.http.get(`${API_HOST}/api/orders`);
        state.orders = data;
        console.log(data[0].orderedProducts.title);
      } catch {
        console.log('ERROR - get order list');
      }
    },
    REMOVE_PRODUCT(state, { id, index }) {
      Vue.http.delete(`${API_HOST}/api/warehouse/${id}`).then(() => {
        state.products.splice(index, 1);
      });
    },
    REMOVE_ORDER(state, id) {
      Vue.http.delete(`${API_HOST}/api/orders/${id}`).then(() => {
        state.orders.splice(id - 1, 1);
      });
    },
    LOGOUT() {
      localStorage.removeItem('authResponse');
      router.push({ path: '/' });
      console.log('Zostałeś wylogowany');
    }
  },
  actions: {
    AUTO_LOGOUT({ commit }, expiresTime) {
      setTimeout(() => {
        commit('LOGOUT');
      }, expiresTime * 1000);
    }
  },
  getters: {}
});
