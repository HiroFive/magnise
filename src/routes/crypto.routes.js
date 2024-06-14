const express = require('express');
const { getSupportedCryptos, getCryptoPrice } = require('../controllers/crypto.cotroller');

const router = express.Router();

router.get('/supported', getSupportedCryptos);
router.get('/price', getCryptoPrice);

module.exports = router;