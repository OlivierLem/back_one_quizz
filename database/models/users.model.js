const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    pseudo: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: String,
    image: String,
    status: String,
    role: String,
})

const UserModel = mongoose.model('user', userShema);

module.exports = UserModel;