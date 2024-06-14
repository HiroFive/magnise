const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    lastUpdated: { type: Date, required: true }
});

module.exports = mongoose.model('Crypto', cryptoSchema);
