import { createApp } from 'vue'
import './styles/tailwind.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { clickOutside } from "~/directive/clickOutside.ts";

library.add(faSearch, faUser, faBars);

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.directive('click-outside', clickOutside)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')