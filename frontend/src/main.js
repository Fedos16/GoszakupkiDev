import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import helpers from './helpers';
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css'


const app = createApp(App);

app.mixin({
    methods: helpers
});
app.use(router);
app.use(PrimeVue, { ripple: true });

app.mount('#app');