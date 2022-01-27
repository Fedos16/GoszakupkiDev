<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3 v-if="contract">Информация о контракте № <a :href="contract.contractUrl" target="_blank"><u>{{ id }}</u></a></h3>
                </div>
                <div class="cart" v-if="contract">
                    <div class="cart_item">
                        <p>Статус контракта</p>
                        <span class="fool-btn">{{ getStatusNameContract(contract.currentContractStage) }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Заказчик</p>
                        <span class="fool-btn"> {{ contract.customer.fullName }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Поставщик</p>
                        <span class="fool-btn">{{ contract.suppliers[0].organizationName }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Регион</p>
                        <span class="fool-btn">{{ contract.regionCode }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Федеральный закон</p>
                        <span class="fool-btn">{{ contract.fz }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Дата заключения</p>
                        <span class="fool-btn">{{ new Date(contract.signDate).toLocaleDateString('ru-RU') }}</span>
                    </div>
                    <div class="cart_item">
                        <p>Сумма контакта</p>
                        <span class="fool-btn">{{ moneyFormat(contract.price) }}</span>
                    </div>
                </div>
                <div class="result_attr">
                    <h3>Предметы контракта</h3>
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
    async created() {
        document.title = 'Контракт';
        await this.setDataFromServer();
    },
    data() {
        return {
            id: '',
            products: [],
            contract: false
        }
    },
    methods: {
        async setDataFromServer() {
            const route = useRoute();
            const id = route.params.id;
            this.id = id;

            const request = await axios.post(`${serverUrl}api/getContract`, { id });
            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.products = request.data.data.contracts.data[0].products;
                this.contract = request.data.data.contracts.data[0];
            } else {
                this.products = [];
                alert(`Ошибка: ${request.data.text}`);
            }
        }
    }
}
</script>

<style>

</style>