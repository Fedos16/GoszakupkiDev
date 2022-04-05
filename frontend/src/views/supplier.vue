<template>
    <div class="main">
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Регистрационные данные организации</h3>
                </div>
                <div class="cart" v-if="supplier && !isLoadingData">
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
                <div v-if="isLoadingData">
                    <div class="mt-2"><Skeleton height="40px" width="90%" /></div>
                    <div class="mt-2"><Skeleton height="50px" width="100%" /></div>
                    <div class="mt-2"><Skeleton height="40px" width="85%" /></div>
                </div>

                <div class="result_attr">
                    <h3>Контракты ({{ totalContracts }})</h3>
                </div>
                <div 
                    v-show="!isLoadingContracts"
                    v-for="contract of contracts" 
                    :key="contract.id" 
                    :id="contract.regNum"
                    class="cart"
                >
                     <div class="cart_item">
                        <p>Номер контpакта:</p>
                        <span class="fool-btn"><a :href="'/contract/' + contract.regNum" target="_blank"><u>{{contract.regNum}}</u></a></span>
                    </div>

                    <div class="cart_item">
                        <p>Заказчик:</p>
                        <span class="fool-btn"><a :href="'customer/' + contract.customer.regNum" target="_blank"><u>{{ contract.customer.fullName }}</u></a></span>
                    </div>

                    <div class="cart_item">
                        <p>Предмет:</p>
                        <span class="fool-btn" v-if="contract.products">{{ contract.products[0].name }} ... 
                            <a :href="'/contract/' + contract.regNum" target="_blanck"><u> показать все ({{ contract.products.length }})</u></a>
                        </span>
                    </div>

                    <div class="cart_item">
                        <p>Сумма контракта:</p>
                        <span class="fool-btn">{{ moneyFormat(contract.price) }} рублей</span>
                    </div>

                    <div class="cart_item mt-3">
                        <p>Дата заключения:</p>
                        <span class="fool-btn">{{ new Date(contract.execution.startDate).toLocaleDateString('ru-RU') }}</span>
                    </div>

                    <div class="cart_item">
                        <p>Дата окончания исполнения:</p>
                        <span class="fool-btn">{{ new Date(contract.execution.endDate).toLocaleDateString('ru-RU') }}</span>
                    </div>


                </div>
                <div v-if="isLoadingContracts" class="mt-5">
                    <div class="mt-2"><Skeleton height="40px" width="90%" /></div>
                    <div class="mt-2"><Skeleton height="50px" width="100%" /></div>
                    <div class="mt-2"><Skeleton height="40px" width="85%" /></div>
                </div>

                <Paginator :rows="10" :alwaysShow="false" :totalRecords="totalContracts" @page="onPage($event)"></Paginator>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/header.vue';
import Footer from '../components/footer.vue';

import Paginator from 'primevue/paginator';
import Skeleton from 'primevue/skeleton';

import { useRoute } from 'vue-router';
import axios from 'axios';

const serverUrl = process.env.VUE_APP_SERVER_URL;

export default {
    data() {
        return {
            innSupplier: null,
            kppSupplier: null,
            supplier: null,
            contracts: [],
            page: 1,
            totalContracts: 0,
            isLoadingData: true,
            isLoadingContracts: true
        }
    },
    components: { Header, Skeleton, Paginator, Footer },
    async created() {
        const route = useRoute();
        document.title = 'Поставщик';
        this.innSupplier = route.params.inn;
        this.kppSupplier = route.params.kpp;

        this.page = 1;

        await this.setDataFromServer();
    },
    methods: {
        async setDataFromServer(loadingData=true, loadingContacts=true) {

            if (loadingData) this.isLoadingData = true;
            if (loadingContacts) this.isLoadingContracts = true;

            this.contracts = [];

            const request = await axios.post(`${serverUrl}api/getSupplier`, { inn: this.innSupplier, kpp: this.kppSupplier, page: this.page });
            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.supplier = request.data.data.suppliers.data;
                this.contracts = request.data.contracts.contracts.data;
                this.totalContracts = request.data.contracts.contracts.total;

                this.isLoadingData = false;
                this.isLoadingContracts = false;
            } else {
                this.supplier = [];
                alert(`Ошибка: ${request.data.text}`);
            }
        },
        async onPage(event) {
            this.page = event.page + 1;
            await this.setDataFromServer(false);
        }
    }
}
</script>

<style>

</style>