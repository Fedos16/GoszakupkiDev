<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Регистрационные данные организации</h3>
                </div>
                <div class="cart">
                    <div class="cart_item">
                        <p>Полное наименование:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>ИНН / КПП:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Форма организации:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Регион:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Адрес:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Количество контрактов:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Сумма контрактов:</p>
                        <span class="fool-btn">...</span>
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