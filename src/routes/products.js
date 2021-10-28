var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

const authMiddleware = require('../middlewares/authMiddleware');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const productValitation = require('../middlewares/productValidationMiddleware');



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

router.post('/', productsController.indexSearch);

router.get('/sale', productsController.sale);

router.get('/detail/:id', productsController.detalle);

router.get('/cart', authMiddleware, productsController.cart);

router.post('/cart', authMiddleware, productsController.addItemTocart);

router.post('/cart/delete/:id', authMiddleware, productsController.deleteItem);

router.get('/edit/:id', adminAuthMiddleware, productsController.edit);

router.put('/edit/:id', productValitation, productsController.update);

router.get('/create/', adminAuthMiddleware, productsController.edit);

router.post('/store', upload.single('image'), productValitation, productsController.store);

router.post('/delete/:id', productsController.destroy);

module.exports = router;