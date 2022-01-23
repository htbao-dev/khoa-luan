const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('../models/User');

const Room = new schema({
    name: String,
    members: [
        String
    ],
    messages: [
        {
            senderId: {type: mongoose.Schema.Types.ObjectId},
            message: {type: String, required: true},
            date: {type: Date, default: Date.now}
        }
    ]
});

module.exports = mongoose.model('Room', Room);