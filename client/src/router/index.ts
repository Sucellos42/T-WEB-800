import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';

// Définissez vos routes ici
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
});

export default router;
