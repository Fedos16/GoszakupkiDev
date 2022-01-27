const express = require('express');
const path = require('path');

const config = require('./config');
const routes = require('./routes');

const app = express()

if (config.IS_PRODUCTION) {
    const serveStatic = require('serve-static');
    const history = require('connect-history-api-fallback');

    app.use(history());
    app.use(serveStatic(path.join(__dirname, 'client')))
}

if (!config.IS_PRODUCTION) {
    const cors = require('cors');

    const corsOptions = {
        origin: config.CLIENT_URL
    }

    app.use(cors(corsOptions));
}

app.use(express.json());

app.use('/api', routes.api);

app.listen(config.PORT, () => {
    console.log('Server started  ' + config.PORT);
});