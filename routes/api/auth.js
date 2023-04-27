const UserModel = require('../../database/models/users.model');
const bcrypt = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');
const { key, keyPub} = require("../../keys");
const router = require('express').Router();

router.post('/', async (req, res) => {
    const { pseudo, password, stayConnected} = req.body;
    try {
        const user = await UserModel.findOne({ pseudo }).exec();
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                if (stayConnected) {
                    const token = jsonwebtoken.sign({}, key, {
                        subject: user._id.toString(),
                        expiresIn: 3600 * 24 * 30 * 6,
                        algorithm: "RS256"
                    })
                    res.cookie('token', token);
                }
                res.json(user)
            } else {
                res.status(400).json('Pseudo et/ou mots de passe incorrect')
            }
        } else {
            res.status(400).json('Pseudo et/ou mots de passe incorrect')
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json('Pseudo et/ou mots de passe incorrect')
    }
})

router.get('/current', async(req, res) => {
    const { token } = req.cookies;
    if (token) {
        try {
            const decodedToken = jsonwebtoken.verify(token, keyPub, {
                algorithms: "RS256",
            });
           /*  console.log({decodedToken}); */
            const currentUser = await UserModel.findById(decodedToken.sub)
                .select('-password -__v')
                .exec()
            if (currentUser) {
                res.json(currentUser)
            } else {
                res.json(null)
            }
        } catch (error) {
            console.error(error)
            res.json(null)
        }
    } else {
        res.json(null)
    }
})

router.delete('/', (req, res) => {
    res.clearCookie('token');
    res.end();
})

module.exports = router;