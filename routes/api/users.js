const UserModel = require('../../database/models/users.model')

const bcrypt =  require('bcrypt');
const router = require('express').Router();

router.post('/', async (req, res ) => {
    const { pseudo_inscription, email, password_inscription } = req.body;
    const newUser = new UserModel({
        pseudo: pseudo_inscription,
        email,
        password: await bcrypt.hash(password_inscription, 8),
        image: null,
        status: null,
        role: 'normal'
    });
    console.log('inscription');
    try {
        const user = await newUser.save();
        res.send(user);

    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            let keyPattern = Object.keys(error.keyPattern)[0]
            res.status(400).json(`${keyPattern} déjà utilisé`);
        } else {
            res.status(400).json("Oops il y'a une erreur");
        }
    }
})

module.exports = router