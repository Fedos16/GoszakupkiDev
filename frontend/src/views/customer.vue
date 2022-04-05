<template>
    <div class="main">
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Информация о заказчике</h3>
                </div>
                <div class="cart" v-if="customer && !isLoadingData">
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
                <div v-if="isLoadingData">
                    <div class="mt-2"><Skeleton height="65px" width="90%" /></div>
                    <div class="mt-2"><Skeleton height="50px" width="100%" /></div>
                    <div class="mt-2"><Skeleton height="75px" width="85%" /></div>
                </div>
                
                <div class="result_attr">
                    <h3>Контактная информация</h3>
                </div>
                <div class="cart" v-if="customer && !isLoadingData">
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
                <div v-if="isLoadingData">
                    <div class="mt-2"><Skeleton height="25px" width="90%" /></div>
                    <div class="mt-2"><Skeleton height="15px" width="100%" /></div>
                    <div class="mt-2"><Skeleton height="45px" width="85%" /></div>
                </div>

                <div class="result_attr">
                    <h3>Банковские реквизиты</h3>
                </div>
                <div class="cart" v-if="customer && !isLoadingData">
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
                        <p>Поставщик:</p>
                        <span class="fool-btn" v-if="contract.suppliers">
                            <a :href="`supplier/inn=${contract.suppliers[0].inn}&kpp=${contract.suppliers[0].kpp}`" target="_blank">
                            <u>{{ contract.suppliers[0].organizationName }}</u>
                            </a>
                        </span>
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
            idCustomer: null,
            customer: null,
            contracts: [],
            page: 1,
            totalContracts: 0,
            isLoadingData: true,
            isLoadingContracts: true
        }
    },
    components: { Header, Paginator, Skeleton, Footer },
    async created() {
        const route = useRoute();
        document.title = 'Заказчик';
        this.page = 1;
        this.idCustomer = route.params.id;
        await this.setDataFromServer();
    },
    methods: {
        async setDataFromServer(loadingData=true, loadingContacts=true) {

            if (loadingData) this.isLoadingData = true;
            if (loadingContacts) this.isLoadingContracts = true;

            this.contracts = [];
            const request = await axios.post(`${serverUrl}api/getCustomer`, { id: this.idCustomer, page: this.page });
            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.customer = request.data.data.customers.data[0];
                this.contracts = request.data.contracts.contracts.data;
                this.totalContracts = request.data.contracts.contracts.total;

                this.isLoadingData = false;
                this.isLoadingContracts = false;

            } else {
                this.customer = {};
                alert(`Ошибка: ${request.data.text}`);
            }
        },
        getAccountData(account) {
            let data;
            (Array.isArray(account)) ? data = account[0] : data = account;

            return data;
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