const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('firstName')
        .notEmpty().withMessage('Debes completar el campo Nombre').bail()
        .isLength({ min: 2 }).withMessage('El campo Nombre debe tener al menos dos caracteres'),
    body('lastName')
        .notEmpty().withMessage('Debes completar el campo Apellido').bail()
        .isLength({ min: 2 }).withMessage('El campo Apellido debe tener al menos dos caracteres'),
    body('email')
        .notEmpty().withMessage('Debes completar el campo E-mail').bail()
        .isEmail().withMessage('Debes escribir un formato de e-mail válido'),
    body('password').notEmpty().withMessage('Debes completar el campo Contraseña').bail()
        .isLength({ min: 8 }).withMessage('El campo Contraseña debe tener al menos ocho caracteres')
        .matches(/(?=.*?[a-z])/).withMessage('El campo Contraseña debe tener al menos una letra minúscula')
        .matches(/(?=.*?[A-Z])/).withMessage('El campo Contraseña debe tener al menos una letra mayúscula')
        .matches(/(?=.*?[0-9])/).withMessage('El campo Contraseña debe tener al menos un número')
        .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('El campo Contraseña debe tener al menos un caracter especial'),
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
        let extensions = ['.jpg', '.jpeg', '.png', '.gif', '.JPG', '.JPEG', '.PNG', '.GIF'];
        if (!file) {
            throw new Error('Debes subir una imagen');
        }
        for (let i = 0; i < extensions.length; i++) {
            if (path.extname(file.filename) == extensions[i]) {
                return true;
            }
        }
        throw new Error('Los formatos de imagen permitidos son .jpg, .jpeg, .png, .gif');

    })
];

module.exports = validations;