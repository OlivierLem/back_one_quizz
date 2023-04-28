const mongoose = require("mongoose");

const themeShema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        unique: true
    },
    like: Number,
    category: String,
})

const ThemeModel = mongoose.model('theme', themeShema);

module.exports = ThemeModel;