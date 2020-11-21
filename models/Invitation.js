const mongoose = require('../config/database');
const invitationSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
     accept: {
         type: Boolean,
        default:false
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
});
module.exports = mongoose.model('Invitation', invitationSchema);