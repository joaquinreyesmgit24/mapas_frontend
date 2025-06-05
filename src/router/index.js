import { createRouter, createWebHistory } from 'vue-router';
import Public from '../views/public/publicView.vue'
import { PublicRoutes } from '../views/public/router';


const routes = [
  {
    path: '/public',
    name: 'public',
    component: Public,
    children: PublicRoutes,
    meta: {
      requiresAuth: false
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;