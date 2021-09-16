var express = require('express');
var router = express.Router();

const homeController = require('../controllers/homeController')

router.get('/', homeController.home);

router.post('/', homeController.home);

module.exports = router;