import { createApp } from 'vue';
import router from '~/router';
import App from '~/App.vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faUser,
  faBars,
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faLocationDot,
  faCartShopping,
  faRoad,
  faCalendar,
  faList,
  faHouse,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { clickOutside } from '~/directive/clickOutside.ts';
import { setupCalendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import './styles/tailwind.css';

library.add(
  faSearch,
  faUser,
  faBars,
  faArrowDown,
  faArrowUp,
  faArrowRight,
  faLocationDot,
  faCartShopping,
  faRoad,
  faCalendar,
  faList,
  faHouse,
  faStar
);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(setupCalendar, {});
app.directive('click-outside', clickOutside);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VDatePicker', DatePicker);
app.mount('#app');
