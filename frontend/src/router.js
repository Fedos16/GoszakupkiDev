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
            path: '/contract/:id',
            name: 'contract',
            component: Contract
        },
        {
            path: '/customer/:id',
            name: 'customer',
            component: Customer
        },
        {
            path: '/supplier/inn=:inn&kpp=:kpp',
            name: 'supplier',
            component: Supplier
        }
    ]
})

export default router;