import Orders from '../views/Orders.vue';
import OrderDetail from '../views/OrderDetail.vue';

export default [
  {
    path: '/orders',
    // name: 'orders',
    component: Orders,
    children: [
      {
        name: 'order-detail',
        path: ':id',
        props: true,
        component: OrderDetail,
        meta: { hideNavigation: true },
        beforeEnter(to, from, next) {
          let storageToken = localStorage.getItem('authResponse');

          if (storageToken) {
            next();
            console.log('success');
          } else {
            next('/');
            console.log('error');
          }
        }
      }
    ],
    beforeEnter(to, from, next) {
      let storageToken = localStorage.getItem('authResponse');

      if (storageToken) {
        next();
        console.log('success');
      } else {
        next('/');
        console.log('error');
      }
    },
    meta: { hideNavigation: true }
  }
];
