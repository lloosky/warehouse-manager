import Dashboard from '../views/Dashboard.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
    beforeEnter,
    meta: { hideNavigation: true }
  }
];
