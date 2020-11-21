const mongoose = require('../config/database');
const cartographySchema = mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Cartography', cartographySchema);