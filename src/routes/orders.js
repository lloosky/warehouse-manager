import Orders from '../views/Orders.vue';

export default [
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
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
