<template>
    <div class="main">
        <Header />
        <div class="container">
            <div class="description">
                <p>Госконтакты РФ</p>
                <p>
                    Информация о государственных и муниципальных контрактах и договорах предоставляется из официальной Единой информационной системы РФ для размещения информации о заказах на поставки товаров, выполнение работ и оказание услуг — zakupki.gov.ru
                </p>
                <p>
                    Проект <span>«Закупгос»</span> предоставляет данные о контрактах и договорах, заключенных в соответствии с федеральными законами №94-ФЗ, №44-ФЗ и №223-ФЗ, начиная с 2011 года и обновляет их ежедневно.
                </p>
            </div>
            <Options 
                @options="optionFilter"
                :disabledState="disabledState"
                :sortType="sort"
                :currentPage="page"
            />
            <Results
                :contracts="contracts" 
                :options="options"
                :totalContracts="totalContracts"
                :sortType="sort"
                :perPage="perPage"
                @changeStateSort="changeStateSort"
                @changeCurrentPage="changeCurrentPage"
            />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/header.vue';
import Footer from '../components/footer.vue';

import Options from '../components/options.vue';
import Results from '../components/result.vue';

import axios from 'axios';

const serverUrl = process.env.VUE_APP_SERVER_URL;

export default {
    name: 'App',
    data() {
        return {
            contracts: [],
            totalContracts: 0,
            options: [],
            disabledState: 'Найти',
            sort: '',
            perPage: 50,
            page: 1,
        }
    },
    methods: {
        title() {
            document.title = 'zakupgos'
        },
        async optionFilter(options) {

            this.disabledState = 'Загрузка';
            this.contracts = [];

            this.perPage = options.perpage;

            if (Object.keys(options).length == 0) {
                alert('Параметры не заданы');
                this.disabledState = 'Найти';
                return;
            }

            const request = await axios.post(`${serverUrl}api/contracts`, options);

            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.contracts = request.data.data.contracts.data;
                this.totalContracts = request.data.data.contracts.total;
            } else {
                this.contracts = [];
                alert(`Ошибка: ${request.data.text}`);
            }

            this.disabledState = 'Найти';

        },
        changeStateSort(name) {
            this.sort = name;
        },
        changeCurrentPage(page) {
            console.log(page + 1);
            this.page = page;
        }
    },
    mounted() {
        this.title()
    },
    components: { Header, Options, Results, Footer }
}
</script>

<style>

</style>