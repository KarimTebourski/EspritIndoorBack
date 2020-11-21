const mongoose = require('../config/database');
const commentSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
        type: String
    },
    contenu: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Comment', commentSchema);