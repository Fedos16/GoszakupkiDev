import { createRouter, createWebHistory } from 'vue-router';

import Home from '../src/views/home.vue';
import Contract from '../src/views/contract.vue';
import Customer from '../src/views/customer.vue';
import Supplier from '../src/views/supplier.vue';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: Home
        },
        {
            path: '/contract',
            name: 'contract',
            component: Contract
        },
        {
            path: '/customer',
            name: 'customer',
            component: Customer
        },
        {
            path: '/supplier',
            name: 'supplier',
            component: Supplier
        }
    ]
})

export default router;