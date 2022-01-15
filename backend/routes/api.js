const router = require('express').Router();
const axios = require('axios');

const urlAPI = 'http://openapi.clearspending.ru/restapi/v3/';

router.post('/contracts', async (req, res) => {
    try {

        let body = req.body;
        let keys = Object.keys(body);

        let arrReq = keys.map(key => { return `${key}=${body[key]}` });

        const url = `${urlAPI}contracts/search/?${arrReq.join('&')}`;

        console.log(`Ищем контракты по ссылке ... ${url}`);

        const reqAPI = await axios.get(encodeURI(url));
        const data = reqAPI.data;

        res.json({ ok: true, data });

    } catch(e) {
        console.log(e.response);
        res.json({ ok: false, text: e.response.data });
    }
});

router.post('/getContract', async (req, res) => {
    try {

        const { id } = req.body;

        const url = `${urlAPI}contracts/search/?regnum=${id}`;

        console.log(`Получаем контракт по ссылке ... ${url}`);

        const reqAPI = await axios.get(encodeURI(url));
        const data = reqAPI.data;


        res.json({ ok: true, data });

    } catch(e) {
        console.log(e.response);
        res.json({ ok: false, text: e.response.data });
    }
});

router.post('/getCustomer', async (req, res) => {
    try {

        const { id } = req.body;

        const url = `${urlAPI}customers/search/?spzregnum=${id}`;

        console.log(`Получаем заказчика по ссылке ... ${url}`);

        const reqAPI = await axios.get(encodeURI(url));
        const data = reqAPI.data;


        res.json({ ok: true, data });

    } catch(e) {
        console.log(e);
        res.json({ ok: false, text: 'Ошибка запроса' });
    }
});

router.post('/getSupplier', async (req, res) => {
    try {

        const { inn, kpp } = req.body;

        let paramsReq = '?';
        if (inn) paramsReq += `inn=${inn}`;
        if (kpp != 'undefined') {
            (inn) ? paramsReq += `&kpp=${kpp}` : paramsReq += `kpp=${kpp}`;
        }

        const url = `${urlAPI}suppliers/search/${paramsReq}`;

        console.log(`Получаем поставщика по ссылке ... ${url}`);

        const reqAPI = await axios.get(encodeURI(url));
        const data = reqAPI.data;


        res.json({ ok: true, data });

    } catch(e) {
        console.log(e);
        res.json({ ok: false, text: 'Ошибка запроса' });
    }
});

module.exports = router;