const router = require('express').Router();
const axios = require('axios');

const urlAPI = 'http://openapi.clearspending.ru/restapi/v3/contracts/search/';

router.post('/contracts', async (req, res) => {
    try {

        let body = req.body;
        let keys = Object.keys(body);

        let arrReq = keys.map(key => { return `${key}=${body[key]}` });

        const url = `${urlAPI}?${arrReq.join('&')}&sort=-signDate`;

        const reqAPI = await axios.get(encodeURI(url));

        const data = reqAPI.data;

        res.json({ ok: true, data });

    } catch(e) {
        console.log(e.response);
        res.json({ ok: false, text: e.response.data });
    }
});

module.exports = router;