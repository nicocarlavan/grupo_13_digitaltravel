const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('email')
        .notEmpty().withMessage('Debes completar el campo E-mail').bail()
        .isEmail().withMessage('Debes escribir un formato de e-mail válido'),
    body('password').notEmpty().withMessage('Debes completar el campo Contraseña')
];

module.exports = validations;