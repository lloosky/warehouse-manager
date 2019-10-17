import Vue from 'vue';
import Router from 'vue-router';

import Signin from '../views/Signin.vue';

import tasks from './tasks';
import warehouse from './warehouse';
import calculator from './calculator';
import orders from './orders';
import dashboard from './dashboard';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Signin,
    meta: { hideNavigation: false }
  },
  ...tasks,
  ...warehouse,
  ...calculator,
  ...orders,
  ...dashboard
];

export default new Router({ mode: 'history', routes });
