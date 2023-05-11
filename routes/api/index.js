const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiThemes = require('./themes');
const apiQuestions = require('./questions');

router.use('/users', apiUsers);
router.use('/auth', apiAuth);
router.use('/themes', apiThemes);
router.use('/questions', apiQuestions);

module.exports = router;