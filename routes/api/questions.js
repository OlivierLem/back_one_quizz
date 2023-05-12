const QuestionModel = require('../../database/models/question.model');
const jsonwebtoken = require('jsonwebtoken');
const { key, keyPub } = require ('../../keys');
const UserModel = require('../../database/models/users.model');
const ThemeModel = require('../../database/models/themes.model');
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
            console.log(theme)
            const themeBack = await ThemeModel.findOne({name: theme},).select('-image').exec()
            if(themeBack) {
                console.log('theme trouvé')
                const newQuestion = new QuestionModel({
                    question: intitule,
                    responses,
                    times,
                    questionType: type,
                    theme: themeBack._id,
                    status,
                    user: decodedToken.sub
                }) 
                console.log(newQuestion);
                const question = await newQuestion.save();
                res.send(question)
            }
            
            

        } catch (error) {
            console.error(error)
            res.status(400).json(null)
        }
    }
})

router.get('/', async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        console.log('token utilisateur trouvé')
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: 'RS256',
            });

            //! Voir comment utiliser jointure avec populate et exec

            const questions = await QuestionModel.find({user: decodedToken.sub}).populate('user').exec()
            
            //* Afficher les questions public
            // const questions = await QuestionModel.find({status: 'public'}).populate('user').exec()
            
            if(questions) {
                let user
                for (const question of questions) {
                    user = await UserModel.findById(question.user).select('-email -role -status -password -__v').exec()
                    question.user = user;
                }
                res.json(questions)
            } else {
                res.json(null)
            }
        } catch (error) {
            console.error(error);
            res.json(null)
        }
    }
})

module.exports = router