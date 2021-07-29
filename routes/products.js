var express = require('express');
var router = express.Router();

const productsController = require('../controllers/productsController')

router.get('/productDetail', productsController.detalle);

router.get('/cart', productsController.cart);

router.post('/cart', productsController.cart);
module.exports = router;