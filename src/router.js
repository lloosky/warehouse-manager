/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable semi */
import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import Tasks from './views/Tasks.vue'
import Orders from './views/Orders.vue'
import Warehouse from './views/Warehouse.vue'
import Signin from './views/Signin.vue'
import Calculator from './views/Calculator.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Signin,
    meta: { hideNavigation: false }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse')

      if (storageToken) {
        next()
        console.log('success')
      } else {
        next('/')
        console.log('error')
      }
    },
    meta: { hideNavigation: true }
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    component: Warehouse,
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse')

      if (storageToken) {
        next()
        console.log('success')
      } else {
        next('/')
        console.log('error')
      }
    },
    meta: { hideNavigation: true }
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator,
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse')

      if (storageToken) {
        next()
        console.log('success')
      } else {
        next('/')
        console.log('error')
      }
    },
    meta: { hideNavigation: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse')

      if (storageToken) {
        next()
        console.log('success')
      } else {
        next('/')
        console.log('error')
      }
    },
    meta: { hideNavigation: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse')

      if (storageToken) {
        next()
        console.log('success')
      } else {
        next('/')
        console.log('error')
      }
    },
    meta: { hideNavigation: true }
  }
]

export default new Router({ mode: 'history', routes })
