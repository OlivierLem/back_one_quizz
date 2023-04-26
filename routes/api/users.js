const UserModel = require('../../database/models/users.model')

const bcrypt =  require('bcrypt');
const router = require('express').Router();

router.post('/', async (req, res ) => {
    const { pseudo, email, password } = req.body;
    console.log(req);
    const newUser = new UserModel({
        pseudo,
        email,
        password: await bcrypt.hash(password, 8),
        image: null,
        status: null,
        role: 'normal'
    });
    try {
        const user = await newUser.save();
        console.log({user});
        res.send(user);

    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json('Email déjà utilisé');
        } else {
            res.status(400).json("Oops il y'a une erreur");
        }
    }
})

module.exports = router