import Dashboard from '../views/Dashboard.vue';

export default [
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard',
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
