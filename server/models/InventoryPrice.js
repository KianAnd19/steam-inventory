const mongoose = require('mongoose');

const InventoryPriceSchema = new mongoose.Schema({
    steamId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    inventoryValue: {
        type: Number,
        required: true
    },
    profileURL: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('InventoryPrice', InventoryPriceSchema);