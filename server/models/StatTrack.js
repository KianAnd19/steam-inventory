const mongoose = require('mongoose');

const StatTrackSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    steamId: {
        type: String,
        required: true
    },
    steamName: {
        type: String,
        required: true
    },
    itemKills: {
        type: Number,
        required: true
    },
    profileURL: {
        type: String,
        required: true
    },
    itemURL: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StatTrack', StatTrackSchema);