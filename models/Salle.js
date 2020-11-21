const mongoose = require('../config/database');
const salleSchema = mongoose.Schema({
    salleName: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    description: {
        type: String
    },
    floor: {
        type: Number
    },
    lat: {
        type: Number
    },
    lon: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Salle', salleSchema);