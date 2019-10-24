import Vue from 'vue';
import Vuex from 'vuex';
import router from './routes/router';

Vue.use(Vuex);

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
    ]
  },
  mutations: {
    GET_PRODUCTLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      Vue.http
        .get('http://karol.switalla.pl/api/warehouse', {
          headers: { Authorization: `Bearer ${state.userToken}` }
        })
        .then(data => {
          state.products = data.body;
        })
        .catch(() => {
          console.log('ERROR-get product list ');
        });
    },
    GET_ORDERLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      Vue.http
        .get('http://karol.switalla.pl/api/orders', {
          headers: { Authorization: `Bearer ${state.userToken}` }
        })
        .then(data => {
          state.orders = data.body;
        })
        .catch(() => {
          console.log('ERROR - get order list');
        });
    },
    REMOVE_PRODUCT(state, { id, index }) {
      Vue.http
        .delete(`http://karol.switalla.pl/api/warehouse/${id}`, {
          headers: { Authorization: `Bearer ${state.userToken}` }
        })
        .then(() => {
          state.products.splice(index, 1);
        });
    },
    LOGOUT() {
      localStorage.removeItem('authResponse');
      router.push({ path: '/' });
    }
  },
  actions: {},
  getters: {}
});
