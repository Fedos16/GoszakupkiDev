export default {
    moneyFormat(money) {
        money = ((money).toFixed(2)).replace('.', ',');
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
    }
}