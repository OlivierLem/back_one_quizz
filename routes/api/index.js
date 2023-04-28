const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiThemes = require('./themes');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/themes', apiThemes);

module.exports = router;