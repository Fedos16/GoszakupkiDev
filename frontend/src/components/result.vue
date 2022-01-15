<template>

  <div class="result">

    <div @mouseleave="isShowItemList = 0" @click="downloadCard($event)" v-show="isShowItemList == 1" class="itemList">
      <ul>
        <li class="disabled-item">xlsx</li>
        <li class="disabled-item">csv</li>
        <li>json</li>
      </ul>
    </div>

    <div v-if="contracts.length > 0" class="result_attr">
      <h3>Найдено контрактов: {{ totalContracts }} (максимум 500)</h3>
    </div>

    <div class="result_attr pos_right">
      <button @click="changeStateFilter" class="btn_reverce" :class="{ 'sort_active': sortType == 'price' || sortType == '-price' }" value="price">
        По сумме контракта <span v-if="sortType == 'price' || sortType == '-price'">| 
          <i class="fas" :class="{ 'fa-chevron-down': sortType=='-price', 'fa-chevron-up': sortType=='price' }"></i></span>
      </button>
      <button @click="changeStateFilter" class="btn_reverce" :class="{ 'sort_active': sortType == 'signDate' || sortType == '-signDate' }" value="signDate">
        По дате заключения <span v-if="sortType == 'signDate' || sortType == '-signDate'">| 
          <i class="fas" :class="{ 'fa-chevron-down': sortType=='-signDate', 'fa-chevron-up': sortType=='signDate' }"></i></span>
      </button>
    </div>

    <div class="result_inner">

      <div 
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
          <p>Статус контpакта:</p>
          <span class="fool-btn">{{ getStatusNameContract(contract.currentContractStage) }}</span>
        </div>

        <div class="cart_item">
          <p>Заказчик:</p>
          <span class="fool-btn"><a :href="'customer/' + contract.customer.regNum" target="_blank"><u>{{ contract.customer.fullName }}</u></a></span>
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
          <p>Федеральный закон:</p>
          <span class="fool-btn">№ {{ contract.fz }} ФЗ</span>
        </div>

        <div class="cart_item">
          <p>Дата заключения:</p>
          <span class="fool-btn">{{ new Date(contract.signDate).toLocaleDateString('ru-RU') }}</span>
        </div>

        <div class="cart_item">
          <p>Цена контракта:</p>
          <span class="fool-btn">{{ moneyFormat(contract.price) }} рублей</span>
        </div>

        <div class="cart_item">
          <p>Предмет:</p>
          <span class="fool-btn" v-if="contract.products">{{ contract.products[0].name }} ... 
            <a :href="'/contract/' + contract.regNum" target="_blanck"><u> показать все ({{ contract.products.length }})</u></a>
          </span>
        </div>

        <button @click="showItemList(contract.regNum)" class="download_btn">
          <img src="@/assets/download.png" alt="">
        </button>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      contractsData: this.contracts,
      optionsData: this.options,
      isShowItemList: 0,
      activeContract: null
    }
  },
  props: ['contracts', 'options', 'totalContracts', 'sortType'],
  methods: {
    downloadCard(e) {

      function setAndDownloadJSON(data) {
        data = JSON.stringify(data, null, '\t');
        const blob = new Blob([data], {type: 'text/plain'})
        const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = `${activeContract}.json`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
      }

      let typeFile = e.target.textContent;

      const activeContract = this.activeContract;

      console.log(activeContract);

      if (activeContract) {
        const contracts = this.contracts;
        let contract = contracts.find(row => row.regNum == activeContract);

        if (contract) {
          if (typeFile == 'json') {
            setAndDownloadJSON(contract);
          }
        }
      }
    },
    moneyFormat(money) {
      return (String(money).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace(' руб.', '');
    },
    getStatusNameContract(letter) {
      const listStatuses = {
        'E': 'Исполнение',
        'EC': 'Исполнение завершено',
        'ET': 'Исполнение прекращено',
        'IN': 'Аннулирован'
      }

      if (letter in listStatuses) return listStatuses[letter];
      return 'Неизвестно';
    },
    showItemList(idContract) {
      this.activeContract = idContract;
      this.isShowItemList = 1;

      let element = this.$el.ownerDocument.activeElement;
      let { x, y } = element.getBoundingClientRect();

      let elResult = document.querySelector('.result');
      let coordsRes = elResult.getBoundingClientRect();
      let xRes = coordsRes.x;
      let yRes = coordsRes.y;

      const elItemList = document.querySelector('.itemList');

      elItemList.style.top = `${y - yRes}px`;
      elItemList.style.left = `${x - xRes - 70}px`;

    },
    changeStateFilter(e) {
      let element = e.target;
      let val = element.value;

      if (val == 'price') {
        this.$emit('changeStateSort', '-price');
        e.target.value = '-price';
      } else if (val == '-price') {
        this.$emit('changeStateSort', 'price');
        e.target.value = 'price';
      }
      
      if (val == 'signDate') {
        this.$emit('changeStateSort', '-signDate');
        e.target.value = '-signDate';
      } else if (val == '-signDate') {
        this.$emit('changeStateSort', 'signDate');
        e.target.value = 'signDate';
      }

    }
  },
  mounted() {}
}
</script>