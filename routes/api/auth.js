const UserModel = require('../../database/models/users.model');
const bcrypt = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const { pseudo, password} = req.body;
    try {
        const user = await UserModel.findOne({ email }.exec())
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jsonwebtoken.sign({}, key, {
                    subject: user._id.toString(),
                    expiresIn: 3600 * 24 * 30 * 6,
                    algorithm: "RS256"
                })
                res.cookie('token', token);
                res.json(user)
            } else {
                res.status(400).json('Email et/ou mots de passe incorrect')
            }
        } else {
            res.status(400).json('Email et/ou mots de passe incorrect')
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json('Email et/ou mots de passe incorrect')
    }
})

router.get('/current', async(req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keypub)
            console.log({decodedToken});
            const currentUser = await UserModel.findById(decodedToken.sub)
                .select('-password -__v')
                .exec()
            if (currentUser) {
                return res.json(currentUser)
            } else {
                return res.json(null)
            }
        } catch (error) {
            return res.json(null)
        }
    }
})

module.exports = router;