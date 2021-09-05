const { body } = require('express-validator');

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

module.exports = validations;