const mongoose = require('../config/database');
const eventSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    eventName: {
        type: String
    },
     location: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    }, 
    photo: {
        type: String
       }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Evenement', eventSchema);