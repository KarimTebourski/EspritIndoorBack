const mongoose = require('../config/database');
const messageSchema = mongoose.Schema({
    Content: {
        type: String
    },
    discussion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion'
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Message', messageSchema);