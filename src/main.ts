import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

import './style.css';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import 'primeflex/primeflex.css'  ;  

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
