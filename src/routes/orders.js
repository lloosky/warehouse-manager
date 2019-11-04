import Orders from '../views/Orders.vue';
import OrderDetail from '../views/OrderDetail.vue';
import { beforeEnter } from '../utils/beforeEnter.js';

export default [
  {
    path: '/orders',
    component: Orders,
    children: [
      {
        name: 'order-detail',
        path: ':id',
        props: true,
        component: OrderDetail,
        meta: { hideNavigation: true },
        beforeEnter
      }
    ],
    beforeEnter,
    meta: { hideNavigation: true }
  }
];
