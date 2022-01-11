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
      <h3>Результаты поиска</h3>
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
          <span class="fool-btn">{{contract.regNum}}</span>
        </div>

        <div class="cart_item">
          <p>Статус контpакта:</p>
          <span class="fool-btn">{{ getStatusNameContract(contract.currentContractStage) }}</span>
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
          <p>Заказчик:</p>
          <span class="fool-btn"> {{ contract.customer.fullName }}</span>
        </div>

        <div class="cart_item">
          <p>Поставщик:</p>
          <span class="fool-btn" v-if="contract.suppliers">{{ contract.suppliers[0].organizationName }}</span>
        </div>

        <div class="cart_item">
          <p>Цена контракта:</p>
          <span class="fool-btn">{{ moneyFormat(contract.price) }} рублей</span>
        </div>

        <div class="cart_item">
          <p>Предмет:</p>
          <span class="fool-btn" v-if="contract.products">{{ contract.products[0].name }} ... 
            <u @click="changeIdsShowTable(contract.regNum)"> {{ idsShowTable[contract.regNum] || 'показать' }} все ({{ contract.products.length }})</u>
          </span>
        </div>

        <div class="cart_item" v-if="idsShowTable[contract.regNum]">
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
            <tbody>
              <tr v-for="(prod, index) in contract.products" :key="prod">
                <td>{{ index + 1 }}</td>
                <td>{{ prod.name }}</td>
                <td v-if="prod.OKEI">{{ prod.OKEI.name }}</td><td v-else>?</td>
                <td v-if="prod.quantity">{{ prod.quantity }}</td><td v-else>?</td>
                <td v-if="prod.price">{{ moneyFormat(prod.price) }}</td><td v-else>?</td>
                <td v-if="prod.sum">{{ moneyFormat(prod.sum) }}</td><td v-else>?</td>
              </tr>
            </tbody>
          </table>
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
      idsShowTable: {},
      isShowItemList: 0,
      activeContract: null
    }
  },
  props: ['contracts', 'options'],
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
    changeIdsShowTable(id) {
      if (id in this.idsShowTable) {
        delete this.idsShowTable[id];
      } else {
        this.idsShowTable[id] = 'скрыть';
      }
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

    }
  },
  mounted() {}
}
</script>