const express = require('express');
const dotenv = require('dotenv');
const cryptoRoutes = require('./routes/crypto.routes');
const { updateCryptoPrices } = require('./controllers/crypto.cotroller');
const { DEFAULT_PORT } = require('./common/constants/default-port.const');
const { MILLISECONDS_IN_HOURE } = require('./common/constants/date.const')
const mongoose = require('mongoose');

dotenv.config();
require('./config');

const app = express();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());
app.use('/api/crypto', cryptoRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    updateCryptoPrices();
    setInterval(updateCryptoPrices, MILLISECONDS_IN_HOURE);
});