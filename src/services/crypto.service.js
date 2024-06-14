const Crypto = require('../models/Crypto.model');

class CryproService {
    async getSupportedCryptos() {
        return await Crypto.find({}, 'symbol name');
    }

    async getCryptoPrice(symbolArray) {
        return await Crypto.find({ symbol: { $in: symbolArray } });
    }

    async updateCryptoPrices(assets) {
        const updates = assets.map(asset => ({
            updateOne: {
                filter: { symbol: asset.asset_id },
                update: { price: asset.price_usd, lastUpdated: new Date() },
                upsert: true
            }
        }));

        Crypto.bulkWrite(updates);
    }
}

module.exports = CryproService