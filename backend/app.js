const express = require('express');
const path = require('path')

const config = require('./config');
const routes = require('./routes');

const app = express()

if (config.IS_PRODUCTION) {
    const serveStatic = require('serve-static');
    app.use(serveStatic(path.join(__dirname, 'client')))
}

if (!config.IS_PRODUCTION) {
    const cors = require('cors');
    // CORS REQUEST
    const corsOptions = {
        origin: config.CLIENT_URL
    }
    app.use(cors(corsOptions));
}

app.use(express.json());

app.use('/api', routes.contracts);

app.listen(config.PORT, () => {
    console.log('Server started  ' + config.PORT);
});