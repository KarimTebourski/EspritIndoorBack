const mongoose = require('../config/database');
const discussionSchema = mongoose.Schema({
    sender: {
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
module.exports = mongoose.model('Discussion', discussionSchema);