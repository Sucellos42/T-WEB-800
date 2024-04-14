import { createRouter, createWebHistory } from 'vue-router';
import Home from '~/views/HomeView.vue';
import MapView from "~/views/MapView.vue";

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
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
