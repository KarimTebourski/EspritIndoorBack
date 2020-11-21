const mongoose = require('../config/database');
const statisticalSchema = mongoose.Schema({
     visitors: {
        type: Number
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    square: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cartography'
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Statistical', statisticalSchema);