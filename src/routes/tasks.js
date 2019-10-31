import Tasks from '../views/Tasks.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
    beforeEnter: beforeEnter,
    meta: { hideNavigation: true }
  }
];
