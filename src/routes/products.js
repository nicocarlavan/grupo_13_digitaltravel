var express = require('express');
var router = express.Router();
const path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../../public/images/products'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage });


const productsController = require('../controllers/productsController')

router.get('/', productsController.index);

router.get('/productDetail/:id', productsController.detalle);

router.get('/cart', productsController.cart);

router.post('/cart', productsController.cart);

router.get('/edit/:id', productsController.edicion);

router.get('/create/', productsController.edicion);

router.post('/store', upload.single('image'), productsController.store);

router.post('/delete/:id', productsController.destroy);

module.exports = router;