var express = require('express');
var router = express.Router();
const path = require('path');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '../../../public/images/users'))
    },
    filename: function (req, file, cb) {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName)
    }
})
let upload = multer({ storage: storage });

const usersController = require('../controllers/usersController')

router.get('/login', usersController.login);

router.get('/register', usersController.registro);

router.post('/register', upload.single('image'), usersController.newUser);

module.exports = router;