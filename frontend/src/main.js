import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import helpers from './helpers';


createApp(App)
    .mixin({
        methods: helpers
    })
    .use(router)
    .mount('#app')