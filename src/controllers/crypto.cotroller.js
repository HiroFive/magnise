const axios = require('axios');
const dotenv = require('dotenv');
const { cryproService } = require('../services')
const { STATUS_CODE_ENUM } = require('../common/constants/http.const')

dotenv.config();

const getSupportedCryptos = async (req, res) => {
    try {
        const cryptos = await cryproService.getSupportedCryptos();
        res.json(cryptos);
    } catch (err) {
        res.status(STATUS_CODE_ENUM.SERVER_ERROR).json({ error: err.message });
    }
};

const getCryptoPrice = async (req, res) => {
    const { symbols } = req.query;

    if (!symbols) {
        return res.status(STATUS_CODE_ENUM.BAD_REQUEST).json({ error: 'Symbols query parameter is required' });
    }

    try {
        const symbolArray = symbols.split(',');
        const cryptos = await cryproService.getCryptoPrice(symbolArray)

        res.json(cryptos);
    } catch (err) {
        res.status(STATUS_CODE_ENUM.SERVER_ERROR).json({ error: err.message });
    }
};

const updateCryptoPrices = async () => {
    try {
        const response = await axios.get('https://rest.coinapi.io/v1/assets', {
            headers: { 'X-CoinAPI-Key': process.env.COINAPI_KEY }
        });

        const assets = response.data;
        await CryproService.updateCryptoPrices(assets)
        console.log('Crypto prices updated');
    } catch (err) {
        console.error(`Failed to update crypto prices: ${err.message}`);
    }
};

module.exports = {
    getSupportedCryptos,
    getCryptoPrice,
    updateCryptoPrices
};
