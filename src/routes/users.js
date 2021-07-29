var express = require('express');
var router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);

router.get('/register', usersController.registro);

module.exports = router;