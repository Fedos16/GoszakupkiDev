const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    CLIENT_URL: process.env.CLIENT_URL
}