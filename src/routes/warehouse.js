import Warehouse from '../views/Warehouse.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/warehouse',
    name: 'warehouse',
    component: Warehouse,
    beforeEnter,
    meta: { hideNavigation: true }
  }
];
