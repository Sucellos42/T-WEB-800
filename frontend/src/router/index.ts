import { createRouter, createWebHistory } from 'vue-router';
import Home from '~/views/HomeView.vue';
import MapView from '~/views/MapView.vue';
import UserView from '~/views/UserView.vue';
import FavorisView from '~/views/FavorisView.vue';
import { isResponsiveGuard } from '~/router/guards.ts';

// Définissez vos routes ici
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    params: true,
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,
    params: true,
    props: true,
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
    params: true,
    beforeEnter: isResponsiveGuard,
  },
  {
    path: '/favoris',
    name: 'Favoris',
    component: FavorisView,
    params: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
