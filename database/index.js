const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://OlivierL:12345@cluster0.znrvnlk.mongodb.net/one_quizz?retryWrites=true&w=majority")
    .then(() => {
        console.log('CONNEXION DB OK');
    })
    .catch(e => {
        console.error("CONNEXION DB KO", e)
    })