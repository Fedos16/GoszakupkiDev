<template>
  <!-- <div class="options w-9 m-auto grid grid-nogutter">
    <div class="row grid">
      <div class="col"><InputText class="w-full" /></div>
    </div>
  </div> -->

  <div class="options">
    <div class="options_inner">

      <div class="option">
        <label for="contactsNumers">№ контракта</label>
        <input v-model="regnum" id="contactsNumers" type="text" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="contractsDate">Дата заключения контракта</label>
        <input v-model="daterange" id="contractsDate" type="text">
      </div>

      <div class="option">
        <label for="priceGte">Сумма контракта от</label>
        <input v-model="priceGte" id="priceGte" type="number" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="priceLte">Сумма контракта до</label>
        <input v-model="priceLte" id="priceLte" type="number" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="supplierinn">ИНН  поставщика</label>
        <input v-model="supplierinn" id="Supplier" type="text" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="supplierkpp">КПП поставщика</label>
        <input v-model="supplierkpp" id="supplierkpp" type="text" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="customerinn">ИНН заказчика</label>
        <input v-model="customerinn" id="customerinn" type="text" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="kpp">КПП заказчика</label>
        <input v-model="customerkpp" id="kpp" type="text" placeholder="Мой ответ">
      </div>

      <div class="option">
        <label for="id_customerregion">Регион поставщика</label>
        <select v-model="customerregion" id="id_customerregion" class="form-control" name="customerregion">
          <option value=""></option>
          <option value="22">Алтайский край</option>
          <option value="28">Амурская область</option>
          <option value="29">Архангельская область</option>
          <option value="30">Астраханская область</option>
          <option value="31">Белгородская область</option>
          <option value="32">Брянская область</option>
          <option value="33">Владимирская область</option>
          <option value="34">Волгоградская область</option>
          <option value="35">Вологодская область</option>
          <option value="36">Воронежская область</option>
          <option value="79">Еврейская автономная область</option>
          <option value="75">Забайкальский край</option>
          <option value="37">Ивановская область</option>
          <option value="38">Иркутская область</option>
          <option value="07">Кабардино-Балкарская Республика</option>
          <option value="39">Калининградская область</option>
          <option value="40">Калужская область</option>
          <option value="41">Камчатский край</option>
          <option value="09">Карачаево-Черкесская Республика</option>
          <option value="42">Кемеровская область</option>
          <option value="43">Кировская область</option>
          <option value="44">Костромская область</option>
          <option value="23">Краснодарский край</option>
          <option value="24">Красноярский край</option>
          <option value="91">Крым</option>
          <option value="45">Курганская область</option>
          <option value="46">Курская область</option>
          <option value="47">Ленинградская область</option>
          <option value="48">Липецкая область</option>
          <option value="49">Магаданская область</option>
          <option value="77">Москва</option>
          <option value="50">Московская область</option>
          <option value="51">Мурманская область</option>
          <option value="83">Ненецкий автономный округ</option>
          <option value="52">Нижегородская область</option>
          <option value="53">Новгородская область</option>
          <option value="54">Новосибирская область</option>
          <option value="55">Омская область</option>
          <option value="56">Оренбургская область</option>
          <option value="57">Орловская область</option>
          <option value="58">Пензенская область</option>
          <option value="59">Пермский край</option>
          <option value="25">Приморский край</option>
          <option value="60">Псковская область</option>
          <option value="01">Республика Адыгея</option>
          <option value="04">Республика Алтай</option>
          <option value="02">Республика Башкортостан</option>
          <option value="03">Республика Бурятия</option>
          <option value="05">Республика Дагестан</option>
          <option value="06">Республика Ингушетия</option>
          <option value="08">Республика Калмыкия</option>
          <option value="10">Республика Карелия</option>
          <option value="11">Республика Коми</option>
          <option value="12">Республика Марий Эл</option>
          <option value="13">Республика Мордовия</option>
          <option value="14">Республика Саха (Якутия)</option>
          <option value="15">Республика Северная Осетия — Алания</option>
          <option value="16">Республика Татарстан</option>
          <option value="17">Республика Тыва</option>
          <option value="19">Республика Хакасия</option>
          <option value="61">Ростовская область</option>
          <option value="62">Рязанская область</option>
          <option value="63">Самарская область</option>
          <option value="78">Санкт-Петербург</option>
          <option value="64">Саратовская область</option>
          <option value="65">Сахалинская область</option>
          <option value="66">Свердловская область</option>
          <option value="92">Севастополь</option>
          <option value="67">Смоленская область</option>
          <option value="26">Ставропольский край</option>
          <option value="68">Тамбовская область</option>
          <option value="69">Тверская область</option>
          <option value="70">Томская область</option>
          <option value="71">Тульская область</option>
          <option value="72">Тюменская область</option>
          <option value="18">Удмуртская Республика</option>
          <option value="73">Ульяновская область</option>
          <option value="27">Хабаровский край</option>
          <option value="86">Ханты-Мансийский автономный округ — Югра</option>
          <option value="74">Челябинская область</option>
          <option value="20">Чеченская Республика</option>
          <option value="21">Чувашская Республика</option>
          <option value="87">Чукотский автономный округ</option>
          <option value="89">Ямало-Ненецкий автономный округ</option>
          <option value="76">Ярославская область</option>
        </select>
      </div>

      <div class="option">
        <label for="id_fz">Федеральный закон</label>
        <select v-model="fz" id="id_fz" class="form-control" name="fz">
          <option value="None" selected="selected">По всем федеральным законам</option>
          <option value="94">94-ФЗ</option>
          <option value="44">44-ФЗ</option>
          <option value="223">223-ФЗ</option>
        </select>
      </div>

      <div class="option">
        <label>Сортировать</label>
        <select v-model="sort" name="sort" id="id_sort">
          <option value=""></option>
          <option value="-price">Max сумма вверху</option>
          <option value="price">Min сумма вверху</option>
          <option value="-signDate">Новые вверху</option>
          <option value="signDate">Старые вверху</option>
        </select>
      </div>
      <div class="option">
        <label>Контактов на странице</label>
        <select v-model="perPage" id="perpage">
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>

    <div class="options_inner">
      <div class="option optin-max">
        <input v-model="productsearch" id="productsearch" type="text" placeholder="Предмет контракта">
      </div>
    </div>

    <div class="btn_container btn_container-center">
      
      <button @click="toApply" class="btn button" v-bind:disabled="disabledState == 'Загрузка'">{{ disabledState }}</button>
    </div>
  </div>
