<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Регистрационные данные организации</h3>
                </div>
                <div class="cart" v-if="supplier">
                    <div class="cart_item">
                        <p>Полное наименование:</p>
                        <span class="fool-btn">{{ supplier[0].organizationName }}</span>
                    </div>

                    <div class="cart_item">
                        <p>ИНН / КПП:</p>
                        <span class="fool-btn">{{ supplier[0].inn }} <span v-if="supplier[0].kpp">/ {{ supplier[0].kpp }}</span></span>
                    </div>

                    <div class="cart_item" v-if="supplier[0].organizationForm">
                        <p>Форма организации:</p>
                        <span class="fool-btn">{{ supplier[0].organizationForm }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Регион:</p>
                        <span class="fool-btn">{{ supplier[0].regionCode }}</span>
                    </div>

                    <div class="cart_item" v-if="supplier[0].factualAddress">
                        <p>Адрес:</p>
                        <span class="fool-btn">{{ supplier[0].factualAddress }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Количество контрактов:</p>
                        <span class="fool-btn">
                            <b>{{ supplier[0].contractsTotalCount }}</b> из них <b>{{ supplier[0].contractsCount }}</b> по 44/94-ФЗ и
                            <span v-if="supplier[0].contracts223Count"><b>{{ supplier[0].contracts223Count }}</b> по 223-ФЗ</span>
                        </span>
                    </div>

                    <div class="cart_item">
                        <p>Сумма контрактов:</p>
                        <span class="fool-btn">
                            <b>{{ moneyFormat(Math.trunc(supplier[0].contractsSum)) }}</b> по 44/94-ФЗ и
                            <span v-if="supplier[0].contracts223Sum"><b>{{ moneyFormat(Math.trunc(supplier[0].contracts223Sum)) }}</b> по 223-ФЗ</span>
                        </span>
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
            supplier: null
        }
    },
    components: { Header },
    async created() {
        document.title = 'Поставщик';
        await this.setDataFromServer();
    },
    methods: {
        moneyFormat(money) {
            return (String(money).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace(' руб.', '');
        },
        async setDataFromServer() {
            const route = useRoute();

            const inn = route.params.inn;
            const kpp = route.params.kpp;

            const request = await axios.post(`${serverUrl}api/getSupplier`, { inn, kpp });
            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.supplier = request.data.data.suppliers.data;
            } else {
                this.supplier = [];
                alert(`Ошибка: ${request.data.text}`);
            }
        }
    }
}
</script>

<style>

</style>