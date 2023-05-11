const QuestionModel = require('../../database/models/question.model');
const jsonwebtoken = require('jsonwebtoken');
const { key, keyPub } = require ('../../keys');
const router = require('express').Router();

router.post('/create', async (req, res) => {
    const { question: intitule, responses, times, type, theme, status } = req.body;
    const { token } = req.cookies;
    if (token) {
        console.log('token user trouvé');
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
            
            const newQuestion = new QuestionModel({
                question: intitule,
                responses,
                times,
                questionType: type,
                theme,
                status,
                user: decodedToken.sub
            })

            const question = await newQuestion.save();
            console.log(question);
            res.send(question)

        } catch (error) {
            console.error(error)
            res.status(400).json(null)
        }
    }
})

module.exports = router