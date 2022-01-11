<template>
    <div>
        <Header />
        <div class="container">
            <div class="result">
                <div class="result_attr">
                    <h3>Информация о заказчике</h3>
                </div>
                <div class="cart">
                    <div class="cart_item">
                        <p>Полное наименование:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Код по СПЗ:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>ИНН / КПП:</p>
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
                        <p>Уровень организации:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Тип организации:</p>
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
                
                <div class="result_attr">
                    <h3>Контактная информация</h3>
                </div>
                <div class="cart">
                    <div class="cart_item">
                        <p>Телефон / Факс:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Почтовый адрес:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Сайт:</p>
                        <span class="fool-btn">...</span>
                    </div>
                </div>

                <div class="result_attr">
                    <h3>Банковские реквизиты</h3>
                </div>
                <div class="cart">
                    <div class="cart_item">
                        <p>Название банка:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Адрес банка:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>БИК:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Расчетный счет:</p>
                        <span class="fool-btn">...</span>
                    </div>

                    <div class="cart_item">
                        <p>Лицевой счет:</p>
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