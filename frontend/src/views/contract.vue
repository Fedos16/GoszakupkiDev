<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Информация о контракте № {{ id }}</h3>
                </div>
                <div class="cart">
                    <div class="cart_item" v-if="products.length > 0">
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Наименование</th>
                                <th>Ед. измерения</th>
                                <th>Количество</th>
                                <th>Стоимость</th>
                                <th>Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(prod, index) in products" :key="prod">
                                <td>{{ index + 1 }}</td>
                                <td>{{ prod.name }}</td>
                                <td v-if="prod.OKEI">{{ prod.OKEI.name }}</td><td v-else>?</td>
                                <td v-if="prod.quantity">{{ prod.quantity }}</td><td v-else>?</td>
                                <td v-if="prod.price">{{ moneyFormat(prod.price) }}</td><td v-else>?</td>
                                <td v-if="prod.sum">{{ moneyFormat(prod.sum) }}</td><td v-else>?</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header.vue';
import { useRoute } from 'vue-router'
import axios from 'axios';

const serverUrl = process.env.VUE_APP_SERVER_URL;

export default {
    name: 'Contract',
    components: { Header },
    async beforeMount() {
        document.title = 'Контракт';

        const route = useRoute();

        const id = route.params.id;
        this.id = id;

        const request = await axios.post(`${serverUrl}api/getContract`, { id });
        let reqStatus = request.data.ok;
        if (reqStatus) {
            this.products = request.data.data.contracts.data[0].products;
        } else {
            this.products = [];
            alert(`Ошибка: ${request.data.text}`);
        }

        return { id }
    },
    data() {
        return {
            id: '',
            products: []
        }
    },
    methods: {
        moneyFormat(money) {
            return (String(money).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace(' руб.', '');
        },
    }
}
</script>

<style>

</style>