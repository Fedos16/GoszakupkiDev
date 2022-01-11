<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Информация о контракте №</h3>
                </div>
                <div class="cart">
                    <div class="cart_item">
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
                            <tbody></tbody>
                        </table>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/header.vue'

export default {
    components: { Header }
}
</script>

<style>

</style>