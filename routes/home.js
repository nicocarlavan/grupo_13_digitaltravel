var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController')

router.get('/home', homeController.home);

router.post('/home', homeController.home);
module.exports = router;