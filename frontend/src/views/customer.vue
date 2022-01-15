<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Информация о заказчике</h3>
                </div>
                <div class="cart" v-if="customer">
                    <div class="cart_item" v-if="customer">
                        <p>Полное наименование:</p>
                        <span class="fool-btn">{{ customer.fullName }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Код по СПЗ:</p>
                        <span class="fool-btn">{{ customer.regNumber }}</span>
                    </div>

                    <div class="cart_item">
                        <p>ИНН / КПП:</p>
                        <span class="fool-btn">{{ customer.inn }} / {{ customer.kpp }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Регион:</p>
                        <span class="fool-btn">{{ customer.regionCode }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Адрес:</p>
                        <span class="fool-btn"></span>
                    </div>

                    <div class="cart_item">
                        <p>Тип организации:</p>
                        <span class="fool-btn" v-if="customer.organizationType">{{ customer.organizationType.name }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Количество контрактов:</p>
                        <span class="fool-btn">
                            <b>{{ customer.contractsTotalCount }}</b> из них <b>{{ customer.contractsCount }}</b> по 44/94-ФЗ и 
                            <span v-if="customer.contracts223Count"><b>{{ customer.contracts223Count }}</b> по 223-ФЗ</span>
                        </span>
                    </div>

                    <div class="cart_item">
                        <p>Сумма контрактов:</p>
                        <span class="fool-btn">
                            <b>{{ moneyFormat(Math.trunc(customer.contractsSum)) }}</b> по 44/94-ФЗ и
                            <span v-if="customer.contracts223Sum"><b>{{ moneyFormat(Math.trunc(customer.contracts223Sum)) }}</b> по 223-ФЗ</span>
                        </span>
                    </div>
                </div>
                
                <div class="result_attr">
                    <h3>Контактная информация</h3>
                </div>
                <div class="cart" v-if="customer">
                    <div class="cart_item">
                        <p>Телефон / Факс:</p>
                        <span class="fool-btn"></span>
                    </div>

                    <div class="cart_item">
                        <p>Почтовый адрес:</p>
                        <span class="fool-btn" v-if="customer.postalAddress">{{ customer.postalAddress }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Сайт:</p>
                        <span class="fool-btn" v-if="customer.url">{{ customer.url }}</span>
                    </div>
                </div>

                <div class="result_attr">
                    <h3>Банковские реквизиты</h3>
                </div>
                <div class="cart" v-if="customer">
                    <div v-if="customer.accounts">
                        <div class="cart_item">
                            <p>Название банка:</p>
                            <span class="fool-btn">{{ getAccountData(customer.accounts.account).bankName }}</span>
                        </div>

                        <div class="cart_item">
                            <p>Адрес банка:</p>
                            <span class="fool-btn">{{ getAccountData(customer.accounts.account).bankAddress }}</span>
                        </div>

                        <div class="cart_item">
                            <p>БИК:</p>
                            <span class="fool-btn">{{ getAccountData(customer.accounts.account).bik }}</span>
                        </div>

                        <div class="cart_item">
                            <p>Расчетный счет:</p>
                            <span class="fool-btn">{{ getAccountData(customer.accounts.account).paymentAccount }}</span>
                        </div>

                        <div class="cart_item">
                            <p>Лицевой счет:</p>
                            <span class="fool-btn">{{ getAccountData(customer.accounts.account).personalAccount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const serverUrl = process.env.VUE_APP_SERVER_URL;

export default {
    data() {
        return {
            customer: null
        }
    },
    components: { Header },
    async created() {
        document.title = 'Заказчик';
        await this.setDataFromServer();
    },
    methods: {
        moneyFormat(money) {
            return (String(money).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace(' руб.', '');
        },
        async setDataFromServer() {
            const route = useRoute();
            const id = route.params.id;

            const request = await axios.post(`${serverUrl}api/getCustomer`, { id });
            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.customer = request.data.data.customers.data[0];
                console.log(this.customer);
            } else {
                this.customer = {};
                alert(`Ошибка: ${request.data.text}`);
            }
        },
        getAccountData(account) {
            let data;
            (Array.isArray(account)) ? data = account[0] : data = account;

            return data;
        }
    }
}
</script>

<style>

</style>