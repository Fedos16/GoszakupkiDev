const router = require('express').Router();
const axios = require('axios');

const urlAPI = 'http://openapi.clearspending.ru/restapi/v3/contracts/search/';

router.post('/contracts', async (req, res) => {
    try {

        let body = req.body;
        let keys = Object.keys(body);

        let arrReq = keys.map(key => { return `${key}=${body[key]}` });

        const url = `${urlAPI}?${arrReq.join('&')}`;

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

        const url = `${urlAPI}?regnum=${id}`;

        console.log(`Получаем контракт по ссылке ... ${url}`);

        const reqAPI = await axios.get(encodeURI(url));
        const data = reqAPI.data;


        res.json({ ok: true, data });

    } catch(e) {
        console.log(e.response);
        res.json({ ok: false, text: e.response.data });
    }
});

router.post('/customer/:id', async (req, res) => {
    try {

    } catch(e) {
        console.log(e);
        res.json({ ok: false, text: 'Ошибка запроса' });
    }
});

router.post('/supplier/:id', async (req, res) => {
    try {

    } catch(e) {
        console.log(e);
        res.json({ ok: false, text: 'Ошибка запроса' });
    }
});

module.exports = router;