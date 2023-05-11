const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;