const { body } = require('express-validator');

const validations = [
    body('hotel_id')
        .notEmpty().withMessage('Debes seleccionar un hotel'),
    body('roomType_id')
        .notEmpty().withMessage('Debes seleccionar un tipo de habitación'),
    body('roomCategory_id')
        .notEmpty().withMessage('Debes seleccionar una categoria de habitación'),
    body('price')
        .notEmpty().withMessage('Debes completar el campo Precio'),
    body('discountRate')
        .notEmpty().withMessage('Debes completar el campo Descuento')

];

module.exports = validations;