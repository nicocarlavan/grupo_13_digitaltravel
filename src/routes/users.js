var express = require('express');
var router = express.Router();
const path = require('path');
const { body } = require('express-validator');
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

const validations = [
    body('firstName').notEmpty().withMessage('Debes completar el campo Nombre'),
    body('lastName').notEmpty().withMessage('Debes completar el campo Apellido'),
    body('email')
        .notEmpty().withMessage('Debes completar el campo E-mail').bail()
        .isEmail().withMessage('Debes escribir un formato de e-mail válido'),
    body('password').notEmpty().withMessage('Debes completar el campo Contraseña'),
    body('repassword')
        .notEmpty().withMessage('Debes completar el campo Confirmar Contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    body('image').custom((value, { req }) => {
        let file = req.file;
        if (!file) {
            throw new Error('Debes subir una imagen');
        }
        return true;
    })
];

router.get('/login', usersController.login);

router.get('/register', usersController.registro);

router.post('/register', upload.single('image'), validations, usersController.newUser);

module.exports = router;