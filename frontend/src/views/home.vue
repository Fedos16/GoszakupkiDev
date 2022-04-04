<template>
    <div>
        <Header />
        <div class="container">
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
    </div>
</template>

<script>
import Header from '../components/header.vue';
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
            document.title = 'Мой проект'
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
    components: { Header, Options, Results }
}
</script>

<style>

</style>