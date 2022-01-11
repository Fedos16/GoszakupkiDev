<template>
    <div>
        <Header />
        <div class="container">
            <Options v-on:options="optionFilter" v-bind:disabledState="disabledState" />
            <Results
                :contracts="contracts" 
                :options="options"
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
            options: [],
            disabledState: 'Найти'
        }
    },
    methods: {
        title() {
            document.title = 'Мой проект'
        },
        async optionFilter(options) {

            this.disabledState = 'Загрузка';
            this.contracts = [];

            if (Object.keys(options).length == 0) {
                alert('Параметры не заданы');
                this.disabledState = 'Найти';
                return;
            }

            const request = await axios.post(`${serverUrl}api/contracts`, options);

            let reqStatus = request.data.ok;
            if (reqStatus) {
                this.contracts = request.data.data.contracts.data;
            } else {
                this.contracts = [];
                alert(`Ошибка: ${request.data.text}`);
            }

            this.disabledState = 'Найти';

        },
    },
    mounted() {
        this.title()
    },
    components: { Header, Options, Results }
}
</script>

<style>

</style>