</template>

<script>

import AirDatepicker from 'air-datepicker';
//import InputText from 'primevue/inputtext';
import 'air-datepicker/air-datepicker.css';

export default {
  data() {
    return {
      regnum: '',
      productsearch: '',
      daterange: '',
      priceGte: '',
      priceLte: '',
      customerinn: '',
      supplierinn: '',
      customerkpp: '',
      supplierkpp: '',
      customerregion: '',
      sort: '',
      fz: '',
      perPage: 50,
      page: 1
    }
  },
  props: ['disabledState', 'sortType', 'currentPage'],
  methods: {
    toApply() {
      let options = {};

      this.daterange = document.querySelector('#contractsDate').value;
      
      if(this.regnum) options.regnum = this.regnum;
      if (this.productsearch) options.productsearch = this.productsearch;
      if (this.priceGte || this.priceLte) {
        let minVal = 0;
        let maxVal = 0;
        if (this.priceGte) minVal = this.priceGte;
        if (this.priceLte) maxVal = this.priceLte;

        options.pricerange = `${minVal}-${maxVal}`;
      }
      if(this.daterange) {
        let date = this.daterange;
        if (date.indexOf('-') != -1) {
          options.daterange = this.daterange;
        } else {
          // Точная дата
          options.daterange = `${this.daterange}-${this.daterange}`;
        }
      }
      if(this.customerinn) options.customerinn = this.customerinn;
      if(this.supplierinn) options.supplierinn = this.supplierinn;
      if(this.customerkpp) options.customerkpp = this.customerkpp;
      if(this.supplierkpp) options.supplierkpp = this.supplierkpp;
      if(this.customerregion) options.customerregion = this.customerregion;
      if(this.sort) options.sort = this.sort;
      if(this.fz) options.fz = this.fz;
      if (this.perPage) options.perpage = this.perPage;
      if (this.page) options.page = this.page;
      
      this.$emit('options', options);

    },
    iniAirDatePicker() {
      new AirDatepicker('#contractsDate', {
        range: true,
        multipleDatesSeparator: '-',
        autoClose: true,
      });
    }
  },
  mounted() {
    this.iniAirDatePicker();
    this.perpage = 50;
  },
  watch: {
    sortType: function (value) {
      this.sort = value;
      this.toApply();
    },
    currentPage: function (value) {
      this.page = value;
      this.toApply();
    }
  }
}
</script>