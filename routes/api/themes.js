const ThemeModel = require('../../database/models/themes.model');
const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('théme trouver');
    try {
        console.log('try');
        const themes = await ThemeModel.find()
        if (themes) {
        console.log('if');
            res.json(themes)
        } else {
        console.log('else');

            res.json(null)
        }
    } catch (error) {
        console.log('catch');

        //console.error(error)
        res.json(null)
    }
})

module.exports = router;