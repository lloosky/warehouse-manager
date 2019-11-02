import Calculator from '../views/Calculator.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator,
    beforeEnter,
    meta: { hideNavigation: true }
  }
];
