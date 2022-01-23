const mongoose = require('mongoose');
const schema = mongoose.Schema;

const User = new schema({
    name: {type: String, required: true},
    username: {type: String, minlength: 5},
    password: {type: String, minlength: 5},
    refreshToken: {type: String},
    socketId: {type: String},


});

module.exports = mongoose.model('User', User);
