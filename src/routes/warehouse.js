import Warehouse from '../views/Warehouse.vue';

export default [
  {
    path: '/warehouse',
    name: 'warehouse',
    component: Warehouse,
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
