const mongoose = require('../config/database');
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    born: {
        type: String
    },
    Lives: {
        type: String
    },
    From: {
        type: String
    },

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    etat: {
        type: Boolean,
        default: false
    },
    Phone: {
        type: Number
    },
    idaUuid: {
        type: String,
        default: "0"
    },
    imageProfil: {
        type: String
    },
    background: {
        type: String
    },
    image: [String],
    Token: String,

    isAdmin: {
        type: Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: true

    },
    isProfessor: {
        type: Boolean,
        default: false

    },
    isGuest: {
        type: Boolean,
        default: false

    },
    Nbr: Number,
    friend: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evenement'
    }],
    Demande: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true,
        versionKey: false
    });
var Contact = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    Contact.find(callback).limit(limit);
}