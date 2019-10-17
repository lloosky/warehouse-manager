/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable semi */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    password: '',
    encodedUsername: '',
    userToken: null,
    products: null,
    productTitle: '',
    productQuantity: '',
    productUnit: '',
    productPrice: ''
  },
  mutations: {
    GET_PRODUCTLIST(state) {
      let txt = localStorage.getItem('authResponse')
      let obj = JSON.parse(txt)
      state.userToken = window.btoa(obj.body.token)
      Vue.http
        .get('http://karol.switalla.pl/api/warehouse', {
          headers: { Authorization: `Bearer ${state.userToken}` }
        })
        .then(data => {
          state.products = data.body
        })
        .catch(() => {
          console.log('ERROR')
        })
    },
    REMOVE_PRODUCT(state, { id, index }) {
      Vue.http
        .delete(`http://karol.switalla.pl/api/warehouse/${id}`, {
          headers: { Authorization: `Bearer ${state.userToken}` }
        })
        .then(() => {
          state.products.splice(index, 1)
        })
    },
    ADD_PRODUCT(state) {
      let txt = localStorage.getItem('authResponse')
      let obj = JSON.parse(txt)
      state.userToken = window.btoa(obj.body.token)

      Vue.http
        .post(
          'http://karol.switalla.pl/api/warehouse',
          {
            title: state.productTitle,
            quantity: state.productQuantity,
            unit: state.productUnit,
            price: state.productPrice
          },
          {
            headers: { Authorization: `Bearer ${state.userToken}` }
          }
        )
        .then(data => {
          console.log(data)
          state.products.push({
            title: state.productTitle,
            quantity: state.productQuantity,
            unit: state.productUnit,
            price: state.productPrice
          })
        })
        .catch(() => {
          console.log('ERROR')
        })
    },
    LOGOUT(state) {
      localStorage.removeItem('authResponse')
      router.push({ path: '/' })
    }
  },
  actions: {},
  getters: {}
})
