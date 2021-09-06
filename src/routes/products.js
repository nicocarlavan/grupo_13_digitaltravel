var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

const authMiddleware = require('../middlewares/authMiddleware');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../../public/images/products'))
    },
    filename: function (req, file, cb) {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName)
    }
})
let upload = multer({ storage: storage });


const productsController = require('../controllers/productsController')

router.get('/', productsController.index);

router.get('/sale', productsController.sale);

router.get('/productDetail/:id', productsController.detalle);

router.get('/cart', authMiddleware, productsController.cart);

router.post('/cart', productsController.cart);

router.get('/edit/:id', authMiddleware, productsController.edit);

router.put('/edit/:id', productsController.update);

router.get('/create/', authMiddleware, productsController.edit);

router.post('/store', upload.single('image'), productsController.store);

router.post('/delete/:id', productsController.destroy);

module.exports = router;