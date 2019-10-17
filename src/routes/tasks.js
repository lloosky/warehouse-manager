import Tasks from '../views/Tasks.vue';

export default [
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks,
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
