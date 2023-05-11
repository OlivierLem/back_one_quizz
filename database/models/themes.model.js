const mongoose = require("mongoose");

const themeSchema = mongoose.Schema({
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

const ThemeModel = mongoose.model('theme', themeSchema);

module.exports = ThemeModel;