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
    orders: [],
    tasks: [],
    staff: [
      { worker: 'Worker #1' },
      { worker: 'Worker #2' },
      { worker: 'Worker #3' }
    ],
    widthOfOrderDetail: 0,
    menuLeft: 0,
    orderIndexId: []
  },
  mutations: {
    async GET_PRODUCTLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      try {
        const { data } = await Vue.http.get(`${API_HOST}/api/warehouse`);
        state.products = data;
      } catch (err) {
        if (err.status === 403 || err.status === 404) {
          this.commit('LOGOUT');
        }
      }
    },
    async GET_ORDERLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      try {
        const { data } = await Vue.http.get(`${API_HOST}/api/orders`);
        console.log();
        state.orders = data;
      } catch (err) {
        if (err.status === 403 || err.status === 404) {
          this.commit('LOGOUT');
        }
      }
    },
    async GET_TASKSLIST(state) {
      let txt = localStorage.getItem('authResponse');
      let obj = JSON.parse(txt);
      state.userToken = window.btoa(obj.body.token);
      try {
        const { data } = await Vue.http.get(`${API_HOST}/api/tasks`);
        state.tasks = data;
      } catch (err) {
        if (err.status === 403 || err.status === 404) {
          this.commit('LOGOUT');
        }
      }
    },
    REMOVE_PRODUCT(state, { id, index }) {
      Vue.http.delete(`${API_HOST}/api/warehouse/${id}`).then(() => {
        state.products.splice(index, 1);
      });
    },
    REMOVE_TASK(state, { id, index }) {
      Vue.http.delete(`${API_HOST}/api/tasks/${id}`).then(() => {
        state.tasks.splice(index, 1);
      });
    },
    REMOVE_ORDER(state, id) {
      const index = state.orderIndexId[0].index;
      Vue.http.delete(`${API_HOST}/api/orders/${id}`).then(() => {
        state.orders.splice(index, 1);
      });
    },
    LOGOUT() {
      localStorage.removeItem('authResponse');
      router.push({ path: '/' });
      console.log('Zostałeś wylogowany');
    }
  },
  actions: {
  },
  getters: {}
});
