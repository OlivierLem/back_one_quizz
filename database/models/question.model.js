const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: String,
    responses: [{
        isValid: Boolean,
        name: String
    }],
    theme: { 
        type: mongoose.ObjectId, 
        ref: 'theme' 
    },
    questionType: String,
    times: Number,
    status: String,
    user: { 
        type: mongoose.ObjectId, 
        ref: 'user' 
    },
})

const QuestionModel = mongoose.model('question', questionSchema);

module.exports = QuestionModel;