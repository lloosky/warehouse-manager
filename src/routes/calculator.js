import Calculator from '../views/Calculator.vue';

export default [
  {
    path: '/calculator',
    name: 'calculator',
    component: Calculator,
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
