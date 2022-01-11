import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import VuePapaParse from 'vue-papa-parse';

createApp(App)
    .use(router)
    .use(VuePapaParse)
    .mount('#app')